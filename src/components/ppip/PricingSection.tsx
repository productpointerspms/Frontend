"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useLiveRates, currencies } from "@/lib/useLiveRates";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const PPIP_COMMITMENT_FEE_NGN = 20000;

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

const PricingSection: React.FC = () => {
  const {
    currency,
    setCurrency,
    formatLive,
    getLiveAmount,
    loading,
    error,
    isLive,
    priceKey,
  } = useLiveRates(PPIP_COMMITMENT_FEE_NGN);
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

  return (
    <section
      className={`${montserrat.className} bg-[#FCF1FF] py-20 px-6 md:px-12 lg:px-24`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
          Invest In Your Product Career
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-4 mb-12">
          A 12-week execution-focused internship where you move from learning
          about Product Management to building, launching, and documenting a real
          MVP you can showcase with confidence.
        </p>

        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-gray-50 p-8 text-center flex flex-col items-center">
          <span className="inline-block bg-[#F3E8FF] text-[#6024D0] rounded-full px-4 py-1.5 text-xs font-medium mb-6">
            Scholarship-Based Program
          </span>

          <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">
            Apply For The Internship
          </h3>

          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            The internship is free to apply for. Selected applicants will receive
            an acceptance email and are required to pay a commitment fee.
          </p>

          {/* Currency selector */}
          <div className="flex items-center gap-2 mb-6">
            {/* Status badges */}
            {loading && (
              <span className="inline-flex items-center gap-1 text-[10px] text-[#6024D0] font-medium bg-[#F3E8FF] px-2.5 py-1 rounded-full animate-pulse">
                <ArrowRight className="w-2.5 h-2.5 animate-spin" />
                Live rates loading…
              </span>
            )}
            {!loading && isLive && (
              <span className="inline-flex items-center gap-1 text-[10px] text-[#10B981] font-semibold bg-[#ECFDF3] px-2.5 py-1 rounded-full">
                Live rate
              </span>
            )}
            {!loading && error && currency.code !== "NGN" && (
              <span className="text-[10px] text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full font-medium">
                Est. rate
              </span>
            )}

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 text-sm font-semibold text-[#1a1a1a] shadow-sm cursor-pointer hover:bg-gray-50"
              >
                <Flag country={currency.country} />
                {currency.code}
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div className="absolute z-30 mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg w-52 py-2 max-h-64 overflow-auto text-left">
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
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-purple-50 transition-colors ${
                          c.code === currency.code ? "text-[#6024D0] bg-[#F3E8FF] font-semibold" : "text-gray-700"
                        }`}
                      >
                        <Flag country={c.country} />
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <span className="font-semibold">{c.code}</span>
                          {liveAmt ? (
                            <span className={`text-[10px] truncate ${
                              c.code === currency.code ? "text-[#6024D0]/70" : "text-gray-400"
                            }`}>
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

          <div className="mb-8 min-h-[4rem] flex items-center justify-center">
            {loading && currency.code !== "NGN" ? (
              <span className="inline-block h-12 w-40 rounded-xl bg-gray-200 animate-pulse" />
            ) : (
              <div
                key={`price-${priceKey}-${currency.code}`}
                className="text-5xl md:text-6xl font-black text-[#1a1a1a]"
                style={{ animation: "fadeInUp 0.3s ease" }}
              >
                {formatLive(PPIP_COMMITMENT_FEE_NGN)}
              </div>
            )}
          </div>

          <Link
            href={`/ppip/apply?currency=${currency.code}`}
            className="w-full bg-[#6024D0] hover:bg-[#4d1ba8] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Limited internship slots available. Payment is only required after
            acceptance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
