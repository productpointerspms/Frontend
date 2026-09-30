import React from "react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP/PPAP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const benefits = [
  "Lifetime alumni network",
  "Ongoing growth support",
  "Access to community resources",
  "Career & Job Opportunities",
  "Networking & Community",
];

const CommunityStandardsSection = () => {
  return (
    <section
      aria-labelledby="community-standards-heading"
      className="bg-white px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 lg:grid-cols-[440px_1fr] lg:gap-16 xl:gap-[107px]">
        <div>
          <p className="mb-4 text-[14px] font-bold uppercase tracking-[0.1em] text-[#5818D0]">
            Lifetime Alumni Access
          </p>
          <h2
            id="community-standards-heading"
            className={`${bricolage.className} max-w-[560px] text-[#100B1A] text-[22px] font-extrabold leading-[1.15] tracking-[-0.04em] sm:text-[38px] lg:text-[38px] xl:text-[40px]`}
          >
            A Long-Term Community Built For Continuous Growth
          </h2>
        </div>

        <ul className="grid gap-5">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="border-b border-[#D9D9D9] py-3.5 text-[18px] font-bold leading-6 tracking-[-0.02em] text-[#100B1A]"
            >
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CommunityStandardsSection;
