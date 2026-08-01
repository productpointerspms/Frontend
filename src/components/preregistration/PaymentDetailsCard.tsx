"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Copy,
  ExternalLink,
  Landmark,
  CreditCard,
  ShieldCheck,
  Loader2,
  X,
  type LucideIcon,
} from "lucide-react";
import type { PaymentDetails } from "@/lib/application";

/** Renders the Paystack checkout URL in an in-page modal instead of a new tab. */
function CheckoutModal({ url, onClose }: { url: string; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg h-[85vh] max-h-[720px] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#15010D]">
            <ShieldCheck className="w-4 h-4 text-[#6024D0]" />
            Secure Checkout
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <iframe
          src={url}
          title="Secure checkout"
          className="flex-1 w-full border-0"
        />

        <div className="px-5 py-3 border-t border-gray-100 text-center shrink-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#6024D0] hover:underline"
          >
            Having trouble? Open in a new tab <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

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
  /** Selected currency code, e.g. "NGN". Bank transfer is Nigeria-only, regardless of what the API returns. */
  currencyCode: string;
}

export function PaymentDetailsCard({
  details,
  loading,
  amountLabel,
  idleMessage,
  currencyCode,
}: PaymentDetailsCardProps) {
  const hasTransfer = !!details?.transfer && currencyCode.toUpperCase() === "NGN";
  const hasCard = !!details?.link?.paymentLink;

  const [tab, setTab] = useState<"transfer" | "card">("transfer");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

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
              Enter your card details on the secure Paystack checkout to
              complete payment — without leaving this page.
            </p>
            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold text-sm py-4 rounded-xl transition-colors cursor-pointer"
            >
              Proceed to Secure Checkout <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 bg-[#F6EDFF] px-6 py-3 text-[#6024D0]">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <p className="text-xs">Secured by Paystack</p>
          </div>
        </div>
      )}

      {checkoutOpen && details?.link && (
        <CheckoutModal
          url={details.link.paymentLink}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </div>
  );
}
