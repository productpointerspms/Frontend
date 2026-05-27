"use client";

import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import FaqSection from "@/components/homepage/FaqSection";
import CommunityLowerHero from "@/components/community/CommunityLowerHero";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <ContactHero />
      <ContactSection/>
      <FaqSection/>
      <CommunityLowerHero/>
    </div>
  );
}