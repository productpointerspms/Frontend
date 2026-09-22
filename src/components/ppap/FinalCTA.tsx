import React from "react";
import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const FinalCTA = () => {
  return (
    <section className="w-full bg-white px-0 pt-16 pb-0 sm:px-6 sm:pb-16 md:px-12 lg:px-16 lg:py-20">
      <div className="relative mx-auto max-w-[1280px]">
        
        {/* IMAGE BLOCK */}
        <div className="ml-auto hidden w-full overflow-hidden rounded-[28px] lg:block lg:w-[58%]">
          <img
            src="/images/ppip/but.png"
            alt="ProductPointers mentor"
            className="h-[420px] w-full object-cover object-[center_35%] md:h-[500px] lg:h-[478px]"
          />
        </div>

        {/* PURPLE CTA PANEL */}
        <div
          className="
            relative
            z-10
            w-full
            rounded-none
            bg-[#5818D0]
            px-7
            py-10
            text-center
            sm:rounded-[10px]
            md:px-12
            lg:text-left
            lg:absolute
            lg:left-[20%]
            lg:top-1/2
            lg:mt-0
            lg:w-[52%]
            lg:-translate-y-1/2
            lg:px-[56px]
            lg:py-[58px]
          "
        >
          {/* EYEBROW */}
          <p
            className="
              mb-5
              text-[13px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#FF19BD]
            "
          >
            Start Here
          </p>

          {/* HEADING */}
          <h2
            className={`${bricolage.className}
              mx-auto
              max-w-[610px]
              text-[19px]
              lg:mx-0
              font-extrabold
              leading-[1.14]
              tracking-[-0.04em]
              text-white
              sm:text-[38px]
              lg:text-[40px]
            `}
          >
            Ready to Build Your Product
            {" "}
            <br className="hidden sm:block" />
            Management Foundation?
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mx-auto
              mt-4
              max-w-[620px]
              text-[13px]
              lg:mx-0
              sm:text-[14px]
              leading-[1.55]
              text-white/75
              sm:text-[15px]
            "
          >
            Stop trying to piece Product Management together on your own.
            Start with a structured foundation and build the knowledge and
            skills to take your next step with confidence.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
            <Link
              href="/ppap/apply"
              className="
                inline-flex
                min-h-[46px]
                w-full
                max-w-[260px]
                items-center
                justify-center
                rounded-[6px]
                bg-[#FF00B8]
                sm:w-auto
                sm:max-w-none
                px-8
                text-[14px]
                font-semibold
                text-white
                transition
                hover:opacity-90
              "
            >
              Apply for PPAP
            </Link>

            <Link
              href="/ppap/apply?plan=scholarship"
              className="
                inline-flex
                min-h-[46px]
                w-full
                max-w-[260px]
                items-center
                justify-center
                rounded-[6px]
                border
                border-white
                sm:w-auto
                sm:max-w-none
                bg-transparent
                px-8
                text-[14px]
                font-semibold
                text-white
                transition
                hover:bg-white/10
              "
            >
              Apply for a Scholarship
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;