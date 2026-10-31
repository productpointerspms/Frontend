import type { Metadata } from "next";
import { Suspense } from "react";
import EventCheckout from "./EventCheckout";

export const metadata: Metadata = {
  title: "November to Remember — Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <Suspense fallback={<p className="pt-32 text-center">Loading checkout…</p>}><EventCheckout /></Suspense>;
}
