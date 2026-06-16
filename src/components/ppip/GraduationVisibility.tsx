import React from "react";
import { Montserrat } from "next/font/google";
import { Video, Users, Globe, Mail, Star, type LucideIcon } from "lucide-react";
import img from "@/assets/images/graduation.png";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type Pill = { icon: LucideIcon; label: string };

const pills: Pill[] = [
  { icon: Video, label: "ProductPointers Demo Day" },
  { icon: Users, label: "Recruiter Showcase Events" },
  { icon: Globe, label: "Talent Directory" },
  { icon: Mail, label: "Talent Reports Sent To Employers" },
  { icon: Star, label: "Community Spotlights" },
];

const GraduationVisibility: React.FC = () => {
  return (
    <section className={`${montserrat.className} bg-[#5C1CC5] py-20 px-6 md:px-12 lg:px-24`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Your Work Doesn&apos;t End At Graduation
          </h2>
          <p className="text-white/80 mb-8 mt-4">
            Top apprentices gain visibility through:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pills.map((pill) => {
              const Icon = pill.icon;
              return (
                <div
                  key={pill.label}
                  className="bg-white rounded-lg px-4 py-3 flex items-center gap-2.5 shadow-sm"
                >
                  <Icon className="w-4 h-4 text-[#6024D0] shrink-0" />
                  <span className="text-sm font-medium text-[#1a1a1a]">
                    {pill.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right image */}
        <div>
          <img
            src={img.src}
            alt="Professionals reviewing product analytics together"
            className="rounded-3xl shadow-lg aspect-[4/3] object-cover w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default GraduationVisibility;
