import React from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';

const PricingSection = () => {
  return (
    <section className="bg-[#FAF7FD] py-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          Invest In Your Product Career
        </h2>
        <p className="text-gray-500 text-lg mb-16 max-w-3xl mx-auto">
          A structured coaching program designed to give you clarity, direction, and 
          confidence in Product Management.
        </p>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-5xl mx-auto">
          
          {/* Option 1: 3-Month Plan */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex-1 text-left flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Option 1</span>
              <span className="bg-purple-100 text-[#6219D1] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                3-Month Plan
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Foundation + Internship</h3>
              <div className="flex items-center justify-center mb-1">
                <span className="text-5xl font-black text-gray-900">₦150,000</span>
              </div>
              <p className="text-gray-400 text-xs">One-time payment</p>
            </div>

            <div className="flex-grow">
              <p className="text-sm text-gray-600 font-medium mb-6">
                This phase takes you from beginner to a confident, grounded Product Manager.
              </p>
              
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Includes:</p>
              <ul className="space-y-4 mb-10">
                {[
                  "Foundation Product Management Training",
                  "Practical assignments and guided learning",
                  "Internship experience (hands-on product building)",
                  "Portfolio & CV development",
                  "LinkedIn positioning"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#6219D1] shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full bg-[#6219D1] hover:bg-[#4f14a8] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all mb-4">
              Enroll Now <ArrowRight size={18} />
            </button>
            <p className="text-[10px] text-gray-400 text-center italic">
              Best for beginners who want clarity, practical experience, and job readiness.
            </p>
          </div>

          {/* Option 2: 6-Month Plan */}
          <div className="relative flex-1 flex flex-col mt-8 lg:mt-0">
            {/* Recommendation Tag */}
            <div className="absolute -top-10 left-0 right-0 flex justify-center items-center gap-2 text-[#6219D1] font-bold text-sm">
              <Star size={16} fill="#6219D1" /> Most Recommended
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border-2 border-purple-100 text-left flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Option 2</span>
                <span className="bg-purple-100 text-[#6219D1] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  6-Month Plan
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Beginner to Advanced Transformation</h3>
                <div className="flex items-center justify-center mb-1">
                  <span className="text-5xl font-black text-gray-900">₦250,000</span>
                </div>
                <p className="text-gray-400 text-xs">Flexible installment available</p>
              </div>

              <div className="flex-grow">
                <p className="text-sm text-gray-600 font-medium mb-6">
                  A complete transformation journey from beginner to advanced Product Manager.
                </p>
                
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                  Includes everything in the 3-month plan, plus:
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Advanced Product Management Training",
                    "Extended Mentorship & Career Support",
                    "landing your first product role"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#6219D1] shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-[#6219D1] hover:bg-[#4f14a8] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all mb-4">
                Enroll Now <ArrowRight size={18} />
              </button>
              <p className="text-[10px] text-gray-400 text-center italic">
                Best for Individuals who want to stand out, go deeper, and accelerate faster.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;