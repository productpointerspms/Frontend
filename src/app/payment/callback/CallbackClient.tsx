"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
  Copy,
  Check,
  ArrowRight,
  Mail,
  RefreshCw,
} from "lucide-react";
import { getApplicationById, type ApplicationRecord } from "@/lib/application";
import { usePaymentStatus } from "@/lib/usePaymentStatus";
import { getProgramInfo } from "@/lib/programs";

type GatewayStatus = "success" | "failed" | "cancelled" | "unknown";

function normalizeGatewayStatus(raw: string | null): GatewayStatus {
  const s = (raw ?? "").trim().toLowerCase();
  if (["successful", "success", "completed"].includes(s)) return "success";
  if (["cancelled", "canceled"].includes(s)) return "cancelled";
  if (["failed", "failure", "error", "declined"].includes(s)) return "failed";
  return "unknown";
}

// Our backend prefixes the tx_ref it hands to the payment gateway with the
// application's own id (see the reference returned from
// /application/payment-details/{id}/{currency}), so we can recover it here
// and reconcile with our own backend instead of trusting the redirect query
// string alone — gateway callbacks can be stale, replayed, or edited by hand.
const APPLICATION_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

function extractApplicationId(txRef: string | null): string | null {
  if (!txRef) return null;
  return txRef.match(APPLICATION_ID_PATTERN)?.[0] ?? null;
}

/** How long we wait for our backend to confirm before falling back to the
 *  gateway's own status (webhooks can lag a few seconds behind the redirect). */
const VERIFY_TIMEOUT_MS = 25000;

