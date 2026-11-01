"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock3, Loader2, Mail, MailCheck, MapPin, XCircle } from "lucide-react";
import { formatEventDate, formatMoney, getTicketStatus, type TicketStatusResult } from "@/lib/event";
import checkout from "../checkout/checkout.module.css";
import styles from "./success.module.css";

// Confirmation arrives by webhook, usually within seconds of payment.
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 60000;

type View = "verifying" | "paid" | "failed" | "timedOut";

const VIEWS: Record<View, { step: string; heading: string; title: string; icon: React.ReactNode; tone: string }> = {
  verifying: { step: "CONFIRMING PAYMENT", heading: "Payment", title: "Confirming your ticket…", icon: <Loader2 className={styles.spin} />, tone: styles.pending },
  paid: { step: "ALL DONE", heading: "Payment Confirmed", title: "You're in!", icon: <CheckCircle2 />, tone: styles.paid },
  failed: { step: "PAYMENT", heading: "Payment Not Completed", title: "Your payment didn't go through", icon: <XCircle />, tone: styles.failed },
  timedOut: { step: "ALMOST THERE", heading: "Payment", title: "Your confirmation is on its way", icon: <MailCheck />, tone: styles.pending },
};

export default function TicketConfirmation({ reference }: { reference: string }) {
  const [ticket, setTicket] = useState<TicketStatusResult | null>(null);
  const [view, setView] = useState<View>("verifying");

  useEffect(() => {
    // The payment page may have opened in an iframe; show the result full-page.
    // Browsers may block that navigation (sandboxed or cross-origin frame); then stay in the frame.
    try {
      if (window.top && window.top !== window.self) window.top.location.href = window.location.href;
    } catch {}
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const deadline = Date.now() + POLL_TIMEOUT_MS;

    const poll = async () => {
      try {
        const result = await getTicketStatus(reference);
        if (cancelled) return;
        setTicket(result);
        if (result.status === "PAID") return setView("paid");
        // Anything other than PENDING (FAILED, CANCELLED, EXPIRED…) is final.
        if (result.status !== "PENDING") return setView("failed");
      } catch {
        // Transient errors shouldn't stop polling — keep trying until the deadline.
      }
      if (cancelled) return;
      if (Date.now() >= deadline) return setView("timedOut");
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reference]);

  const current = VIEWS[view];
  const eventHref = `/events/${ticket?.eventSlug ?? "november-to-remember"}`;
  const message = {
    verifying: "Hang tight while we confirm your payment. This usually takes a few seconds — please don't close this page.",
    paid: `Your ${ticket?.tierName ?? "ticket"} for ${ticket?.eventTitle ?? "November to Remember"} is confirmed. We've emailed your ticket and joining details.`,
    failed: "We couldn't confirm a payment for this ticket, so your seat isn't reserved yet. Try again, or if you were charged, contact support with the reference below.",
    timedOut: "We're still finalising your payment. Your confirmation email is on its way — no action needed. If it doesn't arrive within a few minutes, contact support with the reference below.",
  }[view];

  return (
    <div className={checkout.page}>
      <section className={checkout.card} aria-labelledby="success-title">
        <header className={checkout.header}>
          <div><p>{current.step}</p><h1 id="success-title">{current.heading}</h1></div>
          <ol className={checkout.progress} aria-hidden="true">{[1, 2, 3].map(step => <li key={step} className={view === "paid" || step < 3 ? checkout.active : ""} />)}</ol>
        </header>

        <div className={checkout.body} role="status" aria-live="polite">
          <div className={styles.hero}>
            <span className={`${styles.badge} ${current.tone}`}>{current.icon}</span>
            <h2>{current.title}</h2>
            <p>{message}</p>
          </div>

          <dl className={styles.summary}>
            {ticket && <div><dt>Ticket</dt><dd>{ticket.tierName}</dd></div>}
            {ticket && <div><dt>Amount paid</dt><dd>{view === "paid" ? formatMoney(ticket.amount, ticket.currency) : "—"}</dd></div>}
            {ticket?.paidAt && <div><dt>Paid on</dt><dd>{formatEventDate(ticket.paidAt)}</dd></div>}
            <div className={styles.wide}><dt>Reference</dt><dd>{reference}</dd></div>
          </dl>

          {view === "paid" && (
            <div className={checkout.event}>
              <p className={checkout.eyebrow}>WHAT HAPPENS NEXT</p>
              <ol className={styles.next}>
                <li><Mail /> Check your inbox (and spam folder) for your ticket and joining link.</li>
                <li><CalendarDays /> Block your calendar: sessions run Nov 7–28, 2026.</li>
                <li><Clock3 /> Each session starts at 7:00 PM WAT.</li>
                <li><MapPin /> Join virtually from anywhere.</li>
              </ol>
            </div>
          )}

          <div className={`${checkout.actions} ${styles.actions}`}>
            <a className={checkout.back} href="mailto:support@productpointers.com">Contact support</a>
            {view === "failed"
              ? <Link className={checkout.primary} href="/events/november-to-remember/checkout">TRY AGAIN</Link>
              : <Link className={checkout.primary} href={eventHref}>BACK TO EVENT</Link>}
          </div>
        </div>
      </section>
    </div>
  );
}
