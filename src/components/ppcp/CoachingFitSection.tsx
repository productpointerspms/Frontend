import { CircleCheck } from "lucide-react";
import styles from "./coaching.module.css";

const goals = [
  "You want personalised guidance for your Product career.",
  "You’re navigating a specific Product Management challenge.",
  "You need expert feedback on your work and decisions.",
  "You’re transitioning into Product Management and need guidance on your next steps.",
];

export default function CoachingFitSection() {
  return (
    <section data-ppcp-section="CoachingFitSection" id="coaching-fit" className={`${styles.section} ${styles.fit}`} aria-labelledby="coaching-fit-title">
      <div className={`${styles.container} ${styles.fitGrid}`}>
        <div><p className={styles.eyebrow}>READY FOR THE NEXT STAGE?</p><h2 id="coaching-fit-title" className={styles.heading}>Come With a Goal.<br />Leave With a Clearer Path Forward.</h2></div>
        <div><h3>PPTP IS FOR YOU IF:</h3><ul>{goals.map(goal => <li key={goal}><CircleCheck size={20} aria-hidden="true" /><span>{goal}</span></li>)}</ul></div>
      </div>
    </section>
  );
}
