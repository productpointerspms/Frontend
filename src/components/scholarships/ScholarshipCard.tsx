import Link from "next/link";
import { Plus, UserRound } from "lucide-react";
import styles from "./available-scholarships.module.css";

export type Scholarship = {
  name: string;
  program: string;
  eligibility: string;
  sponsorship: number;
  tuition: number;
  payable: number;
  installments?: string;
  deadline: string;
  deadlineISO: string;
  applyHref: string;
  requirements: string[];
};

const naira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function ScholarshipCard({ scholarship, number }: { scholarship: Scholarship; number: number }) {
  return (
    <article className={styles.scholarshipCard} aria-labelledby={`scholarship-${number}`}>
      <div className={styles.scholarshipCardTop}>
        <span className={styles.scholarshipNumber} aria-hidden="true">{String(number).padStart(2, "0")}</span>
        <div className={styles.scholarshipBadges}>
          <span className={styles.applicationBadge}><span aria-hidden="true" />Applications Open</span>
          <span className={styles.eligibilityBadge}><UserRound size={13} aria-hidden="true" />{scholarship.eligibility}</span>
        </div>
      </div>
      <div className={styles.scholarshipTitle}>
        <h3 id={`scholarship-${number}`}>{scholarship.name}</h3>
        <p>{scholarship.program}</p>
      </div>
      <div className={styles.scholarshipStats}>
        <div className={styles.tuitionPanel}>
          <strong className={styles.scholarshipMetric}>{scholarship.sponsorship}%</strong>
          <span className={styles.sponsorshipLabel}>TUITION SPONSORSHIP</span>
          <div className={styles.regularTuition}><span>Regular tuition</span><s>{naira(scholarship.tuition)}</s></div>
          <div className={styles.payable}><span>You pay</span><div><strong>{naira(scholarship.payable)}</strong>{scholarship.installments && <span>{scholarship.installments}</span>}</div></div>
        </div>
        <div className={styles.slotsPanel}>
          <div><strong className={styles.scholarshipMetric}>20</strong><span className={styles.slotsLabel}>Slots Available</span></div>
          <div className={styles.scholarshipDeadline}><span>Deadline</span><time dateTime={scholarship.deadlineISO}>{scholarship.deadline}</time></div>
        </div>
      </div>
      <details className={styles.scholarshipDetails}>
        <summary><span className={styles.summaryOpen}>View details</span><span className={styles.summaryClose}>Close</span><span className={styles.detailsIcon}><Plus size={14} aria-hidden="true" /></span></summary>
        <div className={styles.scholarshipDetailsBody}>
          <h4>Before You Apply</h4>
          <p>The {scholarship.name.replace(/scholarship/i, "Scholarship")} is intended for individuals who:</p>
          <ul>{scholarship.requirements.map(requirement => <li key={requirement}>{requirement}</li>)}</ul>
          <div className={styles.detailsActions}>
            <Link href={scholarship.applyHref} className={styles.detailsApply}>Apply Now</Link>
            <Link href="#scholarship-eligibility" className={styles.detailsCheck}>Check Eligibility</Link>
          </div>
        </div>
      </details>
    </article>
  );
}
