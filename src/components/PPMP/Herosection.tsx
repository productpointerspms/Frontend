"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDateRange, useProgramDates } from "@/lib/useProgramDates";
import styles from "./ppmp.module.css";

export default function ProgramHero() {
  const { startTime, endTime } = useProgramDates("PPMP");
  const brochure = process.env.NEXT_PUBLIC_PPMP_BROCHURE_URL;
  return (
    <>
    <section className={styles.hero} aria-labelledby="ppmp-title">
      <Image src="/images/ppap/hero.png" alt="ProductPointers participants working together" fill priority unoptimized sizes="100vw" className={styles.heroPhoto} />
      <div className={styles.heroShade} />
      <div className={styles.heroContent}>
        <p className={styles.badge}>Product Management Mastery Program (PMs with 1+ year experience)</p>
        <h1 id="ppmp-title">Become a More Technical, Data-Driven and AI-Powered Product Manager.</h1>
        <p className={styles.heroDescription}>A practical advanced program for PMs with 1+ years of experience who want to expand beyond the traditional PM toolkit, make stronger product decisions and work more confidently across Engineering, Data, Design, Growth and Business.</p>
        <p className={styles.highlight}>For Product Managers with 1+ years of experience</p>
        <div className={styles.heroActions}>
          <a className={styles.button} href="#pricing">Apply for the scholarship</a>
          <Link className={styles.outline} href={brochure || "/contact?interest=ppmp-brochure"} {...(brochure ? { target: "_blank", rel: "noopener noreferrer" } : {})}>Download Brochure</Link>
        </div>
        <dl className={styles.heroDetails}>
          <div><dt>Next Batch:</dt><dd>{startTime && endTime ? formatDateRange(startTime, endTime) : "January 15th – April 9th, 2027"}</dd></div>
          <div><dt>Duration:</dt><dd>10 weeks</dd></div>
          <div><dt>Format:</dt><dd>100% Online | Live Sessions | Practical Learning</dd></div>
          <div><dt>Cohort Size:</dt><dd>20 participants</dd></div>
        </dl>
        <ul className={styles.heroFeatures}>{["5 mastery sessions", "Practical assignments", "Real product cases", "Hands-on tools", "Capstone"].map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>
    <div className={styles.mobileApply}><a href="#pricing" className={styles.button}>Apply for the scholarship</a></div>
    </>
  );
}
