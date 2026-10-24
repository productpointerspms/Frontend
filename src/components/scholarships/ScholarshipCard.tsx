import { Plus, UserRound } from "lucide-react";
import { ScholarshipButton } from "./ScholarshipUI";
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
        <summary>View details <span className={styles.detailsIcon}><Plus size={18} aria-hidden="true" /></span></summary>
        <div className={styles.scholarshipDetailsBody}>
          <p><strong>Eligibility:</strong> {scholarship.eligibility}.</p>
          <p>This scholarship supports the {scholarship.program}. Contact the team to confirm availability, the listed deadline, and application requirements.</p>
          <ScholarshipButton href={`/contact?interest=scholarship&scholarship=${encodeURIComponent(scholarship.name)}`}>Enquire about this scholarship</ScholarshipButton>
        </div>
      </details>
    </article>
  );
}
