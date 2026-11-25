// Scholarships come from the backend:
//   GET /program/scholarships        — the list shown on /scholarships (source of truth)
//   GET /program/{code}/scholarships — used only to learn which program each one belongs to
//
// Every scholarship field the API returns (name, eligibility, tuitionSponsorship,
// scholarshipFee, slotsAvailable, applicationDeadline, isApplicationOpen, isActive)
// is rendered as-is. There is no static fallback data: if the API is down, the page
// shows an error state instead of stale numbers.
//
// SCHOLARSHIP_CONTENT only holds copy the API does not return yet (program name,
// regular tuition, requirements, instalment text). Remove it once the backend adds
// those fields.

import { API_BASE_URL } from "./application";

export interface ApiScholarship {
  id: string;
  name: string;
  code: string;
  description: string | null;
  eligibility: string;
  /** Percentage of tuition covered, e.g. 73. */
  tuitionSponsorship: number;
  /** Amount (NGN) the selected scholar pays. */
  scholarshipFee: number;
  slotsAvailable: number;
  /** ISO date string, or "" when missing. */
  applicationDeadline: string;
  isApplicationOpen: boolean;
  isActive: boolean;
}

/** Programs that run scholarships, in display order. */
export const SCHOLARSHIP_PROGRAM_CODES = ["PPAP", "PPMP", "PPIP", "PPFP"] as const;
export type ScholarshipProgramCode = (typeof SCHOLARSHIP_PROGRAM_CODES)[number];

interface ScholarshipContent {
  programCode: ScholarshipProgramCode;
  programName: string;
  /** Regular tuition (NGN) before sponsorship. */
  tuition: number;
  installments?: string;
  /** `{fee}` is replaced with the live scholarshipFee. */
  requirements: string[];
}

const PPAP_NAME = "Product Management Accelerator Program";

/** Static page content keyed by scholarship `code` (matches the API). */
export const SCHOLARSHIP_CONTENT: Record<string, ScholarshipContent> = {
  ONOME: {
    programCode: "PPAP", programName: PPAP_NAME, tuition: 285000,
    requirements: ["Completed university, HND, or equivalent tertiary education", "Completed NYSC where applicable, or preparing to go for service", "Seriously interested in pursuing a career in Product Management", "Available to commit to the full 12-week PPAP", "Can pay the remaining {fee} contribution if selected.", "Can clearly articulate their Product Management career goals"],
  },
  ADESUWA: {
    programCode: "PPAP", programName: PPAP_NAME, tuition: 285000,
    requirements: ["Graduated from university, HND, or equivalent tertiary education more than 5 years ago", "Completed NYSC where applicable", "Seriously interested in pursuing or transitioning into a Product Management career", "Available to commit to the full 12-week PPAP", "Can pay the remaining {fee} contribution if selected.", "Can clearly articulate their Product Management career goals"],
  },
  DIDI: {
    programCode: "PPAP", programName: PPAP_NAME, tuition: 285000,
    requirements: ["Currently enrolled in a university and studying at 300 level and above", "Seriously interested in pursuing a career in Product Management", "Available to commit to the full 12-week PPAP", "Can pay the remaining {fee} contribution if selected.", "Can clearly articulate their interest in Product Management and career goals"],
  },
  PPMP: {
    programCode: "PPMP", programName: "Product Management Mastery Program", tuition: 810000,
    requirements: ["Currently working in Product Management or have relevant Product Management experience", "Have at least 1 year of Product Management experience", "Understand core Product Management fundamentals", "Looking to deepen their Product Management expertise and take on greater responsibility", "Available to commit to the full PPMP program", "Can clearly articulate their career goals and why the program is relevant to their growth", "Can pay the required {fee} contribution if selected."],
  },
  PPIP: {
    programCode: "PPIP", programName: "Product Management Apprenticeship/Internship Program", tuition: 175000,
    requirements: ["Has completed foundational Product Management training or understands Product Management fundamentals", "Seriously interested in gaining practical Product Management experience", "Available to commit to the full PPIP program", "Willing to participate in practical, team-based Product work", "Can clearly articulate their Product Management career goals", "Can pay the required {fee} contribution if selected."],
  },
  CHISOM: {
    programCode: "PPFP", programName: "Fintech Product Management Program", tuition: 300000, installments: "or 3 × ₦50,000",
    requirements: ["Are currently a Product Manager or part of a Product Team and want to transition into Fintech Product Management.", "Have completed foundational Product Management training.", "Have built at least 2 live products, which may include an MVP, capstone project, personal project, or product you worked on professionally.", "Are serious about building a career in Fintech Product Management.", "Are ready to commit time to the 10-week program and complete practical assignments and the capstone.", "Can Pay the remaining 50% of the tuition."],
  },
};

/** Default scholarship per program, used when an apply link has no `?scholarship=`. */
export const DEFAULT_SCHOLARSHIP_CODE: Record<ScholarshipProgramCode, string> = {
  PPAP: "ONOME", PPMP: "PPMP", PPIP: "PPIP", PPFP: "CHISOM",
};

