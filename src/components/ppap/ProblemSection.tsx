import React from 'react';
import { XCircle } from 'lucide-react';
import ppapimg from "@/assets/images/ppapimg.png"


const ProblemSection = () => {
  const problems = [
    "You've watched multiple videos... but still feel confused",
    "You don't fully understand how Product Management works",
    "You feel overwhelmed by too many resources",
    "You don't know what to learn or where to start"
  ];

  return (
    <section className="bg-[#FAF5FF] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 max-w-xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-2 leading-tight">
            You're Not Stuck Because You Can't Learn...
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#6D28D9] mb-6 leading-tight">
            -You're Stuck Because There's No Clear Path
          </h3>
          
          <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-md">
            Most beginners don't struggle because they're not smart...<br/>
            They struggle because they don't know what to focus on.
          </p>
          
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm w-full border border-gray-50">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-gray-800 font-medium text-[15px]">{problem}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-200 relative w-full max-w-[480px] shadow-lg">
             {/* Fallback image */}
             <img 
               src={ppapimg.src} 
               alt="Confused woman at laptop" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
