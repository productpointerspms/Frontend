import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const AcceleratorCallout: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-white px-6 py-[40px] sm:px-10 lg:px-[80px]`}
    >
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[16px] bg-[#4C17CE] text-white">
        {/* =====================================================
            DECORATIVE RINGS — purely visual, clipped by the card
        ====================================================== */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="absolute -left-[110px] -top-[120px] h-[240px] w-[240px] rounded-full border-[34px] border-[#5F2BE8] lg:-left-[170px] lg:-top-[190px] lg:h-[400px] lg:w-[400px] lg:border-[56px]" />
          <span className="absolute -top-[90px] right-[10px] h-[200px] w-[200px] rounded-full border-[30px] border-[#5F2BE8] lg:-top-[140px] lg:right-[30px] lg:h-[340px] lg:w-[340px] lg:border-[52px]" />
          <span className="absolute -bottom-[140px] left-[120px] h-[260px] w-[260px] rounded-full border-[34px] border-[#5F2BE8] lg:-bottom-[230px] lg:left-[330px] lg:h-[440px] lg:w-[440px] lg:border-[56px]" />
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}
        <div className="relative z-10 grid grid-cols-1 gap-12 px-8 py-[70px] sm:px-12 lg:grid-cols-[minmax(0,600px)_1fr] lg:gap-[110px] lg:px-[88px] lg:py-[80px]">
          {/* Left */}
          <div>
            <p
              className={`${bricolage.className}
                mb-5
                text-[11px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-white
              `}
            >
              DON&apos;T HAVE A SOLID PM FOUNDATION YET?
            </p>

            <h2
              className={`${bricolage.className}
                text-[22px]
                font-extrabold
                leading-[1.15]
                tracking-[-0.04em]
                text-white
                sm:text-[32px]
                lg:text-[30px]
              `}
            >
              Build the Solid Foundation You
              <br className="hidden sm:block" />
              Need to Grow Your PM Career.
            </h2>

            <p className="mt-8 max-w-[600px] text-[14px] leading-[1.75] text-[#D6CCF5]">
              You may have taken courses, watched videos or learned a few Product
              Management frameworks. But building a strong PM career requires
              more than knowing the terminology.
            </p>

            <p className="mt-6 max-w-[600px] text-[14px] leading-[1.75] text-[#D6CCF5]">
              The ProductPointers Accelerator Program helps you build a solid
              understanding of how Product Managers think, discover and solve
              problems, make decisions and bring products to life.
              <br />
              Build your foundation first. Then take your skills into real
              product work.
            </p>
          </div>

          {/* Right */}
          <div className="lg:pt-[6px]">
            <div className="border-l-[3px] border-[#FF00D2] pl-5">
              <p
                className={`${bricolage.className} text-[11px] font-bold uppercase tracking-[0.15em] text-[#C6B9F2]`}
              >
                ProductPointers Accelerator Program
              </p>
              <p
                className={`${bricolage.className} mt-2.5 text-[15px] font-bold leading-[1.4] text-white`}
              >
                Build the knowledge and confidence to take your next step in
                Product.
              </p>
            </div>

            <Link
              href="/ppap"
              className="mt-[38px] inline-flex items-center gap-2.5 rounded-[6px] bg-[#F81CA0] px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#d9158a]"
            >
              Explore PPAP
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcceleratorCallout;
