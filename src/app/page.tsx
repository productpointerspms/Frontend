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
import { bricolageHome as bricolage } from "@/lib/fonts";
import { getUpcomingProgramItems } from "@/lib/programs";
import styles from "@/components/homepage/homepage.module.css";

export default async function Home() {
  // Upcoming programs come from GET /program/programs; null renders an error message.
  const upcomingPrograms = await getUpcomingProgramItems().catch(() => null);
  return (
    <div className={`${bricolage.variable} ${styles.page}`}>
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
      <WhatsHappening programs={upcomingPrograms} />
      <TopTalentSection />
      <AlumniSection />
      <SponsorshipSection />
      <WhyWeExist />
      <FounderSection />
      <FaqSectionNew />
      <CareerCTA />
      <StickyExploreButton href="#our-programs" />
    </div>
  );
}
