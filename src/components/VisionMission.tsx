import React from 'react';
import { Target, Eye } from 'lucide-react';

const VisionMission: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDF4FF] w-full px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Heading */}
        <h2 className="text-center text-[#15010D] text-3xl md:text-4xl font-extrabold mb-16 tracking-tight">
          Why We Do What We Do
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission Card */}
          <div className="bg-white rounded-[40px] p-10 md:p-14 flex flex-col items-center text-center shadow-sm">
            <div className="w-14 h-14 bg-[#6024D0] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-200">
              <Target className="text-white w-7 h-7" />
            </div>
            <h3 className="text-[#15010D] text-2xl font-bold mb-6">Our Mission</h3>
            <p className="text-[#15010D]/70 text-lg leading-relaxed max-w-[440px]">
              We exist to help aspiring Product Managers move from learning to real execution with the guidance, structure, and experience most programs lack.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-[40px] p-10 md:p-14 flex flex-col items-center text-center shadow-sm">
            <div className="w-14 h-14 bg-[#6024D0] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-200">
              <Eye className="text-white w-7 h-7" />
            </div>
            <h3 className="text-[#15010D] text-2xl font-bold mb-6">Our Vision</h3>
            <p className="text-[#15010D]/70 text-lg leading-relaxed max-w-[440px]">
              We're building a world where product managers don't just learn. They build, contribute, and grow with confidence.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionMission;