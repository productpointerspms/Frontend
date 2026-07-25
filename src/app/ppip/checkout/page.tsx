import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export default function PPIPCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#FCF8FF] flex items-center justify-center text-gray-400">
          Loading checkout…
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
