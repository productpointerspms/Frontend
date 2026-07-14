"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Which ProductPointers program is right for me",
    answer:
      "The best program depends on your current experience level and growth goals. Whether you’re starting from scratch, looking for mentorship, seeking hands-on execution experience, or ready to specialize deeply, ProductPointers has a program designed for your stage.",
  },
  {
    question: "How does the internship application process work?",
    answer:
      "Interested applicants submit an application form for review. Selected candidates receive a follow-up email with the next steps, onboarding details, and commitment fee process where applicable.",
  },
  {
    question: "How long does it take to receive a response?",
    answer:
      "We typically respond to inquiries within 24–48 business hours.",
  },
];

const ContactFaqSection: React.FC = () => {
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
    <section className={`${montserrat.className} bg-[#FDF2FF] py-20 px-6 md:px-12 lg:px-24`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#15010D] text-3xl md:text-[42px] font-bold mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#15010D]/60 text-base md:text-lg max-w-3xl mx-auto">
            Quick answers to common questions about ProductPointers programs and experiences
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqData.map((faq, index) => {
            const isOpen = !!openStates[index];
            return (
              <div
                key={index}
                className="bg-[#FAE1FF] rounded-[24px] overflow-hidden transition-all duration-300 shadow-sm border border-[#F3D9FF]"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-[#F7D8FF]"
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
                  <div className="px-8 pb-8 text-[#15010D]/70 text-sm md:text-[16px] leading-relaxed font-medium">
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

export default ContactFaqSection;
