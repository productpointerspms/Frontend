
import React from 'react';
import { Check } from 'lucide-react';

export default function Commitment() {
    const benefits = [
        "Weekly 1-on-1 mentorship with personalized guidance",
        "Clear career roadmap tailored to your goals",
        "Real-time feedback and portfolio reviews",
        "Access to a supportive PM community",
        "Continued support even after sessions"
    ];

    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-extrabold text-[#1A0A1E] md:text-5xl">
                        Commitment
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-[#4A3A4F] md:text-lg">
                        A small price for transformative career guidance
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="mx-auto max-w-lg rounded-3xl bg-[#FEF4FF] p-8 shadow-xl md:p-12">

                    {/* Price */}
                    <div className="mb-10 text-center">
                        <span className="text-6xl font-extrabold text-[#1A0A1E]">
                            ₦ 70,000
                        </span>
                    </div>

                    {/* Benefits List */}
                    <ul className="mb-10 space-y-5">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-4">
                                <div className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full">
                                    <Check className="h-6 w-6 text-[#6D28D9] stroke-[3]" />
                                </div>
                                <span className="text-lg text-[#3A2A3F]">{benefit}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <button className="w-full rounded-xl bg-[#6D28D9] py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#5b21b6] cursor-pointer">
                        Join the Mentorship
                    </button>

                    {/* Footnote */}
                    <p className="mt-6 text-center text-xs text-[#5A4A5F]">
                        Join the next cohort today, only 10 mentees accepted per cohort.
                    </p>

                </div>

            </div>
        </section>
    );
}
