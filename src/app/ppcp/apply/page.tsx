"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";

export default function PPCPApplyPage() {
    const [step, setStep] = useState(1);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    return (
        <div className="min-h-screen bg-[#333333] flex justify-center items-center font-montserrat">
            <div className="min-h-screen w-full bg-[#FCF8FF] py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                {step === 1 && <StepOne onNext={handleNext} />}
                {step === 2 && <StepTwo onNext={handleNext} onBack={handleBack} />}
                {step === 3 && <StepThree />}
            </div>
        </div>
    );
}

function StepOne({ onNext }: { onNext: () => void }) {
    return (
        <div className="w-full max-w-4xl bg-white rounded-[24px] shadow-sm p-8 md:p-12 animate-in fade-in zoom-in duration-500 mt-10">
            <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#F3E8FF] text-[#6024D0] font-semibold text-xs mb-6">
                    PPCP Coaching
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Before You Apply...
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    This is a 1:1 high-impact coaching program designed for individuals who want personalized guidance, faster growth, and real results in Product Management.
                </p>
            </div>

            <div className="mb-10">
                <p className="font-medium text-gray-900 mb-4">What to Expect:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "1-on-1 strategy sessions",
                        "Tailored action plans",
                        "Accountability & continuous feedback",
                        "Access to PM resources and templates"
                    ].map((expectation, i) => (
                        <div key={i} className="flex items-center space-x-3 bg-[#FCF8FF] border border-[#F3E8FF] p-4 rounded-xl">
                            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#F3E8FF] text-[#6024D0]">
                                <Check size={18} strokeWidth={3} />
                            </div>
                            <span className="text-gray-700 font-medium text-xs md:text-sm">{expectation}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-10">
                <p className="font-medium text-gray-900 mb-4">PPCP is for you if:</p>
                <div className="space-y-3">
                    {[
                        "You need 1-on-1 guidance",
                        "You're looking for accountability",
                        "You want to fast-track your PM growth",
                        "You are preparing for PM interviews"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center space-x-3">
                            <CheckCircle2 size={20} className="text-[#10B981]" />
                            <span className="text-gray-600">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <button
                    onClick={onNext}
                    className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold py-4 px-10 rounded-xl transition-colors flex items-center space-x-2"
                >
                    <span>I'm Ready To Apply</span>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}

function StepTwo({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    return (
        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-right-8 duration-500">
            <Link
                href="/ppcp"
                className="inline-flex items-center text-[#6024D0] hover:underline font-medium mb-8 text-xs"
            >
                &larr; Back to PPCP | Coaching
            </Link>

            <div className="text-center mb-10">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    PPCP Application Form
                </h1>
                <div className="bg-[#F3E8FF] border border-[#E9D7FE] rounded-xl p-5 text-[#6024D0] text-xs md:text-sm font-medium inline-block w-full">
                    We need to know a little bit about you to ensure we can support you best. All information provided will be kept strictly confidential.
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onNext();
                }}
                className="bg-white shadow-sm rounded-2xl p-6 md:p-10 space-y-8"
            >
                <div className="space-y-6">
                    <h2 className="text-base font-semibold text-gray-900 border-b pb-2">Profile</h2>
                    
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

                <div className="space-y-6 pt-6 border-t">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Background</h2>

                    <div>
                        <label className="block text-xs font-medium text-gray-900 mb-3">
                            What best describes your current situation? *
                        </label>
                        <div className="space-y-3">
                            {[
                                "Transitioning into Product Management",
                                "Junior / Mid-level PM looking to level up",
                                "Senior PM preparing for leadership",
                                "Founder looking to improve product strategy",
                                "Other"
                            ].map((spec) => (
                                <label key={spec} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="currentSituation"
                                        required
                                        value={spec}
                                        className="w-4 h-4 text-[#6024D0] border-gray-300 focus:ring-[#6024D0] cursor-pointer"
                                    />
                                    <span className="text-xs text-gray-700 group-hover:text-black">{spec}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Goals & Challenges</h2>

                    <div>
                        <label className="block text-xs font-medium text-gray-900 mb-3">
                            What is your primary coaching goal? *
                        </label>
                        <div className="space-y-3">
                            {[
                                "Land a PM job (Resume / Interview prep)",
                                "Level up in my current PM role",
                                "Build a product portfolio",
                                "Overcome a specific challenge",
                                "Other"
                            ].map((ans) => (
                                <label key={ans} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="primaryGoal"
                                        required
                                        value={ans}
                                        className="w-4 h-4 text-[#6024D0] border-gray-300 focus:ring-[#6024D0] cursor-pointer"
                                    />
                                    <span className="text-xs text-gray-700 group-hover:text-black">{ans}</span>
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
                            What do you specifically hope to get out of this coaching? *
                        </label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Type in your answer..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Commitment & Logistics</h2>

                    <div>
                        <label className="block text-xs font-medium text-gray-900 mb-3">
                            This program requires active participation, dedication, and accountability. Are you ready to commit to this? *
                        </label>
                        <div className="space-y-3">
                            {["Yes, I am fully ready", "I am ready but have questions", "Not sure yet"].map((ans) => (
                                <label key={ans} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="commitment"
                                        required
                                        value={ans}
                                        className="w-4 h-4 text-[#6024D0] border-gray-300 focus:ring-[#6024D0] cursor-pointer"
                                    />
                                    <span className="text-xs text-gray-700 group-hover:text-black">{ans}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-900 mb-3">
                            What coaching format are you interested in? *
                        </label>
                        <div className="space-y-3">
                            {["1 Month (Fast-track Guidance & Planning)", "3 Months (Deep Dive & Transformation)", "Not sure yet"].map((ans) => (
                                <label key={ans} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="coachingFormat"
                                        required
                                        value={ans}
                                        className="w-4 h-4 text-[#6024D0] border-gray-300 focus:ring-[#6024D0] cursor-pointer"
                                    />
                                    <span className="text-xs text-gray-700 group-hover:text-black">{ans}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-900 mb-3">
                            When are you looking to start? *
                        </label>
                        <div className="space-y-3">
                            {["Immediately", "Within 1 month", "More than 1 month away"].map((ans) => (
                                <label key={ans} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="startDate"
                                        required
                                        value={ans}
                                        className="w-4 h-4 text-[#6024D0] border-gray-300 focus:ring-[#6024D0] cursor-pointer"
                                    />
                                    <span className="text-xs text-gray-700 group-hover:text-black">{ans}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col items-center">
                    <button
                        type="submit"
                        className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold py-4 px-10 rounded-xl transition-colors flex items-center justify-center space-x-2 w-full md:w-auto"
                    >
                        <span>Submit my Application Form</span>
                        <ArrowRight size={20} />
                    </button>
                    
                    <button
                        type="button"
                        onClick={onBack}
                        className="mt-6 text-xs text-gray-500 hover:text-gray-900 transition-colors"
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
                Thank you for your interest in the ProductPointers 1:1 Coaching Program.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
                <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-[#F3E8FF] rounded-lg flex items-center justify-center mb-4">
                        <Check size={20} className="text-[#6024D0]" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Application Review</h3>
                    <p className="text-xs text-gray-500">Our team will review your application closely.</p>
                </div>
                
                <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-[#F3E8FF] rounded-lg flex items-center justify-center mb-4">
                        <Check size={20} className="text-[#6024D0]" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Email Notification</h3>
                    <p className="text-xs text-gray-500">You'll receive an email on next steps.</p>
                </div>

                <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-[#F3E8FF] rounded-lg flex items-center justify-center mb-4">
                        <Check size={20} className="text-[#6024D0]" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Payment Process</h3>
                    <p className="text-xs text-gray-500">You'll be directed to proceed with payment.</p>
                </div>

                <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-[#F3E8FF] rounded-lg flex items-center justify-center mb-4">
                        <Check size={20} className="text-[#6024D0]" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Selection Process</h3>
                    <p className="text-xs text-gray-500">Final selection is based on commitment and availability.</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <Link
                    href="/ppcp"
                    className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center space-x-2"
                >
                    <span>Explore Product Pointers</span>
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
                We review applications as soon as we receive them. Please look out for a response in your email.
            </p>
        </div>
    );
}
