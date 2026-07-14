import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import img from "@/assets/images/what.png";

const WhatDrivesUs: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-[#FCF1FF]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT TEXT SECTION */}
        <div>
          <h2
            className="
    text-[21px] md:text-3xl
    font-bold font-montserrat
    text-[#15010D]
    capitalize
    mb-6
  "
          >
            What Drives Us
          </h2>

          <p className="text-gray-700 mb-5 leading-relaxed font-montserrat">
            Great products don’t happen by accident, they’re built by people who are guided, supported, and continuously mentored,
            That’s why ProductPointers exists: to equip aspiring and growing product managers in Nigeria and around the world with structured mentorship, practical training, and a strong professional community that accelerates real careers.
          </p>

          <p className="text-gray-700 leading-relaxed mb-8 font-montserrat leading-['36px]">
            We’re driven by the transformation we see every day, beginners breaking into tech, entry-level PMs gaining direction, and professionals growing into confident product leaders. Every program, coaching session, and internship we design is built around hands-on experience, advanced PM skills, and mentorship that prepares you to compete in the global product space.
            We’re not just teaching product management.
            We’re mentoring the next generation of product leaders.
          </p>

          {/* Tag with Icon */}
          <div className="flex items-center gap-3 mt-4">
            <div className="bg-purple-600 text-white p-1 rounded-full">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-gray-900 font-medium font-montserrat">
              Empowering the next generation of product leaders
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative w-full h-[400px] md:h-[460px]">
          <Image
            src={img}
            alt="Team collaboration"
            fill
            className="object-cover rounded-2xl"
          />

          {/* Floating Card */}
          <div className="absolute bottom-5 left-5 bg-purple-700 text-white px-6 py-4 rounded-xl shadow-lg">
            <h4 className="font-semibold text-base font-montserrat">
              Mission-Driven
            </h4>
            <p className="text-xs text-gray-200 font-montserrat">
              Building tomorrow&apos;s leaders
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatDrivesUs;
