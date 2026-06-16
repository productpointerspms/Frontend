"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";

export default function PPIPApplyPage() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen w-full bg-[#FCF8FF] py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-montserrat">
      {step === 1 && <StepOne onNext={handleNext} />}
      {step === 2 && <StepTwo onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <StepThree />}
    </div>
  );
}

function StepOne({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full max-w-4xl bg-white rounded-[24px] shadow-sm p-8 md:p-12 animate-in fade-in zoom-in duration-500 mt-10">
      <div className="text-center mb-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#F3E8FF] text-[#6024D0] font-semibold text-xs mb-6">
          PPIP Internship
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Before You Apply...
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          The ProductPointers Internship Program (PPIP) is a 10-week hands-on
          internship, not a passive learning program.
        </p>
      </div>

      <div className="mb-10">
        <p className="font-medium text-gray-900 mb-4">
          During the internship, you will:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Build and launch a real product (MVP)",
            "Work weekly on real product tasks",
            "Participate in reviews, feedback, and collaboration",
            "Receive mentor verification of your work",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 bg-[#FCF8FF] border border-[#F3E8FF] p-4 rounded-xl"
            >
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#F3E8FF] text-[#6024D0]">
                <Check size={18} strokeWidth={3} />
              </div>
              <span className="text-gray-700 font-medium text-xs md:text-sm">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <p className="font-medium text-gray-900 mb-4">Checklist:</p>
        <div className="space-y-3">
          {[
            "You have foundational Product Management knowledge",
            "You are ready to do real, hands-on product work",
            "You can commit to the full 10-week program",
          ].map((item) => (
            <div key={item} className="flex items-center space-x-3">
              <CheckCircle2 size={20} className="text-[#10B981]" />
              <span className="text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={onNext}
          className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold py-4 px-10 rounded-xl transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <span>I&apos;m Ready To Apply</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function StepTwo({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  // Conditional field: the "what role" detail only shows when the user answers
  // "Yes" to currently working in a product-related role.
  const [working, setWorking] = useState<string>("");

  return (
    <div className="w-full max-w-3xl animate-in fade-in slide-in-from-right-8 duration-500">
      <Link
        href="/ppip"
        className="inline-flex items-center text-[#6024D0] hover:underline font-medium mb-8 text-xs"
      >
        &larr; Back to PPIP | Internship
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          PPIP Application Form
        </h1>
        <div className="bg-[#F3E8FF] border border-[#E9D7FE] rounded-xl p-5 text-[#6024D0] text-xs md:text-sm font-medium inline-block w-full">
          Please complete this form. After completing the application form, you
          will be redirected to the payment page. Please click on proceed.
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="bg-white shadow-sm rounded-2xl p-6 md:p-10 space-y-8"
      >
        {/* Profile */}
        <div className="space-y-6">
          <h2 className="text-base font-semibold text-gray-900 border-b pb-2">
            Profile
          </h2>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number (WhatsApp Preferred) *
            </label>
            <input
              type="tel"
              required
              placeholder="+234 XXX XXX XXXX"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow"
            />
          </div>
        </div>

        {/* Background */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Background
          </h2>

          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3">
              Which best describes your current situation? *
            </label>
            <div className="space-y-3">
              {[
                "Beginner (just exploring Product Management)",
                "Completed a PM course / bootcamp",
                "Entry-level Product Manager",
                "Transitioning from another role into Product",
              ].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="situation"
                    required
                    value={opt}
                    className="w-4 h-4 text-[#6024D0] border-gray-300 focus:ring-[#6024D0] cursor-pointer"
                  />
                  <span className="text-xs text-gray-700 group-hover:text-black">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-900 mb-2">
              What is your biggest challenge right now? *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Type in your answer..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-900 mb-2">
              Why do you want to join the ProductPointers Internship Program? *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Type in your answer..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow resize-none"
            ></textarea>
          </div>
        </div>

        {/* Commitment */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Commitment
          </h2>

          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3">
              This is a 10-week internship. Can you commit your time and effort? *
            </label>
            <div className="space-y-3">
              {["Yes, I'm ready to commit", "Not sure yet"].map((ans) => (
                <label
                  key={ans}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="commitment"
                    required
                    value={ans}
                    className="w-4 h-4 text-[#6024D0] border-gray-300 focus:ring-[#6024D0] cursor-pointer"
                  />
                  <span className="text-xs text-gray-700 group-hover:text-black">
                    {ans}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-900 mb-2">
              What do you hope to achieve by the end of this internship? *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Type in your answer..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow resize-none"
            ></textarea>
          </div>
        </div>

        {/* Experience (with conditional reveal) */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Experience
          </h2>

          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3">
              Are you currently working in any product/project related role? *
            </label>
            <div className="space-y-3">
              {["Yes", "No"].map((ans) => (
                <label
                  key={ans}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="currentlyWorking"
                    required
                    value={ans}
                    checked={working === ans}
                    onChange={(e) => setWorking(e.target.value)}
                    className="w-4 h-4 text-[#6024D0] border-gray-300 focus:ring-[#6024D0] cursor-pointer"
                  />
                  <span className="text-xs text-gray-700 group-hover:text-black">
                    {ans}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* This only reveals if the user selects "Yes" above */}
          {working === "Yes" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-xs font-medium text-gray-900 mb-2">
                Have you worked on any product/project before? Tell us about it. *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Briefly describe your role, the product/project, and your contribution..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow resize-none"
              ></textarea>
            </div>
          )}
        </div>

        <div className="pt-8 flex flex-col items-center">
          <button
            type="submit"
            className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold py-4 px-10 rounded-xl transition-colors flex items-center justify-center space-x-2 w-full md:w-auto cursor-pointer"
          >
            <span>Start My Internship Journey</span>
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

function StepThree() {
  return (
    <div className="w-full max-w-4xl bg-white rounded-[24px] shadow-sm p-8 md:p-16 animate-in fade-in zoom-in duration-500 text-center mt-10">
      <div className="mx-auto w-20 h-20 bg-[#6024D0] rounded-full flex items-center justify-center mb-8">
        <Check size={40} className="text-white" strokeWidth={3} />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Your Application Has Been Received
      </h1>
      <p className="text-gray-600 mb-12">
        Thank you for applying to the ProductPointers Internship Program. Our
        team will review your application and reach out with the next steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
        {[
          {
            title: "Application Review",
            desc: "Our team will review your application closely.",
          },
          {
            title: "Email Notification",
            desc: "You'll receive an email on next steps.",
          },
          {
            title: "Payment Process",
            desc: "You'll be directed to proceed with the commitment fee.",
          },
          {
            title: "Selection Process",
            desc: "Final selection is based on commitment and availability.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-[#F3E8FF] rounded-lg flex items-center justify-center mb-4">
              <Check size={20} className="text-[#6024D0]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <Link
          href="/ppip"
          className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center space-x-2"
        >
          <span>Explore ProductPointers</span>
          <ChevronRight size={18} />
        </Link>
        <Link
          href="/"
          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-xl transition-colors"
        >
          Go to Home
        </Link>
      </div>

      <p className="text-xs text-gray-400">
        We review applications as soon as we receive them. Please look out for a
        response in your email.
      </p>
    </div>
  );
}
