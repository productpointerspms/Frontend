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
      icon: <Layers className="w-4 h-4 text-white" />,
    },
    {
      acronym: "PPMP",
      title: "Transformation",
      description: "Turn your knowledge into real product execution skills.",
      color: "bg-[#10B981]",
      icon: <TrendingUp className="w-4 h-4 text-white" />,
    },
    {
      acronym: "PPIP",
      title: "Experience",
      description: "Work on real products and gain hands-on experience.",
      color: "bg-[#F59E0B]",
      icon: <Briefcase className="w-4 h-4 text-white" />,
    },
    {
      acronym: "PPCP",
      title: "Personalized",
      description: "Position yourself as a confident, job-ready PM.",
      color: "bg-[#EA580C]",
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
    },
    {
      acronym: "PPTP",
      title: "Specialization",
      description: "Deepen your expertise and stand out as a leader.",
      color: "bg-[#EF4444]",
      icon: <Target className="w-4 h-4 text-white" />,
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center w-full px-4 py-12 bg-[#FDF4FF]">
      {/* Header */}
      <div className="text-center mb-10 max-w-2xl">
        <h2 className="text-2xl md:text-[28px] font-bold text-[#15010D] mb-2 leading-tight">
          Your Step-By-Step Path To Becoming A Product Manager
        </h2>
        <p className="text-sm md:text-base text-gray-500 font-medium px-4">
          We don't leave you guessing. Here's exactly how you go from learning to landing a role.
        </p>
      </div>

      {/* Horizontal Steps Container */}
      {/* Added 'scrollbar-hide' and refined 'gap' to ensure it fits comfortably */}
      <div className="flex flex-row flex-nowrap justify-center items-start gap-1 md:gap-3 w-full max-w-[1100px] overflow-x-auto overflow-y-hidden [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Card */}
            <div className="flex flex-col items-start min-w-[130px] md:min-w-[165px] flex-shrink-1">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step.color} mb-3 shadow-sm shrink-0`}>
                {step.icon}
              </div>
              <h3 className="text-xs md:text-sm font-bold text-gray-900 leading-none mb-1">
                {step.acronym}
              </h3>
              <h4 className="text-[11px] md:text-xs font-semibold text-gray-800 mb-1.5 uppercase tracking-wide">
                {step.title}
              </h4>
              <p className="text-[10px] md:text-[11px] text-gray-600 leading-[1.4] max-w-[150px]">
                {step.description}
              </p>
            </div>

            {/* Dashed Connector - Smaller & Tighter */}
            {index !== steps.length - 1 && (
              <div className="hidden md:flex items-center pt-5 shrink-0">
                <div className="w-6 lg:w-10 border-b-[1.5px] border-dashed border-gray-400 relative">
                  <div className="absolute -right-0.5 -top-[3.5px] border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[5px] border-l-gray-400" />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm font-semibold text-[#582208] mb-5">
          Not sure where to start? We'll guide you.
        </p>
        <button className="flex items-center gap-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-transform active:scale-95 shadow-md cursor-pointer">
          Find the Right Program for You
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};

export default ProductPointersJourney;