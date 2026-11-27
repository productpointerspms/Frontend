import ScholarshipCard from "./ScholarshipCard";
import { getScholarshipListings, type ScholarshipListing } from "@/lib/scholarships";
import styles from "./available-scholarships.module.css";

// Listings come from GET /program/scholarships (see src/lib/scholarships.ts).
export default async function AvailableScholarships() {
  let scholarships: ScholarshipListing[] | null = null;
  try {
    scholarships = await getScholarshipListings();
  } catch {
    scholarships = null;
  }
  return (
    <section id="available-scholarships" className={styles.availability} aria-labelledby="availability-title">
      <div className={styles.availabilityHeader}>
        <div><p className={styles.eyebrow}>AVAILABLE SCHOLARSHIPS</p><h2 id="availability-title">Find a Scholarship That Fits<br className={styles.availabilityBreak} /> Your Journey</h2></div>
        <p>Explore current scholarship opportunities and see what each one offers before you apply.</p>
      </div>
      {scholarships && scholarships.length > 0 ? (
        <div id="scholarship-listings" className={styles.scholarshipGrid}>
          {scholarships.map((scholarship, index) => <ScholarshipCard key={scholarship.code} scholarship={scholarship} number={index + 1} />)}
        </div>
      ) : (
        <p id="scholarship-listings" className={styles.scholarshipEmpty} role="status">
          {scholarships ? "There are no scholarships open right now. Please check back soon." : "We couldn’t load scholarships right now. Please refresh the page or try again shortly."}
        </p>
      )}
    </section>
  );
}
