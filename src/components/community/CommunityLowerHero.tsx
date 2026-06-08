"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import { ArrowRight } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function FinalCTA() {
  return (
    <section
      className={`${montserrat.className} bg-[#374492] py-24 px-6 md:px-12 flex flex-col items-center text-center`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-white text-2xl md:text-[35px] font-bold mb-6 leading-tight md:whitespace-nowrap">
          Your Product Management Journey Shouldn’t End Alone
        </h2>

        {/* Supporting Description */}
        <p className="text-white/90 text-base md:text-lg font-light mb-12 leading-relaxed max-w-3xl mx-auto">
          Join a long-term ecosystem of Product Managers committed to continuous 
          growth, accountability, mentorship, and meaningful progress long after 
          completing their programs.
        </p>

        {/* Dual Button CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button */}
          <button className="bg-white text-[#6024D0] px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:bg-white/90 transition-all text-sm md:text-base w-full sm:w-auto justify-center shadow-lg cursor-pointer">
            Join the Community
            <ArrowRight size={20} />
          </button>

          {/* Secondary Outline Button */}
          <button className="bg-transparent text-white border-2 border-white/40 px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all text-sm md:text-base w-full sm:w-auto justify-center cursor-pointer">
            Explore Programs
          </button>
        </div>
      </div>
    </section>
  );
}