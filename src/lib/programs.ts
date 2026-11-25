// Single source of truth for program display info used by the shared
// checkout page. Keyed by `program.code` (matches the API's program.code).
//   GET /program/programs — live program list (id, title, code, fee, ...)
//   GET /program/get-by-code/{code} — single program lookup (id, title, code, startTime, ...)
//   GET /program/stats — homepage impact stats

import { PROGRAM_FEE_NGN, ORIGINAL_FEE_NGN } from "./pricing";
import { API_BASE_URL } from "./application";

export interface ProgramInfo {
  code: string;
  title: string;
  description: string;
  durationLabel: string;
  feeNgn: number;
  /** Undefined when the program has no discounted "early bird" pricing. */
  originalFeeNgn?: number;
  features: string[];
  /** Program landing page, e.g. "/ppap". */
  landingPath: string;
}

const PPIP_FEE_NGN = 20000;

export const PROGRAM_CATALOG: Record<string, ProgramInfo> = {
  PPAP: {
    code: "PPAP",
    title: "ProductPointers Accelerator Program (PPAP)",
    description: "Foundational Product Management Training",
    durationLabel: "12 Weeks",
    feeNgn: PROGRAM_FEE_NGN,
    originalFeeNgn: ORIGINAL_FEE_NGN,
    features: [
      "Structured Product Management Learning",
      "Practical Assignments & Guided Exercises",
      "Mentorship & Accountability Support",
      "Community Access & Growth Resources",
    ],
    landingPath: "/ppap",
  },
  PPIP: {
    code: "PPIP",
    title: "ProductPointers Internship Program (PPIP)",
    description: "Hands-On Product Internship Experience",
    durationLabel: "10 Weeks",
    feeNgn: PPIP_FEE_NGN,
    features: [
      "Real Stakeholder Product Challenges",
      "Build & Launch A Real MVP",
      "Mentor-Verified Portfolio Evidence",
      "Recruiter Visibility & Community Access",
    ],
    landingPath: "/ppip",
  },
};

export const DEFAULT_PROGRAM_CODE = "PPAP";

/** Resolves a program by code, case-insensitively, falling back to PPAP. */
export function getProgramInfo(code?: string | null): ProgramInfo {
  const key = (code ?? DEFAULT_PROGRAM_CODE).toUpperCase();
  return PROGRAM_CATALOG[key] ?? PROGRAM_CATALOG[DEFAULT_PROGRAM_CODE];
}

export interface ApiProgram {
  id: string;
  title: string;
  code: string;
  description: string;
  image: string | null;
  isActive: boolean;
  startTime: string;
  endTime: string;
  /** Fee in NGN. */
  fee: number;
}

function parseApiProgram(p: Record<string, unknown>): ApiProgram {
  return {
    id: String(p.id ?? ""),
    title: String(p.title ?? ""),
    code: String(p.code ?? ""),
    description: String(p.description ?? ""),
    image: p.image != null ? String(p.image) : null,
    isActive: Boolean(p.isActive),
    startTime: String(p.startTime ?? ""),
    endTime: String(p.endTime ?? ""),
    fee: Number(p.fee ?? 0),
  };
}

/** Live program list from the backend — includes the current fee per program. */
export async function getPrograms(): Promise<ApiProgram[]> {
  const res = await fetch(`${API_BASE_URL}/program/programs`, {
    method: "GET",
    headers: { Accept: "application/json" },
    // Server renders refresh at most once a minute; ignored in the browser.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Could not load programs (${res.status})`);
  }

  const data = await res.json().catch(() => ({}));
  const list = Array.isArray(data?.data) ? data.data : [];

  return (list as Record<string, unknown>[]).map(parseApiProgram);
}

/** Single program lookup by code — used for details like the live `startTime`. */
export async function getProgramByCode(code: string): Promise<ApiProgram> {
  const res = await fetch(
    `${API_BASE_URL}/program/get-by-code/${encodeURIComponent(code)}`,
    { method: "GET", headers: { Accept: "application/json" } }
  );

  if (!res.ok) {
    throw new Error(`Could not load program ${code} (${res.status})`);
  }

  const data = await res.json().catch(() => ({}));
  const inner = (data?.data ?? data) as Record<string, unknown>;
  return parseApiProgram(inner);
}

export interface ProgramStats {
  professionalsTrained: string;
  expertMentors: string;
  countriesReached: string;
  careerAdvancementRate: string;
}

/** Homepage impact stats (professionals trained, mentors, countries, advancement rate). */
export async function getProgramStats(): Promise<ProgramStats> {
  const res = await fetch(`${API_BASE_URL}/program/stats`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Could not load program stats (${res.status})`);
  }

  const data = await res.json().catch(() => ({}));
  const inner = (data?.data ?? data) as Record<string, unknown>;

  return {
    professionalsTrained: String(inner.professionalsTrained ?? ""),
    expertMentors: String(inner.expertMentors ?? ""),
    countriesReached: String(inner.countriesReached ?? ""),
    careerAdvancementRate: String(inner.careerAdvancementRate ?? ""),
  };
}

/** Live fee (NGN) for a program code, falling back to the static catalog on error. */
export async function getLiveProgramFeeNgn(code: string): Promise<number> {
  try {
    const programs = await getPrograms();
    const match = programs.find((p) => p.code.toUpperCase() === code.toUpperCase());
    return match?.fee ?? getProgramInfo(code).feeNgn;
  } catch {
    return getProgramInfo(code).feeNgn;
  }
}

/** A row in the homepage "Upcoming Programs" tab. */
export interface UpcomingProgramItem {
  code: string;
  title: string;
  date: string;
  description: string;
  cta: string;
  href: string;
}

/** Where each program's homepage CTA points. Unknown codes go to `/{code}`. */
const UPCOMING_PROGRAM_LINKS: Record<string, { href: string; cta: string }> = {
  PPAP: { href: "/ppap#pricing", cta: "Apply Now" },
  PPIP: { href: "/ppip#pricing", cta: "Apply Now" },
  PPMP: { href: "/ppmp/apply?plan=scholarship", cta: "Apply Now" },
  PPFP: { href: "/ppfp#pricing", cta: "Apply Now" },
};

function formatProgramDate(iso: string): string | null {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function programDateLabel(p: ApiProgram, now: number): string {
  const start = p.startTime ? new Date(p.startTime).getTime() : NaN;
  const end = p.endTime ? new Date(p.endTime).getTime() : NaN;
  if (!Number.isNaN(start) && start > now) return `Next Cohort Starts ${formatProgramDate(p.startTime)}`;
  if (!Number.isNaN(end) && end > now) return `Cohort In Progress · Ends ${formatProgramDate(p.endTime)}`;
  return "Next Cohort Dates Coming Soon";
}

/**
 * Homepage "Upcoming Programs" rows, from GET /program/programs: every active
 * program, soonest start first. Throws when the backend is unreachable.
 */
export async function getUpcomingProgramItems(): Promise<UpcomingProgramItem[]> {
  const now = Date.now();
  const programs = await getPrograms();
  const startOf = (p: ApiProgram) => new Date(p.startTime).getTime() || Number.MAX_SAFE_INTEGER;
  return programs
    .filter((p) => p.isActive)
    .sort((a, b) => startOf(a) - startOf(b))
    .map((p) => {
      const code = p.code.toUpperCase();
      const link = UPCOMING_PROGRAM_LINKS[code] ?? { href: `/${code.toLowerCase()}`, cta: "Learn More" };
      return { code, title: p.title, date: programDateLabel(p, now), description: p.description, ...link };
    });
}
