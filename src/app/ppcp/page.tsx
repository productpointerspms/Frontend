import React from "react";
import styles from "@/components/ppcp/ppcp-mobile.module.css";
import HeroSection from "@/components/ppcp/HeroSection";
import ProblemSection from "@/components/ppcp/ProblemSection";
import OutcomeSection from "@/components/ppcp/OutcomeSection";
import ProgramCriteria from "@/components/ppcp/ProgramCriteria";
import LearningJourney from "@/components/ppcp/LearningJourney";
import Testimonials from "@/components/ppcp/Testimonials";
import CoachesSection from "@/components/ppcp/CoachesSection";
import CoachingFitSection from "@/components/ppcp/CoachingFitSection";
import FinalCTA from "@/components/ppcp/FinalCTA";
import CoachingFAQ from "@/components/ppcp/CoachingFAQ";
import CoachingProgramDetails from "@/components/ppcp/CoachingProgramDetails";
import SolutionSection from '@/components/ppcp/SolutionSection';


const PPCPPage: React.FC = () => {
  return (
    <div className={`${styles.page} min-h-screen bg-white text-gray-900`}>
      <HeroSection />
      <ProblemSection />
      <OutcomeSection />
      <ProgramCriteria />
      <SolutionSection/>
      <LearningJourney />
      <CoachesSection />
      <CoachingFitSection />
      <Testimonials />
      <CoachingProgramDetails />
      <CoachingFAQ />
      <FinalCTA />
    </div>
  );
};

export default PPCPPage;
