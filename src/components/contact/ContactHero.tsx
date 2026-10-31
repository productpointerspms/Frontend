import Image from "next/image";
import { Users, Zap } from "lucide-react";
import styles from "./contact.module.css";

export default function ContactHero() {
  return <section id="contact-hero" className={styles.hero} aria-labelledby="contact-title"><div className={styles.heroGrid}>
    <div className={styles.heroCopy}><p className={styles.eyebrow}>WE’RE HERE TO HELP</p><h1 id="contact-title">Let’s Help You Find <span>Your Next Step</span></h1><p className={styles.description}>Whether you have questions about our programs, mentorship, internships, or specialization tracks, the ProductPointers team is here to help</p>
      <a href="#send-a-message" className={`${styles.primary} ${styles.heroMessageLink}`}>Send Us a Message</a>
      <div className={styles.benefits}><div><span className={styles.zap}><Zap size={30} aria-hidden="true" /></span><div><h2>Fast Response Guarantee</h2><p>Typically within 24 hours (Monday – Friday)</p></div></div><div><span className={styles.people}><Users size={30} aria-hidden="true" /></span><div><h2>Direct Advisory Access</h2><p>Speak directly with experienced PM career advisors</p></div></div></div>
    </div>
    <div className={styles.heroVisual}><div className={styles.heroPhoto}><Image src="/images/contact-hero-with-background.png" alt="Woman seated at a laptop, ready to help with your enquiry" fill priority sizes="(max-width: 767px) 100vw, 55vw" /></div></div>
  </div></section>;
}
