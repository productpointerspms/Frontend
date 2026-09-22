"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  RefreshCw,
  Zap,
} from "lucide-react";

import { useLiveRates, currencies } from "@/lib/useLiveRates";
import { getLiveProgramFeeNgn } from "@/lib/programs";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


type Currency = (typeof currencies)[number];

const Flag = ({ country }: { country: string }) => (
  <img
    src={`https://flagcdn.com/24x18/${country}.png`}
    alt=""
    width={20}
    height={15}
    className="h-auto w-5 shrink-0 rounded-sm"
  />
);

const plans = [
  {
    id: "tier-01",
    tier: "Tier 01",
    heading: "Pay in 3 Installments",
    amount: 98333,
    suffix: "x3",
    note: "Spread your investment over three payments.",
    features: [
      "Includes all features and benefits available in every tier",
      "Initial payment required upon enrollment",
      "Two convenient payment installments during the program",
    ],
  },
  {
    id: "tier-02",
    tier: "Tier 02",
    heading: "Pay in 2 Installments",
    amount: 142500,
    suffix: "x2",
    note: "Save ₦10,000 with two payments.",
    features: [
      "Enjoy full access to all program features and benefits, just like every other tier.",
      "Make your full payment when you accept your spot in the program.",
      "Complete your final payment installment during the course of the program.",
    ],
  },
  {
    id: "tier-03",
    tier: "Tier 03",
    heading: "One time payment",
    amount: 275000,
    suffix: "",
    note: "Save ₦20,000 with one upfront payment.",
    featured: true,
    features: [
      "Full access to all program features and benefits",
      "Single upfront payment",
      "No additional fees or charges",
    ],
  },
];

const CurrencySelector = ({
  currency,
  setCurrency,
  getLiveAmount,
  loading,
  dark = false,
}: {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  getLiveAmount: (currency: Currency) => string | null;
  loading: boolean;
  dark?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex items-center gap-2 rounded-full border px-3 py-[7px]
          text-[13px] font-medium transition
          ${
            dark
              ? "border-white/70 text-white hover:bg-white/10"
              : "border-[#1D1824] text-[#17131D] hover:bg-gray-50"
          }
        `}
      >
        <Flag country={currency.country} />

        {currency.code}

        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-2 max-h-[260px] w-[210px] -translate-x-1/2 overflow-y-auto rounded-xl border border-gray-200 bg-white py-2 shadow-xl">
          {currencies.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setCurrency(item);
                setOpen(false);
              }}
              className={`
                flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs
                ${
                  item.code === currency.code
                    ? "bg-[#5818D014] text-[#5818D0]"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <Flag country={item.country} />

              <div className="flex-1">
                <p className="font-semibold">{item.code}</p>

                {loading ? (
                  <p className="text-[10px] text-gray-400">Loading...</p>
                ) : (
                  <p className="text-[10px] text-gray-400">
                    {getLiveAmount(item)}
                  </p>
                )}
              </div>

              {item.code === currency.code && (
                <Check className="h-3.5 w-3.5 text-[#5818D0]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const PricingSection = () => {
  const [liveFeeNgn, setLiveFeeNgn] = useState<number | null>(null);

  useEffect(() => {
    getLiveProgramFeeNgn("PPAP").then(setLiveFeeNgn);
  }, []);

  const {
    currency,
    setCurrency,
    formatLive,
    getLiveAmount,
    loading,
    error,
    isLive,
  } = useLiveRates(liveFeeNgn ?? 0);

  const isLoading = liveFeeNgn === null || loading;

  return (
    <section
      id="pricing"
      className="w-full bg-white px-6 py-20 md:px-12 lg:px-16 lg:py-[72px]"
    >
      <div className="mx-auto max-w-[1280px]">

        {/* HEADER */}
        <div className="max-w-[520px]">
          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#5818D0]">
            Invest In Your Growth
          </p>

          <h2 className={`${bricolage.className} text-[22px] font-extrabold leading-[1.12] tracking-[-0.04em] text-[#12101A] sm:text-[38px] lg:text-[40px]`}>
            Choose the Payment Plan
            <br />
            That Works for You.
          </h2>
        </div>

        {/* LIVE RATE STATUS */}
        <div className="mt-6 flex min-h-[24px] items-center gap-2">
          {isLoading && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5818D014] px-3 py-1 text-[10px] font-medium text-[#5818D0]">
              <RefreshCw className="h-3 w-3 animate-spin" />
              Loading live rates
            </span>
          )}

          {!isLoading && isLive && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold text-green-600">
              <Zap className="h-3 w-3" />
              Live currency rates
            </span>
          )}

          {!isLoading && error && currency.code !== "NGN" && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-medium text-amber-600">
              Estimated exchange rate
            </span>
          )}
        </div>

        {/* PRICING TABLE */}
        <div
          className="
            mt-[72px]
            grid
            auto-rows-fr
            grid-cols-1
            overflow-visible
            rounded-[14px]
            border
            border-[#CCC8D0]
            lg:grid-cols-3
          "
        >
          {plans.map((plan, index) => {
            const featured = plan.featured;

            return (
              <article
                key={plan.id}
                className={`
                  relative
                  flex
                  min-h-[430px]
                  flex-col
                  px-7
                  py-9
                  md:px-8
                  ${
                    featured
                      ? "bg-[#5818D0] text-white lg:rounded-r-[13px]"
                      : "bg-white text-[#18141D]"
                  }
                  ${
                    index > 0 && !featured
                      ? "border-t border-[#CCC8D0] lg:border-l lg:border-t-0"
                      : ""
                  }
                  ${
                    index === 0
                      ? "rounded-t-[13px] lg:rounded-l-[13px] lg:rounded-tr-none"
                      : ""
                  }
                `}
              >
                {/* BEST VALUE */}
                {featured && (
                  <span className="absolute right-7 top-5 rounded-[4px] bg-[#FFC120] px-4 py-[5px] text-[10px] font-bold text-[#171018]">
                    Best Value
                  </span>
                )}

                {/* TIER */}
                <p
                  className={`
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    ${featured ? "text-white/80" : "text-[#B0ABB4]"}
                  `}
                >
                  {plan.tier}
                </p>

                {/* PAYMENT TYPE */}
                <p
                  className={`
                    mt-5
                    text-[12px]
                    font-medium
                    ${featured ? "text-white" : "text-[#4D4851]"}
                  `}
                >
                  {plan.heading}
                </p>

                {/* PRICE */}
                <div className="mt-2 flex items-end gap-1">
                  {isLoading ? (
                    <span
                      className={`
                        h-9 w-36 animate-pulse rounded-lg
                        ${featured ? "bg-white/15" : "bg-gray-200"}
                      `}
                    />
                  ) : (
                    <>
                      <span className="text-[29px] font-bold leading-none tracking-[-0.04em]">
                        {formatLive(plan.amount)}
                      </span>

                      {plan.suffix && (
                        <span
                          className={`
                            mb-[2px]
                            text-[12px]
                            ${featured ? "text-white/70" : "text-[#5C5660]"}
                          `}
                        >
                          {plan.suffix}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* SUBTEXT */}
                <p
                  className={`
                    mt-2
                    text-[12px]
                    leading-[1.5]
                    ${featured ? "text-white/80" : "text-[#7D7881]"}
                  `}
                >
                  {plan.note}
                </p>

                {/* CURRENCY */}
                <div className="mt-4 flex justify-center">
                  <CurrencySelector
                    currency={currency}
                    setCurrency={setCurrency}
                    getLiveAmount={getLiveAmount}
                    loading={loading}
                    dark={featured}
                  />
                </div>

                {/* FEATURES */}
                <div className="mt-5 flex flex-1 flex-col gap-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2.5"
                    >
                      <div
                        className={`
                          mt-[2px]
                          flex
                          h-4
                          w-4
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          ${
                            featured
                              ? "bg-white/10"
                              : "bg-[#5818D014]"
                          }
                        `}
                      >
                        <Check
                          className={`
                            h-2.5
                            w-2.5
                            ${
                              featured
                                ? "text-white"
                                : "text-[#5818D0]"
                            }
                          `}
                          strokeWidth={2.5}
                        />
                      </div>

                      <p
                        className={`
                          text-[11px]
                          leading-[1.55]
                          ${
                            featured
                              ? "text-white/90"
                              : "text-[#767078]"
                          }
                        `}
                      >
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                {/* DIVIDER */}
                <div
                  className={`
                    my-5
                    h-px
                    w-full
                    ${
                      featured
                        ? "bg-white/70"
                        : "bg-[#CFCBD2]"
                    }
                  `}
                />

                {/* CTA */}
                <Link
                  href={`/ppap/apply?currency=${currency.code}&plan=${plan.id}`}
                  className={`
                    flex
                    h-[44px]
                    w-full
                    items-center
                    justify-center
                    rounded-[5px]
                    text-[13px]
                    font-semibold
                    transition
                    ${
                      featured
                        ? "bg-[#FFBF1F] text-[#5818D0] hover:bg-[#FFCA40]"
                        : "border border-[#5818D0] bg-white text-[#5818D0] hover:bg-[#5818D014]"
                    }
                  `}
                >
                  Apply Now
                </Link>
              </article>
            );
          })}
        </div>

        {/* SCHOLARSHIP */}
        <div className="mt-10 flex justify-center">
          <article
            className="
              w-full
              bg-[#5818D0]
              px-7
              py-9
              text-white
              lg:max-w-[320px]
            "
          >
            <p className="text-[11px] font-medium text-white">
              Need Support?
            </p>

            <h3 className={`${bricolage.className} mt-5 text-[16px] font-semibold`}>
              Apply for a Scholarship
            </h3>

            <div className="mt-3">
              {isLoading ? (
                <span className="inline-block h-8 w-28 animate-pulse rounded-md bg-white/15" />
              ) : (
                <p className="text-[27px] font-bold tracking-[-0.03em]">
                  {formatLive(75000)}
                </p>
              )}
            </div>

            <div className="mt-4 flex justify-center">
              <CurrencySelector
                currency={currency}
                setCurrency={setCurrency}
                getLiveAmount={getLiveAmount}
                loading={loading}
                dark
              />
            </div>

            <div className="mt-5 space-y-4">
              {[
                "Scholarships open to talented African candidates",
                "Scholarships awarded based on merit and financial need",
                "Limited scholarship spots per cohort available",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5"
                >
                  <div className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Check
                      className="h-2.5 w-2.5 text-white"
                      strokeWidth={2.5}
                    />
                  </div>

                  <p className="text-[11px] leading-[1.55] text-white/90">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-5 h-px bg-white/70" />

            <Link
              href={`/ppap/apply?currency=${currency.code}&plan=scholarship`}
              className="
                flex
                h-[43px]
                w-full
                items-center
                justify-center
                rounded-[5px]
                bg-[#FFBF1F]
                text-[13px]
                font-semibold
                text-[#5818D0]
                transition
                hover:bg-[#FFCA40]
              "
            >
              Apply for Scholarship
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;