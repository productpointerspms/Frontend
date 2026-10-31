// Client for ProductPointers event ticketing. The browser talks to our own
// /api/events/* route handlers, which attach the x-api-key server-side (see
// eventApi.server.ts) so the key never ships in the client bundle.
//   GET  /event/{slug}                      — event, tiers and the tier on sale now
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
  { value: "ENGINEER", label: "Engineer / Developer" },
  { value: "STUDENT", label: "Student" },
  { value: "FOUNDER", label: "Founder / Entrepreneur" },
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
}

export interface CheckoutResult {
  ticketId: string;
  reference: string;
  status: TicketStatus;
  tier: { id: string; name: string };
  amount: number;
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

/** Unwraps the `{ statusCode, message, data }` envelope, throwing on a failing statusCode. */
export async function unwrapEnvelope<T>(res: Response, fallback: string): Promise<T> {
  const body = await res.json().catch(() => null);
  const statusCode = body?.statusCode != null ? String(body.statusCode) : undefined;
  if (!res.ok || (statusCode !== undefined && statusCode !== "00") || !body?.data) {
    const message = body?.message;
    throw new Error(
      (Array.isArray(message) ? message.join("; ") : message) || `${fallback} (${res.status})`
    );
  }
  return body.data as T;
}

export async function getEvent(slug: string): Promise<EventDetails> {
  const res = await fetch(`/api/events/${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
  });
  return unwrapEnvelope<EventDetails>(res, "Could not load the event");
}

export async function startEventCheckout(
  slug: string,
  payload: CheckoutPayload
): Promise<CheckoutResult> {
  const res = await fetch(`/api/events/${encodeURIComponent(slug)}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    // One ticket per checkout; the server picks the tier and price.
    body: JSON.stringify({ quantity: 1, ...payload }),
  });
  return unwrapEnvelope<CheckoutResult>(res, "Could not start checkout");
}

export async function getTicketStatus(reference: string): Promise<TicketStatusResult> {
  const res = await fetch(`/api/events/tickets/${encodeURIComponent(reference)}/status`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  return unwrapEnvelope<TicketStatusResult>(res, "Could not check ticket status");
}

export function formatMoney(amount: number, currency = "NGN"): string {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
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
