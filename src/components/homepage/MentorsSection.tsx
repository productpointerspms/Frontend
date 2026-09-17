import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  experience: string;
  image: string;
  linkedinUrl?: string;
  /**
   * Optional per-image crop anchor (CSS object-position value), e.g.
   * "center top", "center 20%", "50% 15%". Defaults to "center top" if omitted.
   * Adjust this per mentor to compensate for inconsistently framed source photos.
   */
  imagePosition?: string;
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Blessing Okomor",
    role: "Product Manager",
    company: "Mainstack",
    experience: "3+ Years of Experience",
    image: "/images/homepage/blessing.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/blessing-okomor",
    imagePosition: "center top", // TODO: tweak per photo, e.g. "center 20%"
  },
  {
    id: 2,
    name: "Adenike Olatunbosun",
    role: "Technical Product Manager",
    company: "Remita",
    experience: "5+ Years of Experience",
    image: "/images/homepage/adenike.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/adenike-olatunbosun-27b384237/",
    imagePosition: "center 40%", // adjusted for this photo's framing
  },
  {
    id: 3,
    name: "Prince Ekpenyong",
    role: "Senior Technical PM",
    company: "Mstrets Finance",
    experience: "6+ Years of Experience",
    image: "/images/homepage/prince.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/prince-ekpenyong/",
    imagePosition: "center top", // TODO: tweak per photo, e.g. "center 20%"
  },
  {
    id: 4,
    name: "Ann Chigozie Ezeogu",
    role: "Founder",
    company: "Product Mindset",
    experience: "6+ Years of Experience",
    image: "/images/homepage/ann.png",
    linkedinUrl: "https://www.linkedin.com/in/annezeogu/",
    imagePosition: "center top", // TODO: tweak per photo, e.g. "center 20%"
  },
  {
    id: 5,
    name: "NNwobodo U. Lydia",
    role: "Product Manager",
    company: "Miva Open University",
    experience: "5+ Years of Experience",
    image: "/images/homepage/lydia.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/lydianwobodo/",
    imagePosition: "center 30%", // adjusted for this photo's framing
  },
  {
    id: 6,
    name: "Mary J. Odey",
    role: "Product Manager",
    company: "Renmoney",
    experience: "6+ Years of Experience",
    image: "/images/homepage/mary.png",
    linkedinUrl: "https://www.linkedin.com/in/maryjacintaodey/",
    imagePosition: "center top", // TODO: tweak per photo, e.g. "center 20%"
  },
  {
    id: 7,
    name: "Tracy Ogilo",
    role: "Product Manager",
    company: "PryceBuddy",
    experience: "4+ Years of Experience",
    image: "/images/homepage/tracy.png",
    linkedinUrl: "https://www.linkedin.com/in/tracyogilo/",
    imagePosition: "center top", // TODO: tweak per photo, e.g. "center 20%"
  },
  {
    id: 8,
    name: "Chimezie Ugochi",
    role: "Product Manager",
    company: "Touch and Pay Technologies",
    experience: "8+ Years of Experience",
    image: "/images/homepage/ugochi.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/ugochi-chimezie/",
    imagePosition: "center top", // TODO: tweak per photo, e.g. "center 20%"
  },
  {
    id: 9,
    name: "Frank Anwana",
    role: "Product Lead",
    company: "Translate",
    experience: "15+ Years of Experience",
    image: "/images/homepage/frank.JPEG",
    linkedinUrl: "https://www.linkedin.com/in/frankanwana/",
    imagePosition: "center top", // TODO: tweak per photo, e.g. "center 20%"
  },
  {
    id: 10,
    name: "Esther Ojosemako",
    role: "Partner",
    company: "Tehillah Solutions",
    experience: "10+ Years of Experience",
    image: "/images/homepage/esther.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/omikunleesther",
    imagePosition: "center top", // TODO: tweak per photo, e.g. "center 20%"
  },
  {
    id: 11,
    name: "Calista Ohana",
    role: "Head of Product",
    company: "Thelix Holdings",
    experience: "7+ Years of Experience",
    image: "/images/homepage/calister.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/calistaohama",
    imagePosition: "center 35%", // adjusted for this photo's framing
  },
  {
    id: 12,
    name: "Omolara Osiyemi",
    role: "Founder",
    company: "Product Muse",
    experience: "15+ Years of Experience",
    image: "/images/homepage/omolara.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/omolaraosiyemi",
    imagePosition: "center top", // TODO: tweak per photo, e.g. "center 20%"
  },
  {
    id: 13,
    name: "Oluwatobiloba Animashaun",
    role: "Product Manager",
    company: "Flutterwave",
    experience: "4+ Years of Experience",
    image: "/images/homepage/tobi.jpeg",
    linkedinUrl:
      "https://www.linkedin.com/in/oluwatobiloba-animashaun-7a7737148",
    imagePosition: "center 40%", // adjusted for this photo's framing
  },
  {
    id: 14,
    name: "Mercy Adeniyi",
    role: "Product Manager",
    company: "Simpliride",
    experience: "2+ Years of Experience",
    image: "/images/homepage/mercy.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/mercy-adeniyi-productmanager",
    imagePosition: "center top", // TODO: tweak per photo, e.g. "center 20%"
  },
];

