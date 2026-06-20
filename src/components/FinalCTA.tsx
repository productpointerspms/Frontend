import React from "react";
import { MoveRight, Check } from "lucide-react";

const highlights = [
  "Build real experience.",
  "Create verified evidence.",
  "Become visible to recruiters.",
];

const FinalCTA: React.FC = () => {
  return (
    <section className="w-full bg-[#3B448F] py-24 px-6 flex flex-col items-center text-center">
      <div className="max-w-[900px] mx-auto flex flex-col items-center">
        {/* Main Heading */}
        <h2 className="text-white text-2xl md:text-4xl font-bold mb-8 tracking-tight">
          Ready To Move Beyond Learning?
        </h2>

        {/* Highlights */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10">
          {highlights.map((text) => (
            <div key={text} className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-[#3B448F]" strokeWidth={3} />
              </span>
              <span className="text-white/90 text-sm md:text-base">{text}</span>
            </div>
          ))}
        </div>

        {/* Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Action */}
          <button className="bg-[#FDF4FF] text-[#6024D0] px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white transition-colors w-full sm:w-auto justify-center cursor-pointer">
            Apply for Full Career Path
            <MoveRight className="w-5 h-5" />
          </button>

          {/* Secondary Action */}
          <button className="border border-white/40 text-white px-8 py-4 rounded-2xl font-medium hover:bg-white/10 transition-colors w-full sm:w-auto justify-center cursor-pointer">
            Explore Programs
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
