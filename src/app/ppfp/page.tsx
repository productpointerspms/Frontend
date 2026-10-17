import React from "react";
import PpfpHero from "@/components/ppfp/PpfpHero";
import WhyFintechPM from "@/components/ppfp/WhyFintechPM";
import WhoThisProgramIsFor from "@/components/ppfp/Whothisprogramisfor";
import WhoIsNotFor from "@/components/ppfp/WhoIsNotFor";
import ProgramFormatSection from "@/components/ppfp/Programformatsection";
import CurriculumSection from "@/components/ppfp/Curriculumsection";
import ProgramDetails from "@/components/ppfp/ProgramDetails";
import PpfpMentorsSection from "@/components/ppfp/PpfpMentorsSection";
import CareerPathwaysSection from "@/components/ppfp/CareerPathwaysSection";
import PricingSection from "@/components/ppfp/Pricingsection";
import OutcomesSection from "@/components/ppfp/OutcomesSection";
import PpfpFaq from "@/components/ppfp/PpfpFaq";
import PpfpCareerCta from "@/components/ppfp/PpfpCareerCta";

const page = () => {
  return (
    <main>
      <PpfpHero />
      <WhyFintechPM />
      <WhoThisProgramIsFor />
      <WhoIsNotFor />
      <ProgramFormatSection />
      <CurriculumSection />
      <ProgramDetails />
      <PpfpMentorsSection />
      <CareerPathwaysSection />
      <PricingSection />
      <OutcomesSection />
      <PpfpFaq />
      <PpfpCareerCta />
    </main>
  );
};
export default page;