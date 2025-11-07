import HeroSection from "@/components/HeroSection";
import OurPillars from "@/components/OurPillars";
import ProductPointersJourney from "@/components/ProductPointersJourney";
import UpcomingPrograms from "@/components/ProgramCard";
import SecondaryNav from "@/components/SecondaryNav";
import StatsSection from "@/components/StatsSection";
import WhatDrivesUs from "@/components/WhatDrivesUs";
import WhyChooseProductPointers from "@/components/WhyChooseProductPointers";


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
