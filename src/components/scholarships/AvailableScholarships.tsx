import ScholarshipCard, { type Scholarship } from "./ScholarshipCard";
import styles from "./available-scholarships.module.css";

// Listing content supplied in the scholarship design.
const scholarships: Scholarship[] = [
  { name: "ONOME SCHOLARSHIP", program: "Product Management Accelerator Program", eligibility: "Graduates below 5 years", sponsorship: 73, tuition: 285000, payable: 75000, deadline: "September 18th, 2026", deadlineISO: "2026-09-18" },
  { name: "ADESUWA SCHOLARSHIP", program: "Product Management Accelerator Program", eligibility: "Graduates above 5 years", sponsorship: 56, tuition: 285000, payable: 125000, deadline: "September 18th, 2026", deadlineISO: "2026-09-18" },
  { name: "DIDI SCHOLARSHIP", program: "Product Management Accelerator Program", eligibility: "Undergraduates 300+ Level", sponsorship: 80, tuition: 285000, payable: 55000, deadline: "September 18th, 2026", deadlineISO: "2026-09-18" },
  { name: "PPMP Scholarship", program: "Product Management Mastery Program", eligibility: "1+ Year PM Experience", sponsorship: 78, tuition: 810000, payable: 155000, deadline: "January 15th, 2026", deadlineISO: "2026-01-15" },
  { name: "PPIP Scholarship", program: "Product Management Apprenticeship/Internship Program", eligibility: "Foundational PM Knowledge", sponsorship: 83, tuition: 175000, payable: 30000, deadline: "October 12th, 2026", deadlineISO: "2026-10-12" },
  { name: "CHISOM Scholarship", program: "Fintech Product Management Program", eligibility: "Foundational PM Knowledge", sponsorship: 50, tuition: 300000, payable: 150000, installments: "or 3 × ₦50,000", deadline: "October 15th, 2026", deadlineISO: "2026-10-15" },
];

export default function AvailableScholarships() {
  return (
    <section id="available-scholarships" className={styles.availability} aria-labelledby="availability-title">
      <div className={styles.availabilityHeader}>
        <div><p className={styles.eyebrow}>AVAILABLE SCHOLARSHIPS</p><h2 id="availability-title">Find a Scholarship That Fits<br className={styles.availabilityBreak} /> Your Journey</h2></div>
        <p>Explore current scholarship opportunities and see what each one offers before you apply.</p>
      </div>
      <div id="scholarship-listings" className={styles.scholarshipGrid}>
        {scholarships.map((scholarship, index) => <ScholarshipCard key={scholarship.name} scholarship={scholarship} number={index + 1} />)}
      </div>
    </section>
  );
}
