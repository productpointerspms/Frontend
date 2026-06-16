"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type FAQItem = {
  q: string;
  a: string;
};

const faqs: FAQItem[] = [
  {
    q: "Do I need prior PM experience?",
    a: "No prior formal PM experience is required, but you should understand the basics of Product Management. PPIP is designed to help you turn that theoretical knowledge into proven experience.",
  },
  {
    q: "What if I don't have a product idea?",
    a: "You don't need one. You will be matched with real stakeholder challenges or guided through a structured discovery process to find a validated problem to solve.",
  },
  {
    q: "What if I already completed a PM course?",
    a: "Perfect. PPIP is the ideal next step. Courses teach you how to be a PM; PPIP gives you the environment to actually be one and build the evidence recruiters want.",
  },
  {
    q: "Will I work on real products?",
    a: "Yes. You will build a functional MVP, launch it publicly, and gather real user feedback. This is not a theoretical case study.",
  },
  {
    q: "How much time is required weekly?",
    a: "Expect to commit 10-15 hours per week. This includes stakeholder meetings, user interviews, product work, and mentor check-ins.",
  },
  {
    q: "Will recruiters see my work?",
    a: "Yes. Your work will be compiled into a verified Talent Profile, showcased at Demo Day, and shared with our hiring partners via the Talent Directory.",
  },
  {
    q: "Do I receive a certificate?",
    a: "While you do receive completion acknowledgment, our focus is on the verified Talent Profile. Employers value the public evidence of your work far more than a PDF certificate.",
  },
];

const FAQSection: React.FC = () => {
  // All items open by default (matching the design); each toggles independently.
  const [openIndices, setOpenIndices] = useState<number[]>(faqs.map((_, i) => i));

  const toggle = (index: number) =>
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  return (
    <section
      className={`${montserrat.className} bg-[#FCF1FF] py-20 px-6 md:px-12 lg:px-24`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a]">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-4 mb-12">
          Everything you need to know about the ProductPointers Internship Program
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 ">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div key={faq.q} className="bg-[#FAE1FF] rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
              >
                <span className="font-bold text-[#1a1a1a] text-sm md:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6">
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
