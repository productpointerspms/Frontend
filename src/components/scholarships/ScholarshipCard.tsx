import Link from "next/link";
import { Plus, UserRound } from "lucide-react";
import { formatDeadline, type ScholarshipListing } from "@/lib/scholarships";
import styles from "./available-scholarships.module.css";

export type Scholarship = ScholarshipListing;

const naira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function ScholarshipCard({ scholarship, number }: { scholarship: Scholarship; number: number }) {
  return (
    <article className={styles.scholarshipCard} aria-labelledby={`scholarship-${number}`}>
      <div className={styles.scholarshipCardTop}>
        <span className={styles.scholarshipNumber} aria-hidden="true">{String(number).padStart(2, "0")}</span>
        <div className={styles.scholarshipBadges}>
          {scholarship.isOpen ? <span className={styles.applicationBadge}><span aria-hidden="true" />Applications Open</span> : <span className={`${styles.applicationBadge} ${styles.applicationClosed}`}><span aria-hidden="true" />Applications Closed</span>}
          <span className={styles.eligibilityBadge}><UserRound size={13} aria-hidden="true" />{scholarship.eligibility}</span>
        </div>
      </div>
      <div className={styles.scholarshipTitle}>
        <h3 id={`scholarship-${number}`}>{scholarship.name}</h3>
        {scholarship.programName && <p>{scholarship.programName}</p>}
      </div>
      <div className={styles.scholarshipStats}>
        <div className={styles.tuitionPanel}>
          <strong className={styles.scholarshipMetric}>{scholarship.sponsorship}%</strong>
          <span className={styles.sponsorshipLabel}>TUITION SPONSORSHIP</span>
          {scholarship.tuition > 0 && <div className={styles.regularTuition}><span>Regular tuition</span><s>{naira(scholarship.tuition)}</s></div>}
          <div className={styles.payable}><span>You pay</span><div><strong>{naira(scholarship.payable)}</strong>{scholarship.installments && <span>{scholarship.installments}</span>}</div></div>
        </div>
        <div className={styles.slotsPanel}>
          <div><strong className={styles.scholarshipMetric}>{scholarship.slots}</strong><span className={styles.slotsLabel}>Slots Available</span></div>
          <div className={styles.scholarshipDeadline}><span>Deadline</span>{scholarship.deadlineISO ? <time dateTime={scholarship.deadlineISO.slice(0, 10)}>{formatDeadline(scholarship.deadlineISO)}</time> : <span>{formatDeadline("")}</span>}</div>
        </div>
      </div>
      <details className={styles.scholarshipDetails}>
        <summary><span className={styles.summaryOpen}>View details</span><span className={styles.summaryClose}>Close</span><span className={styles.detailsIcon}><Plus size={14} aria-hidden="true" /></span></summary>
        <div className={styles.scholarshipDetailsBody}>
          <h4>Before You Apply</h4>
          <p>The {scholarship.name.replace(/scholarship/i, "Scholarship")} is intended for individuals who:</p>
          {scholarship.requirements.length > 0 && <ul>{scholarship.requirements.map(requirement => <li key={requirement}>{requirement}</li>)}</ul>}
          <div className={styles.detailsActions}>
            {scholarship.isOpen && scholarship.applyHref ? <Link href={scholarship.applyHref} className={styles.detailsApply}>Apply Now</Link> : <span className={`${styles.detailsApply} ${styles.detailsApplyDisabled}`} aria-disabled="true">Applications Closed</span>}
            <Link href="#scholarship-eligibility" className={styles.detailsCheck}>Check Eligibility</Link>
          </div>
        </div>
      </details>
    </article>
  );
}
