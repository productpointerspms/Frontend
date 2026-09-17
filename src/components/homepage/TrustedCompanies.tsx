"use client";

import React from "react";
import Image from "next/image";

const COMPANIES = [
  { name: "Interswitch", file: "interLogo.png", width: 80, height: 40 },
  { name: "UBA", file: "ubaLogo.png", width: 80, height: 48 },
  { name: "Bolt", file: "boltLogo.png", width: 80, height: 45 },

  { name: "Access Bank", file: "accessLogo.png", width: 80, height: 50 },
  { name: "Venofa", file: "venLogo.png", width: 80, height: 41 },
  { name: "Cowrywise", file: "cowryLogo.png", width: 80, height: 80 },
  { name: "Henkolu Group", file: "honLogo.png", width: 138, height: 25 },
  { name: "RWJ", file: "rwjLogo.png", width: 80, height: 18 },
  { name: "YAR", file: "yarLogo.png", width: 65, height: 60 },
  { name: "FCMB", file: "fcmbLogo.png", width: 80, height: 80 },
];

export default function TrustedCompanies() {
  // Duplicate the list so the strip can loop seamlessly at -50%.
  const track = [...COMPANIES, ...COMPANIES];

  return (
    <section className="w-full  py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:px-14">
          <div>
            <p className="text-xs md:text-base md:font-semibold font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#5818D0]">
              Our talent is making an impact
            </p>
            <h2 className=" md:w-150 w-70 md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
              Our learners are building across amazing companies
            </h2>
          </div>

          <p className="max-w-xs md:text-[15px] text-[12px] leading-4 md:leading-[151.667%] text-[#525252] sm:text-right">
            Our graduates go on to build careers at leading technology companies
            across Africa and beyond.
          </p>
        </div>
      </div>

      {/* Edge-to-edge scrolling logo strip */}
      <div className="relative md:mt-20 mt-10 w-full overflow-hidden marquee-mask">
        <div className="flex w-max marquee-track items-center gap-10 sm:gap-16">
          {track.map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              aria-hidden={i >= COMPANIES.length}
              className="flex h-16 shrink-0 items-center justify-center"
            >
              <Image
                src={`/images/homepage/${company.file}`}
                alt={company.name}
                width={company.width}
                height={company.height}
                className="w-auto object-contain"
                style={{ height: company.height, width: company.width }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
