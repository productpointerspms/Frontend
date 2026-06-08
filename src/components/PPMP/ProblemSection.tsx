"use client";

import React from 'react';
import { XCircle } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function ProblemSection() {
  const painPoints = [
    "You're doing a lot... but not growing fast",
    "You're not seen as an expert in anything",
    "You're struggling to stand out in opportunities"
  ];

  return (
    <section className={`${montserrat.className} bg-[#FDF2FF] py-24 px-6 md:px-20 border-t border-purple-100/40`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
        
        {/* Left Column - Core Messaging and List Grid */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Section Header */}
          <h2 className="text-2xl md:text-[39px] font-extrabold text-[#101828] mb-6 leading-tight text-left tracking-tight">
            At Some Point, Being <span className="text-[#6024D0] italic font-serif font-normal">"Just A Product Manager"</span> Stops Being Enough.
          </h2>
          
          <p className="text-[#475467] text-base font-semibold mb-8 uppercase tracking-wider">
            You start to notice:
          </p>
          
          {/* Card Based Pain Points Layout */}
          <div className="space-y-4 mb-10 w-full max-w-2xl">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 bg-white px-6 py-5 rounded-2xl border border-[#E9D7FE]/60 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#6024D0]/30"
              >
                <XCircle className="text-[#F04438] flex-shrink-0" size={24} strokeWidth={2.5} />
                <span className="text-[#101828] font-bold text-sm md:text-base text-left">
                  {point}
                </span>
              </div>
            ))}
          </div>
          
          {/* Structural Emotional Pivot Subtext */}
          <div className="pt-6 border-t-2 border-[#E9D7FE]/50 w-full max-w-2xl">
            <p className="text-xl md:text-2xl font-extrabold text-[#6024D0] italic leading-snug text-left tracking-tight">
              You Feel Replaceable <br />
              <span className="text-[#101828] not-italic font-bold text-lg md:text-xl">And That’s The Real Problem.</span>
            </p>
          </div>
        </div>
        
        {/* Right Column - Hero Styled Contextual Image container */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-[460px] h-[520px] rounded-[40px] overflow-hidden shadow-xl border-4 border-white bg-[#EAECF0] relative group">
            <img 
              src="/images/frustrated-pm-professional.jpg" 
              alt="Stressed and deep in thought professional manager looking out" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft Overlay protection mask to blend with theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#6024D0]/10 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}