"use client";

import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
  // Actual pixel dimensions of the source file. next/image uses these to
  // compute the image's true aspect ratio so it isn't stretched or cropped —
  // update these to match each real photo.
  imageWidth: number;
  imageHeight: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "ProductPointers helped me pivot from healthcare into tech, rebuild my confidence, and land my first Product Manager role all within just a few months. It truly transformed my career and mindset.",
    name: "Favour Osaro",
    role: "Product Manager",
    image: "/images/homepage/favour.png",
    imageWidth: 433,
    imageHeight: 450,
  },
  {
    quote:
      "Before ProductPointers, I felt lost and unsure of my next steps. The hands-on projects and real user interviews changed how I work completely. Now, I've gained confidence and even landed two interviews, including one at Interswitch.",
    name: "Chinonso Esther",
    role: "Product Manager",
    image: "/images/homepage/esther.png",
    imageWidth: 433,
    imageHeight: 450,
  },
  {
    quote:
      "ProductPointers gave me clarity, confidence, and direction. I've gone from random networking to building genuine connections and growing with purpose.",
    name: "Mercy Adeniyi",
    role: "Product Manager",
    image: "/images/homepage/mercy.png",
    imageWidth: 433,
    imageHeight: 450,
  },
  {
    quote:
      "ProductPointers helped me go from uncertain to confident. I learned to position myself, build my brand, and communicate my value clearly. It's been a powerful step in my product management journey.",
    name: "Reuben Edosa",
    role: "Product Manager",
    image: "/images/homepage/rueben.png",
    imageWidth: 433,
    imageHeight: 450,
  },
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function NewTestimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[index];

  const handlePrev = () => setIndex((i) => (i - 1 + total) % total);
  const handleNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="w-full bg-[#F2EDFB] py-10 md:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center md:gap-22.5 gap-10">
          {/* Image: below content on mobile, left of content on desktop */}
          <div className="order-2 md:mt-10 lg:order-1 lg:mt-0  lg:shrink-0">
            <p className="hidden md:mb-4 md:block md:text-sm text-[12px] md:font-semibold font-medium text-[#5818D0] leading-[17.28px] tracking-[1.613px] uppercase">
              Testimonials
            </p>
            <h2 className="hidden md:block mb-12 md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
              In Their Own Words
            </h2>

            <div className=" overflow-hidden md:w-110">
              <Image
                key={current.image}
                src={current.image}
                alt={current.name}
                width={current.imageWidth}
                height={current.imageHeight}
                className="md:h-112.5 md:w-108.25 h-89 w-91"
                style={{ animation: "testimonialFade 0.35s ease" }}
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 lg:flex-1 md:mt-10">
            <p className="md:hidden  mb-2 block md:text-sm text-[12px] md:font-semibold font-medium text-[#5818D0] leading-[17.28px] tracking-[1.613px] uppercase">
              Testimonials
            </p>
            <h2 className="md:hidden block mb-8 md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
              In Their Own Words
            </h2>
            <div className="mb-6 md:mb-8 mb  md:mt-20 h-0.75 w-16.5 bg-[#5818D0]" />

            <div
              key={current.name}
              style={{ animation: "testimonialFade 0.35s ease" }}
            >
              <p className="mt-6 md:text-[21.6px] text-base font-medium leading-[33.48px] tracking-[-0.216px] text-[#0E0A1A] md:w-150">
                {current.quote}
              </p>

              <div className="mt-6 md:mt-12">
                <p className="font-bold text-[#0E0A1A] leading-6">
                  {current.name}
                </p>
                <p className="text-[13.12px] font-semibold text-[#5818D0] leading-[19.68px]">
                  {current.role}
                </p>
              </div>
            </div>

            <div className="md:mt-14 mt-8 flex items-center gap-2">
              <span className="text-[15px] text-[#525252] font-semibold leading-[19.2px] tracking-[0.512px]">
                {pad(index + 1)} / {pad(total)}
              </span>

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="flex h-6 w-6 items-center justify-center rounded-full border cursor-pointer border-[#C2C2C2] text-[#5818D0] hover:text-white transition-colors hover:bg-[#5818D0]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="flex h-6 w-6 items-center justify-center rounded-full cursor-pointer hover:text-white text-[#5818D0] border border-[#C2C2C2] transition-colors hover:bg-[#5818D0]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes testimonialFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
