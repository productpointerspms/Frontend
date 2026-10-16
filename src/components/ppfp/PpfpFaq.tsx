"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Do I need fintech experience to join?",
    answer: `No.
The program is designed to take participants from little or no fintech knowledge to a stronger understanding of financial products, fintech ecosystems and fintech Product Management.`,
  },
  {
    question: "Do I need to be a Product Manager?",
    answer: `No, but the program is primarily designed for aspiring, entry-level and practicing Product Managers, particularly those interested in fintech.`,
  },
  {
    question: "Is this a technical course?",
    answer: `No.
You will learn how the technology, infrastructure and financial systems behind fintech products work at a Product Management level. You are not expected to become a software engineer or financial engineer.`,
  },
  {
    question: "Will we work on real fintech products?",
    answer: `You'll analyse and tear down fintech products and work through realistic fintech scenarios, product problems and case studies throughout the program.`,
  },
  {
    question: "What happens during the capstone?",
    answer: `The capstone gives you the opportunity to bring together what you've learned and apply it to a practical fintech product challenge.
You'll work through the problem, users, opportunity, product solution, risks, business value and more.`,
  },
  {
    question: "How much time should I commit?",
    answer: `This is an intensive program.
You should be prepared to attend live sessions, complete weekly practical activities and assignments, participate with your cohort and dedicate additional time to the capstone.`,
  },
  {
    question: "How many people will be in the cohort?",
    answer: `The cohort is limited to 20 participants.`,
  },
  {
    question: "Will I receive a certificate?",
    answer: `Yes, participants who successfully complete the program will receive a ProductPointers certificate of completion, subject to the program's completion requirements.`,
  },
  {
    question: "What payment options are available?",
    answer: `You can choose:
₦300,000 once
₦150,000 × 2
₦110,000 × 3`,
  },
  {
    question: "What if I have more questions before enrolling?",
    answer: `You can contact the ProductPointers team and we'll help you understand whether the program is the right fit for your goals.`,
  },
];

export default function PpfpFaq() {
  // null = every item closed on first load
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-white px-4 pb-20 md:px-12 lg:px-14 md:pt-40">
      <div className="mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-20">
        {/* Left column */}
        <div className="flex flex-col l">
          <p className="mb-2 md:mb-4 text-xs font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#5818D0] md:text-base md:font-semibold">
            FAQ
          </p>
          <h2 className=" text-[20px] md:w-80 font-semibold leading-normal tracking-[-1.134px] text-[#0E0A1A]  md:text-[30.8px] md:font-bold md:leading-[43.47px]">
            Everything You Need to Know.
          </h2>

          <div className="mt-14 hidden md:block">
            <h3 className="text-[20px] leading-7 font-semibold text-[#0E0A1A]">
              Still have a question?
            </h3>
            <p className="mt-2  text-[12px] leading-5 text-[#525252]">
              You can contact the ProductPointers team and we&apos;ll help you
              understand whether the program is the right fit for your goals.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-md bg-[#5818D0] px-8 py-3 text-sm font-semibold leading-[21.12px] tracking-[0.282px] text-white transition-colors hover:bg-[#0E0A1A] cursor-pointer"
            >
              Send Message
            </Link>
          </div>
        </div>

        {/* Right column - accordion */}
        <div className="flex flex-col  gap-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`rounded-xl border lg:w-188 transition-colors ${
                  isOpen
                    ? "border-[#F2EDFB] bg-[#F2EDFB]"
                    : "border-[#F2EDFB] bg-[#F2EDFB]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-2 text-left"
                >
                  <span className="text-[12px] font-semibold text-[#0E0A1A] md:text-sm leading:7">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      isOpen ? "text-[#717182]" : "text-[#717182]"
                    }`}
                  >
                    {isOpen ? (
                      <ChevronUp className="h-6 w-6" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="h-6 w-6" strokeWidth={2.5} />
                    )}
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-4 whitespace-pre-line md:text-[12px] text-[10px] leading-6 text-[#6D6D6D]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile "Still have a question?" */}
        <div className="mt-8 md:hidden block">
          <h3 className="text-[20px] leading-7 font-semibold text-[#0E0A1A]">
            Still have a question?
          </h3>
          <p className="mt-2  text-[12px] leading-5 text-[#525252]">
            You can contact the ProductPointers team and we&apos;ll help you
            understand whether the program is the right fit for your goals.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-md bg-[#5818D0] px-8 py-3 text-sm font-semibold leading-[21.12px] tracking-[0.282px] text-white transition-colors hover:bg-[#0E0A1A] cursor-pointer"
          >
            Send Message
          </Link>
        </div>
      </div>
    </section>
  );
}
