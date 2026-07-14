import React from "react";
import {
  Layers,
  Hammer,
  BadgeCheck,
  Trophy,
  Users,
  LucideIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  bg: string;
}

const steps: Step[] = [
  {
    icon: Layers,
    title: "Learn",
    description:
      "Build strong PM foundations through ProductPointers Accelerator Product Manager Program (PPAP).",
    bg: "#22C55E",
  },
  {
    icon: Hammer,
    title: "Practice",
    description:
      "Work on real stakeholder problems. Through the ProductPointers Internship Program (PPIP).",
    bg: "#F59E0B",
  },
  {
    icon: BadgeCheck,
    title: "Verify",
    description:
      "Generate evidence through User Interviews, Research, PRDs, MVPs, Product launches, Stakeholder Reviews and Mentor verification.",
    bg: "#2D3E8E",
  },
  {
    icon: Trophy,
    title: "Showcase",
    description:
      "Build a public ProductPointers Talent Profile. Make your work visible.",
    bg: "#4A4A2E",
  },
  {
    icon: Users,
    title: "Connect",
    description:
      "Increase visibility to recruiters, founders, and hiring managers.",
    bg: "#7C3AED",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className={`${montserrat.className} bg-[#FDF4FF] py-20 px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-[34px] font-bold text-[#15010D] mb-4">
            How ProductPointers Works
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We help aspiring Product Managers move from learning to employability
            through a structured pathway.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.title}>
                <div className="flex flex-col items-start text-left lg:flex-1 lg:max-w-[230px]">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-sm"
                    style={{ backgroundColor: step.bg }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {i < steps.length - 1 && (
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
