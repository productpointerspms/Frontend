import React from "react";

const steps = [
  {
    number: "01",
    title: "Identify Your Focus",
    text: "Come with the challenge, goal or area you want to work on. The clearer your focus, the more directly the session can serve you.",
  },
  {
    number: "02",
    title: "Work Through It Together",
    text: "Explore the problem, ask questions and consider possible approaches — with someone who understands the Product work from the inside.",
  },
  {
    number: "03",
    title: "Get Practical Feedback",
    text: "Receive guidance and perspective based on your specific situation, not general advice designed for everyone.",
  },
  {
    number: "04",
    title: "Leave With Clarity",
    text: "Walk away with clearer thinking, practical next steps and stronger direction — something you can act on immediately.",
  },
];

const SolutionSection = () => {
  return (
    <section
      aria-labelledby="coaching-experience-heading"
      className="bg-white px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-25"
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-4 text-[14px] font-bold uppercase tracking-[0.1em] text-[#5818D0]">
          Your Coaching Experience
        </p>
        <h2
          id="coaching-experience-heading"
          className="text-[28px] font-extrabold leading-[1.25] tracking-[-0.03em] text-[#100B1A] sm:text-[32px] lg:text-[36px]"
        >
          A Simple, Focused Approach
          <br className="hidden sm:block" />{" "}
          to Making Progress.
        </h2>

        <ol className="mx-auto mt-10 grid max-w-[1028px] grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-10">
          {steps.map((step) => (
            <li key={step.number}>
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5818D0] text-[12px] font-semibold text-white">
                  {step.number}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-[100px] bg-[#5818D0]"
                />
              </div>
              <h3 className="mb-2 text-[16px] font-bold leading-5 tracking-[-0.03em] text-[#100B1A]">
                {step.title}
              </h3>
              <p className="text-[12px] leading-4 text-[#595959]">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default SolutionSection;
