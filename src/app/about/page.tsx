import React from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import HeroNew from "@/components/HeroNew";
import MissionVision from "@/components/MissionVision";
import CoreValues from "@/components/CoreValues";
import RealStories from "@/components/Realstories";
import FounderStory from "@/components/Founder";
import HerJourney from "@/components/Herjourney"
import Team from "@/components/Team";
import TheNewFuture from "@/components/TheNewFuture";
import AboutFaqSection from "@/components/AboutFaqSection";
import CallToAction from "@/components/homepage/CallToAction";
import MakingDifferent from "@/components/MakingDifferent";
import HowItWorks from "@/components/HowItWorks";
import WhoWeServe from "@/components/WhoWeServe";
import ProveIt from "@/components/ProveIt";
import WhereWereGoing from "@/components/WhereWereGoing";
import VisionMission from "@/components/VisionMission";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "We're building the bridge between learning Product Management and getting hired — helping aspiring PMs gain trusted, real-world evidence of their skills.",
  path: "/about",
});

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden w-full max-w-[100vw]">
       <HeroNew />
       <MissionVision />
       <MakingDifferent/>
        <HowItWorks/>
        <WhoWeServe/>
        <ProveIt/>
         <VisionMission/>
        <CoreValues />
        {/* <RealStories /> */}
        <FounderStory />
        
        <HerJourney />
        <WhereWereGoing/>
        {/* <Team /> */}
        {/* <TheNewFuture /> */}
        {/* <AboutFaqSection /> */}
        {/* <CallToAction/> */}
        <FinalCTA/>
    </main>
  );
};

export default AboutPage;
