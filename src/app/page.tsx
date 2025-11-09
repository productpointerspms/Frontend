"use client";
import CeoProfile from "@/components/homepage/CeoProfile";
import Community from "@/components/homepage/Community";
import CommunityMobile from "@/components/homepage/CommunityMobile";
import AlumniStories from "@/components/homepage/AlumniStories";

export default function Home() {
  return (
    <div>
      <CeoProfile />
      <Community />
      <CommunityMobile />
      <AlumniStories />
    </div>
  );
}
