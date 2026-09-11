import React from "react";
import { Star, Linkedin, User } from "lucide-react";
import { Montserrat, Bricolage_Grotesque } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Variable font — covers the full 200–800 weight range used by the header.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

type Mentor = {
  name: string;
  role: string;
  /** Years of experience, e.g. "3+". */
  experience: string;
  /** Headshot in /public/images/ppip; falls back to a placeholder when unset. */
  image?: string;
  /**
   * Focal point for the square crop. Second value is vertical: "0%" pins the
   * top of the photo, "50%" (the default) centres it, "100%" pins the bottom.
   */
  imagePosition?: string;
  /** Profile link; the icon only becomes a link when this is set. */
  linkedinUrl?: string;
};

const mentors: Mentor[] = [
  {
    name: "Blessing Okomor",
    role: "Product Manager, Mainstack",
    experience: "3+",
    image: "/images/ppip/blessing.png",
    linkedinUrl: "https://www.linkedin.com/in/blessing-okomor",
  },
  {
    name: "Chioma Oko",
    role: "Senior Product Manager, Semicolon",
    experience: "4+",
    image: "/images/ppip/chioma.png",
    linkedinUrl: "https://www.linkedin.com/in/adenike-olatunbosun-27b384237",
  },
  {
    name: "Chimezie Ugochi",
    role: "Product Manager, Touch and Pay Technologies",
    experience: "8+",
    image: "/images/ppip/chimeze.png",
    linkedinUrl: "https://www.linkedin.com/in/ugochi-chimezie",
    // Her head sits high in the frame — pull the crop up so it isn't clipped.
    imagePosition: "center 15%",
  },
  {
    name: "Calista Ohana",
    role: "Head of Product, Thelix Holdings",
    experience: "7+",
    image: "/images/ppip/calista.jpg",
    linkedinUrl: "https://www.linkedin.com/in/calistaohama",
  },
  {
    name: "Esther Ojosemako",
    role: "Partner, Tehillah Solutions",
    experience: "10+",
    image: "/images/ppip/easter.jpg",
    linkedinUrl: "https://www.linkedin.com/in/omikunleesther",
  },
  {
    name: "Frank Anwana",
    role: "Product Lead, Translate",
    experience: "15+",
    image: "/images/ppip/frank.jpg",
    // His head sits high in the frame — pull the crop up so it isn't clipped.
    imagePosition: "center 15%",
  },
  {
    name: "Omodara Osiyemi",
    role: "Founder, Product Muse",
    experience: "15+",
    image: "/images/ppip/omodara.png",
    linkedinUrl: "https://www.linkedin.com/in/omolaraosiyemi",
  },
  {
    name: "Oluwatobiloba Animashaun",
    role: "Product Manager, Flutterwave",
    experience: "4+",
    image: "/images/ppip/oluwa.jpg",
    linkedinUrl: "https://www.linkedin.com/in/oluwatobiloba-animashaun-7a7737148",
  },
  {
    name: "Mercy Adeniyi",
    role: "Product Manager, Simpliride",
    experience: "2+",
    image: "/images/ppip/mercy.jpg",
    linkedinUrl: "https://www.linkedin.com/in/mercy-adeniyi-productmanager",
  },
];

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
  const badge = (
    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[3px] bg-[#0A66C2]">
      <Linkedin className="h-[13px] w-[13px] text-white" fill="white" />
    </span>
  );

  return (
    <article>
      {/* Headshot */}
      <div className="aspect-square overflow-hidden rounded-[14px] bg-[#EDE9F5]">
        {mentor.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={mentor.image}
            alt={mentor.name}
            style={{ objectPosition: mentor.imagePosition ?? "center" }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="h-1/3 w-1/3 text-[#B9AECF]" strokeWidth={1.25} />
          </div>
        )}
      </div>

      <h3
        className={`${bricolage.className} mt-[14px] text-[15px] font-bold leading-[1.3] tracking-[-0.02em] text-[#10091A]`}
      >
        {mentor.name}
      </h3>

      <p className="mt-[3px] text-[11px] font-medium leading-[1.4] text-[#5E5775]">
        {mentor.role}
      </p>

      <div className="mt-[10px] flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9B6F5] px-3 py-1 text-[10px] font-medium text-[#4D10C2]">
          <Star className="h-[11px] w-[11px] shrink-0" strokeWidth={2} />
          {mentor.experience} Years of Experience
        </span>

        {mentor.linkedinUrl ? (
          <a
            href={mentor.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${mentor.name} on LinkedIn`}
            className="shrink-0 transition hover:opacity-80"
          >
            {badge}
          </a>
        ) : (
          <span className="shrink-0">{badge}</span>
        )}
      </div>
    </article>
  );
};

const FitChecklist: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-white px-6 py-[80px] text-[#10091A] sm:px-10 lg:px-[80px]`}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_480px] lg:items-start">
          {/* Left */}
          <div>
            <p
              className={`${bricolage.className}
                mb-5
                text-[11px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#6424E8]
              `}
            >
              YOU WON&apos;T FIGURE IT OUT ALONE
            </p>

            <h2
              className={`${bricolage.className}
                max-w-[650px]
                text-[22px]
                font-extrabold
                leading-[1.15]
                tracking-[-0.04em]
                text-[#10091A]
                sm:text-[32px]
                lg:text-[30px]
              `}
            >
              Get Feedback From People Who
              <br className="hidden sm:block" />
              Understand the Work.
            </h2>
          </div>

          {/* Right */}
          <p
            className="
              max-w-[470px]
              text-[14px]
              font-medium
              leading-[1.65]
              text-[#725C95]
              lg:justify-self-end
              lg:text-right
            "
          >
            Throughout the apprenticeship, you&apos;ll receive guidance and
            structured feedback from experienced Product professionals who
            challenge your thinking and help you improve the quality of your
            work.
          </p>
        </div>

        {/* =====================================================
            MENTOR GRID
        ====================================================== */}
        <div className="mt-[64px] grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.name} mentor={mentor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitChecklist;
