"use client";

import React from "react";
import { ArrowRight, Download } from "lucide-react";
import {
  useProgramDates,
  formatDateRange,
  formatDurationWeeks,
} from "@/lib/useProgramDates";

import eniolaImg from "@/assets/images/eniola.png";
import udochukwuImg from "@/assets/images/udochukwu.png";
import mercyImg from "@/assets/images/mercy.png";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const HeroSection = () => {
  const avatars = [eniolaImg, udochukwuImg, mercyImg];

  const { startTime, endTime } = useProgramDates("PPAP");
  const durationLabel = formatDurationWeeks(startTime, endTime);

  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[#0D061C] text-white">
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================== */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/ppap/hero.png')",
        }}
      />

      {/* =========================================================
          DARK PURPLE OVERLAY
      ========================================================== */}
      <div className="absolute inset-0 -z-10 bg-[#16052E]/75" />

      {/* Bottom fade - matches screenshot */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[45%] bg-gradient-to-t from-[#0A0614] via-[#0A0614]/80 to-transparent" />

      {/* Subtle purple overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#32105E]/30 via-[#2A0B52]/30 to-[#08040F]/75" />

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <div className="relative mx-auto flex min-h-[760px] w-full max-w-[1440px] flex-col items-center px-5 pb-8 pt-28 text-center sm:px-8 md:pt-32 lg:px-12">
        {/* =====================================================
            BADGE
        ====================================================== */}
        <div className="mb-6 inline-flex items-center rounded-full border border-white/70 bg-white/[0.04] px-5 py-2 backdrop-blur-sm">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white sm:text-xs">
            ProductPointers Accelerator Program
          </span>
        </div>

        {/* =====================================================
            HEADING
        ====================================================== */}
        <h1
          className={`${bricolage.className}
            max-w-[1150px]
            text-[26px]
            font-extrabold
            leading-[1.05]
            tracking-[-0.045em]
            text-white
            sm:text-[52px]
            md:text-[62px]
            lg:text-[64px]
            xl:text-[60px]
          `}
        >
          Start Your Product Management Journey
          
          With the{" "}
          <span className="text-[#FFB800]">
            Right Foundation.
          </span>
        </h1>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}
        <p
          className="
            mt-7
            max-w-[760px]
            text-[14px]
            font-medium
            leading-[1.75]
            text-white/90
            sm:text-[17px]
            md:text-[18px]
          "
        >
          Whether you&apos;re completely new to Product Management,
          transitioning from another career or tired of trying to figure it
          all out on your own, PPAP gives you a structured path to learn the
          fundamentals, build practical skills and understand how Product
          Managers think and work.
        </p>

        {/* =====================================================
            CTA BUTTONS
        ====================================================== */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <a
            href="#pricing"
            className="
              inline-flex
              min-w-[280px]
              items-center
              justify-center
              gap-2
              rounded-md
              bg-[#6D1DE8]
              px-7
              py-4
              text-sm
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-[#7C2AF5]
              hover:shadow-[0_10px_35px_rgba(109,29,232,0.35)]
              active:scale-[0.98]
            "
          >
            Apply for the Apprenticeship
            <ArrowRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            className="
              inline-flex
              min-w-[216px]
              items-center
              justify-center
              gap-2
              rounded-md
              border
              border-white/80
              bg-white/[0.02]
              px-7
              py-4
              text-sm
              font-semibold
              text-white
              backdrop-blur-sm
              transition-all
              duration-200
              hover:bg-white/10
              active:scale-[0.98]
            "
          >
            <Download className="h-4 w-4" />
            Download Brochure
          </button>
        </div>

        {/* =====================================================
            BATCH INFORMATION
        ====================================================== */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
          <span className="font-bold text-[#FFB800]">
            Next Batch:
          </span>

          <span className="font-medium text-[#FFB800]">
            {formatDateRange(startTime, endTime)}
          </span>

          <span className="text-[#FFB800]">•</span>

          <span className="font-medium text-[#FFB800]">
            Cohort 3
          </span>
        </div>

        {/* =====================================================
            BOTTOM FEATURES
        ====================================================== */}
        <div
          className="
            mt-auto
            grid
            w-full
            max-w-[930px]
            grid-cols-2
            gap-y-5
            pt-12
            sm:grid-cols-4
            sm:gap-y-0
          "
        >
          <Feature label="12 WEEKS" />
          <Feature label="STRUCTURED LEARNING" />
          <Feature label="PRACTICAL ASSIGNMENTS" />
          <Feature label="MENTORSHIP & FEEDBACK" />
        </div>
      </div>
    </section>
  );
};

/* ===============================================================
   FEATURE ITEM
================================================================ */

type FeatureProps = {
  label: string;
};

const Feature = ({ label }: FeatureProps) => {
  return (
    <div className="flex items-center justify-center">
      <span className="text-[10px] font-bold tracking-[0.16em] text-white sm:text-[11px]">
        {label}
      </span>
    </div>
  );
};

export default HeroSection;