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
      name: "Favour Osaro",
      role: "Project & Program Manager",
      img: "/images/Favour.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/favourosaro/",
        facebook: "https://www.facebook.com/Favyjames?_rdc=1&_rdr#",
      },
    },
    {
      name: "Olubunmi Kehinde",
      role: "Community Manager",
      img: "/images/Olubunmi.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/olubunmi-kehinde",
        facebook: "https://www.facebook.com/kehindeolubunmifaithia?_rdc=1&_rdr#",
      },
    },
    {
      name: "Mercy Okpara",
      role: "Social Media / VA",
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
    facebook: <FaFacebookF />,
    instagram: <FaInstagram />,
    tiktok: <SiTiktok />,
    x: <SiX />,
  };

  return (
    <section className="w-full bg-[#FCF1FF] py-16 px-6 text-[#15010D] text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold font-[Montserrat] mb-4">Meet Our Team</h2>
        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-12">
          The passionate individuals behind ProductPointers’ mission to transform product management education.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {team.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 w-full max-w-[360px] shadow-lg hover:shadow-xl transition"
            >
              <Image
                src={m.img}
                alt={m.name}
                width={160}
                height={160}
                className="mx-auto rounded-full mb-6 object-cover"
              />
              <h3 className="text-xl font-semibold">{m.name}</h3>
              <p className="text-gray-500 mt-1">{m.role}</p>

              <div className="flex justify-center gap-4 mt-4 text-2xl text-[#5B1CC5]">
                {Object.entries(m.socials).map(([platform, url], idx) => (
                  <a key={idx} href={url} target="_blank" rel="noreferrer" className="hover:scale-110 transition">
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
