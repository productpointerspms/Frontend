import React from "react";
import { Target, Users, Infinity, Trophy } from "lucide-react";

interface Value {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: <Target size={24} />,
    title: "Impact First",
    description:
      "Everything we do is focused on helping you build real product experience that actually moves your career forward.",
  },
  {
    icon: <Users size={24} />,
    title: "Inclusive Growth",
    description:
      "We support learners from all backgrounds and help you grow with confidence, regardless of where you're starting from.",
  },
  {
    icon: <Infinity size={24} />,
    title: "Continuous Learning",
    description:
      "You'll constantly improve through feedback, iteration, and real product work not just theory.",
  },
  {
    icon: <Trophy size={24} />,
    title: "Excellence",
    description:
      "We hold a high standard across mentorship, projects, and outcomes so you get real value from every step.",
  },
];

const CoreValues: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDF4FF] w-full px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Heading */}
        <h2 className="text-[#15010D] text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">
          Our Core Values
        </h2>

        {/* Subtitle */}
        <p className="text-[#15010D]/60 text-base md:text-lg mb-16 max-w-2xl mx-auto">
          These values guide every decision we make and every program we create
        </p>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <div
              key={i}
              className="bg-white border border-purple-100 rounded-[32px] p-8 flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow h-full"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-[#6024D0] text-white rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-purple-100">
                {value.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-[#15010D] text-lg font-bold mb-4">
                {value.title}
              </h3>
              <p className="text-[#15010D]/70 text-xs leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;