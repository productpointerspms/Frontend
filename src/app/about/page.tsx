import React from "react";
import HeroNew from "@/components/HeroNew";
import MissionVision from "@/components/MissionVision";
import CoreValues from "@/components/CoreValues";
import RealStories from "@/components/Realstories";
import FounderStory from "@/components/Founder";
import HerJourney from "@/components/Herjourney"
import Team from "@/components/Team";
import TheNewFuture from "@/components/TheNewFuture";
import FaqSection from "@/components/homepage/FaqSection";
import CallToAction from "@/components/homepage/CallToAction";


const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
       <HeroNew />
       <MissionVision />
        <CoreValues />
        <RealStories />
        <FounderStory />
        <HerJourney />
        <Team />
        {/* <TheNewFuture /> */}
        <FaqSection />
        <CallToAction/>
    </main>
  );
};

export default AboutPage;
