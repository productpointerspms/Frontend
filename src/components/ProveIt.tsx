import React from "react";
import { XCircle, Check } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const rows: { traditional: string; productpointers: string }[] = [
  { traditional: "Focus on learning", productpointers: "Focus on evidence" },
  { traditional: "Certificates", productpointers: "Verified experience" },
  { traditional: "Simulated projects", productpointers: "Real stakeholder problems" },
  { traditional: "Graduation", productpointers: "Talent visibility" },
  { traditional: "Portfolio claims", productpointers: "Public proof of work" },
];

const ProveIt: React.FC = () => {
  return (
    <section className={`${montserrat.className} bg-[#F8E8FF] py-20 px-6 md:px-12`}>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-[32px] font-bold text-[#15010D] mb-3">
            We Don&apos;t Just Teach Product Management.
          </h2>
          <h3 className="text-xl md:text-[32px] font-bold text-[#6024D0]">
            We Help You Prove It.
          </h3>
        </div>

        {/* Comparison Card */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-2 bg-[#FBF0FF] px-6 md:px-10 py-5">
            <span className="text-gray-400 text-sm md:text-lg">
              Traditional Programs
            </span>
            <span className="text-gray-400 text-sm md:text-lg pl-4 md:pl-8">
              ProductPointers
            </span>
          </div>

          {/* Rows */}
          <div className="relative">
            {/* Vertical divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2" />

            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 px-6 md:px-10 py-5 ${
                  i > 0 ? "border-t border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3 pr-2">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-[#1A1A1A] text-sm md:text-base">
                    {row.traditional}
                  </span>
                </div>
                <div className="flex items-center gap-3 pl-4 md:pl-8">
                  <Check className="w-5 h-5 text-green-500 shrink-0" strokeWidth={3} />
                  <span className="text-[#1A1A1A] text-sm md:text-base">
                    {row.productpointers}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProveIt;
