"use client";

import React from "react";
import { ArrowRight, Layers, TrendingUp, Briefcase, ShieldCheck, Target } from "lucide-react";
import img from "@/assets/images/hee.png";
import user1 from "@/assets/images/eniola.png";
import user2 from "@/assets/images/mercy.png";
import user3 from "@/assets/images/udochukwu.png";

const HeroSection: React.FC = () => {
  const roadmapItems = [
    { icon: <Layers size={18} />, title: "PPAP", sub: "Foundation" },
    { icon: <TrendingUp size={18} />, title: "PPIP", sub: "Experience" },
    { icon: <Briefcase size={18} />, title: "PPMP", sub: "Job-Ready PM" },
    { icon: <ShieldCheck size={18} />, title: "PPTP", sub: "Specialization" },
    { icon: <Target size={18} />, title: "PPCP", sub: "Personalized" },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#FCF1FF] flex items-center pt-24 pb-16 overflow-hidden font-montserrat">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center max-w-7xl">
        
        {/* Left Column: Text Content */}
        <div className="text-left max-w-2xl">
          <span className="inline-block border border-[#D1B3FF] bg-[#FAE1FF] text-[#7E43E8] text-[8px] md:text-[10px] font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase ">
            FOR ASPIRING PRODUCT MANAGERS WHO FEEL STUCK AFTER LEARNING
          </span>
          
          <h1 className="text-[#666666] font-bold text-4xl md:text-5xl lg:text-[40px] leading-[1.1] mb-2 tracking-tight">
            Finished Learning Product<br className="hidden md:block"/> Management...
          </h1>
          <h2 className="text-[#1A1A1A] font-extrabold text-4xl md:text-5xl lg:text-[40px] leading-[1.1] mb-8 tracking-tight">
            But Still Not Getting<br className="hidden md:block"/> Results?
          </h2>

          <p className="text-gray-600 text-[14px] md:text-xl mb-10 leading-relaxed max-w-lg font-medium">
            A mentorship-first academy helping you build real products, 
            gain experience, and become job-ready, not just certified.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-[#5C1CC5] text-sm md:text-base hover:bg-[#4a15a0] text-white font-medium px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200/50 cursor-pointer">
              Find Your Next Step in Product <ArrowRight size={18} />
            </button>
            <button className="border border-gray-300 bg-transparent text-sm md:text-base hover:bg-gray-50 text-[#1A1A1A] font-medium px-6 py-3.5 rounded-xl transition-all cursor-pointer">
              Join the Next Cohort
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[user1, user3, user2].map((userImg, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm">
                  <img src={userImg.src} alt={`User ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-[12px] font-medium">
              Trusted by <span className="text-gray-900 font-bold">300+</span> aspiring Product Managers building real experience
            </p>
          </div>
        </div>

        {/* Right Column: Roadmap Card */}
        <div className="relative flex justify-center lg:justify-end w-full">
          <div className="bg-white/30 border border-[#D1B3FF] p-8 md:p-10 rounded-[3rem] w-full max-w-[420px] backdrop-blur-xl shadow-xl shadow-purple-100/40">
            <div className="flex flex-col items-center mb-6">
              <div className="w-[84px] h-[84px] rounded-full overflow-hidden border-4 border-white shadow-sm mb-4">
                 <img src={img.src} alt="Mentorship session" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[#1A1A1A] font-semibold text-[22px] mb-1">1-on-1 Mentorship</h3>
              <p className="text-gray-500 text-[15px]">Real guidance from experienced PMs</p>
            </div>

            <div className="w-full h-px bg-gray-200/80 mb-8" />

            <div className="relative space-y-5 pl-1">
              {/* Connector Line */}
              <div className="absolute left-[20px] top-6 bottom-6 w-[2px] bg-[#5C1CC5]" />
              
              {roadmapItems.map((item, index) => (
                <div key={index} className="flex items-center gap-5 group ">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#FAE1FF] border border-[#FAE1FF] flex items-center justify-center text-[#7E43E8] shadow-sm transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div className="flex-1 bg-white/90 backdrop-blur-sm px-5 py-3.5 rounded-2xl border border-gray-100 shadow-sm transition-all group-hover:shadow-md">
                    <h4 className="font-semibold text-[#1A1A1A] text-[15px] mb-0.5">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.sub}</p>
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