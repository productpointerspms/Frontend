import React from "react";
import { Check } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CommunityStandardsSection = () => {
  const leftItems = [
    "Lifetime alumni network",
    "Ongoing growth support",
    "Access to community resources",
  ];

  const rightItems = [
    "Monthly accountability tracking",
    "Quarterly participation reviews",
    "Goal and growth monitoring",
  ];

  return (
    <div className={`${montserrat.className} bg-[#FAF5FF] py-24 px-6 md:px-16 lg:px-24`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">
        
        {/* Vertical Divider (Desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -translate-x-1/2" />

        {/* Left Column: Long-Term Community */}
        <div className="flex flex-col items-start">
          <div className="inline-block px-4 py-2 rounded-full border border-[#D8B4FE] bg-[#FAE1FF] text-[#6024D0] text-xs font-medium mb-8">
            Lifetime Alumni Access
          </div>
          
          <h2 className="text-[#15010D] text-2xl md:text-[37px] font-bold leading-tight mb-8">
            A Long-Term Community Built For Continuous Growth
          </h2>
          
          <p className="text-[#15010D]/60 text-base leading-relaxed mb-10">
            Once you gain access through any ProductPointers program, you become part 
            of a lifetime ecosystem designed to support your Product Management growth 
            through accountability, networking, mentorship, resources, and continuous development.
          </p>

          <div className="space-y-4 w-full max-w-md">
            {leftItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex-shrink-0">
                  <Check className="text-[#22C55E] w-5 h-5" />
                </div>
                <span className="text-[#15010D] font-medium text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Commitment Matters */}
        <div className="flex flex-col items-start">
          <div className="inline-block px-4 py-2 rounded-full border border-[#D8B4FE] bg-[#FAE1FF] text-[#6024D0] text-xs font-medium mb-8">
            Community Standards
          </div>
          
          <h2 className="text-[#15010D] text-2xl md:text-[37px] font-bold leading-tight mb-8">
            Commitment Matters Here
          </h2>
          
          <p className="text-[#15010D]/60 text-base leading-relaxed mb-6">
            The ProductPointers Community is designed for active participation and 
            intentional growth. Members are expected to maintain at least 70% quarterly 
            engagement to retain access to the community.
          </p>

          <p className="text-[#6024D0]/80 text-sm leading-relaxed mb-10">
            Members who lose access can rejoin through a yearly reactivation process, 
            provided they remain committed to community standards and participation 
            expectations moving forward.
          </p>

          <div className="space-y-4 w-full max-w-md">
            {rightItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex-shrink-0">
                  <Check className="text-[#22C55E] w-5 h-5" />
                </div>
                <span className="text-[#15010D] font-medium text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommunityStandardsSection;