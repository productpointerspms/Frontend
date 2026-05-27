import React from "react";
import HeroSection from "@/components/ppcp/HeroSection";
import ProblemSection from "@/components/ppcp/ProblemSection";
import OutcomeSection from "@/components/ppcp/OutcomeSection";
import ProgramCriteria from "@/components/ppcp/ProgramCriteria";
import LearningJourney from "@/components/ppcp/LearningJourney";
import Testimonials from "@/components/ppcp/Testimonials";
import PricingCard from "@/components/ppcp/PricingCard";
import FinalCTA from "@/components/ppcp/FinalCTA";
import FaqSection from "@/components/homepage/FaqSection";
import SolutionSection from '@/components/ppcp/SolutionSection';


const PPCPPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <ProblemSection />
      <OutcomeSection />
      <ProgramCriteria />
      <SolutionSection/>
      <LearningJourney />
      <Testimonials />
      <PricingCard />
      <FaqSection />
      <FinalCTA />
    </main>
  );
};

export default PPCPPage;
