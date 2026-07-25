// API client for ProductPointers payment collection.
//   POST /transaction/payment_link
//   POST /virtual-account/dynamic
//   POST /virtual-account/inflow/reverse

import { API_BASE_URL } from "./application";

export interface PaymentRequestPayload {
  applicationId: string;
  amount: number;
  currency: string;
  email: string;
  fullname: string;
}

export interface PaymentLinkResult {
  paymentUrl: string;
  reference?: string;
}

export interface VirtualAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  amount?: number;
  reference?: string;
  /** ISO timestamp the account stops accepting inflow, if the API returns one. */
  expiresAt?: string;
}

export interface ReverseInflowPayload {
  accountNumber: string;
  reference?: string;
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

export async function createPaymentLink(
  payload: PaymentRequestPayload
): Promise<PaymentLinkResult> {
  const res = await fetch(`${API_BASE_URL}/transaction/payment_link`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseError(res, "Could not generate a payment link"));
  }

  const data = await res.json().catch(() => ({}));
  const inner = (data?.data ?? data) as Record<string, unknown>;
  const paymentUrl = String(
    inner.paymentUrl ?? inner.payment_link ?? inner.link ?? inner.url ?? ""
  );

  if (!paymentUrl) {
    throw new Error("Payment link response did not include a payment URL");
  }

  return {
    paymentUrl,
    reference: inner.reference != null ? String(inner.reference) : undefined,
  };
}

export async function createDynamicVirtualAccount(
  payload: PaymentRequestPayload
): Promise<VirtualAccount> {
  const res = await fetch(`${API_BASE_URL}/virtual-account/dynamic`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseError(res, "Could not generate a virtual account"));
  }

  const data = await res.json().catch(() => ({}));
  const inner = (data?.data ?? data) as Record<string, unknown>;

  return {
    bankName: String(inner.bankName ?? inner.bank_name ?? inner.bank ?? ""),
    accountName: String(inner.accountName ?? inner.account_name ?? ""),
    accountNumber: String(
      inner.accountNumber ?? inner.account_number ?? inner.virtualAccountNumber ?? ""
    ),
    amount: inner.amount != null ? Number(inner.amount) : undefined,
    reference: inner.reference != null ? String(inner.reference) : undefined,
    expiresAt:
      inner.expiresAt != null
        ? String(inner.expiresAt)
        : inner.expires_at != null
        ? String(inner.expires_at)
        : undefined,
  };
}

/** Not wired to any UI yet — reverses a completed virtual account inflow (e.g. for refunds/ops use). */
export async function reverseVirtualAccountInflow(
  payload: ReverseInflowPayload
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/virtual-account/inflow/reverse`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseError(res, "Could not reverse the inflow"));
  }
}
