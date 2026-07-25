// API client for ProductPointers payment collection.
//   POST /virtual-account/inflow/reverse

import { API_BASE_URL } from "./application";

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
