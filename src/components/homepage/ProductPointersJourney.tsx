import React from "react";
import {
  Layers,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  Target,
  ArrowRight,
} from "lucide-react";

interface JourneyStep {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const steps: JourneyStep[] = [
  {
    title: "Learn",
    description: "Build strong PM foundations through ProductPointers Accelerator Product Manager Program (PPAP).",
    color: "bg-[#22C55E]",
    icon: <Layers className="w-7 h-7 text-white" />,
  },
  {
    title: "Practice",
    description: "Work on real stakeholder problems. Through the ProductPointers Internship Program (PPIP).",
    color: "bg-[#F59E0B]",
    icon: <TrendingUp className="w-7 h-7 text-white" />,
  },
  {
    title: "Verify",
    description: "Generate evidence through User Interviews, Research, PRDs, MVPs, Product launches, Stakeholder Reviews and Mentor verification.",
    color: "bg-[#2D3E8E]",
    icon: <ShieldCheck className="w-7 h-7 text-white" />,
  },
  {
    title: "Showcase",
    description: "Build a public ProductPointers Talent Profile. Make your work visible.",
    color: "bg-[#4A4A2E]",
    icon: <Briefcase className="w-7 h-7 text-white" />,
  },
  {
    title: "Connect",
    description: "Increase visibility to recruiters, founders, and hiring managers.",
    color: "bg-[#7C3AED]",
    icon: <Target className="w-7 h-7 text-white" />,
  },
];

const ProductPointersJourney: React.FC = () => {
  return (
    <section className="w-full bg-[#FCF1FF] py-24 px-6 md:px-12 font-montserrat">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#1A1A1A] text-[1.18rem] min-[375px]:text-xl sm:text-2xl md:text-[29px] font-bold mb-4 tracking-tight">
            Your Step-By-Step Path<br className="block md:hidden" /> To Becoming A Product Manager
          </h2>
          <p className="text-gray-500 text-sm md:text-[18px] max-w-3xl mx-auto font-medium">
            We don&apos;t leave you guessing. Here&apos;s exactly how you go from learning to landing a role.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-0 w-full mb-16">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <div className="flex flex-col items-start text-left lg:flex-1 lg:max-w-[230px]">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-sm ${step.color}`}
                >
                  {step.icon}
                </div>
                <h3 className="text-[#1A1A1A] font-bold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <>
                  {/* Desktop horizontal arrow */}
                  <svg
                    className="hidden lg:block mt-7 shrink-0"
                    width="80"
                    height="20"
                    viewBox="0 0 80 20"
                    fill="none"
                  >
                    <line
                      x1="2"
                      y1="10"
                      x2="60"
                      y2="10"
                      stroke="#9CA3AF"
                      strokeWidth="2.5"
                      strokeDasharray="7 6"
                      strokeLinecap="round"
                    />
                    <polygon points="60,3 78,10 60,17" fill="#9CA3AF" />
                  </svg>

                  {/* Mobile vertical arrow */}
                  <svg
                    className="block lg:hidden my-4 ml-[22px] shrink-0"
                    width="20"
                    height="40"
                    viewBox="0 0 20 40"
                    fill="none"
                  >
                    <line
                      x1="10"
                      y1="0"
                      x2="10"
                      y2="26"
                      stroke="#9CA3AF"
                      strokeWidth="2.5"
                      strokeDasharray="7 6"
                      strokeLinecap="round"
                    />
                    <polygon points="3,26 10,38 17,26" fill="#9CA3AF" />
                  </svg>
                </>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center mt-4">
          <p className="text-[#4D5246] font-medium text-base md:text-[18px] mb-6">
            Not sure where to start? We&apos;ll guide you.
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
