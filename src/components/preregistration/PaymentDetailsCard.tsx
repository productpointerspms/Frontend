"use client";

import React, { useState } from "react";
import { Check, Copy, ExternalLink, Building2, Loader2 } from "lucide-react";
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
      className="shrink-0 text-[#6024D0] hover:text-[#4d1ba8] transition-colors cursor-pointer"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function Field({
  label,
  value,
  copyable = false,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className="text-base font-semibold text-[#15010D]">{value}</p>
      </div>
      {copyable && <CopyButton value={value} label={label} />}
    </div>
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
  if (!details) {
    return (
      <div className="border-2 border-dashed border-[#A78BFA] rounded-2xl p-6 text-center">
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

  if (!details.transfer && !details.link) {
    return (
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center">
        <p className="text-sm text-gray-500">
          No payment method is available for this currency yet. Please contact
          support for help completing your payment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {details.transfer && (
        <div className="border-2 border-dashed border-[#A78BFA] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6024D0] uppercase tracking-wide">
            <Building2 className="w-4 h-4" /> Bank Transfer
          </div>
          <Field label="Bank Name" value={details.transfer.bankName} />
          <Field label="Account Name" value={details.transfer.accountName} />
          <Field
            label="Account Number"
            value={details.transfer.accountNumber}
            copyable
          />
          <Field label="Amount" value={amountLabel} copyable />
        </div>
      )}

      {details.link && (
        <a
          href={details.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold text-sm py-4 rounded-xl transition-colors"
        >
          Pay with Card <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
