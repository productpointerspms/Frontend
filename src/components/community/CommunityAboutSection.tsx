import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CommunityAboutSection = () => {
  const features = [
    {
      iconSrc: "/images/learnIcon.png",
      title: "Learn",
      description:
        "We share knowledge freely, from tactical frameworks to strategic insights. Learning here feels human, not transactional.",
    },
    {
      iconSrc: "/images/supportIcon1.png",
      title: "Support",
      description:
        "We celebrate wins together and stay connected through the ups and downs. You're never alone in your product journey.",
    },
    {
      iconSrc: "/images/collaborateIcon.png",
      title: "Collaborate",
      description:
        "Real collaboration happens here from co-creating solutions to partnering on projects that matter.",
    },
    {
      iconSrc: "/images/growIcon.png",
      title: "Grow",
      description:
        "Growth feels inevitable here. Every conversation, every connection brings you one step closer to your goals.",
    },
  ];

  return (
    <div
      className={`${montserrat.className} min-h-screen bg-[linear-gradient(180deg,#FCF1FF_82.79%,#FAE1FF_132.83%)] py-16 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-[72px] mt-9">
          <button className="rounded-[999px] bg-[linear-gradient(286deg,#5C1CC5_17.86%,#FAE2FF_123.95%)] text-white px-4 py-2  text-[16px] font-normal tracking-[0.4px] mb-6 leading-6 transition-all duration-300 shadow-sm">
            WHAT WE'RE ABOUT
          </button>

          <h1 className="md:text-5xl text-2xl font-bold text-[#15010D] md:leading-[60px] leading-normal mb-8">
            More Than a Network, Your Support System
          </h1>

          <p className="md:text-[20px] text-[12px] text-[#15010D]  font-normal md:leading-7 leading-5 mx-auto">
            Whether you're navigating your first product role, scaling a team,
            or building something from scratch, you'll <br /> find people here
            who genuinely care about your success.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="group relative md:w-[560px] w-full rounded-2xl border border-white bg-[linear-gradient(99deg,#FFF_0%,#FCF1FF_106.02%)] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
              >
                {/* Decorative semi-circle on top right */}
                <div className="absolute md:-top-20 md:-right-20 md:w-[200px] md:h-[200px] -top-5 -right-5 w-50 h-50 bg-[#FAE1FF] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-linear-to-br from-[#FAE1FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <div className="w-[58px] h-[58px] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Image
                      src={feature.iconSrc}
                      alt={feature.title}
                      width={58}
                      height={58}
                      className="w-[58px] h-[58px]"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-[32px] font-medium text-[#15010D] mb-6 leading-6 group-hover:text-[#5C1CC5] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#15010D] leading-[26px] text-[16px] font-normal group-hover:translate-x-1 transition-transform duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative blob */}
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#FAE1FF] rounded-full opacity-20 blur-3xl group-hover:opacity-40 group-hover:scale-125 transition-all duration-700" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommunityAboutSection;