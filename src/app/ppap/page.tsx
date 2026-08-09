import React from 'react';
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import HeroSection from '@/components/ppap/HeroSection';
import ProblemSection from '@/components/ppap/ProblemSection';
import SolutionSection from '@/components/ppap/SolutionSection';
import ProgramOverview from '@/components/ppap/ProgramOverview';
import CurriculumSection from '@/components/ppap/CurriculumSection';
import PracticalSupport from '@/components/ppap/PracticalSupport';
import TimelineSection from '@/components/ppap/TimelineSection';
import MentorshipSection from '@/components/ppap/MentorshipSection';
import TestimonialsSection from '@/components/ppap/TestimonialsSection';
import PricingSection from '@/components/ppap/PricingSection';
import CTASection from '@/components/ppap/CTASection';
import FAQSection from '@/components/ppap/FAQSection';
import FinalCTA from '@/components/ppap/FinalCTA';

export const metadata: Metadata = buildMetadata({
  title: "ProductPointers Accelerator Program (PPAP)",
  description:
    "Build a strong foundation and learn to think like a Product Manager. A structured, mentor-led 12-week program for aspiring PMs who need clarity and direction.",
  path: "/ppap",
});

export default function PPAPPage() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full max-w-[100vw]">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProgramOverview />
      <CurriculumSection />
      <PracticalSupport />
      <TimelineSection />
      <MentorshipSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
