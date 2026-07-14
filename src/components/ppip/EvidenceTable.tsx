import React from "react";
import { Check } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type EvidenceRow = {
  deliverable: string;
  method: string;
};

const rows: EvidenceRow[] = [
  { deliverable: "Stakeholder Discovery", method: "Recorded Stakeholder Session" },
  { deliverable: "User Interviews", method: "Interview recordings" },
  { deliverable: "Validation Report", method: "Mentor review" },
  { deliverable: "PRD", method: "Mentor + Founder review" },
  { deliverable: "MVP", method: "Functional walkthrough" },
  { deliverable: "User Testing", method: "Testing recordings" },
  { deliverable: "Launch", method: "Public product URL" },
  { deliverable: "Impact Report", method: "Impact Report" },
  { deliverable: "Final Presentation", method: "Recorded demo" },
];

const EvidenceTable: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-[#FAE1FF] py-20 px-6 md:px-12 lg:px-24`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
            Every Claim Must Be Backed By Evidence
          </h2>
          <p className="text-gray-500 mt-4">
            Unlike traditional portfolios, every major deliverable is verified.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-50 max-w-4xl mx-auto overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-2 bg-[#FBF0FF] px-6 md:px-10 py-5">
            <span className="text-gray-400 text-base md:text-lg">Deliverable</span>
            <span className="text-gray-400 text-base md:text-lg pl-4 md:pl-8">
              Verification Method
            </span>
          </div>

          {/* Rows */}
          <div>
            {rows.map((row, index) => (
              <div
                key={row.deliverable}
                className={`grid grid-cols-2 px-6 md:px-10 py-5 items-center ${
                  index === 0 ? "" : "border-t border-gray-100"
                }`}
              >
                <span className="text-[#1a1a1a] text-sm md:text-base">
                  {row.deliverable}
                </span>
                <div className="flex items-center gap-3 pl-4 md:pl-8">
                  <Check className="w-5 h-5 text-green-500 shrink-0" strokeWidth={3} />
                  <span className="text-[#1a1a1a] text-sm md:text-base">
                    {row.method}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-t border-black/10 max-w-4xl mx-auto mt-12" />
        <p className="mt-8 text-center text-[#6024D0] font-semibold italic text-lg">
          No Assumptions. No Self-Reported Claims. Only Evidence.
        </p>
      </div>
    </section>
  );
};

export default EvidenceTable;
