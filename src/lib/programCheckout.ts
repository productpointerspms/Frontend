// Catalog + backend helpers for the shared program checkout at /checkout/[program].
// Pricing CTAs across the site link here with ?plan=<id>&currency=<code>.
//
// The backend owns the price: GET /program/get-by-code/{code} tells us whether a program is
// open for enrolment, what it charges, and its instalment schedule (`installments`).
//   - "full"        plans charge the backend fee.
//   - "installment" there is one instalment plan, built from the backend schedule (see resolvePlans).
//                   Registration sends `useInstallments: true`; today's charge is the first instalment.
//                   The static instalment plans below only exist so old ?plan= links still land on it.
//   - "product"     plans (e.g. coaching packages) are separate products; they're payable online
//                   only when the backend fee matches the plan price, otherwise we route to the team.

import { API_BASE_URL } from "./application";
import { ppapQuestions, type QuestionDef } from "./programQuestions";

export type PlanKind = "full" | "installment" | "product";

export interface CheckoutPlan {
  id: string;
  label: string;
  /** Short line under the label, e.g. "Pay once and save ₦40,000". */
  detail: string;
  kind: PlanKind;
  /** Listed price per payment, in NGN. */
  amountNgn: number;
  /** Number of payments for installment plans. */
  payments?: number;
}

export interface CheckoutProgram {
  /** Backend program code. */
  code: string;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  format: string;
  landingPath: string;
  /** Where to send people when online enrolment isn't available. */
  contactHref: string;
  plans: CheckoutPlan[];
  /** Application questions asked during checkout (answers go to /application/register). */
  questions: QuestionDef[];
  /** Optional person the plan is with (e.g. a coach), read from ?coach=. */
  personLabel?: string;
}

// Plan ids and prices mirror the pricing sections that link here; keep them in sync.
export const CHECKOUT_PROGRAMS: Record<string, CheckoutProgram> = {
  ppap: {
    code: "PPAP",
    slug: "ppap",
    title: "ProductPointers Accelerator Program (PPAP)",
    subtitle: "Foundational Product Management Training",
    duration: "12 weeks",
    format: "Live online classes",
    landingPath: "/ppap",
    contactHref: "/contact?interest=ppap-enrollment",
    questions: ppapQuestions,
    plans: [
      { id: "tier-03", label: "Full program fee", detail: "One-time payment · save ₦40,000", kind: "full", amountNgn: 255000 },
      { id: "tier-02", label: "Pay in 2 installments", detail: "₦142,500 × 2", kind: "installment", amountNgn: 142500, payments: 2 },
      { id: "tier-01", label: "Pay in 3 installments", detail: "₦98,333 × 3", kind: "installment", amountNgn: 98333, payments: 3 },
    ],
  },
  ppfp: {
    code: "PPFP",
    slug: "ppfp",
    title: "Fintech Product Management Program (PPFP)",
    subtitle: "Build and manage financial products across markets",
    duration: "10 weeks",
    format: "Live online classes",
    landingPath: "/ppfp",
    contactHref: "/contact?interest=ppfp-enrollment",
    questions: [],
    plans: [
      { id: "once", label: "Pay once", detail: "Best value · full program access", kind: "full", amountNgn: 300000 },
      { id: "two", label: "Pay in 2 installments", detail: "₦150,000 × 2", kind: "installment", amountNgn: 150000, payments: 2 },
      { id: "three", label: "Pay in 3 installments", detail: "₦110,000 × 3 (total ₦330,000)", kind: "installment", amountNgn: 110000, payments: 3 },
    ],
  },
  ppmp: {
    code: "PPMP",
    slug: "ppmp",
    title: "Product Management Mastery Program (PPMP)",
    subtitle: "For PMs with 1+ year of experience",
    duration: "Full program",
    format: "Live online classes",
    landingPath: "/ppmp",
    contactHref: "/contact?interest=ppmp-enrollment",
    questions: [],
    plans: [{ id: "full", label: "Full program fee", detail: "One-time payment · no extra fees", kind: "full", amountNgn: 810000 }],
  },
  ppcp: {
    code: "PPCP",
    slug: "ppcp",
    title: "ProductPointers Coaching Program (PPCP)",
    subtitle: "1:1 Product Management coaching",
    duration: "Flexible",
    format: "Private online sessions",
    landingPath: "/ppcp",
    contactHref: "/contact?interest=ppcp-coaching",
    questions: [],
    personLabel: "Coach",
    plans: [
      { id: "one-hour", label: "1-Hour Session", detail: "One 60-minute private session", kind: "product", amountNgn: 30000 },
      { id: "three-month", label: "3-Month Coaching", detail: "6 private sessions, biweekly", kind: "product", amountNgn: 500000 },
      { id: "six-month", label: "6-Month Coaching", detail: "12 private sessions, biweekly", kind: "product", amountNgn: 700000 },
    ],
  },
};

