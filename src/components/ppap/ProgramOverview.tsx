import { bricolage } from "@/lib/fonts";
import styles from "./program-overview.module.css";

const steps = [
  { title: "Learn the Concept", description: "Structured lessons introduce each area of product thinking clearly." },
  { title: "Apply What You’ve Learned", description: "Exercises and assignments put the concepts into practice immediately." },
  { title: "Get Feedback", description: "Receive structured input from mentors and coaches on your work." },
  { title: "Strengthen Your Understanding", description: "Refine your thinking and build real confidence in the material." },
];

export default function ProgramOverview() {
  return (
    <section data-ppap-section="ProgramOverview" className={styles.section} aria-labelledby="ppap-overview-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Learning by doing</p>
            <h2 id="ppap-overview-title" className={`${bricolage.className} ${styles.heading}`}>
              Don’t Just Learn the<br className={styles.desktopBreak} /> Concepts. Start Putting Them<br className={styles.desktopBreak} /> Into Practice.
            </h2>
          </div>
          <p className={styles.description}>You’ll learn the foundations of Product Management and apply your learning through practical exercises and assignments designed to help you understand how the work comes together.</p>
        </div>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <div className={styles.marker} aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
              <h3 className={`${bricolage.className} ${styles.stepTitle}`}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
