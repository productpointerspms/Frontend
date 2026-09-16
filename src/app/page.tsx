import HeroSection from "@/components/homepage/HeroSection";
import StatsSectionNew from "@/components/homepage/StatSectionNew";
import OurPrograms from "@/components/homepage/OurPrograms";
import WhyProductPointers from "@/components/homepage/WhyProductPointers";
import TrustedCompanies from "@/components/homepage/TrustedCompanies";
import BuildWithItSection from "@/components/homepage/BuildWithItSection";
import ImpactSection from "@/components/homepage/ImpactSection";
import ProductJourney from "@/components/homepage/ProductJourney";
import MentorsSection from "@/components/homepage/MentorsSection";
import NewTestimonials from "@/components/homepage/NewTestimonials";
import CertificateVerification from "@/components/homepage/CertificateVerification";
import WhatsHappening from "@/components/homepage/Whatshappening";
import TopTalentSection from "@/components/homepage/TopTalentSection";
import AlumniSection from "@/components/homepage/AlumniSection";
import SponsorshipSection from "@/components/homepage/Sponsorshipsection";
import WhyWeExist from "@/components/homepage/Whyweexist";
import FounderSection from "@/components/homepage/Foundersection";
import FaqSectionNew from "@/components/homepage/FaqSectionNew";
import CareerCTA from "@/components/homepage/CareerCTA";
import StickyExploreButton from "@/components/homepage/StickyExploreButton";
//import ConnectFounder from "@/components/homepage/ConnectFounder";
//import Community from "@/components/homepage/Community";
//import CommunityMobile from "@/components/homepage/CommunityMobile";
//import AlumniStories from "@/components/homepage/AlumniStories";
//import TestimonialSection from "@/components/homepage/TestimonialSection";
//import FAQSection from "@/components/homepage/FaqSection";
//import PMCoachingHero from "@/components/homepage/PMCoachingHero";

//import OurPillars from "@/components/homepage/OurPillars";
//import FreeResources from "@/components/homepage/FreeResources";
//import ProductPointersJourney from "@/components/homepage/ProductPointersJourney";
//import UpcomingPrograms from "@/components/homepage/ProgramCard";
// import SecondaryNav from "@/components/homepage/SecondaryNav";
// import StatsSection from "@/components/homepage/StatsSection";
// import WhatDrivesUs from "@/components/homepage/WhatDrivesUs";
// import WhyChooseProductPointers from "@/components/homepage/WhyChooseProductPointers";
// import MentorshipVideo from "@/components/homepage/MentorshipVideo";
// //import StuckSection from "@/components/homepage/StuckSection";
// import CountdownSection from "@/components/homepage/Countdown";
// import CallToAction from "@/components/homepage/CallToAction";
// import VerifyCertificate from "@/components/homepage/VerifyCertificate";

// No page-specific metadata here — "/" inherits the root layout's default
// title/description as-is, avoiding double "ProductPointers" branding from
// the title template (`%s | ProductPointers`) that other pages opt into.

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSectionNew />
      <OurPrograms />
      <WhyProductPointers />
      <TrustedCompanies />
      <BuildWithItSection />
      <ImpactSection />
      <ProductJourney />
      <MentorsSection />
      <NewTestimonials />
      <CertificateVerification />
      <WhatsHappening />
      <TopTalentSection />
      <AlumniSection />
      <SponsorshipSection />
      <WhyWeExist />
      <FounderSection />
      <FaqSectionNew />
      <CareerCTA />
      <StickyExploreButton href="#programs" />
      {/* <StuckSection /> */}
      {/* <SecondaryNav /> */}
      {/* <WhatDrivesUs /> */}
      {/*<WhyChooseProductPointers /> */}
      {/* <OurPillars /> */}
      {/*  <MentorshipVideo />*/}

      {/* <ProductPointersJourney /> */}
      {/*<UpcomingPrograms /> */}
      {/*<TestimonialSection /> */}
      {/* <VerifyCertificate />*/}
      {/*  <FreeResources />*/}
      {/* <StatsSection />*/}
      {/* <CountdownSection /> */}
      {/* <FAQSection />*/}
      {/*<CallToAction /> */}
      {/* <Community /> */}
      {/* <CommunityMobile /> */}

      {/* <AlumniStories /> */}

      {/* <ConnectFounder /> */}
      {/* <PMCoachingHero /> */}
    </main>
  );
}
