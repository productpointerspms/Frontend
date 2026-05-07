import Image from "next/image";
import { ArrowRight } from "lucide-react";
// Assuming these are your updated image paths
import imgMentorship from "@/assets/images/choose1.png";
import imgBuilding from "@/assets/images/choose.png";
import imgInternship from "@/assets/images/choose2.png";
import imgCareer from "@/assets/images/choose1.png";

const WhyChooseProductPointers = () => {
  const cards = [
    {
      image: imgMentorship,
      title: "Structured Mentorship",
      description: "Get guided by experienced product professionals who show you exactly what to do step by step.",
    },
    {
      image: imgBuilding,
      title: "Hands-On Product Building",
      description: "Stop learning passively. Start building real products you can actually show.",
    },
    {
      image: imgInternship,
      title: "Internship Experience",
      description: "Gain real-world experience working on actual product problems not just case studies.",
    },
    {
      image: imgCareer,
      title: "Career Readiness Support",
      description: "Get prepared to apply, interview, and stand out with confidence.",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center px-6 md:px-10 py-24 mx-auto bg-[#F9F5FF]">
      {/* Header Section */}
      <div className="text-center max-w-4xl mb-16">
        <h3 className="text-[#1A1A1A] font-semibold text-lg md:text-2xl mb-2">
          We Don’t Just Teach Product Management...
        </h3>
        <h2 className="text-[#1A1A1A] font-extrabold text-3xl md:text-5xl mb-6">
          We Guide You Through Becoming One
        </h2>
        <p className="text-gray-500 font-medium text-base md:text-xl flex items-center justify-center gap-2">
          Everything you need to go from confused and stuck 
          <ArrowRight className="text-[#5C1CC5] w-5 h-5" /> 
          confident and job-ready
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mb-16">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-[24px] shadow-sm flex flex-col items-start transition-transform hover:scale-[1.02]"
          >
            <div className="relative w-full h-48 mb-6 overflow-hidden rounded-[18px]">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-[#1A1A1A] font-bold text-lg mb-3 px-2">
              {card.title}
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed px-2 mb-4">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button className="bg-[#5C1CC5] hover:bg-[#4a15a0] text-white font-semibold py-4 px-8 rounded-xl flex items-center gap-2 transition-colors">
        See How the Program Works
        <ArrowRight size={20} />
      </button>
    </section>
  );
};

export default WhyChooseProductPointers;