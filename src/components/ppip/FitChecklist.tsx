import React from "react";
import { Check, XCircle } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const forYou: string[] = [
  "PM course graduates",
  "Career switchers",
  "Associate PM aspirants",
  "Early-career PMs",
  "Founders interested in PM",
  "Anyone who understands PM basics but lacks experience",
];

const notForYou: string[] = [
  "You're looking for passive learning",
  "You want another certificate",
  "You're unwilling to conduct interviews",
  "You're unwilling to work with a team",
  "You're not ready to build publicly",
  "You're looking for shortcuts",
];

const FitChecklist: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-[#FCF1FF] py-20 px-6 md:px-12 lg:px-24`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* For you */}
        <div>
          <p className="text-gray-400 text-lg mb-6">PPIP is for:</p>
          <ul className="space-y-4">
            {forYou.map((item) => (
              <li
                key={item}
                className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-green-500 shrink-0" strokeWidth={2.5} />
                <span className="text-[#1a1a1a] text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not for you */}
        <div>
          <p className="text-gray-400 text-lg mb-6">This Is NOT For You If...</p>
          <ul className="space-y-4">
            {notForYou.map((item) => (
              <li
                key={item}
                className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-3"
              >
                <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-[#1a1a1a] text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FitChecklist;
