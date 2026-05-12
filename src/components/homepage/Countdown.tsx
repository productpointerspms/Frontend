import React, { useState, useEffect } from "react";
import { Info, ArrowRight } from "lucide-react";

const CountdownSection: React.FC = () => {
  // Static values based on "Countdown.png"
  const [timeLeft, setTimeLeft] = useState({
    days: "06",
    hours: "23",
    minutes: "39",
  });

  return (
    <section className="bg-[#2D3E8E] w-full py-20 px-6 flex flex-col items-center justify-center text-white font-sans">
      {/* Header Content */}
      <div className="max-w-4xl text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          Limited Cohort. <span className="text-[#A5B4FC]">Limited Slots</span>
        </h2>
        <p className="text-sm md:text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto">
          We keep our cohorts small to ensure every participant gets real
          mentorship, feedback, and hands-on guidance. Spots fill up quickly.
          Once they're gone, you'll have to wait for the next cohort.
        </p>
      </div>

      {/* Countdown Timer */}
      <div className="flex items-center gap-4 md:gap-8 mb-16">
        {/* Days */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-b from-[#1E3A8A] to-[#0A1D56] rounded-[32px] flex items-center justify-center shadow-2xl border border-white/10">
            <span className="text-4xl md:text-6xl font-bold">{timeLeft.days}</span>
          </div>
          <span className="text-sm md:text-lg font-medium opacity-90">Days</span>
        </div>

        {/* Separator */}
        <div className="flex flex-col gap-4 mb-8">
           <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
           <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-b from-[#1E3A8A] to-[#0A1D56] rounded-[32px] flex items-center justify-center shadow-2xl border border-white/10">
            <span className="text-4xl md:text-6xl font-bold">{timeLeft.hours}</span>
          </div>
          <span className="text-sm md:text-lg font-medium opacity-90">Hours</span>
        </div>

        {/* Separator */}
        <div className="flex flex-col gap-4 mb-8">
           <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
           <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-b from-[#1E3A8A] to-[#0A1D56] rounded-[32px] flex items-center justify-center shadow-2xl border border-white/10">
            <span className="text-4xl md:text-6xl font-bold">{timeLeft.minutes}</span>
          </div>
          <span className="text-sm md:text-lg font-medium opacity-90">Minutes</span>
        </div>
      </div>

      {/* CTA Button & Info */}
      <div className="flex flex-col items-center gap-4">
        <button className="bg-[#F5F3FF] text-[#581C87] px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-white transition-all shadow-lg active:scale-95 cursor-pointer">
          Apply for the Next Cohort
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 text-sm text-[#A5B4FC] font-medium">
          <Info className="w-4 h-4 text-orange-400" />
          <span>Applications closing soon</span>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;