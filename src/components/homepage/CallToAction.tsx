import React from "react";
import { ArrowRight } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CallToAction: React.FC = () => {
  return (
    <section 
      className={`${montserrat.className} bg-white w-full py-24 px-6 flex flex-col items-center justify-center text-center`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-[42px] font-bold text-[#15010D] mb-6 tracking-tight leading-tight">
          Start Your Product Journey The Right Way
        </h2>

        {/* Subtext */}
        <p className="text-[#15010D] opacity-60 text-lg md:text-[22px] leading-relaxed md:leading-[34px] font-normal mb-12 max-w-3xl mx-auto">
          Stop guessing your next step. Get the guidance, experience, and confidence
          you need to become a job-ready Product Manager.
        </p>

        {/* Button Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {/* Apply Now Button */}
          <button className="bg-[#6024D0] hover:bg-[#4F1AB0] text-white px-10 py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all min-w-[200px]">
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Outline Button */}
          <button className="bg-white border border-[#15010D]/20 hover:bg-gray-50 text-[#15010D] px-10 py-5 rounded-2xl font-medium text-lg transition-all min-w-[200px]">
            Find the Right Program for You
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;