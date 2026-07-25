"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import user1 from "@/assets/images/eniola.png";
import user2 from "@/assets/images/mercy.png";
import user3 from "@/assets/images/udochukwu.png";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] w-full bg-[#FCF1FF] flex items-center justify-center pt-10 pb-20 overflow-hidden font-montserrat">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center text-center md:items-center md:text-center">

        {/* Top Badge */}
        <span className="inline-block border border-[#D1B3FF] bg-[#FAE1FF] text-[#9747FF] text-[7px] min-[375px]:text-[8px] sm:text-[9px] md:text-xs font-medium px-3 min-[375px]:px-4 md:px-6 py-1.5 md:py-2 rounded-full mb-8 tracking-wide uppercase whitespace-nowrap sm:whitespace-normal text-center self-center md:self-auto">
          FOR ASPIRING AND ENTRY-LEVEL PRODUCT MANAGERS
        </span>

        {/* Main Heading */}
        <h1 className="text-[#1A1A1A] font-extrabold text-[24px] sm:text-2xl md:text-[28px] lg:text-[34px] xl:text-[40px] leading-[1.2] mb-10 tracking-tight text-center md:text-center">
          <span className="block md:whitespace-nowrap">Become a Skilled, <span className="whitespace-nowrap">Confident and Job-Ready</span></span>
          <span className="block">Product Manager</span>
        </h1>

        {/* Subheadings */}
        <div className="space-y-6 mb-12 w-full flex flex-col items-center md:items-center">
          <p className="text-gray-600 font-semibold text-sm md:text-[16px] max-w-xl mx-2 sm:mx-auto text-center md:text-center">
           We help you build the skills, gain hands-on experience, and create the proof of work you need to <span className="font-bold text-[#6024D0] italic">stand out</span> in the Product Management job market.
          </p>

          <p className="text-gray-500 font-medium text-sm md:text-[16px] leading-relaxed max-w-xl mx-2 sm:mx-auto text-center md:text-center">
            Whether you're transitioning into Product Management or lack practical experience, our programs give you a clear path to your first opportunity, our programs give you a clear path from learning the fundamentals to building the experience and proof of work to move forward.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 self-center items-center w-full sm:w-auto">
          <a
            href="#upcoming-programs"
            className="bg-[#6024D0] hover:bg-[#4F1AB0] text-white font-medium text-sm px-8 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto min-w-[220px] cursor-pointer"
          >
            Apply Now <ArrowRight size={20} />
          </a>
          <a
            href="#explore-programs"
            className="border border-gray-400 bg-transparent hover:bg-white text-[#1A1A1A] font-medium text-sm px-8 py-3.5 rounded-2xl transition-all w-full sm:w-auto min-w-[220px] cursor-pointer flex items-center justify-center"
          >
            Explore Programs
          </a>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-4 self-center w-full sm:w-auto">
          <div className="flex -space-x-3">
            {[user1, user3, user2].map((userImg, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-[3px] border-[#FCF1FF] overflow-hidden bg-gray-200 shadow-sm">
                <img src={userImg.src} alt={`User ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs font-medium">
            300+ PMs Mentored Across Africa
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;