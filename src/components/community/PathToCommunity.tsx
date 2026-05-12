import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const PathToCommunity = () => {
  const programs = [
    {
      badge: "Beginner-Friendly Program",
      title: "PPAP",
      description:
        "Helps you go from zero knowledge to thinking like a Product Manager with structure, mentorship, and hands-on learning.",
    },
    {
      badge: "Job-Ready PM Program",
      title: "PPMP",
      description:
        "Helps you build real products, gain experience, and confidently apply for roles, with mentorship guiding every step.",
    },
    {
      badge: "Hands-On Internship Program",
      title: "PPIP",
      description:
        "Hands-on experience where you build and launch a real MVP, so you finally have proof you can do the work.",
    },
    {
      badge: "Personalized 1:1 Coaching",
      title: "PPCP",
      description:
        "Designed to take you from beginner to a confident, job-ready Product Manager, with direct guidance every step of the way.",
    },
    {
      badge: "Advanced PM Specialization",
      title: "PPTP",
      description:
        "Helps you specialize, deepen your expertise, and position yourself as a high-impact Product Manager in a competitive market.",
    },
  ];

  return (
    <div id="path-to-community" className={`${montserrat.className} scroll-mt-24 w-full bg-[#FCE7FF] py-20 px-6 md:px-20`}>
      <div className="max-w-7xl mx-auto text-center">
        {/* Top Pills */}
        <div className="inline-block border border-[#6024D0]/30 rounded-full px-6 py-2 mb-8 bg-white/50">
          <span className="text-[#6024D0] text-sm font-medium">Community Access Path</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl md:text-[45px] font-bold text-black mb-6">
          Your Path Into The Community
        </h2>
        <p className="text-[#000000]/60 text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
          Complete any ProductPointers program to unlock lifetime access to the 
          alumni community and accountability ecosystem.
        </p>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {programs.slice(0, 3).map((program, idx) => (
            <ProgramCard key={idx} {...program} />
          ))}
        </div>
        
        {/* Bottom Centered Row */}
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {programs.slice(3).map((program, idx) => (
            <div key={idx} className="w-full lg:w-1/3">
              <ProgramCard {...program} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProgramCard = ({ badge, title, description }: { badge: string; title: string; description: string }) => (
  <div className="bg-white rounded-[32px] p-10 text-left flex flex-col h-full shadow-sm">
    {/* Badge */}
    <div className="inline-block self-start border border-[#6024D0] rounded-full px-4 py-1 mb-8">
      <span className="text-[#6024D0] text-[12px] font-medium">{badge}</span>
    </div>

    {/* Purple Icon Box */}
    <div className="w-12 h-12 bg-[#6024D0] rounded-xl flex items-center justify-center mb-8">
      <Sparkles className="text-white w-6 h-6" />
    </div>

    {/* Content */}
    <h3 className="text-3xl font-bold text-black mb-6">{title}</h3>
    <p className="text-[#000000]/70 text-base leading-relaxed mb-8 grow">
      {description}
    </p>

    {/* Link */}
    <button className="flex items-center gap-2 text-[#6024D0] font-semibold hover:gap-4 transition-all cursor-pointer">
      View Program <ArrowRight size={18} />
    </button>
  </div>
);

export default PathToCommunity;