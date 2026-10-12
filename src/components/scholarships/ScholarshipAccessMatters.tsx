import { ArrowRight } from "lucide-react";
import { ScholarshipButton, SectionHeading } from "./ScholarshipUI";
import styles from "./scholarships.module.css";

const benefits = [
  { title: "Quality Education", description: "Access structured Product Management learning." },
  { title: "Practical Skills", description: "Learn how Product Managers think and work." },
  { title: "Career Opportunity", description: "Build skills you can take into your next opportunity." },
];

export default function ScholarshipAccessMatters() {
  return (
    <section className={`${styles.container} ${styles.accessMatters}`} aria-labelledby="access-matters-title">
      <SectionHeading eyebrow="WHY ACCESS MATTERS" title={<span id="access-matters-title">Potential Shouldn’t Be Limited by Access.</span>} />
      <ol className={styles.accessBenefits}>{benefits.map((benefit, index) => <li key={benefit.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{benefit.title}</h3><p>{benefit.description}</p></li>)}</ol>
      <ScholarshipButton href="#available-scholarships">View Scholarships <ArrowRight size={18} /></ScholarshipButton>
    </section>
  );
}
