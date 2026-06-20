import React from "react";
import { 
  Layers, 
  TrendingUp, 
  Briefcase, 
  ShieldCheck, 
  Target, 
  ArrowRight
} from "lucide-react";

interface JourneyStep {
  acronym: string;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const ProductPointersJourney: React.FC = () => {
  const steps: JourneyStep[] = [
    {
      acronym: "PPAP",
      title: "Foundation",
      description: "Build the core thinking and structure you've been missing.",
      color: "bg-[#7C3AED]",
      icon: <Layers className="w-6 h-6 text-white" />,
    },
    {
      acronym: "PPIP",
      title: "Experience",
      description: "Work on real products and gain hands-on experience",
      color: "bg-[#10B981]",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
    {
      acronym: "PPMP",
      title: "Job-Ready PM",
      description: "Position yourself as a confident, job-ready Product Manager",
      color: "bg-[#F59E0B]",
      icon: <Briefcase className="w-6 h-6 text-white" />,
    },
    {
      acronym: "PPTP",
      title: "Specialization",
      description: "Deepen your expertise, and stand out as a high-impact Product Manager",
      color: "bg-[#EA580C]",
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
    },
    {
      acronym: "PPCP",
      title: "Personalized",
      description: "One on One personalized coaching for founders, professionals and individuals",
      color: "bg-[#EF4444]",
      icon: <Target className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="w-full bg-[#FCF1FF] py-24 px-6 font-montserrat">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <h2 className="text-[#1A1A1A] text-[1.18rem] min-[375px]:text-xl sm:text-2xl md:text-[29px] font-bold mb-4 text-center tracking-tight">
          Your Step-By-Step Path<br className="block md:hidden" /> To Becoming A Product Manager
        </h2>
        <p className="text-gray-500 text-sm md:text-[18px] text-center mb-24 max-w-3xl font-medium">
          We don't leave you guessing. Here's exactly how you go from learning to landing a role.
        </p>

        {/* Steps Container */}
        <div className="flex flex-col md:flex-row md:items-start w-full relative mb-20 gap-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-row md:flex-col items-stretch md:items-start text-left flex-1 relative md:px-2"
            >
              {/* Icon + connector */}
              <div className="flex flex-col md:flex-row items-center md:w-full mr-5 md:mr-0 md:mb-6 relative">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${step.color} shrink-0 z-10 shadow-sm`}>
                  {step.icon}
                </div>

                {index !== steps.length - 1 && (
                  <>
                    {/* Mobile vertical connector */}
                    <div className="md:hidden flex-1 border-l-[2px] border-dashed border-gray-400 my-2" />
                    {/* Desktop horizontal connector */}
                    <div className="hidden md:flex flex-1 items-center ml-4 mr-1 relative z-0">
                      <div className="flex-1 border-b-[2px] border-dashed border-gray-800" />
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-gray-800 -ml-[1px]" />
                    </div>
                  </>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 pb-10 md:pb-0">
                <h3 className="text-[#1A1A1A] font-bold text-[19px] mb-1">{step.acronym}</h3>
                <h4 className="text-gray-800 font-semibold text-[13px] mb-3">{step.title}</h4>
                <p className="text-gray-500 text-[13px] md:text-[12px] leading-relaxed md:pr-4">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center mt-4">
          <p className="text-[#4D5246] font-medium text-base md:text-[18px] mb-6">
            Not sure where to start? We'll guide you.
          </p>
          <button className="bg-[#5C1CC5] hover:bg-[#4a15a0] text-white text-sm font-medium px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-lg cursor-pointer">
            Find the Right Program for You <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default ProductPointersJourney;