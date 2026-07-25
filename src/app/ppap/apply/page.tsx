"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layers,
  Users,
  ClipboardList,
  Lightbulb,
  Check,
  ChevronRight,
  ArrowRight,
  Loader2,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import SurveyQuestions from "@/components/preregistration/SurveyQuestions";
import ApplicationPaymentStep from "@/components/preregistration/ApplicationPaymentStep";
import { ppapQuestions, validateRequiredAnswers } from "@/lib/programQuestions";
import { submitApplication } from "@/lib/application";
import { getCurrency, convert, PROGRAM_FEE_NGN } from "@/lib/pricing";

interface SubmitResult {
  applicationId: string;
  fullname: string;
  email: string;
}

export default function PPAPApplyPage() {
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState("NGN");
  const [result, setResult] = useState<SubmitResult | null>(null);

  // Read the preferred currency from the ?currency= query (set by pricing CTA).
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("currency");
    if (c) setCurrency(c.toUpperCase());
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FCF1FF] py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-montserrat">
      {step === 1 && <StepOne onNext={() => setStep(2)} />}
      {step === 2 && (
        <StepTwo
          onBack={() => setStep(1)}
          onComplete={(r) => {
            setResult(r);
            setStep(3);
          }}
        />
      )}
      {step === 3 && result && (
        <PaymentStep result={result} currency={currency} />
      )}
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

/* ---------------------------------- Step 3 --------------------------------- */

function PaymentStep({
  result,
  currency,
}: {
  result: SubmitResult;
  currency: string;
}) {
  const currencyObj = getCurrency(currency);
  const amount = convert(PROGRAM_FEE_NGN, currencyObj);

  return (
    <ApplicationPaymentStep
      programName="ProductPointers Accelerator Program (PPAP)"
      programPath="/ppap"
      applicationId={result.applicationId}
      fullname={result.fullname}
      email={result.email}
      amount={amount}
      currencyCode={currencyObj.code}
      showPaymentButton={false}
    />
  );
}
