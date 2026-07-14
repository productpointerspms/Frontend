import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import eniolaImg from "@/assets/images/eniola.png";
import udochukwuImg from "@/assets/images/udochukwu.png";
import mercyImg from "@/assets/images/mercy.png";

const HeroSection = () => {
  const avatars = [eniolaImg, udochukwuImg, mercyImg];

  return (
    <section className="bg-[#FCF1FF] py-15 px-6 md:px-12 flex flex-col items-center justify-center text-center min-h-[80vh]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="inline-block bg-[#FAE1FF] px-4 py-1.5 border border-[#a855f7] bg-transparent text-[#a855f7] rounded-full text-xs font-medium mb-8">
          Beginner-Friendly Program
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#1a1a1a] leading-[1.15] mb-6">
          Confused About Where To Start In <br className="hidden md:block" />
          Product Management?
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-sm md:text-base mb-10 max-w-3xl leading-relaxed">
          The ProductPointers Accelerator Program (PPAP) helps you go from zero knowledge to thinking like a Product Manager 
          with structure, mentorship, and hands-on learning.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14 w-full sm:w-auto justify-center">
          <Link href="/ppap/apply" className="bg-[#5B21B6] text-white px-8 py-4 rounded-xl font-medium hover:bg-purple-800 transition-colors flex items-center justify-center gap-2 text-base cursor-pointer">
            Join the Next Cohort <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="bg-transparent text-[#1a1a1a] border border-gray-400 px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors text-base cursor-pointer">
            Download Brochure
          </button>
        </div>

        {/* Social Proof */}
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
          <p className="text-[13px] font-medium text-gray-600">
            Join <span className="font-bold text-[#1a1a1a]">300+</span> aspiring Product Managers who started here
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
