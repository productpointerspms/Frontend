import React from "react";
import HeroNetwork from "@/components/Network/hero";
import TheNewFuture from "@/components/TheNewFuture";
import WhyJoinSection from "@/components/Network/whyJoin";
import AboutNetworkSection from "@/components/Network/aboutNetwork";
import RecurSection from "@/components/Network/subscription";
import GrowthCalendarSection from "@/components/Network/growthCalendar";




const NetworkPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HeroNetwork/>  
      <AboutNetworkSection/>
      <WhyJoinSection/>
      <RecurSection/>
      <GrowthCalendarSection/>
      <TheNewFuture/>
     
    </main>
  );
};

export default NetworkPage;