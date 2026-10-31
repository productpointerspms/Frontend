import { Suspense } from "react";
import CallbackClient from "./CallbackClient";
import EventTicketCallback from "./EventTicketCallback";

// Program applications send a Flutterwave tx_ref prefixed with the application
// UUID; anything else (Paystack ?reference=, or a non-UUID tx_ref) is an event ticket.
const APPLICATION_REF = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
  const reference = first(params.reference);
  const txRef = first(params.tx_ref);
  const ticketReference = reference ?? (txRef && !APPLICATION_REF.test(txRef) ? txRef : undefined);

  if (ticketReference) {
    return <EventTicketCallback reference={ticketReference} />;
  }

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
