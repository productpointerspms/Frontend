"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

interface Program {
  title: string;
  whoItsFor: string;
  outcome: string;
  landingPath: string;
}

const programs: Program[] = [
  {
    title: "ProductPointers Accelerator Program (PPAP)",
    whoItsFor:
      "You are new to product or you've learned product basics but still feel lost and need structure",
    outcome:
      "Build a strong foundation and understand how to think like a product manager",
    landingPath: "/ppap",
  },
  {
    title: "ProductPointers Internship Program (PPIP)",
    whoItsFor: "You need real world experience to confidently apply for roles",
    outcome: "Work on real products and gain hands-on experience",
    landingPath: "/ppip",
  },
  // {
  //   title: "ProductPointers Coaching Program (PPCP)",
  //   whoItsFor:
  //     "You want a one-on-one personalized guidance tailored towards your goal.",
  //   outcome: "Structured guidance, growth and faster results.",
  // },
  // {
  //   title: "ProductPointers Mentorship Program (PPMP)",
  //   whoItsFor: "You are applying for jobs but no call-back",
  //   outcome: "Stand out, apply confidently, and land product roles",
  // },
  // {
  //   title: "ProductPointers Specialization Track Program (PPTP)",
  //   whoItsFor:
  //     "You are already a product manager but want to apply and stand out",
  //   outcome:
  //     "Become a high-impact, specialized product manager with deeper expertise",
  // },
];

const ProgramAccordion: React.FC<{
  program: Program;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ program, isOpen, onToggle }) => {
  return (
    <div className="bg-[#FAE1FF] rounded-3xl overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left cursor-pointer"
      >
        <h3 className="text-base md:text-lg font-bold text-[#1A1A1A]">
          {program.title}
        </h3>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-gray-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <p className="text-sm md:text-[15px] leading-relaxed text-gray-700 mb-3">
              <span className="text-gray-400">Who it&apos;s for:</span>{" "}
              {program.whoItsFor}
            </p>
            <p className="text-sm md:text-[15px] leading-relaxed text-gray-700 mb-5">
              <span className="text-gray-400">Outcome:</span> {program.outcome}
            </p>
            <Link
              href={program.landingPath}
              className="inline-flex items-center text-[#3B448F] font-semibold text-sm hover:underline cursor-pointer"
            >
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ExplorePrograms() {
  // All cards closed by default; each toggles independently.
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (index: number) =>
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );

  return (
    <div id="explore-programs" className="w-full bg-[#5C1CC5] py-20 px-6 md:px-12 scroll-mt-10">
      {/* Section Header */}
      <div className="text-center mb-16 text-white">
        <h2 className="text-[1.18rem] min-[375px]:text-xl sm:text-2xl md:text-3xl font-bold mb-4 tracking-tight">
          Explore The Program<br className="block md:hidden" /> That Fits Your Current Stage
        </h2>
        <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">
          Whether you're just getting started or ready to gain real experience, there's a clear next step for you.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {programs.map((program, i) => (
          <ProgramAccordion
            key={i}
            program={program}
            isOpen={openItems.includes(i)}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-20 text-center text-white">
        <p className="text-base mb-6 opacity-90 font-medium">Not sure which program is right for you?</p>
        <a
          href="#upcoming-programs"
          className="bg-white text-[#5C1CC5] px-8 py-4 rounded-2xl font-bold flex items-center justify-center mx-auto hover:bg-gray-100 transition-colors cursor-pointer w-fit"
        >
          Find the Right Program for You <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
