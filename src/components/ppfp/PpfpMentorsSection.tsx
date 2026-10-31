// components/MentorsSection.tsx
import Image from "next/image";
import { Star } from "lucide-react";

type Mentor = {
  name: string;
  role: string;
  years: string;
  image: string;
  linkedin: string;
};

const mentors: Mentor[] = [
  {
    name: "Obonganyanga Joshua",
    role: "Lead, Technical Product Manager, Wema Bank",
    years: "4+",
    image: "/images/ppfp/joshua.png",
    linkedin: "https://www.linkedin.com/in/obonganyanga-joshua",
  },
  {
    name: "Adenike Olatunbosun",
    role: "Technical Product Manager, Remita",
    years: "4+",
    image: "/images/ppfp/adenike.png",
    linkedin: "https://www.linkedin.com/in/adenike-olatunbosun-27b384237/",
  },
  {
    name: "Gladys Akinyemi",
    role: "Product Manager/Polaris Bank Limited",
    years: "8+",
    image: "/images/ppfp/gladys.png",
    linkedin: "https://www.linkedin.com/in/gladys-akinyemi-03b818aa",
  },
  {
    name: "Seyifunmi Olafioye",
    role: "Senior Product Manager, Renmoney",
    years: "6+",
    image: "/images/ppfp/seyifunmi.png",
    linkedin: "#",
  },
  {
    name: "Oluwatosin Adetifa",
    role: "Product Manager, Interswitch",
    years: "4+",
    image: "/images/ppfp/oluwatosin.png",
    linkedin: "https://www.linkedin.com/in/adetifa-oluwatosin-1a3101193",
  },
  {
    name: "Mary J. Odey",
    role: "Product Manager (Frontend Channels)/ Renmoney",
    years: "6+",
    image: "/images/ppfp/mary.png",
    linkedin: "https://www.linkedin.com/in/maryjacintaodey/",
  },
];

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M7.69449 2.605L8.39948 4.015C8.49448 4.21 8.74948 4.39499 8.96448 4.43499L10.2395 4.64499C11.0545 4.77999 11.2445 5.37 10.6595 5.96L9.66448 6.955C9.49948 7.12 9.40449 7.445 9.45949 7.68L9.74448 8.91C9.96948 9.88 9.44949 10.26 8.59449 9.75L7.39948 9.04C7.18448 8.91 6.82449 8.91 6.60949 9.04L5.41448 9.75C4.55948 10.255 4.03949 9.88 4.26449 8.91L4.54949 7.68C4.60449 7.45 4.50949 7.125 4.34449 6.955L3.34949 5.96C2.76449 5.375 2.95449 4.78499 3.76949 4.64499L5.04449 4.43499C5.25949 4.39999 5.51449 4.21 5.60949 4.015L6.31449 2.605C6.68949 1.84 7.30949 1.84 7.69449 2.605Z"
        stroke="#5818D0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 2.5H1"
        stroke="#5818D0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 9.5H1"
        stroke="#5818D0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 6H1"
        stroke="#5818D0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PpfpMentorsSection() {
  return (
    <section className="bg-white px-4 py-20 md:px-10 lg:px-14 lg:py-40 ">
      <div className="mx-auto max-w-300">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="md:text-sm text-[12px]  md:font-semibold font-medium tracking-[1.613px] leading-[17.28px] uppercase text-[#5818D0]">
              Learn with guidance
            </p>
            <h2 className="md:mt-4 text-[20px] md:w-160 tracking-[-1.134px] font-semibold md:font-bold md:leading-[43.47px] leading-normal text-[#0E0A1A] md:text-[30.8px]">
              Learn From People Who Understand Product Management Beyond the
              Theory.
            </h2>
          </div>
          <p className="md:w-115 md:text-[15px] text-[12px] md:leading-6 leading-4 text-[#525252] lg:text-right">
            Get guidance, feedback and practical context from Product
            professionals who understand what the work looks like beyond
            frameworks and textbooks.
          </p>
        </div>

        {/* Mentors grid */}
        <div className="mt-8 md:mt-16 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((m) => (
            <article key={m.name}>
              <div className="relative aspect-183/175 w-full overflow-hidden  bg-neutral-100">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <h3 className="mt-6 text-[20px] font-bold text-[#0E0A1A] leading-[18.72px]">
                {m.name}
              </h3>
              <p className=" text-[11px] leading-[18.72px] font-semibold text-[#525252]">
                {m.role}
              </p>

              <div className="mt-2.75 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#5818D0] px-2 py-2 text-[12px] text-[#525252]">
                  <StarIcon />
                  {m.years} Years of Experience
                </span>

                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="shrink-0 transition hover:opacity-90"
                >
                  <Image
                    src="/images/ppfp/linkedin.png"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}