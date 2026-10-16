import Link from "next/link";

type Audience = {
  id: string;
  title: string;
  description: string;
};

const audiences: Audience[] = [
  {
    id: "01",
    title: "Aspiring Product Managers",
    description:
      "You want to enter fintech and need a strong foundation in how financial products work.",
  },
  {
    id: "02",
    title: "Entry-Level Product Managers",
    description:
      "You understand Product Management but need the fintech knowledge to confidently work on financial products.",
  },
  {
    id: "03",
    title: "Practicing Product Managers",
    description:
      "You already work in Product and want to deepen your understanding of payments, financial services, risk, compliance and fintech operations.",
  },
  {
    id: "04",
    title: "PMs Transitioning Into Fintech",
    description:
      "You're moving from another product space into fintech and want to understand the environment before stepping into the role.",
  },
  {
    id: "05",
    title: "Professionals Working Around Fintech",
    description:
      "You work in technology, operations, banking or related areas and want stronger product thinking within a fintech context.",
  },
];

function AudienceCard({ id, title, description }: Audience) {
  return (
    <article className="rounded-lg border border-[#C2C2C2] bg-[#FFF] p-6 ">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[rgba(88,24,208,0.06)] text-[12px] leading-[15.36px] font-bold tracking-[1.638px] text-[#5818D0]">
        {id}
      </span>
      <h3 className="mt-4 text-base font-bold leading-[20.384px] text-[#0E0A1A] tracking-[-0.314px]">
        {title}
      </h3>
      <p className="mt-1 text-[13px] leading-[22.304px] text-[#525252]">
        {description}
      </p>
    </article>
  );
}

export default function WhoThisProgramIsFor() {
  return (
    // Explicit colors (no dark: variants) so the section keeps its light look on dark-mode devices
    <section className="bg-[rgba(88,24,208,0.08)] px-4 py-10 md:px-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <p className="md:text-sm text-[12px]  md:font-semibold font-medium tracking-[1.613px] leading-[17.28px] uppercase text-[#5818D0]">
          Who this program is for
        </p>
        <h2 className="md:mt-4 text-[20px] md:w-110 tracking-[-1.134px] font-semibold md:font-bold md:leading-[43.47px] leading-normal text-[#0E0A1A] md:text-[30.8px]">
          This program is for you if...
        </h2>

        {/* Cards */}
        <div className="mx-auto md:mt-20 mt-8 grid max-w-5xl lg:gap-8 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <AudienceCard key={item.id} {...item} />
          ))}

          {/* Quote / CTA card */}
          <aside className="flex flex-col justify-between rounded-lg bg-[#5818D0]  border border-[#C2C2C2] p-6 text-white md:col-span-2 lg:col-span-1">
            <blockquote className="text-base font-bold leading-[20.384px] text-[#FFF] tracking-[-0.314px]">
              &ldquo;This program helped me develop the knowledge to work
              effectively in the fintech product management space.&rdquo;
            </blockquote>

            <Link
              href="#pricing"
              className="group mt-10 inline-flex leading-[20.16px] tracking-[0.269px] items-center gap-3 text-[14px] font-semibold text-[#FFBB1D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B731] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5B1AD6]"
            >
              Apply Now
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
