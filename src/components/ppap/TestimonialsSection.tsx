"use client";

import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

// Import the user's testimony images
import eniolaImg from "@/assets/images/eniola.png";
import udochukwuImg from "@/assets/images/udochukwu.png";
import mercyImg from "@/assets/images/mercy.png";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const testimonials = [
  {
    name: "Eniola Oyajoju",
    role: "Product Manager",
    image: eniolaImg.src,
    content:
      "Before joining the program, I had a lot of questions about who a Product Manager is and what they do exactly as I was seeking to transition and had no prior knowledge or experience. The program has helped me bridge the knowledge gap and I feel confident to practice what I've learnt. I'm grateful that I signed up for the program because the way I'm getting answers to questions within and beyond the scope of Product and Project Management feels so good. The program has strengthened my decision to transition to Product Management. I'll really recommend this to anyone.",
  },
  {
    name: "Udochukwu Success",
    role: "Product Manager",
    image: mercyImg.src,
    content:
      "The PPAP program gave me the clarity I was missing. I now understand what product management truly means and how it connects with project management. The lessons, assignments, and supportive community have helped me build a strong foundation and start my product management journey with direction and purpose. This program has helped me to grow in confidence and take real steps forward in my PM journey.",
  },
  {
    name: "Mercy Okpara",
    role: "Product Manager",
    image: udochukwuImg.src,
    content:
      "Before PPAP, I was a timid, confused, and frustrated certified PM. The program, and especially Coach B's foundational storytelling lessons, changed everything. I am now a confident PM with great insights on how to manage projects and products effortlessly. The individual presentations were another huge confidence booster. Coach B is a truly great mentor.",
  },
];

// Horizontal gap between cards, in px — shared by the layout and the offset maths.
const GAP = 32;

const TestimonialsSection = () => {
  // Start on the middle card so both neighbours peek in, as in the design.
  const [index, setIndex] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const atStart = index === 0;
  const atEnd = index === testimonials.length - 1;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(testimonials.length - 1, i + 1));

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    if (delta < -50) next();
    touchStartX.current = null;
  };

  return (
    <section
      className={`${montserrat.className} bg-white px-6 py-[80px] text-[#10091A] sm:px-10 lg:px-[80px]`}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <p
          className={`${bricolage.className} mb-5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#6424E8]`}
        >
          FROM THE PEOPLE WHO DID THE WORK
        </p>

        <h2
          className={`${bricolage.className} text-[22px] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#10091A] sm:text-[32px] lg:text-[30px]`}
        >
          See What the Experience Was Like From the Inside.
        </h2>

        {/* =====================================================
            CAROUSEL
            The track is as wide as the viewport, so a % translate
            is a % of the visible area: (100% - card) / 2 centres
            the active card, and each step moves one card + gap.
        ====================================================== */}
        <div
          className="mt-[60px] md:overflow-hidden md:[--card:50%]"
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          {/* Below md every card is stacked and fully visible, so the
              slide transform only applies from md up. */}
          <div
            className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8 md:translate-x-[var(--tx)] md:transition-transform md:duration-500 md:ease-out"
            style={
              {
                "--tx": `calc((100% - var(--card)) / 2 - ${index} * (var(--card) + ${GAP}px))`,
              } as React.CSSProperties
            }
          >
            {testimonials.map((t, i) => (
              <article
                key={t.name}
                className="relative flex w-full flex-col items-center rounded-[20px] bg-[#F4F1FC] px-6 pb-12 pt-8 text-center sm:px-10 md:w-[var(--card)] md:shrink-0"
              >
                {/* Gradient accents on the top and bottom edges */}
                <span className="absolute left-[3%] top-0 h-[3px] w-[38%] bg-gradient-to-r from-transparent via-[#6024D0] to-transparent" />
                <span className="absolute bottom-0 left-[3%] h-[3px] w-[33%] bg-gradient-to-r from-transparent via-[#6024D0] to-transparent" />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-20 w-20 rounded-full object-cover"
                />

                <p className="mt-7 text-[13px] leading-[1.5] text-[#10091A] sm:text-[14px]">
                  {t.content}
                </p>

                <h3
                  className={`${bricolage.className} mt-6 text-[17px] font-bold tracking-[-0.01em] text-[#10091A] sm:text-[18px]`}
                >
                  {t.name}
                </h3>
                <p className="mt-2 text-[14px] text-[#6B6577]">{t.role}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="mt-10 hidden items-center justify-center gap-8 md:flex">
          <button
            type="button"
            onClick={prev}
            disabled={atStart}
            aria-label="Previous testimonial"
            className="cursor-pointer text-[#10091A] transition-colors disabled:cursor-default disabled:text-[#9A95A6]"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={atEnd}
            aria-label="Next testimonial"
            className="cursor-pointer text-[#10091A] transition-colors disabled:cursor-default disabled:text-[#9A95A6]"
          >
            <ArrowRight className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
