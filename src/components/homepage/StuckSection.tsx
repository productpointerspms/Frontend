"use client";

import React from 'react';
import { User, Briefcase, Bot, ImageOff } from 'lucide-react';

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
    <section className="bg-[#F9F5FF] py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#101828] mb-16 leading-tight">
          You've Learned Product Management...<br />
          <span className="block mt-2">
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
          <div className="space-y-6">
            {painPoints.slice(0, 2).map((point, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6"
              >
                <div className="bg-[#F4EBFF] p-4 rounded-2xl">
                  {point.icon}
                </div>
                <p className="text-lg md:text-xl font-medium text-[#101828] text-left">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          {/* Top-Right: Image 1 (Tired Asian Woman) */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
              alt="Tired woman at computer" 
              className="w-full h-auto object-cover aspect-[16/10]"
            />
          </div>

          {/* Bottom-Left: Image 2 (Stressed Businesswoman) */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 md:row-start-2">
            <img 
              src="https://images.unsplash.com/photo-1573497620053-ea5310f94f17?q=80&w=1000&auto=format&fit=crop" 
              alt="Stressed businesswoman" 
              className="w-full h-auto object-cover aspect-[16/10]"
            />
          </div>

          {/* Bottom-Right: Pain Points 3 & 4 */}
          <div className="space-y-6 md:row-start-2">
            {painPoints.slice(2, 4).map((point, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6"
              >
                <div className="bg-[#F4EBFF] p-4 rounded-2xl">
                  {point.icon}
                </div>
                <p className="text-lg md:text-xl font-medium text-[#101828] text-left">
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