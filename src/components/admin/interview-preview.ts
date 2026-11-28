export type InterviewQuestion = { id: string; group: string; prompt: string; criteria: string; maxScore?: number; followUp: string };

export const interviewQuestions: InterviewQuestion[] = [
  { id: "1", group: "Your product foundations", prompt: "Have you gone through any foundational product management training? Tell me what you covered and how recently.", criteria: "Describe specific concepts and connect them to a practical example.", followUp: "Where have you applied what you learned?" },
  { id: "2", group: "Product discovery", prompt: "How would you find out why new users stop using a product?", criteria: "Distinguish observed behaviour from assumptions.", followUp: "What evidence would change your initial explanation?" },
  { id: "3", group: "Problem solving", prompt: "Tell me about a problem you defined before proposing a solution.", criteria: "Explain the problem, constraints and outcome.", followUp: "What was your first step?" },
  { id: "4", group: "Working with others", prompt: "Tell me about a time you worked with someone who disagreed with your approach.", criteria: "Give a concrete example and explain how you resolved the disagreement.", followUp: "What did you learn?" },
  { id: "5", group: "Learning and feedback", prompt: "What is an example of feedback you acted on?", criteria: "Explain the feedback, action and result.", followUp: "How did you know your change helped?" },
  { id: "6", group: "Commitment", prompt: "How will you make time for the apprenticeship alongside your current commitments?", criteria: "Describe a realistic plan.", followUp: "What would you do if your availability changed?" },
];

const previewKey = "productpointers.interview-preview";
export type InterviewPreview = { duration: number; intro: string; questions: InterviewQuestion[] };

export function saveInterviewPreview(duration: number, questions: InterviewQuestion[], intro: string) {
  window.sessionStorage.setItem(previewKey, JSON.stringify({ duration, intro, questions }));
}

export function readInterviewPreview(): InterviewPreview {
  const fallback = { duration: 17, intro: "Find a quiet space and keep your camera and microphone on.", questions: interviewQuestions };
  try {
    const stored = window.sessionStorage.getItem(previewKey);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored) as InterviewPreview;
    return Number.isInteger(parsed.duration) && parsed.duration >= 1 && parsed.duration <= 120 &&
      typeof parsed.intro === "string" && Array.isArray(parsed.questions) && parsed.questions.length &&
      parsed.questions.every(({ id, group, prompt, criteria, followUp }) =>
        [id, group, prompt, criteria, followUp].every((field) => typeof field === "string")) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
