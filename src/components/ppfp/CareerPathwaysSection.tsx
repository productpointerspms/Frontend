// components/CareerPathwaysSection.tsx
const pathways = [
  { label: "Fintech Product Management", dot: "bg-[#5C1CC5]" },
  { label: "Digital Banking", dot: "bg-[#FF00D2]" },
  { label: "Payments & Transfers", dot: "bg-[#5C1CC5]" },
  { label: "Lending & Credit Product", dot: "bg-[#FF00D2]" },
  { label: "Financial Platforms", dot: "bg-[#7B3FE4]" },
  { label: "Digital Financial Services", dot: "bg-transparent" },
  { label: "Product Strategy", dot: "bg-[#5C1CC5]" },
];

export default function CareerPathwaysSection() {
  return (
    <section className="w-full bg-[#FFBB1D] px-4 py-20 md:px-12 lg:px-14">
      <div className="mx-auto max-w-300">
        {/* Eyebrow + headline */}
        <p className="md:text-sm text-[12px]  md:font-semibold font-medium tracking-[1.613px] leading-[17.28px] uppercase text-[#5818D0]">
          Career Pathways
        </p>
        <h2 className="md:mt-4 text-[20px]  tracking-[-1.134px] font-semibold md:font-bold md:leading-[43.47px] leading-normal text-[#0E0A1A] md:text-[30.8px]">
          Where this knowledge can take you.
        </h2>

        {/* Divider */}
        <div className="md:mt-14 mt-6 h-px w-full bg-[#07030F26]" />

        {/* Intro text */}
        <p className="mt-10 max-w-170 text-sm leading-[29.25px] text-[rgba(7,3,15,0.60)] md:text-[18px]">
          Fintech PMs encounter product challenges that don&apos;t exist
          anywhere else. Payments that fail. Users who can&apos;t pass KYC.
          Transactions that hang. Wallets that don&apos;t convert. The program
          explores the product thinking behind these moments.
        </p>

        {/* Pills */}
        <ul className="md:mt-16 mt-8 flex flex-wrap gap-3">
          {pathways.map(({ label, dot }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 rounded-[53224300px] border-[1.586px] border-solid border-[rgba(7,3,15,0.15)] bg-[rgba(7,3,15,0.06)] px-5 py-3 text-[14px] font-semibold leading-5 text-[#07030F]"
            >
              <span className={`h-2 w-2 rounded-full ${dot}`} />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
