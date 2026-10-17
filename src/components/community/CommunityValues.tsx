import React from "react";
import Link from "next/link";
import styles from "./community-mobile.module.css";
import Image from "next/image";
import { bricolage } from "@/lib/fonts";

// Headings share the PPIP/PPAP display face — variable weight covers 200-800.
const CommunityValues = () => {
  return (
    <section
      aria-labelledby="community-values-heading"
      className="bg-white px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-20"
    >
      <Link href="/scholarships" className={styles.scholarshipsLink}>Explore Scholarships</Link>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 lg:grid-cols-[1.26fr_1fr] lg:gap-16 xl:gap-[106px]">
        <div>
          <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.1em] text-[#5818D0]">
            Why the Community Exists
          </p>
          <h2
            id="community-values-heading"
            className={`${bricolage.className} text-[#100B1A] text-[22px] font-extrabold leading-[1.15] tracking-[-0.04em] sm:text-[38px] lg:text-[38px] xl:text-[40px]`}
          >
            Product Growth Continues After Graduation.
          </h2>
          <p className="mt-8 text-[17px] leading-7 text-[#595959] lg:mt-9 lg:text-[20px]">
            Completing a ProductPointers program gives you the skills, frameworks,
            and confidence to build a Product career. But growth doesn’t stop at
            graduation. The alumni community exists to ensure that every graduate
            has a place to continue developing, stay connected to fellow alumni,
            receive ongoing mentorship and guidance, and access long-term career
            opportunities that keep you moving forward.
          </p>

          <blockquote className="my-10 rounded-xl border-l-4 border-[#5818D0] bg-[#F8F5FE] px-6 py-8 sm:px-12 sm:py-10">
            <p className="text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-[#5818D0] lg:text-[32px]">
              &quot;Graduate. Stay connected. Keep growing.&quot;
            </p>
          </blockquote>

          <p className="text-[17px] leading-7 text-[#595959] lg:text-[20px]">
            Whether you completed PPIP, a masterclass, or any ProductPointers
            program, the alumni community is your next chapter. A place where
            accountability, continued learning, and meaningful professional
            relationships help you sustain the momentum you built during your
            program.
          </p>
        </div>

        <div className="relative w-full pr-[18px]">
          <div className="relative aspect-[501/658]">
            <Image
              src="/images/comm/val.jpg"
              alt="Community members celebrating together with their hands raised"
              fill
              sizes="(min-width: 1440px) 501px, (min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute bottom-7 right-0 top-7 w-2.5 rounded-full bg-gradient-to-b from-[#5818D0] to-[#ED00D5]"
          />
        </div>
      </div>
    </section>
  );
};

export default CommunityValues;
