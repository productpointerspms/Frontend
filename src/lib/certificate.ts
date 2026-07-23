// API client for ProductPointers certificate verification.
//   GET /certificate/{certificateNumber}

import { API_BASE_URL } from "./application";

export type CertificateStatus = "completed" | "incomplete";

export interface CertificateRecord {
  certificateNumber: string;
  name: string;
  program: string;
  status: CertificateStatus;
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

/** Returns null when the certificate number has no matching record. */
export async function getCertificate(
  certificateNumber: string
): Promise<CertificateRecord | null> {
  const res = await fetch(
    `${API_BASE_URL}/certificate/${encodeURIComponent(certificateNumber)}`,
    { method: "GET", headers: { Accept: "application/json" } }
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(await parseError(res, "Verification failed"));
  }

  const data = await res.json().catch(() => ({}));
  const inner = (data?.data ?? data) as Record<string, unknown>;

  const rawStatus = String(inner.status ?? inner.completionStatus ?? "")
    .trim()
    .toLowerCase();
  const status: CertificateStatus =
    rawStatus === "completed" || rawStatus === "true" || rawStatus === "success"
      ? "completed"
      : "incomplete";

  return {
    certificateNumber,
    name: String(inner.fullname ?? inner.name ?? inner.studentName ?? ""),
    program: String(inner.program ?? inner.programName ?? inner.programCode ?? ""),
    status,
  };
}
