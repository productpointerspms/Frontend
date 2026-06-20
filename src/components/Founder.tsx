import React from "react";
import { Quote, Linkedin, ArrowRight } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const story = [
  "ProductPointers was born from a simple observation:",
  "Many aspiring Product Managers were learning. Few were getting opportunities.",
  "After working with aspiring PMs, reviewing portfolios, and speaking with recruiters,",
  "we realized the issue wasn't a lack of talent. The issue was a lack of trusted evidence.",
  "That insight led us to rethink what Product Management education should look like. Today, ProductPointers is building the infrastructure that helps aspiring Product Managers gain experience, build credibility, and become discoverable.",
];

const Founder: React.FC = () => {
  return (
    <section className={`${montserrat.className} w-full bg-[#FDF4FF] py-20 px-6 md:px-12 lg:px-24 text-[#15010D]`}>
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-[37px] font-bold leading-tight">
          Why We Built ProductPointers
        </h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">

        {/* Left: Image with Border Accent */}
        <div className="relative flex flex-col items-center shrink-0">
          <div className="relative">
            {/* Purple Offset Background */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-[#6024D0] rounded-[32px] z-0"></div>

            {/* Founder Image */}
            <div className="relative z-10 w-[320px] md:w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl">
              <img
                src="/images/Founder-Pic.png"
                alt="Blessing Okomor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* LinkedIn Button */}
          <button className="mt-8 w-full bg-white hover:bg-gray-50 text-[#6024D0] px-6 py-3 rounded-2xl flex items-center justify-center gap-3 shadow-md transition-all font-semibold cursor-pointer">
            <div className="bg-[#0077B5] p-1 rounded-md">
              <Linkedin className="w-4 h-4 text-white fill-white" />
            </div>
            <span>Connect on Linkedin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Story */}
        <div className="flex-1">
          {/* Quote Icon & Name */}
          <div className="flex items-start gap-3 mb-10">
            <Quote className="w-8 h-8 text-[#6024D0] rotate-180 fill-[#6024D0] shrink-0" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#15010D]">Blessing Okomor</h3>
              <p className="text-[#6024D0] font-medium">Founder, ProductPointers</p>
            </div>
          </div>

          {/* Story Paragraphs */}
          <div className="space-y-5">
            {story.map((paragraph, index) => (
              <p key={index} className="text-[#15010D] opacity-60 leading-relaxed text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Founder;
