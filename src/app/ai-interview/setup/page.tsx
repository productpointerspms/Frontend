import { AiInterviewExperience } from "@/components/previews/AiInterviewExperience";
import { inter } from "@/lib/fonts";
import styles from "@/components/admin/admin.module.css";

export const metadata = { title: "Interview setup", robots: { index: false, follow: false } };

export default function InterviewSetupPage() {
  return <div className={`${inter.className} ${styles.admin}`}><AiInterviewExperience /></div>;
}
