import React from "react";
import { XCircle } from "lucide-react";
import { Montserrat } from "next/font/google";
import img from "@/assets/images/ProblemImage.png"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ProblemSection: React.FC = () => {
  const problems = [
    "You take courses... but still feel stuck",
    "You understand the theory, but can't execute",
    "You don't have real product experience",
    "You're not confident applying for roles",
  ];

  return (
    <section className={`${montserrat.className} bg-[#FDF4FF] py-20 px-6 md:px-12 lg:px-24`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col">
          <h2 className="text-[#15010D] text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight mb-6">
            The Problem With Learning <br className="hidden md:block" />
            Product Management Today
          </h2>
          
          <p className="text-[#15010D] opacity-60 text-lg mb-10 max-w-lg">
            Most people don't struggle because they can't learn. They struggle because they don't know how to apply what they've learned.
          </p>

          {/* Problem List */}
          <div className="space-y-4 mb-10">
            {problems.map((text, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-transparent hover:border-[#E11D48]/10 transition-all max-w-md md:max-w-full"
              >
                <XCircle className="w-6 h-6 text-[#E11D48] shrink-0" />
                <span className="text-[#15010D] font-medium text-base md:text-lg">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div className="h-[1px] bg-[#15010D]/10 w-full mb-10"></div>

          <h3 className="text-[#6024D0] text-xl md:text-2xl font-bold">
            That's Why We Built ProductPointers.
          </h3>
        </div>

        {/* Right Image */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-[550px] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl">
          <img 
            src={img.src}
            alt="Stressed professional thinking" 
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay to match the warm image tone */}
          <div className="absolute inset-0 bg-orange-900/10 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;