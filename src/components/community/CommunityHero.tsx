import React from "react";
import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP/PPAP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const stats = [
  { value: "500+", label: "Alumni Members" },
  { value: "97%", label: "Career Advancement Rate" },
  { value: "13+", label: "Countries Reached" },
];

const CommunityHero = () => {
  return (
    <section
      aria-labelledby="community-hero-heading"
      className="relative isolate overflow-hidden bg-[#0D0918] px-6 pb-14 pt-24 text-center text-white sm:px-10 lg:min-h-[727px] lg:pb-[60px] lg:pt-[146px]"
    >
      <Image
        src="/images/comm/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(67,16,135,0.40)_0%,rgba(39,14,74,0.65)_55%,#0D0918_90%)]"
      />

      <div className="mx-auto flex max-w-[1000px] flex-col items-center">
        <p className="rounded-full border border-white px-4 py-2 text-[12px] font-bold uppercase leading-[18px] tracking-[0.1em] sm:text-[14px]">
          Alumni-Only Community
        </p>
        <h1
          id="community-hero-heading"
          className={`${bricolage.className} mt-5 max-w-[1150px] text-[26px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-[52px] md:text-[62px] lg:text-[64px] xl:text-[60px]`}
        >
          Growth Doesn’t End After the
          <br className="hidden sm:block" />{" "}
          Program.
        </h1>
        <p className="mt-8 max-w-[740px] text-[16px] font-semibold leading-7 sm:text-[18px]">
          Completing a ProductPointers program is just the beginning. As an
          alumnus, you gain access to an ongoing community where you continue
          learning, stay accountable, and grow alongside fellow Product
          professionals.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <a
            href="#path-to-community"
            className="flex min-h-12 w-full items-center justify-center rounded-md bg-[#5818D0] px-8 py-3 text-[14px] font-semibold transition-colors hover:bg-[#6B28E0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Join the Alumni Community
          </a>
          <a
            href="#path-to-community"
            className="flex min-h-12 w-full items-center justify-center rounded-md border border-white bg-white/5 px-8 py-3 text-[14px] font-semibold transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Explore Programs
          </a>
        </div>

        <dl className="mt-8 grid w-full max-w-[800px] grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <dt className="order-2 mt-1 text-[14px] leading-6 sm:text-[15px]">
                {stat.label}
              </dt>
              <dd className="order-1 text-[44px] font-bold leading-[1.15] tracking-[-0.02em] lg:text-[48px]">
                {stat.value}
              </dd>
              <div
                aria-hidden="true"
                className="order-3 mt-3 h-0.5 w-[98px] bg-white"
              />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default CommunityHero;
