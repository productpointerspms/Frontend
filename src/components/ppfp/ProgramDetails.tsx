// components/ProgramDetails.tsx
type Detail = { label: string; value: string };

const DETAILS: Detail[] = [
  { label: "Duration", value: "10 Weeks" },
  { label: "Format", value: "100% Online" },
  { label: "Structure", value: "8 Weeks Learning + 2 Weeks Capstone" },
  {
    label: "Learning Style",
    value: "Live Sessions + Practical Activities + Assignments + Capstone",
  },
  { label: "Level", value: "Beginner to Intermediate" },
  { label: "Cohort Size", value: "20 Participants (50% slot filled)" },
  { label: "Prerequisite", value: "No prior fintech experience required" },
];

export default function ProgramDetails() {
  return (
    <section
      id="program-details"
      className="w-full bg-[rgba(88,24,208,0.08)] px-4  md:px-12 lg:px-14 py-20"
    >
      <div className="mx-auto grid max-w-300 grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-24">
        {/* Left: heading */}
        <div>
          <p className="md:text-sm text-[12px]  md:font-semibold font-medium tracking-[1.613px] leading-[17.28px] uppercase text-[#5818D0]">
            Program Details
          </p>
          <h2 className="md:mt-4 text-[20px] lg:w-130 tracking-[-1.134px] font-semibold md:font-bold md:leading-[43.47px] leading-normal text-[#0E0A1A] md:text-[30.8px]">
            What You Need to Know Before Applying.
          </h2>
        </div>

        {/* Right: details list */}
        <dl className="border-b border-[#C2C2C2]">
          {DETAILS.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-6 border-t border-[#C2C2C2] p-4"
            >
              <dt className="shrink-0 text-[12px] font-bold leading-4.5 uppercase tracking-[0.72px] text-[#5818D0]">
                {label}
              </dt>
              <dd className="max-w-75 text-right text-[14px] leading-[21.824px] text-[#0E0A1A]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}