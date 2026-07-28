"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Layers,
  Users,
  ClipboardList,
  Lightbulb,
  Check,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Loader2,
  AlertCircle,
  Zap,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import SurveyQuestions from "@/components/preregistration/SurveyQuestions";
import { ppapQuestions, validateRequiredAnswers } from "@/lib/programQuestions";
import { submitApplication } from "@/lib/application";
import { PROGRAM_FEE_NGN, ORIGINAL_FEE_NGN } from "@/lib/pricing";
import { useLiveRates, currencies } from "@/lib/useLiveRates";
import { getLiveProgramFeeNgn } from "@/lib/programs";

interface SubmitResult {
  applicationId: string;
  fullname: string;
  email: string;
}

export default function PPAPApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  // Lifted here so all steps share one source of truth, and we pass the final
  // value into the checkout URL when the application is submitted.
  const [currencyCode, setCurrencyCode] = useState("NGN");
  const [redirecting, setRedirecting] = useState(false);

  // Seed from ?currency= if the user came from the pricing section.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("currency");
    if (c) setCurrencyCode(c.toUpperCase());
  }, []);

  if (redirecting) {
    return (
      <div className="min-h-screen w-full bg-[#FCF1FF] py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-montserrat">
        <div className="w-full max-w-md bg-white rounded-[24px] shadow-sm p-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#6024D0] mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Redirecting you to checkout…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FCF1FF] py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-montserrat">
      {step === 0 && (
        <StepPricing
          initialCurrencyCode={currencyCode}
          onCurrencyChange={setCurrencyCode}
          onNext={() => setStep(1)}
        />
      )}
      {step === 1 && <StepOne onNext={() => setStep(2)} />}
      {step === 2 && (
        <StepTwo
          onBack={() => setStep(1)}
          onComplete={(r) => {
            setRedirecting(true);
            router.push(
              `/checkout?program=PPAP&currency=${currencyCode}&id=${r.applicationId}`
            );
          }}
        />
      )}
    </div>
  );
}

/* ---------------------------------- Step 0 --------------------------------- */

const pricingFeatures = [
  "Full access to all sessions",
  "Mentorship support",
  "Assignments & resources",
  "Community access & growth resources",
];

