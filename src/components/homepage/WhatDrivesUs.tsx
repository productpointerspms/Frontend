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
    text-[24px] md:text-4xl
    font-bold font-[montserrat]
    text-[#15010D]
    capitalize
    mb-6
  "
          >
            What Drives Us
          </h2>

          <p className="text-gray-700 mb-5 leading-relaxed font-[montserrat]">
            We believe great products don't just happen—they're built by people
            who are equipped, supported, and inspired. That’s why
            <span className="text-purple-700 font-semibold">
              {" "}
              ProductPointers
            </span>{" "}
            exist: to give aspiring and practicing product managers in Nigeria
            and beyond the training, mentorship, and community they need to
            thrive.
          </p>

          <p className="text-gray-700 leading-relaxed mb-8 font-[montserrat] leading-['36px]">
            Our drive comes from seeing product professionals unlock new
            opportunities, land entry-level roles, and grow into confident
            leaders who shape products that matter. Every program, coaching
            session, and community connection we create is designed to deliver
            hands-on training, practical PM skills, and mentorship that prepares
            you for success in the global product space.
          </p>

          {/* Tag with Icon */}
          <div className="flex items-center gap-3 mt-4">
            <div className="bg-purple-600 text-white p-1 rounded-full">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-gray-900 font-medium font-[montserrat]">
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
            <h4 className="font-semibold text-lg font-[montserrat]">
              Mission-Driven
            </h4>
            <p className="text-sm text-gray-200 font-[montserrat]">
              Building tomorrow&apos;s leaders
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatDrivesUs;
