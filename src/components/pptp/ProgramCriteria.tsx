import React from 'react';
import { Shield, Layers, Sparkles, TrendingUp } from 'lucide-react';
import img from "@/assets/images/pptpimg3.png"
import img1 from "@/assets/images/pptpimg4.png"

const ProgramCriteria = () => {
  const criteria = [
    {
      icon: <Shield className="w-5 h-5 text-indigo-600" />,
      text: "You have at least 1 year of Product Management experience",
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      text: "You understand the basics but want to go deeper",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      text: "You want to specialize and stand out",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
      text: "You're ready to grow into higher-impact roles",
    },
  ];

  return (
    <div className="bg-[#2D3E8B] min-h-screen p-8 md:p-16 flex flex-col items-center font-sans">
      {/* Heading */}
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-12">
        This Program Is For You If...
      </h1>

      {/* Grid Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
            <div className="bg-indigo-50 p-3 rounded-full">{criteria[0].icon}</div>
            <p className="text-gray-800 font-medium">{criteria[0].text}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
            <div className="bg-indigo-50 p-3 rounded-full">{criteria[1].icon}</div>
            <p className="text-gray-800 font-medium">{criteria[1].text}</p>
          </div>

          {/* Image 1 (Bottom Left) */}
          <div className="rounded-3xl overflow-hidden h-64 shadow-xl">
            <img 
              src={img.src}
              alt="Person working on laptop" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col">
          {/* Image 2 (Top Right) */}
          <div className="rounded-3xl overflow-hidden h-64 shadow-xl order-first md:order-none">
            <img 
              src={img1.src}
              alt="Team discussion" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
            <div className="bg-indigo-50 p-3 rounded-full">{criteria[2].icon}</div>
            <p className="text-gray-800 font-medium">{criteria[2].text}</p>
          </div>

          {/* Card 4 */}
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