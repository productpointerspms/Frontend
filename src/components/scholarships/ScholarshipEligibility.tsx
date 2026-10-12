import Image from "next/image";
import { Check } from "lucide-react";
import { SectionHeading } from "./ScholarshipUI";
import styles from "./scholarships.module.css";

const requirements = [
  "You’re ready to learn and grow in Product Management.",
  "You meet the requirements of the scholarship you’re applying for.",
  "You’re able to commit to the associated program or opportunity.",
  "You have a genuine need for financial support.",
  "You’re ready to participate fully and make the most of the opportunity.",
];

export default function ScholarshipEligibility() {
  return <section id="scholarship-eligibility" className={`${styles.container} ${styles.eligibility}`} aria-labelledby="eligibility-title">
    <div className={styles.learnerCollage}>
      {['A learner working on a laptop', 'A learner studying Product Management', 'A smiling learner at her desk'].map((alt, index) => <div key={alt} className={index === 0 ? styles.tallPhoto : styles.learnerPhoto}><Image src={`/images/scholarships/learner-${index + 1}.jpg`} alt={alt} fill sizes="(max-width: 760px) 45vw, 22vw" /></div>)}
    </div>
    <div className={styles.eligibilityCopy}><SectionHeading eyebrow="CHECK YOUR ELIGIBILITY" title={<span id="eligibility-title">Could This Scholarship Be Right for You?</span>} /><p className={styles.intro}>Every scholarship has its own eligibility requirements. Before applying, check that you meet the criteria for the opportunity you’re interested in.</p><ul className={styles.checklist}>{requirements.map(requirement => <li key={requirement}><span><Check size={14} aria-hidden="true" /></span>{requirement}</li>)}</ul><aside className={styles.note}><strong>Note</strong><p>Eligibility requirements may vary by scholarship. Check the specific scholarship details before applying.</p></aside></div>
  </section>;
}
