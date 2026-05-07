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
      "Our programs are tailored to different stages of your journey. Whether you are a beginner looking for a foundation or an intermediate learner seeking real-world execution, we have a path for you.",
  },
  {
    question: "Do I need Product Management experience to join?",
    answer:
      "No. Our foundation programs are specifically designed for individuals transitioning into the field, while our advanced tracks help those with some experience level up.",
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
    <div className={`${montserrat.className} bg-[#FDF4FF] py-20 px-4 min-h-fit`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#15010D] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#15010D] text-lg md:text-xl font-normal opacity-80">
            Everything you need to know about the Accelerator Program
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-[#F9E5FF] rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="text-base md:text-lg font-semibold text-[#15010D]">
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
                <div className="px-8 pb-8 text-[#15010D] opacity-60 text-base md:text-lg leading-relaxed">
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