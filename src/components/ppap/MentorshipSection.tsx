import React from 'react';
import { Users, Briefcase, ArrowRight } from 'lucide-react';

const MentorshipSection = () => {
  return (
    <section className="bg-[#FAF5FF] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            This Is Just the Beginning
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed">
            PPAP gives you the foundation. From here, you can continue building real experience and move closer to becoming a job-ready Product Manager.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-50 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-[#6D28D9] rounded-2xl flex items-center justify-center shadow-sm">
                <Users className="w-7 h-7 text-white" />
              </div>
              <span className="text-gray-400 font-medium text-sm mt-2">Step 2</span>
            </div>
            
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3 pr-4">
              ProductPointers Mentorship Program
            </h3>
            
            <p className="text-gray-600 mb-10 flex-1">
              where you start building real products
            </p>
            
            <a href="#" className="flex items-center text-[#4F46E5] font-semibold hover:text-[#4338ca] transition-colors mt-auto group w-max">
              Learn More <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-50 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-[#6D28D9] rounded-2xl flex items-center justify-center shadow-sm">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <span className="text-gray-400 font-medium text-sm mt-2">Step 3</span>
            </div>
            
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3 pr-4">
              ProductPointers Internship Program
            </h3>
            
            <p className="text-gray-600 mb-10 flex-1">
              where you gain real experience
            </p>
            
            <a href="#" className="flex items-center text-[#4F46E5] font-semibold hover:text-[#4338ca] transition-colors mt-auto group w-max">
              Learn More <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;
