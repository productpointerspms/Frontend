"use client";

import React from "react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const OpportunitySection: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} relative min-h-[760px] overflow-hidden bg-[#ECE4FA] text-[#110C24] pt-16 pb-0 lg:py-0`}
    >
      {/* Main container */}
      <div className="relative mx-auto min-h-[760px] max-w-[1440px] px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between">

        {/* ================= LEFT CONTENT ================= */}
        <div className="relative z-20 w-full max-w-[560px] py-10 lg:py-20">
          {/* Small eyebrow */}
          <p className={`${bricolage.className} mb-4 text-[12px] font-bold uppercase tracking-[0.14em] text-[#6C38FF]`}>
            SOUND FAMILIAR?
          </p>

          {/* Heading */}
          <h2 className={`${bricolage.className} text-[26px] sm:text-[38px] lg:text-[42px] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#110C24]`}>
            You've Learned Product Management. Now You Need Experience to Show for It.
          </h2>

          {/* Intro text */}
          <div className="mt-7 space-y-1 text-[15px] sm:text-[16px] leading-[1.7] text-[#5E5775]">
            <p>You've taken courses. Learned the frameworks. Maybe even earned a few certifications.</p>
            <p>But when it's time to apply for a Product role, the question becomes:</p>
          </div>

          {/* Quote */}
          <div className="mt-6 border-l-[3px] border-[#6C38FF] pl-5 py-0.5">
            <p className="text-[20px] sm:text-[23px] font-bold leading-[1.3] text-[#110C24]">
              “Tell me about a product you've worked on.”
            </p>
          </div>

          {/* Secondary explanation */}
          <div className="mt-7 space-y-1 text-[15px] sm:text-[16px] leading-[1.7] text-[#5E5775]">
            <p>And that's where many aspiring Product Managers get stuck.</p>
            <p>Not because they haven't learned Product Management.</p>
            <p>But because they haven't had enough opportunities to practise it.</p>
          </div>

          {/* Bottom callout box */}
          <div className="mt-8 flex items-start gap-3 rounded-[10px] border border-[#BFA7F5] bg-[#DFD3F8]/60 px-5 py-4">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#6C38FF]" />
            <p className="text-[13px] sm:text-[14px] font-bold leading-[1.6] text-[#551AC8]">
              PPIP gives you the opportunity to move from learning Product Management to actually doing the work.
            </p>
          </div>
        </div>

        {/* ================= RIGHT VISUAL (DESKTOP) ================= */}
        <div className="relative hidden lg:block w-[640px] h-[760px] shrink-0">

          {/* Purple circular backdrop (positioned behind upper torso & head) */}
          <div className="absolute right-[110px] bottom-[10px] h-[420px] w-[420px] rounded-full bg-[#CCB5F7] z-0" />

          {/* Woman image (increased scale, cleanly overflowing at the bottom) */}
          <div className="absolute right-[10px] bottom-0 w-[660px] xl:w-[700px] z-10 pointer-events-none">
            <img
              src="/images/ppip/opp.png"
              alt="Product manager thinking about her career"
              className="block h-auto w-full object-contain"
            />
          </div>

          {/* ---------------- QUESTION 1 (Top Left) ---------------- */}
          <div className="absolute left-[10px] top-[95px] z-30 rounded-[10px] bg-white px-5 py-3.5 shadow-[0_6px_25px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-semibold text-[#110C24]">
              How do I get my first PM opportunity?
            </p>
          </div>
          {/* Thought bubbles from Question 1 */}
          <div className="absolute left-[200px] top-[165px] z-20 flex flex-col items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
            <div className="ml-8 h-3 w-3 rounded-full bg-white shadow-sm" />
            <div className="ml-16 h-2 w-2 rounded-full bg-white shadow-sm" />
          </div>

          {/* ---------------- QUESTION 2 (Middle Left) ---------------- */}
          <div className="absolute left-[-10px] top-[230px] z-30 rounded-[10px] bg-white px-5 py-3.5 shadow-[0_6px_25px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-semibold text-[#110C24]">
              How do I prove I can do the work?
            </p>
          </div>
          {/* Thought bubbles from Question 2 */}
          <div className="absolute left-[150px] top-[300px] z-20 flex flex-col items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
            <div className="ml-8 h-3 w-3 rounded-full bg-white shadow-sm" />
            <div className="ml-16 h-2 w-2 rounded-full bg-white shadow-sm" />
          </div>

          {/* ---------------- QUESTION 3 (Top Right) ---------------- */}
          <div className="absolute right-[0px] top-[70px] z-30 rounded-[10px] bg-white px-5 py-3.5 shadow-[0_6px_25px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-semibold text-[#110C24]">
              Where do I gain real product experience?
            </p>
          </div>
          {/* Thought bubbles from Question 3 */}
          <div className="absolute right-[200px] top-[140px] z-20 flex flex-col items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
            <div className="-ml-8 h-3 w-3 rounded-full bg-white shadow-sm" />
            <div className="-ml-16 h-2 w-2 rounded-full bg-white shadow-sm" />
          </div>

          {/* ---------------- QUESTION 4 (Middle Right) ---------------- */}
          <div className="absolute right-[-80px] top-[220px] z-30 rounded-[10px] bg-white px-5 py-3.5 shadow-[0_6px_25px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-semibold text-[#110C24]">
              What do I need beyond a certificate?
            </p>
          </div>
          {/* Thought bubbles from Question 4 */}
          <div className="absolute right-[100px] top-[300px] z-20 flex flex-col items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
            <div className="-ml-8 h-3 w-3 rounded-full bg-white shadow-sm" />
            <div className="-ml-16 h-2 w-2 rounded-full bg-white shadow-sm" />
          </div>

        </div>

        {/* ================= RIGHT VISUAL (MOBILE / TABLET) ================= */}
        {/* Breaks out of the section padding so the cards can sit near the
            screen edges, the way they do on desktop. */}
        <div className="relative z-20 -mx-6 mt-10 h-[380px] w-[calc(100%+3rem)] sm:-mx-10 sm:w-[calc(100%+5rem)] lg:hidden">
          {/* Purple circular backdrop — sits behind her head and shoulders */}
          <div className="absolute bottom-[14px] left-1/2 h-[205px] w-[205px] translate-x-[calc(-50%+16px)] rounded-full bg-[#CCB5F7]" />

          {/* Woman */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[88%] max-w-[350px] -translate-x-1/2">
            <img
              src="/images/ppip/opp.png"
              alt="Product manager thinking about her career"
              className="block h-auto w-full object-contain"
            />
          </div>

          {/* ---------------- QUESTION 1 (Top Left) ---------------- */}
          <div className="absolute left-[11%] top-[24px] z-30 max-w-[37%] rounded-[8px] bg-white px-3 py-2.5 shadow-[0_4px_18px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] font-semibold leading-[1.35] text-[#110C24]">
              How do I get my first PM opportunity?
            </p>
          </div>

          {/* ---------------- QUESTION 2 (Top Right) ---------------- */}
          <div className="absolute left-[52%] top-[24px] z-30 max-w-[41%] rounded-[8px] bg-white px-3 py-2.5 shadow-[0_4px_18px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] font-semibold leading-[1.35] text-[#110C24]">
              Where do I gain real product experience?
            </p>
          </div>

          {/* ---------------- QUESTION 3 (Left, lower) ---------------- */}
          <div className="absolute left-[2%] top-[119px] z-30 max-w-[37%] rounded-[8px] bg-white px-3 py-2.5 shadow-[0_4px_18px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] font-semibold leading-[1.35] text-[#110C24]">
              How do I prove I can do the work?
            </p>
          </div>

          {/* ---------------- QUESTION 4 (Right, lower) ---------------- */}
          <div className="absolute right-[3%] top-[94px] z-30 max-w-[37%] rounded-[8px] bg-white px-3 py-2.5 shadow-[0_4px_18px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] font-semibold leading-[1.35] text-[#110C24]">
              What do I need beyond a certificate?
            </p>
          </div>

          {/* Thought bubbles — even diagonal trails running from the cards
              toward her head, mirrored left and right. */}
          <span className="absolute left-[34%] top-[72px] z-20 h-3 w-3 rounded-full bg-white shadow-sm" />
          <span className="absolute left-[38%] top-[88px] z-20 h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
          <span className="absolute left-[42%] top-[102px] z-20 h-2 w-2 rounded-full bg-white shadow-sm" />

          <span className="absolute right-[34%] top-[72px] z-20 h-3 w-3 rounded-full bg-white shadow-sm" />
          <span className="absolute right-[38%] top-[88px] z-20 h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
          <span className="absolute right-[42%] top-[102px] z-20 h-2 w-2 rounded-full bg-white shadow-sm" />

          {/* From "How do I prove I can do the work?" */}
          <span className="absolute left-[24%] top-[160px] z-20 h-3 w-3 rounded-full bg-white shadow-sm" />
          <span className="absolute left-[28%] top-[176px] z-20 h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
          <span className="absolute left-[32%] top-[190px] z-20 h-2 w-2 rounded-full bg-white shadow-sm" />

          {/* From "What do I need beyond a certificate?" */}
          <span className="absolute right-[24%] top-[140px] z-20 h-3 w-3 rounded-full bg-white shadow-sm" />
          <span className="absolute right-[28%] top-[156px] z-20 h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
          <span className="absolute right-[32%] top-[170px] z-20 h-2 w-2 rounded-full bg-white shadow-sm" />
        </div>

      </div>
    </section>
  );
};

export default OpportunitySection;