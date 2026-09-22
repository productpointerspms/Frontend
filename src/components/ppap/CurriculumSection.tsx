import React from "react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const CurriculumSection = () => {
  const curriculum = [
    {
      number: "01",
      title: "Build Your Product Management Foundation",
      description:
        "Understand what Product Managers do, how products evolve and how to think through product problems.",
      topics: [
        "Product Fundamentals",
        "Product Lifecycle",
        "Product Value Fit",
        "Product & Design Thinking",
      ],
    },
    {
      number: "02",
      title: "Find and Understand the Right Problems",
      description:
        "Learn how to research users, validate assumptions and identify problems worth solving.",
      topics: [
        "Product Discovery",
        "User Research",
        "User Personas",
        "Problem Framing",
        "User Thinking",
      ],
    },
    {
      number: "03",
      title: "Turn Ideas Into Product Work",
      description:
        "Learn how Product Managers define requirements, prioritise what matters and prepare work for delivery.",
      topics: [
        "PRDs",
        "User Stories",
        "Prioritisation",
        "Agile",
        "Scrum & Kanban",
      ],
    },
    {
      number: "04",
      title: "Work With People and Manage Delivery",
      description:
        "Learn how to communicate with stakeholders, manage expectations and keep product work moving.",
      topics: [
        "Stakeholder Management",
        "Communication",
        "Reporting",
        "Risk & Change Management",
      ],
    },
    {
      number: "05",
      title: "Measure, Improve and Launch Products",
      description:
        "Understand how Product Managers measure success, plan product direction and support product launches.",
      topics: [
        "Product Metrics",
        "Metrics & KPIs",
        "User Flows",
        "A/B Experimentation",
        "MVP",
        "Road mapping",
        "GTM",
      ],
    },
  ];

  return (
    <section className="w-full bg-white text-white">
      <div
        className="
          mx-auto
          grid
          max-w-[1440px]
          grid-cols-1
          gap-16
          px-6
          py-20
          md:px-12
          lg:grid-cols-[0.95fr_1.05fr]
          lg:gap-24
          lg:px-20
          lg:py-[110px]
        "
      >
        {/* LEFT SIDE */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p
            className="
              mb-5
              text-[13px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-[#6D21F5]
            "
          >
            Your 12-Week Journey
          </p>

          <h2
            className={`${bricolage.className}
              max-w-[560px]
              text-[22px]
              font-extrabold
              leading-[1.16]
              tracking-[-0.04em]
              text-[#171020]
              sm:text-[38px]
              lg:text-[40px]
            `}
          >
            From Learning the
            <br />
            Fundamentals to Solving Real
            <br />
            Product Problems.
          </h2>

          <p
            className="
              mt-9
              max-w-[500px]
              text-[14px]
              leading-[1.6]
              text-[#68646C]
            "
          >
            Build your Product Management knowledge step by step, learning
            how to understand problems, make product decisions, work with
            teams and bring products to life.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-[52px]">
          {curriculum.map((item) => (
            <article
              key={item.number}
              className="grid grid-cols-[32px_1fr] gap-3"
            >
              {/* Number */}
              <span
                className="
                  pt-[2px]
                  text-[12px]
                  font-bold
                  text-[#6D21F5]
                "
              >
                {item.number}
              </span>

              <div>
                {/* Title */}
                <h3
                  className={`${bricolage.className}
                    text-[14px]
                    font-semibold
                    leading-[1.4]
                    text-[#171020]
                  `}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-1
                    max-w-[580px]
                    text-[14px]
                    leading-[1.55]
                    text-[#666168]
                  "
                >
                  {item.description}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-3">
                  {item.topics.map((topic) => (
                    <span
  key={topic}
  className="
    inline-flex
    min-h-[32px]
    items-center
    justify-center
    rounded-[4px]
    border
    border-[#5818D0]
    bg-[#5818D014]
    px-4
    py-2
    text-[12px]
    font-medium
    leading-none
    text-[#5818D0]
  "
>
  {topic}
</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;