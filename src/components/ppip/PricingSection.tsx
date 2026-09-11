"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";
import { useLiveRates, currencies } from "@/lib/useLiveRates";
import { getPrograms, getProgramInfo } from "@/lib/programs";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const Flag = ({ country }: { country: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={`https://flagcdn.com/24x18/${country}.png`}
    alt=""
    width={20}
    height={15}
    className="w-5 h-auto rounded-sm shrink-0"
  />
);

type Plan = {
  eyebrow: string;
  title: string;
  /** Live NGN fee from the API; null while it loads. */
  feeNgn: number | null;
  features: string[];
  ctaLabel: string;
  /** Apply route; the selected currency is appended. */
  applyPath: string;
  variant: "light" | "purple";
  badge?: string;
};

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  const {
    currency,
    setCurrency,
    formatLive,
    getLiveAmount,
    loading,
    priceKey,
  } = useLiveRates(plan.feeNgn ?? 0);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const isPurple = plan.variant === "purple";
  // The fee hasn't arrived yet, or the conversion rates are still in-flight.
  const isLoading = plan.feeNgn === null || loading;

  return (
    <div
      className={`flex flex-col p-8 ${
        isPurple
          ? // Scholarship leads on mobile; side-by-side order returns at sm.
            "order-first bg-[#5A17D6] text-white sm:order-none"
          : "border border-gray-200 bg-white"
      }`}
    >
      {/* Eyebrow + recommended badge */}
      <div className="flex items-start justify-between gap-3">
        <p
          className={`text-[13px] font-medium ${
            isPurple ? "text-white" : "text-[#4A4458]"
          }`}
        >
          {plan.eyebrow}
        </p>
        {plan.badge && (
          <span className="rounded-[3px] bg-[#FDB913] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#10091A]">
            {plan.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={`${bricolage.className} mt-[26px] text-[18px] font-bold tracking-[-0.02em] ${
          isPurple ? "text-white" : "text-[#10091A]"
        }`}
      >
        {plan.title}
      </h3>

      {/* Price */}
      <div className="mt-[18px] flex min-h-[42px] items-center justify-center">
        {isLoading || plan.feeNgn === null ? (
          <span
            className={`inline-block h-9 w-36 rounded-lg ${
              isPurple ? "bg-white/20" : "bg-gray-200"
            } animate-pulse`}
          />
        ) : (
          <span
            key={`price-${priceKey}-${currency.code}`}
            className={`${bricolage.className} text-[30px] font-extrabold tracking-[-0.02em] ${
              isPurple ? "text-white" : "text-[#10091A]"
            }`}
          >
            {formatLive(plan.feeNgn)}
          </span>
        )}
      </div>

      {/* Currency selector */}
      <div className="mt-[14px] flex justify-center">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-[14px] font-semibold cursor-pointer transition-colors ${
              isPurple
                ? "border-white/50 text-white hover:bg-white/10"
                : "border-gray-300 text-[#10091A] hover:bg-gray-50"
            }`}
          >
            <Flag country={currency.country} />
            {currency.code}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""} ${
                isPurple ? "text-white/80" : "text-gray-500"
              }`}
            />
          </button>

          {open && (
            <div className="absolute left-1/2 z-30 mt-2 max-h-64 w-52 -translate-x-1/2 overflow-auto rounded-xl border border-gray-200 bg-white py-2 text-left shadow-lg">
              <div className="mb-1 border-b border-gray-100 px-4 pb-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Select Currency
                </p>
              </div>
              {currencies.map((c) => {
                const liveAmt = getLiveAmount(c);
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCurrency(c);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-xs transition-colors hover:bg-purple-50 ${
                      c.code === currency.code
                        ? "bg-[#F3E8FF] font-semibold text-[#6024D0]"
                        : "text-gray-700"
                    }`}
                  >
                    <Flag country={c.country} />
                    <div className="flex min-w-0 flex-1 flex-col items-start">
                      <span className="font-semibold">{c.code}</span>
                      {liveAmt ? (
                        <span
                          className={`truncate text-[10px] ${
                            c.code === currency.code
                              ? "text-[#6024D0]/70"
                              : "text-gray-400"
                          }`}
                        >
                          {liveAmt}
                        </span>
                      ) : loading ? (
                        <span className="text-[10px] text-gray-300">Loading…</span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <ul className="mt-[28px] space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={`flex gap-2.5 text-[13px] leading-[1.5] ${
              isPurple ? "text-white" : "text-[#4A4458]"
            }`}
          >
            {isPurple ? (
              /* Keeps the copy aligned with the checked list in the light card. */
              <span aria-hidden="true" className="w-[14px] shrink-0" />
            ) : (
              <Check className="mt-[3px] h-[14px] w-[14px] shrink-0 text-[#8E86A0]" strokeWidth={2.5} />
            )}
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Divider + CTA */}
      <div
        className={`mt-auto border-t pt-6 ${
          isPurple ? "border-white/30" : "border-gray-200"
        }`}
      >
        <Link
          href={`${plan.applyPath}?currency=${currency.code}`}
          className={`flex w-full items-center justify-center rounded-md py-3.5 text-[14px] font-semibold transition-colors ${
            isPurple
              ? "bg-[#FDB913] text-[#4A11B0] hover:bg-[#e9a90c]"
              : "bg-[#6024D0] text-white hover:bg-[#4d1ba8]"
          }`}
        >
          {plan.ctaLabel}
        </Link>
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  // One request for the whole section — both fees come from the same
  // /program/programs payload, so the cards can never disagree with checkout.
  const [fees, setFees] = useState<{ ppap: number | null; ppip: number | null }>({
    ppap: null,
    ppip: null,
  });

  useEffect(() => {
    let cancelled = false;

    const feeFor = (list: Awaited<ReturnType<typeof getPrograms>>, code: string) =>
      list.find((p) => p.code.toUpperCase() === code)?.fee ??
      getProgramInfo(code).feeNgn;

    getPrograms()
      .then((list) => {
        if (!cancelled) {
          setFees({ ppap: feeFor(list, "PPAP"), ppip: feeFor(list, "PPIP") });
        }
      })
      .catch(() => {
        // Fall back to the static catalog so the cards still render a price.
        if (!cancelled) {
          setFees({
            ppap: getProgramInfo("PPAP").feeNgn,
            ppip: getProgramInfo("PPIP").feeNgn,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const plans: Plan[] = [
    {
      eyebrow: "One-Time Payment",
      title: "Full Program Fee",
      feeNgn: fees.ppap,
      features: [
        "Complete access to the full program",
        "One-time payment, no hidden fees",
        "Invest in the skills that move your career forward",
      ],
      ctaLabel: "Apply Now",
      applyPath: "/ppap/apply",
      variant: "light",
    },
    {
      eyebrow: "Scholarship",
      title: "Apply for a Scholarship",
      feeNgn: fees.ppip,
      features: [
        "Open to promising African applicants",
        "Support based on merit and financial need",
        "Limited scholarships available each cohort",
      ],
      ctaLabel: "Apply for Scholarship",
      applyPath: "/ppip/apply",
      variant: "purple",
      badge: "Recommended",
    },
  ];

  return (
    <section
      className={`${montserrat.className} bg-white px-6 py-[80px] text-[#10091A] sm:px-10 lg:px-[80px]`}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* =====================================================
            HEADER
        ====================================================== */}
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
          INVEST IN YOUR GROWTH
        </p>

        <h2
          className={`${bricolage.className}
            max-w-[650px]
            text-[22px]
            font-extrabold
            leading-[1.15]
            tracking-[-0.04em]
            text-[#10091A]
            sm:text-[32px]
            lg:text-[30px]
          `}
        >
          Choose the Payment Plan
          <br className="hidden sm:block" />
          That Works for You.
        </h2>

        {/* =====================================================
            PLANS
        ====================================================== */}
        <div className="mx-auto mt-[72px] grid max-w-[720px] grid-cols-1 sm:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard key={plan.title} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
