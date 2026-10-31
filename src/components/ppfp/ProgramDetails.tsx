import styles from "./program-details.module.css";

const details = [
  { label: "Duration", value: "10 Weeks" },
  { label: "Format", value: "100% Online" },
  { label: "Structure", value: "8 Weeks Learning + 2 Weeks Capstone" },
  { label: "Learning Style", value: "Live Sessions + Practical Activities + Assignments + Capstone" },
  { label: "Level", value: "Beginner to Intermediate" },
  { label: "Cohort Size", value: "20 Participants" },
  { label: "Prerequisite", value: "No prior fintech experience required" },
];

export default function ProgramDetails() {
  return (
    <section id="program-details" className={styles.section} aria-labelledby="ppfp-details-title">
      <div className={styles.layout}>
        <header><p className={styles.eyebrow}>Program Details</p><h2 id="ppfp-details-title" className={styles.heading}>What You Need to Know Before Applying.</h2></header>
        <dl className={styles.details}>
          {details.map(({ label, value }) => (
            <div key={label} className={label === "Cohort Size" ? styles.cohort : undefined}>
              <dt>{label}</dt>
              <dd>{value}{label === "Cohort Size" && <div className={styles.availability}><span>10 of 20</span><progress value={10} max={20} aria-label="Cohort places filled" /></div>}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
