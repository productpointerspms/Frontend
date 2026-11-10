import { isUserSafe, NETWORK_COPY } from "./userMessage";

// Client for ProductPointers event ticketing. The browser talks to our own
// /api/events/* route handlers, which attach the x-api-key server-side (see
// eventApi.server.ts) so the key never ships in the client bundle.
//   GET  /event/{slug}                      — event, tiers and the tier on sale now
//   POST /event/{slug}/discount-codes/validate — preview a discount code against the tier on sale
//   POST /event/{slug}/checkout             — start checkout for ONE ticket, get the payment link
//   GET  /event/tickets/{reference}/status  — is the ticket's payment confirmed?

export const NOVEMBER_EVENT_SLUG = "november-to-remember";

export type TierStatus = "ON_SALE" | "SOLD_OUT" | "NOT_STARTED" | "UPCOMING" | "ENDED" | (string & {});
export type TicketStatus = "PENDING" | "PAID" | (string & {});

export interface EventTier {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  status: TierStatus;
  remaining: number | null;
  salesStartAt: string;
  salesEndAt: string;
  sortOrder: number;
  benefits: string[];
}

export interface EventAgendaItem {
  title: string;
  description: string;
  startsAt: string;
}

export interface EventDetails {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  venue: string;
  startsAt: string;
  endsAt: string;
  timeZone: string;
  currency: string;
  agenda: EventAgendaItem[];
  maxTicketsPerCheckout: number;
  /** Null when nothing is on sale — disable checkout and show tier statuses. */
  activeTier: EventTier | null;
  tiers: EventTier[];
}

/** Matches the backend's currentRole enum. */
export const ATTENDEE_ROLES = [
  { value: "ASPIRING_PRODUCT_MANAGER", label: "Aspiring Product Manager" },
  { value: "PRODUCT_MANAGER", label: "Product Manager" },
  { value: "PRODUCT_DESIGNER", label: "Product Designer" },
  { value: "ENGINEER_DEVELOPER", label: "Engineer / Developer" },
  { value: "STUDENT", label: "Student" },
  { value: "FOUNDER_ENTREPRENEUR", label: "Founder / Entrepreneur" },
  { value: "OTHER", label: "Other" },
] as const;

export interface CheckoutPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  currentRole: string;
  company?: string;
  linkedInProfile?: string;
  expectations?: string;
  /** Optional; the backend locks the discounted price on the ticket. Omit when no code is applied. */
  discountCode?: string;
}

export type DiscountType = "PERCENT" | "FIXED" | (string & {});

export interface DiscountQuote {
  code: string;
  type: DiscountType;
  value: number;
  tier: { id: string; name: string };
  originalAmount: number;
  discountAmount: number;
  /** Final amount to pay. */
  amount: number;
  currency: string;
}

export interface CheckoutResult {
  ticketId: string;
  reference: string;
  status: TicketStatus;
  tier: { id: string; name: string };
  originalAmount?: number;
  discountAmount?: number;
  /** Final amount to pay (after any discount). */
  amount: number;
  discountCode?: string | null;
  currency: string;
  paymentLink: string;
  checkoutExpiresAt: string;
}

export interface TicketStatusResult {
  reference: string;
  status: TicketStatus;
  eventTitle: string;
  eventSlug: string;
  tierName: string;
  amount: number;
  currency: string;
  paidAt: string | null;
}

/** A 422's `data` lists class-validator errors; show their first message per field instead of "Request could not be processed!". */
function validationMessages(data: unknown): string[] | undefined {
  if (!Array.isArray(data)) return undefined;
  const messages = data
    .map((error: { constraints?: Record<string, string> }) => Object.values(error?.constraints ?? {})[0])
    .filter((message): message is string => typeof message === "string");
  return messages.length ? messages : undefined;
}

/** Error with copy that is always safe to put in front of a user. */
export class EventApiError extends Error {
  constructor(message: string, readonly status: number, readonly kind: "api" | "network" | "timeout" | "unavailable" | "server") {
    super(message);
    this.name = "EventApiError";
  }
}

export interface ErrorCopy {
  /** Shown when the server gives no message we trust (e.g. an unexpected 400). */
  fallback: string;
  /** Shown when the endpoint is missing (404/405) — usually a feature not deployed yet. */
  unavailable?: string;
}

const COPY = {
  network: NETWORK_COPY,
  timeout: "This is taking longer than usual. Check your connection and try again.",
  server: "Something went wrong on our side. Please try again in a moment.",
  rateLimited: "Too many attempts. Please wait a moment and try again.",
};

/** Unwraps the `{ statusCode, message, data }` envelope, throwing an EventApiError with user-safe copy on failure. */
export async function unwrapEnvelope<T>(res: Response, copy: string | ErrorCopy): Promise<T> {
  const { fallback, unavailable = fallback } = typeof copy === "string" ? { fallback: copy } : copy;
  const body = await res.json().catch(() => null);
  const statusCode = body?.statusCode != null ? String(body.statusCode) : undefined;
  if (res.ok && (statusCode === undefined || statusCode === "00") && body?.data) return body.data as T;

  if (res.status === 404 || res.status === 405 || res.status === 501) throw new EventApiError(unavailable, res.status, "unavailable");
  if (res.status === 429) throw new EventApiError(COPY.rateLimited, res.status, "api");
  if (res.status === 504) throw new EventApiError(COPY.timeout, res.status, "timeout");
  if (res.status >= 500) throw new EventApiError(COPY.server, res.status, "server");

  // 4xx: trust field-level validation errors and the documented envelope's message, nothing else.
  const validation = validationMessages(body?.data);
  if (validation) throw new EventApiError(validation.filter(isUserSafe).join(" ") || fallback, res.status, "api");
  const messages = (Array.isArray(body?.message) ? body.message : [body?.message]).filter(isUserSafe);
  throw new EventApiError(messages.length ? messages.join(" ") : fallback, res.status, "api");
}

