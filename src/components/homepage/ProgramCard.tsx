import React from "react";
import Image, { StaticImageData } from "next/image";
import img from "@/assets/images/pro.png";
import img2 from "@/assets/images/pro1.png";

interface ProgramCardProps {
  image: string | StaticImageData; // accept both imported images and string URLs
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  title: string;
  description: string;
  startDate: string;
  spots: number | string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  image,
  days,
  hours,
  minutes,
  seconds,
  title,
  description,
  startDate,
  spots,
}) => {
  return (
    <div className="bg-[#FCF1FF] rounded-3xl shadow-xl overflow-hidden border border-gray-200 w-full max-w-[480px]">
      {/* Image Header */}
      <div className="relative h-64 w-full">
        {/* Use next/image for imported/static images */}
        <Image src={image} alt={title} fill className="object-cover" priority />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-700/60 to-transparent pointer-events-none" />

        {/* Countdown */}
        <div className="absolute bottom-4 left-4 flex gap-3">
          {[
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Minutes", value: minutes },
            { label: "Seconds", value: seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/25 backdrop-blur-md px-4 py-2 rounded-xl text-white text-center"
            >
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-xs font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <h2 className="font-bold text-xl text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Details */}
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span>📅</span> Starts {startDate}
          </div>
          <div className="flex items-center gap-2">
            <span>🌐</span> Virtual
          </div>
          <div className="flex items-center gap-2">
            <span>👥</span> {spots} spots remaining
          </div>
        </div>

        <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
          Save Your Spot
        </button>
      </div>
    </div>
  );
};

export default function UpcomingPrograms() {
  return (
    <div className=" mx-auto py-12 px-4 bg-[#FCF1FF] ">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2
          className="
    text-[24px] md:text-4xl
    font-bold font-montserrat
    text-[#15010D]
    text-center
    capitalize
    mb-4
  "
        >
          Upcoming Programs
        </h2>

        <p
          className="
    text-center
    text-[12px] md:text-[20px]
    font-montserrat
    font-normal
    leading-[20px] md:leading-[36px]
    text-[#15010D]
  "
        >
          Secure your spot in our next cohort of world-class product programs.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center">
        <ProgramCard
          image={img}
          days={89}
          hours={6}
          minutes={27}
          seconds={44}
          title="ProductPointers Accelerator Program (PPAP)"
          description="Intensive 12-week program covering strategy, user research, and execution. Limited to 25 participants for personalized attention."
          startDate="Jan 19, 2026"
          spots={15}
        />

        <ProgramCard
          image={img2}
          days={86}
          hours={6}
          minutes={27}
          seconds={44}
          title="ProductPointers Mentorship Program (PPMP)"
          description="Intensive 10-week mentorship program focused on design growth, portfolio building, and real-world projects."
          startDate="Jan 16, 2026"
          spots={10}
        />
      </div>
    </div>
  );
}
