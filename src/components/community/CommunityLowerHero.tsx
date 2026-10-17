import React from "react";
import Link from "next/link";
import { montserrat, bricolage } from "@/lib/fonts";

type CommunityLowerHeroProps = {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
};

export default function CommunityLowerHero({
  eyebrow = "TAKE THE NEXT STEP",
  title = <>Ready to Build Your Product <br className="hidden sm:block" />Management Career?</>,
  description = "Whether you're starting your journey, switching careers, or looking to sharpen your product skills, there's a path for you at ProductPointers.",
  primaryAction = { label: "Explore Programs", href: "/community#path-to-community" },
  secondaryAction = { label: "Apply for a Scholarship", href: "/ppap/apply?plan=scholarship" },
  imageSrc = "/images/ppip/but.png",
  imageAlt = "ProductPointers community member",
}: CommunityLowerHeroProps) {
  return (
    <section
      className={`${montserrat.className} relative overflow-hidden bg-white pt-16 pb-0 sm:py-20 lg:py-16`}
    >
      <div className="relative mx-auto max-w-[1440px] px-0 sm:px-10 lg:min-h-[520px] lg:px-16">
        {/* =====================================================
            RIGHT IMAGE
        ====================================================== */}
        <div className="relative ml-auto hidden h-[480px] w-[58%] overflow-hidden rounded-[28px] lg:-mt-[34px] lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover object-[center_15%]"
          />
        </div>

        {/* =====================================================
            PURPLE CARD
        ====================================================== */}
        <div
          className="
            relative
            z-10
            mx-auto
            mt-0
            bg-[#5A16DA]
            px-6
            py-12
            text-center
            text-white
            sm:rounded-[10px]
            sm:text-left
            sm:px-10
            sm:py-14
            lg:absolute
            lg:left-[8%]
            lg:top-[53px]
            lg:mx-0
            lg:w-[58%]
            lg:max-w-[705px]
            lg:px-14
            lg:py-14
            xl:px-14
            xl:py-14
          "
        >
          {/* Eyebrow */}
          <p
            className={`${bricolage.className} mb-7 text-[12px] font-bold uppercase tracking-[0.18em] text-[#FF1CAF]`}
          >
            {eyebrow}
          </p>

          {/* Heading */}
          <h2
            className={`${bricolage.className} mx-auto max-w-[610px] text-[26px] font-extrabold leading-[1.25] tracking-[-0.04em] text-white sm:mx-0 sm:text-[38px] sm:leading-[1.2] lg:text-[35px] xl:text-[39px]`}
          >
            {title}
          </h2>

          {/* Body */}
          <p className="mx-auto mt-5 max-w-[610px] text-[13px] leading-[1.6] text-white/75 sm:mx-0 sm:text-[15px] sm:leading-[1.55]">
            {description}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
            <Link
              href={primaryAction.href}
              className="
                inline-flex
                min-h-[46px]
                w-full
                max-w-[250px]
                items-center
                justify-center
                rounded-[6px]
                bg-[#FF0BAF]
                sm:w-auto
                sm:max-w-none
                px-8
                text-[14px]
                font-semibold
                text-white
                transition-colors
                duration-200
                hover:bg-[#db0094]
              "
            >
              {primaryAction.label}
            </Link>

            <Link
              href={secondaryAction.href}
              className="
                inline-flex
                min-h-[46px]
                w-full
                max-w-[250px]
                items-center
                justify-center
                rounded-[6px]
                border
                border-white/70
                sm:w-auto
                sm:max-w-none
                px-8
                text-[14px]
                font-semibold
                text-white
                transition-colors
                duration-200
                hover:bg-white/10
              "
            >
              {secondaryAction.label}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
