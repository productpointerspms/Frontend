import React from 'react';
import { Check } from 'lucide-react';

const TimelineSection = () => {
  const phases = [
    {
      phase: "PHASE 1",
      weeks: "Weeks 1-3",
      title: "Foundations & Clarity",
      description: "Understand the fundamentals of Product & Project Management",
      outcome: "You understand what Product Management really is and how it works in real teams."
    },
    {
      phase: "PHASE 2",
      weeks: "Weeks 4-6",
      title: "Product Thinking & Discovery",
      description: "Learn how to think like a Product Manager",
      outcome: "You can identify real problems and think in structured product solutions."
    },
    {
      phase: "PHASE 3",
      weeks: "Weeks 7-9",
      title: "Planning & Execution",
      description: "Turn ideas into structured, actionable work",
      outcome: "You can structure product work and understand how teams execute."
    },
    {
      phase: "PHASE 4",
      weeks: "Weeks 10-11",
      title: "Collaboration & Delivery",
      description: "Understand how teams work and deliver products",
      outcome: "You understand how to collaborate, communicate, and manage product delivery."
    },
    {
      phase: "PHASE 5",
      weeks: "Week 12",
      title: "Product Optimization & Launch",
      description: "Measure success and take products to market",
      outcome: "You understand how products are measured, improved, and launched."
    }
  ];

  const finalOutcomes = [
    "Understand Product Management clearly",
    "Think like a Product Manager",
    "Be ready for the next stage (hands-on execution)",
    "Have a structured learning path going forward",
    "Gain confidence in your knowledge"
  ];

  return (
    <section className="bg-[#FAF5FF] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 border border-[#a855f7] bg-transparent text-[#a855f7] rounded-full text-xs font-semibold mb-6">
            12-Week Structured Program
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            A Clear Path From Beginner To Confident Product Manager
          </h2>
          <p className="text-gray-500 text-lg">
            A 12-week guided journey designed to take you from beginner to confident Product Manager step by step. Each phase builds on the previous one, so you're never lost or overwhelmed.
          </p>
        </div>

        <div className="relative border-l-2 border-[#D8B4FE] ml-4 md:ml-12 space-y-8 mb-20 pb-4">
          {phases.map((item, index) => (
            <div key={index} className="relative pl-10 md:pl-16">
              <div className="absolute -left-[17px] top-4 w-8 h-8 md:w-8 md:h-8 bg-[#FAF5FF] rounded-full flex items-center justify-center">
                <div className="w-8 h-8 md:w-8 md:h-8 bg-[#E9D5FF] text-[#6D28D9] rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-bold text-[#6D28D9] tracking-wider uppercase">{item.phase}</span>
                  <span className="text-xs font-bold bg-[#F3E8FF] text-[#6D28D9] px-2 py-0.5 rounded-full">{item.weeks}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-[15px] mb-6">{item.description}</p>
                
                <hr className="border-t border-gray-100 mb-6" />
                
                <div className="text-xs font-bold text-[#a855f7] tracking-wider mb-2">OUTCOME:</div>
                <p className="text-gray-500 text-sm">{item.outcome}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto border-t border-gray-200 pt-16">
          <p className="text-center text-lg md:text-xl font-medium text-gray-600 mb-10 leading-relaxed">
            By the end of the 12 weeks, you won't just understand Product Management... You'll understand how to think, structure, and approach real product work with confidence.
          </p>
          
          <div className="font-bold text-[#1a1a1a] mb-6">Final Outcomes:</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {finalOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#a855f7] flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-gray-500 font-medium text-[15px]">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
