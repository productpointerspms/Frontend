
import React from "react";
import HeroSection from "@/components/pptp/HeroSection";
import ProblemSection from "@/components/pptp/ProblemSection";
import OutcomeSection from "@/components/pptp/OutcomeSection";
import { SolutionSection } from "@/components/pptp/SolutionSection";
import { SpecializationPath } from "@/components/pptp/SpecializationPath";
import  ProgramCriteria from "@/components/pptp/ProgramCriteria";
import Testimonials from "@/components/pptp/Testimonials";
import PricingCard from "@/components/pptp/PricingCard";
import FinalCTA from "@/components/pptp/FinalCTA";
import FaqSection from "@/components/homepage/FaqSection";



const PPTPPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
       <HeroSection/>
       <ProblemSection/>
       <OutcomeSection/>
       <ProgramCriteria/>
       <SpecializationPath/>
       <SolutionSection/>
       <Testimonials/>
       <PricingCard/>
       <FaqSection/>
       <FinalCTA/>
    </main>
  );
};

export default PPTPPage;
