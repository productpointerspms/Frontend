"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Send, ChevronDown } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import img from "@/assets/images/contact.png"

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };



  return (
    <div className={`${montserrat.className} min-h-screen bg-[#FDF2FF]`}>

      {/* Hero Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col items-start">
          {/* Top Badge */}
          <div className="border border-[#6024D0]/30 rounded-full px-4 py-1.5 mb-8 bg-[#FAE1FF]">
            <span className="text-[#6024D0] text-xs font-medium">We're Here To Help</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-[42px] font-extrabold text-black leading-[1.2] mb-8">
            Let's Help You Find <br /> Your Next Step
          </h1>

          {/* Description */}
          <p className="text-[#000000]/60 text-base md:text-lg max-w-lg mb-12 leading-relaxed">
            Whether you have questions about our programs, mentorship, internships, 
            or specialization tracks, the ProductPointers team is here to help
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={scrollToContact} className="bg-[#6024D0] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#4d1ba8] transition-all shadow-lg shadow-[#6024D0]/20 cursor-pointer">
              Send Us a Message <Send size={20} className="rotate-[-15deg]" />
            </button>
            <Link href="/#upcoming-programs" className="bg-white border border-black text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-center">
              Explore Programs
            </Link>
          </div>
        </div>

        {/* Hero Image Component */}
        <div className="relative">
          <div className="rounded-[40px] overflow-hidden shadow-2xl relative h-[500px]">
            <Image
              src={img}
              alt="ProductPointers Support Team" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;