import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
});

const AdvisoryCTA = () => {
  return (
    <section
      className={`${montserrat.className} w-full bg-white px-0 py-12 sm:px-6 md:px-12 lg:px-0 lg:py-16`}
    >
      <div
        className="
          relative
          mx-auto
          max-w-[1280px]
          overflow-hidden
          rounded-[22px]
          bg-[#5818D0]
          px-7
          py-14
          sm:px-10
          md:px-14
          lg:px-[88px]
          lg:py-[78px]
        "
      >
        {/* =========================
            DECORATIVE CIRCLES
        ========================== */}

        {/* Top Left */}
        <div
          className="
            pointer-events-none
            absolute
            -left-[88px]
            -top-[120px]
            h-[210px]
            w-[210px]
            rounded-full
            border-[28px]
            border-[#7447E6]
          "
        />

        {/* Top Right */}
        <div
          className="
            pointer-events-none
            absolute
            -right-[88px]
            -top-[126px]
            h-[240px]
            w-[240px]
            rounded-full
            border-[28px]
            border-[#7447E6]
          "
        />

        {/* Bottom Center */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-[155px]
            left-[41%]
            h-[230px]
            w-[230px]
            rounded-full
            border-[28px]
            border-[#7447E6]
          "
        />

        {/* =========================
            CONTENT
        ========================== */}
        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* LEFT CONTENT */}
          <div>
            <p
              className="
                mb-5
                text-[13px]
                font-semibold
                uppercase
                tracking-[0.17em]
                text-white
              "
            >
              Practical Guidance
            </p>

            <h2
              className={`${bricolage.className}
                max-w-[660px]
                text-[32px]
                font-semibold
                leading-[1.12]
                tracking-[-0.04em]
                text-white
                sm:text-[38px]
                lg:text-[40px]
              `}
            >
              Unsure which program fits your
              {" "}
              <br className="hidden sm:block" />
              PM experience level?
            </h2>

            <p
              className="
                mt-8
                max-w-[650px]
                text-[14px]
                leading-[1.65]
                text-white/90
                sm:text-[15px]
              "
            >
              Our admissions advisors are available for a 15-minute diagnostic
              chat to help you
              <br className="hidden lg:block" />
              choose between foundational courses and advanced career tracks.
            </p>
          </div>

          {/* CTA BUTTON */}
          <div className="lg:pr-[0px]">
            <Link
              href="/contact"
              className="
                inline-flex
                min-h-[48px]
                items-center
                justify-center
                gap-3
                rounded-[6px]
                bg-[#FF0BAF]
                px-8
                text-[14px]
                font-semibold
                text-white
                transition
                hover:bg-[#DB0094]
              "
            >
              Book Advisory Call

              <ArrowRight
                size={20}
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisoryCTA;