"use client";

import React from "react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

type Phase = {
  number: string;
  week: string;
  title: string;
  description: string;
};

const phases: Phase[] = [
  {
    number: "01",
    week: "UNDERSTAND",
    title: "Learn the Product",
    description:
      "Get familiar with the assigned product, market and users.",
  },
  {
    number: "02",
    week: "DISCOVER",
    title: "Find the Right Problem",
    description:
      "Conduct research, test assumptions and uncover meaningful opportunities.",
  },
  {
    number: "03",
    week: "DEFINE",
    title: "Turn Insights Into Direction",
    description:
      "Analyse your findings, prioritise the problem and define what should be solved.",
  },
  {
    number: "04",
    week: "BUILD",
    title: "Bring Your Thinking to Life",
    description:
      "Develop your product requirements, solution and supporting deliverables.",
  },
  {
    number: "05",
    week: "REVIEW",
    title: "Get Feedback, Improve Your Work.",
    description:
      "Receive structured reviews from mentors and coaches and refine your thinking.",
  },
  {
    number: "06",
    week: "PRESENT",
    title: "Show What You Can Do",
    description:
      "Present your final work and turn your experience into a portfolio-ready case.",
  },
];

const ApprenticeshipTimeline: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className={`${montserrat.className} scroll-mt-10 bg-[#5818D014] px-6 py-[80px] text-[#10091A] sm:px-10 lg:px-[80px]`}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_480px] lg:items-start">
          {/* Left */}
          <div>
            <p
              className={`${bricolage.className}
                mb-5
                text-[11px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#4D10C2]
              `}
            >
              YOUR APPRENTICESHIP EXPERIENCE
            </p>

            <h2
              className={`${bricolage.className}
                max-w-[650px]
                text-[27px]
                font-extrabold
                leading-[1.15]
                tracking-[-0.04em]
                text-[#10091A]
                sm:text-[40px]
                lg:text-[38px]
              `}
            >
              12 Weeks. One Structured Path to
              <br className="hidden sm:block" />
              Building Real Experience.
            </h2>
          </div>

          {/* Right */}
          <p
            className="
              max-w-[470px]
              text-[14px]
              font-medium
              leading-[1.65]
              text-[#725C95]
              lg:justify-self-end
              lg:text-right
            "
          >
            The apprenticeship takes you through a clear progression from
            understanding the product challenge through to presenting your
            finished work. Each phase builds on the last.
          </p>
        </div>

        {/* =====================================================
            DESKTOP TIMELINE
        ====================================================== */}
        <div className="mt-[104px] hidden lg:block">
          <div className="grid grid-cols-6">
            {phases.map((phase, index) => (
              <div
                key={phase.number}
                className="relative min-w-0 pr-8 last:pr-0"
              >
                {/* ---------------------------------------------
                    NUMBER + CONNECTING LINE
                ---------------------------------------------- */}
                <div className="relative flex h-[34px] items-center">
                  {/* Number */}
                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-[34px]
                      w-[34px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#5818D0]
                      text-[11px]
                      font-semibold
                      text-white
                    "
                  >
                    {phase.number}
                  </div>

                  {/* Connecting line */}
                  {index < phases.length - 1 && (
                    <div
                      className="
                        absolute
                        left-[34px]
                        right-0
                        top-1/2
                        h-px
                        -translate-y-1/2
                        bg-[#4511B7]
                      "
                    />
                  )}
                </div>

                {/* ---------------------------------------------
                    WEEK / TITLE / DESCRIPTION
                ---------------------------------------------- */}
                <div className="mt-[14px] max-w-[190px]">
                  {/* Week */}
                  <p
                    className="
                      mb-[9px]
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.04em]
                      leading-none
                      tracking-[0.02em]
                      text-[#5818D0]
                    "
                  >
                    {phase.week}
                  </p>

                  {/* Title */}
                  <h3
                    className={`${bricolage.className}
                      text-[12px]
                      font-bold
                      leading-[1.25]
                      tracking-[-0.02em]
                      text-[#10091A]
                    `}
                  >
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-[9px]
                      text-[12px]
                      font-medium
                      leading-[1.45]
                      text-[#725C95]
                    "
                  >
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            MOBILE / TABLET TIMELINE
        ====================================================== */}
        <div className="mt-[56px] grid grid-cols-3 gap-x-3 gap-y-9 sm:gap-x-5 lg:hidden">
          {phases.map((phase) => (
            <div key={phase.number}>
              {/* Number + connecting line */}
              <div className="relative flex h-[28px] items-center">
                <div
                  className="
                    relative
                    z-10
                    flex
                    h-[28px]
                    w-[28px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#6320DF]
                    text-[10px]
                    font-semibold
                    text-white
                  "
                >
                  {phase.number}
                </div>

                <div
                  className="
                    absolute
                    left-[28px]
                    right-0
                    top-1/2
                    h-px
                    -translate-y-1/2
                    bg-[#4511B7]/30
                  "
                />
              </div>

              {/* Week */}
              <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.04em] text-[#5818D0] sm:text-[10px]">
                {phase.week}
              </p>

              {/* Title */}
              <h3
                className={`${bricolage.className}
                  mt-1.5
                  text-[12px]
                  font-bold
                  leading-[1.25]
                  tracking-[-0.02em]
                  text-[#10091A]
                  sm:text-[14px]
                `}
              >
                {phase.title}
              </h3>

              {/* Description */}
              <p className="mt-1.5 text-[10px] font-medium leading-[1.45] text-[#725C95] sm:text-[12px]">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApprenticeshipTimeline;