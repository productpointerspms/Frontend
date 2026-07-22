// API client for the ProductPointers contact form.
//   POST /contact-us

import { API_BASE_URL } from "./application";

export interface ContactPayload {
  fullname: string;
  email: string;
  message: string;
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

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/contact-us`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseError(res, "Failed to send message"));
  }
}
