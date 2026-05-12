import React from 'react';
import { MoveRight } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="w-full bg-[#3B448F] py-24 px-6 flex flex-col items-center text-center">
      <div className="max-w-[850px] mx-auto">
        {/* Main Heading */}
        <h2 className="text-white text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          Ready To Build Real Product Experience?
        </h2>

        {/* Subtext */}
        <p className="text-white/90 text-lg md:text-xl mb-12 leading-relaxed font-light">
          Join a program designed to take you from learning to doing with 
          mentorship, real product work, and career support every step of the way.
        </p>

        {/* Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Action */}
          <button className="bg-[#FDF4FF] text-[#6024D0] px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white transition-colors w-full sm:w-auto justify-center cursor-pointer">
            Apply Now
            <MoveRight className="w-5 h-5" />
          </button>

          {/* Secondary Action */}
          <button className="border border-white/40 text-white px-8 py-4 rounded-2xl font-medium hover:bg-white/10 transition-colors w-full sm:w-auto justify-center cursor-pointer">
            Find the Right Program for You
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;