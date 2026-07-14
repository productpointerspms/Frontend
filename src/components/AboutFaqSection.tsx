"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Why was ProductPointers created?",
    answer:
      "ProductPointers was created to help aspiring and growing Product Managers gain clarity, mentorship, structure, and practical guidance in Product Management. We noticed many people struggled with scattered learning resources and lacked direction, so ProductPointers was built to provide a more guided and supportive growth experience.",
  },
  {
    question: "Who are the mentors at ProductPointers?",
    answer:
      "ProductPointers mentors are experienced Product Managers, Technical Product Managers, Analysts, and industry professionals actively working across different sectors in tech. They guide learners through mentorship, accountability, practical learning, and real-world Product Management thinking.",
  },
  {
    question: "What makes ProductPointers different from other PM platforms?",
    answer:
      "ProductPointers focuses on structured growth, practical execution, mentorship, accountability, and long-term career development, not just theory. Instead of overwhelming learners with scattered resources, we guide them step-by-step through real Product Management growth and execution.",
  },
];

const AboutFaqSection: React.FC = () => {
  // Keep track of open state for each index independently, open by default
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  const toggleAccordion = (index: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className={`${montserrat.className} bg-[#FDF4FF] py-20 px-6 md:px-12 lg:px-24`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h2 className="text-[#15010D] text-3xl md:text-[42px] font-bold text-center mb-16 tracking-tight">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqData.map((faq, index) => {
            const isOpen = !!openStates[index];
            return (
              <div
                key={index}
                className="bg-[#FAE8FF]/40 border border-[#F5E6FF] rounded-[24px] overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-[#FAE8FF]/60"
                >
                  <span className="text-[16px] md:text-[18px] font-bold text-[#15010D] tracking-tight">
                    {faq.question}
                  </span>
                  <div className="shrink-0 ml-4">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#15010D]/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#15010D]/60" />
                    )}
                  </div>
                </button>

                {/* Accordion Content with smooth height transition */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-8 text-[#15010D] opacity-70 text-sm md:text-[16px] leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutFaqSection;
