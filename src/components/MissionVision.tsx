import React from "react";
import Image from "next/image";

const MissionVision: React.FC = () => {
  return (
    <section className="w-full bg-[#FAE1FF] py-16 flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between items-start w-full gap-6 md:gap-8 px-4 md:px-6">

        {/* === Mission Card === */}
        <div className="flex flex-col items-start w-full md:w-1/2 gap-4 md:gap-8">
          <div className="w-16 h-16 bg-[#5C1CC5] rounded-2xl flex items-center justify-center">
            <Image
              src="/images/mission-icon.png"
              alt="Mission Icon"
              width={32}
              height={32}
              priority
            />
          </div>

          {/* Heading */}
          <h2 className="text-[#15010D] font-[Montserrat] font-bold text-[28px] sm:text-[32px] md:text-[40px] leading-[32.5px]">
            Our Mission
          </h2>

          {/* Description */}
          <p className="text-[#15010D] font-[Montserrat] font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-[32.5px]">
            To equip aspiring and entry-level product managers with the right skills, mentorship, and community support to thrive.
          </p>
        </div>

        {/* === Vision Card === */}
        <div className="flex flex-col items-start w-full md:w-1/2 gap-4 md:gap-8">
          <div className="w-16 h-16 bg-[#5C1CC5] rounded-2xl flex items-center justify-center">
            <Image
              src="/images/vision-icon.png"
              alt="Vision Icon"
              width={32}
              height={32}
              priority
            />
          </div>

          {/* Heading */}
          <h2 className="text-[#15010D] font-[Montserrat] font-bold text-[28px] sm:text-[32px] md:text-[40px] leading-[32.5px]">
            Our Vision
          </h2>

          {/* Description */}
          <p className="text-[#15010D] font-[Montserrat] font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-[32.5px]">
            To be the leading global platform where product managers and early-stage founders grow, thrive, and bring impactful products to life.
          </p>
        </div>

      </div>
    </section>
  );
};

export default MissionVision;
