import React from "react";
import { BadgeCheck, Zap, Target, TrendingUp, Globe, LucideIcon } from "lucide-react";

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: BadgeCheck,
    title: "Evidence Over Assumptions",
    description: "We believe proof matters more than claims.",
  },
  {
    icon: Zap,
    title: "Learning Through Doing",
    description: "Product Managers learn best by building.",
  },
  {
    icon: Target,
    title: "Ownership",
    description: "Growth comes from taking responsibility.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description: "Every project is an opportunity to learn.",
  },
  {
    icon: Globe,
    title: "Access",
    description: "Talent should not be limited by geography or background.",
  },
];

const CoreValues: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAE1FF] w-full px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <h2 className="text-[#15010D] text-2xl md:text-[34px] font-bold mb-16 tracking-tight text-center">
          Our Values
        </h2>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white border border-purple-100 rounded-3xl p-7 flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow h-full"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#6024D0] text-white rounded-xl flex items-center justify-center mb-8 shadow-md">
                <Icon className="w-5 h-5" />
              </div>

              {/* Text Content */}
              <h3 className="text-[#15010D] text-lg font-bold mb-4 leading-snug">
                {title}
              </h3>
              <p className="text-[#15010D]/60 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
