import React from "react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

type Detail = {
  label: string;
  value: string;
};

const details: Detail[] = [
  { label: "Duration", value: "12 Weeks" },
  { label: "Format", value: "Structured, hands-on apprenticeship" },
  {
    label: "Experience Level",
    value: "Aspiring & Early-Career Product Managers",
  },
  {
    label: "What You'll Do",
    value:
      "Research, product discovery, prioritisation, PRDs and product execution",
  },
  {
    label: "Outcome",
    value: "Portfolio-ready, mentor-reviewed evidence of your work",
  },
];

const ProgramDetails: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-[#F3EFFC] px-6 py-[80px] text-[#10091A] sm:px-10 lg:px-[80px]`}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-[160px]">
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
            PROGRAM DETAILS
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
            What You Need to Know Before
            <br className="hidden sm:block" />
            Applying.
          </h2>
        </div>

        {/* =====================================================
            RIGHT — DETAILS TABLE
        ====================================================== */}
        <dl className="border-t border-[#D8CFEC]">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="grid grid-cols-[minmax(0,50%)_minmax(0,1fr)] items-start border-b border-[#D8CFEC] sm:grid-cols-[190px_1fr] sm:items-center"
            >
              <dt
                className={`${bricolage.className} py-[18px] pl-3 pr-4 text-[11px] font-bold uppercase leading-[1.4] tracking-[0.08em] text-[#6024D0] sm:h-full sm:border-r sm:border-[#D8CFEC] sm:flex sm:items-center sm:py-4 sm:pl-0`}
              >
                {detail.label}
              </dt>
              <dd className="py-[18px] text-[13px] leading-[1.6] text-[#10091A] sm:py-4 sm:pl-6 sm:text-[14px]">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default ProgramDetails;
