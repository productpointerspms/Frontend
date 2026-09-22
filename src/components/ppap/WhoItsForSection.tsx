import React from "react";
import { Check } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const WhoItsForSection = () => {
  const points = [
    "You're new to Product Management.",
    "You're transitioning into Product Management from another field.",
    "You've started learning but feel overwhelmed or lack structure.",
    "You want to understand the fundamentals before moving into more advanced or hands-on Product work.",
  ];

  return (
    <section className="w-full bg-[#5818D014]">
      <div
        className="
          mx-auto
          grid
          max-w-[1440px]
          grid-cols-1
          gap-8
          px-6
          py-20
          md:px-12
          lg:grid-cols-[0.95fr_1.05fr]
          lg:gap-24
          lg:px-20
          lg:py-[82px]
        "
      >
        {/* LEFT */}
        <div>
          <p
            className="
              mb-4
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-[#4B16B4]
              sm:mb-5
              sm:text-[13px]
            "
          >
            Is PPAP For You?
          </p>

          <h2
            className={`${bricolage.className}
              max-w-[590px]
              text-[18px]
              font-extrabold
              leading-[1.16]
              tracking-[-0.04em]
              text-[#130A1E]
              sm:text-[38px]
              lg:text-[40px]
            `}
          >
            If You&apos;re Serious About Learning
            <br className="hidden lg:block" />
            Product Management and
            <br className="hidden lg:block" />
            Starting your Career With a
            <br className="hidden lg:block" />
            Strong Foundation, PPAP is for
            <br className="hidden lg:block" />
            You.
          </h2>
        </div>

        {/* RIGHT */}
        <div>
          <p
            className="
              mb-4
              text-[12px]
              font-bold
              uppercase
              tracking-[0.04em]
              text-[#120A1B]
              sm:mb-5
              sm:text-[13px]
            "
          >
            PPAP Is For You If:
          </p>

          <div>
            {points.map((point, index) => (
              <div
                key={point}
                className="
                  flex
                  items-start
                  gap-4
                  border-b
                  border-white/60
                  py-[22px]
                  first:pt-1
                "
              >
                <div
                  className="
                    mt-[1px]
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#5818D014]
                    text-[#5818D0]
                  "
                >
                  <Check className="h-3 w-3" strokeWidth={2.2} />
                </div>

                <p
                  className="
                    max-w-[610px]
                    text-[13px]
                    font-medium
                    leading-[1.55]
                    text-[#160D20]
                    sm:text-[15px]
                  "
                >
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;