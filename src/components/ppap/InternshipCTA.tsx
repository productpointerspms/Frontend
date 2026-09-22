import React from "react";
import { ArrowRight } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const InternshipCTA = () => {
  return (
    <section className="w-full bg-white px-0 py-10 sm:px-4 md:px-8 lg:px-0">
      <div
        className="
          relative
          mx-auto
          max-w-[1280px]
          overflow-hidden
          rounded-none
          bg-[#5818D0]
          sm:rounded-[24px]
          px-8
          py-16
          md:px-12
          lg:px-[88px]
          lg:py-[78px]
        "
      >
        {/* Decorative top-left arcs */}
        <div
          className="
            pointer-events-none
            absolute
            -left-[78px]
            -top-[92px]
            h-[190px]
            w-[190px]
            rounded-full
            border-[26px]
            border-[#7049E6]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-[40px]
            -top-[68px]
            h-[125px]
            w-[125px]
            rounded-full
            border-[20px]
            border-[#5818D0]
          "
        />

        {/* Decorative top-right arcs */}
        <div
          className="
            pointer-events-none
            absolute
            -right-[80px]
            -top-[105px]
            h-[230px]
            w-[230px]
            rounded-full
            border-[28px]
            border-[#7049E6]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-[38px]
            -top-[70px]
            h-[150px]
            w-[150px]
            rounded-full
            border-[22px]
            border-[#5818D0]
          "
        />

        {/* Decorative bottom circle */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-[125px]
            left-[35%]
            h-[175px]
            w-[175px]
            rounded-full
            bg-[#7049E6]
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            gap-12
            lg:grid-cols-[1.2fr_0.8fr]
            lg:items-start
            lg:gap-20
          "
        >
          {/* LEFT */}
          <div>
            <p
              className="
                mb-5
                text-[13px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              When You&apos;re Ready For More
            </p>

            <h2
              className={`${bricolage.className}
                max-w-[620px]
                text-[22px]
                font-extrabold
                leading-[1.15]
                tracking-[-0.04em]
                text-white
                sm:text-[38px]
                lg:text-[40px]
              `}
            >
              Build Your Foundation. Then Put It
              {" "}
              <br className="hidden sm:block" />
              Into Practice.
            </h2>

            <p
              className="
                mt-8
                max-w-[650px]
                text-[14px]
                leading-[1.5]
                text-white/90
              "
            >
              PPAP helps you build a solid foundation in Product Management.
              <br className="hidden md:block" />
              When you&apos;re ready to go beyond learning and start applying
              your knowledge to
              <br className="hidden md:block" />
              product challenges, PPIP gives you the opportunity to gain
              hands-on experience.
            </p>
          </div>

          {/* RIGHT */}
          <div className="lg:pt-[2px]">
            <div
              className="
                border-l-2
                border-[#FF0DBF]
                pl-4
              "
            >
              <p
                className="
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-white/55
                "
              >
                ProductPointers Internship Program
              </p>

              <p
                className="
                  mt-2
                  max-w-[360px]
                  text-[14px]
                  font-semibold
                  leading-[1.35]
                  text-white
                "
              >
                Turn your Product Management knowledge
                <br className="hidden xl:block" />
                into real experience.
              </p>
            </div>

            <a
              href="/ppip"
              className="
                mt-10
                inline-flex
                min-w-[194px]
                items-center
                justify-center
                gap-3
                rounded-[7px]
                bg-[#FF00B8]
                px-7
                py-[15px]
                text-[14px]
                font-semibold
                text-white
                transition
                hover:opacity-90
              "
            >
              Explore PPIP
              <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipCTA;