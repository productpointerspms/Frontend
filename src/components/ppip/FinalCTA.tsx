import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const FinalCTA: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-white py-20 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center`}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl lg:text-2xl font-bold text-[#1a1a1a] leading-snug">
          The PM Job Market Doesn&apos;t Reward Learning Alone.
          <br />
          <span className="text-[#6024D0] italic">It Rewards Proof.</span>
        </h2>

        <p className="text-gray-500 mt-6 mb-10 max-w-2xl">
          Join the ProductPointers Product Apprenticeship and build the
          experience, evidence, and visibility needed to stand out.
        </p>

        <Link
          href="/ppip/apply"
          className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2 transition-colors"
        >
          Apply for PPIP Batch 3
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-gray-400 text-sm mt-10">
          Limited Cohort Size <span className="mx-2">•</span> Real Stakeholder
          Projects <span className="mx-2">•</span> Verified Product Experience
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
