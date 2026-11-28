import { AiInterviewExperience } from "@/components/previews/AiInterviewExperience";
import { CandidateInterview } from "@/components/previews/CandidateInterview";
import { inter } from "@/lib/fonts";
import styles from "@/components/admin/admin.module.css";

export const metadata = { title: "Interview setup", robots: { index: false, follow: false } };

export default async function InterviewSetupPage({searchParams}:{searchParams:Promise<{preview?:string}>}) {
  return <div className={`${inter.className} ${styles.admin}`}>{(await searchParams).preview === "1" ? <AiInterviewExperience /> : <CandidateInterview />}</div>;
}
