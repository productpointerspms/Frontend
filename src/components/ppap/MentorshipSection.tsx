import React from "react";
import { Linkedin, BriefcaseBusiness } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";

// Headings share the PPIP display face — variable weight covers 200-800.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });


const MentorshipSection = () => {
  const mentors = [
    {
      name: "Blessing Okomor",
      role: "Product Manager, Mainstack",
      experience: "3+ Years of Experience",
      image: "/images/ppip/blessing.png",
      linkedin: "https://www.linkedin.com/in/blessing-okomor",
    },
    {
      name: "Adenike Olatunbosun",
      role: "Technical Product Manager, Remita",
      experience: "5+ Years of Experience",
      image: "/images/ppap/mentors/adenike.jpg",
      linkedin: "https://www.linkedin.com/in/adenike-olatunbosun-27b384237",
    },
    {
      name: "Prince Ekpenyong",
      role: "Senior Technical PM, Mstrets Finance",
      experience: "6+ Years of Experience",
      image: "/images/ppap/mentors/prince.jpg",
      linkedin: "https://www.linkedin.com/in/prince-ekpenyong",
    },
    {
      name: "Ann Chigozie Ezeogu",
      role: "Founder, Product Mindset",
      experience: "6+ Years of Experience",
      image: "/images/ppap/mentors/ann.jpg",
      linkedin: "https://www.linkedin.com/in/calistaohama",
    },
    {
      name: "Nwobodo U. Lydia",
      role: "Product Manager, Miva Open University",
      experience: "6+ Years of Experience",
      image: "/images/ppap/mentors/lydia.jpg",
      linkedin: "https://www.linkedin.com/in/omikunleesther",
    },
    {
      name: "Mary J. Odey",
      role: "Product Manager, Renmoney",
      experience: "6+ Years of Experience",
      image: "/images/ppap/mentors/mary.jpg",
      linkedin: "#",
    },
    {
      name: "Tracy Ogilo",
      role: "Product Manager, PryceBuddy",
      experience: "4+ Years of Experience",
      image: "/images/ppap/mentors/tracy.jpg",
      linkedin: "https://www.linkedin.com/in/omolaraosiyemi",
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-20 lg:py-[78px]">

        {/* TOP HEADER */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          
          {/* Left heading */}
          <div>
            <p
              className="
                mb-5
                text-[13px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#5818D0]
              "
            >
              Learn With Guidance
            </p>

            <h2
              className={`${bricolage.className}
                max-w-[720px]
                text-[22px]
                font-extrabold
                leading-[1.16]
                tracking-[-0.04em]
                text-[#120D1D]
                sm:text-[38px]
                lg:text-[40px]
              `}
            >
              Learn From People Who Understand
              <br className="hidden lg:block" />
              Product Management Beyond the Theory.
            </h2>
          </div>

          {/* Right intro */}
          <div className="flex lg:justify-end lg:pt-1">
            <p
              className="
                max-w-[470px]
                text-left
                text-[14px]
                leading-[1.55]
                text-[#6E6A72]
                lg:text-center
              "
            >
              Get guidance, feedback and practical context from Product
              professionals who understand what the work looks like beyond
              frameworks and textbooks.
            </p>
          </div>
        </div>

        {/* MENTOR GRID */}
        <div
          className="
            mt-[68px]
            grid
            grid-cols-1
            gap-x-5
            gap-y-[58px]
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {mentors.map((mentor) => (
            <article key={mentor.name} className="min-w-0">

              {/* IMAGE */}
              <div
                className="
                  aspect-[1.04/1]
                  w-full
                  overflow-hidden
                  rounded-[11px]
                  bg-[#F3F3F3]
                "
              >
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className={`h-full w-full object-cover ${
                    mentor.name === "Prince Ekpenyong"
                      ? "object-[center_20%]"
                      : ""
                  }`}
                />
              </div>

              {/* NAME */}
              <h3
                className={`${bricolage.className}
                  mt-5
                  text-[16px]
                  font-bold
                  leading-[1.25]
                  tracking-[-0.025em]
                  text-[#16111D]
                `}
              >
                {mentor.name}
              </h3>

              {/* ROLE */}
              <p
                className="
                  mt-1
                  text-[12px]
                  leading-[1.4]
                  text-[#5F5A63]
                "
              >
                {mentor.role}
              </p>

              {/* BADGE + LINKEDIN */}
              <div className="mt-3 flex items-center justify-between gap-3">

                <div
                  className="
                    inline-flex
                    min-h-[24px]
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#5818D0]
                    bg-[#5818D014]
                    px-3
                    text-[11px]
                    font-medium
                    text-[#5818D0]
                  "
                >
                  <BriefcaseBusiness className="h-3 w-3" strokeWidth={1.8} />
                  {mentor.experience}
                </div>

                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${mentor.name} LinkedIn profile`}
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    bg-[#0A84B8]
                    text-white
                    transition-opacity
                    hover:opacity-80
                  "
                >
                  <Linkedin className="h-3.5 w-3.5" fill="currentColor" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;