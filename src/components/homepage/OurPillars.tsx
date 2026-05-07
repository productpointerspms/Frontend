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
      description: "Fast-track your product & project career with intensive, hands-on programs designed by industry leaders.",
      link: "#",
    },
    {
      image: img3,
      title: "Mentorship",
      description: "Learn from seasoned product leaders who have built successful products at scale.",
      link: "#",
    },
    {
      image: img2,
      title: "Coaching",
      description: "Personalized guidance to unlock your full potential and accelerate your growth.",
      link: "#",
    },
    {
      image: img,
      title: "Community",
      description: "Connect with like-minded product professionals and build lasting relationships.",
      link: "#",
    },
    {
      image: img1,
      title: "Network",
      description: "Build a powerful professional network that advances your career & finances for years to come.",
      link: "#",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center w-full px-6 md:px-20 py-24 bg-gradient-to-b from-[#FAE1FF] to-[#FCF1FF]">
      <div className="text-center mb-16 max-w-3xl">
        <h2 className="text-center font-montserrat text-[#15010D] font-bold capitalize text-[24px] md:text-4xl mb-4">
          Our Pillars
        </h2>
        <p className="text-center font-montserrat text-[#15010D] font-normal text-[12px] leading-[20px] md:text-[20px] md:leading-[36px]">
          The foundations that guide ProductPointers programs.
        </p>
      </div>

      {/* Mobile & Tablet: single unified grid; Desktop: two rows (3 + 2 centered) */}
      <div className="w-full max-w-5xl mx-auto">
        {/* Mobile (< lg): 1 col on xs, 2 cols on sm/md — all 5 cards in one grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
          {pillars.map((pillar, index) => (
            <div key={index} className={`w-full h-full flex justify-center${index === 4 ? " sm:col-span-2 sm:max-w-sm sm:mx-auto" : ""}`}>
              <Card
                image={pillar.image}
                title={pillar.title}
                description={pillar.description}
                link={pillar.link}
              />
            </div>
          ))}
        </div>

        {/* Desktop (lg+): Row 1: 3 cards, Row 2: 2 cards centered */}
        <div className="hidden lg:flex lg:flex-col gap-10">
          <div className="grid grid-cols-3 gap-10">
            {pillars.slice(0, 3).map((pillar, index) => (
              <div key={index} className="w-full h-full flex justify-center">
                <Card
                  image={pillar.image}
                  title={pillar.title}
                  description={pillar.description}
                  link={pillar.link}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-10 mx-32">
            {pillars.slice(3).map((pillar, index) => (
              <div key={index} className="w-full h-full flex justify-center">
                <Card
                  image={pillar.image}
                  title={pillar.title}
                  description={pillar.description}
                  link={pillar.link}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPillars;