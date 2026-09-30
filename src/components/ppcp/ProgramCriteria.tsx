import React from "react";

const criteria = [
  {
    number: "01",
    title: "Product Thinking",
    text: "Strengthen how you approach problems, opportunities and product decisions.",
    wide: true,
    lightText: true,
  },
  {
    number: "02",
    title: "Product Strategy",
    text: "Develop a clearer approach to thinking strategically about products and outcomes.",
    wide: false,
    lightText: false,
  },
  {
    number: "03",
    title: "Career Growth",
    text: "Get guidance on navigating your Product career and identifying your next step.",
    wide: false,
    lightText: false,
  },
  {
    number: "04",
    title: "Portfolio & Projects",
    text: "Get feedback on your work and strengthen how you present your Product experience.",
    wide: false,
    lightText: true,
  },
  {
    number: "05",
    title: "Interview & Job Readiness",
    text: "Prepare to communicate your Product thinking, experience and capabilities with greater confidence.",
    wide: false,
    lightText: false,
  },
  {
    number: "07",
    title: "Personalised Product Guidance",
    text: "Work through a specific Product challenge or question with focused support.",
    wide: true,
    lightText: true,
  },
];

const ProgramCriteria = () => {
  return (
    <section
      aria-labelledby="program-criteria-heading"
      className="bg-white px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-4 text-[14px] font-bold uppercase tracking-[0.1em] text-[#5B18DB]">
          Your Growth, Your Focus
        </p>
        <h2
          id="program-criteria-heading"
          className="text-[28px] font-extrabold leading-[1.25] tracking-[-0.03em] text-[#100B1A] sm:text-[32px] lg:text-[36px]"
        >
          Bring the Product Challenges
          <br className="hidden sm:block" />{" "}
          You’re Working Through.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {criteria.map((criterion) => (
            <article
              key={criterion.number}
              className={`flex min-h-[200px] flex-col justify-center rounded-2xl p-6 ${
                criterion.lightText ? "bg-[#5B18DB]" : "bg-[#5818D014]"
              } ${
                criterion.wide ? "sm:col-span-2" : ""
              }`}
            >
              <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-[#5417C7]/40 text-[13px] font-bold text-white">
                {criterion.number}
              </span>
              <h3
                className={`mb-3 text-[18px] font-semibold leading-6 tracking-[-0.02em] ${
                  criterion.lightText ? "text-white" : "text-black"
                }`}
              >
                {criterion.title}
              </h3>
              <p
                className={`text-[13px] leading-[23px] ${
                  criterion.lightText ? "text-white" : "font-medium text-[#55505E]"
                }`}
              >
                {criterion.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramCriteria;
