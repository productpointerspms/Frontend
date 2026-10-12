import CoachCard, { type Coach } from "./CoachCard";
import styles from "./coaching.module.css";

// The supplied layout repeats this profile in four rows.
const coaches: Coach[] = Array.from({ length: 4 }, (_, index) => ({
  id: `blessing-${index + 1}`,
  name: "Blessing Okomor",
  role: "Product Manager, Mainstack",
  image: "/images/homepage/blessing.jpeg",
  experience: "3+ Years of Experience",
  expertise: ["Fintech", "Product strategy", "Growth"],
  bio: "Meet a Product Leader who turned her own journey from Accounting, Business and Entrepreneurship into a mission to help others build practical skills, gain experience and confidently find their path in Product Management.",
  price: 30000,
}));

export default function CoachesSection() {
  return (
    <section data-ppcp-section="CoachesSection" id="coaches" className={`${styles.section} ${styles.coaches}`} aria-labelledby="coaches-title">
      <div className={styles.container}>
        <div className={styles.introGrid}>
          <div><p className={styles.eyebrow}>LEARN FROM EXPERIENCE</p><h2 id="coaches-title" className={styles.heading}>Get guidance from someone<br className={styles.desktopBreak} /> who understands the work.</h2></div>
          <p className={styles.introText}>Our coaches are working product managers. Pick the one whose background fits where you want to go, choose a session that suits your pace, and send your request.</p>
        </div>
        <h3 className={styles.coachesSubheading}>Meet your coaches</h3>
        <div className={styles.coachList}>{coaches.map(coach => <CoachCard key={coach.id} coach={coach} />)}</div>
      </div>
    </section>
  );
}
