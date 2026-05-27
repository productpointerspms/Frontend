'use client';

import Image from 'next/image';
import img from "@/assets/images/mentor.jpg"

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <Image
                src={img}
                alt="Mentorship Program"
                fill
                priority
                className="object-cover"
            />

            {/* Purple Overlay */}
            <div className="absolute inset-0 bg-[#5c2d91]/60" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center px-6">
                <div className="max-w-4xl text-center text-white">

                    {/* Pill */}
                    <div className="mb-6 flex justify-center">
                        <span className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium backdrop-blur">
                            Level Up With Expert Guidance
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="font-[Montserrat] text-[24px] font-bold leading-tight text-white sm:text-[36px] md:text-[48px] lg:text-[54px]">
    ProductPointers Mentorship Program <span className="font-extrabold">(PPMP)</span>
</h1>

                    {/* Subtext */}
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
                        For entry and mid-level PMs who feel stuck and want to advance their career
                    </p>

                    {/* CTA */}
                    <div className="mt-10">
                        <button className="rounded-lg bg-[#6D28D9] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#5b21b6] cursor-pointer">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="pointer-events-none absolute bottom-0 h-40 w-full bg-gradient-to-t from-black/40 to-transparent" />
        </section>
    );
}
