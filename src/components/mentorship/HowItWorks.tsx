
import React from 'react';
import Image from 'next/image';

const steps = [
    {
        number: '01',
        title: 'Apply',
        description: 'Share your background, goals, and what you\'re looking for in a mentor',
    },
    {
        number: '02',
        title: 'Get access',
        description: 'You get access with a mentor whose experience aligns with your aspirations',
    },
    {
        number: '03',
        title: 'Start Sessions',
        description: 'Begin your journey with bi-weekly 1-on-1 sessions tailored to your needs',
    },
];

export default function HowItWorks() {
    return (
        <section className="relative w-full overflow-hidden py-24">
            {/* Background Image */}
            <Image
                src="/images/office-busy-bg.png"
                alt="Office Background"
                fill
                className="object-cover"
                priority
            />

            {/* Purple Overlay */}
            <div className="absolute inset-0 bg-[#6D28D9]/90 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[#6D28D9]/80" /> {/* Double layer for depth */}

            <div className="relative z-10 container mx-auto px-6">
                {/* Header */}
                <div className="mb-16 text-center text-white">
                    <h2 className="text-3xl font-extrabold md:text-4xl">How It Works</h2>
                    <p className="mt-4 text-base text-white/90 md:text-lg">
                        Getting started is simple and straightforward
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid gap-8 md:grid-cols-3">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="group relative flex flex-col items-start rounded-2xl bg-white p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
                        >
                            {/* Large Number */}
                            <span className="mb-4 text-5xl font-extrabold text-[#F3E8FF] transition-colors group-hover:text-[#E9D5FF]">
                                {step.number}
                            </span>

                            {/* Content */}
                            <h3 className="mb-3 text-lg font-bold text-gray-900">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
