"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Flame } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { scholarshipConfig, type ScholarshipProgram } from "./scholarship";
import styles from "./scholarship.module.css";

export default function ApplicationReceived({ program }: { program: ScholarshipProgram }) {
  const config = scholarshipConfig(program);
  const heading = useRef<HTMLHeadingElement>(null);
  const scholarshipName = program === "PPFP" ? "PPFP Scholarship" : config.scholarshipName;
  const waitlistUrl = process.env.NEXT_PUBLIC_SCHOLARSHIP_WAITLIST_URL;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    heading.current?.focus({ preventScroll: true });
  }, []);

  const communityLabel = <><FaWhatsapp size={26} aria-hidden="true" />Join Scholarship Waitlist Community</>;

  return (
    <div className={styles.page}>
      <section className={styles.successCard} aria-labelledby="application-received-title">
        <header className={styles.successHeader}>
          <span className={styles.check}><Check size={30} strokeWidth={1.5} aria-hidden="true" /></span>
          <h1 id="application-received-title" ref={heading} tabIndex={-1}>Application Received!</h1>
          <p>Thank you for applying for the {scholarshipName}.</p>
        </header>
        <div className={styles.successBody}>
          <p className={styles.received}>
            We have received your application for the <strong>{config.programName}.</strong>{" "}
            Your submission will be evaluated based on your eligibility, motivation, career goals, and commitment to the {config.duration} program.
          </p>
          <aside className={styles.slots} aria-label="Scholarship availability">
            <Flame size={26} fill="currentColor" aria-hidden="true" />
            <p>There are <strong>20 scholarship slots available</strong> in total, and we have received applications from aspiring product managers ready to take the next step in their tech careers.</p>
          </aside>
          <h2>What happens next?</h2>
          <ol className={styles.nextSteps}>
            <li><span aria-hidden="true">1</span><p>Our admissions team will review your application and contact you within <strong>12 to 48 hours</strong> with an official update.</p></li>
            <li><span aria-hidden="true">2</span><p>If selected, you will receive an official acceptance email containing instructions to secure your scholarship slot and complete the remaining <strong>{config.contribution}</strong> tuition contribution.</p></li>
            <li><span aria-hidden="true">3</span><p>Please check your email inbox (and spam folder) regularly for updates from our team.</p></li>
          </ol>
          {waitlistUrl ? (
            <Link href={waitlistUrl} className={styles.waitlist} target="_blank" rel="noopener noreferrer">{communityLabel}</Link>
          ) : (
            <button type="button" className={styles.waitlist} disabled title="Community invitation link coming soon" aria-describedby="community-placeholder">{communityLabel}</button>
          )}
          <p className={styles.communityNote}>Join our candidate community to get firsthand information, status updates, and future opportunities.</p>
          {!waitlistUrl && <span id="community-placeholder" className="sr-only">Community invitation link coming soon.</span>}
        </div>
      </section>
    </div>
  );
}
