import React from "react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const ProgramDetailsSection = () => {
  const details = [
    {
      label: "Duration",
      value: "12 Weeks",
    },
    {
      label: "Format",
      value: "Structured learning, practical assignments & mentorship",
    },
    {
      label: "Experience Level",
      value: "Beginners, career switchers & aspiring Product Managers",
    },
    {
      label: "What You'll Do",
      value:
        "Learn Product Management fundamentals, complete practical assignments, and apply what you learn.",
    },
    {
      label: "Outcome",
      value:
        "A strong Product Management foundation, practical skills, and confidence to pursue your next career opportunity.",
    },
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
          lg:py-[80px]
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
              tracking-[0.18em]
              text-[#4A16B7]
              sm:mb-5
              sm:text-[13px]
            "
          >
            Program Details
          </p>

          <h2
            className={`${bricolage.className}
              max-w-[570px]
              text-[18px]
              font-extrabold
              leading-[1.16]
              tracking-[-0.04em]
              text-[#12091D]
              sm:text-[38px]
              lg:text-[40px]
            `}
          >
            What You Need to Know Before
            <br className="hidden lg:block" />
            Applying.
          </h2>
        </div>

        {/* RIGHT */}
        <div className="border-t border-white/70">
          {details.map((item) => (
            <div
              key={item.label}
              className="
                grid
                grid-cols-[140px_1fr]
                gap-4
                border-b
                border-white/70
                py-5
                sm:grid-cols-[165px_1fr]
                sm:gap-6
              "
            >
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.04em]
                  text-[#4A16B7]
                  sm:text-[12px]
                "
              >
                {item.label}
              </p>

              <p
                className="
                  max-w-[430px]
                  text-[12px]
                  font-medium
                  leading-[1.55]
                  sm:text-[14px]
                  text-[#12091D]
                "
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramDetailsSection;