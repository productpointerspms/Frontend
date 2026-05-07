"use client";

import React from "react";
import Image from "next/image";
import { Globe, Quote, Briefcase, Handshake, MapPin } from "lucide-react";
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
          <h2 className="text-[32px] md:text-[42px] font-bold mb-4">
            Real Stories. Real Impact.
          </h2>
          <p className="text-lg md:text-xl opacity-60 max-w-3xl mx-auto leading-relaxed">
            Behind every number is a human story. Discover how our community
            transforms careers and builds connections that span the globe.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
          {[
            { icon: <Briefcase size={24} />, val: "300+", label: "Product Managers trained" },
            { icon: <Handshake size={24} />, val: "98%", label: "Would recommend to a friend" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-purple-50 p-8 flex flex-col items-center text-center w-full md:w-72">
              <div className="text-[#6024D0] mb-4 opacity-80">{item.icon}</div>
              <h3 className="text-3xl font-bold text-[#6024D0] mb-2">{item.val}</h3>
              <p className="text-sm opacity-60">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Blessing's Testimonial */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-purple-50">
            <Quote className="text-[#6024D0] w-10 h-10 mb-6 rotate-180" />
            <p className="text-lg italic opacity-70 leading-relaxed mb-8">
              "The program has helped me grow by widening my knowledge about happenings in the world that I had little or zero knowledge about. It's solved a specific problem for me by changing my thought pattern. One of the major effects of the program on me is a broadened knowledge."
            </p>
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden">
                <Image src="/images/Bless.png" alt="Blessing" fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-[#6024D0]">Blessing Conference</p>
                <p className="text-sm opacity-50">Product Manager</p>
              </div>
            </div>
          </div>

          {/* Samuel's Testimonial */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-purple-50 flex flex-col justify-between">
            <div>
                <Quote className="text-[#6024D0] w-8 h-8 mb-6 rotate-180" />
                <p className="text-base italic opacity-70 leading-relaxed mb-8">
                "The program transformed my perspective, teaching me how to research, plan, and align products with user needs and business goals."
                </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src="/images/Samuel.png" alt="Samuel" fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-[#6024D0]">Samuel Ogunleye</p>
                <p className="text-sm opacity-50">Product Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Team Success */}
          <div className="relative group h-64 rounded-3xl overflow-hidden shadow-md">
            <Image src="/images/Newsuccess.png" alt="Team Success" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <h4 className="text-white font-bold text-lg">Team Success</h4>
              <p className="text-white/80 text-sm">Collaborative growth</p>
            </div>
          </div>

          {/* Individual Growth */}
          <div className="relative group h-64 rounded-3xl overflow-hidden shadow-md">
            <Image src="/images/individual.png" alt="Individual Growth" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <h4 className="text-white font-bold text-lg">Individual Growth</h4>
              <p className="text-white/80 text-sm">Personal transformation</p>
            </div>
          </div>

          {/* Global Map Container */}
          <div className="relative h-64 rounded-3xl overflow-hidden shadow-md bg-[#6024D0]/10">
            <Image src="/images/Map.png" alt="Global Reach Map" fill className="object-cover opacity-60 mix-blend-multiply" />
            
            {/* Floating Map Info */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-[200px] border border-purple-100">
              <div className="flex items-center gap-2 text-[#6024D0] mb-2">
                <MapPin size={14} className="fill-[#6024D0]/20" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Global Reach</span>
              </div>
              <p className="text-[9px] leading-relaxed opacity-70">
                Our growing community spans Ireland, Moscow, the US, the UK, and Equatorial Guinea.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RealStories;