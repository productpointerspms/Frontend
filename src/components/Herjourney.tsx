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
}

const HerJourney: React.FC = () => {
  const milestones: Milestone[] = [
    {
      year: "2023",
      title: "A Spark Begins",
      desc: "She started her journey into product management learning, building, and experimenting with real-world projects. Her passion for helping others grow pushed her to start sharing insights and mentoring early-career professionals.",
      icon: <Lightbulb className="text-white" size={18} />,
    },
    {
      year: "2024",
      title: "Community Takes Shape",
      desc: "Her mentorship grew into a small but dedicated circle of aspiring product managers. Seeing the impact, she decided to formalize it hosting her first cohort, online sessions, and study groups that helped members land product roles and internships.",
      icon: <Rocket className="text-white" size={18} />,
    },
    {
      year: "2025",
      title: "The Birth of ProductPointers",
      desc: "With a growing network of 300+ members across Africa, she officially launched ProductPointers, a community-driven platform to make product management education accessible to everyone.",
      icon: <Users className="text-white" size={18} />,
    },
    {
      year: "Present Day",
      title: "Empowering the Next Generation",
      desc: "Today, ProductPointers continues to empower, connect, and mentor aspiring PMs, helping them build confidence, clarity, and community in their product management journey.",
      icon: <Globe className="text-white" size={18} />,
    },
  ];

  return (
    <section className={`${montserrat.className} w-full py-16 md:py-24 px-6 md:px-12 bg-[#FDF4FF]`}>
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-[#15010D] text-[25px] md:text-[37px] font-bold mb-4 leading-tight">
          Her Journey
        </h2>
        <p className="text-[#15010D] opacity-60 text-sm md:text-lg font-normal max-w-2xl mx-auto">
          From a small community to a global movement in product management education
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto">
        
        {/* Vertical line: Left on mobile, Center on desktop */}
        <div className="absolute top-0 left-4 md:left-1/2 transform md:-translate-x-1/2 w-[2px] h-full bg-[#6024D0]/30 md:bg-[#6024D0]" />

        {/* Milestone Rows */}
        <div className="space-y-12 md:space-y-4 relative z-10">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex items-center w-full justify-start md:justify-normal ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* 1. The Card Container */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div
                    className={`bg-white shadow-sm border border-purple-50 rounded-[24px] p-6 md:p-8 
                      ${isEven ? "md:mr-12" : "md:ml-12"} 
                      transition-transform hover:scale-[1.02]`}
                  >
                    <p className="text-[#6024D0] text-base md:text-lg font-bold mb-2 md:mb-4">
                      {item.year}
                    </p>
                    <h3 className="text-[#15010D] text-base md:text-[19px] font-bold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#15010D] opacity-70 text-xs md:text-sm leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* 2. The Icon (Dot) */}
                {/* Positioned at left 4px on mobile, center on desktop */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-[#6024D0] rounded-full shadow-lg border-4 border-[#FDF4FF]">
                  <div className="scale-75 md:scale-100">
                    {item.icon}
                  </div>
                </div>

                {/* 3. Empty Spacer for Desktop Layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HerJourney;