export function getCheckoutProgram(slug: string): CheckoutProgram | null {
  return CHECKOUT_PROGRAMS[slug.toLowerCase()] ?? null;
}

/** Link for a pricing CTA. */
export function checkoutHref(slug: string, params: { plan?: string; currency?: string; coach?: string } = {}): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value) query.set(key, value);
  const qs = query.toString();
  return `/checkout/${slug}${qs ? `?${qs}` : ""}`;
}

/** One step of a program's backend instalment schedule. */
export interface ProgramInstallment {
  title: string;
  sequence: number;
  percentage: number;
  amountNgn: number;
  dueAfterDays: number;
}

export type Availability =
  | { state: "checking" }
  /** Backend has the program and it's active. `feeNgn` is null if it didn't report one. */
  | { state: "open"; feeNgn: number | null; startsAt: string | null; installments: ProgramInstallment[] }
  /** Backend doesn't know the program, or it's inactive. */
  | { state: "closed" }
  /** Couldn't tell (offline, 5xx, timeout) — let the person continue; payment will confirm. */
  | { state: "unknown" };

const SUCCESS_CODES = new Set(["00", "0", "200", "201"]);

export async function checkProgramAvailability(code: string, signal?: AbortSignal): Promise<Availability> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}/program/get-by-code/${encodeURIComponent(code)}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal,
    });
  } catch (err) {
    if (signal?.aborted) throw err;
    return { state: "unknown" };
  }
  if (res.status === 404 || res.status === 400) return { state: "closed" };
  if (!res.ok) return { state: "unknown" };
  const body = await res.json().catch(() => null);
  if (!body) return { state: "unknown" };
  const statusCode = body.statusCode != null ? String(body.statusCode) : undefined;
  const data = (body.data ?? (statusCode === undefined ? body : null)) as Record<string, unknown> | null;
  if ((statusCode !== undefined && !SUCCESS_CODES.has(statusCode)) || !data || !data.code) return { state: "closed" };
  if (data.isActive === false) return { state: "closed" };
  const fee = Number(data.fee);
  return {
    state: "open",
    feeNgn: Number.isFinite(fee) && fee > 0 ? fee : null,
    startsAt: typeof data.startTime === "string" && data.startTime ? data.startTime : null,
    installments: parseInstallments(data.installments),
  };
}

function parseInstallments(raw: unknown): ProgramInstallment[] {
  if (!Array.isArray(raw)) return [];
  return (raw as Record<string, unknown>[])
    .filter((i) => i && i.isActive !== false)
    .map((i) => ({
      title: String(i.title ?? "").trim(),
      sequence: Number(i.sequence ?? 0),
      percentage: Number(i.percentage ?? 0),
      amountNgn: Number(i.amount ?? 0),
      dueAfterDays: Number(i.dueAfterDays ?? 0),
    }))
    .filter((i) => Number.isFinite(i.amountNgn) && i.amountNgn > 0)
    .sort((a, b) => a.sequence - b.sequence);
}

export const INSTALLMENT_PLAN_ID = "installments";
const naira = (amount: number) => `₦${Math.round(amount).toLocaleString("en-NG")}`;

/**
 * Plans to show: the program's non-instalment plans, plus one instalment plan built
 * from the backend schedule (only once the backend confirms the program has one).
 */
export function resolvePlans(program: CheckoutProgram, availability: Availability): CheckoutPlan[] {
  const base = program.plans.filter((p) => p.kind !== "installment");
  if (program.plans.some((p) => p.kind === "product")) return program.plans;
  const schedule = availability.state === "open" ? availability.installments : [];
  if (schedule.length < 2) return base;
  const equal = schedule.every((i) => i.amountNgn === schedule[0].amountNgn);
  return [
    ...base,
    {
      id: INSTALLMENT_PLAN_ID,
      label: `Pay in ${schedule.length} installments`,
      detail: schedule.map((i) => `${i.title || `Payment ${i.sequence}`}: ${naira(i.amountNgn)}`).join(" · "),
      kind: "installment",
      amountNgn: schedule[0].amountNgn,
      payments: equal ? schedule.length : undefined,
    },
  ];
}

