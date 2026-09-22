import React from "react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const ProgramOverview = () => {
  const steps = [
    {
      number: "01",
      title: "Learn the Concept",
      description:
        "Structured lessons introduce each area of product thinking clearly.",
    },
    {
      number: "02",
      title: "Apply What You've Learned",
      description:
        "Exercises and assignments put the concepts into practice immediately.",
    },
    {
      number: "03",
      title: "Get Feedback",
      description:
        "Receive structured input from mentors and coaches on your work.",
    },
    {
      number: "04",
      title: "Strengthen Your Understanding",
      description:
        "Refine your thinking and build real confidence in the material.",
    },
  ];

  return (
    <section className="w-full bg-[#F3EFFC] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-20 lg:py-[82px]">
        
        {/* Top content */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          
          {/* Left */}
          <div>
            <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6A22F4]">
              Learning By Doing
            </p>

            <h2 className={`${bricolage.className} max-w-[610px] text-[20px] font-extrabold leading-[1.18] tracking-[-0.04em] text-[#171022] sm:text-[38px] lg:text-[40px]`}>
              Don&apos;t Just Learn the{" "}
              <br className="hidden lg:block" />
              Concepts. Start Putting Them{" "}
              <br className="hidden lg:block" />
              Into Practice.
            </h2>
          </div>

          {/* Right */}
          <div className="lg:pt-[5px]">
            <p className="max-w-[500px] text-[14px] leading-[1.6] text-[#5E5B63]">
              You&apos;ll learn the foundations of Product Management and apply
              your learning through practical exercises and assignments
              designed to help you understand how the work comes together.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-[48px] grid grid-cols-2 gap-x-5 gap-y-9 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              
              {/* Number and line */}
              <div className="flex items-center">
                <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#5B18E6] text-[11px] font-bold text-white sm:h-[34px] sm:w-[34px] sm:text-[12px]">
                  {step.number}
                </div>

                <div
                  className={`ml-2 h-px flex-1 bg-[#5B18E6] ${
                    index === steps.length - 1 ? "lg:hidden" : ""
                  }`}
                />
              </div>

              {/* Content */}
              <div className="mt-3">
                <h3 className={`${bricolage.className} text-[13px] font-semibold leading-[1.35] text-[#18121F] sm:text-[14px] sm:leading-[1.4]`}>
                  {step.title}
                </h3>

                <p className="mt-1 max-w-[250px] text-[11px] leading-[1.45] text-[#5E5A62] sm:text-[12px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramOverview;