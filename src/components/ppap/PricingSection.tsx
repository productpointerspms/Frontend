"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronDown,
} from "lucide-react";

import { useLiveRates, currencies } from "@/lib/useLiveRates";
import { bricolage } from "@/lib/fonts";
import styles from "./pricing.module.css";

// Headings share the PPIP display face — variable weight covers 200-800.

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
    id: "tier-03",
    tier: "Full program fee",
    heading: "One time payment",
    amount: 255000,
    suffix: "",
    note: "Enjoy ₦40,000 savings with one upfront payment.",
    featured: true,
    features: [
      "Pay your full tuition upfront and get access to the complete 12-week PPAP experience. Includes:",
      "12 weeks of practical Product Management learning",
      "Practical assignments",
      "Capstone projects",
      "Product Management case studies",
      "Live classes & class recordings",
      "Certificate of completion",
      "Access to the alumni community",
      "Mentorship and guidance",
      "Career and portfolio development",
      "Public profile and personal brand building",
    ],
  },
  {
    id: "tier-02",
    tier: "Pay in 2 installments",
    heading: "Pay in 2 Installments",
    amount: 142500,
    suffix: "x2",
    note: "Enjoy ₦10,000 savings with two flexible payments.",
    features: [
      "Split your tuition into 2 payments",
      "Pay the final installment two weeks into the program",
      "Secure your spot and start learning",
    ],
  },
  {
    id: "tier-01",
    tier: "Pay in 3 installments",
    heading: "Pay in 3 Installments",
    amount: 98333,
    suffix: "x3",
    note: "Spread your investment over three payments.",
    features: [
      "Split your tuition into 3 flexible payments",
      "Start learning without paying the full amount upfront",
      "Secure your spot and pay in manageable installments",
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
        aria-label={`Select currency, currently ${currency.code}`}
        aria-expanded={open}
        onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}
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
  const { currency, setCurrency, formatLive, getLiveAmount, loading, error, isLive } = useLiveRates(255000);

  return (
    <section data-ppap-section="PricingSection" id="pricing" className={styles.section} aria-labelledby="ppap-pricing-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p>Invest in your growth</p>
          <h2 id="ppap-pricing-title" className={bricolage.className}>Choose the Payment Plan<br />That Works for You.</h2>
        </header>
        <div className={styles.table}>
          {plans.map(plan => (
            <article key={plan.id} className={`${styles.plan} ${plan.featured ? styles.featured : ""}`} aria-label={plan.tier}>
              {plan.featured && <span className={styles.bestValue}>Best Value</span>}
              <h3 className={styles.tier}>{plan.tier}</h3>
              <p className={styles.paymentType}>{plan.heading}</p>
              <p className={styles.price}><strong className={bricolage.className}>{formatLive(plan.amount)}</strong>{plan.suffix && <span>{plan.suffix}</span>}</p>
              <p className={styles.note}>{plan.note}</p>
              <div className={styles.currency}><CurrencySelector currency={currency} setCurrency={setCurrency} getLiveAmount={getLiveAmount} loading={loading} dark={plan.featured} /></div>
              <ul className={styles.features}>{plan.features.map(feature => <li key={feature}><span><Check size={9} strokeWidth={2.5} aria-hidden="true" /></span><p>{feature}</p></li>)}</ul>
              <div className={styles.divider} />
              <Link href={`/ppap/apply?currency=${currency.code}&plan=${plan.id}`} className={styles.cta}>{plan.featured ? "Enroll Now" : "Choose this Plan"}</Link>
            </article>
          ))}
        </div>
        {currency.code !== "NGN" && <p className={styles.rateStatus} role="status">{loading ? "Updating currency conversion…" : isLive ? "Prices converted using live exchange rates." : error ? "Estimated conversion. Final payment details are confirmed during application." : "Prices shown in your selected currency."}</p>}
        <aside className={styles.scholarship} aria-labelledby="ppap-scholarship-support">
          <div><h3 id="ppap-scholarship-support" className={bricolage.className}>Looking for Scholarship Support?</h3><p>Scholarship opportunities may be available for eligible applicants. Check the scholarship page to see current opportunities and application details.</p></div>
          <Link href={`/ppap/apply?currency=${currency.code}&plan=scholarship`} className={styles.scholarshipLink}>Apply for Scholarship</Link>
        </aside>
      </div>
    </section>
  );
};

export default PricingSection;
