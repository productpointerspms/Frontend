"use client";

import React from "react";
import { Users, UserCheck, Globe, GraduationCap } from "lucide-react";
import { useProgramStats } from "@/lib/useProgramStats";

const StatsSection: React.FC = () => {
  const liveStats = useProgramStats();

  const stats = [
    {
      icon: <Users className="text-purple-600 font-montserrat " size={24} />,
      value: liveStats.professionalsTrained,
      label: "Professionals Trained",
    },
    {
      icon: <UserCheck className="text-purple-600 font-montserrat " size={24} />,
      value: liveStats.expertMentors,
      label: "Expert Mentors",
    },
    {
      icon: <Globe className="text-purple-600 font-montserrat " size={24} />,
      value: liveStats.countriesReached,
      label: "Countries Reached",
    },
    {
      icon: <GraduationCap className="text-purple-600 font-montserrat " size={24} />,
      value: liveStats.careerAdvancementRate,
      label: "Career Advancement Rate",
    },
  ];

  return (
    <section className="bg-[#FAE1FF] py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Icon */}
            <div className="bg-white shadow-md w-12 h-12 flex items-center justify-center rounded-full mb-5">
              {stat.icon}
            </div>

            {/* Value */}
            <h3 className="text-3xl font-bold text-purple-700 mb-1">
              {stat.value}
            </h3>

            {/* Label */}
            <p className="text-gray-800 font-medium">{stat.label}</p>

            {/* Underline */}
            <div className="w-12 h-[2px] bg-black mt-2 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
