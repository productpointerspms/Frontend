import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProgramCheckout from "@/components/checkout/ProgramCheckout";
import { CHECKOUT_PROGRAMS, getCheckoutProgram } from "@/lib/programCheckout";

type Params = Promise<{ program: string }>;

export function generateStaticParams() {
  return Object.keys(CHECKOUT_PROGRAMS).map(program => ({ program }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const program = getCheckoutProgram((await params).program);
  return {
    title: program ? `${program.code} Checkout` : "Checkout",
    robots: { index: false, follow: false },
  };
}

export default async function ProgramCheckoutPage({ params }: { params: Params }) {
  const program = getCheckoutProgram((await params).program);
  if (!program) notFound();
  return (
    <Suspense fallback={<p className="pt-32 text-center">Loading checkout…</p>}>
      <ProgramCheckout program={program} />
    </Suspense>
  );
}
