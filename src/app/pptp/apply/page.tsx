"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";

export default function PPTPApplyPage() {
    const [step, setStep] = useState(1);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    return (
        <div className="min-h-screen bg-[#333333] flex justify-center items-center font-montserrat">
            {/* The background in the screenshots appears to be a dark gray overlay or the page itself is light. 
                I'll use a neutral background container for the multi-step form to match the "modal/card" feel of Step 1 and 3,
                but Step 2 looks like a full page. I will wrap it such that it looks right. 
                Actually, looking at the images, they are laid out on a dark `#333333` canvas. 
                This means the dark background is just the figma canvas. The actual pages are white/light-purple.
                I will use a light background for the whole page. */}
            
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
                    PPTP Tracks
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Before You Apply...
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    The ProductPointers Track Program (PPTP) is designed for Product Managers who want to specialize, grow and stand out.
                </p>
            </div>

            <div className="mb-10">
                <p className="font-medium text-gray-900 mb-4">Choose your track and program in the application form:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "AI Product Management & No-code",
                        "API Product Management",
                        "QA testing tools and best practices for product",
                        "Technical Product Management",
                        "Growth Product Management"
                    ].map((track, i) => (
                        <div key={i} className="flex items-center space-x-3 bg-[#FCF8FF] border border-[#F3E8FF] p-4 rounded-xl">
                            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#F3E8FF] text-[#6024D0]">
                                <Check size={18} strokeWidth={3} />
                            </div>
                            <span className="text-gray-700 font-medium text-xs md:text-sm">{track}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-10">
                <p className="font-medium text-gray-900 mb-4">Checklist:</p>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <CheckCircle2 size={20} className="text-[#10B981]" />
                        <span className="text-gray-600">You are ready to be an Advanced Product PM</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <CheckCircle2 size={20} className="text-[#10B981]" />
                        <span className="text-gray-600">You have to build your PM Portfolio</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <CheckCircle2 size={20} className="text-[#10B981]" />
                        <span className="text-gray-600">You are willing and actively ready to learn new things</span>
                    </div>
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
                href="/pptp"
                className="inline-flex items-center text-[#6024D0] hover:underline font-medium mb-8 text-xs"
            >
                &larr; Back to PPTP | Specialization
            </Link>

            <div className="text-center mb-10">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    PPTP Application Form
                </h1>
                <div className="bg-[#F3E8FF] border border-[#E9D7FE] rounded-xl p-5 text-[#6024D0] text-xs md:text-sm font-medium inline-block w-full">
                    Please complete this form. After completing the application form, you will be redirected to the payment page. Please click on proceed.
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
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow"
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
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow"
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
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow"
                        />
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Application</h2>

                    <div>
                        <label className="block text-xs font-medium text-gray-900 mb-3">
                            What Specialization you want to experience *
                        </label>
                        <div className="space-y-3">
                            {[
                                "AI product Mgt / No code",
                                "QA testing tools and best practices",
                                "Product / API Strategy and Management",
                                "Growth product management"
                            ].map((spec) => (
                                <label key={spec} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="specialization"
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
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Experience</h2>

                    <div>
                        <label className="block text-xs font-medium text-gray-900 mb-3">
                            Are you currently working in a product related role? *
                        </label>
                        <div className="space-y-3">
                            {["Yes", "No"].map((ans) => (
                                <label key={ans} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="currentlyWorking"
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
                            What is your biggest challenge as a Product Manager right now? *
                        </label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Type in your answer..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-900 mb-2">
                            What do you want to achieve from this special track program? *
                        </label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Type in your answer..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FCF8FF] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6024D0] transition-shadow resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Commitment</h2>

                    <div>
                        <label className="block text-xs font-medium text-gray-900 mb-3">
                            The special track cohort participation will require a commitment fee. Are you ready to commit? *
                        </label>
                        <div className="space-y-3">
                            {["Yes", "I am ready"].map((ans) => (
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
                </div>

                <div className="pt-8 flex flex-col items-center">
                    <button
                        type="submit"
                        className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold py-4 px-10 rounded-xl transition-colors flex items-center justify-center space-x-2 w-full md:w-auto"
                    >
                        <span>Submit my application now</span>
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
                Thank you for applying to the ProductPointers Track Program.
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
                    href="/pptp"
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
