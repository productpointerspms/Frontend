"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import imgPPAP from "@/assets/images/count1.jpg";
import imgPPIP from "@/assets/images/count2.jpg";
import { getProgramByCode } from "@/lib/programs";
import { useCountdownTo } from "@/lib/useCountdownTo";

interface UpcomingProgram {
  code: "PPAP" | "PPIP";
  image: StaticImageData;
  title: string;
  description: string;
  location: string;
  availability: string;
  href: string;
}

const programs: UpcomingProgram[] = [
  {
    code: "PPAP",
    image: imgPPAP,
    title: "ProductPointers Accelerator Program (PPAP)",
    description:
      "A 12-week guided journey designed to take you from beginner to confident Product Manager step by step. Each phase builds on the previous one, so you're never lost or overwhelmed.",
    location: "Virtual",
    availability: "Limited spots Available",
    href: "/ppap",
  },
  {
    code: "PPIP",
    image: imgPPIP,
    title: "ProductPointers Internship Program (PPIP)",
    description:
      "A 12-week execution-focused internship where you move from learning about Product Management to building, launching, and documenting a real MVP you can showcase with confidence.",
    location: "Virtual",
    availability: "Limited spots Available",
    href: "/ppip",
  },
];

function formatStartDate(startTime: Date | null): string {
  if (!startTime) return "Start date coming soon";
  return `Starts ${startTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;
}

const TimeUnit: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-10 h-10 bg-gradient-to-b from-[#1E3A8A] to-[#0A1D56] rounded-lg flex items-center justify-center shadow-lg">
      <span className="text-white text-sm font-bold">{value}</span>
    </div>
    <span className="text-white text-[10px] mt-1 opacity-90">{label}</span>
  </div>
);

const ProgramCard: React.FC<{ program: UpcomingProgram }> = ({ program }) => {
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    getProgramByCode(program.code)
      .then((p) => {
        if (cancelled || !p.startTime) return;
        const parsed = new Date(p.startTime);
        if (!Number.isNaN(parsed.getTime())) setStartTime(parsed);
      })
      .catch(() => {
        // Keep the card without a live date rather than breaking the section.
      });
    return () => {
      cancelled = true;
    };
  }, [program.code]);

  const countdown = useCountdownTo(startTime);
  const hasStarted = startTime != null && startTime.getTime() <= Date.now();

  return (
    <div className="bg-[#FAE1FF] rounded-3xl p-4 md:p-5 flex flex-col">
      {/* Image with countdown overlay */}
      <div className="relative rounded-2xl overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          className="w-full h-44 md:h-48 object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        {startTime && !hasStarted && (
          <div className="absolute inset-x-0 bottom-3 flex items-start justify-center gap-2">
            <TimeUnit value={countdown.days} label="Days" />
            <span className="text-white font-bold text-sm mt-2.5">:</span>
            <TimeUnit value={countdown.hours} label="Hours" />
            <span className="text-white font-bold text-sm mt-2.5">:</span>
            <TimeUnit value={countdown.minutes} label="Minutes" />
          </div>
        )}
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
            <span>{formatStartDate(startTime)}</span>
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

        <Link
          href={program.href}
          className="mt-auto bg-[#6024D0] hover:bg-[#4F1AB0] text-white font-semibold px-8 py-3 rounded-xl transition-colors cursor-pointer mx-auto"
        >
          Save Your Spot
        </Link>
      </div>
    </div>
  );
};

const CountdownSection: React.FC = () => {
  return (
    <section id="upcoming-programs" className="bg-[#3B448F] w-full py-20 px-6 flex flex-col items-center text-white font-sans scroll-mt-10">
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
        {programs.map((program) => (
          <ProgramCard key={program.code} program={program} />
        ))}
      </div>
    </section>
  );
};

export default CountdownSection;
