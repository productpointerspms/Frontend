// Single source of truth for program display info used by the shared
// checkout page. Keyed by `program.code` (matches the API's program.code).

import { PROGRAM_FEE_NGN, ORIGINAL_FEE_NGN } from "./pricing";

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
