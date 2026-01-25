import React from "react";

import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CommunityPeep = () => {
  const awards = [
    {
      name: "Mercy Adeniyi",
      avatar: "/images/mercyA.png",
      badge: "Outstanding PM of the Month",
      badgeIcon: "/images/badge_icon.png",
      description:
        "Recognized for exceptional leadership in mentoring 15+ junior PMs and delivering a high-impact product launch that increased user engagement by 40%.",
    },
    {
      name: "Dum Vick",
      avatar: "/images/dum.png",
      badge: "Consistency Milestone",
      badgeIcon: "/images/badge_icon.png",
      description:
        "Honored for 6 months of consistent participation, contributing valuable insights in discussions, and helping over 20 community members solve product challenges.",
    },
  ];

  const awardImages = [
    {
      src: "/images/mercyAward.png",
      mobileSrc: "/images/mercyAwardMobile.png",
      alt: "Mercy Adeniyi - Most Outstanding Product Manager - 3rd Quarter 2025",
    },
    {
      src: "/images/mercyAward1.png",
      mobileSrc: "/images/mercyAwardMobile1.png",
      alt: "Mercy Adeniyi - Most Outstanding Product Manager - Congratulations",
    },
    {
      src: "/images/dumAward.png",
      mobileSrc: "/images/dumAwardMobile.png",
      alt: "Dum Vick - Most Outstanding Product Manager - 3rd Quarter 2025",
    },
    {
      src: "/images/dumAward1.png",
      mobileSrc: "/images/dumAwardMobile1.png",
      alt: "Dum Vick - Most Outstanding Product Manager - Congratulations",
    },
  ];

  return (
    <div
      className={`${montserrat.className} min-h-screen bg-[#FCF1FF] md:pt-16 pt-14  px-4 md:px-20`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <button className="rounded-[999px] bg-[linear-gradient(286deg,#5C1CC5_17.86%,#FAE2FF_123.95%)] text-white px-4 py-2 text-[16px] font-normal tracking-[0.4px] md:mb-14 mb-8 leading-6 transition-all duration-300 shadow-sm flex items-center gap-2 mx-auto">
            <Image
              src="/images/roll_icon.png"
              alt="Roll icon"
              width={16}
              height={16}
              className="rounded-full"
            />
            See What's Happening
          </button>

          <h1 className="text-[24px] md:text-5xl font-bold text-[#15010D] mb-8">
            A Peep into the Community
          </h1>

          <p className="text-[#15010D] md:text-[20px] text-[12px]  md:mb-[100px] mb-8 text-center leading-5 md:leading-7">
            A vibrant snapshot of awards, discussions, and events that bring
            The-Global'PM Community to life
          </p>
        </div>

        {/* Awards Section */}
        <div
          className="rounded-3xl px-8 py-8 md:py-14 md:px-[77px]"
          style={{
            background: "linear-gradient(153deg, #FAE1FF 41.24%, #FFF 97.75%)",
          }}
        >
          {/* Section Header */}
          <div className="flex items-center justify-center md:justify-start md:gap-6 gap-2 md:mb-[43px] mb-6 ">
            <Image
              src="/images/award_icon.png"
              alt="Roll icon"
              width={58}
              height={58}
              className="hidden md:block"
            />
            <Image
              src="/images/award_icon.png"
              alt="Roll icon"
              width={40}
              height={40}
              className="md:hidden block"
            />
            <h2 className="md:text-[30px] text-[20px] font-medium text-[#15010D]">
              Awards & Recognition
            </h2>
          </div>

          {/* Description */}
          <p className="text-[#15010D] mb-8 md:leading-7 leading-5 md:text-[16px] text-[14px] font-normal mx-auto md:mx-0 text-center md:text-left">
            At The-Global'PM Community, we celebrate consistency, excellence,
            and growth. Every month, we recognize outstanding contributions
            through awards like;{" "}
            <span className="text-[#5C1CC5] md:leading-7 leading-5 md:text-[16px] text-[14px] font-normal">
              Outstanding PM of the Month
            </span>
            ,{" "}
            <span className="text-[#5C1CC5] md:leading-7 leading-5 md:text-[16px] text-[14px] font-normal">
              Team of the Month
            </span>{" "}
            and{" "}
            <span className="text-[#5C1CC5] md:leading-7 leading-5 md:text-[16px] text-[14px] font-normal">
              Consistency Milestones
            </span>
            .
          </p>

          {/* Award Cards */}
          <div className="grid md:grid-cols-2 gap-8 md:mb-10 mb-8">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-[#FCF1FF] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                style={{
                  boxShadow: "0 2px 8px 4px rgba(20, 1, 49, 0.10)",
                }}
              >
                {/* Profile */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={award.avatar}
                    alt={award.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium leading-7 text-[#14010D] text-lg mb-2">
                      {award.name}
                    </h3>
                    <div className="inline-flex items-center gap-1 bg-[linear-gradient(286deg,#5C1CC5_17.86%,#FAE2FF_123.95%)] text-white px-4 py-2 rounded-full ">
                      <img
                        src={award.badgeIcon}
                        alt={award.name}
                        className="w-2.5 h-2.5"
                      />
                      <span className="text-[12px] leading-4 font-normal">
                        {award.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#15010D] leading-5 text-[14px] font-normal">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1  md:grid-cols-4 gap-6 mb-6">
            {awardImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-3/4  overflow-hidden  transition-shadow duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover md:block hidden"
                />
                <img
                  src={image.mobileSrc}
                  alt={image.alt}
                  className="w-full h-auto block md:hidden"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-[#5C1CC5] font-normal text-base leading-5 md:text-[14px] italic">
              Check out our recent award winners
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPeep;