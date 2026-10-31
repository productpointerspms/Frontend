import React from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import HeroSection from "@/components/ppip/HeroSection";
import OpportunitySection from "@/components/ppip/OpportunitySection";
import NotAnotherInternship from "@/components/ppip/NotAnotherInternship";
import OutcomesSection from "@/components/ppip/OutcomesSection";
import ApprenticeshipTimeline from "@/components/ppip/ApprenticeshipTimeline";
import EvidenceTable from "@/components/ppip/EvidenceTable";
import PublicRecord from "@/components/ppip/PublicRecord";
import FitChecklist from "@/components/ppip/FitChecklist";
import GraduationVisibility from "@/components/ppip/GraduationVisibility";
import AcceleratorCallout from "@/components/ppip/AcceleratorCallout";
import Testimonials from "@/components/ppip/Testimonials";
import PricingSection from "@/components/ppip/PricingSection";
import ProgramDetails from "@/components/ppip/ProgramDetails";
import FAQSection from "@/components/ppip/FAQSection";
import FinalCTA from "@/components/ppip/FinalCTA";
import styles from "@/components/ppip/ppip-mobile.module.css";
import StickyApplyBar from "@/components/StickyApplyBar";

export const metadata: Metadata = buildMetadata({
  title: "ProductPointers Internship Program (PPIP)",
  description:
    "Get real-world Product Management experience. Work on real products, build a portfolio, and gain the hands-on experience employers look for.",
  path: "/ppip",
});

export default function PPIPPage() {
  return (
    <div className={`${styles.page} min-h-screen`}>
      <HeroSection />
      <OpportunitySection />
      <NotAnotherInternship />
      <OutcomesSection />
      <ApprenticeshipTimeline />
      <EvidenceTable />
      <PublicRecord />
      <FitChecklist />
      <GraduationVisibility />
      <AcceleratorCallout />
      <Testimonials />
      <ProgramDetails />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <StickyApplyBar href="/ppip/apply" label="Apply for the Apprenticeship" hideOver={["#ppip-final-cta", "footer"]} />
    </div>
  );
}
