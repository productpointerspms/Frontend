import { buildMetadata } from "@/lib/seo";
import ProgramHero from "@/components/PPMP/Herosection";
import ProblemSection from "@/components/PPMP/ProblemSection";
import Curriculum from "@/components/PPMP/Curriculum";
import { ApplicationSection, ComparisonSection, ExperienceSection, FitSection, GapSection, OutcomesSection, ProgramDetails, SkillStackSection, TransformationSection } from "@/components/PPMP/ProgramSections";
import MentorshipSection from "@/components/ppap/MentorshipSection";
import PricingSection from "@/components/PPMP/PricingSection";
import { CareerCta, FaqSection, Testimonials } from "@/components/PPMP/ClosingSections";
import styles from "@/components/PPMP/ppmp.module.css";
import StickyApplyBar from "@/components/StickyApplyBar";

export const metadata = buildMetadata({
  title: "Product Management Mastery Program (PPMP)",
  path: "/ppmp",
});

export default function PPMPPage() {
  return <div className={styles.page}>
    <ProgramHero />
    <ProblemSection />
    <GapSection />
    <ComparisonSection />
    <Curriculum />
    <ApplicationSection />
    <SkillStackSection />
    <OutcomesSection />
    <FitSection />
    <TransformationSection />
    <ExperienceSection />
    <ProgramDetails />
    <div className={styles.mentors}><MentorshipSection /></div>
    <Testimonials />
    <PricingSection />
    <FaqSection />
    <CareerCta />
    <StickyApplyBar href="#pricing" label="Apply for the Scholarship" hideOver={["#pricing", "#ppmp-final-cta", "footer"]} />
  </div>;
}
