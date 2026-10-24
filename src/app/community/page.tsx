import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CommunityAboutSection from "@/components/community/CommunityAboutSection";
import AlumniGains from "@/components/community/AlumniGains";
import AlumniGrowthStories from "@/components/community/AlumniGrowthStories";
import PathToCommunity from "@/components/community/PathToCommunity";
import CommunityCommitment from "@/components/community/CommunityCommitment";
import CommunityLowerHero from "@/components/community/CommunityLowerHero";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityValues from "@/components/community/CommunityValues";
import styles from "@/components/community/community-mobile.module.css";
import CommunityActivities from "@/components/community/CommunityActivities";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

export const metadata: Metadata = buildMetadata({
  title: "Community",
  description:
    "The ProductPointers Community is a private, lifetime ecosystem for alumni to keep growing through accountability, networking, mentorship, and resources.",
  path: "/community",
});

export default function CommunityPage() {
  return (
    <div className={styles.page}>
      <CommunityHero />
      <CommunityValues/>
      <AlumniGains />
      <CommunityActivities/>
      <CommunityAboutSection />
      <AlumniGrowthStories />
      <PathToCommunity />
      <CommunityCommitment />
      {/* <PricingPlan /> */}
      <CommunityLowerHero
        eyebrow="ProductPointers Community"
        title="Your Product Management Journey Shouldn’t End Alone"
        description="Join a long-term ecosystem of Product Managers committed to continuous growth, accountability, mentorship, and meaningful progress long after completing their programs."
        primaryAction={{ label: "Join the Community", href: "#path-to-community" }}
        secondaryAction={{ label: "Explore Programs", href: "#path-to-community" }}
      />
      {/* <FinalCTA/> */}
    </div>
  );
}
