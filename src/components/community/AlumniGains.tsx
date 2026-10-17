import React from "react";
import { bricolage } from "@/lib/fonts";

// Headings share the PPIP/PPAP display face — variable weight covers 200-800.
const gains = [
  {
    number: "01",
    title: "Continuous Growth",
    description:
      "Access curated product insights, frameworks, case study breakdowns, and resources that help you keep sharpening the skills you built during your program.",
    highlighted: false,
  },
  {
    number: "02",
    title: "Alumni Networking",
    description:
      "Connect with fellow ProductPointers graduates across tech hubs and build meaningful, lifelong professional relationships rooted in shared experience.",
    highlighted: true,
  },
  {
    number: "03",
    title: "Accountability",
    description:
      "Stay consistent with accountability partners, peer groups, and structured growth rituals that keep you progressing long after graduation.",
    highlighted: true,
  },
  {
    number: "04",
    title: "Career Growth",
    description:
      "Access unadvertised roles, exclusive partner events, hiring manager sessions, and career pathways available only to ProductPointers alumni.",
    highlighted: false,
  },
];

const AlumniGains: React.FC = () => {
  return (
    <section
      aria-labelledby="alumni-gains-heading"
      className="bg-[#5818D0] px-6 py-16 text-white sm:px-10 md:px-14 lg:px-20 lg:pb-[90px] lg:pt-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div>
            <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.1em]">
              What Alumni Get
            </p>
            <h2
              id="alumni-gains-heading"
              className={`${bricolage.className} max-w-[560px] text-[22px] font-extrabold leading-[1.15] tracking-[-0.04em] sm:text-[38px] lg:text-[38px] xl:text-[40px]`}
            >
              More Than a Place to Connect.
            </h2>
          </div>
          <p className="max-w-[440px] text-[15px] leading-6 lg:text-right">
            Designed to support your continued growth as a ProductPointers
            alumnus, long after your program ends.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-y-0">
          {gains.map((gain, index) => (
            <li
              key={gain.number}
              className={`px-6 py-6 ${
                index > 0 ? "lg:border-l lg:border-white/20" : ""
              } ${index % 2 === 1 ? "sm:border-l sm:border-white/20" : ""}`}
            >
              <p className="mb-6 text-[13px] font-semibold text-white/35">
                {gain.number}
              </p>
              <h3
                className={`mb-4 font-sans text-[20px] font-bold uppercase leading-6 ${
                  gain.highlighted ? "text-[#FFBB1D]" : "text-white"
                }`}
              >
                {gain.title}
              </h3>
              <p className="text-[14px] leading-6 text-white/80">
                {gain.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default AlumniGains;
