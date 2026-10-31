import styles from "./coaching.module.css";

const details = [
  { label: "Duration", value: "3 months or 6 months" },
  { label: "Format", value: "Weekly one-on-one sessions" },
  { label: "Experience level", value: "Aspiring to Experienced Product Managers" },
  { label: "Certificate", value: "Certificate eligibility depends on the specific mentorship or coaching program." },
  { label: "Community access", value: "Yes" },
];

export default function CoachingProgramDetails() {
  return (
    <section data-ppcp-section="CoachingProgramDetails" id="coaching-program-details" className={`${styles.section} ${styles.programDetails}`} aria-labelledby="coaching-program-details-title">
      <div className={`${styles.container} ${styles.programDetailsGrid}`}>
        <div>
          <p className={styles.eyebrow}>PROGRAM DETAILS</p>
          <h2 id="coaching-program-details-title" className={styles.heading}>What You Need to Know Before Applying.</h2>
        </div>
        <dl className={styles.programDetailsList}>
          {details.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
