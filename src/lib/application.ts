// API client for ProductPointers application registration + payment details.
//   POST /application/register
//   GET  /application/payment-details/{applicationId}/{currency} — payment details for the user to pay
//   GET  /application/{applicationId} — application/payment status lookup

import {
  PROGRAMS,
  type ProgramCode,
  type QuestionDef,
} from "./programQuestions";

export const API_BASE_URL = "https://api.productpointers.com";

export interface ApplicationResponseItem {
  category: string;
  question: string;
  response: string;
}

export interface RegisterApplicationPayload {
  fullname: string;
  email: string;
  programCode: string;
  phoneNumber: string;
  responses: ApplicationResponseItem[];
}

export interface RegisterApplicationResult {
  applicationId: string;
  [key: string]: unknown;
}

// transaction.status codes.
export const TRANSACTION_STATUS = {
  PENDING: "03",
  COMPLETED: "00",
} as const;

export interface TransactionRecord {
  id: string;
  amount: string;
  currency: string;
  reference: string;
  /** See TRANSACTION_STATUS — "00" completed, "03" pending. */
  status: string;
  paymentMethod?: string;
  processor?: string;
}

export interface ApplicationRecord {
  applicationId: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  programCode?: string;
  programName?: string;
  /** Program fee in NGN, from `program.fee`. */
  fee?: number;
  /** Application review status, e.g. "PENDING". */
  status: string;
  /** Null until a payment attempt exists; check `.status` to see if it completed. */
  transaction: TransactionRecord | null;
}

export interface BankTransferDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
}

export interface PaymentLinkDetails {
  reference: string;
  /** The actual hosted checkout URL to send the user to. */
  paymentLink: string;
  /** See TRANSACTION_STATUS — "00" completed, "03" pending. */
  status: string;
  amount?: number;
  currency?: string;
}

export interface PaymentDetails {
  /** Card checkout details, or null if card payment isn't available for this currency. */
  link: PaymentLinkDetails | null;
  /** Dedicated bank transfer account, or null if transfer isn't available for this currency. */
  transfer: BankTransferDetails | null;
}

async function parseError(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    return (
      (data && (data.message || data.error || data.detail)) ||
      `${fallback} (${res.status})`
    );
  } catch {
    return `${fallback} (${res.status})`;
  }
}

// Business status codes that indicate success (the API can return HTTP 200 with
// a failing statusCode like "99" in the body).
const SUCCESS_STATUS = new Set(["00", "0", "200", "201", "OK", "SUCCESS"]);

function detailsFromData(data: unknown): string {
  if (!Array.isArray(data)) return "";
  return data
    .map((d) =>
      typeof d === "string"
        ? d
        : (d && (d.message || d.error || d.detail)) ||
          (d && Object.keys(d).length ? JSON.stringify(d) : "")
    )
    .filter(Boolean)
    .join("; ");
}

