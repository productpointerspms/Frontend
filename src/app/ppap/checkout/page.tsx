import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export default function PPAPCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#FCF1FF] flex items-center justify-center text-gray-400">
          Loading checkout…
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
