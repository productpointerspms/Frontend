
"use client";
import CeoProfile from "@/components/homepage/CeoProfile";
import Community from "@/components/homepage/Community";
import CommunityMobile from "@/components/homepage/CommunityMobile";
import AlumniStories from "@/components/homepage/AlumniStories";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import FAQSection from "@/components/homepage/FaqSection";
import PMCoachingHero from "@/components/homepage/PMCoachingHero";
import HeroSection from "@/components/homepage/HeroSection";
import OurPillars from "@/components/homepage/OurPillars";
import ProductPointersJourney from "@/components/homepage/ProductPointersJourney";
import UpcomingPrograms from "@/components/homepage/ProgramCard";
import SecondaryNav from "@/components/homepage/SecondaryNav";
import StatsSection from "@/components/homepage/StatsSection";
import WhatDrivesUs from "@/components/homepage/WhatDrivesUs";
import WhyChooseProductPointers from "@/components/homepage/WhyChooseProductPointers";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <SecondaryNav />
      <StatsSection />
      <WhatDrivesUs />
      <WhyChooseProductPointers />
      <OurPillars />
      <ProductPointersJourney />
      <UpcomingPrograms />
      <CeoProfile />
      <Community />
      <CommunityMobile />
      <AlumniStories />
      <TestimonialSection />
      <FAQSection />
      <PMCoachingHero />
    </main>
  );
}
