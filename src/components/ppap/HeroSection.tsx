"use client";

import Image from "next/image";
import Link from "next/link";
import { useProgramDates, formatDateRange, formatDurationWeeks } from "@/lib/useProgramDates";
import { bricolage } from "@/lib/fonts";
import styles from "./hero.module.css";

export default function HeroSection() {
  const { startTime, endTime } = useProgramDates("PPAP");
  const dates = startTime && endTime ? formatDateRange(startTime, endTime) : "September 18th – December 11th, 2026";
  const duration = formatDurationWeeks(startTime, endTime) || "10 weeks";
  const brochureUrl = process.env.NEXT_PUBLIC_PPAP_BROCHURE_URL;

  return (
    <section data-ppap-section="HeroSection" className={styles.hero} aria-labelledby="ppap-hero-title">
      <Image src="/images/ppap/hero.png" alt="" fill priority sizes="100vw" className={styles.background} />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.badge}>Product Management Accelerator Program</p>
        <h1 id="ppap-hero-title" className={`${bricolage.className} ${styles.heading}`}>
          Start Your Product Management Journey
          <span className={styles.secondLine}>With the <span className={styles.highlight}>Right Foundation.</span></span>
        </h1>
        <p className={styles.description}>Whether you’re completely new to Product Management, transitioning from another career or tired of trying to figure it all out on your own, PPAP gives you a structured path to learn the fundamentals, build practical skills and understand how Product Managers think and work.</p>
        <div className={styles.actions}>
          <a href="#pricing" className={styles.apply}>Apply for the Accelerator Program</a>
          <Link href={brochureUrl || "/contact?interest=ppap-brochure"} className={styles.brochure} {...(brochureUrl ? { target: "_blank", rel: "noopener noreferrer" } : { title: "Request the PPAP brochure from our team" })}>Download Brochure</Link>
        </div>
        <dl className={styles.details}>
          <div><dt>Next Batch:</dt><dd>{dates}</dd></div>
          <div><dt>Duration:</dt><dd>{duration}</dd></div>
          <div><dt>Format:</dt><dd>100% Online | Live Sessions | Practical Learning</dd></div>
          <div><dt>Cohort Size:</dt><dd>20 participants</dd></div>
        </dl>
        <ul className={styles.features} aria-label="Program highlights">
          <li>12 weeks</li><li>Structured learning</li><li>Practical assignments</li><li>Mentorship &amp; feedback</li>
        </ul>
      </div>
    </section>
  );
}
