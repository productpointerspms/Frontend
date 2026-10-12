import React from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";

const outcomes = [
  "Clearer perspective on your challenge",
  "Practical feedback on your work",
  "Stronger Product thinking",
  "Actionable next steps",
  "Greater confidence in your decisions",
  "A clearer direction for your growth",
];

const LearningJourney = () => {
  return (
    <section data-ppcp-section="LearningJourney"
      aria-labelledby="learning-journey-heading"
      className="bg-[#5818D014] px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 lg:grid-cols-[1.16fr_1fr] lg:gap-16 xl:gap-[108px]">
        <div>
          <p className="mb-4 text-[14px] font-bold uppercase tracking-[0.1em] text-[#6219D1]">
            More Than a Conversation
          </p>
          <h2
            id="learning-journey-heading"
            className="text-[28px] font-extrabold leading-[1.25] tracking-[-0.03em] text-[#100B1A] sm:text-[32px] lg:text-[36px]"
          >
            Leave With Clarity You Can Act On.
          </h2>
          <p className="mt-8 text-[14px] font-semibold leading-[23px] text-[#595959]">
            The goal isn’t simply to have a good conversation. It’s to help you
            understand your situation more clearly and know what to do next.
          </p>
          <div className="relative mt-6 aspect-[630/366] overflow-hidden rounded-xl">
            <Image
              src="/images/ppcp/sol.png"
              alt="A Product coach offering guidance during a one-on-one session"
              fill
              sizes="(min-width: 1440px) 630px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <ul className="grid gap-6">
          {outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex min-h-12 items-center gap-4 border-b border-white/80 pb-3 pt-3"
            >
              <CircleCheck
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-[#6219D1]"
                strokeWidth={1.5}
              />
              <span className="text-[14px] font-medium leading-6 text-black">
                {outcome}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LearningJourney;
