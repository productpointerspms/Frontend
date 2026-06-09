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
        <h2 className="text-[0.85rem] min-[375px]:text-sm sm:text-xl md:text-[30px] font-bold text-[#15010D] mb-6 tracking-tight leading-tight whitespace-nowrap sm:whitespace-normal">
          Start Your Product Journey The Right Way
        </h2>

        {/* Subtext */}
        <p className="text-[#15010D] opacity-60 text-[10px] min-[375px]:text-[11px] sm:text-sm md:text-[16px] leading-relaxed md:leading-[30px] font-normal mb-12 max-w-3xl mx-auto">
          <span className="whitespace-nowrap sm:whitespace-normal">Stop guessing your next step. Get the </span><br className="block md:hidden" />
          <span className="whitespace-nowrap sm:whitespace-normal">guidance, experience, and confidence you </span><br className="block md:hidden" />
          <span className="whitespace-nowrap sm:whitespace-normal">need to become a job-ready Product Manager.</span>
        </p>

        {/* Button Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {/* Apply Now Button */}
          <button className="bg-[#6024D0] hover:bg-[#4F1AB0] text-white px-10 py-5 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all min-w-[200px] cursor-pointer">
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Outline Button */}
          <button className="bg-white border border-[#15010D]/20 hover:bg-gray-50 text-[#15010D] px-10 py-5 rounded-2xl font-medium text-base transition-all min-w-[200px] cursor-pointer">
            Find the Right Program for You
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;