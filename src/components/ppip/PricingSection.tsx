import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const PricingSection: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-[#FCF1FF] py-20 px-6 md:px-12 lg:px-24`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
          Invest In Your Product Career
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-4 mb-12">
          A 12-week execution-focused internship where you move from learning
          about Product Management to building, launching, and documenting a real
          MVP you can showcase with confidence.
        </p>

        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-gray-50 p-8 text-center flex flex-col items-center">
          <span className="inline-block bg-[#F3E8FF] text-[#6024D0] rounded-full px-4 py-1.5 text-xs font-medium mb-6">
            Scholarship-Based Program
          </span>

          <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">
            Apply For The Internship
          </h3>

          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            The internship is free to apply for. Selected applicants will receive
            an acceptance email and are required to pay a commitment fee.
          </p>

          <p className="text-gray-400 line-through text-lg font-medium mb-5">
            ₦100,000 Program Fee
          </p>

          <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 text-sm text-[#1a1a1a] mb-5">
            <span className="text-base leading-none">🇳🇬</span>
            <span>NGN</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

          <div className="text-5xl md:text-6xl font-black text-[#1a1a1a] mb-8">
            ₦20,000
          </div>

          <Link
            href="/ppip/apply"
            className="w-full bg-[#6024D0] hover:bg-[#4d1ba8] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Limited internship slots available. Payment is only required after
            acceptance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
