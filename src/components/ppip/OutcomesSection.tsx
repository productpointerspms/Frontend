"use client";

import React from "react";
import {
  BriefcaseBusiness,
  BarChart3,
  FileText,
  Scale,
  UsersRound,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

type Skill = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const skills: Skill[] = [
  {
    icon: BriefcaseBusiness,
    title: "Conduct User Research",
    description:
      "Speak with users, uncover pain points and learn how to turn conversations into useful insights.",
  },
  {
    icon: BarChart3,
    title: "Analyse Product Problems",
    description:
      "Break down existing products, identify gaps and understand what is really worth solving.",
  },
  {
    icon: FileText,
    title: "Write Product Requirements",
    description:
      "Turn validated insights into clear, structured product requirements.",
  },
  {
    icon: Scale,
    title: "Prioritise What Matters",
    description:
      "Learn how to evaluate opportunities and make product decisions based on evidence.",
  },
  {
    icon: UsersRound,
    title: "Work Through Product Challenges",
    description:
      "Collaborate with your team to solve realistic product problems from discovery to solution.",
  },
  {
    icon: MessageSquare,
    title: "Present and Defend Your Thinking",
    description:
      "Communicate your decisions, explain your reasoning and present your work like a Product Manager.",
  },
];

const OutcomesSection: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-white px-6 py-[78px] text-[#100B1D] md:px-12 lg:px-[80px]`}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* ================= HEADER ================= */}
        <div className="mb-[44px] max-w-[500px]">
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
            THE WORK
          </p>

          <h2
            className={`${bricolage.className}
              text-[27px]
              font-extrabold
              leading-[1.25]
              tracking-[-0.04em]
              text-[#100B1D]
              sm:text-[38px]
              lg:text-[38px]
            `}
          >
            Build the Skills by Doing
            <br />
            What Product Managers
            <br />
            Do.
          </h2>
        </div>

        {/* ================= SKILLS GRID ================= */}
        <div
          className="
            grid
            grid-cols-1
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-8
            lg:gap-y-8
          "
        >
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <article
                key={skill.title}
                className="
                  min-h-[202px]
                  rounded-[9px]
                  border
                  border-[#C9C9C9]
                  bg-white
                  px-6
                  py-6
                  transition-colors
                  duration-200
                  hover:border-[#A98AE8]
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-[40px]
                    w-[40px]
                    items-center
                    justify-center
                    rounded-[10px]
                    bg-[#F2ECFF]
                  "
                >
                  <Icon
                    className="h-[18px] w-[18px] text-[#6324E8]"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Title */}
                <h3
                  className={`${bricolage.className}
                    mt-[17px]
                    text-[15px]
                    font-bold
                    leading-[1.3]
                    tracking-[-0.02em]
                    text-[#100B1D]
                  `}
                >
                  {skill.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-[10px]
                    max-w-[275px]
                    text-[13px]
                    font-medium
                    leading-[1.65]
                    text-[#77727D]
                  "
                >
                  {skill.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;