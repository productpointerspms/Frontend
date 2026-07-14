import Image from "next/image";
import { FaLinkedin, FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiTiktok, SiX } from "react-icons/si";
import React from "react";

interface SocialLinks {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  x?: string;
}

interface TeamMember {
  name: string;
  role: string;
  img: string;
  socials: SocialLinks;
}

const Team: React.FC = () => {
  const team: TeamMember[] = [
    {
      name: "Blessing Okomor",
      role: "Founder & CEO",
      img: "/images/Blessing.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/blessing-okomor/",
        x: "https://x.com/blessingok",
      },
    },
    {
      name: "Mercy Adeniyi",
      role: "Product Manager",
      img: "/images/mercyy.png",
      socials: {
        linkedin: "http://www.linkedin.com/in/olubunmi-kehinde",
        facebook: "https://www.facebook.com/kehindeolubunmifaithia",
      },
    },
    {
      name: "Favour Osaro",
      role: "Project and Program Manager",
      img: "/images/Favour.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/favourosaro/",
        facebook: "https://www.facebook.com/Favyjames?_rdc=1&_rdr#",
      },
    },
    {
      name: "Olubunmi Kehinde",
      role: "VA/Community Manager",
      img: "/images/Olubunmi.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/olubunmi-kehinde",
        facebook: "https://www.facebook.com/kehindeolubunmifaithia?_rdc=1&_rdr#",
      },
    },
    {
      name: "Mercy Okpara",
      role: "Social Media/VA",
      img: "/images/Mercy.png",
      socials: {
        instagram: "https://www.instagram.com/mer_cee24/#",
        tiktok: "https://www.tiktok.com/@mercy.chidimma0",
      },
    },
    {
      name: "Nwabueze Success",
      role: "Virtual Assistant",
      img: "/images/Success.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/udochukwu-success-735b61286",
        x: "https://x.com/Theophaniajesse?t=jdBDv7otifsz9FKUgRhJYQ&s=09",
      },
    },
  ];

  const icons: Record<string, React.ReactNode> = {
    linkedin: <FaLinkedin />,
    facebook: (
      <span className="bg-[#1877F2] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
        <FaFacebookF />
      </span>
    ),
    instagram: <FaInstagram />,
    tiktok: <SiTiktok />,
    x: <SiX />,
  };

  return (
    <section className="w-full bg-[#FAF5FF] py-20 px-6 text-[#15010D] text-center">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Meet the Team Behind ProductPointers
        </h2>
        <p className="text-[#15010D]/60 max-w-2xl mx-auto mb-16 leading-relaxed">
          Learn from experienced product professionals dedicated to helping you grow.
        </p>

        {/* 3-over-2 Responsive Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 w-full md:w-[calc(33.33%-2rem)] min-w-[300px] max-w-[350px] shadow-sm flex flex-col items-center"
            >
              {/* Circular Image with specific border/shadow if seen in image */}
              <div className="relative w-32 h-32 mb-6">
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold mb-1">{m.name}</h3>
              <p className="text-[#15010D]/50 text-xs mb-6">{m.role}</p>

              {/* Social Icons - Navy Blue Color */}
              <div className="flex justify-center gap-4 text-lg text-[#2D3182]">
                {Object.entries(m.socials).map(([platform, url], idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    {icons[platform]}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;