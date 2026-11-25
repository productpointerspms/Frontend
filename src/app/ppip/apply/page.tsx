import type { Metadata } from "next";
import PaidApplication from "@/components/preregistration/PPIPPaidApplication";
import ScholarshipApplication from "@/components/ppap/application/ScholarshipApplication";
import { getScholarshipListing } from "@/lib/scholarships";

export const metadata: Metadata = { title: "PPIP Application", robots: { index: false, follow: false } };

export default async function PPIPApplyPage({ searchParams }: { searchParams: Promise<{ plan?: string; scholarship?: string }> }) {
  const { plan, scholarship } = await searchParams;
  return plan === "scholarship" ? <ScholarshipApplication program="PPIP" scholarship={await getScholarshipListing("PPIP", scholarship)} /> : <PaidApplication />;
}
