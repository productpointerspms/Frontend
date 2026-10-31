import { buildMetadata } from "@/lib/seo";
import ScholarshipHero from "@/components/scholarships/ScholarshipHero";
import AvailableScholarships from "@/components/scholarships/AvailableScholarships";
import ScholarshipEligibility from "@/components/scholarships/ScholarshipEligibility";
import ScholarshipHowItWorks from "@/components/scholarships/ScholarshipHowItWorks";
import ScholarshipAccessMatters from "@/components/scholarships/ScholarshipAccessMatters";
import ScholarshipSponsorship from "@/components/scholarships/ScholarshipSponsorship";
import ScholarshipFAQ from "@/components/scholarships/ScholarshipFAQ";
import ScholarshipFinalCTA from "@/components/scholarships/ScholarshipFinalCTA";
import styles from "@/components/scholarships/scholarships.module.css";

export const metadata = buildMetadata({
  title: "Scholarships",
  description: "Explore ProductPointers scholarships and tuition sponsorship opportunities, or help a learner access practical Product Management education.",
  path: "/scholarships",
});

export default function ScholarshipsPage() {
  return (
    <div className={styles.page}>
      <ScholarshipHero />
      <AvailableScholarships />
      <ScholarshipEligibility />
      <ScholarshipHowItWorks />
      <ScholarshipAccessMatters />
      <ScholarshipSponsorship />
      <ScholarshipFAQ />
      <ScholarshipFinalCTA />
    </div>
  );
}
