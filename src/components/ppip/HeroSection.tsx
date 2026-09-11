"use client";

import React from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { useProgramDates, formatDateRange } from "@/lib/useProgramDates";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const HeroSection: React.FC = () => {
  const { startTime, endTime } = useProgramDates("PPIP");

  const datesText =
    startTime && endTime
      ? formatDateRange(startTime, endTime)
      : "October 12 - Dec 18, 2026";

  const features = [
    "12 WEEKS",
    "HANDS-ON EXPERIENCE",
    "REAL PRODUCT CHALLENGES",
    "MENTORSHIP & FEEDBACK",
    "PORTFOLIO-READY EVIDENCE",
  ];

  return (
    <section
      className={`${montserrat.className} relative isolate min-h-screen w-full overflow-hidden bg-[#07010F] text-white`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/ppip/hero.png')",
        }}
      />

      {/* Purple Image Tint */}
      <div className="absolute inset-0 -z-10 bg-[#321052]/30" />

      {/* Dark Purple Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#180529]/65 via-[#16032C]/55 to-[#07000F]/95" />

      {/* Strong Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[48%] bg-gradient-to-t from-[#07010F] via-[#07010F]/85 to-transparent" />

      {/* Main Hero Content */}
      <div
        className="
          relative z-10
          mx-auto flex w-full max-w-[1180px]
          flex-col items-center text-center
          px-5 sm:px-6
          pt-[18vh]
          pb-[130px]
        "
      >
        {/* Badge */}
        <div
          className="
            mb-7 inline-flex items-center justify-center
            rounded-full
            border border-white/60
            bg-white/[0.03]
            px-4 py-2
            backdrop-blur-sm
            sm:px-5
          "
        >
          <span
            className="
              text-[10px] font-semibold uppercase
              tracking-[0.12em] text-white
              sm:text-[11px] md:text-xs
            "
          >
            PRODUCTPOINTERS APPRENTICESHIP PROGRAM
          </span>
        </div>

        {/* Heading */}
        <h1
          className="
            mb-6
            max-w-[1080px]
            text-[30px]
            font-extrabold
            leading-[1.08]
            tracking-[-0.035em]
            text-white
            sm:text-[48px]
            md:text-[58px]
            lg:text-[64px]
          "
        >
          <span className="block">
            Turn Your Product Management
          </span>

          <span className="block">
            Knowledge Into{" "}
            <span className="text-[#FFB20F]">Practical</span>
          </span>

          <span className="block text-[#FFB20F]">
            Experience.
          </span>
        </h1>

        {/* Description */}
        <p
          className="
            mb-9
            max-w-[750px]
            text-[14px]
            font-medium
            leading-[1.55]
            text-white/90
            sm:text-[16px]
            md:text-[17px]
          "
        >
          You've learned the concepts and built your foundation. Now it's time
          to put that knowledge to work. PPIP is a 12-week hands-on
          apprenticeship where you work on real product challenges, receive
          feedback and build practical experience along the way.
        </p>

        {/* Buttons */}
        <div
          className="
            mb-8
            flex w-full
            flex-col items-center justify-center
            gap-3.5
            sm:w-auto
            sm:flex-row
          "
        >
          <Link
            href="/ppip/apply"
            className="
              flex h-[48px]
              w-full sm:w-[281px]
              items-center justify-center
              rounded-[6px]
              bg-[#6024D0]
              px-6
              text-[14px]
              font-semibold
              text-white
              shadow-[0_8px_25px_rgba(73,20,170,0.35)]
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-[#6d2ce5]
              active:translate-y-0
            "
          >
            Apply for the Apprenticeship
          </Link>

          <a
            href="#pricing"
            className="
              flex h-[48px]
              w-full sm:w-[189px]
              items-center justify-center
              rounded-[6px]
              border border-white/60
              bg-white/[0.04]
              px-6
              text-[14px]
              font-semibold
              text-white
              backdrop-blur-sm
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-white/10
              active:translate-y-0
            "
          >
            Join the Waitlist
          </a>
        </div>

        {/* Batch Information */}
        <div
          className="
            flex flex-wrap
            items-center justify-center
            gap-x-3 gap-y-1
            text-[12px]
            font-semibold
            sm:text-[14px]
          "
        >
          <span className="font-bold text-[#FFB20F]">
            Next Batch:
          </span>

          <span className="text-[#FFB20F]">
            {datesText}
          </span>

          <span className="text-[#FFB20F]">•</span>

          <span className="text-[#FFB20F]">
            Batch 5
          </span>
        </div>
      </div>

      {/* Bottom Feature Bar */}
      <div
        className="
          absolute inset-x-0 bottom-0 z-20
          border-t border-white/[0.08]
          bg-[#07010F]/75
          backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto
            flex min-h-[98px]
            max-w-[1320px]
            items-center
            justify-between
            gap-6
            px-6
            py-5
            lg:px-10
          "
        >
          {features.map((feature, index) => (
            <React.Fragment key={feature}>
              <span
                className="
                  whitespace-nowrap
                  text-center
                  text-[10px]
                  font-bold
                  tracking-[0.13em]
                  text-white/85
                  sm:text-[11px]
                  md:text-xs
                "
              >
                {feature}
              </span>

              {index < features.length - 1 && (
                <span className="hidden text-white/20 xl:block">
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;