function parseScholarship(s: Record<string, unknown>): ApiScholarship {
  return {
    id: String(s.id ?? ""),
    name: String(s.name ?? "").trim(),
    code: String(s.code ?? "").toUpperCase(),
    description: s.description != null ? String(s.description) : null,
    eligibility: String(s.eligibility ?? ""),
    tuitionSponsorship: Number(s.tuitionSponsorship ?? 0),
    scholarshipFee: Number(s.scholarshipFee ?? 0),
    slotsAvailable: Number(s.slotsAvailable ?? 0),
    applicationDeadline: String(s.applicationDeadline ?? ""),
    isApplicationOpen: Boolean(s.isApplicationOpen),
    isActive: s.isActive === undefined ? true : Boolean(s.isActive),
  };
}

/** Admin changes show on the site within this many seconds. */
const REVALIDATE_SECONDS = 60;

async function fetchScholarships(path: string): Promise<ApiScholarship[]> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Could not load scholarships (${res.status})`);
  const data = await res.json().catch(() => ({}));
  if (!Array.isArray(data?.data)) throw new Error("Unexpected scholarships response");
  return (data.data as Record<string, unknown>[]).map(parseScholarship);
}

/** GET /program/scholarships — every scholarship. */
export function getScholarships(): Promise<ApiScholarship[]> {
  return fetchScholarships("/program/scholarships");
}

/** GET /program/{code}/scholarships — scholarships attached to one program. */
export function getProgramScholarships(programCode: string): Promise<ApiScholarship[]> {
  return fetchScholarships(`/program/${encodeURIComponent(programCode)}/scholarships`);
}

/** A scholarship ready for display: backend fields + the copy the API lacks. */
export interface ScholarshipListing {
  code: string;
  name: string;
  /** Null when the backend doesn't link it to a known program (no apply link). */
  programCode: ScholarshipProgramCode | null;
  programName: string;
  eligibility: string;
  sponsorship: number;
  /** 0 when unknown (regular tuition row is hidden). */
  tuition: number;
  payable: number;
  installments?: string;
  slots: number;
  /** ISO date, or "" when unknown. */
  deadlineISO: string;
  isOpen: boolean;
  /** "" when the scholarship has no program to apply through. */
  applyHref: string;
  requirements: string[];
}

const naira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

function toListing(api: ApiScholarship, programCode: ScholarshipProgramCode | null): ScholarshipListing {
  const content = SCHOLARSHIP_CONTENT[api.code];
  return {
    code: api.code,
    name: api.name,
    programCode,
    programName: content?.programName ?? "",
    eligibility: api.eligibility,
    sponsorship: api.tuitionSponsorship,
    tuition: content?.tuition ?? 0,
    payable: api.scholarshipFee,
    installments: content?.installments,
    slots: api.slotsAvailable,
    deadlineISO: api.applicationDeadline,
    isOpen: api.isApplicationOpen,
    applyHref: programCode
      ? `/${programCode.toLowerCase()}/apply?plan=scholarship&scholarship=${encodeURIComponent(api.code)}`
      : "",
    requirements: (content?.requirements ?? []).map((r) => r.replace("{fee}", naira(api.scholarshipFee))),
  };
}

/** scholarship code -> program code, from the per-program endpoints. */
async function getScholarshipProgramMap(): Promise<Map<string, ScholarshipProgramCode>> {
  const map = new Map<string, ScholarshipProgramCode>();
  const results = await Promise.allSettled(SCHOLARSHIP_PROGRAM_CODES.map((p) => getProgramScholarships(p)));
  results.forEach((result, i) => {
    if (result.status === "fulfilled") result.value.forEach((s) => map.set(s.code, SCHOLARSHIP_PROGRAM_CODES[i]));
  });
  return map;
}

/**
 * Active scholarships for /scholarships, straight from GET /program/scholarships.
 * Throws when the backend is unreachable — callers render an error state.
 */
export async function getScholarshipListings(): Promise<ScholarshipListing[]> {
  const [scholarships, programMap] = await Promise.all([getScholarships(), getScholarshipProgramMap()]);
  // Keep the designed order for known codes; new scholarships go last, newest first.
  const order = Object.keys(SCHOLARSHIP_CONTENT);
  const rank = (code: string) => order.indexOf(code) + 1 || order.length + 1;
  return scholarships
    .filter((s) => s.isActive)
    .map((s) => toListing(s, programMap.get(s.code) ?? SCHOLARSHIP_CONTENT[s.code]?.programCode ?? null))
    .sort((a, b) => rank(a.code) - rank(b.code));
}

/** One scholarship for an apply page, from GET /program/{code}/scholarships. Null if not found or the API fails. */
export async function getScholarshipListing(
  programCode: ScholarshipProgramCode,
  scholarshipCode?: string | null
): Promise<ScholarshipListing | null> {
  const code = (scholarshipCode || DEFAULT_SCHOLARSHIP_CODE[programCode]).toUpperCase();
  try {
    const match = (await getProgramScholarships(programCode)).find((s) => s.code === code && s.isActive);
    return match ? toListing(match, programCode) : null;
  } catch {
    return null;
  }
}

/** e.g. "September 18th, 2026". */
export function formatDeadline(iso: string): string {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return "To be announced";
  const day = d.getUTCDate();
  const v = day % 100;
  const suffix = ["th", "st", "nd", "rd"][(v - 20) % 10] ?? ["th", "st", "nd", "rd"][v] ?? "th";
  const month = d.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
  return `${month} ${day}${suffix}, ${d.getUTCFullYear()}`;
}
