import { Lightbulb, Rocket, Users, Globe } from "lucide-react";
import React from "react";

interface Milestone {
  year: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  align: "left" | "right";
}

const HerJourney: React.FC = () => {
  const milestones: Milestone[] = [
    {
      year: "2024",
      title: "A Spark Begins",
      desc: "She started her journey into product management learning, building and experimenting with real world projects. Her passion for helping others grow pushed her to start sharing insights and mentoring early career professionals.",
      icon: <Lightbulb className="text-[#6B00B3]" size={22} />,
      align: "left",
    },
    {
      year: "2024",
      title: "Community Takes Shape",
      desc: "Her mentorship grew into a small but dedicated circle of aspiring product managers. Seeing the impact, she decided to formalize it hosting her first cohort, online sessions, and study groups that helped members land product roles and internships.",
      icon: <Rocket className="text-[#6B00B3]" size={22} />,
      align: "right",
    },
    {
      year: "2025",
      title: "The Birth of ProductPointers",
      desc: "With a growing network of 500+ members across Africa, she officially launched ProductPointers, a community driven platform to make product management education accessible to everyone.",
      icon: <Users className="text-[#6B00B3]" size={22} />,
      align: "left",
    },
    {
      year: "Present Day",
      title: "Empowering the Next Generation",
      desc: "Today, ProductPointers continues to empower, connect, and mentor aspiring PMs, helping them build confidence, clarity, and community in their product management journey.",
      icon: <Globe className="text-[#6B00B3]" size={22} />,
      align: "right",
    },
  ];

  return (
    <section
      className="w-full py-24 px-6 md:px-16"
      style={{
        background: "linear-gradient(180deg, #FAE1FF 0%, #FCF1FF 100%)",
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-20">
        <h2 className="text-[#15010D] text-[40px] md:text-[60px] font-bold leading-tight font-[Montserrat]">
          Her Journey
        </h2>
        <p className="text-[#15010D] text-[18px] md:text-[20px] font-normal mt-3 font-[Montserrat]">
          From a small community to a global movement in product management education
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-[1000px] mx-auto">
        {/* Vertical line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[3px] h-full bg-[#6B00B3]" />

        {/* Cards */}
        <div className="flex flex-col gap-24 relative z-10">
          {milestones.map((item, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center ${
                item.align === "right"
                  ? "md:flex-row-reverse md:justify-between"
                  : "md:justify-between"
              }`}
            >
              {/* Card */}
              <div
                className={`bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.25)] rounded-[16px] p-6 w-full md:w-[444px] ${
                  item.align === "right" ? "md:ml-auto" : "md:mr-auto"
                }`}
              >
                <p className="text-[#6B00B3] text-[20px] font-semibold font-[Montserrat] mb-1">
                  {item.year}
                </p>
                <h3 className="text-[#15010D] text-[20px] md:text-[22px] font-semibold mb-2 font-[Montserrat]">
                  {item.title}
                </h3>
                <p className="text-[#6D6D6D] text-[16px] leading-[26px] font-[Montserrat]">
                  {item.desc}
                </p>
              </div>

              {/* Icon positioned at center line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[52px] h-[52px] bg-white rounded-full shadow-md border border-[#E0B3F7]">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HerJourney;
