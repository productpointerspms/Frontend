"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function HeroSection() {
  return (
    <section className={`${montserrat.className} bg-[#FDF2FF] min-h-screen flex items-center px-6 py-16 md:px-20 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Column - Content */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Tagline Badge */}
          <span className="inline-block bg-[#F4EBFF] text-[#6024D0] px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-6 border border-[#E9D7FE] tracking-wide">
            Advanced PM Specialization
          </span>
          
          {/* Main Typography Header */}
          <h1 className="text-4xl md:text-[56px] lg:text-[62px] font-extrabold text-[#101828] leading-[1.1] mb-6 tracking-tight text-left">
            You’re Already A Product Manager... <br />
            <span className="text-[#6024D0]">But You’re Still Not Standing Out</span>
          </h1>
          
          {/* Description Block */}
          <p className="text-[#475467] text-lg md:text-xl mb-10 max-w-2xl text-left leading-relaxed font-normal">
            The ProductPointers Track Program (PPTP) helps you specialize, deepen your expertise, and position yourself as a high-impact Product Manager in a competitive market.
          </p>
          
          {/* Dynamic Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
            <button className="bg-[#6024D0] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#4d1ba8] transition-all duration-300 shadow-md">
              Apply for the Next Cohort 
              <ChevronRight size={20} />
            </button>
            <button className="bg-white border-2 border-[#101828] text-[#101828] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300">
              Choose Your Specialization
            </button>
          </div>
          
          {/* Social Proof Indicator */}
          <div className="flex items-center gap-4 border-t border-purple-100/60 pt-6 w-full">
            <div className="flex -space-x-3 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full border-2 border-white bg-cover bg-center shadow-sm"
                  style={{ backgroundImage: `url('/images/alumni-${i}.jpg')`, backgroundColor: '#E4E7EC' }}
                />
              ))}
            </div>
            <p className="text-sm md:text-base text-[#475467] text-left font-medium">
              Join ambitious Product Managers standing out through ProductPointers.
            </p>
          </div>
        </div>

        {/* Right Column - Visual Graphic Asset Layout */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end w-full">
          <div className="w-full max-w-[460px] h-[460px] md:h-[500px] bg-[#6024D0] rounded-[48px] flex items-center justify-center text-white text-[72px] font-black tracking-tighter shadow-2xl relative group overflow-hidden">
            <span className="relative z-10 drop-shadow-md">PPTP</span>
            {/* Subtle design accents to mimic geometric assets */}
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-purple-400/20 rounded-full blur-xl" />
          </div>
        </div>

      </div>
    </section>
  );
}