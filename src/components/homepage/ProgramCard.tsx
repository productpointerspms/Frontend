import React from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";

// Assuming you have these images or placeholders
import imgPPAP from "@/assets/images/PPAP.png"; 
import imgPPMP from "@/assets/images/PPMP.png";
import imgPPIP from "@/assets/images/PPIP.png";
import imgPPCP from "@/assets/images/PPCP.png";
import imgPPTP from "@/assets/images/PPTP.png";

interface ProgramCardProps {
  image: string | StaticImageData;
  whoItsFor: string;
  outcome: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ image, whoItsFor, outcome }) => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col h-full shadow-lg">
      {/* Visual Header */}
      <div className="relative w-full aspect-[4/5]">
        <Image src={image} alt="Program Visual" fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow text-left">
        <div className="mb-4 flex-grow">
          <p className="text-sm leading-relaxed text-gray-700">
            <span className="font-semibold text-gray-400">Who it's for:</span> {whoItsFor}
          </p>
          <p className="text-sm leading-relaxed text-gray-700 mt-3">
            <span className="font-semibold text-gray-400">Outcome:</span> {outcome}
          </p>
        </div>

        <button className="flex items-center text-[#4F46E5] font-semibold text-sm hover:underline mt-2 cursor-pointer">
          Learn More <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function ExplorePrograms() {
  const programs = [
    {
      image: imgPPAP,
      whoItsFor: "You've learned product basics but still feel lost and need structure",
      outcome: "Build a strong foundation and understand how to think like a product manager",
    },
    {
      image: imgPPMP,
      whoItsFor: "You understand product concepts but struggle to apply them",
      outcome: "Turn your knowledge into real product execution skills.",
    },
    {
      image: imgPPIP,
      whoItsFor: "You need real world experience to confidently apply for roles",
      outcome: "Work on real products and gain hands-on experience",
    },
    {
      image: imgPPCP,
      whoItsFor: "You are close to job-ready but need positioning and confidence",
      outcome: "Stand out, apply confidently, and land product roles",
    },
    {
      image: imgPPTP,
      whoItsFor: "You are already a product manager but want to apply and stand out",
      outcome: "Become a high-impact, specialized product manager with deeper expertise",
    },
  ];

  return (
    <div className="w-full bg-[#581C87] py-20 px-6 md:px-12">
      {/* Section Header */}
      <div className="text-center mb-16 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explore The Program That Fits Your Current Stage
        </h2>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          Whether you're just getting started or ready to gain real experience, there's a clear next step for you.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        {/* Top Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {programs.slice(0, 3).map((p, i) => (
            <ProgramCard key={i} {...p} />
          ))}
        </div>

        {/* Bottom Row: 2 Cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-2/3">
          {programs.slice(3, 5).map((p, i) => (
            <ProgramCard key={i + 3} {...p} />
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-20 text-center text-white">
        <p className="text-lg mb-6 opacity-90 font-medium">Not sure which program is right for you?</p>
        <button className="bg-white text-purple-900 px-8 py-4 rounded-2xl font-bold flex items-center mx-auto hover:bg-gray-100 transition-colors cursor-pointer">
          Find the Right Program for You <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}