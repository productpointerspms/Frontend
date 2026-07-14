import React from 'react';
import { Sparkles, Code, TrendingUp, Check } from 'lucide-react';

export const SpecializationPath = () => {
  const tracks = [
    {
      title: "AI Product Management",
      icon: <Sparkles className="text-white" />,
      features: ["Build and manage AI-driven products", "Understand how to integrate AI into real product workflows"],
      footer: "Best for PMs entering the AI space"
    },
    {
      title: "Technical Product Management",
      icon: <Code className="text-white" />,
      features: ["Work closely with engineering teams", "Understand systems, APIs, and technical decision-making"],
      footer: "Best for PMs working with technical teams"
    },
    {
      title: "Growth Product Management",
      icon: <TrendingUp className="text-white" />,
      features: ["Learn how to scale products effectively", "Focus on user acquisition, retention, and product growth"],
      footer: "Best for PMs focused on business impact"
    }
  ];

  return (
    <section className="bg-[#FDF2FF] py-20 px-6 font-montserrat">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-black">Choose Your Specialization Path</h2>
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto">Choose the specialization that aligns with your strengths, interests, and the kind of Product Manager you want to become.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tracks.map((track, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] text-left border border-gray-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-[#6024D0] rounded-xl flex items-center justify-center mb-6">{track.icon}</div>
              <h3 className="text-xl font-bold text-black mb-6">{track.title}</h3>
              <div className="space-y-4 mb-8 flex-grow">
                {track.features.map((f, j) => (
                  <div key={j} className="flex gap-3 items-start">
                    <Check size={18} className="text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-[#101828] font-medium leading-tight">{f}</p>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-gray-100">
                <p className="text-gray-500 text-xs mb-4">{track.footer}</p>
                <button className="text-[#6024D0] font-bold flex items-center gap-2 hover:underline">
                  Apply for this Track →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};