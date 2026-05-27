"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { X } from "lucide-react";

import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function PMCoachingHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const programs = [
    {
      icon: "/images/accelerator_Icon.png",
      title: "Accelerator Program",
      description:
        "12-week intensive bootcamp designed to fast-track your product management career with hands-on projects and expert mentorship.",
    },
    {
      icon: "/images/mentor_Icon.png",
      title: "Mentorship Program",
      description:
        "Work 1-on-1 with experienced PMs from top companies. Get personalized guidance, portfolio reviews, and career coaching.",
    },
    {
      icon: "/images/coaching_icon.png",
      title: "1:1 Coaching",
      description:
        "Personalized product management coaching focused on your specific goals, challenges, and career advancement.",
    },
  ];

  return (
    <>
      <section
        className={`${montserrat.className} relative min-h-screen bg-[linear-gradient(172deg,#9171BB_8.6%,#5C1CC5_46.62%,#7B45D4_93.64%)] overflow-hidden md:pb-[180px] pb-[300px]`}
      >
        {/* Floating Profile Images */}
        <div className="absolute md:top-26 top-24 md:left-16 left-6 w-[134px] h-[134px] rounded-[134px] overflow-hidden animate-[fadeInOut_4s_ease-in-out_infinite]">
          <img
            src="/images/pmIcon1.png"
            alt="Product Manager"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute bottom-120 md:block hidden left-24 w-[83px] h-[83px] rounded-[83px] overflow-hidden animate-[fadeInOut_4s_ease-in-out_infinite] [animation-delay:1s] ">
          <img
            src="/images/pmIcon2.png"
            alt="Product Manager"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute md:top-100 hidden md:block right-24 w-[83px] h-[83px] rounded-[83px] overflow-hidden animate-[fadeInOut_4s_ease-in-out_infinite] [animation-delay:2s]">
          <img
            src="/images/pmIcon2.png"
            alt="Product Manager"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute  bottom-24 block md:hidden right-12 w-[83px] h-[83px] rounded-[83px] overflow-hidden">
          <img
            src="/images/pmIcon2.png"
            alt="Product Manager"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-[100px]">
          <div className="max-w-4xl mx-auto text-center">
            {/* Heading */}
            <h1 className="text-[32px] md:text-[72px] hidden md:block lg:text-7xl font-bold text-white mb-[35px] md:leading-[90px] pt-50 md:pt-0">
              Be Part of the Next Generation of <br /> Product Leaders
            </h1>
            <h1 className="text-[32px] md:hidden block mx-auto  font-bold text-white mb-[35px] md:leading-[90px] pt-50 md:pt-0">
              Be Part of the Next Generation of Product Leaders
            </h1>

            {/* Subheading */}
            <p className="text-sm md:text-2xl  text-white/90 mb-2 md:w-[670px] w-[343px] mx-auto leading-5 md:leading-[39px]">
              Join 500+ professionals who've transformed their careers with
              ProductPointers. Your journey to product leadership starts here.
            </p>

            {/* Benefits List */}
            <ul className="text-white/80 md:text-base text-[12px] font-normal leading-6 mb-12 space-y-3 max-w-2xl mx-auto">
              <li className="flex items-center justify-center gap-3">
                <span className="w-2 h-2 bg-[#000000] rounded-full"></span>
                <span>Expert mentorship from industry leaders</span>
              </li>
              <li className="flex items-center justify-center gap-3">
                <span className="w-2 h-2 bg-[#000000] rounded-full"></span>
                <span>Practical skills that delivers immediate impact</span>
              </li>
              <li className="flex items-center justify-center gap-3">
                <span className="w-2 h-2 bg-[#000000] rounded-full"></span>
                <span>Lifetime access to our global community</span>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#FAE1FF] text-[#5B1CC5] border border-[#5B1CC5] hover:bg-[#5C1CC5] hover:text-white hover:border hover:border-white cursor-pointer font-medium px-7 py-2.5 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                Apply Now
              </button>
              <div className="text-left text-white/80">
                <p className="font-bold text-sm leading-5">
                  Next cohort starts January 16, 2026
                </p>
                <p className="text-sm font-normal leading-5 text-white/80">
                  Limited to 20 participants
                </p>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-white/60 text-sm font-normal leading-5">
              🔒 Application review within 48 hours • 💰 Payment plans available
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={`${montserrat.className} fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50`}
        >
          <div className="bg-white rounded-3xl md:w-[880px] w-full max-h-[90vh] overflow-y-auto shadow-sm">
            {/* Header with Purple Gradient */}
            <div
              className="relative px-8 py-10 text-center rounded-t-3xl"
              style={{
                background:
                  "linear-gradient(180deg, #5C1CC5 0%, #2C0E5F 76.23%)",
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 bg-white hover:bg-white/30  rounded-full p-2 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6 text-black" strokeWidth={0.781} />
              </button>
              <h2 className="text-4xl md:text-[40px]  leading-[37.5px] font-medium text-center text-white mb-3">
                Choose Your Program
              </h2>
              <p className="text-[15px] font-normal leading-[25px] text-white/90">
                Select the program that best fits your goals and career stage
              </p>
            </div>

            {/* Program Cards with Gray Background */}
            <div className="px-4 py-11 bg-gray-50">
              <div className="grid md:grid-cols-3 gap-3.5">
                {programs.map((program, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-[18px] shadow-sm md:w-[260px] w-full h-80 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform"
                  >
                    <div className="  w-11 h-11 rounded-xl flex items-center justify-center mb-[18px] overflow-hidden relative">
                      <Image
                        src={program.icon}
                        alt={program.title}
                        width={44}
                        height={44}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-[18px] font-semibold leading-[25px] text-[#15010D] mb-[18px]">
                      {program.title}
                    </h3>
                    <p className="text-[#6D6D6D] mb-6 md:w-40 w-full leading-[20.3px] text-[12px] font-normal">
                      {program.description}
                    </p>
                    <button className="w-[196px] bg-[#5C1CC5] hover:bg-white hover:border hover:border-[#5C1CC5] cursor-pointer text-white text-[13px] font-medium py-2 px-6 rounded-lg hover:text-[#5C1CC5] transition-colors duration-300">
                      Apply now
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center mt-10">
                <p className="text-[#15010D] text-[12px] font-normal leading[15.6px]">
                  Not sure which program is right for you?{" "}
                  <a
                    href="#"
                    className="text-[#5C1CC5] hover:text-purple-700 text-[12px] leading[15.6px] font-normal"
                  >
                    Schedule a free consultation
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}