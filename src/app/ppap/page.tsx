import React from 'react';
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

export default function PPAPPage() {
  return (
    <main className="min-h-screen">
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
