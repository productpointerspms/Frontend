"use client";

import React from "react";
import { ArrowRight, Layers, TrendingUp, Briefcase, ShieldCheck, Target } from "lucide-react";

const HeroSection: React.FC = () => {
  const roadmapItems = [
    { icon: <Layers size={18} />, title: "PPAP", sub: "Foundation" },
    { icon: <TrendingUp size={18} />, title: "PPMP", sub: "Transformation" },
    { icon: <Briefcase size={18} />, title: "PPIP", sub: "Experience" },
    { icon: <ShieldCheck size={18} />, title: "PPCP", sub: "Job-Ready PM" },
    { icon: <Target size={18} />, title: "PPTP", sub: "Specialization" },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#FCF1FF] flex items-center pt-20 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text Content */}
        <div className="text-left max-w-2xl">
          <span className="inline-block border border-[#B188F3] text-[#5C1CC5] text-[10px] sm:text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            FOR ASPIRING PRODUCT MANAGERS WHO FEEL STUCK AFTER LEARNING
          </span>
          
          <h1 className="text-[#4D4D4D] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            Finished Learning Product Management...
          </h1>
          <h2 className="text-[#1A1A1A] font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
            But Still Not Getting Results?
          </h2>

          <p className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
            A mentorship-first academy helping you build real products, 
            gain experience, and become job-ready, not just certified.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="bg-[#5C1CC5] hover:bg-[#4a15a0] text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200">
              Find Your Next Step in Product <ArrowRight size={20} />
            </button>
            <button className="border-2 border-[#1A1A1A] hover:bg-gray-100 text-[#1A1A1A] font-semibold px-8 py-4 rounded-xl transition-all">
              Join the Next Cohort
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-300">
                  <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm font-medium">
              Trusted by <span className="text-gray-900 font-bold">300+</span> aspiring Product Managers building real experience
            </p>
          </div>
        </div>

        {/* Right Column: Roadmap Card */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="bg-white/40 border border-white p-8 rounded-[40px] w-full max-w-md backdrop-blur-sm shadow-xl shadow-purple-100/50">
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                 <img src="https://i.pravatar.cc/150?u=pm-mentor" alt="Mentor" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-xl">1-on-1 Mentorship</h3>
              <p className="text-gray-500 text-sm">Real guidance from experienced PMs</p>
            </div>

            <div className="relative space-y-6">
              {/* Connector Line */}
              <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-[#B188F3]/30" />
              
              {roadmapItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-white border border-[#B188F3] flex items-center justify-center text-[#5C1CC5] shadow-sm transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div className="flex-1 bg-white p-3 px-5 rounded-xl border border-gray-50 shadow-sm transition-all group-hover:shadow-md">
                    <h4 className="font-bold text-gray-800 text-sm leading-none mb-1">{item.title}</h4>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;