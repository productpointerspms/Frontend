import { SectionHeading } from "./ScholarshipUI";
import styles from "./scholarships.module.css";

const steps = [
  { title: "Find.", description: "Explore scholarships currently available and choose one that matches your goals." },
  { title: "Check.", description: "Review the eligibility requirements and application details before applying." },
  { title: "Apply.", description: "Submit your application and take your next step toward Product Management." },
];

export default function ScholarshipHowItWorks() {
  return <section className={styles.howItWorks} aria-labelledby="application-steps-title"><div className={styles.container}><SectionHeading eyebrow="HOW IT WORKS" title={<span id="application-steps-title">Find it. Check it. Apply.</span>} /><ol className={styles.applicationSteps}>{steps.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></div></section>;
}
