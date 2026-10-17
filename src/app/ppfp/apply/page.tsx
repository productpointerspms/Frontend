import type { Metadata } from "next";
import ScholarshipApplication from "@/components/ppap/application/ScholarshipApplication";

export const metadata: Metadata = {
  title: "PPFP Scholarship Application",
  robots: { index: false, follow: false },
};

export default function PPFPScholarshipPage() {
  return <ScholarshipApplication program="PPFP" />;
}
