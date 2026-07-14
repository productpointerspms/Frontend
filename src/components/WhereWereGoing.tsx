import React from "react";
import { Check } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const visions = [
  "Recruiters don't have to guess who can do the work.",
  "Aspiring Product Managers don't have to struggle to prove themselves.",
  "A future where ProductPointers become the trusted place to discover product talent.",
];

const WhereWereGoing: React.FC = () => {
  return (
    <section className={`${montserrat.className} bg-[#FAF0FF] py-20 px-6 md:px-12`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-[34px] font-bold text-[#15010D] mb-3">
            Where We&apos;re Going
          </h2>
          <p className="text-base md:text-lg text-gray-500">
            We envision a future where:
          </p>
        </div>

        {/* Vision Cards */}
        <div className="space-y-6">
          {visions.map((text, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm px-6 py-6 flex items-center gap-5"
            >
              <div className="w-12 h-12 rounded-full bg-[#F4EBFF] flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-[#6024D0]" strokeWidth={2.5} />
              </div>
              <p className="text-[#1A1A1A] font-medium text-base md:text-lg leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhereWereGoing;
