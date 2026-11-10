// Turns any thrown value into copy that is safe to show an attendee or applicant.
// Server messages are only trusted when they read like a sentence written for people;
// framework defaults, HTML, stack traces and serialized objects are replaced with the fallback.

export const NETWORK_COPY = "We couldn't reach our servers. Check your internet connection and try again.";

/** Framework defaults ("Cannot POST /event/…", "Not Found"), markup, stack traces and JSON are for developers. */
export function isUserSafe(message: unknown): message is string {
  if (typeof message !== "string") return false;
  const text = message.trim();
  if (!text || text.length > 300) return false;
  return !/^cannot (get|post|put|patch|delete)\b|^(not found|bad request|internal server error|forbidden|unauthorized|bad gateway|service unavailable|gateway timeout)\.?$|<\/?[a-z][\s\S]*>|[{}[\]]|\bat .+:\d+:\d+|ECONN|ETIMEDOUT|ENOTFOUND|exception|undefined|\bnull\b|failed to fetch|networkerror|load failed|\(\d{3}\)$/i.test(text);
}

/** User-facing message for a caught error: the error's own message if safe, else `fallback`. */
export function userMessage(err: unknown, fallback: string): string {
  // fetch() rejects with a TypeError when the network is down or the request is blocked.
  if (err instanceof TypeError) {
    return typeof navigator !== "undefined" && navigator.onLine === false
      ? "You appear to be offline. Reconnect and try again."
      : NETWORK_COPY;
  }
  if (err instanceof Error) {
    // Messages like "Registration failed — email must be an email" keep only the readable part.
    const parts = err.message.split(/\s+—\s+|;\s+/).filter(isUserSafe);
    if (parts.length) return parts.join(" ");
  }
  return fallback;
}