const TIMEOUT_MS = 20_000;

/** fetch with a timeout and friendly network errors. Re-throws the caller's own aborts untouched. */
async function request(input: string, init: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const callerSignal = init.signal;
  const onAbort = () => controller.abort(callerSignal?.reason);
  callerSignal?.addEventListener("abort", onAbort, { once: true });
  if (callerSignal?.aborted) onAbort();
  let timedOut = false;
  const timer = setTimeout(() => { timedOut = true; controller.abort(); }, TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (err) {
    if (callerSignal?.aborted) throw err;
    if (timedOut) throw new EventApiError(COPY.timeout, 0, "timeout");
    throw new EventApiError(typeof navigator !== "undefined" && navigator.onLine === false ? "You appear to be offline. Reconnect and try again." : COPY.network, 0, "network");
  } finally {
    clearTimeout(timer);
    callerSignal?.removeEventListener("abort", onAbort);
  }
}

/** Message for any thrown value, for UI code that catches broadly. */
export function errorMessage(err: unknown, fallback: string): string {
  return err instanceof EventApiError ? err.message : fallback;
}

export async function getEvent(slug: string): Promise<EventDetails> {
  const res = await request(`/api/events/${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
  });
  return unwrapEnvelope<EventDetails>(res, {
    fallback: "We couldn't load ticket details right now. Please refresh the page.",
    unavailable: "Ticket details aren't available yet. Please check back soon.",
  });
}

export async function startEventCheckout(
  slug: string,
  payload: CheckoutPayload
): Promise<CheckoutResult> {
  const res = await request(`/api/events/${encodeURIComponent(slug)}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    // One ticket per checkout; the server picks the tier and price.
    body: JSON.stringify({ quantity: 1, ...payload }),
  });
  return unwrapEnvelope<CheckoutResult>(res, {
    fallback: "We couldn't start your checkout. Please check your details and try again.",
    unavailable: "Checkout isn't available right now. Please try again shortly.",
  });
}

/** Codes are case-insensitive server-side; throws with a message safe to show under the input. */
export async function validateDiscountCode(
  slug: string,
  code: string,
  signal?: AbortSignal
): Promise<DiscountQuote> {
  const res = await request(`/api/events/${encodeURIComponent(slug)}/discount-codes/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ code: code.trim() }),
    cache: "no-store",
    signal,
  });
  return unwrapEnvelope<DiscountQuote>(res, {
    fallback: "We couldn't apply this code. Check it and try again.",
    unavailable: "Discount codes can't be applied right now. You can still continue at the full price.",
  });
}

export async function getTicketStatus(reference: string): Promise<TicketStatusResult> {
  const res = await request(`/api/events/tickets/${encodeURIComponent(reference)}/status`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  return unwrapEnvelope<TicketStatusResult>(res, "We couldn't confirm your payment status yet.");
}

/** Whole amounts render without decimals; fractional ones (e.g. a 50% discount of 9,999) keep kobo so totals add up. */
export function formatMoney(amount: number, currency = "NGN"): string {
  const digits = Number.isInteger(amount) ? 0 : 2;
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en-NG")}`;
  }
}

export function formatEventDate(iso: string, timeZone = "Africa/Lagos"): string {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(new Date(iso));
}

const TIER_STATUS_LABEL: Record<string, string> = {
  ON_SALE: "On sale",
  SOLD_OUT: "Sold out",
  NOT_STARTED: "Not yet active",
  UPCOMING: "Not yet active",
  ENDED: "Sales ended",
};

/** Human label for a tier status; unknown codes like "SALES_PAUSED" become "Sales paused". */
export function tierStatusLabel(status: string): string {
  if (TIER_STATUS_LABEL[status]) return TIER_STATUS_LABEL[status];
  const words = status.toLowerCase().replace(/_/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** e.g. "Nov 7–28, 2026 · 7:00 PM", or "Nov 28 – Dec 5, 2026 · 7:00 PM" across months. */
export function formatEventRange(startsAt: string, endsAt: string, timeZone = "Africa/Lagos"): string {
  const part = (iso: string, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { ...options, timeZone }).format(new Date(iso));
  const [startMonth, endMonth] = [part(startsAt, { month: "short" }), part(endsAt, { month: "short" })];
  const [startDay, endDay] = [part(startsAt, { day: "numeric" }), part(endsAt, { day: "numeric" })];
  const year = part(endsAt, { year: "numeric" });
  const time = part(startsAt, { hour: "numeric", minute: "2-digit", hour12: true });
  const days =
    startMonth !== endMonth
      ? `${startMonth} ${startDay} – ${endMonth} ${endDay}`
      : startDay !== endDay
      ? `${startMonth} ${startDay}–${endDay}`
      : `${startMonth} ${startDay}`;
  return `${days}, ${year} · ${time}`;
}
