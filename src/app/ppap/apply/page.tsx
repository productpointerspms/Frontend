import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ScholarshipApplication from "@/components/ppap/application/ScholarshipApplication";
import { getScholarshipListing } from "@/lib/scholarships";
import { checkoutHref } from "@/lib/programCheckout";

export const metadata: Metadata = {
  title: "PPAP Application",
  robots: { index: false, follow: false },
};

type Search = Promise<{ plan?: string; currency?: string; scholarship?: string }>;

export default async function PPAPApplyPage({ searchParams }: { searchParams: Search }) {
  const { plan, currency, scholarship } = await searchParams;
  if (plan === "scholarship") return <ScholarshipApplication program="PPAP" scholarship={await getScholarshipListing("PPAP", scholarship)} />;
  // Paid enrolment now goes through the shared checkout (plan, details, payment in one flow).
  redirect(checkoutHref("ppap", { plan, currency }));
}
