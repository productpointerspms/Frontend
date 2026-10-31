import React from 'react';
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import HeroSection from '@/components/ppap/HeroSection';
import ProblemSection from '@/components/ppap/ProblemSection';
import SolutionSection from '@/components/ppap/SolutionSection';
import ProgramOverview from '@/components/ppap/ProgramOverview';
import CurriculumSection from '@/components/ppap/CurriculumSection';
import PracticalSupport from '@/components/ppap/PracticalSupport';
import MentorshipSection from '@/components/ppap/MentorshipSection';
import TestimonialsSection from '@/components/ppap/TestimonialsSection';
import PricingSection from '@/components/ppap/PricingSection';
import CTASection from '@/components/ppap/CTASection';
import FAQSection from '@/components/ppap/FAQSection';
import FinalCTA from '@/components/ppap/FinalCTA';
import WhoItsForSection from '@/components/ppap/WhoItsForSection';
import styles from "@/components/ppap/ppap-mobile.module.css";
import InternshipCTA from '@/components/ppap/InternshipCTA';
import StickyApplyBar from '@/components/StickyApplyBar';

export const metadata: Metadata = buildMetadata({
  title: "ProductPointers Accelerator Program (PPAP)",
  description:
    "Build a strong foundation and learn to think like a Product Manager. A structured, mentor-led 12-week program for aspiring PMs who need clarity and direction.",
  path: "/ppap",
});

export default function PPAPPage() {
  return (
    <div className={`${styles.page} min-h-screen overflow-x-clip w-full max-w-[100vw]`}>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProgramOverview />
      <CurriculumSection />
      <PracticalSupport />
      {/* <TimelineSection /> */}
      <MentorshipSection />
      <WhoItsForSection/>
      <InternshipCTA/>
      <TestimonialsSection />
      <CTASection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <StickyApplyBar href="#pricing" label="Apply for the Accelerator Program" hideOver={["#pricing", '[data-ppap-section="FinalCTA"]', "footer"]} />
    </div>
  );
}
