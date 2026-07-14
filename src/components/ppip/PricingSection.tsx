"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Montserrat } from "next/font/google";
import {
  currencies,
  format,
  type Currency,
} from "@/lib/pricing";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const PPIP_ORIGINAL_FEE_NGN = 100000;
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
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
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
          A 10-week execution-focused internship where you move from learning
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

          <p className="text-gray-400 line-through text-lg font-medium mb-5">
            {format(PPIP_ORIGINAL_FEE_NGN, currency)} Program Fee
          </p>

          {/* Currency selector */}
          <div className="relative mb-6" ref={dropdownRef}>
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
              <div className="absolute z-20 mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg w-48 py-2 max-h-64 overflow-auto text-left">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCurrency(c);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-purple-50 transition-colors ${
                      c.code === currency.code ? "text-[#6024D0] font-semibold" : "text-gray-700"
                    }`}
                  >
                    <Flag country={c.country} />
                    <span>{c.code}</span>
                    <span className="text-gray-400 ml-auto">{c.symbol.trim()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="text-5xl md:text-6xl font-black text-[#1a1a1a] mb-8">
            {format(PPIP_COMMITMENT_FEE_NGN, currency)}
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
