import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ScholarshipApplication from "@/components/ppap/application/ScholarshipApplication";
import { checkoutHref } from "@/lib/programCheckout";

export const metadata: Metadata = {
  title: "PPAP Application",
  robots: { index: false, follow: false },
};

type Search = Promise<{ plan?: string; currency?: string }>;

export default async function PPAPApplyPage({ searchParams }: { searchParams: Search }) {
  const { plan, currency } = await searchParams;
  if (plan === "scholarship") return <ScholarshipApplication />;
  // Paid enrolment now goes through the shared checkout (plan, details, payment in one flow).
  redirect(checkoutHref("ppap", { plan, currency }));
}
