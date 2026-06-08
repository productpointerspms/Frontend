import React from 'react';
import { Eye, Compass, MapPin, ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="bg-[#FAF5FF] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-2">
          You Don't Need More Courses
        </h2>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#6D28D9] italic mb-6">
          You Need Clarity
        </h3>
        <p className="text-gray-500 mb-16 max-w-3xl mx-auto text-base leading-relaxed">
          PPAP isn't about overwhelming you with more content. It's about giving you a clear starting point, direction, and the confidence to move forward in Product Management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
          <div className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="w-12 h-12 bg-[#6D28D9] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#1a1a1a] text-lg mb-3">Clarity</h3>
            <p className="text-gray-500 leading-relaxed">
              Understand what Product Management really is and what matters
            </p>
          </div>
          
          <div className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="w-12 h-12 bg-[#6D28D9] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#1a1a1a] text-lg mb-3">Direction</h3>
            <p className="text-gray-500 leading-relaxed">
              Know what to focus on and how to move forward
            </p>
          </div>
          
          <div className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="w-12 h-12 bg-[#6D28D9] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#1a1a1a] text-lg mb-3 pr-4">A Starting Point That Makes Sense</h3>
            <p className="text-gray-500 leading-relaxed">
              Stop guessing and start with a structured path
            </p>
          </div>
        </div>

        <button className="bg-[#6D28D9] text-white px-8 py-4 rounded-xl font-medium text-base hover:bg-[#5b21b6] transition-colors inline-flex items-center gap-2">
          Join the Next Cohort <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
