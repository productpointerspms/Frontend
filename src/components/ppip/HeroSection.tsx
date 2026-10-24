"use client";

import Image from "next/image";
import { bricolage } from "@/lib/fonts";
import { useProgramDates, formatDateRange, formatDurationWeeks } from "@/lib/useProgramDates";
import styles from "./hero.module.css";

const features = ["12 weeks", "Hands-on experience", "Real product challenges", "Mentorship & feedback", "Portfolio-ready evidence"];

export default function HeroSection() {
  const { startTime, endTime } = useProgramDates("PPIP");
  const dates = startTime && endTime ? formatDateRange(startTime, endTime) : "October 12th – Dec 18th, 2026";
  const duration = formatDurationWeeks(startTime, endTime) || "10 weeks";

  return (
    <section data-ppip-section="HeroSection" className={styles.hero} aria-labelledby="ppip-hero-title">
      <Image src="/images/ppip/hero.png" alt="" fill priority sizes="100vw" className={styles.background} />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.badge}>Product Management Apprenticeship/Internship Program</p>
        <h1 id="ppip-hero-title" className={`${bricolage.className} ${styles.heading}`}>
          <span>Turn Your Product Management</span>
          <span>Knowledge Into <strong>Practical</strong></span>
          <span className={styles.highlight}>Experience.</span>
        </h1>
        <p className={styles.description}>You’ve learned the concepts and built your foundation. Now it’s time to put that knowledge to work. PPIP is a 12-week hands-on apprenticeship where you work on real product challenges, receive feedback and build practical experience along the way.</p>
        <div className={styles.actions}>
          <a href="#pricing" className={styles.apply}>Apply for the Scholarship</a>
          <a href="#pricing" className={styles.waitlist}>Join the Waitlist</a>
        </div>
        <dl className={styles.details}>
          <div><dt>Next Batch:</dt><dd>{dates}</dd></div>
          <div><dt>Duration:</dt><dd>{duration}</dd></div>
          <div><dt>Format:</dt><dd>100% Online | Live Sessions | Practical Learning</dd></div>
          <div><dt>Cohort Size:</dt><dd>20 participants</dd></div>
        </dl>
        <ul className={styles.features} aria-label="Program highlights">{features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      </div>
    </section>
  );
}
