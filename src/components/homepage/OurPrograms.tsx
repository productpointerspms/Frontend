// components/OurPrograms.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Program {
  badge: string;
  title: string;
  description: string;
  href: string;
  color: {
    badgeBg: string;
    badgeText: string;
    link: string;
  };
}

const programs: Program[] = [
  {
    badge: "PPAP",
    title: "ProductPointers Accelerator Program",
    description:
      "Build a strong foundation in Product Management through structured learning, practical assignments and mentorship.",
    href: "/programs/accelerator",
    color: {
      badgeBg: "bg-[rgba(88,24,208,0.10)]",
      badgeText: "text-[#5818D0]",
      link: "text-[#5818D0] hover:text-black",
    },
  },
  {
    badge: "PPIP",
    title: "ProductPointers Apprenticeship/Internship Program",
    description:
      "Turn what you know into practical experience by working through real product challenges, projects and mentor feedback.",
    href: "/programs/apprenticeship",
    color: {
      badgeBg: "bg-[rgba(255,0,210,0.10)]",
      badgeText: "text-[#FF00D2]",
      link: "text-[#FF00D2] hover:text-black",
    },
  },
  {
    badge: "PPTP",
    title:
      "Product Management Mastery Program (PMs with 1+ year experience who want to deepen and advance)",
    description:
      "Deepen your skills in specific areas of Product Management and develop the capabilities needed to grow in your career.",
    href: "/programs/track",
    color: {
      badgeBg: "bg-[rgba(255,187,29,0.10)]",
      badgeText: "text-[#FFBB1D]",
      link: "text-[#FFBB1D] hover:text-black",
    },
  },

  {
    badge: "PPCP",
    title: "Product Management Career Coaching",
    description:
      "Get personalised guidance, support and accountability for your Product Management career journey.",
    href: "/programs/coaching",
    color: {
      badgeBg: "bg-[rgba(255,6,0,0.10)]",
      badgeText: "text-[#FF0600]",
      link: "text-[#FF0600] hover:text-black",
    },
  },

  {
    badge: "PPFP",
    title: "Fintech Product Management Program",
    description:
      "Advance your fintech product leadership with hands-on workshops, collaborative peer learning, and expert-led sessions.",
    href: "/programs/fintech",
    color: {
      badgeBg: "bg-[rgba(88,24,208,0.10)]",
      badgeText: "text-[#5818D0]",
      link: "text-[#5818D0] hover:text-black",
    },
  },
];

export default function OurPrograms() {
  return (
    <section id="our-programs" className="bg-white py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="md:text-sm text-[12px] md:font-semibold font-medium text-[#5818D0] leading-[17.28px] tracking-[1.613px] uppercase">
          Our Programs
        </p>
        <h2 className="mt-2 max-w-2xl text-[20px] md:font-bold font-semibold tracking-[-1.134px] font-bricolage text-[#0E0A1A] md:text-[37.8px] md:leading-[43.47px] ">
          Find the Right Path for Your Product Journey.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mb-10">
          {programs.map((program) => (
            <div
              key={program.badge}
              className="flex flex-col rounded-xl border border-[#C2C2C2] p-6"
            >
              <span
                className={`inline-flex w-fit items-center rounded-md p-2 text-xs tracking-[0.922px] leading-[17.28px] md:text-[14px] font-bold ${program.color.badgeBg} ${program.color.badgeText}`}
              >
                {program.badge}
              </span>

              <h3 className="mt-4 text-base font-semibold text-[#0E0A1A] leading-6 tracking-[-0.58px]">
                {program.title}
              </h3>

              <p className=" flex-1 text-[12px] md:leading-6 leading-5 text-[#525252] ">
                {program.description}
              </p>

              <Link
                href={program.href}
                className={`mt-6 inline-flex items-center gap-1.5 text-base tracking-[0.269px] leading-5 font-semibold ${program.color.link}`}
              >
                Explore Program
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
