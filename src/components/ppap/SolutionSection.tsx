import React from "react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const SolutionSection = () => {
  const foundations = [
    {
      number: "01",
      title: "Understand Product Management",
      description:
        "Learn what Product Managers actually do and how they create value.",
    },
    {
      number: "02",
      title: "Understand Users and Problems",
      description:
        "Learn how to identify user needs and uncover problems worth solving.",
    },
    {
      number: "03",
      title: "Think Through Solutions",
      description:
        "Understand how Product Managers explore, evaluate and shape solutions.",
    },
    {
      number: "04",
      title: "Make Better Product Decisions",
      description:
        "Learn how to prioritise, make trade-offs and focus on what matters.",
    },
    {
      number: "05",
      title: "Turn Ideas Into Clear Requirements",
      description:
        "Learn how Product Managers communicate what needs to be built and why.",
    },
    {
      number: "06",
      title: "Work With Teams",
      description:
        "Understand how Product Managers collaborate to bring products to life.",
    },
  ];

  return (
    <section className="w-full bg-[#5818D014]">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-20 lg:py-[82px]">
        
        {/* Heading */}
        <div className="max-w-[660px]">
          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#4314A7]">
            Build Your PM Foundation
          </p>

          <h2
            className={`${bricolage.className}
              text-[22px]
              font-extrabold
              leading-[1.17]
              tracking-[-0.04em]
              text-[#11071D]
              sm:text-[38px]
              lg:text-[40px]
            `}
          >
            Learn How Product Managers
            {" "}
            <br className="hidden sm:block" />
            Think, Work and Make Decisions.
          </h2>
        </div>

        {/* Cards */}
        <div
          className="
            mt-[80px]
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-8
            lg:gap-y-8
            lg:px-[116px]
          "
        >
          {foundations.map((item) => (
            <article
              key={item.number}
              className="
                min-h-[202px]
                rounded-[7px]
                border
                border-[#DDD7E8]
                bg-white
                px-6
                py-6
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[10px]
                  bg-[#F4EEFF]
                  text-[13px]
                  font-bold
                  tracking-[0.08em]
                  text-[#5818D0]
                "
              >
                {item.number}
              </div>

              <h3
                className={`${bricolage.className}
                  mt-[17px]
                  text-[14px]
                  font-bold
                  leading-[1.4]
                  tracking-[-0.02em]
                  text-[#17121D]
                `}
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-2
                  max-w-[275px]
                  text-[14px]
                  leading-[1.6]
                  text-[#747078]
                "
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;