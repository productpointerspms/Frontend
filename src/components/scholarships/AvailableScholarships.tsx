import ScholarshipCard, { type Scholarship } from "./ScholarshipCard";
import styles from "./available-scholarships.module.css";

// Listing content supplied in the scholarship design.
const scholarships: Scholarship[] = [
  {
    name: "ONOME SCHOLARSHIP", program: "Product Management Accelerator Program", eligibility: "Graduates below 5 years", sponsorship: 73, tuition: 285000, payable: 75000, deadline: "September 18th, 2026", deadlineISO: "2026-09-18", applyHref: "/ppap/apply?plan=scholarship",
    requirements: ["Completed university, HND, or equivalent tertiary education", "Completed NYSC where applicable, or preparing to go for service", "Seriously interested in pursuing a career in Product Management", "Available to commit to the full 12-week PPAP", "Can pay the remaining ₦75,000 contribution if selected.", "Can clearly articulate their Product Management career goals"],
  },
  {
    name: "ADESUWA SCHOLARSHIP", program: "Product Management Accelerator Program", eligibility: "Graduates above 5 years", sponsorship: 56, tuition: 285000, payable: 125000, deadline: "September 18th, 2026", deadlineISO: "2026-09-18", applyHref: "/ppap/apply?plan=scholarship",
    requirements: ["Graduated from university, HND, or equivalent tertiary education more than 5 years ago", "Completed NYSC where applicable", "Seriously interested in pursuing or transitioning into a Product Management career", "Available to commit to the full 12-week PPAP", "Can pay the remaining ₦125,000 contribution if selected.", "Can clearly articulate their Product Management career goals"],
  },
  {
    name: "DIDI SCHOLARSHIP", program: "Product Management Accelerator Program", eligibility: "Undergraduates 300+ Level", sponsorship: 80, tuition: 285000, payable: 55000, deadline: "September 18th, 2026", deadlineISO: "2026-09-18", applyHref: "/ppap/apply?plan=scholarship",
    requirements: ["Currently enrolled in a university and studying at 300 level and above", "Seriously interested in pursuing a career in Product Management", "Available to commit to the full 12-week PPAP", "Can pay the remaining ₦55,000 contribution if selected.", "Can clearly articulate their interest in Product Management and career goals"],
  },
  {
    name: "PPMP Scholarship", program: "Product Management Mastery Program", eligibility: "1+ Year PM Experience", sponsorship: 78, tuition: 810000, payable: 155000, deadline: "January 15th, 2026", deadlineISO: "2026-01-15", applyHref: "/ppmp/apply?plan=scholarship",
    requirements: ["Currently working in Product Management or have relevant Product Management experience", "Have at least 1 year of Product Management experience", "Understand core Product Management fundamentals", "Looking to deepen their Product Management expertise and take on greater responsibility", "Available to commit to the full PPMP program", "Can clearly articulate their career goals and why the program is relevant to their growth", "Can pay the required ₦155,000 contribution if selected."],
  },
  {
    name: "PPIP Scholarship", program: "Product Management Apprenticeship/Internship Program", eligibility: "Foundational PM Knowledge", sponsorship: 83, tuition: 175000, payable: 30000, deadline: "October 12th, 2026", deadlineISO: "2026-10-12", applyHref: "/ppip/apply?plan=scholarship",
    requirements: ["Has completed foundational Product Management training or understands Product Management fundamentals", "Seriously interested in gaining practical Product Management experience", "Available to commit to the full PPIP program", "Willing to participate in practical, team-based Product work", "Can clearly articulate their Product Management career goals", "Can pay the required ₦30,000 contribution if selected."],
  },
  {
    name: "CHISOM Scholarship", program: "Fintech Product Management Program", eligibility: "Foundational PM Knowledge", sponsorship: 50, tuition: 300000, payable: 150000, installments: "or 3 × ₦50,000", deadline: "October 15th, 2026", deadlineISO: "2026-10-15", applyHref: "/ppfp/apply?plan=scholarship",
    requirements: ["Are currently a Product Manager or part of a Product Team and want to transition into Fintech Product Management.", "Have completed foundational Product Management training.", "Have built at least 2 live products, which may include an MVP, capstone project, personal project, or product you worked on professionally.", "Are serious about building a career in Fintech Product Management.", "Are ready to commit time to the 10-week program and complete practical assignments and the capstone.", "Can Pay the remaining 50% of the tuition."],
  },
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
