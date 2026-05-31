"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import user1 from "@/assets/images/eniola.png";
import user2 from "@/assets/images/mercy.png";
import user3 from "@/assets/images/udochukwu.png";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] w-full bg-[#FCF1FF] flex items-center justify-center pt-10 pb-20 overflow-hidden font-montserrat">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col items-start md:items-center text-left md:text-center">
        
        {/* Top Badge */}
        <span className="inline-block border border-[#D1B3FF] bg-transparent text-[#9747FF] text-[8px] min-[375px]:text-[9px] sm:text-[10px] md:text-xs font-medium px-3 min-[375px]:px-4 md:px-6 py-1.5 md:py-2 rounded-full mb-8 tracking-wide uppercase whitespace-nowrap sm:whitespace-normal">
          FOR ASPIRING PRODUCT MANAGERS WHO FEEL STUCK AFTER LEARNING
        </span>
        
        {/* Main Heading */}
        <h1 className="text-[#1A1A1A] font-extrabold text-3xl sm:text-4xl md:text-[38px] lg:text-[46px] xl:text-[54px] leading-[1.2] mb-10 tracking-tight">
          <span className="block md:whitespace-nowrap">Become A Confident Product Manager</span>
          <span className="block">In 12 Weeks</span>
        </h1>

        {/* Subheadings */}
        <div className="space-y-6 mb-12 w-full flex flex-col items-start md:items-center">
          <p className="text-gray-600 font-semibold text-base md:text-[18px] px-2 text-left md:text-center lg:whitespace-nowrap">
            Gain Real-World Experience, Build Visibility & Become Job-Ready Through Mentorship and Hands-On Learning.
          </p>
          
          <p className="text-gray-500 font-medium text-base md:text-[18px] leading-relaxed px-2 text-left md:text-center flex flex-col items-start md:items-center">
            <span className="lg:whitespace-nowrap">Whether you're transitioning into Product Management, struggling after a PM course, or trying to gain practical experience,</span>
            <span className="lg:whitespace-nowrap">ProductPointers helps you move from confusion to execution with structured programs designed for real growth.</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 self-center items-center w-full sm:w-auto">
          <button className="bg-[#6024D0] hover:bg-[#4F1AB0] text-white font-medium text-base px-8 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto min-w-[220px] cursor-pointer">
            Apply to a Program <ArrowRight size={20} />
          </button>
          <button className="border border-gray-400 bg-transparent hover:bg-white text-[#1A1A1A] font-medium text-base px-8 py-3.5 rounded-2xl transition-all w-full sm:w-auto min-w-[220px] cursor-pointer">
            Start Your Product Journey
          </button>
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
          <p className="text-gray-500 text-sm font-medium">
            300+ PMs Mentored Across Africa
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;