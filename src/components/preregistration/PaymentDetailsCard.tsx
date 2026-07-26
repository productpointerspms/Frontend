"use client";

import React, { useEffect, useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  Landmark,
  CreditCard,
  ShieldCheck,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import type { PaymentDetails } from "@/lib/application";

function CopyButton({ value, label }: { value: string; label: string }) {
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
      className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
        copied
          ? "bg-[#ECFDF3] text-[#10B981]"
          : "bg-[#F3E8FF] text-[#6024D0] hover:bg-[#E9D5FF]"
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function DetailRow({
  label,
  value,
  copyable = false,
  emphasize = false,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">{label}</p>
        <p
          className={`truncate ${
            emphasize
              ? "text-lg font-extrabold text-[#15010D]"
              : "text-base font-semibold text-[#15010D]"
          }`}
        >
          {value}
        </p>
      </div>
      {copyable && <CopyButton value={value} label={label} />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
        active
          ? "bg-white text-[#6024D0] shadow-sm ring-1 ring-black/5"
          : "text-gray-500 hover:text-[#6024D0]"
      }`}
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}

export interface PaymentDetailsCardProps {
  details: PaymentDetails | null;
  loading: boolean;
  /** Formatted amount to display alongside the bank transfer fields, e.g. "NGN 100,000". */
  amountLabel: string;
  /** Shown before a fetch has happened. */
  idleMessage: React.ReactNode;
}

export function PaymentDetailsCard({
  details,
  loading,
  amountLabel,
  idleMessage,
}: PaymentDetailsCardProps) {
  const hasTransfer = !!details?.transfer;
  const hasCard = !!details?.link?.paymentLink;

  const [tab, setTab] = useState<"transfer" | "card">("transfer");

  // Land on whichever method is actually available once details arrive.
  useEffect(() => {
    if (tab === "transfer" && !hasTransfer && hasCard) setTab("card");
    if (tab === "card" && !hasCard && hasTransfer) setTab("transfer");
  }, [hasTransfer, hasCard, tab]);

  if (!details) {
    return (
      <div className="border border-[#EADCFB] rounded-2xl p-8 text-center bg-[#FBF7FF]">
        {loading ? (
          <p className="flex items-center justify-center gap-2 text-sm text-[#6024D0] font-medium">
            <Loader2 className="w-4 h-4 animate-spin" /> Fetching your payment details…
          </p>
        ) : (
          <p className="text-sm text-gray-500">{idleMessage}</p>
        )}
      </div>
    );
  }

  if (!hasTransfer && !hasCard) {
    return (
      <div className="border border-gray-200 rounded-2xl p-8 text-center">
        <p className="text-sm text-gray-500">
          No payment method is available for this currency yet. Please contact
          support for help completing your payment.
        </p>
      </div>
    );
  }

  return (
    <div>
      {hasTransfer && hasCard && (
        <div className="flex gap-1 bg-[#F6EDFF] rounded-2xl p-1.5 mb-5">
          <TabButton
            active={tab === "transfer"}
            onClick={() => setTab("transfer")}
            icon={Landmark}
            label="Bank Transfer"
          />
          <TabButton
            active={tab === "card"}
            onClick={() => setTab("card")}
            icon={CreditCard}
            label="Card Payment"
          />
        </div>
      )}

      {tab === "transfer" && hasTransfer && details.transfer && (
        <div className="rounded-2xl border border-[#EADCFB] overflow-hidden">
          {/* Amount banner */}
          <div className="bg-gradient-to-r from-[#6024D0] to-[#8B5CF6] px-6 py-5 text-white">
            <p className="text-[11px] uppercase tracking-wide text-white/70 mb-1">
              Amount to Transfer
            </p>
            <p className="text-2xl font-extrabold">{amountLabel}</p>
          </div>

          {/* Account details */}
          <div className="bg-white px-6 divide-y divide-gray-100">
            <DetailRow label="Bank Name" value={details.transfer.bankName} />
            <DetailRow label="Account Name" value={details.transfer.accountName} />
            <DetailRow
              label="Account Number"
              value={details.transfer.accountNumber}
              copyable
              emphasize
            />
          </div>

          <div className="flex items-start gap-2.5 bg-[#F6EDFF] px-6 py-4 text-[#6024D0]">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              Transfer the exact amount above to this account. We&apos;ll confirm
              your payment automatically — no need to send a receipt.
            </p>
          </div>
        </div>
      )}

      {tab === "card" && hasCard && details.link && (
        <div className="rounded-2xl border border-[#EADCFB] overflow-hidden">
          <div className="bg-gradient-to-r from-[#6024D0] to-[#8B5CF6] px-6 py-5 text-white flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-white/70 mb-1">
                Amount to Pay
              </p>
              <p className="text-2xl font-extrabold">{amountLabel}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white px-6 py-6 text-center">
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              You&apos;ll be redirected to a secure Paystack checkout page to
              enter your card details and complete payment.
            </p>
            <a
              href={details.link.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold text-sm py-4 rounded-xl transition-colors"
            >
              Proceed to Secure Checkout <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 bg-[#F6EDFF] px-6 py-3 text-[#6024D0]">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <p className="text-xs">Secured by Paystack</p>
          </div>
        </div>
      )}
    </div>
  );
}
