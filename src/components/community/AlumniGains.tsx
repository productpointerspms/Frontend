import React from "react";
import { 
  Share2, 
  Target, 
  MessageSquare, 
  TrendingUp, 
  BookOpen, 
  BarChart3 
} from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const AlumniGains: React.FC = () => {
  const gains = [
    {
      title: "Lifelong Product Network",
      description: "Build meaningful relationships with aspiring and experienced Product Managers growing together within the ecosystem",
      icon: <Share2 size={20} />,
    },
    {
      title: "Accountability Support",
      description: "Stay committed to your goals through accountability groups, growth tracking, and structured participation systems",
      icon: <Target size={20} />,
    },
    {
      title: "Continuous Mentorship",
      description: "Continue receiving guidance, support, recommendations, and growth-focused mentorship after your program.",
      icon: <MessageSquare size={20} />,
    },
    {
      title: "Career Growth Opportunities",
      description: "Access opportunities, insights, collaborations, and resources that support your long-term Product Management growth.",
      icon: <TrendingUp size={20} />,
    },
    {
      title: "Learning Resources",
      description: "Gain access to curated frameworks, templates, recommendations, and growth materials shared within the community.",
      icon: <BookOpen size={20} />,
    },
    {
      title: "Structured Self-Development",
      description: "Improve intentionally through monthly rituals, quarterly reviews, goal-setting systems, and continuous reflection.",
      icon: <BarChart3 size={20} />,
    },
  ];

  return (
    <div className={`${montserrat.className} bg-[#F6E1FF] py-20 px-6 md:px-12 lg:px-24`}>
      <div className="max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <h2 className="text-[#000000] text-2xl md:text-[35px] font-bold mb-6">
          What Alumni Gain From The Community
        </h2>
        <p className="text-[#000000]/60 text-base md:text-lg max-w-4xl mx-auto mb-16 leading-relaxed">
          The ProductPointers Community is designed to help alumni continue growing, stay 
          accountable, build meaningful relationships, and access long-term support 
          throughout their Product Management journey.
        </p>

        {/* Gains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gains.map((gain, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[32px] p-10 flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow h-full"
            >
              {/* Icon Container */}
              <div className="bg-[#6024D0] text-white p-3 rounded-xl mb-8 shadow-lg shadow-purple-200">
                {gain.icon}
              </div>

              {/* Content */}
              <h3 className="text-[#000000] text-xl font-bold mb-6 leading-tight">
                {gain.title}
              </h3>
              <p className="text-[#000000]/70 text-sm leading-relaxed">
                {gain.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniGains;