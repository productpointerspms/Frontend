import React from 'react';
import { Check, ChevronDown, ArrowRight } from 'lucide-react';

const PricingSection = () => {
  return (
    <section className="bg-[#FCF1FF] py-24 px-6 md:px-12 lg:px-24 flex justify-center">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-4">
          Invest In Your Product Career
        </h2>
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto text-base leading-relaxed">
          A structured 12-week program designed to give you clarity, direction, and confidence in Product Management.
        </p>

        <div className="bg-white rounded-[2rem] shadow-sm p-8 md:p-12 max-w-[500px] mx-auto border border-gray-100 flex flex-col items-center">
          <p className="text-xs text-gray-400 mb-4 font-medium">Limited early bird spots available</p>

          <div className="bg-purple-100 text-purple-500 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-wide">
            Early Bird
          </div>

          <p className="text-gray-400 line-through text-base font-medium mb-4">
            ₦150,000 Program Fee
          </p>

          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50">
            {/* Nigerian Flag Placeholder */}
            <div className="w-4 h-4 rounded-full overflow-hidden flex border border-gray-100">
              <div className="w-1/3 h-full bg-green-600"></div>
              <div className="w-1/3 h-full bg-white"></div>
              <div className="w-1/3 h-full bg-green-600"></div>
            </div>
            NGN
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

          <div className="mb-8">
            <span className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight">₦100,000</span>
          </div>

          <div className="w-full h-px bg-gray-100 mb-8"></div>

          <div className="space-y-5 mb-10 w-full text-left pl-4 md:pl-8">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-purple-600" strokeWidth={3} />
              </div>
              <span className="text-gray-500 text-[13px] font-medium">Full access to all sessions</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-purple-600" strokeWidth={3} />
              </div>
              <span className="text-gray-500 text-[13px] font-medium">Mentorship support</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-purple-600" strokeWidth={3} />
              </div>
              <span className="text-gray-500 text-[13px] font-medium">Assignments & resources</span>
            </div>
          </div>

          <button className="w-full bg-[#6D28D9] text-white py-4 rounded-xl font-medium text-base hover:bg-[#5b21b6] transition-colors mb-4 flex items-center justify-center gap-2">
            Enroll Now <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-gray-400 leading-relaxed max-w-[360px]">
            We keep our cohorts small to ensure quality mentorship. <br />
            Limited spots available for the next intake.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
