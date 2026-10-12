import React from "react";

const OutcomeSection = () => {
  const steps = [
    {
      number: "01",
      title: "Your Questions",
      text: "No agenda except yours. Come with what you're working through and get focused answers and perspective.",
    },
    {
      number: "02",
      title: "Your Challenges",
      text: "Work through the specific product or career challenge you're facing with someone who understands the context.",
    },
    {
      number: "03",
      title: "Your Growth",
      text: "Walk away with practical clarity, honest feedback and a stronger sense of what to do next.",
    },
  ];

  return (
    <section data-ppcp-section="OutcomeSection" className="bg-[#5B18DB] px-6 py-20 text-white sm:px-10 md:px-14 lg:px-20 lg:py-24 xl:px-24">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        
        {/* =====================================
            LEFT CONTENT
        ====================================== */}
        <div>
          {/* Eyebrow */}
          <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.14em] text-white/95">
            Built Around Your Journey
          </p>

          {/* Heading */}
          <h2 className="max-w-[650px] text-[26px] font-extrabold leading-[1.15] tracking-[-0.03em] sm:text-[32px] md:text-[36px] lg:text-[40px]">
            Focused Guidance for Your
            <br />
            Goals, Challenges and Growth.
          </h2>

          {/* Description */}
          <p className="mt-8 max-w-[640px] text-[16px] leading-[1.65] text-white/90 sm:text-[17px]">
            One-on-one coaching gives you dedicated time with a Product
            professional to ask questions, work through challenges, receive
            feedback and gain practical perspective relevant to your journey.
            <br />
            Not a lecture. Not a course. A conversation built entirely around
            you.
          </p>

          {/* Steps */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {steps.map((step) => (
              <div key={step.number}>
                {/* Number + Line */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-[13px] font-bold text-white">
                    {step.number}
                  </span>

                  <div className="relative h-[2px] flex-1 bg-[#F028D8]">
                    <span className="absolute -left-[2px] top-1/2 h-[8px] w-[8px] -translate-y-1/2 rotate-45 bg-[#F028D8]" />
                    <span className="absolute -right-[2px] top-1/2 h-[8px] w-[8px] -translate-y-1/2 rotate-45 bg-[#F028D8]" />
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="mb-2 text-[16px] font-bold text-white">
                  {step.title}
                </h3>

                {/* Step Text */}
                <p className="max-w-[190px] text-[13px] leading-[1.45] text-white/80">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================
            RIGHT IMAGE
        ====================================== */}
        <div className="relative">
          {/* Decorative Shape */}
          <div className="absolute -left-4 -top-4 z-0 h-[80px] w-[80px] rounded-[18px] bg-[#B71ED1]/80 sm:-left-5 sm:-top-4" />

          {/* Image */}
          <div className="relative z-10 overflow-hidden rounded-[12px]">
            <img
              src="/images/ppcp/img.jpg"
              alt="One-on-one Product coaching conversation"
              className="h-[420px] w-full object-cover object-center sm:h-[500px] lg:h-[455px] xl:h-[500px]"
            />

            {/* Subtle image tint */}
            <div className="absolute inset-0 bg-[#4A168F]/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomeSection;
