"use client";
import CeoProfile from "@/components/homepage/CeoProfile";
import Community from "@/components/homepage/Community";
import CommunityMobile from "@/components/homepage/CommunityMobile";
import AlumniStories from "@/components/homepage/AlumniStories";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import FAQSection from "@/components/homepage/FaqSection";
import PMCoachingHero from "@/components/homepage/PMCoachingHero";

export default function Home() {
  return (
    <div>
      <CeoProfile />
      <Community />
      <CommunityMobile />
      <AlumniStories />
      <TestimonialSection />
      <FAQSection />
      <PMCoachingHero />
    </div>
  );
}
