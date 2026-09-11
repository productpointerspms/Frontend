"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

type FAQItem = {
  q: string;
  a: string;
};

const faqs: FAQItem[] = [
  {
    q: "Do I need previous Product Management experience to apply?",
    a: "No. You don't need previous Product Management experience, but you should understand the fundamentals of Product Management and be ready to apply what you know in a hands-on environment.",
  },
  {
    q: "Is PPIP a course or an internship?",
    a: "PPIP is a 12-week, hands-on Product Management apprenticeship/internship program. It is not another theory-based course. You’ll apply your Product Management knowledge by working through real product challenges, conducting research, making product decisions and developing solutions with guidance and feedback.",
  },
  {
    q: "What kind of projects will I work on?",
    a: "You’ll work through realistic product challenges and problems, involving activities such as user research, problem discovery, validation, prioritisation, product requirements and solution development. Your work will build toward a documented, portfolio-ready product case study.",
  },
  {
    q: "How much time do I need to commit each week?",
    a: "You should expect to commit approximately 10–15 hours per week to the apprenticeship, including research, team collaboration, assignments, product work, reviews and presentations.",
  },
  {
    q: "Will I receive mentorship and feedback?",
    a: "Yes. You’ll receive guidance and structured feedback from experienced Product professionals throughout the apprenticeship. Mentors and coaches will review your work, challenge your thinking and help you improve your product decisions and deliverables.",
  },
  {
    q: "What will I have to show after the apprenticeship?",
    a: "You’ll leave with evidence of your Product Management capabilities, including your product research insights, product requirements and deliverables, mentor-reviewed work, and a documented, portfolio-ready product case study. You’ll also have experience you can confidently discuss when applying for Product opportunities.",
  },
];

const FAQSection: React.FC = () => {
  // Single-open accordion, first item expanded to match the design.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <section
      className={`${montserrat.className} bg-white px-6 py-[80px] text-[#10091A] sm:px-10 lg:px-[80px]`}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-[120px]">
        {/* =====================================================
            LEFT — HEADER + CONTACT
        ====================================================== */}
        <div>
          <p
            className={`${bricolage.className}
              mb-5
              text-[11px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-[#6424E8]
            `}
          >
            FAQ
          </p>

          <h2
            className={`${bricolage.className}
              text-[22px]
              font-extrabold
              leading-[1.15]
              tracking-[-0.04em]
              text-[#10091A]
              sm:text-[32px]
              lg:text-[30px]
            `}
          >
            Everything You
            <br className="hidden sm:block" />
            Need to Know.
          </h2>

          <h3
            className={`${bricolage.className} mt-[56px] text-[18px] font-bold tracking-[-0.02em] text-[#10091A]`}
          >
            Still have a question?
          </h3>

          <p className="mt-3 max-w-[380px] text-[14px] leading-[1.7] text-[#4A4458]">
            If your question is not answered here, reach out using the contact
            widget &mdash; we are happy to help you figure out if PPIP is the
            right fit.
          </p>

          <a
            href="mailto:support@productpointers.com"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-[#6024D0] px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#4d1ba8]"
          >
            Send Message
          </a>
        </div>

        {/* =====================================================
            RIGHT — ACCORDION
        ====================================================== */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className="rounded-[12px] bg-[#F4EFFE]">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span
                    className={`${bricolage.className} text-[15px] font-bold leading-[1.4] tracking-[-0.01em] text-[#10091A]`}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#6B6577] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="max-w-[92%] text-[14px] leading-[1.75] text-[#4A4458]">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
