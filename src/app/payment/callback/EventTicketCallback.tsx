"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Mail, MailCheck } from "lucide-react";
import { formatMoney, getTicketStatus, type TicketStatusResult } from "@/lib/event";

// Confirmation arrives by webhook, usually within seconds of payment.
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 60000;

type View = "verifying" | "paid" | "timedOut";

export default function EventTicketCallback({ reference }: { reference: string }) {
  const [ticket, setTicket] = useState<TicketStatusResult | null>(null);
  const [view, setView] = useState<View>("verifying");

  useEffect(() => {
    // The checkout may have opened in an iframe; show the result full-page.
    if (window.top && window.top !== window.self) {
      window.top.location.href = window.location.href;
    }
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
        if (result.status === "PAID") {
          setView("paid");
          return;
        }
      } catch {
        // Transient errors shouldn't stop polling — keep trying until the deadline.
      }
      if (cancelled) return;
      if (Date.now() >= deadline) {
        setView("timedOut");
        return;
      }
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reference]);

  const eventHref = `/events/${ticket?.eventSlug ?? "november-to-remember"}`;
  const presentation = {
    verifying: {
      icon: <Loader2 size={40} className="text-white animate-spin" strokeWidth={2.5} />,
      ring: "bg-[#6024D0] shadow-[#6024D0]/30",
      title: "Confirming Your Ticket",
      message: "Hang tight while we confirm your payment. This usually only takes a few seconds.",
    },
    paid: {
      icon: <CheckCircle2 size={40} className="text-white" strokeWidth={2.5} />,
      ring: "bg-[#10B981] shadow-[#10B981]/30",
      title: "You're In!",
      message: `Your ${ticket?.tierName ?? "ticket"} for ${ticket?.eventTitle ?? "the event"} is confirmed. Check your inbox for your ticket and joining details.`,
    },
    timedOut: {
      icon: <MailCheck size={40} className="text-white" strokeWidth={2.5} />,
      ring: "bg-amber-500 shadow-amber-500/30",
      title: "Your Confirmation Is On Its Way",
      message: "We're still finalising your payment. Your confirmation email is on its way — no action needed. If it doesn't arrive within a few minutes, contact support with the reference below.",
    },
  }[view];

  return (
    <div className="min-h-screen w-full bg-[#FCF1FF] py-12 px-4 sm:px-6 lg:px-10 font-montserrat flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-[28px] shadow-sm p-8 sm:p-12 text-center" role="status" aria-live="polite">
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-8 shadow-lg ${presentation.ring}`}>
          {presentation.icon}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{presentation.title}</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">{presentation.message}</p>

        <div className="rounded-2xl border border-[#EADCFB] bg-[#FBF7FF] px-6 py-4 divide-y divide-gray-100 text-left mb-8">
          <div className="py-2">
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Reference</p>
            <p className="text-sm font-semibold text-[#15010D] break-all">{reference}</p>
          </div>
          {ticket && (
            <div className="py-2">
              <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Amount</p>
              <p className="text-sm font-semibold text-[#15010D]">{formatMoney(ticket.amount, ticket.currency)}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <Link
            href={eventHref}
            className="w-full sm:w-auto bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold text-sm py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Back to Event <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="mailto:support@productpointers.com"
            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" /> Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