function CopyChip({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className="shrink-0 text-gray-400 hover:text-[#6024D0] transition-colors cursor-pointer"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-[#15010D] truncate">{value}</p>
      </div>
      <CopyChip value={value} label={label} />
    </div>
  );
}

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const txRef = searchParams.get("tx_ref");
  const transactionId = searchParams.get("transaction_id");
  const gatewayStatus = normalizeGatewayStatus(searchParams.get("status"));

  // The gateway checkout is opened in an in-page modal (an iframe), so its
  // final redirect back to us also lands inside that iframe by default. Bust
  // out to the top-level window so this result page always shows full-page,
  // never trapped in the small modal frame.
  useEffect(() => {
    if (window.top && window.top !== window.self) {
      window.top.location.href = window.location.href;
    }
  }, []);

  const applicationId = useMemo(() => extractApplicationId(txRef), [txRef]);

  // Authoritative confirmation: keep polling our own backend regardless of
  // what the gateway told us, and let it win if it disagrees.
  const { isPaid, checking } = usePaymentStatus(applicationId, applicationId != null);

  const [verifyTimedOut, setVerifyTimedOut] = useState(false);
  useEffect(() => {
    if (!applicationId || isPaid) return;
    const timer = setTimeout(() => setVerifyTimedOut(true), VERIFY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [applicationId, isPaid]);

  // Display-only metadata (name, program) — a single fetch, separate from
  // the polling hook above so that hook's contract stays untouched.
  const [application, setApplication] = useState<ApplicationRecord | null>(null);
  useEffect(() => {
    if (!applicationId) return;
    let cancelled = false;
    getApplicationById(applicationId)
      .then((app) => {
        if (!cancelled) setApplication(app);
      })
      .catch(() => {
        // Non-critical — the page still works with just the gateway params.
      });
    return () => {
      cancelled = true;
    };
  }, [applicationId]);

  const program = application?.programCode ? getProgramInfo(application.programCode) : null;

  // Whether we have any way to verify this payment against our own backend.
  const canVerify = applicationId != null;
  // Actively polling and still within the grace window — show a live spinner.
  const isVerifying = canVerify && !isPaid && !verifyTimedOut;

  type DisplayState = "confirmed" | "verifying" | "unconfirmed" | "failed" | "cancelled" | "unknown";

  const displayState: DisplayState = isPaid
    ? "confirmed"
    : isVerifying
    ? "verifying"
    : gatewayStatus === "failed"
    ? "failed"
    : gatewayStatus === "cancelled"
    ? "cancelled"
    : gatewayStatus === "success"
    ? "unconfirmed" // gateway says paid, but we couldn't independently confirm
    : "unknown";

  const presentation: Record<
    DisplayState,
    {
      icon: React.ReactNode;
      ring: string;
      title: string;
      message: React.ReactNode;
    }
  > = {
    confirmed: {
      icon: <CheckCircle2 size={40} className="text-white" strokeWidth={2.5} />,
      ring: "bg-[#10B981] shadow-[#10B981]/30",
      title: "Payment Successful",
      message: (
        <>
          {application?.fullname ? `Thanks, ${application.fullname.split(" ")[0]}! ` : ""}
          Your payment{program ? ` for ${program.title}` : ""} has been confirmed.
          You&apos;ll receive an email with your onboarding details shortly.
        </>
      ),
    },
    verifying: {
      icon: <Loader2 size={40} className="text-white animate-spin" strokeWidth={2.5} />,
      ring: "bg-[#6024D0] shadow-[#6024D0]/30",
      title: "Confirming Your Payment",
      message: (
        <>
          Hang tight while we verify this payment with our system. This usually
          only takes a few seconds.
        </>
      ),
    },
    unconfirmed: {
      icon: <Clock size={40} className="text-white" strokeWidth={2.5} />,
      ring: "bg-amber-500 shadow-amber-500/30",
      title: "Payment Received — Confirming",
      message: (
        <>
          Your provider reported this payment as successful, and we&apos;re
          still syncing it with our records. This can take a few minutes —
          we&apos;ll email you as soon as it&apos;s confirmed, no action needed
          from you.
        </>
      ),
    },
    failed: {
      icon: <XCircle size={40} className="text-white" strokeWidth={2.5} />,
      ring: "bg-red-500 shadow-red-500/30",
      title: "Payment Failed",
      message: (
        <>
          Your payment could not be completed. No funds were captured. You can
          go back and try again, or reach out if you keep seeing this.
        </>
      ),
    },
    cancelled: {
      icon: <AlertTriangle size={40} className="text-white" strokeWidth={2.5} />,
      ring: "bg-amber-500 shadow-amber-500/30",
      title: "Payment Cancelled",
      message: <>You cancelled this payment before it completed. No funds were charged.</>,
    },
    unknown: {
      icon: <Clock size={40} className="text-white" strokeWidth={2.5} />,
      ring: "bg-gray-400 shadow-gray-400/30",
      title: "Payment Status Unavailable",
      message: (
        <>
          We couldn&apos;t determine the outcome of this payment automatically.
          If you completed a payment, check your email for confirmation or
          contact support with the reference below.
        </>
      ),
    },
  };

  const view = presentation[displayState];
  const retryHref = program ? `${program.landingPath}/apply` : "/";

  return (
    <div className="min-h-screen w-full bg-[#FCF1FF] py-12 px-4 sm:px-6 lg:px-10 font-montserrat flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-[28px] shadow-sm p-8 sm:p-12 text-center animate-in fade-in zoom-in duration-500">
        <div
          className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-8 shadow-lg ${view.ring}`}
        >
          {view.icon}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{view.title}</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">{view.message}</p>

        {(txRef || transactionId) && (
          <div className="rounded-2xl border border-[#EADCFB] bg-[#FBF7FF] px-6 divide-y divide-gray-100 text-left mb-8">
            {txRef && <DetailRow label="Transaction Reference" value={txRef} />}
            {transactionId && <DetailRow label="Transaction ID" value={transactionId} />}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          {displayState === "confirmed" && (
            <Link
              href="/"
              className="w-full sm:w-auto bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold text-sm py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Back to Home <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {(displayState === "failed" || displayState === "cancelled") && (
            <Link
              href={retryHref}
              className="w-full sm:w-auto bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold text-sm py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </Link>
          )}

          {displayState === "unconfirmed" && canVerify && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold text-sm py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Check Again
            </button>
          )}

          <a
            href="mailto:support@productpointers.com"
            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" /> Contact Support
          </a>
        </div>

        {checking && displayState !== "verifying" && (
          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-6">
            <Loader2 className="w-3 h-3 animate-spin" /> Still syncing with our records in the
            background…
          </p>
        )}
      </div>
    </div>
  );
}
