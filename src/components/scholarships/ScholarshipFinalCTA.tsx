import Image from "next/image";
import { ScholarshipButton, SectionHeading } from "./ScholarshipUI";
import styles from "./scholarships.module.css";

export default function ScholarshipFinalCTA() {
  return <section className={styles.finalCTA} aria-labelledby="scholarship-next-step"><div className={styles.finalInner}><div className={styles.finalImage}><Image src="/images/scholarships/closing-portrait.webp" alt="A ProductPointers team member ready to help learners find their next opportunity" fill sizes="(max-width: 760px) 90vw, 56vw" /></div><div className={styles.finalPanel}><SectionHeading eyebrow="YOUR NEXT STEP STARTS HERE" title={<span id="scholarship-next-step">Find the Opportunity<br />That’s Right for You.</span>} /><p>Whether you’re looking for support to pursue Product Management or looking to help someone else access the opportunity, there’s a place for you here.</p><div className={styles.actions}><ScholarshipButton href="#available-scholarships" variant="pink">View Available Scholarships</ScholarshipButton><ScholarshipButton href="#sponsor-a-learner" variant="outline">Sponsor a Learner</ScholarshipButton></div></div></div></section>;
}
