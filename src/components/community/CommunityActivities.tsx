import React from "react";
import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP/PPAP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const activities = [
  {
    title: "Monthly Product Sessions",
    description:
      "Learn through curated Product Management sessions, guest speakers, industry discussions, and growth-focused workshops designed to keep alumni continuously improving.",
    image: "/images/comm/2.png",
  },
  {
    title: "Accountability Partners & Groups",
    description:
      "Stay consistent with your goals through structured accountability systems, peer support, and monthly growth check-ins.",
    image: "/images/comm/1.png",
  },
  {
    title: "Free Resources & Learning Materials",
    description:
      "Access curated resources, templates, frameworks, recommendations, and learning materials shared within the community.",
    image: "/images/comm/4.png",
  },
  {
    title: "Monthly Growth Rituals",
    description:
      "Set goals, review progress, receive recommendations, and improve intentionally every month through structured personal growth rituals.",
    image: "/images/comm/3.png",
  },
];

const CommunityActivities = () => {
  return (
    <section
      aria-labelledby="community-activities-heading"
      className="bg-[#5818D00D] px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div>
            <p className="mb-4 text-[14px] font-bold uppercase tracking-[0.08em] text-[#5818D0]">
              See What’s Happening
            </p>
            <h2
              id="community-activities-heading"
              className={`${bricolage.className} text-[#100B1A] text-[22px] font-extrabold leading-[1.15] tracking-[-0.04em] sm:text-[38px] lg:text-[38px] xl:text-[40px]`}
            >
              What Happens Inside The Community
            </h2>
          </div>
          <p className="max-w-[470px] text-[15px] font-semibold leading-6 text-[#595959] lg:w-[37%] lg:shrink-0 lg:text-right">
            The ProductPointers Community is designed to help alumni continue
            learning, growing, staying accountable, and building meaningful
            relationships long after completing their programs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {activities.map((activity) => (
            <article
              key={activity.title}
              className="flex flex-col rounded-lg bg-white p-3 pb-6"
            >
              <div className="relative h-[200px] overflow-hidden rounded-lg">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  sizes="(min-width: 1440px) 281px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mb-4 mt-6 font-sans text-[20px] font-semibold uppercase leading-6 text-black">
                {activity.title}
              </h3>
              <p className="text-[15px] leading-6 text-[#595959]">
                {activity.description}
              </p>
              <div className="mt-auto pt-6" aria-hidden="true">
                <div className="h-0.5 w-9 bg-[#5818D0]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityActivities;
