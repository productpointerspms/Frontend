import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const PricingCard = () => {
  return (
    <section className="bg-[#F9F5FF] py-20 px-6 text-center font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Invest In Your Product Career
        </h2>
        <p className="text-gray-500 text-base mb-12 max-w-2xl mx-auto">
          A specialization-focused program designed to help you deepen your expertise, 
          stand out in your field, and position yourself for higher-impact opportunities.
        </p>

        {/* Pricing Card */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm max-w-lg mx-auto border border-purple-50">
          <span className="bg-purple-100 text-purple-600 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
            Program Fee
          </span>
          
          <div className="mt-6 mb-2">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900">
              ₦150,000
            </h3>
          </div>
          <p className="text-gray-400 text-xs mb-10">Flexible payment options available</p>

          <div className="text-left space-y-4 mb-12">
            <p className="text-gray-400 font-medium mb-4">Included In This Program:</p>
            {[
              "Specialization-focused training",
              "Real-world strategic thinking",
              "Career positioning support"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-full p-1">
                  <Check className="w-3 h-3 text-purple-600" strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <button className="w-full bg-[#6219D1] hover:bg-[#4f14a8] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
            Enroll Now <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-gray-400 text-xs mt-6">
            Best for Product Managers ready to move beyond beginner-level execution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingCard;