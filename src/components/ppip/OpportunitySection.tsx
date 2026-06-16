import React from "react";
import { Check, XCircle } from "lucide-react";
import { Montserrat } from "next/font/google";
import img from "@/assets/images/ppipimg.png";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const have = ["Knowledge", "Certificates", "Case Studies"];
const lack = [
  "Real Product Experience",
  "Verified Work",
  "Public Evidence",
  "Employer Trust",
];

const OpportunitySection: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-[#FCF1FF] py-20 px-6 md:px-12 lg:px-24`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top: text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left text */}
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              Why Most Aspiring PMs Never Get
              The Opportunity:
            </h2>

            <div className="space-y-2 text-gray-500 text-sm md:text-base">
              <p>You completed a PM course.</p>
              <p>You earned a certificate.</p>
              <p>You updated your LinkedIn profile. Yet recruiters still ask:</p>
            </div>

            <p className="text-[#6024D0] italic font-semibold text-base my-5">
              &quot;Do You Have Experience?&quot;
            </p>

            <p className="text-gray-500 text-sm md:text-base">
              The problem isn&apos;t your potential. The problem is that employers
              cannot see proof.
            </p>

            <hr className="border-t border-gray-200 mt-10" />
          </div>

          {/* Right image */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src={img.src}
              alt="A resume on a desk beside a laptop"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        {/* Bottom: have vs lack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {/* Have */}
          <div>
            <p className="text-gray-400 text-base mb-5">Most aspiring PMs have:</p>
            <div className="space-y-4">
              {have.map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-3"
                >
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-[#1a1a1a] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lack */}
          <div>
            <p className="text-gray-400 text-base mb-5">But lack:</p>
            <div className="space-y-4">
              {lack.map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-3"
                >
                  <Check className="w-5 h-5 text-green-500 shrink-0" strokeWidth={3} />
                  <span className="text-[#1a1a1a] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpportunitySection;
