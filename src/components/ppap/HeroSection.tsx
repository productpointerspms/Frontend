import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image'; 

import eniolaImg from "@/assets/images/eniola.png";
import udochukwuImg from "@/assets/images/udochukwu.png";
import mercyImg from "@/assets/images/mercy.png";

const HeroSection = () => {
  const avatars = [eniolaImg, udochukwuImg, mercyImg];

  return (
    <section className="bg-[#FAF5FF] py-20 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12 min-h-[80vh]">
      <div className="max-w-2xl flex-1">
        <div className="inline-block px-4 py-1.5 border border-[#a855f7] bg-transparent text-[#a855f7] rounded-full text-xs font-medium mb-6">
          Beginner-Friendly Program
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] leading-[1.1] mb-6">
          Confused About Where To Start In Product Management?
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
          The ProductPointers Accelerator Program (PPAP) helps you go from zero knowledge to thinking like a Product Manager with structure, mentorship, and hands-on learning.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <button className="bg-[#5B21B6] text-white px-8 py-4 rounded-xl font-medium hover:bg-purple-800 transition-colors flex items-center justify-center gap-2 text-lg">
            Join the Next Cohort <ArrowRight className="w-5 h-5" />
          </button>
          <button className="bg-transparent text-[#1a1a1a] border border-gray-400 px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors text-lg">
            See Program Breakdown
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {avatars.map((avatar, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FAF5FF] bg-gray-300 overflow-hidden relative shadow-sm">
                <img 
                  src={avatar.src} 
                  alt={`Student ${i + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-[15px] font-medium text-gray-600">
            Join <span className="font-bold text-[#1a1a1a]">300+</span> aspiring Product Managers who started here
          </p>
        </div>
      </div>

      <div className="flex-1 w-full flex justify-center lg:justify-end">
        <div className="relative w-full max-w-md aspect-square flex flex-col items-center justify-center">
          {/* PPAP Graphic using Tailwind */}
          <div className="relative z-10 flex flex-col items-center transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
            {/* Top "PP" */}
            <div className="bg-[#6D28D9] p-2 rounded-2xl shadow-xl z-20 mb-[-1.5rem]">
              <div className="bg-[#FAF5FF] rounded-xl px-6 py-2 flex gap-2">
                 <span className="text-7xl lg:text-9xl font-black text-[#6D28D9] tracking-tighter" style={{ WebkitTextStroke: '2px #6D28D9' }}>P</span>
                 <span className="text-7xl lg:text-9xl font-black text-[#6D28D9] tracking-tighter" style={{ WebkitTextStroke: '2px #6D28D9' }}>P</span>
              </div>
            </div>
            
            {/* Bottom "AP" */}
            <div className="bg-[#6D28D9] p-2 rounded-2xl shadow-xl z-10 w-[110%] flex justify-center ml-4">
              <div className="bg-[#FAF5FF] rounded-xl px-8 py-3 flex gap-2 w-full justify-center">
                 <span className="text-7xl lg:text-9xl font-black text-[#6D28D9] tracking-tighter" style={{ WebkitTextStroke: '2px #6D28D9' }}>A</span>
                 <span className="text-7xl lg:text-9xl font-black text-[#6D28D9] tracking-tighter" style={{ WebkitTextStroke: '2px #6D28D9' }}>P</span>
              </div>
            </div>

            {/* "FOUNDATION" Badge */}
            <div className="relative z-30 mt-[-1.5rem] ml-2">
              <div className="absolute inset-0 bg-[#FACC15] rounded-full transform translate-y-2 translate-x-1"></div>
              <div className="relative bg-[#EF4444] text-white px-8 py-3 rounded-full font-black text-xl lg:text-3xl tracking-wide transform -rotate-2 border-2 border-white shadow-lg">
                FOUNDATION
              </div>
            </div>
          </div>
          
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[#6D28D9] opacity-10 blur-[80px] rounded-full z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
