import React from 'react';
import { User, Target, Zap } from 'lucide-react';

const SolutionSection = () => {
  const features = [
    { icon: <User size={18} />, text: "Your background" },
    { icon: <Target size={18} />, text: "Your goals" },
    { icon: <Zap size={18} />, text: "Your pace" },
  ];

  return (
    <section className="bg-[#6219D1] py-24 px-6 text-center font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <h2 className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4">
          What You Get
        </h2>
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
          Personalized 1:1 Coaching
        </h3>
        <p className="text-purple-100/80 text-base mb-12">
          Private sessions tailored to:
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {features.map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <div className="text-[#6219D1]">
                {item.icon}
              </div>
              <span className="text-gray-900 font-semibold text-sm md:text-base">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <p className="text-white text-lg md:text-xl font-medium italic opacity-90">
          You’re not following a <span className="line-through decoration-white/50 decoration-2">generic path</span>, 
          you’re following <span className="font-black uppercase tracking-wide">Your Path</span>
        </p>
      </div>
    </section>
  );
};

export default SolutionSection;