// Single source of truth for the PPAP / PPIP application survey questions.
// These render the application forms AND build the `responses[]` array sent to
// POST /application/register.

export type ProgramCode = "PPAP" | "PPIP";

export type QuestionType =
  | "SINGLE_OPTION"
  | "MULTIPLE_OPTION"
  | "TEXT"
  | "SHORT_TEXT"
  | "LONG_TEXT";

// Allowed `category` values accepted by POST /application/register.
export type ResponseCategory =
  | "EXPERIENCE"
  | "CURRENT_ROLE"
  | "TRACK_SELECTION"
  | "MOTIVATION"
  | "CHALLENGE"
  | "GOALS"
  | "COMMITMENT";

export interface QuestionDef {
  /** Stable id used for form field names, responses, and dependsOn wiring. */
  id: string;
  /** Category sent with the response (must be a valid ResponseCategory). */
  category: ResponseCategory;
  /** Optional section pill label shown above the question. */
  pill?: string;
  content: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  /** Only show this question when another question's answer equals `value`. */
  dependsOn?: { id: string; value: string };
}

export const ppapQuestions: QuestionDef[] = [
  {
    id: "stage",
    category: "CURRENT_ROLE",
    pill: "Background",
    content: "Tell us about your current stage",
    type: "SINGLE_OPTION",
    required: true,
    options: [
      "Student",
      "Recent graduate",
      "Working professional (non-tech)",
      "Working in tech (non-product role)",
    ],
  },
  {
    id: "experience",
    category: "EXPERIENCE",
    pill: "Experience",
    content: "What's your product management level experience?",
    type: "SINGLE_OPTION",
    required: true,
    options: [
      "I'm completely new",
      "I've watched/read a few resources",
      "I've taken a course but still confused",
      "I understand basics but need structure",
    ],
  },
  {
    id: "motivation",
    category: "MOTIVATION",
    pill: "Motivation",
    content: "Why do you want to learn Product Management?",
    type: "TEXT",
    required: true,
    placeholder: "I want to become a PM because...",
  },
  {
    id: "challenge",
    category: "CHALLENGE",
    pill: "Challenge",
    content: "What is your biggest challenge right now?",
    type: "MULTIPLE_OPTION",
    required: true,
    options: [
      "I don't understand how PM works",
      "I feel overwhelmed by too many resources",
      "I don't know where to start",
      "I lack structure and guidance",
      "Other",
    ],
  },
  {
    id: "expectation",
    category: "GOALS",
    pill: "Expectation",
    content: "What do you hope to achieve from this program?",
    type: "TEXT",
    required: true,
    placeholder: "Tell us what you hope to achieve...",
  },
  {
    id: "commitment",
    category: "COMMITMENT",
    pill: "Commitment",
    content: "Can you commit to attending sessions and completing assignments?",
    type: "SINGLE_OPTION",
    required: true,
    options: ["Yes", "Not sure yet"],
  },
];

export const ppipQuestions: QuestionDef[] = [
  {
    id: "situation",
    category: "CURRENT_ROLE",
    pill: "Background",
    content: "Which best describes your current situation?",
    type: "SINGLE_OPTION",
    required: true,
    options: [
      "Beginner (just exploring Product Management)",
      "Completed a PM course / bootcamp",
      "Entry-level Product Manager",
      "Transitioning from another role into Product",
    ],
  },
  {
    id: "biggestChallenge",
    category: "CHALLENGE",
    pill: "Challenge",
    content: "What is your biggest challenge right now?",
    type: "TEXT",
    required: true,
    placeholder: "Type in your answer...",
  },
  {
    id: "whyJoin",
    category: "MOTIVATION",
    pill: "Motivation",
    content: "Why do you want to join the ProductPointers Internship Program?",
    type: "TEXT",
    required: true,
    placeholder: "Type in your answer...",
  },
  {
    id: "commitment",
    category: "COMMITMENT",
    pill: "Commitment",
    content:
      "This is a 10-week internship. Can you commit your time and effort?",
    type: "SINGLE_OPTION",
    required: true,
    options: ["Yes, I'm ready to commit", "Not sure yet"],
  },
  {
    id: "goal",
    category: "GOALS",
    content: "What do you hope to achieve by the end of this internship?",
    type: "TEXT",
    required: true,
    placeholder: "Type in your answer...",
  },
  {
    id: "currentlyWorking",
    category: "EXPERIENCE",
    pill: "Experience",
    content: "Are you currently working in any product/project related role?",
    type: "SINGLE_OPTION",
    required: true,
    options: ["Yes", "No"],
  },
  {
    id: "workExperience",
    category: "EXPERIENCE",
    content: "Have you worked on any product/project before? Tell us about it.",
    type: "TEXT",
    required: true,
    placeholder:
      "Briefly describe your role, the product/project, and your contribution...",
    dependsOn: { id: "currentlyWorking", value: "Yes" },
  },
];

export interface ProgramConfig {
  /** programCode sent to the register endpoint (confirm the exact cohort code). */
  programCode: string;
  questions: QuestionDef[];
}

/**
 * Checks that every required question (visible per its `dependsOn`) has at
 * least one answer. Native `required` already covers text fields and
 * single-select radios; this fills the gap for multi-select checkbox groups,
 * which can't express "at least one checked" with the `required` attribute.
 */
export function validateRequiredAnswers(
  questions: QuestionDef[],
  formData: FormData
): string | null {
  for (const q of questions) {
    if (!q.required) continue;
    if (q.dependsOn && formData.get(q.dependsOn.id) !== q.dependsOn.value) {
      continue;
    }
    const answered = formData
      .getAll(q.id)
      .some((v) => String(v).trim().length > 0);
    if (!answered) {
      return "Please answer all required questions before submitting.";
    }
  }
  return null;
}

export const PROGRAMS: Record<ProgramCode, ProgramConfig> = {
  PPAP: { programCode: "PPAP", questions: ppapQuestions },
  PPIP: { programCode: "PPIP", questions: ppipQuestions },
};