export async function registerApplication(
  payload: RegisterApplicationPayload
): Promise<RegisterApplicationResult> {
  // The API's validator requires both `name` and `fullname` on the payload.
  const body = { ...payload, name: payload.fullname };

  const res = await fetch(`${API_BASE_URL}/application/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({} as Record<string, unknown>));

  const statusCode =
    data?.statusCode != null ? String(data.statusCode) : undefined;
  const businessOk = statusCode === undefined || SUCCESS_STATUS.has(statusCode);

  if (!res.ok || !businessOk) {
    let message =
      (data && (data.message as string)) ||
      `Registration failed (${res.status})`;
    const details = detailsFromData(data?.data);
    if (details) message += ` — ${details}`;
    throw new Error(message);
  }

  const inner = (data?.data ?? data) as Record<string, unknown>;
  const applicationId = String(
    inner?.applicationId ?? inner?.id ?? data?.applicationId ?? data?.id ?? ""
  );
  return { ...(inner as object), applicationId };
}

export async function getPaymentDetails(
  applicationId: string,
  currency: string
): Promise<PaymentDetails> {
  const res = await fetch(
    `${API_BASE_URL}/application/payment-details/${encodeURIComponent(
      applicationId
    )}/${encodeURIComponent(currency)}`,
    { method: "GET", headers: { Accept: "application/json" } }
  );

  if (!res.ok) {
    throw new Error(await parseError(res, "Failed to load payment details"));
  }

  const data = await res.json().catch(() => ({}));
  const inner = (data?.data ?? data) as Record<string, unknown>;
  // The API nests link/transfer under `paymentDetails`, not on `data` itself.
  const details = (inner.paymentDetails ?? inner) as Record<string, unknown>;
  const rawLink = details.link as Record<string, unknown> | null | undefined;
  const transfer = details.transfer as Record<string, unknown> | null | undefined;

  const link: PaymentLinkDetails | null = rawLink
    ? {
        reference: String(rawLink.reference ?? ""),
        paymentLink: String(rawLink.payment_link ?? ""),
        status: String(rawLink.status ?? ""),
        amount: rawLink.amount != null ? Number(rawLink.amount) : undefined,
        currency: rawLink.currency != null ? String(rawLink.currency) : undefined,
      }
    : null;

  return {
    link,
    transfer: transfer
      ? {
          accountNumber: String(transfer.accountNumber ?? ""),
          accountName: String(transfer.accountName ?? ""),
          bankName: String(transfer.bankName ?? ""),
        }
      : null,
  };
}

/** Best-effort extraction of `fullname` from the stringified `request` JSON. */
function fullnameFromRequest(request: unknown): string {
  if (typeof request !== "string") return "";
  try {
    return String(JSON.parse(request)?.fullname ?? "").trim();
  } catch {
    return "";
  }
}

export async function getApplicationById(
  applicationId: string
): Promise<ApplicationRecord> {
  const res = await fetch(
    `${API_BASE_URL}/application/${encodeURIComponent(applicationId)}`,
    { method: "GET", headers: { Accept: "application/json" } }
  );

  if (!res.ok) {
    throw new Error(await parseError(res, "Could not load application"));
  }

  const data = await res.json().catch(() => ({}));
  const app = (data?.data ?? data) as Record<string, unknown>;
  const user = (app.user ?? {}) as Record<string, unknown>;
  const program = (app.program ?? {}) as Record<string, unknown>;

  const firstName = String(user.firstName ?? "").trim();
  const lastName = String(user.lastName ?? "").trim();
  const fullname =
    String(user.fullName ?? "").trim() ||
    [firstName, lastName].filter(Boolean).join(" ") ||
    fullnameFromRequest(app.request);

  const rawTransaction = app.transaction as Record<string, unknown> | null | undefined;
  const transaction: TransactionRecord | null = rawTransaction
    ? {
        id: String(rawTransaction.id ?? ""),
        amount: String(rawTransaction.amount ?? ""),
        currency: String(rawTransaction.currency ?? ""),
        reference: String(rawTransaction.reference ?? ""),
        status: String(rawTransaction.status ?? ""),
        paymentMethod:
          rawTransaction.paymentMethod != null
            ? String(rawTransaction.paymentMethod)
            : undefined,
        processor:
          rawTransaction.processor != null ? String(rawTransaction.processor) : undefined,
      }
    : null;

  return {
    applicationId: String(app.id ?? applicationId),
    fullname,
    email: String(user.email ?? ""),
    phoneNumber: String(user.phoneNumber ?? ""),
    programCode: program.code != null ? String(program.code) : undefined,
    programName: program.title != null ? String(program.title) : undefined,
    fee: program.fee != null ? Number(program.fee) : undefined,
    status: String(app.status ?? ""),
    transaction,
  };
}

/**
 * Build the `responses[]` payload from a submitted form's FormData using the
 * program's question definitions. Field names must match each question's `id`.
 * Multi-select answers are joined with ", ".
 */
export function buildResponses(
  formData: FormData,
  questions: Pick<QuestionDef, "id" | "category" | "content">[]
): ApplicationResponseItem[] {
  return questions
    .map((q) => ({
      category: q.category,
      question: q.content,
      response: formData
        .getAll(q.id)
        .map((v) => String(v).trim())
        .filter(Boolean)
        .join(", "),
    }))
    .filter((r) => r.response.length > 0);
}

/**
 * High-level submit: reads the form and registers the application. Payment
 * details are fetched separately once the user chooses to pay. Field names
 * expected on the form: `fullname`, `email`, `phoneNumber`, plus one per
 * question id.
 */
export async function submitApplication(
  form: HTMLFormElement,
  program: ProgramCode
): Promise<{ applicationId: string }> {
  const fd = new FormData(form);
  const config = PROGRAMS[program];

  const payload: RegisterApplicationPayload = {
    fullname: String(fd.get("fullname") ?? "").trim(),
    email: String(fd.get("email") ?? "").trim(),
    phoneNumber: String(fd.get("phoneNumber") ?? "").trim(),
    programCode: config.programCode,
    responses: buildResponses(fd, config.questions),
  };

  const result = await registerApplication(payload);
  return { applicationId: result.applicationId };
}
