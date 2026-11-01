import type { Metadata } from "next";
import { redirect } from "next/navigation";
import TicketConfirmation from "./TicketConfirmation";

export const metadata: Metadata = {
  title: "November to Remember — Ticket Confirmation",
  robots: { index: false, follow: false },
};

export default async function TicketSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
  // Paystack returns ?reference=, Flutterwave ?tx_ref=.
  const reference = first(params.reference) ?? first(params.tx_ref);
  if (!reference) redirect("/events/november-to-remember");

  return <TicketConfirmation reference={reference} />;
}
