"use client";

import React from "react";
import Image from "next/image";
import { Quote, Briefcase, Handshake, MapPin } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const RealStories: React.FC = () => {
  return (
    <section className={`${montserrat.className} w-full bg-[#FDF4FF] py-24 text-[#15010D]`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#15010D] text-3xl md:text-[42px] font-bold mb-4 tracking-tight">
            Real Stories. Real Impact.
          </h2>
          <p className="text-[#15010D] opacity-60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            Behind every number is a human story. Discover how our community
            transforms careers and builds connections that span the globe.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
          {/* Card 1: 300+ */}
          <div className="bg-white rounded-[24px] shadow-[0_4px_20px_0_rgba(92,28,197,0.02)] border border-purple-50/80 p-8 flex flex-col items-center text-center w-full max-w-[280px]">
            <div className="text-[#6024D0] mb-4">
              <Briefcase size={26} className="stroke-[1.5]" />
            </div>
            <h3 className="text-3xl font-extrabold text-[#6024D0] mb-1">300+</h3>
            <p className="text-sm text-[#15010D]/60 font-medium">Product Managers trained</p>
          </div>

          {/* Card 2: 98% */}
          <div className="bg-white rounded-[24px] shadow-[0_4px_20px_0_rgba(92,28,197,0.02)] border border-purple-50/80 p-8 flex flex-col items-center text-center w-full max-w-[280px]">
            <div className="text-[#6024D0] mb-4">
              <Handshake size={26} className="stroke-[1.5]" />
            </div>
            <h3 className="text-3xl font-extrabold text-[#6024D0] mb-1">98%</h3>
            <p className="text-sm text-[#15010D]/60 font-medium">Would recommend to a friend</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Blessing's Testimonial */}
          <div className="lg:col-span-7 bg-white rounded-[24px] p-8 md:p-10 shadow-sm border border-purple-50 flex flex-col justify-between min-h-[300px]">
            <div>
              <Quote className="text-[#6024D0] w-8 h-8 mb-4 rotate-180 fill-[#6024D0]/10" />
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6 text-[#15010D] font-normal">
                The program has helped me grow by widening my knowledge about happenings in the world that I had little or zero knowledge about. It's solved a specific problem for me by changing my thought pattern. One of the major effects of the program on me is a broadened knowledge.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src="/images/Bless.png" alt="Blessing Conference" fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-[#6024D0] text-sm md:text-base">Blessing Conference</p>
                <p className="text-xs opacity-50">Product Manager</p>
              </div>
            </div>
          </div>

          {/* Samuel's Testimonial */}
          <div className="lg:col-span-5 bg-white rounded-[24px] p-8 md:p-10 shadow-sm border border-purple-50 flex flex-col justify-between min-h-[300px]">
            <div>
              <Quote className="text-[#6024D0] w-8 h-8 mb-4 rotate-180 fill-[#6024D0]/10" />
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6 text-[#15010D] font-normal">
                The program transformed my perspective, teaching me how to research, plan, and align products with user needs and business goals.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src="/images/Samuel.png" alt="Samuel Ogunleye" fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-[#6024D0] text-sm md:text-base">Samuel Ogunleye</p>
                <p className="text-xs opacity-50">Product Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Success */}
          <div className="relative group h-72 rounded-[24px] overflow-hidden shadow-sm">
            <Image src="/images/Newsuccess.png" alt="Team Success" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <h4 className="text-white font-bold text-base md:text-lg">Team Success</h4>
              <p className="text-white/80 text-xs">Collaborative growth</p>
            </div>
          </div>

          {/* Individual Growth */}
          <div className="relative group h-72 rounded-[24px] overflow-hidden shadow-sm">
            <Image src="/images/Individual.png" alt="Individual Growth" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <h4 className="text-white font-bold text-base md:text-lg">Individual Growth</h4>
              <p className="text-white/80 text-xs">Personal transformation</p>
            </div>
          </div>

          {/* Global Map Container with overlapping Reach info */}
          <div className="relative h-72">
            {/* Map Background Card */}
            <div className="absolute inset-0 rounded-[24px] overflow-hidden shadow-sm bg-[#6024D0]/10 border border-purple-50">
              <Image src="/images/Map.png" alt="Global Reach Map" fill className="object-cover opacity-60 mix-blend-multiply" />
            </div>
            
            {/* Floating Map Info - overlapping top border and left aligned */}
            <div className="absolute -top-8 left-6 bg-white rounded-[18px] p-5 shadow-xl max-w-[250px] border border-purple-50/80 z-20">
              <div className="flex items-center gap-2 text-[#6024D0] mb-2">
                <MapPin size={16} className="fill-[#6024D0]/10" />
                <span className="text-xs font-bold tracking-tight">Global Reach</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#15010D]/70 font-medium">
                Our growing community spans Ireland, Moscow, the US, the UK, and Equatorial Guinea bringing together product leaders from every corner of the world.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RealStories;