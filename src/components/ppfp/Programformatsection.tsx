type Column = {
  number: string;
  title: string;
  titleClass: string;
  body: string;
};

const columns: Column[] = [
  {
    number: "01",
    title: "8 Weeks of Learning",
    titleClass: "text-white",
    body: "Each week focuses on a major area of fintech product management. Live facilitator-led sessions, practical exercises, case studies, product teardowns, group activities and assignments.",
  },
  {
    number: "02",
    title: "2 Weeks of Capstone",
    titleClass: "text-[#FFBB1D]",
    body: "Bring your learning together through a practical fintech product challenge. Work through a real product problem, apply fintech and Product Management principles, and present your solution.",
  },
  {
    number: "03",
    title: "Your Commitment",
    titleClass: "text-[#FF00D2]",
    body: "Live sessions + practical activities + weekly assignments + group collaboration + capstone work. This is an intensive program for serious-minded and intentional individuals.",
  },
  {
    number: "04",
    title: "Format",
    titleClass: "text-white",
    body: "Cohort: 20 participants · Duration: 10 weeks · 100% online · Start Date: October 15, 2026.",
  },
];

export default function ProgramFormatSection() {
  return (
    <section className="bg-[#5818D0] px-4 py-10 text-white md:px-10 lg:px-14 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <p className="text-[12px] font-medium uppercase leading-[17.28px] tracking-[1.613px] text-white md:text-sm md:font-semibold">
          Program Format &amp; Commitment
        </p>
        <h2 className="text-[20px] font-semibold leading-normal tracking-[-1.134px] text-white md:mt-4 md:w-110 md:text-[30.8px] md:font-bold md:leading-[43.47px]">
          Learn → Apply → Build Evidence.
        </h2>

        {/* Columns */}
        <div className="mt-8 grid grid-cols-1 md:mt-20 md:grid-cols-2 md:gap-y-10 lg:mt-20 lg:grid-cols-4 lg:gap-y-0">
          {columns.map((col) => (
            <div
              key={col.number}
              className="border-b border-[rgba(255,255,255,0.30)] p-6 last:border-b-0 md:border-b-0 md:border-l lg:first:border-l-0"
            >
              <span className="text-[14px] text-[rgba(255,255,255,0.30)]">
                {col.number}
              </span>
              <h3
                className={`mt-6 md:text-[32px] text-[24px] font-bold ${col.titleClass}`}
              >
                {col.title}
              </h3>
              <p className="mt-6 md:text-[16px] text-sm leading-6.5 text-white">
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
