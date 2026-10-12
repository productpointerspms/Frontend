import Image from "next/image";
import Link from "next/link";
import styles from "./coaching.module.css";

export default function FinalCTA() {
  return (
    <section data-ppcp-section="FinalCTA" className={styles.finalCTA} aria-labelledby="coaching-next-step-title">
      <div className={styles.finalInner}>
        <div className={styles.finalPhoto}><Image src="/images/scholarships/closing-portrait.webp" alt="A ProductPointers team member welcoming your next step" fill sizes="(max-width: 760px) 90vw, 56vw" /></div>
        <div className={styles.finalPanel}>
          <p className={styles.eyebrow}>READY TO MOVE FORWARD?</p>
          <h2 id="coaching-next-step-title" className={styles.heading}>You Don’t Have to Figure Out<br className={styles.desktopBreak} /> Your Next Step Alone.</h2>
          <p>Get focused guidance, practical perspective and a clearer path forward.</p>
          <div className={styles.actions}><Link href="/ppcp/apply" className={`${styles.button} ${styles.pink}`}>Book a Coaching Session</Link><Link href="#coaching-program-details" className={`${styles.button} ${styles.outline}`}>See Program Details</Link></div>
        </div>
      </div>
    </section>
  );
}
