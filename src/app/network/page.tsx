import React from "react";
import HeroNetwork from "@/components/Network/Hero";
import TheNewFuture from "@/components/TheNewFuture";
import WhyJoinSection from "@/components/Network/WhyJoin";
import AboutNetworkSection from "@/components/Network/AboutNetwork";
import RecurSection from "@/components/Network/Subscription";
import GrowthCalendarSection from "@/components/Network/GrowthCalendar";




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