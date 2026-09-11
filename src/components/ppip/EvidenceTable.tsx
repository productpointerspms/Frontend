"use client";

import React, { useState } from "react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

type CaseStudy = {
  /** Badge label, e.g. "CASE STUDY 01". */
  badge: string;
  /** YouTube video id — drives both the embed and the thumbnail. */
  videoId: string;
  /** Optional local override in /public/images/ppip; defaults to the YouTube thumbnail. */
  image?: string;
  /** Name overlaid at the bottom of the thumbnail. */
  credit: string;
  title: string;
  description: string;
};

const thumbUrl = (id: string) =>
  `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const embedUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

const caseStudies: CaseStudy[] = [
  {
    badge: "CASE STUDY 01",
    videoId: "uJ5c9slnd_g",
    credit: "Team Moniepoint",
    title: "55 Users. One Clearer Problem to Solve.",
    description:
      "After speaking with 55 users, the team uncovered a recurring frustration around transaction delays and visibility. Their research led them to design a transaction status experience that helped users understand what was happening, why it was happening and what to expect next.",
  },
  {
    badge: "CASE STUDY 02",
    videoId: "u0VS-2iQa6w",
    credit: "Abdul Awal Abu Karim",
    title: "What would you change about Jiji if you were the Product Manager?",
    description:
      "In this Jiji Product Teardown, Abdul analyzes the Jiji marketplace through a Product Management lens, looking at its users, user journey, problems, friction points, competitors, and opportunities for improvement.",
  },
];

const CaseStudyCard: React.FC<{ study: CaseStudy }> = ({ study }) => {
  // The iframe is only mounted after a click, so no player scripts load
  // until someone actually asks to watch.
  const [playing, setPlaying] = useState(false);

  return (
    <article>
      {/* ---------------------------------------------
          THUMBNAIL / PLAYER
      ---------------------------------------------- */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] bg-[#10091A]">
        {playing ? (
          <iframe
            src={embedUrl(study.videoId)}
            title={study.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${study.title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.image ?? thumbUrl(study.videoId)}
              alt=""
              className="h-full w-full object-cover"
            />

            {/* Scrim so the credit stays legible on busy artwork */}
            <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/70 to-transparent" />

            {/* Badge */}
            <span
              className="
                absolute
                left-[18px]
                top-[18px]
                rounded-md
                bg-[#6C38FF]
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-white
              "
            >
              {study.badge}
            </span>

            {/* Play button */}
            <span
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-[62px]
                w-[62px]
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-white/25
                backdrop-blur-sm
                transition
                group-hover:bg-white/40
              "
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ml-[3px] h-[22px] w-[22px] fill-white"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>

            {/* Credit */}
            <span className="absolute bottom-[18px] left-[18px] text-[15px] font-bold text-white">
              {study.credit}
            </span>
          </button>
        )}
      </div>

      {/* ---------------------------------------------
          COPY
      ---------------------------------------------- */}
      <h3
        className={`${bricolage.className}
          mt-[22px]
          text-[16px]
          font-bold
          leading-[1.35]
          tracking-[-0.02em]
          text-[#10091A]
        `}
      >
        {study.title}
      </h3>

      <p className="mt-[14px] text-[14px] leading-[1.75] text-[#6B6577]">
        {study.description}
      </p>
    </article>
  );
};

const EvidenceTable: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-white px-6 py-[80px] text-[#10091A] sm:px-10 lg:px-[80px]`}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_480px] lg:items-start">
          {/* Left */}
          <div>
            <p
              className={`${bricolage.className}
                mb-5
                text-[11px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#6424E8]
              `}
            >
              SEE THE WORK
            </p>

            <h2
              className={`${bricolage.className}
                max-w-[650px]
                text-[22px]
                font-extrabold
                leading-[1.15]
                tracking-[-0.04em]
                text-[#10091A]
                sm:text-[32px]
                lg:text-[30px]
              `}
            >
              This Is What Happens When Learners Get
              <br className="hidden sm:block" />
              the Chance to Do the Work.
            </h2>
          </div>

          {/* Right */}
          <p
            className="
              max-w-[470px]
              text-[14px]
              font-medium
              leading-[1.65]
              text-[#725C95]
              lg:justify-self-end
              lg:text-right
            "
          >
            Our apprentices don&apos;t just talk about Product Management. They
            research, question assumptions, identify real problems and build
            solutions backed by evidence.
          </p>
        </div>

        {/* =====================================================
            CASE STUDY CARDS
        ====================================================== */}
        <div className="mt-[72px] grid grid-cols-1 gap-y-14 lg:grid-cols-2 lg:gap-x-[88px]">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.badge} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvidenceTable;
