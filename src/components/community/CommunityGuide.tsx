import React from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CommunityGuide: React.FC = () => {
  const guidelines = [
    {
      number: "1",
      title: "Be Respectful & Kind",
      description:
        "Treat everyone with warmth and empathy. We're all here to grow together.",
      icon: "/images/love_icon.png", // Replace with your actual image filename
      position: "left",
    },
    {
      number: "2",
      title: "Give Before You Take",
      description:
        "Share your knowledge freely. Help others before asking for help.",
      icon: "/images/handsheart_icon.png", // Replace with your actual image filename
      position: "right",
    },
    {
      number: "3",
      title: "Keep It Safe & Professional",
      description:
        "Maintain confidentiality and professionalism in all interactions.",
      icon: "/images/shield_icon.png", // Replace with your actual image filename
      position: "left",
    },
    {
      number: "4",
      title: "Stay On Topic",
      description:
        "Keep discussions relevant to product management and professional growth.",
      icon: "/images/circle_icon.png", // Replace with your actual image filename
      position: "right",
    },
    {
      number: "5",
      title: "Ask Smart Questions",
      description:
        "Do your research first, then ask specific, thoughtful questions.",
      icon: "/images/light_icon.png", // Replace with your actual image filename
      position: "left",
    },
    {
      number: "6",
      title: "Engage Actively",
      description:
        "Engagement is compulsory, if defaulted 3 times you will be removed from the community.",
      icon: "/images/engage_icon.png", // Replace with your actual image filename
      position: "right",
    },
  ];

  return (
    <div
      className={`${montserrat.className} min-h-screen bg-[#FCF1FF] md:py-[100px] py-14 px-4 md:px-20`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <button className="rounded-[999px] bg-[linear-gradient(286deg,#5C1CC5_17.86%,#FAE2FF_123.95%)] text-white px-4 py-2 text-[16px] font-normal tracking-[0.4px] md:mb-14 mb-8 leading-6 transition-all duration-300 shadow-sm flex items-center gap-2 mx-auto">
            <Image
              src="/images/roll_icon.png"
              alt="Roll icon"
              width={16}
              height={16}
              className="rounded-full"
            />
            HOW WE ROLL
          </button>
          <h1 className="md:text-5xl text-2xl font-bold md:leading-[60px] text-[#15010D] md:mb-8 mb-4">
            Community Guidelines
          </h1>
          <p className="text-[#15010D] text-[12px] md:text-[20px] font-normal md:leading-7 mx-auto leading-5 w-[320px] md:w-full">
            Simple principles that keep our community warm, helpful, and
            thriving
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative hidden md:block ">
          {/* Vertical Center Line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-10 bottom-10 w-px hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, #FCF1FF 0%, #5C1CC5 4.02%, #5D20BF 9.8%, #5C1CC5 81.92%, #5C1CC5 90.5%, #FCF1FF 100%)",
            }}
          />
          {/* Guidelines */}
          <div className="space-y-0">
            {guidelines.map((guideline, index) => {
              const Icon = guideline.icon;
              const isLeft = guideline.position === "left";

              return (
                <div
                  key={index}
                  className="relative min-h-[280px] flex items-center group"
                >
                  {/* Content Container */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Left Side */}
                    {isLeft ? (
                      <>
                        <div className="md:pr-8">
                          <div
                            className="relative  backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow overflow-hidden w-full md:w-[500px] h-[390px] md:h-[220px]  border border-white z-10 group-hover:-translate-x-3"
                            style={{
                              background:
                                "linear-gradient(99deg, #FFF 0%, #FCF1FF 106.02%)",
                            }}
                          >
                            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#FAE1FF] rounded-full opacity-30 translate-x-[40%] -translate-y-[40%]" />
                            <div
                              className="absolute top-6 right-8 w-10 h-10  rounded-full flex items-center justify-center z-10"
                              style={{
                                backgroundColor: "rgba(92, 28, 197, 0.50)",
                              }}
                            >
                              <span className="text-[#FFFFFF] font-normal leading-6 text-[16px]">
                                {guideline.number}
                              </span>
                            </div>
                            <h2 className="text-[32px] font-medium leading-6 text-right pt-[50px]  text-[#15010D]  mb-6">
                              {guideline.title}
                            </h2>
                            <p className="text-[#15010D] text-[16px] text-right leading-[26px]">
                              {guideline.description}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:block"></div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block"></div>
                        <div className="md:pl-8">
                          <div
                            className="relative  backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow overflow-hidden w-full md:w-[500px] h-auto md:h-[220px]  border border-white z-10 group-hover:translate-x-3"
                            style={{
                              background:
                                "linear-gradient(99deg, #FFF 0%, #FCF1FF 106.02%)",
                            }}
                          >
                            <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[#FAE1FF] rounded-full opacity-30 -translate-x-[40%] -translate-y-[40%]" />
                            <div
                              className="absolute top-4 left-4 w-10 h-10  rounded-full flex items-center justify-center z-10"
                              style={{
                                backgroundColor: "rgba(92, 28, 197, 0.50)",
                              }}
                            >
                              <span className="text-[#FFFFFF] font-normal leading-6 text-[16px]">
                                {guideline.number}
                              </span>
                            </div>
                            <h2 className="text-[32px] font-medium leading-6 text-left pt-[50px]  text-[#15010D]  mb-6">
                              {guideline.title}
                            </h2>
                            <p className="text-[#15010D] text-[16px] text-left leading-[26px]">
                              {guideline.description}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Horizontal Connector Line */}
                  <div
                    className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 hidden md:block z-0 ${
                      isLeft
                        ? "right-1/2 left-[calc(40%-4rem)] "
                        : "left-1/2 right-[calc(40%-4rem)]"
                    }`}
                    style={{
                      background:
                        "linear-gradient(270deg, #FFF 0%, #5C1CC5 100%)",
                    }}
                  />

                  {/* Center Icon - Overlays the line */}
                  <div
                    className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
                      isLeft
                        ? "group-hover:-translate-x-3"
                        : "group-hover:translate-x-3"
                    }`}
                  >
                    <img
                      src={guideline.icon}
                      alt={guideline.title}
                      className="w-[70px] h-[70px]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6 md:hidden block">
          {guidelines.map((guideline, index) => (
            <div key={index} className="relative">
              {/* Card */}
              <div
                className="relative rounded-2xl p-10 border border-white shadow-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(99deg, #FFF 0%, #FCF1FF 106.02%)",
                }}
              >
                {/* Decorative Circle */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#FAE1FF] rounded-full opacity-30 translate-x-[40%] -translate-y-[40%]" />

                {/* Icon */}
                <img
                  src={guideline.icon}
                  alt={guideline.title}
                  className="w-[58px] h-[58px]"
                />

                {/* Number Badge */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center my-6"
                  style={{ backgroundColor: "rgba(92, 28, 197, 0.50)" }}
                >
                  <span className="text-white font-semibold text-lg">
                    {guideline.number}
                  </span>
                </div>

                {/* Content */}
                <h2 className="text-[32px] text-left font-medium text-[#15010D] mb-6">
                  {guideline.title}
                </h2>
                <p className="text-[#15010D] text-[16px] text-left leading-[26px]">
                  {guideline.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full py-3 px-4 md:mt-20 mt-14">
          <div
            className="bg-[#FAE1FF] py-2 px-4 w-full max-w-[480px] mx-auto rounded-full"
            style={{
              boxShadow: "0 2px 8px 4px rgba(20, 1, 49, 0.10)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-[#5C1CC5] fill-[#5C1CC5]" />
              <p className="text-[#5C1CC5] font-normal md:text-[16px] text-[14px] leading-6">
                These principles make our community special
              </p>
              <Heart className="md:w-4 md:h-4 h-3.5 w-3.5  text-[#5C1CC5] fill-[#5C1CC5]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommunityGuide;
