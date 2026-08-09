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
import Testimonials from "@/components/ppip/Testimonials";
import PricingSection from "@/components/ppip/PricingSection";
import FAQSection from "@/components/ppip/FAQSection";
import FinalCTA from "@/components/ppip/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "ProductPointers Internship Program (PPIP)",
  description:
    "Get real-world Product Management experience. Work on real products, build a portfolio, and gain the hands-on experience employers look for.",
  path: "/ppip",
});

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
