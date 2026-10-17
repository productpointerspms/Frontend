import type { Metadata } from "next";
import ScholarshipApplication from "@/components/ppap/application/ScholarshipApplication";

export const metadata: Metadata = {
  title: "PPMP Scholarship Application",
  robots: { index: false, follow: false },
};

export default function PPMPScholarshipPage() {
  return <ScholarshipApplication program="PPMP" />;
}
