import { Suspense } from "react";
import CallbackClient from "./CallbackClient";

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#FCF1FF] flex items-center justify-center text-gray-400">
          Confirming your payment…
        </div>
      }
    >
      <CallbackClient />
    </Suspense>
  );
}
