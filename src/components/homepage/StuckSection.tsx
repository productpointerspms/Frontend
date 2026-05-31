"use client";

import React from 'react';
import { User, Briefcase, Bot, ImageOff } from 'lucide-react';
import img1 from "@/assets/images/homeimg1.png"
import img2 from "@/assets/images/homeimg2.png"

const painPoints = [
  {
    icon: <User className="w-6 h-6 text-[#7F56D9]" />,
    text: "You've taken courses... but still feel stuck",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-[#7F56D9]" />,
    text: "You don't have real product experience",
  },
  {
    icon: <Bot className="w-6 h-6 text-[#7F56D9]" />,
    text: "You're not confident applying for roles",
  },
  {
    icon: <ImageOff className="w-6 h-6 text-[#7F56D9]" />,
    text: "Recruiters ask for proof, you don't have it",
  },
];

const StuckSection: React.FC = () => {
  return (
    <section className="bg-[#FCF1FF] py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Heading */}
        <h2 className="font-bold text-[#101828] mb-16 leading-tight text-center">
          <span className="block text-[1.1rem] min-[375px]:text-[1.2rem] sm:text-2xl md:text-4xl whitespace-nowrap sm:whitespace-normal">
            You've Learned Product Management...
          </span>
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl">
            But You're{' '}
            <span className="relative inline-block text-[#101828]">
              STILL STUCK
              <span className="absolute left-0 -bottom-1.5 w-full h-[6px] bg-[#7F56D9] rounded-full"></span>
            </span>
          </span>
        </h2>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 items-center">
          
          {/* Top-Left: Pain Points 1 & 2 */}
          <div className="space-y-6 order-1">
            {painPoints.slice(0, 2).map((point, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6"
              >
                <div className="bg-[#F4EBFF] p-4 rounded-2xl">
                  {point.icon}
                </div>
                <p className="text-sm sm:text-lg md:text-xl font-medium text-[#101828] text-left whitespace-nowrap sm:whitespace-normal">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          {/* Top-Right: Image 1 (Tired Asian Woman) */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 order-3 md:order-2">
            <img 
              src={img2.src}
              alt="Tired woman at computer" 
              className="w-full h-auto object-cover aspect-[16/10]"
            />
          </div>

          {/* Bottom-Left: Image 2 (Stressed Businesswoman) */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 hidden md:block md:order-3 md:row-start-2">
            <img 
              src={img1.src}
              alt="Stressed businesswoman" 
              className="w-full h-auto object-cover aspect-[16/10]"
            />
          </div>

          {/* Bottom-Right: Pain Points 3 & 4 */}
          <div className="space-y-6 order-2 md:order-4 md:row-start-2">
            {painPoints.slice(2, 4).map((point, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6"
              >
                <div className="bg-[#F4EBFF] p-4 rounded-2xl">
                  {point.icon}
                </div>
                <p className="text-sm sm:text-lg md:text-xl font-medium text-[#101828] text-left whitespace-nowrap sm:whitespace-normal">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StuckSection;