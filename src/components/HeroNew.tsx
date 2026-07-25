import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Search,
  BadgeCheck,
  Eye,
  Briefcase,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import user1 from "@/assets/images/eniola.png";
import user2 from "@/assets/images/mercy.png";
import user3 from "@/assets/images/udochukwu.png";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const journey = [
  { icon: BookOpen, label: "Learn PM" },
  { icon: Search, label: "Work On Real Problems" },
  { icon: BadgeCheck, label: "Build Verified Evidence" },
  { icon: Eye, label: "Gain Recruiter Visibility" },
  { icon: Briefcase, label: "Get Hired" },
];

const HeroNew: React.FC = () => {
  return (
    <section className={`${montserrat.className} bg-[#FDF4FF] min-h-screen pt-10 md:pt-15 pb-20 px-4 md:px-12 lg:px-24 flex items-center`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-16 lg:gap-y-16 items-center">

        {/* Left Content */}
        <div className="flex flex-col items-start text-left order-1 lg:order-1">
          <h1 className="text-[#0C1115] text-[28px] md:text-[44px] font-extrabold leading-[1.15] md:leading-[52px] mb-8 max-w-[620px] text-left">
            We&apos;re Building The Bridge Between Learning Product Management And Getting Hired.
          </h1>

          <p className="text-[#15010D] opacity-70 text-base md:text-lg max-w-[540px] leading-relaxed mb-10">
            Most aspiring Product Managers don&apos;t struggle because they lack
            knowledge. They struggle because they lack trusted evidence that they
            can do the work. ProductPointers exists to solve that problem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto justify-start">
            <Link
              href="/#upcoming-programs"
              className="bg-[#6024D0] hover:bg-[#4F1AB0] text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#upcoming-programs"
              className="bg-transparent border border-[#15010D]/20 hover:bg-[#F9E5FF] text-[#15010D] px-8 py-4 rounded-xl font-medium text-base transition-all cursor-pointer w-full sm:w-auto flex items-center justify-center"
            >
              Find Your Program
            </Link>
          </div>
        </div>

        {/* Right: Journey Timeline */}
        <div className="w-full order-2 lg:order-2 border border-[#EBD9F7] rounded-3xl p-6 md:p-8 bg-white/30">
          <div className="relative">
            {/* Connecting vertical line */}
            <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-[#E4CCF5] -translate-x-1/2" />

            <div className="space-y-6">
              {journey.map(({ icon: Icon, label }, i) => (
                <div key={i} className="relative flex items-center gap-4">
                  {/* Icon circle */}
                  <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-[#FAE1FF] border-2 border-[#E4CCF5] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#6024D0]" />
                  </div>
                  {/* Label card */}
                  <div className="flex-1 bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-4">
                    <span className="text-sm md:text-base font-medium text-[#1A1A1A]">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-3 justify-start order-3 lg:order-3">
          <div className="flex -space-x-3">
            {[user1, user3, user2].map((userImg, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-[3px] border-[#FCF1FF] overflow-hidden bg-gray-200 shadow-sm">
                <img src={userImg.src} alt={`User ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-[10px] min-[375px]:text-xs md:text-sm text-[#15010D] opacity-60 whitespace-nowrap">
            Trusted by <span className="font-bold opacity-100">300+</span> aspiring Product Managers building real experience
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
