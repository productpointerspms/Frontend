import Image from "next/image";

export default function FounderSection() {
  return (
    <section className="bg-white px-6 py-16 md:px-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#5818D0] md:text-base md:font-semibold">
          Meet the founder
        </p>
        <h2 className="mb-8 text-[20px] font-semibold leading-normal tracking-[-1.134px] text-[#0E0A1A] md:mb-10 md:w-152 md:text-[30.8px] md:font-bold md:leading-[43.47px]">
          ProductPointers Started With a Belief in What&apos;s Possible.
        </h2>

        <div className="flex md:flex-row flex-col-reverse md:gap-25 gap-8">
          <div className="flex flex-col">
            {" "}
            <div className="relative aspect-402/422 h-105.5 w-full overflow-hidden  md:max-w-none">
              <Image
                src="/images/homepage/ceo.png"
                alt="Blessing Okomor, Founder of ProductPointers"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 340px, 280px"
                priority
              />
            </div>
            <div className="md:mt-8 mt-6 ">
              <h3 className="md:text-[32px] text-[20px] font-bold leading-7 text-[#5C1CC5]">
                Blessing Okomor
              </h3>
              <p className="mt-0.5 text-sm text-[#15010D] font-medium leading-5 md:text-base">
                Founder, ProductPointers
              </p>

              <a
                href="https://www.linkedin.com/in/blessing-okomor"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center cursor-pointer  rounded-[14px] bg-[#0077B5] px-4 py-1.25 md:text-lg text-[15px] leading-7 font-medium text-white transition-colors hover:bg-[#0A66C2]/90"
              >
                <LinkedInIcon className="h-4 w-4 shrink-0" />
                <span>Connect With Blessing on LinkedIn</span>
                <ArrowIcon className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
          <div className="max-w-xl flex-1 space-y-4 md:text-base text-[12px] md:leading-6 leading-normal text-[#15010D]">
            <p>My journey into Product Management didn&apos;t begin in tech.</p>

            <p>
              I came from a background in Accounting, business and
              entrepreneurship. Like many people trying to find their way into a
              new career, I had to learn, ask questions, figure things out and
              find opportunities to gain experience.
            </p>

            <p>Along the way, I saw something that kept repeating itself:</p>

            <p>
              There are talented people with the potential to succeed in Product
              Management, but too many don&apos;t know where to start, how to
              gain practical experience or how to prove what they can do.
            </p>

            <p>That belief became ProductPointers.</p>

            <p>
              Today, we&apos;re building more than a place to learn Product
              Management. We&apos;re creating pathways for people to develop
              real skills, gain practical experience, build evidence of their
              work and confidently pursue opportunities.
            </p>

            <p>
              Because sometimes, all someone needs is the right guidance, the
              right opportunity and someone who believes they can get there.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
