"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ArrowRight, Zap, RefreshCw } from "lucide-react";
import { useLiveRates, currencies } from "@/lib/useLiveRates";
import { getLiveProgramFeeNgn } from "@/lib/programs";

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

const FEATURES = [
  "Full access to all sessions",
  "Mentorship support",
  "Assignments & resources",
];

const PricingSection = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch the real live fee from the API first — this is the authoritative
  // NGN amount that will also appear at checkout, so both pages stay in sync.
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
    priceKey,
  } = useLiveRates(liveFeeNgn ?? 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Loading: either the fee hasn't come back yet, or the rates are still in-flight.
  const isLoading = liveFeeNgn === null || loading;
  const feeDisplay = liveFeeNgn != null ? formatLive(liveFeeNgn) : null;

  return (
    <section
      id="pricing"
      className="bg-[#FCF1FF] py-24 px-6 md:px-12 lg:px-24 flex justify-center scroll-mt-10"
    >
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-4">
          Invest In Your Product Career
        </h2>
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto text-base leading-relaxed">
          A structured 12-week program designed to give you clarity, direction,
          and confidence in Product Management.
        </p>

        <div className="bg-white rounded-[2rem] shadow-sm p-8 md:p-12 max-w-[500px] mx-auto border border-gray-100 flex flex-col items-center">


          {/* Currency selector + live rate badge */}
          <div className="flex items-center gap-2 mb-6">
            {/* Live/loading badge */}
            {isLoading && (
              <span className="inline-flex items-center gap-1 text-[10px] text-[#6024D0] font-medium bg-[#F3E8FF] px-2.5 py-1 rounded-full animate-pulse">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                Live rates loading…
              </span>
            )}
            {!isLoading && isLive && (
              <span className="inline-flex items-center gap-1 text-[10px] text-[#10B981] font-semibold bg-[#ECFDF3] px-2.5 py-1 rounded-full">
                <Zap className="w-2.5 h-2.5" />
                Live rate
              </span>
            )}
            {!isLoading && error && currency.code !== "NGN" && (
              <span className="text-[10px] text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full font-medium">
                Est. rate
              </span>
            )}

            {/* Dropdown trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Flag country={currency.country} />
                {currency.code}
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div className="absolute z-30 mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-2xl shadow-xl w-52 py-2 max-h-72 overflow-auto">
                  {/* Header */}
                  <div className="px-4 pb-2 border-b border-gray-100 mb-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
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
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                          c.code === currency.code
                            ? "bg-[#F3E8FF] text-[#6024D0] font-semibold"
                            : "text-gray-700 hover:bg-purple-50"
                        }`}
                      >
                        <Flag country={c.country} />
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <span className="font-semibold">{c.code}</span>
                          {liveAmt ? (
                            <span
                              className={`text-[10px] truncate ${
                                c.code === currency.code
                                  ? "text-[#6024D0]/70"
                                  : "text-gray-400"
                              }`}
                            >
                              {liveAmt}
                            </span>
                          ) : loading ? (
                            <span className="text-[10px] text-gray-300">
                              Loading…
                            </span>
                          ) : null}
                        </div>
                        {c.code === currency.code && (
                          <Check className="w-3.5 h-3.5 text-[#6024D0] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Main price */}
          <div className="mb-8 min-h-[3.5rem] flex items-center justify-center">
            {isLoading ? (
              <span className="inline-block h-12 w-40 rounded-xl bg-gray-200 animate-pulse" />
            ) : (
              <span
                key={`price-${priceKey}-${currency.code}`}
                className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight"
                style={{ animation: "fadeInUp 0.3s ease" }}
              >
                {feeDisplay}
              </span>
            )}
          </div>

          <div className="w-full h-px bg-gray-100 mb-8" />

          <div className="space-y-5 mb-10 w-full text-left pl-4 md:pl-8">
            {FEATURES.map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-purple-600" strokeWidth={3} />
                </div>
                <span className="text-gray-500 text-[13px] font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Link
            href={`/ppap/apply?currency=${currency.code}`}
            className="w-full bg-[#6D28D9] text-white py-4 rounded-xl font-medium text-base hover:bg-[#5b21b6] transition-colors mb-4 flex items-center justify-center gap-2 cursor-pointer"
          >
            Enroll Now <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-xs text-gray-400 leading-relaxed max-w-[360px]">
            We keep our cohorts small to ensure quality mentorship. <br />
            Limited spots available for the next intake.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
