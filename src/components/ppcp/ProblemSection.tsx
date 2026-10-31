import React from "react";
import Link from "next/link";

const PainPoints = () => {
  return (
    <section data-ppcp-section="ProblemSection" className="bg-white px-6 py-20 sm:px-10 md:px-14 lg:px-20 lg:py-24 xl:px-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          
          {/* =====================================
              LEFT CONTENT
          ====================================== */}
          <div className="max-w-[650px]">
            {/* Eyebrow */}
            <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.18em] text-[#6219D1] sm:text-[14px]">
              When General Advice Isn’t Enough
            </p>

            <Link href="/ppcp/blessing-okomor" className="mobileCoachingButton">Book a Coaching Session</Link>
            {/* Heading */}
            <h2 className="max-w-[620px] text-[28px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#12111F] sm:text-[34px] md:text-[40px] lg:text-[44px]">
              Sometimes, You Need
              <br />
              Guidance That’s Personal
              <br />
              to You.
            </h2>

            {/* Description */}
            <p className="mt-10 max-w-[600px] text-[16px] leading-[1.7] text-[#686868] sm:text-[17px]">
              Every Product career comes with different challenges. Whether
              you’re navigating a difficult product decision, building your
              skills or figuring out your next career move, generic advice
              doesn’t always address where you are.
            </p>
          </div>

          {/* =====================================
              RIGHT QUOTE
          ====================================== */}
          <div className="flex items-start lg:justify-end lg:pt-10">
            <div className="flex max-w-[520px] gap-8">
              
              {/* Purple Line */}
              <div className="mt-1 h-[115px] w-[2px] shrink-0 bg-[#6219D1]" />

              {/* Quote */}
              <blockquote className="max-w-[450px] text-[24px] font-medium italic leading-[1.35] tracking-[-0.015em] text-[#181622] sm:text-[27px] lg:text-[29px]">
                “One-on-one coaching gives you the space to focus on what matters
                most to you.”
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;