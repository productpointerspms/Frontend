const outcomes = [
  {
    title: "Understand",
    description:
      "How financial products are built, regulated, measured and grown.",
  },
  {
    title: "Analyse",
    description:
      "Customer behaviour, transaction data and product performance in fintech contexts.",
  },
  {
    title: "Collaborate",
    description:
      "More confidently with engineering, design, compliance and business teams.",
  },
  {
    title: "Decide",
    description:
      "Make stronger product trade-offs in complex, regulated environments.",
  },
  {
    title: "Build",
    description:
      "Portfolio-ready work demonstrating real fintech product thinking.",
  },
  {
    title: "Grow",
    description:
      "Pursue fintech product opportunities with greater clarity and confidence.",
  },
];

export default function OutcomesSection() {
  return (
    <section className="w-full bg-white px-4 py-20 md:px-[7vw] md:py-0">
      <div>
        {/* Header */}
        <p className="md:text-sm text-[12px]  md:font-semibold font-medium tracking-[1.613px] leading-[17.28px] uppercase text-[#5818D0]">
          What you leave with
        </p>
        <h2 className="md:mt-4 text-[20px] md:w-160 tracking-[-1.134px] font-semibold md:font-bold md:leading-[43.47px] leading-normal text-[#0E0A1A] md:text-[30.8px]">
          Outcomes that matter.
        </h2>
        <p className="mt-6 md:text-base w-85 md:w-120 text-[12px] leading-4 text-[#525252] md:leading-[26.784px]">
          By the end of the program, you should be better placed to:
        </p>

        {/* Grid */}
        <div className="mt-14 md:mt-20 grid grid-cols-1  md:grid-cols-3">
          {outcomes.map((item, i) => {
            const isFirstCol = i % 3 === 0;
            const isSecondRow = i >= 3;

            return (
              <div
                key={item.title}
                className={[
                  "py-8 md:min-h-35 md:py-9 p-6 md:p-0",
                  // mobile: horizontal dividers between stacked items
                  i > 0 ? "max-md:border-t max-md:border-[#C2C2C2]" : "",
                  // desktop: vertical dividers between columns
                  !isFirstCol ? "md:border-l md:border-[#C2C2C2]" : "",
                  // desktop: horizontal divider between rows
                  isSecondRow ? "md:border-t md:border-[#C2C2C2]" : "",
                  // desktop: inner padding so text doesn't touch dividers
                  isFirstCol ? "md:pl-5 md:pr-8" : "md:px-8",
                ].join(" ")}
              >
                <h3 className="text-[32px] font-extrabold uppercase leading-10  text-[#5818D0] md:text-[36px]">
                  {item.title}
                </h3>
                <p className="mt-4 lg:w-80 text-[14px] md:text-base  text-[#525252]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}