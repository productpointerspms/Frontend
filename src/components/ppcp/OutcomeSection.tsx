import React from 'react';
import { Check } from 'lucide-react';
import img from "@/assets/images/ppcpim1.png"

const OutcomeSection = () => {
  const outcomes = [
    "A clear path",
    "Direct feedback",
    "Accountability",
    "Personalized guidance",
  ];

  return (
    <section className="bg-[#FAF7FD] py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-8">
            What If You Didn’t Have To <br /> Guess Your Next Step?
          </h2>
          
          <p className="text-gray-500 mb-8 text-base">
            With PPCP, you don’t just learn Product Management... <br /> You get:
          </p>
          
          <div className="space-y-4 mb-12">
            {outcomes.map((item, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-50"
              >
                <div className="flex-shrink-0">
                  <Check className="text-[#10B981] w-5 h-5" strokeWidth={3} />
                </div>
                <p className="text-gray-800 font-medium text-base">{item}</p>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <p className="text-lg md:text-xl font-bold text-gray-900">
              This is not a <span className="text-[#FBBF24] italic underline decoration-2 underline-offset-4">course.</span>
            </p>
            <p className="text-lg md:text-xl font-bold text-[#10B981] italic">
              This is a Guided Transformation.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl w-full max-w-xl aspect-[4/5] lg:aspect-square">
            <img 
              src={img.src}
              alt="Two women collaborating on a laptop" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default OutcomeSection;