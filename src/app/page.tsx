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
    </main>
  );
}
