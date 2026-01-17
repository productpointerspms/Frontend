import React, { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
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
    question: "Who can apply to ProductPointers programs?",
    answer:
      "Our programs are designed for beginners, entry-level and professionals at all levels from those looking to break into product management to senior leaders seeking to enhance their strategic skills. We welcome applicants from diverse backgrounds including engineering, design, marketing, and business.",
  },
  {
    question: "How does the program work?",
    answer:
      "Our programs combine live workshops, 1-on-1 mentorship, group projects, and community engagement. You'll work on real-world case studies, receive personalized feedback from industry experts, and connect with a global network of product professionals.",
  },
  {
    question: "What are the program costs?",
    answer:
      "Program costs vary depending on the track you choose. Our Accelerator program starts at ₦100,000. Coaching sessions are ₦100,000 for a 3-month plan and ₦170,000 for a 6-month plan, and the Mentorship program is ₦50,000. We offer payment plans and scholarships for qualifying candidates.",
  },
  {
    question: "Do you offer job placement assistance?",
    answer:
      "While we don't guarantee job placement, 87% of our graduates receive job offers or promotions within 6 months of completion. We provide career coaching, interview preparation, resume reviews, and access to our extensive alumni network for referrals.",
  },
  {
    question: "What's the time commitment?",
    answer:
      "Time commitment varies by program. The Accelerator requires 5-7 hours per week for 12 weeks. Coaching sessions are 1 hour bi-weekly. Mentorship programs require 2-3 hours per week for 6 months. All programs are designed to fit around your current work schedule.",
  },
  {
    question: "Can I participate if I'm based outside Nigeria?",
    answer:
      "Absolutely! ProductPointers is a global community with members from 7+ countries. Our programs are designed to be time zone-awfriendly with recorded sessions and flexible scheduling.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${montserrat.className} relative min-h-screen `}>
      {/* Background Image with Purple Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/faqbg.jpg" // Update with your actual background image path
          alt="FAQ Background"
          className="w-full h-full object-cover"
        />
        <img
          src="/images/faqOverlay.png" // Same overlay image as Community component
          alt="Overlay"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-[70px] sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[16.5px] md:text-5xl font-bold text-white mb-7 leading-4 md:leading-12">
            Frequently Asked Questions
          </h1>
          <p className="text-white/90 md:text-[20px] text-[14px]  md:leading-7 font-normal md:mb-[50px] mb-[17px]">
            Got questions? We&apos;ve got answers. If you don&apos;t see what you&apos;re
            looking for, reach out to our team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 ">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-[#FAE1FF] backdrop-blur-sm rounded-4xl shadow-sm  overflow-hidden transition-all duration-300 hover:shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left   rounded-2xl"
              >
                <span className="md:text-lg text-[14px] font-semibold text-[#14010D] leading-7 ">
                  {faq.question}
                </span>
                <div className="shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-[#717182]" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-[#717182]" />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-6 pb-5 text-[#717182] leading-relaxed font-normal">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-white text-[16px] font-normal leading-6 mb-4">
            Still have questions?
          </p>
          <button className=" font-medium text-[24px] cursor-pointer hover:text-white text-[#5C1CC5]   transition-all duration-300 transform hover:scale-105 ease-in-out inline-flex items-center gap-4">
            Contact our team
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
