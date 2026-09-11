"use client";

import React from "react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const processSteps = [
  {
    number: "01",
    title: "Understand the",
    subtitle: "Product",
  },
  {
    number: "02",
    title: "Research the",
    subtitle: "Users",
  },
  {
    number: "03",
    title: "Identify the",
    subtitle: "Problem",
  },
  {
    number: "04",
    title: "Validate Your",
    subtitle: "Assumptions",
  },
  {
    number: "05",
    title: "Prioritize",
    subtitle: "Opportunities",
  },
  {
    number: "06",
    title: "Define the",
    subtitle: "Solution",
  },
  {
    number: "07",
    title: "Build Your Product",
    subtitle: "Case Study",
  },
];

const NotAnotherInternship: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} w-full bg-white text-black`}
    >
      <div className="mx-auto max-w-[1440px] px-8 py-[80px] md:px-12 lg:px-[80px]">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-[120px]">
          {/* Left */}
          <div>
            <p
              className={`${bricolage.className}
                mb-5
                text-[11px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#6B20E8]
              `}
            >
              THIS IS NOT ANOTHER COURSE
            </p>

            <h2
              className={`${bricolage.className}
                max-w-[570px]
                text-[28px]
                font-extrabold
                leading-[1.12]
                tracking-[-0.04em]
                text-[#120725]
                md:text-[40px]
              `}
            >
              An Apprenticeship Designed
              <br />
              Around Doing the Work.
            </h2>
          </div>

          {/* Right */}
          <div className="max-w-[470px] lg:pt-[2px]">
            <p
              className="
                text-[14px]
                font-medium
                leading-[1.7]
                text-[#4F4A57]
              "
            >
              Inside PPIP, you don't just learn how Product Managers work.
              You work through the process yourself.
            </p>

            <p
              className="
                mt-1
                text-[14px]
                font-medium
                leading-[1.7]
                text-[#4F4A57]
              "
            >
              You'll explore real product problems, conduct research, analyse
              insights, define opportunities, prioritise what matters and build
              product solutions with guidance and feedback along the way.
            </p>
          </div>
        </div>

        {/* =====================================================
            PROCESS TIMELINE
        ====================================================== */}
        <div className="mt-[82px]">
          <div
            className="
              grid
              grid-cols-3
              gap-x-4
              gap-y-10
              sm:gap-x-8
              sm:gap-y-12
              md:grid-cols-4
              lg:grid-cols-7
              lg:gap-x-[28px]
            "
          >
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative min-w-0"
              >
                {/* Number + connector */}
                <div className="flex items-center">
                  {/* Number */}
                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-[26px]
                      w-[26px]
                      shrink-0
                      sm:h-[32px]
                      sm:w-[32px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#6418E8]
                    "
                  >
                    <span
                      className="
                        text-[11px]
                        font-semibold
                        leading-none
                        text-white
                      "
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Connector */}
                  {index !== processSteps.length - 1 && (
                    <div
                      className="
                        ml-[8px]
                        h-[1px]
                        flex-1
                        bg-[#6418E8]
                      "
                    />
                  )}
                </div>

                {/* Step title */}
                <div className="mt-[11px]">
                  <p
                    className="
                      text-[13px]
                      font-bold
                      leading-[1.25]
                      tracking-[-0.02em]
                      text-[#110A1F]
                      sm:text-[15px]
                      sm:leading-[1.2]
                    "
                  >
                    {step.title}
                  </p>

                  <p
                    className="
                      text-[13px]
                      font-bold
                      leading-[1.25]
                      tracking-[-0.02em]
                      text-[#110A1F]
                      sm:text-[15px]
                      sm:leading-[1.2]
                    "
                  >
                    {step.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotAnotherInternship;