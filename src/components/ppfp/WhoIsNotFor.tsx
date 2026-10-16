// components/WhoIsNotFor.tsx

const reasons = [
  "You're looking for a general Product Management course.",
  "You want a purely theoretical fintech course with no practical application.",
  "You're looking for a course that teaches software engineering or financial engineering.",
  "You're not willing to participate in live sessions, practical exercises and group activities.",
  "You're looking for a quick course you can complete in a few days.",
];

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-0.5 h-6 w-6 shrink-0 text-[#FF0600]"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
    >
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export default function WhoIsNotFor() {
  return (
    <section className="bg-white px-4 py-16 md:px-12 lg:px-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        {/* Left: heading */}
        <div>
          <p className="md:text-sm text-[12px]  md:font-semibold font-medium tracking-[1.613px] leading-[17.28px] uppercase text-[#5818D0]">
            Who this program is not for
          </p>
          <h2 className="md:mt-4 text-[20px] md:w-110 tracking-[-1.134px] font-semibold md:font-bold md:leading-[43.47px] leading-normal text-[#0E0A1A] md:text-[30.8px]">
            This may not be the right program for you if…
          </h2>
        </div>

        {/* Right: list + callout */}
        <div>
          <ul>
            {reasons.map((text) => (
              <li
                key={text}
                className="flex items-start gap-3 border-b border-[#C2C2C2] pt-6 pb-3 first:pt-0"
              >
                <XIcon />
                <span className="md:text-[14.72px] text-[12px] leading-[22.816px] text-[#0E0A1A]">
                  {text}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 rounded-lg border border-[#5818D0] bg-[rgba(88,24,208,0.04)] p-4">
            <p className="md:text-sm text-[12px] font-semibold leading-5 text-[#5818D0]">
              This is an intensive learning experience for people who want to
              understand fintech and actually apply what they learn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
