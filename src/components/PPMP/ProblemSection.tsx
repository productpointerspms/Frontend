import Image from "next/image";
import styles from "./ppmp.module.css";

const conversations = [
  ["You might be discussing:", "APIs with Engineering."],
  ["Then analysing:", "Activation, conversion and retention with Data or Growth."],
  ["Then reviewing:", "A feature with QA."],
  ["Then working with:", "Design on the user experience."],
  ["Then navigating:", "Payments, risk or compliance with the business."],
  ["And increasingly, you’re expected to:", "Use AI to research, analyze, prototype and execute faster."],
];
export default function ProblemSection() {
  return <section className={styles.section}>
    <div className={`${styles.container} ${styles.reality}`}>
      <div>
        <p className={styles.eyebrow}>The reality of modern Product Management</p>
        <h2>Being a Product Manager means working far beyond Product.</h2>
        <p className={styles.intro}>Your job isn’t just writing PRDs, managing backlogs or updating a roadmap.</p>
        <dl className={styles.conversations}>{conversations.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <div className={styles.realityEnd}><p>Through all of this, you’re still expected to make sound product decisions.</p><p>You already wear these hats.</p><p>The question is:</p><h3>Do you have the skills to wear them confidently?</h3></div>
      </div>
      <div className={styles.realityPhoto}><Image src="/images/ppmp/reality.jpg" alt="A Product Manager having a conversation at work" width={502} height={658} sizes="(max-width: 767px) 100vw, 40vw" /></div>
    </div>
  </section>;
}
