import Image from "next/image";

export default function WhyWeExist() {
  return (
    <section className="bg-[#5818D0] px-6 py-16 sm:px-10 lg:px-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Top grid: copy (left) + photo & quote (right) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 md:gap-14">
          {/* ---------------- Left column ---------------- */}
          <div>
            <p className="mb-4 text-xs md:text-base md:font-semibold font-medium uppercase tracking-[1.613px] leading-[17.28px] text-white">
              WHY WE EXIST
            </p>

            <h2 className="md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-white tracking-[-1.134px]">
              Potential Shouldn&apos;t Stop at Possibility.
            </h2>

            <div className="mt-4 space-y-6 md:text-base text-[12px] leading-7 text-white md:w-105">
              <p>
                Every year, talented people set out to build careers in Product
                Management.
              </p>

              <p>They take courses. Watch videos. Earn certificates.</p>

              <p>
                But when it&apos;s time to apply for opportunities, many face
                the same question:
                <br />
                &ldquo;What have you actually worked on?&rdquo;
              </p>

              <p>
                Because knowing Product Management and being able to demonstrate
                Product Management are not the same thing.
              </p>

              <p className="font-bold text-white leading-6">
                That&apos;s the gap ProductPointers exists to help close.
              </p>

              <p>
                We create clearer pathways for aspiring, transitioning and
                early-career Product Managers to learn, practise, gain feedback
                and build evidence of what they can do.
              </p>
            </div>
          </div>

          {/* ---------------- Right column ---------------- */}
          <div>
            {/* Photo with logo badge */}
            <div className="relative md:mt-10">
              <div className="relative h-49.25 w-full md:h-92.5 overflow-hidden rounded-2xl">
                <Image
                  src="/images/homepage/pointers.png"
                  alt="ProductPointers community members giving a thumbs up"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>

              {/* Circular logo badge, overlapping bottom-right corner */}
              <div className="absolute -bottom-5 -right-5 flex h-16 w-16 items-center justify-center overflow-hidden md:h-18 md:w-18">
                <Image
                  src="/images/homepage/pp-logo.png"
                  alt="ProductPointers logo"
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Quote card */}
            <div className="relative mt-10 overflow-hidden rounded-[30px] border border-white bg-[#5818D0] p-4 md:p-8">
              {/* Decorative concentric arcs, top-right (14 rings) */}
              <ArcRings className="pointer-events-none absolute right-0 top-0 md:h-24 md:w-24 h-18 w-18 text-white/80" />

              <QuoteMark className="h-4 w-7 text-white" />

              <p className="relative mt-3 md:text-[20px] font-medium leading-normal text-white text-sm">
                We don&apos;t believe potential should remain potential because
                someone lacks access to the right opportunity.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- Bottom banner ---------------- */}
        <div className="mt-10 flex flex-row gap-5 rounded-2xl bg-[rgba(255,255,255,0.10)] p-2.5 sm:flex-row sm:items-center sm:gap-6 md:p-10">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white">
            <Image
              src="/images/homepage/send-icon.png"
              alt="Send icon"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </div>

          <div>
            <p className="text-[12px] md:text-base font-semibold md:leading-11.5 leading-3 text-white">
              THE FUTURE WE&apos;RE BUILDING
            </p>
            <p className="mt-2 text-[10px] md:leading-[24.48px] leading-normal md:w-200 w-auto md:font-semibold font-normal text-[#EAE3FA] md:text-base">
              We&apos;re building toward a future where talented people,
              regardless of where they start, can access quality Product
              education, gain practical experience and build the confidence and
              evidence to compete for opportunities globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Icons ---------------- */

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.1667 14.0667H2.35C2.48333 6.28338 4.01667 5.00005 8.8 2.16672C9.35 1.83338 9.53333 1.13338 9.2 0.566716C8.86667 0.0167163 8.16667 -0.166617 7.6 0.166716C1.96667 3.50005 0 5.53338 0 15.2334V24.2167C0 27.0667 2.31667 29.3667 5.15 29.3667H10.15C13.0833 29.3667 15.3 27.1501 15.3 24.2167V19.2167C15.3167 16.2834 13.1 14.0667 10.1667 14.0667Z"
        fill="currentColor"
      />
      <path
        d="M10.1667 14.0667H2.35C2.48333 6.28338 4.01667 5.00005 8.8 2.16672C9.35 1.83338 9.53333 1.13338 9.2 0.566716C8.86667 0.0167163 8.16667 -0.166617 7.6 0.166716C1.96667 3.50005 0 5.53338 0 15.2334V24.2167C0 27.0667 2.31667 29.3667 5.15 29.3667H10.15C13.0833 29.3667 15.3 27.1501 15.3 24.2167V19.2167C15.3167 16.2834 13.1 14.0667 10.1667 14.0667Z"
        fill="currentColor"
        transform="translate(18, 0)"
      />
    </svg>
  );
}
function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ArcRings({ className }: { className?: string }) {
  const ringCount = 14;
  const startRadius = 10;
  const step = 9;

  const radii = Array.from(
    { length: ringCount },
    (_, i) => startRadius + i * step,
  );

  return (
    <svg className={className} viewBox="0 0 130 130" fill="none">
      {radii.map((r) => (
        <circle key={r} cx="130" cy="0" r={r} stroke="currentColor" />
      ))}
    </svg>
  );
}
