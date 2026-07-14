import React from 'react';
import { User, RefreshCw, MessageSquarePlus, Signpost } from 'lucide-react'; // Using approximate icons
import img from "@/assets/images/ppapimg1.png"
import img1 from "@/assets/images/ppapimg2.png"

const SolutionSection = () => {
  return (
    <section className="bg-[#FCF1FF] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#1a1a1a] mb-16">
          This Program Is For You If...
        </h2>
        
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left side cards */}
            <div className="flex-1 w-full flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center gap-6">
                <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-[#6D28D9]" />
                </div>
                <p className="text-[#1a1a1a] text-base font-medium">
                  You're completely new to Product Management
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center gap-6">
                <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-[#6D28D9]" />
                </div>
                <p className="text-[#1a1a1a] text-base font-medium">
                  You're switching from a non-tech background
                </p>
              </div>
            </div>

            {/* Right side image */}
            <div className="flex-[1.2] w-full">
              <div className="aspect-[16/9] lg:aspect-[2/1] rounded-3xl overflow-hidden bg-gray-200 relative w-full shadow-md">
                 {/* Fallback image */}
                 <img 
                   src={img1.src}
                   alt="Two people discussing" 
                   className="w-full h-full object-cover"
                 />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row gap-8 items-center">
             {/* Left side image */}
             <div className="flex-[1.2] w-full order-2 lg:order-1">
              <div className="aspect-[16/9] lg:aspect-[2/1] rounded-3xl overflow-hidden bg-gray-200 relative w-full shadow-md">
                 {/* Fallback image */}
                 <img 
                   src={img.src}
                   alt="Frustrated woman at desk" 
                   className="w-full h-full object-cover"
                 />
              </div>
            </div>

            {/* Right side cards */}
            <div className="flex-1 w-full flex flex-col gap-6 order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center gap-6">
                <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquarePlus className="w-6 h-6 text-[#6D28D9]" />
                </div>
                <p className="text-[#1a1a1a] text-base font-medium">
                  You've started learning but still feel stuck
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center gap-6">
                <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Signpost className="w-6 h-6 text-[#6D28D9]" />
                </div>
                <p className="text-[#1a1a1a] text-base font-medium">
                  You want structured guidance instead of guessing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
