import React from 'react';
import { TrendingUp, Share2, Shield, Target } from 'lucide-react';

const CommunityValues = () => {
  const values = [
    {
      title: "Continuous Growth",
      description: "Keep developing your Product Management skills through ongoing learning, mentorship, and accountability",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
    {
      title: "Meaningful Networking",
      description: "Connect with aspiring and experienced Product Managers building and growing together.",
      icon: <Share2 className="w-6 h-6 text-white" />,
    },
    {
      title: "Long-Term Support",
      description: "Continue receiving guidance, resources, mentorship, and growth opportunities after your program.",
      icon: <Shield className="w-6 h-6 text-white" />,
    },
    {
      title: "Accountability & Discipline",
      description: "Stay committed to your goals through accountability systems, rituals, and structured participation.",
      icon: <Target className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="bg-[#F6E1FF] py-20 px-6 md:px-12 w-full min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header Section */}
        <h2 className="text-[#000000] text-2xl md:text-4xl font-bold mb-6">
          Why We Built The Community
        </h2>
        <p className="text-[#000000]/60 text-base md:text-lg max-w-4xl mx-auto mb-16 leading-relaxed">
          Product Management growth doesn't stop after a program ends. The ProductPointers Community exists to help alumni stay consistent, supported, connected, and continuously improving long after graduation.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[35px] p-8 flex flex-col items-start text-left shadow-sm h-full border border-purple-100/50"
            >
              {/* Icon Container with Shadow */}
              <div className="bg-[#6024D0] p-3 rounded-xl mb-8 shadow-[4px_4px_10px_rgba(96,36,208,0.3)]">
                {value.icon}
              </div>

              {/* Title */}
              <h3 className="text-[#000000] text-base font-bold mb-4 leading-tight">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-[#000000]/70 text-xs md:text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityValues;