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
    question: "Who is ProductPointers for?",
    answer:
      "ProductPointers is designed for aspiring Product Managers, career switchers and early-career Product professionals. Whether you're trying to break into Product Management, gain practical experience or strengthen your Product skills, we have different learning paths designed to meet you where you are.",
  },
  {
    question: "Which ProductPointers program is right for me?",
    answer: `That depends on where you are in your journey.
Accelerator Program — For aspiring Product Managers and career switchers building a strong foundation.
Apprenticeship Program — For those who need practical experience and real evidence of their Product skills.
Track Program — For early-career Product Managers looking to deepen their skills and grow.
1:1 Coaching — For personalised guidance tailored to your specific career goals.
Not sure where you fit? We'll help you find the right path.`,
  },
  {
    question: "Do I need a background in Tech or Product Management to apply?",
    answer: `No.
You don't need a degree in Tech or previous Product Management experience to begin.
Our programs are designed to support people from different professional backgrounds who are serious about learning, building relevant skills and growing their careers in Product.`,
  },
  {
    question:
      "Will I get practical experience, or is it just classroom learning?",
    answer: `You'll do more than just learn the theory.
Depending on your program, you'll work through practical product challenges, apply Product frameworks, conduct research, make product decisions and build work that demonstrates what you can do.
The goal is not simply to help you complete a course, but to help you build real skills, confidence and evidence of your capabilities.`,
  },
  {
    question: "Are scholarships or sponsorship opportunities available?",
    answer: `Yes.
At different times, ProductPointers works with individuals, organisations and partners to create scholarship and sponsorship opportunities for talented people who may need support accessing quality Product education.
Available opportunities, eligibility criteria and application requirements will be published on our Scholarships page.`,
  },
  {
    question: "What happens after I complete a ProductPointers program?",
    answer: `Your journey doesn't necessarily end when the program does.
Depending on the program you complete, you'll leave with stronger Product skills, practical work, feedback and evidence of your capabilities. Eligible graduates can also become part of the wider ProductPointers alumni ecosystem, where they can continue to access growth opportunities, resources and community.`,
  },
];

export default function FaqSectionNew() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-white px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-20">
        {/* Left column */}
        <div className="flex flex-col">
          <p className="mb-2 md:mb-4 text-xs font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#5818D0] md:text-base md:font-semibold">
            FAQ
          </p>
          <h2 className=" text-[20px] md:w-80 font-semibold leading-normal tracking-[-1.134px] text-[#0E0A1A]  md:text-[30.8px] md:font-bold md:leading-[43.47px]">
            Questions We Hear Most Often
          </h2>

          <div className="mt-14 hidden md:block">
            <h3 className="text-[20px] leading-7 font-semibold text-[#0E0A1A]">
              Still have a question?
            </h3>
            <p className="mt-2  text-[12px] leading-5 text-[#525252]">
              Can&apos;t find an answer to your question? Send us a message and
              we will get back to you as soon as possible
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
        <div className="flex flex-col gap-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`rounded-xl border transition-colors ${
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
                    <p className="px-6 pb-4 md:text-[12px] text-[10px] leading-6 text-[#6D6D6D]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 md:hidden block">
          <h3 className="text-[20px] leading-7 font-semibold text-[#0E0A1A]">
            Still have a question?
          </h3>
          <p className="mt-2  text-[12px] leading-5 text-[#525252]">
            Can&apos;t find an answer to your question? Send us a message and we
            will get back to you as soon as possible
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
