"use client";

import React from "react";
import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP/PPAP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const Hero = () => {
  return (
    <section data-ppcp-section="HeroSection" className="relative min-h-screen md:min-h-[760px] w-full overflow-hidden font-sans">
      {/* =====================================
          BACKGROUND IMAGE
      ====================================== */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/ppcp/ppcphero.png"
        alt="ProductPointers one-on-one coaching session"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Purple image tint */}
      <div className="absolute inset-0 bg-[#361074]/55" />

      {/* Dark bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#24104a]/15 to-[#080610]/95" />

      {/* Slight left/right darkening */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#24104a]/30 via-transparent to-[#24104a]/25" />

      {/* =====================================
          PAGE CONTENT
      ====================================== */}
      <div className="relative z-10 flex min-h-screen md:min-h-[760px] flex-col">
        {/* =====================================
            LOGO
        ====================================== */}
        <header className="px-6 pt-7 sm:px-10 md:px-16 lg:px-20 xl:px-24">
          <Link
            href="/"
            className="inline-flex items-center text-[22px] font-extrabold tracking-[-0.04em] text-white/45"
          >
            {/* Replace this with your actual logo if available */}
            <span className="mr-2 text-[25px] font-black">P</span>
            ProductPointers
          </Link>
        </header>

        {/* =====================================
            HERO CENTER CONTENT
        ====================================== */}
        <div className="flex flex-1 items-center justify-center px-5 pb-28 pt-12 sm:px-8 md:pb-24 lg:px-16">
          <div className="mx-auto w-full max-w-[1050px] text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-white/80 px-5 py-[7px]">
              <span className="text-[11px] font-bold uppercase tracking-[0.17em] text-white sm:text-[12px]">
                1 on 1 Coaching Program
              </span>
            </div>

            {/* Heading */}
            <h1 className={`${bricolage.className} mx-auto max-w-[1150px] text-[26px] font-extrabold leading-[1.05] tracking-[-0.045em] text-white sm:text-[52px] md:text-[62px] lg:text-[64px] xl:text-[60px]`}>
              Get the Guidance You Need to Grow
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>
              With{" "}
              <span className="text-[#FFB800]">
                Confidence.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-8 max-w-[720px] text-[15px] font-medium leading-[1.7] text-white/90 sm:text-[16px] md:text-[17px]">
              Get personalised guidance from an experienced Product professional
              to help you navigate challenges, strengthen your product thinking
              and make meaningful progress in your career.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/ppcp/apply"
                className="inline-flex h-[52px] min-w-[220px] items-center justify-center rounded-[6px] bg-[#5E16D8] px-7 text-[14px] font-bold text-white transition-all duration-300 hover:bg-[#6D22E8]"
              >
                Book a Coaching Session
              </Link>

              <Link
                href="#coaching-program-details"
                className="inline-flex h-[52px] min-w-[220px] items-center justify-center rounded-[6px] border border-white/80 bg-white/[0.04] px-7 text-[14px] font-bold text-white backdrop-blur-[2px] transition-all duration-300 hover:bg-white hover:text-[#25104D]"
              >
                See Program Details
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================
            BOTTOM FEATURES
        ====================================== */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-8 sm:px-10 md:px-16 lg:px-20 xl:px-24">
          <div className="mx-auto grid max-w-[850px] grid-cols-2 gap-x-8 gap-y-5 text-center md:grid-cols-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              1:1 Coaching
            </p>

            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              Personalized Guidance
            </p>

            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              Expert Feedback
            </p>

            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              Career Growth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;