"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Headings share the PPAP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Who is ProductPointers for?",
    answer:
      "ProductPointers is designed for aspiring Product Managers, career switchers and early-career Product professionals. Whether you're trying to break into Product Management, gain practical experience or strengthen your Product skills, we have different learning paths designed to meet you where you are.",
  },
  {
    question: "Which ProductPointers program is right for me?",
    answer:
      "The right program depends on your current experience, career goals and the type of support you need. Our learning paths cover mentorship, practical experience, internships and specialization tracks.",
  },
  {
    question: "Do I need a background in Tech or Product Management to apply?",
    answer:
      "No. ProductPointers supports both beginners and people transitioning from other career paths. You can start without prior Product Management or technical experience.",
  },
  {
    question: "Will I get practical experience, or is it just classroom learning?",
    answer:
      "Our programs are designed to combine structured learning with practical exercises, projects and real-world Product Management scenarios so you can build hands-on experience.",
  },
  {
    question: "Are scholarships or sponsorship opportunities available?",
    answer:
      "Scholarship and sponsorship opportunities may be available for selected programs. Availability can vary, so we recommend checking the specific program details or contacting the ProductPointers team.",
  },
  {
    question: "What happens after I complete a ProductPointers program?",
    answer:
      "After completing a program, you can continue building your portfolio, pursue more advanced learning tracks and apply your new skills to internships, entry-level roles and practical Product opportunities.",
  },
];

const ContactFaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const scrollToContact = () => {
    document
      .getElementById("contact-message-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className={`${montserrat.className} w-full bg-white px-6 py-20 md:px-10 lg:px-20 lg:py-20`}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        {/* LEFT SIDE */}
        <div className="flex flex-col">
          {/* FAQ label */}
          <span className="mb-5 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#6024D0]">
            FAQ
          </span>

          {/* Heading */}
          <h2 className={`${bricolage.className} max-w-[430px] text-[34px] font-bold leading-[1.18] tracking-[-0.04em] text-[#17131F] sm:text-[38px] lg:text-[40px]`}>
            Questions We Hear{" "}
            <br />
            Most Often
          </h2>

          {/* Secondary CTA block */}
          <div className="mt-14 lg:mt-16">
            <h3 className={`${bricolage.className} text-[18px] font-bold text-[#17131F]`}>
              Still have a question?
            </h3>

            <p className="mt-3 max-w-[400px] text-[13px] font-normal leading-[1.7] text-[#737076]">
              Cant find an answer to your question? send us a message and we
              will get back to you as soon as possible
            </p>

            <button
              onClick={scrollToContact}
              className="mt-8 rounded-[6px] bg-[#5D1BD7] px-8 py-[14px] text-[13px] font-bold text-white transition-colors duration-200 hover:bg-[#4C13BB]"
            >
              Send Message
            </button>
          </div>
        </div>

        {/* RIGHT SIDE FAQ */}
        <div className="flex flex-col gap-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-[12px] bg-[#F0EAF9]"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between gap-6 px-4 text-left transition-all duration-300 sm:px-4 ${
                    isOpen ? "pb-2 pt-4" : "py-[13px]"
                  }`}
                >
                  <span className="text-[13px] font-semibold leading-[1.45] text-[#1D1925] sm:text-[14px]">
                    {faq.question}
                  </span>

                  <span className="shrink-0 text-[#7E7A86]">
                    {isOpen ? (
                      <ChevronUp size={18} strokeWidth={1.8} />
                    ) : (
                      <ChevronDown size={18} strokeWidth={1.8} />
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-3 text-[11px] font-normal leading-[2.05] text-[#88838E] sm:text-[12px]">
                      {faq.answer}
                    </div>
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
