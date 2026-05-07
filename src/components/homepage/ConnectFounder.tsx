import React from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

const LinkedinIcon = ({ className = "w-6 h-6 text-white" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const ConnectFounder: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-white font-montserrat overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left Content */}
        <div className="flex-1">
          {/* LinkedIn Icon Box */}
          <div className="w-14 h-14 bg-[#0077B5] rounded-lg flex items-center justify-center mb-8">
            <LinkedinIcon className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-[36px] md:text-[52px] font-bold text-[#15010D] leading-[1.1] mb-6">
            Connect with Our
            <br />
            Founder
          </h2>

          <p className="text-[#6D6D6D] text-[18px] mb-8 leading-relaxed max-w-md">
            Follow the journey, insights, and real product experiences directly
            from the founder.
          </p>

          <a
            href="https://www.linkedin.com/in/blessing-okomor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0077B5] text-white px-6 py-3.5 rounded-full font-medium hover:bg-[#006097] transition-colors mb-12 shadow-sm text-sm"
          >
            <LinkedinIcon className="w-5 h-5 text-white" />
            Connect on LinkedIn
            <ArrowRight size={18} />
          </a>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#5C1CC5] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                8K+
              </div>
              <span className="text-[#6D6D6D] text-sm font-medium">
                Followers
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#5C1CC5] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                500+
              </div>
              <span className="text-[#6D6D6D] text-sm font-medium">Posts</span>
            </div>
          </div>
        </div>

        {/* Right Content - Image with Floating Badges */}
        <div className="flex-1 relative w-full mt-10 md:mt-0 flex justify-end">
          <div className="relative w-full aspect-[4/5] max-w-[480px]">
            <Image
              src="/images/blessing1.png"
              alt="Blessing Okomor - Founder"
              fill
              className="object-cover rounded-[32px]"
            />

            {/* Top Right Badge */}
            <div className="absolute -right-4 md:-right-8 top-12 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 w-max border border-gray-50 z-10">
              <div className="w-10 h-10 bg-[#0077B5] rounded-lg flex items-center justify-center">
                <LinkedinIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-[11px] text-[#6D6D6D] font-medium leading-tight">
                  Response Time
                </span>
                <span className="text-[13px] font-bold text-[#15010D] leading-tight">
                  Within 24h
                </span>
              </div>
            </div>

            {/* Bottom Left Badge */}
            <div className="absolute -left-4 md:-left-12 bottom-12 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 w-max border border-gray-50 z-10">
              <div className="w-10 h-10 bg-[#00C26D] rounded-lg flex items-center justify-center">
                <Check className="text-white w-6 h-6 stroke-[3]" />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-[11px] text-[#6D6D6D] font-medium leading-tight">
                  Active on LinkedIn
                </span>
                <span className="text-[13px] font-bold text-[#15010D] leading-tight">
                  Posting Weekly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectFounder;
