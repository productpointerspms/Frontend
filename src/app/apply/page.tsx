"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ApplyPage() {
    const [step, setStep] = useState(1);

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    return (
        <div className="min-h-screen bg-[#FCF1FF] py-10 px-4 sm:px-6 lg:px-8 font-montserrat">
            <div className="max-w-3xl mx-auto">
                {/* Navigation */}
                <Link
                    href="/"
                    className="text-[#5C1CC5] hover:underline flex items-center text-xs font-medium mb-8 shrink-0"
                >
                    <span className="mr-2">&larr;</span> Return to Mentorship Page
                </Link>

                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                        Cohort 3 Application Form
                    </h1>
                    <div className="bg-[#EBD5FF] border border-[#D1B3FF] rounded-lg p-4 text-[#5C1CC5] text-xs font-medium inline-block w-full md:w-3/4 shadow-sm">
                        Please fill out this form carefully. After completing the assessment, you&#39;ll be redirected to the payment page.
                    </div>
                </div>

                {/* Main Form Container */}
                <div className="bg-white shadow-md rounded-xl p-6 md:p-10 mb-10 w-full mx-auto">
                    {step === 1 ? (
                        <StepOne onNext={handleNext} />
                    ) : (
                        <StepTwo onBack={handleBack} />
                    )}
                </div>
            </div>
        </div>
    );
}

