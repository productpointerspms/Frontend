import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bricolage } from "@/lib/fonts";

// Headings share the PPIP/PPAP display face — variable weight covers 200-800.
const programs = [
  {
    badge: "PPAP",
    title: "Product Management Accelerator Program",
    description: "Build a strong foundation in Product Management through structured learning, practical assignments and mentorship.",
    href: "/ppap",
    color: "text-[#6018F5]",
    badgeColor: "bg-[#EEE8FC]",
  },
  {
    badge: "PPIP",
    title: "Product Management Apprenticeship/Internship Program",
    description: "Turn what you know into practical experience by working through real product challenges, projects and mentor feedback.",
    href: "/ppip",
    color: "text-[#FF00D6]",
    badgeColor: "bg-[#FFE5FA]",
  },
  {
    badge: "PPMP",
    title: "Product Management Mastery Program",
    subtitle: "(PMs with 1+ year experience)",
    description: "Deepen your skills in specific areas of Product Management and develop the capabilities needed to grow in your career.",
    href: "/ppmp",
    color: "text-[#FFAE00]",
    badgeColor: "bg-[#FFF8E8]",
  },
  {
    badge: "PPFP",
    title: "Fintech Product Management Program",
    description: "A practical program for those who want to understand how financial products work across markets.",
    href: "/contact",
    color: "text-[#6018F5]",
    badgeColor: "bg-[#EEE8FC]",
  },
];

const PathToCommunity = () => {
  return (
    <section
      id="path-to-community"
      aria-labelledby="community-path-heading"
      className="scroll-mt-24 bg-white px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div>
            <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.1em] text-[#5818D0]">
              Community Access Path
            </p>
            <h2
              id="community-path-heading"
              className={`${bricolage.className} text-[#100B1A] text-[22px] font-extrabold leading-[1.15] tracking-[-0.04em] sm:text-[38px] lg:text-[38px] xl:text-[40px]`}
            >
              Your Path Into The Community
            </h2>
          </div>
          <p className="max-w-[440px] text-[15px] leading-6 text-[#595959] lg:text-right">
            Complete any ProductPointers program to unlock lifetime access to the
            alumni community and accountability ecosystem.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {programs.map((program) => (
            <article
              key={program.badge}
              className="flex min-h-[324px] flex-col items-start rounded-xl border border-[#C4C4C4] p-6"
            >
              <span className={`mb-6 rounded-md px-2 py-2 text-[14px] font-bold leading-[18px] tracking-[0.04em] ${program.color} ${program.badgeColor}`}>
                {program.badge}
              </span>
              <h3 className="font-sans text-[16px] font-semibold leading-6 tracking-[-0.04em] text-[#100B1A]">
                {program.title}
                {program.subtitle && <span className="block">{program.subtitle}</span>}
              </h3>
              <p className="mt-1 text-[12px] leading-5 text-[#595959]">
                {program.description}
              </p>
              <Link
                href={program.href}
                aria-label={`Explore ${program.title}`}
                className={`mt-auto flex items-center gap-3 pt-8 text-[16px] font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 ${program.color}`}
              >
                Explore Program <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathToCommunity;