const Flag = ({ country }: { country: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={`https://flagcdn.com/24x18/${country}.png`}
    alt=""
    width={20}
    height={15}
    className="w-5 h-auto rounded-sm shrink-0"
  />
);

function StepPricing({
  initialCurrencyCode,
  onCurrencyChange,
  onNext,
}: {
  initialCurrencyCode: string;
  onCurrencyChange: (code: string) => void;
  onNext: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch the real live fee from the API first — this is the authoritative
  // NGN amount that will also appear in checkout, so both pages stay in sync.
  const [liveFeeNgn, setLiveFeeNgn] = useState<number | null>(null);
  useEffect(() => {
    getLiveProgramFeeNgn("PPAP").then(setLiveFeeNgn);
  }, []);

  const {
    currency,
    setCurrency,
    formatLive,
    getLiveAmount,
    loading,
    error,
    isLive,
    priceKey,
  } = useLiveRates(liveFeeNgn ?? 0, initialCurrencyCode);

  // Sync the lifted currency code upward whenever the user picks a new one.
  useEffect(() => {
    onCurrencyChange(currency.code);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency.code]);

  // Close dropdown on outside click.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  // Scale the original (strikethrough) price using the same ratio as the
  // static constants: ORIGINAL_FEE_NGN / PROGRAM_FEE_NGN × live fee.
  const originalFeeNgn =
    liveFeeNgn != null
      ? Math.round(liveFeeNgn * (ORIGINAL_FEE_NGN / PROGRAM_FEE_NGN))
      : null;

  const feeDisplay = liveFeeNgn != null ? formatLive(liveFeeNgn) : null;
  const originalDisplay = originalFeeNgn != null ? formatLive(originalFeeNgn) : null;

  // Loading: either the fee hasn't come back yet, or the rates are still in-flight.
  const isLoading = liveFeeNgn === null || loading;

  return (
    <div className="w-full max-w-2xl bg-white rounded-[24px] shadow-sm p-8 md:p-12 animate-in fade-in zoom-in duration-500 mt-6 text-center">
      <span className="inline-block bg-[#F3E8FF] text-[#6024D0] rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
        PPAP Application
      </span>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Invest In Your Product Career
      </h1>
      <p className="text-gray-500 max-w-lg mx-auto mb-6">
        A structured 12-week program designed to give you clarity, direction,
        and confidence in Product Management.
      </p>

      {/* Strikethrough original */}
      {/* {originalDisplay && (
        <p className="text-gray-400 line-through text-sm font-medium mb-1">
          {originalDisplay}
        </p>
      )} */}

      {/* Currency selector row */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {/* Status badges */}
        {isLoading && (
          <span className="inline-flex items-center gap-1 text-[10px] text-[#6024D0] font-medium bg-[#F3E8FF] px-2.5 py-1 rounded-full animate-pulse">
            <RefreshCw className="w-2.5 h-2.5 animate-spin" />
            Fetching live rates…
          </span>
        )}
        {!isLoading && isLive && (
          <span className="inline-flex items-center gap-1 text-[10px] text-[#10B981] font-semibold bg-[#ECFDF3] px-2.5 py-1 rounded-full">
            <Zap className="w-2.5 h-2.5" />
            Live rate
          </span>
        )}
        {!isLoading && error && currency.code !== "NGN" && (
          <span className="text-[10px] text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full font-medium">
            Est. rate
          </span>
        )}

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((p) => !p)}
            className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Flag country={currency.country} />
            {currency.code}
            <ChevronDown
              className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute z-30 mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-2xl shadow-xl w-52 py-2 max-h-72 overflow-auto">
              <div className="px-4 pb-2 border-b border-gray-100 mb-1">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  Select Currency
                </p>
              </div>
              {currencies.map((c) => {
                const liveAmt = getLiveAmount(c);
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCurrency(c);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                      c.code === currency.code
                        ? "bg-[#F3E8FF] text-[#6024D0] font-semibold"
                        : "text-gray-700 hover:bg-purple-50"
                    }`}
                  >
                    <Flag country={c.country} />
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="font-semibold">{c.code}</span>
                      {liveAmt ? (
                        <span
                          className={`text-[10px] truncate ${
                            c.code === currency.code
                              ? "text-[#6024D0]/70"
                              : "text-gray-400"
                          }`}
                        >
                          {liveAmt}
                        </span>
                      ) : loading ? (
                        <span className="text-[10px] text-gray-300">Loading…</span>
                      ) : null}
                    </div>
                    {c.code === currency.code && (
                      <Check className="w-3.5 h-3.5 text-[#6024D0] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main price */}
      <div className="mb-10 min-h-[4rem] flex items-center justify-center">
        {isLoading ? (
          <span className="inline-block h-14 w-44 rounded-xl bg-gray-200 animate-pulse" />
        ) : (
          <span
            key={`price-${priceKey}-${currency.code}`}
            className="text-4xl md:text-5xl font-black text-gray-900"
            style={{ animation: "fadeInUp 0.3s ease" }}
          >
            {feeDisplay}
          </span>
        )}
      </div>

      <div className="space-y-4 mb-10 max-w-md mx-auto text-left">
        {pricingFeatures.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-purple-600" strokeWidth={3} />
            </span>
            <span className="text-gray-600 text-sm">{item}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={isLoading}
        className="bg-[#6024D0] hover:bg-[#4d1ba8] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-4 px-10 rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
      >
        Continue <ArrowRight size={20} />
      </button>
    </div>
  );
}

/* ---------------------------------- Step 1 --------------------------------- */

const benefits: { icon: LucideIcon; label: string }[] = [
  { icon: Layers, label: "Understand Product Management fundamentals" },
  { icon: Users, label: "Learn how real teams build products" },
  { icon: ClipboardList, label: "Work on practical assignments" },
  { icon: Lightbulb, label: "Start thinking like a Product Manager" },
];

const expectations = [
  "Ready to learn and grow",
  "Can commit to the schedule",
  "Open to hands-on assignments",
];

function StepOne({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full max-w-4xl bg-white rounded-[24px] shadow-sm p-8 md:p-12 animate-in fade-in zoom-in duration-500 mt-6">
      <div className="text-center mb-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#F3E8FF] text-[#6024D0] font-semibold text-xs mb-6">
          PPAP Application
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Before You Apply...
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          The ProductPointers Accelerator Program (PPAP) is designed for aspiring
          and beginner Product Managers who want clarity, structure, and a strong
          foundation.
        </p>
      </div>

      <div className="mb-10">
        <p className="font-medium text-gray-900 mb-4">In this program, you will:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-[#FCF8FF] border border-[#F3E8FF] p-4 rounded-xl"
            >
              <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-[#F3E8FF] text-[#6024D0]">
                <Icon size={18} />
              </div>
              <span className="text-gray-700 font-medium text-xs md:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <p className="font-medium text-gray-900 mb-4">What We Expect From You</p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8">
          {expectations.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check size={16} className="text-[#10B981]" strokeWidth={3} />
              <span className="text-gray-600 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={onNext}
          className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold py-4 px-10 rounded-xl transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <span>I&apos;m Ready to Apply</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- Step 2 --------------------------------- */

function SectionCard({
  pill,
  children,
}: {
  pill?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      {pill && (
        <span className="inline-block bg-[#F3E8FF] text-[#6024D0] rounded-full px-3 py-1 text-xs font-medium mb-5">
          {pill}
        </span>
      )}
      {children}
    </div>
  );
}

function StepTwo({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: (result: SubmitResult) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const fd = new FormData(e.currentTarget);
    const validationError = validateRequiredAnswers(ppapQuestions, fd);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const fullname = String(fd.get("fullname") ?? "").trim();
      const email = String(fd.get("email") ?? "").trim();
      const result = await submitApplication(e.currentTarget, "PPAP");
      onComplete({ ...result, fullname, email });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl animate-in fade-in slide-in-from-right-8 duration-500">
      <Link
        href="/ppap"
        className="inline-flex items-center text-[#6024D0] hover:underline font-medium mb-8 text-xs"
      >
        &larr; Return to PPAP Program Page
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          PPAP Application Form
        </h1>
        <div className="bg-[#F3E8FF] border border-[#E9D7FE] rounded-xl p-5 text-[#6024D0] text-xs md:text-sm font-medium inline-block w-full">
          Complete this application thoughtfully so we can better understand your
          goals, experience level, and how to guide you through your Product
          Management journey.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <SectionCard pill="Basic Info">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fullname"
                required
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email address *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="your.email@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone number (WhatsApp preferred) *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                required
                placeholder="+234 XXX XXX XXXX"
                className={inputClass}
              />
            </div>
          </div>
        </SectionCard>

        {/* Survey questions (rendered from the shared program definitions) */}
        <SurveyQuestions questions={ppapQuestions} />

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl px-5 py-4 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="pt-2 flex flex-col items-center">
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#6024D0] hover:bg-[#4d1ba8] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-4 px-10 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Start My PM Journey</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onBack}
            disabled={submitting}
            className="mt-6 text-xs text-gray-500 hover:text-gray-900 transition-colors cursor-pointer disabled:opacity-50"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}
