"use client";

import React from "react";
import { Check } from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const evidenceItems = [
  "Product research experience",
  "User research insights",
  "Product requirements and deliverables",
  "Mentor-reviewed work",
  "A documented product case study",
  "Portfolio-ready evidence",
  "Experience collaborating on a product challenge",
  "More confidence talking about your work",
];

const PublicRecord: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} relative overflow-hidden bg-[#5818D014] text-[#10051E]`}
    >
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft radial highlight */}
        {/* <div className="absolute left-[45%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#762FEA]/30 blur-3xl" /> */}

        {/* Subtle bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/5 to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-24 lg:px-20 lg:py-[82px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[360px_1fr] lg:gap-[52px]">
          {/* ================= LEFT ================= */}
          <div className="max-w-[340px]">
            {/* Eyebrow */}
            <p className={`${bricolage.className} mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#5818D0]`}>
              MORE THAN A CERTIFICATE
            </p>

            {/* Heading */}
            <h2
              className={`${bricolage.className}
                text-[27px]
                font-extrabold
                leading-[1.08]
                tracking-[-0.045em]
                text-[#0D0618]
                sm:text-[40px]
              `}
            >
              Leave With
              <br />
              Evidence of What
              <br />
              You Can Do.
            </h2>

            {/* Description */}
            <p className="mt-9 max-w-[320px] text-[14px] leading-[1.6] text-[#755E96] sm:text-[15px]">
              By the end of your apprenticeship, you
              <br className="hidden sm:block" />
              won&apos;t just have completed another Product
              <br className="hidden sm:block" />
              Management program.
              <br />
              You&apos;ll have work you can point to.
            </p>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="w-full">
            <div
              className="
                grid
                grid-cols-1
                gap-4
                lg:grid-cols-2
              "
            >
              {evidenceItems.map((item) => (
                <div
                  key={item}
                  className="
                    group
                    flex
                    min-h-[54px]
                    items-center
                    gap-3
                    rounded-[7px]
                    border
                    border-[#D8C9EE]
                    bg-white
                    px-5
                    py-3.5
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-lg
                  "
                >
                  {/* Check */}
                  <span
                    className="
                      flex
                      h-[18px]
                      w-[18px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F0E9FF]
                    "
                  >
                    <Check
                      className="h-[10px] w-[10px] text-[#6024D0]"
                      strokeWidth={3}
                    />
                  </span>

                  {/* Text */}
                  <span className="text-[13px] font-medium leading-[1.4] text-[#21172E] sm:text-[14px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicRecord;