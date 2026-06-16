import React from "react";
import HeroSection from "@/components/ppip/HeroSection";
import OpportunitySection from "@/components/ppip/OpportunitySection";
import NotAnotherInternship from "@/components/ppip/NotAnotherInternship";
import OutcomesSection from "@/components/ppip/OutcomesSection";
import ApprenticeshipTimeline from "@/components/ppip/ApprenticeshipTimeline";
import EvidenceTable from "@/components/ppip/EvidenceTable";
import PublicRecord from "@/components/ppip/PublicRecord";
import FitChecklist from "@/components/ppip/FitChecklist";
import GraduationVisibility from "@/components/ppip/GraduationVisibility";
import Testimonials from "@/components/ppip/Testimonials";
import PricingSection from "@/components/ppip/PricingSection";
import FAQSection from "@/components/ppip/FAQSection";
import FinalCTA from "@/components/ppip/FinalCTA";

export default function PPIPPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <OpportunitySection />
      <NotAnotherInternship />
      <OutcomesSection />
      <ApprenticeshipTimeline />
      <EvidenceTable />
      <PublicRecord />
      <FitChecklist />
      <GraduationVisibility />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
