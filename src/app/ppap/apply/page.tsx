import type { Metadata } from "next";
import PaidApplication from "@/components/ppap/application/PaidApplication";
import ScholarshipApplication from "@/components/ppap/application/ScholarshipApplication";

export const metadata: Metadata = {
  title: "PPAP Application",
  robots: { index: false, follow: false },
};

export default async function PPAPApplyPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  return plan === "scholarship" ? <ScholarshipApplication /> : <PaidApplication />;
}