export default function MentorsSection() {
  return (
    <div
      className={`${montserrat.className} w-full bg-white py-16 md:pb-30 px-4 md:px-10 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:mb-14 mb-6">
          <div>
            <p className="mb-3 text-xs md:text-base md:font-semibold font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#5818D0]">
              MEET YOUR MENTORS &amp; COACHES
            </p>
            <h2 className="md:w-150 w-80 md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
              Learn From Those Doing the Work.
            </h2>
          </div>
          <p className="md:w-105 w-86 md:text-[15px] text-[12px] leading-4 md:leading-[151.667%] text-[#525252] sm:text-right">
            Get practical guidance, real-world insights and feedback from
            experienced professionals who understand what it takes to build and
            grow in Product.
          </p>
        </div>

        {/* Mentors Auto-Scrolling Marquee */}
        <div className="relative w-full overflow-hidden marquee-mask">
          <div className="flex w-max marquee-track">
            {[...mentors, ...mentors].map((mentor, index) => (
              <div
                key={`${mentor.id}-${index}`}
                aria-hidden={index >= mentors.length}
                className="relative shrink-0 mr-5 rounded-t-xl overflow-hidden w-63.25 h-60.25 md:w-76 md:h-72.75"
              >
                {/* Photo */}
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: mentor.imagePosition ?? "center top",
                  }}
                />

                {/* Bottom gradient for text legibility */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(118, 118, 118, 0.00) 37.11%, rgba(0, 0, 0, 0.68) 75%, rgba(0, 0, 0, 0.80) 82.28%, rgba(0, 0, 0, 0.90) 89.11%, #000 100%)",
                  }}
                />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="font-bold text-white text-sm md:text-base md:leading-[18.72px] leading-[15.528px]">
                    {mentor.name}
                  </h4>
                  <p className="text-white text-[10px] md:text-xs font-semibold mb-1 leading-[15.528px] md:leading-[18.72px]">
                    {mentor.role}, {mentor.company}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 border border-[#5818D0] text-white text-[8px] font-normal rounded-full p-2">
                      <Image
                        src="/images/homepage/sparkle.png"
                        alt=""
                        width={16}
                        height={16}
                        className="w-3 h-3"
                      />
                      {mentor.experience}
                    </span>

                    {mentor.linkedinUrl && (
                      <a
                        href={mentor.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center p-1.5"
                        style={{
                          background: "#0077B5",
                          boxShadow:
                            "0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)",
                        }}
                      >
                        <LinkedinIcon className="w-full h-full text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
