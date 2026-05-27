import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import img1 from "@/assets/images/diff1.png"
import img2 from "@/assets/images/diff2.png"
import img3 from "@/assets/images/diff3.png"
import img4 from "@/assets/images/diff4.png"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface DifferenceCard {
  image: string;
  title: string;
  description: string;
}

const differences: DifferenceCard[] = [
  {
    image: img1.src, // Replace with your actual image path
    title: "Structured Mentorship",
    description: "Get guided by experienced product professionals who show you exactly what to do step by step.",
  },
  {
    image: img2.src, // Replace with your actual image path
    title: "Hands-On Product Building",
    description: "Stop learning passively. Start building real products you can actually show.",
  },
  {
    image: img3.src, // Replace with your actual image path
    title: "Internship Experience",
    description: "Gain real-world experience working on actual product problems not just case studies.",
  },
  {
    image: img4.src, // Replace with your actual image path
    title: "Career Readiness Support",
    description: "Get prepared to apply, interview, and stand out with confidence.",
  },
];

const WhatMakesUsDifferent: React.FC = () => {
  return (
    <section className={`${montserrat.className} py-20 my-20 bg-[#5C1CC5] w-full text-white`}>
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold mb-4">
            What Makes ProductPointers Different
          </h2>
          <p className="text-[18px] md:text-[20px] opacity-90 max-w-[800px] mx-auto leading-relaxed">
            We don't just teach concepts. We guide you through real execution, real experience, and real outcomes.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differences.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-[24px] overflow-hidden p-4 flex flex-col h-full shadow-lg"
            >
              {/* Image Container with Rounded Corners */}
              <div className="relative w-full h-[180px] mb-6 rounded-[16px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="px-2 pb-4">
                <h3 className="text-[#15010D] text-[18px] font-bold mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#4A5565] text-[14px] leading-[22px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsDifferent;