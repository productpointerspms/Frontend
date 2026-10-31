import type { Metadata } from "next";
import SponsorshipEnquiry from "@/components/scholarships/SponsorshipEnquiry";
import { sponsorshipTiers } from "@/components/scholarships/sponsorship";

export const metadata: Metadata = {
  title: "Sponsor a Learner",
  description: "Help fund a ProductPointers scholarship. Tell our team about your sponsorship goals.",
  alternates: { canonical: "/scholarships/sponsor" },
};

export default async function SponsorPage({ searchParams }: { searchParams: Promise<{ tier?: string }> }) {
  const { tier } = await searchParams;
  const selected = sponsorshipTiers.find(item => item.name.toLowerCase() === tier?.toLowerCase()) ?? sponsorshipTiers[1];
  return <SponsorshipEnquiry key={selected.name} tier={selected} />;
}
