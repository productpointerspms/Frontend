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
import { Bricolage_Grotesque } from "next/font/google";
import styles from "@/components/homepage/homepage.module.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-home-heading" });

export default function Home() {
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
      <WhatsHappening />
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
