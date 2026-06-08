import React from 'react';
import { XCircle } from 'lucide-react';
import img from "@/assets/images/pptpimg1.png"

const ProblemSection = () => {
  const painPoints = [
    "You're doing a lot... but not growing fast",
    "You're not seen as an expert in anything",
    "You're struggling to stand out in opportunities"
  ];

  return (
    <section className="bg-[#FDF2FF] py-20 px-6 md:px-20 font-montserrat">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-[#101828] mb-8 leading-tight">
            At Some Point, Being <span className="text-[#6024D0] italic">"Just A Product Manager"</span> Stops Being Enough.
          </h2>
          <p className="text-[#475467] text-base mb-8">You start to notice:</p>
          <div className="space-y-4 mb-10">
            {painPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E9D7FE] shadow-sm">
                <XCircle className="text-red-500 flex-shrink-0" size={24} />
                <span className="text-[#101828] font-medium">{point}</span>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-gray-200">
            <p className="text-xl font-bold text-[#6024D0] italic">
              You Feel Replaceable <br />
              And That’s The Problem.
            </p>
          </div>
        </div>
        <div className="rounded-[40px] overflow-hidden shadow-2xl h-[500px]">
          <img 
            src={img.src}
            alt="Frustrated Professional" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;