"use client";

import { useState } from "react";
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
    question: "Which ProductPointers program is right for me?",
    answer:
      "The right program depends on your current stage and goals. PPAP is best for beginners looking for foundational Product Management knowledge, PPMP focuses on structured mentorship and guidance, PPIP is designed for hands-on execution and real product experience, PPCP offers personalized 1:1 coaching, while PPTP helps Product Managers specialize and deepen expertise in a chosen track.",
  },
  {
    question: "Do I need Product Management experience to join?",
    answer:
      "No. Some ProductPointers programs are beginner-friendly and designed to help aspiring Product Managers start with clarity and structure. More advanced programs like PPTP are intended for individuals with some prior Product Management knowledge or experience.",
  },
  {
    question: "Are the programs remote?",
    answer:
      "Yes. ProductPointers programs are designed to support remote learning, collaboration, mentorship, and product execution.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(2); // Setting 2 as default open to match image

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${montserrat.className} bg-[#FCF1FF] py-20 px-4 min-h-fit`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#15010D] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#15010D] text-base md:text-lg font-normal opacity-80">
            Everything you need to know about the Accelerator Program
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-[#FAE1FF] rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="text-sm md:text-base font-semibold text-[#15010D]">
                  {faq.question}
                </span>
                <div className="shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#15010D]/60" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#15010D]/60" />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-60 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-8 text-[#15010D] opacity-60 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}