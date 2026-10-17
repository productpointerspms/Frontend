import { type ApplicationResponseItem } from "@/lib/application";

export const journeyOptions = [
  "I am currently new to product management",
  "I have started learning product management independently",
  "I have completed a product management course or training",
  "I am currently transitioning from another career into product management",
  "I am already working in product/tech and want to grow my skills",
  "Others",
];
export const declarations = [
  "I confirm that the information and documents provided in this application are accurate, complete, and truthful.",
  "I understand that submitting this application does not automatically guarantee selection for a scholarship slot.",
  "I understand that only 20 applicants will be selected for this cohort of the Onome Scholarship.",
  "I understand that selected scholars will be required to pay the remaining ₦75,000 tuition contribution to secure their place in the accelerator program.",
];
export type ScholarshipProgram = "PPAP" | "PPIP" | "PPFP" | "PPMP";
export function scholarshipConfig(program: ScholarshipProgram) {
  const ppmp = program === "PPMP";
  const ppip = program === "PPIP";
  const ppfp = program === "PPFP";
  const programName = ppmp ? "Product Management Mastery Program" : ppfp ? "Fintech Product Management Program" : ppip ? "Product Management Apprenticeship/Internship Program" : "Product Management Accelerator Program";
  const scholarshipName = ppmp ? "PPMP Scholarship" : ppfp ? "Chisom Scholarship" : ppip ? "PPIP Scholarship" : "Onome Scholarship";
  const contribution = ppmp ? "₦155,000" : ppfp ? "₦150,000" : ppip ? "₦30,000" : "₦75,000";
  const programLabel = ppmp ? "Product Management Mastery program" : ppfp ? "Fintech Product Management program" : ppip ? "apprenticeship/internship program" : "accelerator program";
  return {
    programName, scholarshipName, contribution, programLabel,
    duration: (ppfp || ppmp) ? "10-week" : "12-week",
    coverage: ppmp ? "₦655,000" : ppfp ? "₦150,000" : ppip ? "₦145,000" : "₦210,000", tuition: ppmp ? "₦810,000" : ppfp ? "₦300,000" : ppip ? "₦175,000" : "₦285,000",
    requiresNysc: program === "PPAP",
    motivationQuestion: (ppfp || ppmp) ? "Tell us briefly about your Product Management experience." : ppip ? "Why do you want to join the Product Management Apprenticeship/Internship Program?" : "Why do you want to pursue a career in Product Management?",
    secondQuestion: ppmp ? "What is your biggest challenge as a Product Manager right now?" : ppfp ? "Why should you be selected for the Chisom Scholarship?" : ppip ? "Describe a problem you’ve noticed in the real world that you’d love to solve." : "Why should you be considered for the Onome Scholarship?",
    journeyOptions: ppmp ? ["I’ve completed a PM course", "I’ve worked on personal product projects", "I have 6–12 months product experience", "I have 1+ year product experience", "Others"] : ppfp ? ["Product Manager", "Associate/Junior Product Manager", "Product Analyst", "Product designer working closely with Product", "Product Operations", "Others"] : ppip ? ["Aspiring Product Manager - Beginner", "Aspiring Product Manager - Currently learning Product Management", "Entry-level / Associate Product Manager", "Product Manager", "Career switcher exploring Product Management", "Others"] : journeyOptions,
    declarations: [declarations[0], declarations[1], `I understand that only 20 applicants will be selected for this cohort of the ${scholarshipName}.`, `I understand that selected scholars will be required to pay the remaining ${contribution} tuition contribution to secure their place in the ${programLabel}.`],
  };
}
export const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

export function scholarshipResponses(data: FormData, program: ScholarshipProgram = "PPAP"): ApplicationResponseItem[] {
  const config = scholarshipConfig(program);
  const answer = (name: string) => String(data.get(name) ?? "").trim();
  return [
    { category: "TRACK_SELECTION", question: "Application type", response: `${config.scholarshipName} — ${config.programName}` },
    { category: "CURRENT_ROLE", question: "Where are you currently based?", response: answer("location") },
    { category: "EXPERIENCE", question: "Highest level of education", response: answer("education") },
    { category: "CURRENT_ROLE", question: "What is your current NYSC status?", response: config.requiresNysc ? answer("nysc") : "" },
    { category: "EXPERIENCE", question: "Where are you today in your product journey?", response: answer("journey") === "Others" ? `Others: ${answer("otherJourney")}` : answer("journey") },
    { category: "EXPERIENCE", question: "LinkedIn profile", response: answer("linkedin") },
    { category: (program === "PPFP" || program === "PPMP") ? "EXPERIENCE" : "MOTIVATION", question: config.motivationQuestion, response: answer("motivation") },
    ...(program === "PPFP" ? [
      { category: "EXPERIENCE", question: "Where did you complete your foundational Product Management training?", response: answer("training") },
      { category: "EXPERIENCE", question: "Share at least 2 products you have built or worked on.", response: answer("products") },
      { category: "MOTIVATION", question: "Why do you want to transition into Fintech Product Management?", response: answer("fintechMotivation") },
    ] : []),
    { category: program === "PPMP" ? "CHALLENGE" : "MOTIVATION", question: config.secondQuestion, response: answer("scholarshipReason") },
    { category: "COMMITMENT", question: `Can you commit to the full ${config.duration} ${config.programLabel} and pay the remaining ${config.contribution} tuition contribution if selected?`, response: answer("commitment") },
    ...config.declarations.map((question, index) => ({ category: "COMMITMENT", question, response: data.get(`declaration-${index}`) === "on" ? "Confirmed" : "Not confirmed" })),
  ].filter(item => item.response.length > 0);
}
