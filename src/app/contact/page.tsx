import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ContactMessageSection from "@/components/contact/ContactMessageSection";
import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactCareerCTA from "@/components/contact/ContactCareerCTA";
import styles from "@/components/contact/contact.module.css";
import AdvisoryCTA from "@/components/contact/AdvisoryCTA";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the ProductPointers team for questions, mentorship support, partnerships, or community inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className={`${styles.page} w-full min-h-screen overflow-x-hidden`}>
      <ContactHero />
      <ContactSection/>
      <ContactMessageSection />
      <AdvisoryCTA/>
      <ContactFaqSection />
      <ContactCareerCTA/>
    </div>
  );
}