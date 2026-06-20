import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Montserrat } from "next/font/google";
import eniolaImg from "@/assets/images/eniola.png";
import udochukwuImg from "@/assets/images/udochukwu.png";
import mercyImg from "@/assets/images/mercy.png";

const avatars = [eniolaImg, udochukwuImg, mercyImg];

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const HeroSection: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-[#FCF1FF] py-15 px-6 md:px-12 lg:px-24 min-h-[80vh] flex flex-col items-center justify-center text-center`}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <span className="border border-[#a855f7] text-[#a855f7] bg-[#FAE1FF] rounded-full px-4 py-1.5 text-xs font-semibold mb-8">
          10-Week Product Internship
        </span>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#1a1a1a] leading-[1.15] mb-6 ">
          Turn Your Product Management
          Knowledge Into Proven Experience
        </h1>

        <p className="text-gray-600 text-base md:text-lg mb-8">
          Most aspiring Product Managers don&apos;t struggle because they lack knowledge. They struggle because they lack trusted evidence. PPIP is a 12-week program where you&apos;ll work on real stakeholder challenges, build and launch products, create verified evidence of your capabilities, and become visible to recruiters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/ppip/apply"
            className="inline-flex items-center justify-center gap-2 bg-[#6024D0] hover:bg-[#4d1ba8] text-white px-8 py-4 rounded-xl font-medium transition-colors"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="border border-gray-400 text-[#1a1a1a] px-8 py-4 rounded-xl font-medium hover:bg-white transition-colors">
            See How It Works
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-8">
          Date: July 8th – October 14th, 2026  • <br /> Duration: 10 Weeks
        </p>

        <div className="flex items-center gap-4 justify-center">
          <div className="flex -space-x-3">
            {avatars.map((avatar, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-[#FAF5FF] bg-gray-300 overflow-hidden relative shadow-sm"
              >
                <img
                  src={avatar.src}
                  alt={`Student ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-[13px] text-gray-600">
            Join 300+ aspiring Product Managers who started here
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
