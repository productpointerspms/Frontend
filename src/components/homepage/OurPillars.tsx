import React from "react";
import img from "@/assets/images/pila.png";
import img1 from "@/assets/images/pila1.png";
import img2 from "@/assets/images/pila2.png";
import img3 from "@/assets/images/pila3.png";
import img4 from "@/assets/images/pila4.png";
import Card from "./Card";

const OurPillars: React.FC = () => {
  const pillars = [
    {
      image: img4,
      title: "Accelerator",
      description:
        "Fast-track your product & project career with intensive, hands-on programs designed by industry leaders.",
      link: "#",
    },
    {
      image: img3,
      title: "Mentorship",
      description:
        "Learn from seasoned product leaders who have built successful products at scale.",
      link: "#",
    },
    {
      image: img2,
      title: "Coaching",
      description:
        "Personalized guidance to unlock your full potential and accelerate your growth.",
      link: "#",
    },
    {
      image: img,
      title: "Community",
      description:
        "Connect with like-minded product professionals and build lasting relationships.",
      link: "#",
    },
    {
      image: img1,
      title: "Network",
      description:
        "Build a powerful professional network that advances your career & finances for years to come.",
      link: "#",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center w-full px-6 md:px-20 py-24 bg-gradient-to-b from-[#FAE1FF] to-[#FCF1FF]">
      {/* Section Header */}
      <div className="text-center mb-16 max-w-3xl">
        <h2
          className="
    text-[24px] md:text-4xl
    font-bold font-montserrat
    text-[#15010D]
    capitalize
    text-center   
    mb-4
  "
        >
          Our Pillers
        </h2>

        <p
          className="
    text-center 
    font-montserrat 
    text-[#15010D] 
    font-normal 
    text-[12px] leading-[20px] 
    md:text-[20px] md:leading-[36px]
  "
        >
          The foundations that guide ProductPointers programs.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-10 w-full max-w-7xl">
        {pillars.map((pillar, index) => (
          <Card
            key={index}
            image={pillar.image}
            title={pillar.title}
            description={pillar.description}
            link={pillar.link}
          />
        ))}
      </div>
    </section>
  );
};

export default OurPillars;
