"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Users,
  ClipboardList,
  Lightbulb,
  Check,
  ChevronRight,
  ArrowRight,
  Search,
  Mail,
  CreditCard,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

export default function PPAPApplyPage() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen w-full bg-[#FCF1FF] py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-montserrat">
      {step === 1 && <StepOne onNext={handleNext} />}
      {step === 2 && <StepTwo onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <StepThree />}
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

const stageOptions = [
  "Student",
  "Recent graduate",
  "Working professional (non-tech)",
  "Working in tech (non-product role)",
];

const experienceOptions = [
  "I'm completely new",
  "I've watched/read a few resources",
  "I've taken a course but still confused",
  "I understand basics but need structure",
];

const challengeOptions = [
  "I don't understand how PM works",
  "I feel overwhelmed by too many resources",
  "I don't know where to start",
  "I lack structure and guidance",
  "Other",
];

const commitmentOptions = ["Yes", "Not sure yet"];

const referralOptions = ["LinkedIn", "Twitter (X)", "Referral", "WhatsApp", "Other"];

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

function CheckboxGroup({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <input
            type="checkbox"
            name={name}
            value={opt}
            className="w-4 h-4 rounded border-gray-300 text-[#6024D0] focus:ring-[#6024D0] cursor-pointer"
          />
          <span className="text-xs md:text-sm text-gray-700 group-hover:text-black">
            {opt}
          </span>
        </label>
      ))}
    </div>
  );
}

function StepTwo({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow";

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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="space-y-6"
      >
        {/* Basic Info */}
        <SectionCard pill="Basic Info">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
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
                required
                placeholder="+234 XXX XXX XXXX"
                className={inputClass}
              />
            </div>
          </div>
        </SectionCard>

        {/* Background */}
        <SectionCard pill="Background">
          <p className="font-medium text-gray-900 mb-4 text-sm md:text-base">
            Tell us about your current stage
          </p>
          <CheckboxGroup name="stage" options={stageOptions} />
        </SectionCard>

        {/* Experience */}
        <SectionCard pill="Experience">
          <p className="font-medium text-gray-900 mb-4 text-sm md:text-base">
            What&apos;s your product management level experience?
          </p>
          <CheckboxGroup name="experience" options={experienceOptions} />
        </SectionCard>

        {/* Motivation */}
        <SectionCard pill="Motivation">
          <p className="font-medium text-gray-900 mb-4 text-sm md:text-base">
            Why do you want to learn Product Management?
          </p>
          <textarea
            rows={4}
            placeholder="I want to become a PM because..."
            className={`${inputClass} resize-none`}
          />
        </SectionCard>

        {/* Challenge */}
        <SectionCard pill="Challenge">
          <p className="font-medium text-gray-900 mb-4 text-sm md:text-base">
            What is your biggest challenge right now?
          </p>
          <CheckboxGroup name="challenge" options={challengeOptions} />
        </SectionCard>

        {/* Expectation */}
        <SectionCard pill="Expectation">
          <p className="font-medium text-gray-900 mb-4 text-sm md:text-base">
            What do you hope to achieve from this program?
          </p>
          <textarea
            rows={4}
            placeholder="Tell us what you hope to achieve..."
            className={`${inputClass} resize-none`}
          />
        </SectionCard>

        {/* Commitment */}
        <SectionCard pill="Commitment">
          <p className="font-medium text-gray-900 mb-4 text-sm md:text-base">
            Can you commit to attending sessions and completing assignments?
          </p>
          <CheckboxGroup name="commitment" options={commitmentOptions} />
        </SectionCard>

        {/* Referral */}
        <SectionCard>
          <p className="font-medium text-gray-900 mb-4 text-sm md:text-base">
            How did you hear about ProductPointers?
          </p>
          <CheckboxGroup name="referral" options={referralOptions} />
        </SectionCard>

        <div className="pt-2 flex flex-col items-center">
          <button
            type="submit"
            className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold py-4 px-10 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start My PM Journey</span>
            <ArrowRight size={20} />
          </button>
          <button
            type="button"
            onClick={onBack}
            className="mt-6 text-xs text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------------------------- Step 3 --------------------------------- */

const nextSteps: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "Application Review",
    desc: "Our team will carefully review your application.",
  },
  {
    icon: Mail,
    title: "Email Notification",
    desc: "You'll receive an email with the decision.",
  },
  {
    icon: CreditCard,
    title: "Payment Process",
    desc: "Complete payment to secure your spot.",
  },
  {
    icon: BookOpen,
    title: "Onboarding Access",
    desc: "Get access to the PPAP learning platform.",
  },
];

function StepThree() {
  return (
    <div className="w-full max-w-4xl bg-white rounded-[24px] shadow-sm p-8 md:p-16 animate-in fade-in zoom-in duration-500 text-center mt-6">
      <div className="mx-auto w-20 h-20 bg-[#6024D0] rounded-full flex items-center justify-center mb-8">
        <Check size={40} className="text-white" strokeWidth={3} />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Your Application Has Been Received
      </h1>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Thank you for applying to the ProductPointers Accelerator Program. Our
        team will review your application and contact you with the next steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
        {nextSteps.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-[#F3E8FF] rounded-lg flex items-center justify-center mb-4">
              <Icon size={20} className="text-[#6024D0]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-xs text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <Link
          href="/ppap"
          className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center space-x-2"
        >
          <span>Explore ProductPointers</span>
          <ChevronRight size={18} />
        </Link>
        <Link
          href="/"
          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </div>

      <p className="text-xs text-gray-400">
        We&apos;re excited to have you start this journey. For enquiries{" "}
        <Link href="/contact" className="text-[#6024D0] hover:underline">
          click here
        </Link>{" "}
        to send us a message.
      </p>
    </div>
  );
}
