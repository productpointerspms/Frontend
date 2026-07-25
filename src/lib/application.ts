// API client for ProductPointers application registration + payment details.
//   POST /application/register
//   GET  /application/payment-details/{applicationId}/{currency}

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

export interface PaymentDetails {
  amount?: number;
  currency?: string;
  reference?: string;
  /** Hosted checkout / payment link, if the API returns one. */
  paymentUrl?: string;
  checkoutUrl?: string;
  authorizationUrl?: string;
  [key: string]: unknown;
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
  return (data?.data ?? data) as PaymentDetails;
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
 * High-level submit: reads the form, registers the application, then fetches
 * payment details for the chosen currency. Field names expected on the form:
 * `fullname`, `email`, `phoneNumber`, plus one per question id.
 */
export async function submitApplication(
  form: HTMLFormElement,
  program: ProgramCode,
  currency: string
): Promise<{ applicationId: string; payment: PaymentDetails }> {
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
  const payment = await getPaymentDetails(result.applicationId, currency);
  return { applicationId: result.applicationId, payment };
}
