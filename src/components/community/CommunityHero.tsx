"use client";

import React from 'react';
import { ChevronDown, ArrowRight, User } from 'lucide-react';
import heroImg from "@/assets/images/comm.png"

const CommunityHero = () => {
  const handleScrollToPath = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("path-to-community")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#FDF4FF] font-sans">

      {/* Hero Content */}
      <main className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="flex flex-col items-start">
          <div className="border border-[#D8B4FE] text-[#6024D0] px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            Alumni-Only Community
          </div>
          
          <h1 className="text-[#15010D] text-5xl md:text-7xl font-extrabold leading-tight mb-8">
            Growth Doesn't End <br />
            <span className="text-[#6024D0]">After The Program</span>
          </h1>
          
          <p className="text-[#15010D]/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            The ProductPointers Community is a private lifetime ecosystem designed to help alumni continue growing through accountability, networking, mentorship, resources, and consistent Product Management development.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full">
            <a href="#path-to-community" onClick={handleScrollToPath} className="bg-[#6024D0] text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 w-full sm:w-auto hover:gap-4 transition-all">
              Unlock Community Access <ArrowRight size={20} />
            </a>
            <button className="border border-[#15010D] text-[#15010D] px-10 py-5 rounded-2xl font-bold w-full sm:w-auto hover:bg-white transition-all cursor-pointer">
              Explore Programs
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Alumni" />
                </div>
              ))}
            </div>
            <p className="text-[#15010D]/60 text-sm">
              Join ProductPointers alumni growing together long after completing their programs.
            </p>
          </div>
        </div>

        {/* Right Column (Image and Badges) */}
        <div className="relative">
          <div className="rounded-[40px] overflow-hidden shadow-2xl">
            <img 
              src={heroImg.src}
              alt="Community working together" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Badge 1: 1:1 Mentorship */}
          <div className="absolute top-10 -right-8 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-4 flex items-center gap-3 animate-bounce-slow">
            <div className="bg-purple-100 p-2 rounded-full text-[#6024D0]">
              <User size={20} />
            </div>
            <div>
              <p className="font-bold text-[#15010D] text-sm">1:1 Mentorship</p>
              <p className="text-[#15010D]/60 text-[10px]">Senior PM guidance</p>
            </div>
          </div>

          {/* Badge 2: Weekly Accountability */}
          <div className="absolute bottom-20 -left-12 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-4 flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full text-[#6024D0]">
              <User size={20} />
            </div>
            <div>
              <p className="font-bold text-[#15010D] text-sm">Weekly Accountability</p>
              <p className="text-[#15010D]/60 text-[10px]">Groups meet every Week</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityHero;