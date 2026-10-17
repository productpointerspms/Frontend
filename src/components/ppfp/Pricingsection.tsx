import Link from "next/link";
import { ChevronUp } from "lucide-react";

type Plan = {
  id: string;
  eyebrow: string;
  title: string;
  price: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: "three",
    eyebrow: "Pay in 3 installments",
    title: "Split your tuition into three payments",
    price: "₦110,000",
    features: [
      "Total: ₦330,000",
      "Full program access",
      "Three flexible instalments",
    ],
    cta: "Choose This Plan",
  },
  {
    id: "two",
    eyebrow: "Pay in 2 installments",
    title: "Split your tuition into two payments",
    price: "₦150,000",
    features: [
      "Total: ₦300,000",
      "Full program access",
      "Two flexible instalments",
    ],
    cta: "Choose This Plan",
  },
  {
    id: "once",
    eyebrow: "Pay once",
    title: "Best Value",
    price: "₦300,000",
    features: [
      "8 weeks of fintech learning",
      "2-week capstone project",
      "Live sessions & practical exercises",
      "Product teardowns & Fintech case studies",
      "Assignments & Cohort collaboration",
      "Capstone project",
      "Student support",
      "Certificate of completion",
    ],
    cta: "Enrol Now",
    featured: true,
  },
];

function CheckMark() {
  return (
    <svg
      viewBox="0 0 4.9 3.3"
      className="h-[3.3px] w-[4.9px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M0.4 1.7L1.8 2.9L4.5 0.4" />
    </svg>
  );
}

function NigeriaFlag() {
  return (
    <span
      aria-hidden
      className="flex h-4 w-4 shrink-0 overflow-hidden rounded-full"
    >
      <span className="h-full w-1/3 bg-[#008751]" />
      <span className="h-full w-1/3 bg-white" />
      <span className="h-full w-1/3 bg-[#008751]" />
    </span>
  );
}

function CurrencyPill({ featured }: { featured?: boolean }) {
  return (
    <button
      type="button"
      className={`mt-4 inline-flex items-center gap-1.5 rounded-[18px] border px-3 py-2 text-base tracking-[0.16px] font-medium ${
        featured
          ? "border-white bg-white text-[#0E0A1A]"
          : "border-[#0E0A1A] bg-white text-[#0E0A1A]"
      }`}
    >
      <NigeriaFlag />
      NGN
      <ChevronUp className="h-4 w-6" />
    </button>
  );
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 bg-white px-4 py-20 md:px-10 lg:px-14 md:py-40"
    >
      <div className="mx-auto max-w-275">
        <p className="md:text-sm text-[12px]  md:font-semibold font-medium tracking-[1.613px] leading-[17.28px] uppercase text-[#5818D0]">
          Pricing
        </p>
        <h2 className="md:mt-4 md:w-120 w-70 text-[20px]  tracking-[-1.134px] font-semibold md:font-bold md:leading-[43.47px] leading-normal text-[#0E0A1A] md:text-[30.8px]">
          Invest in the fintech expertise you can take with you.
        </h2>

        <div className="md:mt-20  grid overflow-hidden border border-[#C2C2C2] mt-10 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col px-8 py-10 md:min-h-87.5 ${
                plan.featured
                  ? "bg-[#5818D0] text-white"
                  : "border-b border-[#C2C2C2] bg-white text-[#07030F] md:border-b-0 md:border-r md:last:border-r-0"
              }`}
            >
              <div className="flex items-start justify-between">
                <p
                  className={`text-[13px] font-semibold uppercase leading-[23.04px] tracking-[-0.48px] ${
                    plan.featured ? "text-white" : "text-[#525252]"
                  }`}
                >
                  {plan.eyebrow}
                </p>
                {plan.featured && (
                  <span className="rounded-sm bg-[#FFBB1D] px-4 py-2 text-[10px] leading-[21.12px] tracking-[0.282px] font-semibold text-[#0E0A1A]">
                    Recommended
                  </span>
                )}
              </div>

              <h3
                className={`mt-4 text-[20px] font-semibold leading-[23.04px] tracking-[-0.48px] ${
                  plan.featured ? "text-white" : "text-[#525252]"
                }`}
              >
                {plan.title}
              </h3>

              <div className="flex flex-col items-center">
                <p className="mt-4 text-[32px] font-extrabold leading-[23.04px] tracking-[-0.48px]">
                  {plan.price}
                </p>
                <CurrencyPill featured={plan.featured} />
              </div>

              <ul className="mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-[12px]"
                  >
                    <span
                      className={`flex h-2.5 w-2.5 shrink-0 leading-[19.84px] items-center justify-center rounded-full ${
                        plan.featured
                          ? "bg-[rgba(255,255,255,0.10)] text-white"
                          : "text-[#5818D0]"
                      }`}
                    >
                      <CheckMark />
                    </span>
                    <span
                      className={
                        plan.featured ? "text-white" : "text-[#525252]"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <div className="mb-4 h-px w-full bg-[#C2C2C2]" />
                <button
                  type="button"
                  className={`w-full rounded-md py-3 text-sm font-semibold leading-[21.12px] tracking-[0.282px] cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                    plan.featured
                      ? "bg-[#FFBB1D] text-[#5818D0]"
                      : "bg-[#5818D0] text-white"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-purple-200 bg-purple-50 p-6 text-center md:p-8">
          <h3 className="font-bricolage text-2xl font-bold">Apply for the Chisom Scholarship</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">Get ₦150,000 towards the ₦300,000 Fintech Product Management Program tuition. Selected scholars contribute ₦150,000.</p>
          <Link href="/ppfp/apply?plan=scholarship" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-[#5818D0] px-8 py-3 text-sm font-semibold text-white hover:bg-[#4510AF]">Apply for Scholarship</Link>
        </div>
      </div>
    </section>
  );
}