/** The selected plan; an old static instalment id (e.g. ?plan=tier-02) maps to the backend instalment plan. */
export function selectPlan(program: CheckoutProgram, plans: CheckoutPlan[], requestedId: string | null): CheckoutPlan {
  const exact = plans.find((p) => p.id === requestedId);
  if (exact) return exact;
  const wantsInstallments = requestedId === INSTALLMENT_PLAN_ID || program.plans.some((p) => p.id === requestedId && p.kind === "installment");
  return (wantsInstallments && plans.find((p) => p.kind === "installment")) || plans[0];
}

export interface PlanQuote {
  /** NGN amount charged today, or null when the plan can't be paid online. */
  dueTodayNgn: number | null;
  /** Shown under the total when today's charge differs from the plan's listed price. */
  note?: string;
}

/** What the person pays today for a plan, given what the backend reports. */
export function quotePlan(program: CheckoutProgram, plan: CheckoutPlan, availability: Availability): PlanQuote {
  if (availability.state === "closed") return { dueTodayNgn: null };
  const backendFee = availability.state === "open" ? availability.feeNgn : null;
  if (plan.kind === "product") {
    // A coaching package must match what the backend will charge, or we'd bill the wrong product.
    if (backendFee != null && backendFee !== plan.amountNgn) return { dueTodayNgn: null };
    return { dueTodayNgn: plan.amountNgn };
  }
  if (plan.kind === "installment") {
    // Only built from the backend schedule, so availability is "open" here.
    const schedule = availability.state === "open" ? availability.installments : [];
    const later = schedule.slice(1);
    return {
      dueTodayNgn: schedule[0]?.amountNgn ?? plan.amountNgn,
      note: later.length
        ? `Today you pay the ${(schedule[0].title || "first payment").toLowerCase()}. Then: ${later.map((i) => `${naira(i.amountNgn)}${i.dueAfterDays ? ` within ${i.dueAfterDays} days` : ""}`).join(", ")}.`
        : undefined,
    };
  }
  const fullPlan = program.plans.find(p => p.kind === "full");
  return { dueTodayNgn: backendFee ?? fullPlan?.amountNgn ?? plan.amountNgn };
}

/** Recorded on the application so the team sees exactly what was chosen. */
export function planSummary(plan: CheckoutPlan, person?: string): string {
  return [plan.label, plan.detail, person ? `with ${person}` : ""].filter(Boolean).join(" · ");
}

// ---- Session persistence: a refresh or a return from the payment page resumes, not re-registers.

export interface SavedCheckout {
  applicationId: string;
  planId: string;
  currency: string;
  firstName: string;
  email: string;
  person?: string;
  savedAt: number;
}

const SAVE_TTL_MS = 24 * 60 * 60 * 1000;
const storageKey = (slug: string) => `pp-checkout:${slug}`;

export function loadSavedCheckout(slug: string): SavedCheckout | null {
  try {
    const raw = window.sessionStorage.getItem(storageKey(slug));
    if (!raw) return null;
    const saved = JSON.parse(raw) as SavedCheckout;
    if (!saved?.applicationId || Date.now() - saved.savedAt > SAVE_TTL_MS) {
      window.sessionStorage.removeItem(storageKey(slug));
      return null;
    }
    return saved;
  } catch {
    return null;
  }
}

export function saveCheckout(slug: string, saved: Omit<SavedCheckout, "savedAt">): void {
  try {
    window.sessionStorage.setItem(storageKey(slug), JSON.stringify({ ...saved, savedAt: Date.now() }));
  } catch {
    /* storage unavailable (private mode) — resume just won't work */
  }
}

export function clearSavedCheckout(slug: string): void {
  try {
    window.sessionStorage.removeItem(storageKey(slug));
  } catch {
    /* ignore */
  }
}

/** Only follow https payment links — never javascript:, data:, or plain http. */
export function isSafePaymentLink(link: string): boolean {
  try {
    return new URL(link).protocol === "https:";
  } catch {
    return false;
  }
}
