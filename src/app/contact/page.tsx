import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import CommunityLowerHero from "@/components/community/CommunityLowerHero";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the ProductPointers team for questions, mentorship support, partnerships, or community inquiries.",
  path: "/contact",
});

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