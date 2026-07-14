import React from "react";
import { Briefcase, Globe, Eye, ShieldCheck } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const beliefs = [
  { icon: Briefcase, label: "Experience" },
  { icon: Globe, label: "Exposure" },
  { icon: Eye, label: "Visibility" },
  { icon: ShieldCheck, label: "Credibility" },
];

const WhatWeBelieve: React.FC = () => {
  return (
    <section className={`${montserrat.className} py-20 px-6 bg-[#5C1CC5] w-full text-white`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-[26px] md:text-[35px] font-bold mb-6">
          What We Believe
        </h2>

        <p className="text-lg md:text-xl font-bold mb-6">
          At ProductPointers, we believe:
        </p>

        <p className="text-base md:text-lg opacity-80 mb-6">
          Talent is everywhere. Opportunity is not.
        </p>

        <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed mb-10">
          There are talented aspiring Product Managers across Africa and beyond
          who have the potential to succeed. What they often lack is:
        </p>

        {/* Belief Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {beliefs.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-white rounded-xl px-5 py-3 flex items-center gap-2.5 shadow-sm"
            >
              <Icon className="w-4 h-4 text-[#6024D0]" />
              <span className="text-[#1A1A1A] font-medium text-sm md:text-base">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <p className="text-sm md:text-base italic font-medium opacity-95 max-w-3xl mx-auto leading-relaxed">
          We believe talent should be evaluated by demonstrated capability, not
          just credentials.
        </p>
      </div>
    </section>
  );
};

export default WhatWeBelieve;
