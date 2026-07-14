import React from "react";
import Image, { StaticImageData } from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import imgPPAP from "@/assets/images/count1.jpg";
import imgPPIP from "@/assets/images/count2.jpg";

interface UpcomingProgram {
  image: StaticImageData;
  title: string;
  description: string;
  startDate: string;
  location: string;
  availability: string;
  countdown: { days: string; hours: string; minutes: string };
}

const programs: UpcomingProgram[] = [
  {
    image: imgPPAP,
    title: "ProductPointers Accelerator Program (PPAP)",
    description:
      "A 12-week guided journey designed to take you from beginner to confident Product Manager step by step. Each phase builds on the previous one, so you're never lost or overwhelmed.",
    startDate: "Starts July 19, 2026",
    location: "Virtual",
    availability: "Limited spots Available",
    countdown: { days: "06", hours: "23", minutes: "39" },
  },
  {
    image: imgPPIP,
    title: "ProductPointers Internship Program (PPIP)",
    description:
      "A 12-week execution-focused internship where you move from learning about Product Management to building, launching, and documenting a real MVP you can showcase with confidence.",
    startDate: "Starts July 19, 2026",
    location: "Virtual",
    availability: "Limited spots Available",
    countdown: { days: "06", hours: "23", minutes: "39" },
  },
];

const TimeUnit: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-10 h-10 bg-gradient-to-b from-[#1E3A8A] to-[#0A1D56] rounded-lg flex items-center justify-center shadow-lg">
      <span className="text-white text-sm font-bold">{value}</span>
    </div>
    <span className="text-white text-[10px] mt-1 opacity-90">{label}</span>
  </div>
);

const ProgramCard: React.FC<{ program: UpcomingProgram }> = ({ program }) => (
  <div className="bg-[#FAE1FF] rounded-3xl p-4 md:p-5 flex flex-col">
    {/* Image with countdown overlay */}
    <div className="relative rounded-2xl overflow-hidden">
      <Image
        src={program.image}
        alt={program.title}
        className="w-full h-44 md:h-48 object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-3 flex items-start justify-center gap-2">
        <TimeUnit value={program.countdown.days} label="Days" />
        <span className="text-white font-bold text-sm mt-2.5">:</span>
        <TimeUnit value={program.countdown.hours} label="Hours" />
        <span className="text-white font-bold text-sm mt-2.5">:</span>
        <TimeUnit value={program.countdown.minutes} label="Minutes" />
      </div>
    </div>

    {/* Content */}
    <div className="px-2 pt-6 flex flex-col flex-grow">
      <h3 className="text-sm md:text-base font-bold text-[#1A1A1A] mb-3">
        {program.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600 mb-5">
        {program.description}
      </p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
          <span>{program.startDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
          <span>{program.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4 text-gray-500 shrink-0" />
          <span>{program.availability}</span>
        </div>
      </div>

      <button className="mt-auto bg-[#6024D0] hover:bg-[#4F1AB0] text-white font-semibold px-8 py-3 rounded-xl transition-colors cursor-pointer mx-auto">
        Save Your Spot
      </button>
    </div>
  </div>
);

const CountdownSection: React.FC = () => {
  return (
    <section className="bg-[#3B448F] w-full py-20 px-6 flex flex-col items-center text-white font-sans">
      {/* Header */}
      <div className="max-w-3xl text-center mb-14">
        <h2 className="text-xl md:text-3xl font-bold mb-6 tracking-tight">
          Upcoming Programs
        </h2>
        <p className="text-sm md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
          Don&apos;t miss out on these exclusive opportunities to accelerate your
          career. Limited spots available for maximum impact.
        </p>
      </div>

      {/* Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {programs.map((program, i) => (
          <ProgramCard key={i} program={program} />
        ))}
      </div>
    </section>
  );
};

export default CountdownSection;
