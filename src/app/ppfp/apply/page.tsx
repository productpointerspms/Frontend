import type { Metadata } from "next";
import ScholarshipApplication from "@/components/ppap/application/ScholarshipApplication";
import { getScholarshipListing } from "@/lib/scholarships";

export const metadata: Metadata = {
  title: "PPFP Scholarship Application",
  robots: { index: false, follow: false },
};

export default async function PPFPScholarshipPage({ searchParams }: { searchParams: Promise<{ scholarship?: string }> }) {
  const { scholarship } = await searchParams;
  return <ScholarshipApplication program="PPFP" scholarship={await getScholarshipListing("PPFP", scholarship)} />;
}
