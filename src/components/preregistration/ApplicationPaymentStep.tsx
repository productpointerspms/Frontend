"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Search,
  Mail,
  CreditCard,
  ClipboardCheck,
  Copy,
  ArrowRight,
  Loader2,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import {
  createPaymentLink,
  createDynamicVirtualAccount,
  type VirtualAccount,
} from "@/lib/payment";

type PayMethod = "transfer" | "card";

const infoCards: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "Application Review",
    desc: "Our team reviews every application to confirm your enrollment details.",
  },
  {
    icon: Mail,
    title: "Email Notification",
    desc: "You'll receive a confirmation email with onboarding details.",
  },
  {
    icon: CreditCard,
    title: "Payment Process",
    desc: "Complete your commitment payment below to secure your spot.",
  },
  {
    icon: ClipboardCheck,
    title: "Program Onboarding",
    desc: "Once payment is confirmed, you'll get access to your cohort and resources.",
  },
];

function InfoCard({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-10 h-10 bg-[#6024D0] rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-bold text-gray-900 mb-1 text-sm">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
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
      aria-label="Copy"
      className="shrink-0 text-[#6024D0] hover:text-[#4d1ba8] transition-colors cursor-pointer"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

export interface ApplicationPaymentStepProps {
  /** Full display name, e.g. "ProductPointers Accelerator Program". */
  programName: string;
  /** Landing page path, e.g. "/ppap". */
  programPath: string;
  applicationId: string;
  fullname: string;
  email: string;
  amount: number;
  currencyCode: string;
  reference?: string;
}

const ApplicationPaymentStep: React.FC<ApplicationPaymentStepProps> = ({
  programName,
  programPath,
  applicationId,
  fullname,
  email,
  amount,
  currencyCode,
  reference,
}) => {
  const [method, setMethod] = useState<PayMethod>("transfer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [virtualAccount, setVirtualAccount] = useState<VirtualAccount | null>(null);

  const handlePay = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const payload = { applicationId, amount, currency: currencyCode, email, fullname };

      if (method === "card") {
        const { paymentUrl } = await createPaymentLink(payload);
        window.location.href = paymentUrl;
        return;
      }

      const account = await createDynamicVirtualAccount(payload);
      setVirtualAccount(account);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-[24px] shadow-sm p-8 md:p-12 animate-in fade-in zoom-in duration-500 text-center mt-6">
      <div className="mx-auto w-20 h-20 bg-[#6024D0] rounded-full flex items-center justify-center mb-8 shadow-lg shadow-purple-200">
        <Check size={40} className="text-white" strokeWidth={3} />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Your Application Has Been Received
      </h1>
      <p className="text-gray-500 mb-10 max-w-md mx-auto">
        Thank you for applying to the {programName}. Complete your commitment
        payment below to secure your spot.
      </p>

      {/* What happens next */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 text-left">
        {infoCards.map((card) => (
          <InfoCard key={card.title} {...card} />
        ))}
      </div>

      {/* Payment card */}
      <div className="rounded-2xl border border-[#EADCFB] bg-gradient-to-b from-[#FBF5FF] to-white p-6 md:p-7 text-left mb-8">
        <div className="flex items-center gap-2 text-[#6024D0] mb-3">
          <CreditCard className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">
            Commitment Fee
          </span>
        </div>

        <p className="text-4xl font-black text-[#1a1a1a] tracking-tight">
          {currencyCode} {amount.toLocaleString()}
        </p>

        {reference && (
          <p className="text-xs text-gray-400 mt-2">
            Reference: <span className="font-medium text-gray-600">{reference}</span>
          </p>
        )}

        {/* Method toggle */}
        <div className="flex items-center gap-6 mt-6 mb-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="radio"
              checked={method === "transfer"}
              onChange={() => {
                setMethod("transfer");
                setVirtualAccount(null);
                setError(null);
              }}
              className="accent-[#6024D0]"
            />
            Transfer
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="radio"
              checked={method === "card"}
              onChange={() => {
                setMethod("card");
                setVirtualAccount(null);
                setError(null);
              }}
              className="accent-[#6024D0]"
            />
            Card
          </label>
        </div>

        {method === "transfer" && virtualAccount && (
          <div className="border-2 border-dashed border-[#A78BFA] rounded-2xl p-5 space-y-4 mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Bank Name</p>
              <p className="text-sm font-semibold text-[#15010D]">{virtualAccount.bankName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Account Name</p>
              <p className="text-sm font-semibold text-[#15010D]">{virtualAccount.accountName}</p>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Account Number</p>
                <p className="text-sm font-semibold text-[#15010D]">{virtualAccount.accountNumber}</p>
              </div>
              <CopyButton value={virtualAccount.accountNumber} />
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-xs mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!(method === "transfer" && virtualAccount) && (
          <button
            type="button"
            onClick={handlePay}
            disabled={loading}
            className="mt-2 w-full bg-[#6024D0] hover:bg-[#4d1ba8] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Processing
              </>
            ) : (
              <>
                {method === "card" ? "Proceed to Payment" : "Generate Account Number"}{" "}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        )}

        <div className="mt-4 flex items-start gap-2.5 bg-[#F3E8FF] rounded-xl px-4 py-3.5 text-[#6024D0]">
          <Mail className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="text-xs md:text-sm font-medium">
            You&apos;ll also receive payment instructions via email.
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link
          href={programPath}
          className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold text-sm py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          Explore ProductPointers <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm py-3 px-8 rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </div>

      <div className="border-t border-gray-100 mt-10 pt-6">
        <p className="text-[#6024D0] italic text-sm font-medium mb-2">
          We keep our cohorts small to ensure quality mentorship and real results.
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          Looking forward to having you onboard.
          <br />
          For enquiries,{" "}
          <Link href="/contact" className="text-[#6024D0] hover:underline">
            click here
          </Link>{" "}
          to send us a message.
        </p>
      </div>
    </div>
  );
};

export default ApplicationPaymentStep;
