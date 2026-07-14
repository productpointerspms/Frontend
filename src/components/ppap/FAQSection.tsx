'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const FAQSection = () => {
  // Start with the first one open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Who is the Accelerator program designed for?",
      answer: "PPAP is designed for beginners, aspiring Product Managers, and individuals transitioning into Product Management who want foundational knowledge, structure, and clarity to start their PM journey confidently."
    },
    {
      question: "How long is the program?",
      answer: "The PPAP program runs for 12 weeks and combines guided learning, practical assignments, mentorship, and foundational Product Management training."
    },
    {
      question: "Will I get a certificate upon completion?",
      answer: "Yes! Upon successful completion of the program, you'll receive an industry-recognized certificate from ProductPointers that you can add to your LinkedIn profile and resume."
    }
  ];

  return (
    <section className="bg-[#FCF1FF] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base">
            Everything you need to know about the Accelerator Program
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-[#FAE1FF] rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button 
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-[#1a1a1a] pr-8 text-[13px]">{faq.question}</span>
                  {/* The image shows an upward caret when closed and open. Let's use ChevronUp as default and down when clicked open, or vice versa, to stay standard while looking like the design. We'll use ChevronUp for closed, ChevronDown for open. */}
                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" strokeWidth={1.5} />
                  ) : (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" strokeWidth={1.5} />
                  )}
                </button>
                
                <div 
                  className={`px-8 pb-8 text-gray-500 text-[13px] leading-relaxed transition-all duration-300 ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  {faq.answer}
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
