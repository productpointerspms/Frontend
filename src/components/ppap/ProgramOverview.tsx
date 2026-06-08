import React from 'react';
import { Signpost, Users, BriefcaseBusiness } from 'lucide-react';

const ProgramOverview = () => {
  return (
    <section className="bg-[#FAF5FF] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 max-w-xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            PPAP Gives You What Most Beginners Lack: <span className="text-[#6D28D9]">Clarity</span>
          </h2>
          
          <p className="text-gray-500 text-base mb-6 leading-relaxed">
            Instead of random learning, you'll follow a structured path designed to help you understand Product Management from the ground up.
          </p>
          
          <p className="text-[#1a1a1a] text-base mb-10 leading-relaxed font-medium">
            With mentorship, practical assignments, and guided learning, you won't just "learn", you'll start <span className="text-[#6D28D9]">thinking like a Product Manager.</span>
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-50">
              <Signpost className="w-5 h-5 text-[#6D28D9]" />
              <span className="font-medium text-[#1a1a1a]">Structured Path</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-50">
              <Users className="w-5 h-5 text-[#6D28D9]" />
              <span className="font-medium text-[#1a1a1a]">Mentorship</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-50">
              <BriefcaseBusiness className="w-5 h-5 text-[#6D28D9]" />
              <span className="font-medium text-[#1a1a1a]">Practical Work</span>
            </div>
          </div>
        </div>

        <div className="flex-[1.2] w-full flex justify-center">
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-200 relative w-full max-w-[600px] shadow-lg">
             {/* Fallback image for sticky notes */}
             <img 
               src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop" 
               alt="Person writing on sticky notes on glass" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramOverview;
