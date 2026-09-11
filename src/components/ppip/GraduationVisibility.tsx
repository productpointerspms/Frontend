import React from "react";
import { Check } from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const criteria: string[] = [
  "Have learned the fundamentals of Product Management",
  "Are struggling to gain practical experience",
  "Need stronger projects for their portfolio",
  "Want to improve their product thinking",
  "Are ready to work through real product challenges",
  "Can commit to the full 12-week experience",
];

const GraduationVisibility: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-[#F3EFFC] px-6 py-[80px] text-[#10091A] sm:px-10 lg:px-[80px]`}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,580px)_1fr] lg:gap-[50px]">
        {/* =====================================================
            LEFT — HEADER
        ====================================================== */}
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
            IS PPIP FOR YOU?
          </p>

          <h2
            className={`${bricolage.className}
              text-[22px]
              font-extrabold
              leading-[1.15]
              tracking-[-0.04em]
              text-[#10091A]
              sm:text-[32px]
              lg:text-[30px]
            `}
          >
            You Don&apos;t Need More Theory. You
            <br className="hidden sm:block" />
            Need the Chance to Practise.
          </h2>
        </div>

        {/* =====================================================
            RIGHT — CRITERIA
        ====================================================== */}
        <div className="lg:pt-[6px]">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.08em] text-[#10091A]">
            PPIP is for people who:
          </p>

          <ul className="space-y-[14px]">
            {criteria.map((item) => (
              <li key={item} className="flex items-center gap-4">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#E4D9FA]">
                  <Check className="h-[10px] w-[10px] text-[#6024D0]" strokeWidth={3} />
                </span>
                <span className="text-[14px] leading-[1.5] text-[#1E1A2E]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Callout */}
          <div className="mt-[60px] rounded-[8px] border border-[#EFA0E5] bg-[#F9DAF6] px-6 py-4">
            <p className="text-[14px] font-bold leading-[1.4] text-[#10091A]">
              PPIP is designed for people who are ready to do the work.
            </p>
            <p className="mt-1.5 text-[13px] leading-[1.5] text-[#6B6577]">
              This is not a passive learning program.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GraduationVisibility;
