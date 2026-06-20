import React from "react";
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


const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
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
