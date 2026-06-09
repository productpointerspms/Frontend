import React from "react";
import { Check } from "lucide-react";
import { Montserrat } from "next/font/google";
import img from "@/assets/images/ProblemImage.png";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const learnItems = [
  "Take PM courses",
  "Watch PM videos",
  "Earn certificates",
  "Complete bootcamps",
];

const confidenceItems = [
  "Discover problems",
  "Talk to users",
  "Make product decisions",
  "Collaborate effectively",
  "Execute successfully",
];

const Pill: React.FC<{ children: React.ReactNode; full?: boolean }> = ({
  children,
  full,
}) => (
  <div
    className={`bg-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm ${
      full ? "w-full" : ""
    }`}
  >
    <Check className="w-5 h-5 text-green-500 shrink-0" strokeWidth={3} />
    <span className="text-[#1A1A1A] font-semibold text-sm md:text-base">
      {children}
    </span>
  </div>
);

const CareerGapSection: React.FC = () => {
  return (
    <section className={`${montserrat.className} bg-[#FAE1FF] py-20 px-6 md:px-12 lg:px-24`}>
      <div className="max-w-7xl mx-auto">
        {/* Top: 2-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="flex flex-col">
            <h2 className="text-[#15010D] text-2xl md:text-[32px] font-bold leading-tight mb-4">
              The Product Management Career Gap
            </h2>

            <p className="text-[#15010D] opacity-50 text-base mb-6">
              Every year, thousands of people:
            </p>

            {/* Learn list */}
            <div className="space-y-4">
              {learnItems.map((text) => (
                <Pill key={text} full>
                  {text}
                </Pill>
              ))}
            </div>

            {/* Emphasis */}
            <p className="text-[#6024D0] italic font-medium leading-relaxed mt-8">
              Yet Many Still Struggle To Secure Opportunities. Why? Because
              Employers Don&apos;t Hire Knowledge. They Hire Confidence.
            </p>

            {/* Divider */}
            <div className="h-px bg-[#15010D]/10 w-full mt-8" />
          </div>

          {/* Right Image */}
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-full lg:min-h-[560px] rounded-[28px] overflow-hidden shadow-xl">
            <img
              src={img.src}
              alt="Stressed professional at laptop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Confidence (full width) */}
        <div className="mt-10">
          <p className="text-[#15010D] opacity-50 text-base mb-5">
            Confidence that someone can:
          </p>
          <div className="flex flex-wrap gap-4">
            {confidenceItems.map((text) => (
              <Pill key={text}>{text}</Pill>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <p className="text-center text-[#6024D0] text-base md:text-lg leading-relaxed max-w-4xl mx-auto mt-14">
          Unfortunately, most aspiring Product Managers have no trusted way to
          prove these capabilities. That&apos;s the gap we exist to close.
        </p>
      </div>
    </section>
  );
};

export default CareerGapSection;
