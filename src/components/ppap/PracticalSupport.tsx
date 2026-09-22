import React from "react";
import { Check } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const PracticalSupport = () => {
  const outcomes = [
    "A solid understanding of Product Management fundamentals.",
    "A clearer understanding of how Product Managers approach users, problems and solutions.",
    "Practical assignments that help reinforce what you've learned.",
    "More confidence in your Product Management knowledge.",
    "A clearer idea of what to do next in your journey. That last point matters because PPAP is a foundation program, not the final destination.",
  ];

  return (
    <section className="w-full overflow-hidden">
      <div className="grid min-h-[670px] grid-cols-1 lg:grid-cols-[44%_56%]">
        
        {/* LEFT IMAGE */}
        <div className="relative hidden min-h-[460px] lg:block lg:min-h-[670px]">
          <img
            src="/images/ppap/program-outcome.jpg"
            alt="Product management student"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Purple fade from image into right section */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-r
              from-transparent
              via-transparent
              to-[#5818D0]/90
              lg:block
            "
          />
        </div>

        {/* RIGHT CONTENT */}
        <div
          className="
            relative
            flex
            items-center
            bg-[#5818D0]
            px-6
            py-16
            md:px-12
            lg:px-[70px]
            lg:py-20
          "
        >
          {/* subtle background gradient */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-br
              from-[#6A2AE0]
              via-[#5818D0]
              to-[#6A12ED]
              opacity-90
            "
          />

          <div className="relative z-10 max-w-[720px]">
            
            {/* EYEBROW */}
            <p
              className="
                mb-4
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white
                sm:mb-5
                sm:text-[13px]
              "
            >
              Build Your PM Foundation
            </p>

            {/* HEADING */}
            <h2
              className={`${bricolage.className}
                max-w-[690px]
                text-[19px]
                font-extrabold
                leading-[1.15]
                tracking-[-0.035em]
                text-white
                sm:text-[38px]
                lg:text-[40px]
              `}
            >
              Learn How Product Managers Think,{" "}
              <br className="hidden xl:block" />
              Work and Make Decisions.
            </h2>

            {/* OUTCOMES */}
            <div className="mt-10 flex flex-col gap-6">
              {outcomes.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div
                    className="
                      mt-[2px]
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                    "
                  >
                    <Check
                      className="h-3 w-3 text-white"
                      strokeWidth={2}
                    />
                  </div>

                  <p
                    className="
                      max-w-[650px]
                      text-[13px]
                      leading-[1.6]
                      sm:leading-[1.65]
                      text-white/90
                      sm:text-[15px]
                    "
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticalSupport;