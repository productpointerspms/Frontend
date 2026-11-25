import type { Metadata } from "next";
import ScholarshipApplication from "@/components/ppap/application/ScholarshipApplication";
import { getScholarshipListing } from "@/lib/scholarships";

export const metadata: Metadata = {
  title: "PPMP Scholarship Application",
  robots: { index: false, follow: false },
};

export default async function PPMPScholarshipPage({ searchParams }: { searchParams: Promise<{ scholarship?: string }> }) {
  const { scholarship } = await searchParams;
  return <ScholarshipApplication program="PPMP" scholarship={await getScholarshipListing("PPMP", scholarship)} />;
}
