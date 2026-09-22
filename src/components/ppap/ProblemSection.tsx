import React from "react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const ProblemSection = () => {
  const learningPoints = [
    "What you need to learn.",
    "What to learn first.",
    "And how it all connects.",
  ];

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto
          grid
          max-w-[1440px]
          grid-cols-1
          items-start
          gap-12
          px-6
          py-16
          md:px-10
          lg:grid-cols-[0.92fr_1.08fr]
          lg:gap-[72px]
          lg:px-20
          lg:py-20
          xl:px-20
        "
      >
        {/* LEFT CONTENT */}
        <div className="pt-0 lg:pt-[1px]">
          {/* Eyebrow */}
          <p
            className="
              mb-5
              text-[13px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#5424E7]
              md:text-[14px]
            "
          >
            Starting shouldn&apos;t feel this confusing
          </p>

          {/* Heading */}
          <h2
            className={`${bricolage.className}
              max-w-[560px]
              text-[22px]
              font-extrabold
              leading-[1.15]
              tracking-[-0.035em]
              text-[#0D0A18]
              sm:text-[38px]
              lg:text-[38px]
              xl:text-[40px]
            `}
          >
            There&apos;s So Much to Learn. But
            {" "}
            <br className="hidden sm:block" />
            Where Do You Start?
          </h2>

          {/* Description */}
          <p
            className="
              mt-8
              max-w-[535px]
              text-[14px]
              font-normal
              leading-[1.78]
              text-[#68666C]
              sm:text-[16px]
            "
          >
            Product Management isn&apos;t something you have to figure out one
            YouTube video, LinkedIn post or framework at a time.
            <br />
            When you&apos;re learning on your own, it&apos;s easy to consume a
            lot of information without knowing:
          </p>

          {/* Numbered points */}
          <div className="mt-7 flex flex-col gap-[18px]">
            {learningPoints.map((point, index) => (
              <div
                key={point}
                className="flex items-center gap-4"
              >
                <div
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F4EEFF]
                    text-[11px]
                    font-bold
                    text-[#5424E7]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="text-[14px] font-semibold text-[#17131F]">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full">
          {/* Purple callout */}
          <div
            className="
              flex
              min-h-[74px]
              items-start
              gap-3
              rounded-[9px]
              border
              border-[#9B74F5]
              bg-[#F1ECFA]
              px-4
              py-[17px]
              sm:px-4
            "
          >
            <span
              className="
                mt-[2px]
                h-2
                w-2
                shrink-0
                rounded-full
                bg-[#5726E8]
              "
            />

            <p
              className="
                max-w-[590px]
                text-[14px]
                font-semibold
                leading-[1.45]
                text-[#4D1BE0]
                sm:text-[15px]
              "
            >
              PPAP Gives You a Clear, Structured Path to Build Your Product
              Management Foundation.
            </p>
          </div>

          {/* Image */}
          <div
            className="
              mt-6
              w-full
              overflow-hidden
              rounded-[15px]
              bg-[#F1F1F1]
            "
          >
            <img
              src="images/ppap/pro.png"
              alt="Product management learning session"
              className="
                h-auto
                w-full
                object-cover
                lg:aspect-[1.38/1]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;