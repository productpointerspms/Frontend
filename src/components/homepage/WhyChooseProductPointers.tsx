import Image from "next/image";
import { ArrowRight } from "lucide-react";
import React from "react";

// Replace with your actual asset paths
import imgMentorship from "@/assets/images/diff1.png";
import imgBuilding from "@/assets/images/diff2.png";
import imgInternship from "@/assets/images/diff3.png";
import imgCareer from "@/assets/images/diff4.png";

const WhyChooseProductPointers = () => {
  const cards = [
    {
      image: imgCareer,
      title: "Structured Mentorship",
      description: "Get guided by experienced product professionals who show you exactly what to do step by step.",
    },
    {
      image: imgMentorship,
      title: "Hands-On Product Building",
      description: "Stop learning passively. Start building real products you can actually show.",
    },
    {
      image: imgBuilding,
      title: "Internship Experience",
      description: "Gain real-world experience working on actual product problems not just case studies.",
    },
    {
      image:imgInternship,
      title: "Career Readiness Support",
      description: "Get prepared to apply, interview, and stand out with confidence.",
    },
  ];

  return (
    <section className="w-full px-5 py-16 md:py-24 bg-[#FCF1FF]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mb-12 md:mb-16">
          <h3 className="text-[#1A1A1A] font-semibold text-base sm:text-lg md:text-2xl mb-2">
            We Don’t Just Teach Product Management...
          </h3>
          <h2 className="text-[#1A1A1A] font-extrabold text-[1.1rem] min-[375px]:text-xl sm:text-3xl md:text-[28px] mb-6 leading-tight whitespace-nowrap sm:whitespace-normal">
            We Guide You Through Becoming One
          </h2>
          <div className="text-gray-500 font-medium text-sm sm:text-base md:text-[18px] flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>Everything you need to go from confused and stuck</span>
            <ArrowRight className="text-[#5C1CC5] w-4 h-4 md:w-5 md:h-5 inline" /> 
            <span>confident and job-ready</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12 md:mb-16">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="group bg-white p-4 rounded-[24px] shadow-sm flex flex-col items-start transition-all hover:shadow-md hover:-translate-y-1"
            >
              {/* Image Container - Aspect ratio controlled for mobile */}
              <div className="relative w-full aspect-[4/3] sm:h-48 mb-6 overflow-hidden rounded-[18px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Text Content */}
              <div className="px-1 w-full">
                <h4 className="text-[#1A1A1A] font-bold text-sm md:text-[15px] mb-2">
                  {card.title}
                </h4>
                <p className="text-gray-500 text-sm md:text-[14px] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button - Full width on mobile, auto on desktop */}
        <button className="w-full sm:w-auto bg-[#5C1CC5] hover:bg-[#4a15a0] text-white md:text-[14px] font-semibold py-4 px-10 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-200 cursor-pointer">
          See How the Program Works
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default WhyChooseProductPointers;