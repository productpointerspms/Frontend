"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Who is the Accelerator program designed for?",
      answer:
        "PPAP is designed for beginners, aspiring Product Managers, and individuals transitioning into Product Management who want foundational knowledge, structure, and clarity to start their PM journey confidently.",
    },
    {
      question: "How long is the program?",
      answer:
        "The PPAP program runs for 12 weeks and combines guided learning, practical assignments, mentorship, and foundational Product Management training.",
    },
    {
      question: "Will I get a certificate upon completion?",
      answer:
        "Yes. Upon successful completion of the program, you'll receive a ProductPointers certificate that you can add to your professional profile.",
    },
    {
      question: "How much time do I need to commit each week?",
      answer:
        "You should plan for consistent weekly learning time for the lessons, assignments, exercises, and mentorship activities. The exact commitment may vary depending on your pace.",
    },
    {
      question: "Will I receive mentorship and feedback?",
      answer:
        "Yes. The program includes mentorship, practical guidance, and feedback designed to help you understand the material and improve your Product Management thinking.",
    },
  ];

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto
          grid
          max-w-[1440px]
          grid-cols-1
          gap-10
          px-6
          py-20
          md:px-12
          lg:grid-cols-[0.7fr_1.3fr]
          lg:gap-x-24
          lg:gap-y-[72px]
          lg:px-20
          lg:py-[110px]
        "
      >
        {/* LEFT SIDE — heading */}
        <div className="lg:col-start-1 lg:row-start-1">
          <p
            className="
              mb-4
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#5818D0]
              sm:mb-6
              sm:text-[13px]
            "
          >
            FAQ
          </p>

          <h2
            className={`${bricolage.className}
              max-w-[420px]
              text-[19px]
              font-extrabold
              leading-[1.15]
              tracking-[-0.04em]
              text-[#120D1C]
              sm:text-[44px]
              lg:text-[48px]
            `}
          >
            Questions We Hear
            <br className="hidden lg:block" />
            {" "}
            Most Often
          </h2>
        </div>

        {/* CONTACT — follows the accordion on mobile, sits under the
            heading in the left column from lg up. */}
        <div className="order-last max-w-[440px] lg:order-none lg:col-start-1 lg:row-start-2">
          <h3
            className={`${bricolage.className}
              text-[15px]
              font-semibold
              tracking-[-0.025em]
              text-[#18131E]
              sm:text-[16px]
            `}
          >
            Still have a question?
          </h3>

          <p
            className="
              mt-3
              max-w-[430px]
              text-[13px]
              leading-[1.7]
              text-[#77727A]
              sm:mt-4
              sm:text-[14px]
              sm:leading-[1.75]
            "
          >
            Can&apos;t find an answer to your question? Send us a message and
            we will get back to you as soon as possible.
          </p>

          <Link
            href="/contact"
            className="
              mt-7
              inline-flex
              min-h-[50px]
              min-w-[172px]
              items-center
              justify-center
              rounded-[8px]
              bg-[#5818D0]
              px-8
              text-[14px]
              font-semibold
              text-white
              transition
              hover:bg-[#4D14B7]
              sm:mt-10
              sm:min-h-[64px]
              sm:min-w-[235px]
              sm:text-[16px]
            "
          >
            Send Message
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4 sm:space-y-5 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="
                  overflow-hidden
                  rounded-[12px]
                  sm:rounded-[18px]
                  bg-[#5818D014]
                  transition-all
                  duration-300
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-[16px]
                    text-left
                    sm:gap-6
                    sm:px-7
                    sm:py-[20px]
                  "
                >
                  <span
                    className="
                      text-[13px]
                      font-semibold
                      leading-[1.4]
                      text-[#17121D]
                      sm:text-[18px]
                    "
                  >
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`
                      h-5
                      w-5
                      shrink-0
                      text-[#77717D]
                      transition-transform
                      duration-300
                      ${isOpen ? "rotate-180" : ""}
                    `}
                    strokeWidth={1.8}
                  />
                </button>

                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ease-in-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <p
                      className="
                        px-5
                        pb-5
                        pr-10
                        text-[13px]
                        leading-[1.7]
                        text-[#6F6973]
                        sm:px-7
                        sm:pb-6
                        sm:pr-14
                        sm:text-[14px]
                      "
                    >
                      {faq.answer}
                    </p>
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

export default FAQSection;