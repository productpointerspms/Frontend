import { Montserrat } from "next/font/google";
import CommunityAboutSection from "@/components/community/CommunityAboutSection";
import AlumniGains from "@/components/community/AlumniGains";
import AlumniGrowthStories from "@/components/community/AlumniGrowthStories";
import PathToCommunity from "@/components/community/PathToCommunity";
import PricingPlan from "@/components/community/PricingPlan";
import CommunityLowerHero from "@/components/community/CommunityLowerHero";
import CommunityHero from "@/components/community/CommunityHero";
import FinalCTA from "@/components/FinalCTA";
import CommunityValues from "@/components/community/CommunityValues";
import CommunityActivities from "@/components/community/CommunityActivities";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

export default function CommunityPage() {
  return (
    <main>
      <CommunityHero />
      <CommunityValues/>
      <CommunityActivities/>
      <CommunityAboutSection />
      <AlumniGains />
      <AlumniGrowthStories />
      <PathToCommunity />
      {/* <PricingPlan /> */}
      <CommunityLowerHero />
      {/* <FinalCTA/> */}
    </main>
  );
}