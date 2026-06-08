"use client";

import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import CommunityLowerHero from "@/components/community/CommunityLowerHero";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <ContactHero />
      <ContactSection/>
      <ContactFaqSection />
      <CommunityLowerHero/>
    </div>
  );
}