import React from "react";
import Link from "next/link";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

/**
 * Where the photo sits inside its fixed frame — pan it without touching layout.
 * Second value is the vertical focal point: "0%" pins the top of the image,
 * "50%" centres it, "100%" pins the bottom. The frame never changes size.
 */
const PHOTO_POSITION = "left 30%";

const FinalCTA: React.FC = () => {
  return (
    <section
      id="ppip-final-cta"
      className={`${montserrat.className} relative overflow-hidden bg-white`}
    >
      {/* =====================================================
          PHOTO — anchored to the right edge, sitting slightly
          proud of the card above and below it.
      ====================================================== */}
      <div className="absolute inset-y-[90px] left-[44%] right-0 hidden overflow-hidden rounded-l-[16px] lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ppip/but.png"
          alt="A ProductPointers apprentice at work"
          style={{ objectPosition: PHOTO_POSITION }}
          className="h-full w-full object-cover"
        />
      </div>

      {/* =====================================================
          CARD
      ====================================================== */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-[90px] sm:px-10 lg:px-[250px] lg:py-[160px]">
        <div className="max-w-[720px] rounded-[12px] bg-[#5818D0] p-12 text-center text-white sm:p-14 sm:text-left lg:ml-0 lg:mr-auto">
          <p
            className={`${bricolage.className}
              mb-5
              text-[12px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-[#F81CA0]
            `}
          >
            READY TO DO THE WORK?
          </p>

          <h2
            className={`${bricolage.className}
              text-[25px]
              font-extrabold
              leading-[1.15]
              tracking-[-0.04em]
              text-white
              sm:text-[38px]
              lg:text-[36px]
            `}
          >
            Build the Experience Your Next
            <br className="hidden sm:block" />
            Opportunity Will Ask You About.
          </h2>

          <p className="mt-6 text-[15px] leading-[1.7] text-white/90">
            Stop wondering how to get Product Management experience.
            <br className="hidden sm:block" />
            Start building it.
          </p>

          <Link
            href="/ppip/apply"
            className="mt-9 inline-flex items-center justify-center rounded-md bg-[#F81CA0] px-9 py-[18px] text-[16px] font-semibold text-white transition-colors hover:bg-[#d9158a]"
          >
            Apply for the Apprenticeship
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
