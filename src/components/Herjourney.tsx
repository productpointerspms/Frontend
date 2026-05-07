import { Lightbulb, Rocket, Users, Globe } from "lucide-react";
import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      year: "2023",
      title: "A Spark Begins",
      desc: "She started her journey into product management learning, building, and experimenting with real-world projects. Her passion for helping others grow pushed her to start sharing insights and mentoring early-career professionals.",
      icon: <Lightbulb className="text-white" size={18} />,
      align: "left",
    },
    {
      year: "2024",
      title: "Community Takes Shape",
      desc: "Her mentorship grew into a small but dedicated circle of aspiring product managers. Seeing the impact, she decided to formalize it hosting her first cohort, online sessions, and study groups that helped members land product roles and internships.",
      icon: <Rocket className="text-white" size={18} />,
      align: "right",
    },
    {
      year: "2025",
      title: "The Birth of ProductPointers",
      desc: "With a growing network of 300+ members across Africa, she officially launched ProductPointers, a community-driven platform to make product management education accessible to everyone.",
      icon: <Users className="text-white" size={18} />,
      align: "left",
    },
    {
      year: "Present Day",
      title: "Empowering the Next Generation",
      desc: "Today, ProductPointers continues to empower, connect, and mentor aspiring PMs, helping them build confidence, clarity, and community in their product management journey.",
      icon: <Globe className="text-white" size={18} />,
      align: "right",
    },
  ];

  return (
    <section className={`${montserrat.className} w-full py-24 px-6 md:px-12 bg-[#FDF4FF]`}>
      {/* Section Header */}
      <div className="text-center mb-24">
        <h2 className="text-[#15010D] text-[32px] md:text-[42px] font-bold mb-4">
          Her Journey
        </h2>
        <p className="text-[#15010D] opacity-60 text-lg md:text-xl font-normal">
          From a small community to a global movement in product management education
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Vertical line - thinner and darker purple */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-[#6024D0]" />

        {/* Milestone Rows */}
        <div className="flex flex-col gap-16 md:gap-4 relative z-10">
          {milestones.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center w-full ${
                item.align === "right" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Card - Large rounded corners and subtle shadow */}
              <div
                className={`bg-white shadow-sm border border-gray-50 rounded-[24px] p-8 w-full md:w-[45%] ${
                  item.align === "right" ? "md:ml-auto" : "md:mr-auto"
                }`}
              >
                <p className="text-[#6024D0] text-xl font-bold mb-4">
                  {item.year}
                </p>
                <h3 className="text-[#15010D] text-xl md:text-[22px] font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-[#15010D] opacity-60 text-base leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Icon - Solid purple circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 bg-[#6024D0] rounded-full shadow-lg border-4 border-[#FDF4FF]">
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