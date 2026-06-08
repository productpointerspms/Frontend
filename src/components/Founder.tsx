import React from "react";
import Image from "next/image";
import { Quote, Linkedin, ArrowRight } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Founder: React.FC = () => {
  const storyPoints = [
    {
      title: "The Problem",
      content: "Like many aspiring Product Managers, we saw people learn the theory but struggle to apply it in real-world situations.",
    },
    {
      title: "The Realization",
      content: "The issue wasn't a lack of knowledge, it was a lack of guidance, structure, and real experience.",
    },
    {
      title: "The Solution",
      content: "So we built ProductPointers, A mentorship-first system focused on execution, experience, and outcomes.",
    },
  ];

  return (
    <section className={`${montserrat.className} w-full bg-[#FDF4FF] py-20 px-6 md:px-12 lg:px-24 text-[#15010D]`}>
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-base font-bold opacity-80 mb-2 block">Founder's Story</span>
        <h2 className="text-2xl md:text-[37px] font-bold leading-tight mb-4">
          Why We Built ProductPointers
        </h2>
        <p className="text-base md:text-lg opacity-60 max-w-[700px] mx-auto leading-relaxed">
          ProductPointers wasn't created from theory. It was built from real frustration with how Product Management is taught today.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">
        
        {/* Left: Image with Border Accent */}
        <div className="relative flex flex-col items-center">
          <div className="relative">
            {/* Purple Offset Background */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-[#6024D0] rounded-[32px] z-0"></div>
            
            {/* Founder Image */}
            <div className="relative z-10 w-[320px] md:w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl">
              <img 
                src="/images/Founder-Pic.png" 
                alt="Blessing Okomor" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* LinkedIn Button */}
          <button className="mt-8 bg-white hover:bg-gray-50 text-[#6024D0] px-6 py-3 rounded-2xl flex items-center gap-3 shadow-md transition-all font-semibold cursor-pointer">
            <div className="bg-[#0077B5] p-1 rounded-md">
              <Linkedin className="w-4 h-4 text-white fill-white" />
            </div>
            <span>Connect on Linkedin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Timeline Story */}
        <div className="flex-1">
          {/* Quote Icon & Name */}
          <div className="flex items-start gap-4 mb-10">
            <div className="bg-transparent border-2 border-[#6024D0]/20 p-2 rounded-xl">
              <Quote className="w-8 h-8 text-[#6024D0] rotate-180 fill-[#6024D0]" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#15010D]">Blessing Okomor</h3>
              <p className="text-[#6024D0] font-medium">Founder, ProductPointers</p>
            </div>
          </div>

          {/* Vertical Timeline */}
          <div className="relative space-y-12">
            {/* The Vertical Line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-[#6024D0]/20"></div>

            {storyPoints.map((point, index) => (
              <div key={index} className="relative pl-12">
                {/* Bullet Point */}
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#FDF4FF] border-2 border-[#6024D0] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#6024D0]"></div>
                </div>
                
                <h4 className="text-lg font-bold text-[#15010D] mb-2">{point.title}</h4>
                <p className="text-[#15010D] opacity-60 leading-relaxed text-base">
                  {point.content}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <button className="mt-12 text-[#6024D0] font-semibold text-lg flex items-center gap-2 hover:underline underline-offset-8 transition-all cursor-pointer">
            Learn More About Our Programs
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Founder;