import React from "react";
import { UserPlus, BookOpen, GraduationCap, Users, Star } from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface JourneyStep {
  title: string;
  description: string;
  color: string;
  icon: JSX.Element;
}

const ProductPointersJourney: React.FC = () => {
  const steps: JourneyStep[] = [
    {
      title: "New Member",
      description: "Join our community and get access to exclusive resources",
      color: "bg-purple-600",
      icon: <UserPlus className="w-6 h-6 text-white" />,
    },
    {
      title: "Learner",
      description: "Participate in workshops, courses, and hands-on projects",
      color: "bg-fuchsia-500",
      icon: <BookOpen className="w-6 h-6 text-white" />,
    },
    {
      title: "Graduate",
      description: "Complete your program and showcase your new skills",
      color: "bg-green-500",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
    },
    {
      title: "Alumni",
      description: "Stay connected with lifelong access to our network",
      color: "bg-orange-600",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      title: "Mentor",
      description: "Give back by mentoring the next generation",
      color: "bg-blue-700",
      icon: <Star className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center w-full px-10 py-24 bg-gradient-to-b from-[#FAE1FF] to-[#FAE1FF]">
      <div className="text-center mb-16 max-w-3xl">
        <h2
          className="
    text-[24px] md:text-4xl
    font-bold font-[montserrat]
    text-[#15010D]
    text-center
    capitalize
    mb-4
  "
        >
          Your ProductPointers Journey
        </h2>

        <p
          className="
    text-center
    text-[12px] md:text-[20px]
    font-[montserrat]
    font-normal
    leading-[20px] md:leading-[36px]
    text-[#15010D]
  "
        >
          A clear path from beginner to industry leader. Every step is designed
          to build on the previous one, ensuring continuous growth.
        </p>
      </div>

      {/* Timeline Line */}
      <div className="relative w-full flex justify-center">
        <div className="absolute top-1 left-0 right-0 h-[2px] mx-30 bg-gradient-to-r from-purple-400 via-green-400 to-blue-400" />

        <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-6 relative z-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center text-center bg-white w-[224px] h-[240px] px-6 py-4 gap-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${step.color} shadow-lg`}
              >
                {step.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPointersJourney;
