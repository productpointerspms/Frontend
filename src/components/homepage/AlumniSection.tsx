import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

interface Alumni {
  id: number;
  name: string;
  image: string;
}

const alumni: Alumni[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Alumnus ${i + 1}`,
  image: `/images/homepage/alumni${i + 1}.png`,
}));

export default function AlumniSection() {
  return (
    <div
      className={`${montserrat.className} relative w-full bg-[rgba(255,0,210,0.30)] py-10 md:py-20 overflow-hidden`}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] md:block lg:w-[42%]"
        aria-hidden="true"
      >
        <svg
          className="absolute right-0 top-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 25%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 25%)",
          }}
        >
          <defs>
            <pattern
              id="alumniGrid"
              width="68"
              height="68"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 68 0 L 0 0 0 68"
                fill="none"
                stroke="#EE5CC9"
                strokeOpacity="0.75"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#alumniGrid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10">
        {/* Header */}
        <div className="max-w-xl mb-8 md:mb-12">
          <p className="mb-4 text-xs md:text-base md:font-semibold font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#5818D0]">
            300+ ALUMNI AND COUNTING
          </p>
          <h2 className="md:w-auto w-80 md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
            Meet Some of Our Alumni
          </h2>

          <p className=" md:text-[15px] text-[12px] leading-4 md:leading-[151.667%] text-[#525252] mt-6">
            A growing community of product professionals building <br /> across
            Africa and beyond.
          </p>
        </div>
      </div>

      {/* Alumni Auto-Scrolling Marquee (full-bleed, edge-to-edge) */}
      <div className="relative w-full overflow-hidden marquee-mask">
        <div className="flex w-max marquee-track">
          {[...alumni, ...alumni].map((person, index) => (
            <div
              key={`${person.id}-${index}`}
              aria-hidden={index >= alumni.length}
              className="relative shrink-0 mr-5 w-49.5 h-45.5  overflow-hidden"
            >
              <img
                src={person.image}
                alt={person.name}
                className="absolute inset-0  object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
