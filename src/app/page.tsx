
"use client";
import ConnectFounder from "@/components/homepage/ConnectFounder";
import Community from "@/components/homepage/Community";
import CommunityMobile from "@/components/homepage/CommunityMobile";
import AlumniStories from "@/components/homepage/AlumniStories";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import FAQSection from "@/components/homepage/FaqSection";
import PMCoachingHero from "@/components/homepage/PMCoachingHero";
import HeroSection from "@/components/homepage/HeroSection";
import OurPillars from "@/components/homepage/OurPillars";
import FreeResources from "@/components/homepage/FreeResources";
import ProductPointersJourney from "@/components/homepage/ProductPointersJourney";
import UpcomingPrograms from "@/components/homepage/ProgramCard";
import SecondaryNav from "@/components/homepage/SecondaryNav";
import StatsSection from "@/components/homepage/StatsSection";
import WhatDrivesUs from "@/components/homepage/WhatDrivesUs";
import WhyChooseProductPointers from "@/components/homepage/WhyChooseProductPointers";
import MentorshipVideo from "@/components/homepage/MentorshipVideo";
import StuckSection from "@/components/homepage/StuckSection";
import CountdownSection from "@/components/homepage/Countdown";
import CallToAction from "@/components/homepage/CallToAction";
import VerifyCertificate from "@/components/homepage/VerifyCertificate";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <StuckSection />
      {/* <SecondaryNav /> */}
      {/* <WhatDrivesUs /> */}
      <WhyChooseProductPointers />
      {/* <OurPillars /> */}
      <MentorshipVideo />
      <ProductPointersJourney />
      <UpcomingPrograms />
      {/* <Community /> */}
      {/* <CommunityMobile /> */}
      <TestimonialSection />
      <VerifyCertificate />
      <FreeResources />
      <StatsSection />
      <CountdownSection />
      {/* <AlumniStories /> */}
      <FAQSection />
      <CallToAction />
      {/* <ConnectFounder /> */}
      {/* <PMCoachingHero /> */}
    </main>
  );
}
