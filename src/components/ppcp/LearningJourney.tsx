import React from 'react';
import { Check, Layout, Monitor } from 'lucide-react';
import img from "@/assets/images/conn.png"
import img1 from "@/assets/images/conn1.png"  

const LearningJourney = () => {
  return (
    <section className="bg-[#2D3E8B] py-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header Section */}
        <h2 className="text-white text-3xl md:text-5xl font-black mb-4 leading-tight">
          A clear, step-by-step journey from: Beginner to <br />
          Job-ready Product Manager
        </h2>
        <p className="text-purple-200/80 text-lg mb-16">No confusion. No guesswork.</p>

        {/* Feature Cards Grid */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[100px] h-[1px] bg-white/20 z-0"></div>

          {/* Card 1: Internship Experience */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden w-full max-w-sm shadow-2xl z-10 text-left">
            <div className="h-52 overflow-hidden">
              <img 
                src={img.src}
                alt="Product meeting" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Layout className="text-[#6219D1] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Practical Experience (Internship)</h3>
              <p className="text-gray-500 text-sm mb-6 font-medium">You will:</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center gap-2 bg-[#F0FDF4] px-4 py-2 rounded-full border border-[#DCFCE7]">
                  <Check className="text-[#10B981] w-3.5 h-3.5" strokeWidth={4} />
                  <span className="text-gray-700 text-sm font-semibold">Build</span>
                </span>
                <span className="flex items-center gap-2 bg-[#F0FDF4] px-4 py-2 rounded-full border border-[#DCFCE7]">
                  <Check className="text-[#10B981] w-3.5 h-3.5" strokeWidth={4} />
                  <span className="text-gray-700 text-sm font-semibold">Execute</span>
                </span>
              </div>
              
              <div className="flex items-center gap-2 bg-[#F0FDF4] px-4 py-2 rounded-full border border-[#DCFCE7] w-fit mb-10">
                <Check className="text-[#10B981] w-3.5 h-3.5" strokeWidth={4} />
                <span className="text-gray-700 text-sm font-semibold">Work on real product scenarios</span>
              </div>

              <div className="w-full h-[1px] bg-gray-100 mb-4"></div>
              <p className="text-gray-400 text-[11px] italic font-medium">You gain real experience, not just knowledge</p>
            </div>
          </div>

          {/* Card 2: Mentorship & Support */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden w-full max-w-sm shadow-2xl z-10 text-left">
            <div className="h-52 overflow-hidden">
              <img 
                src={img1.src}
                alt="Career guidance" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Monitor className="text-[#6219D1] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Mentorship & Career Support</h3>
              
              <div className="space-y-3 mb-12">
                {[
                  "CV & portfolio optimization",
                  "Job application guidance",
                  "Interview preparation"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#F0FDF4] px-4 py-2 rounded-full border border-[#DCFCE7] w-fit">
                    <Check className="text-[#10B981] w-3.5 h-3.5" strokeWidth={4} />
                    <span className="text-gray-700 text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>

              <div className="w-full h-[1px] bg-gray-100 mb-4"></div>
              <p className="text-gray-400 text-[11px] italic text-center font-medium">
                You’re supported until you’re ready to land opportunities
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LearningJourney;