function StepOne({ onNext }: { onNext: () => void }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#5C1CC5] text-white p-4 rounded-lg mb-8">
                <h2 className="text-base font-medium">PART 1: Personal Information</h2>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onNext();
                }}
                className="space-y-6"
            >
                {/* Full Name */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-md border border-purple-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#5C1CC5] transition-shadow placeholder-gray-400 text-xs"
                    />
                </div>

                {/* Email Address */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 rounded-md border border-purple-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#5C1CC5] transition-shadow placeholder-gray-400 text-xs"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Phone number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        required
                        placeholder="+234 XXX XXX XXXX"
                        className="w-full px-4 py-3 rounded-md border border-purple-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#5C1CC5] transition-shadow placeholder-gray-400 text-xs"
                    />
                </div>

                {/* LinkedIn Profile URL */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        LinkedIn Profile URL <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        required
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="w-full px-4 py-3 rounded-md border border-purple-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#5C1CC5] transition-shadow placeholder-gray-400 text-xs"
                    />
                </div>

                {/* Current Role / Job Title */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Current Role / Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="e.g., Product Manager, Product Designer"
                        className="w-full px-4 py-3 rounded-md border border-purple-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#5C1CC5] transition-shadow placeholder-gray-400 text-xs"
                    />
                </div>

                {/* Years of Experience */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-3">
                        Years of Experience in Product Management <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                        {["Less than 1 year", "1–2 years", "3–4 years", "5+ years"].map((exp) => (
                            <label key={exp} className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="experience"
                                    required
                                    value={exp}
                                    className="w-4 h-4 text-[#5C1CC5] border-gray-300 focus:ring-[#5C1CC5] cursor-pointer"
                                />
                                <span className="text-xs text-gray-700 group-hover:text-black">{exp}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Organization Type */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-3">
                        What type of organization do you currently work with? <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                        {["Startup", "Mid-size company", "Enterprise", "Freelancer / Consultant", "Unemployed"].map((org) => (
                            <label key={org} className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="organizationType"
                                    required
                                    value={org}
                                    className="w-4 h-4 text-[#5C1CC5] border-gray-300 focus:ring-[#5C1CC5] cursor-pointer"
                                />
                                <span className="text-xs text-gray-700 group-hover:text-black">{org}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Motivation */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Why do you want to join PPMP Cohort 3? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        required
                        rows={5}
                        placeholder="Share your motivations and what you hope to gain from this mentorship program..."
                        className="w-full px-4 py-3 rounded-md border border-purple-200 bg-[#FCF8FF] focus:outline-none focus:ring-2 focus:ring-[#5C1CC5] transition-shadow placeholder-gray-400 text-xs resize-none"
                    ></textarea>
                </div>

                {/* Specialization */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Which specialization are you most excited about? <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-gray-500 mb-3">Select one or more</p>
                    <div className="space-y-2">
                        {[
                            "AI & No-Code Tools for PMs",
                            "QA for Product Managers",
                            "Data-Driven Product Management",
                            "Technical Product Management",
                            "Growth Product Management",
                            "Stakeholder Management & Communication",
                            "Product Leadership & Ownership",
                        ].map((spec) => (
                            <label key={spec} className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="specialization"
                                    value={spec}
                                    className="w-4 h-4 text-[#5C1CC5] rounded border-gray-300 focus:ring-[#5C1CC5] cursor-pointer"
                                />
                                <span className="text-xs text-gray-700 group-hover:text-black">{spec}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#5C1CC5] hover:bg-[#4E17A6] text-white font-medium py-3 px-4 rounded-md transition-colors mt-8 cursor-pointer"
                >
                    Next
                </button>
            </form>
        </div>
    );
}

function StepTwo({ onBack }: { onBack: () => void }) {
    const questions = [
        {
            id: "q1",
            question: "1. What's the main goal of a Product Manager?",
            options: [
                "Build features",
                "Align teams and deliver customer & business value",
                "Manage developers",
                "Write design specs",
            ],
        },
        {
            id: "q2",
            question: "2. Which metric best measures user engagement?",
            options: ["Conversion Rate", "Daily Active Users", "Retention Rate", "Revenue"],
        },
        {
            id: "q3",
            question: "3. What's a Product Roadmap used for?",
            options: [
                "Prioritizing backlog tasks",
                "Visualizing product direction and strategic goals",
                "Tracking developer performance",
                "Listing user feedback",
            ],
        },
        {
            id: "q4",
            question: "4. Which framework helps prioritize features based on impact and effort?",
            options: ["SWOT", "MoSCoW", "RICE", "OKR"],
        },
        {
            id: "q5",
            question: "5. What's the role of a Product Manager during QA testing?",
            options: [
                "Write code",
                "Approve test cases",
                "Ensure features meet acceptance criteria",
                "Create bug reports",
            ],
        },
        {
            id: "q6",
            question: "6. What tool would you use to test an API as a Product Manager?",
            options: ["Figma", "Trello", "Postman", "Notion"],
        },
        {
            id: "q7",
            question: "7. What's the key difference between Growth PM and Core PM?",
            options: [
                "Growth PM focuses on acquisition, activation, and retention",
                "Growth PM manages developers",
                "Core PM only works with marketing",
                "No difference",
            ],
        },
        {
            id: "q8",
            question: "8. What's the first step in making data-driven decisions?",
            options: [
                "Gather stakeholder feedback",
                "Define success metrics",
                "Start testing features",
                "Build dashboards",
            ],
        },
        {
            id: "q9",
            question: "9. Which of these is not a stakeholder group for a Product Manager?",
            options: ["Designers", "Engineers", "Users", "Competitors"],
        },
        {
            id: "q10",
            question: "10. What should a PM do when there's a disagreement between stakeholders?",
            options: [
                "Escalate to leadership immediately",
                "Prioritize by who shouts the loudest",
                "Facilitate discussion and align on product goals",
                "Delay the project",
            ],
        },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-[#5C1CC5] text-white p-4 rounded-lg mb-8">
                <h2 className="text-base font-medium">PART 2: Product Management Assessment</h2>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    alert("Application submitted successfully!");
                    // Here we would actually submit the form data
                }}
                className="space-y-8"
            >
                {questions.map((q) => (
                    <div key={q.id}>
                        <label className="block text-xs font-medium text-gray-800 mb-3">
                            {q.question} <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            {q.options.map((opt) => (
                                <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name={q.id}
                                        required
                                        value={opt}
                                        className="w-4 h-4 text-[#5C1CC5] border-gray-300 focus:ring-[#5C1CC5] cursor-pointer"
                                    />
                                    <span className="text-xs text-gray-700 group-hover:text-black">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="pt-6 border-t border-gray-100 flex flex-col space-y-4">
                    <button
                        type="submit"
                        className="w-full bg-[#5C1CC5] text-white py-3 px-4 rounded-md hover:bg-[#4E17A6] transition-colors font-medium text-base cursor-pointer"
                    >
                        Submit Application
                    </button>

                    <button
                        type="button"
                        onClick={onBack}
                        className="w-full text-center text-[#5C1CC5] hover:underline font-medium text-xs py-2 cursor-pointer"
                    >
                        Go Back
                    </button>
                </div>
            </form>
        </div>
    );
}
