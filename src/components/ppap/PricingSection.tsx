"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Check, ChevronDown, ArrowRight } from "lucide-react";
import {
  currencies,
  format,
  PROGRAM_FEE_NGN,
  ORIGINAL_FEE_NGN,
  type Currency,
} from "@/lib/pricing";

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

const PricingSection = () => {
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
    <section className="bg-[#FCF1FF] py-24 px-6 md:px-12 lg:px-24 flex justify-center">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-4">
          Invest In Your Product Career
        </h2>
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto text-base leading-relaxed">
          A structured 12-week program designed to give you clarity, direction, and confidence in Product Management.
        </p>

        <div className="bg-white rounded-[2rem] shadow-sm p-8 md:p-12 max-w-[500px] mx-auto border border-gray-100 flex flex-col items-center">
          <p className="text-xs text-gray-400 mb-4 font-medium">Limited early bird spots available</p>

          <div className="bg-purple-100 text-purple-500 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-wide">
            Early Bird
          </div>

          <p className="text-gray-400 line-through text-base font-medium mb-4">
            {format(ORIGINAL_FEE_NGN, currency)} Program Fee
          </p>

          {/* Currency selector */}
          <div className="relative mb-6" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50"
            >
              <Flag country={currency.country} />
              {currency.code}
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="absolute z-20 mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg w-48 py-2 max-h-64 overflow-auto">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCurrency(c);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-xs hover:bg-purple-50 transition-colors ${
                      c.code === currency.code ? "text-[#6D28D9] font-semibold" : "text-gray-700"
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

          <div className="mb-8">
            <span className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight">
              {format(PROGRAM_FEE_NGN, currency)}
            </span>
          </div>

          <div className="w-full h-px bg-gray-100 mb-8"></div>

          <div className="space-y-5 mb-10 w-full text-left pl-4 md:pl-8">
            {["Full access to all sessions", "Mentorship support", "Assignments & resources"].map(
              (item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-purple-600" strokeWidth={3} />
                  </div>
                  <span className="text-gray-500 text-[13px] font-medium">{item}</span>
                </div>
              )
            )}
          </div>

          <Link
            href={`/ppap/checkout?currency=${currency.code}`}
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
