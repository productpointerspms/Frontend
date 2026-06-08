import React from 'react';
import { Shield, Layers, Sparkles, TrendingUp } from 'lucide-react';
import img from "@/assets/images/ppcpim2.png";
import img1 from "@/assets/images/ppcpim3.png";

const ProgramCriteria = () => {
  const criteria = [
    {
      icon: <Shield className="w-5 h-5 text-indigo-600" />,
      text: "You’re transitioning into Product Management from a non-technical background",
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      text: "You’ve tried learning on your own but feel stuck",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      text: "You want personalized guidance instead of generic content",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
      text: "You want someone to guide you step-by-step",
    },
  ];

  return (
    <div className="bg-[#6219D1] min-h-screen p-8 md:p-16 flex flex-col items-center font-sans">
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-12 text-center">
        This Program Is For You If...
      </h1>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
            <div className="bg-indigo-50 p-3 rounded-full">{criteria[0].icon}</div>
            <p className="text-gray-800 font-medium">{criteria[0].text}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
            <div className="bg-indigo-50 p-3 rounded-full">{criteria[1].icon}</div>
            <p className="text-gray-800 font-medium">{criteria[1].text}</p>
          </div>

          <div className="rounded-3xl overflow-hidden h-64 shadow-xl">
            <img
              src={img.src}
              alt="PM getting coached"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col">
          <div className="rounded-3xl overflow-hidden h-64 shadow-xl order-first md:order-none">
            <img
              src={img1.src}
              alt="Coaching discussion"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
            <div className="bg-indigo-50 p-3 rounded-full">{criteria[2].icon}</div>
            <p className="text-gray-800 font-medium">{criteria[2].text}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
            <div className="bg-indigo-50 p-3 rounded-full">{criteria[3].icon}</div>
            <p className="text-gray-800 font-medium">{criteria[3].text}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProgramCriteria;
