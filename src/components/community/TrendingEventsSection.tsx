import React from "react";
import { MessageCircle, Rocket, Target } from "lucide-react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TrendingEventsSection = () => {
  const discussions = [
    {
      replies: "45+",
      title:
        "If You Could Go Back to Day 1 of Your PM Journey, What Would You Do Differently?",
      description:
        "Community members are sharing their biggest lessons learned, from prioritizing stakeholder relationships earlier to investing more time in user research from day one. The insights are golden!",
      avatars: [
        "/images/poster1.png",
        "/images/poster2.png",
        "/images/poster3.png",
      ],
    },
    {
      replies: "45+",
      title: "Gen Z PM Job Description",
      description:
        "An eye-opening thread about how Gen Z is reshaping product management expectations from work-life balance to tech stack preferences and communication styles. Essential reading for hiring managers!",
      avatars: [
        "/images/poster1.png",
        "/images/poster2.png",
        "/images/poster3.png",
      ],
    },
  ];

  const events = [
    {
      status: "Upcoming",
      date: "Nov 15, 2025",
      time: "5:00 PM WAT",
      category: "PRODUCT PITCH DAY",
      categoryColor: "#7C3AED",
      title: "Team Prodexa Showcase",
      description:
        "Watch Team Prodexa present their innovative SaaS solution for remote team collaboration. Q&A session to follow!",
      attending: "11 attending",
      buttonText: "RSVP",
      buttonColor: "#7C3AED",
    },
    {
      status: "Upcoming",
      date: "Nov 20, 2025",
      time: "4:30 PM WAT",
      category: "PRODUCT PITCH DAY",
      categoryColor: "#7C3AED",
      title: "The PM Syndicate Pitch",
      description:
        "The PM Syndicate unveils their AI-powered product analytics platform. Join us for insights and live demo!",
      attending: "15 attending",
      buttonText: "RSVP",
      buttonColor: "#7C3AED",
    },
    {
      status: "Ongoing",
      date: "Every Friday",
      time: "7:00 PM WAT",
      category: "LEARNING CIRCLE",
      categoryColor: "#7C3AED",
      title: "Weekly Book Reading Sessions",
      description:
        'This week: "Inspired" by Marty Cagan. Join our community book club for deep discussions and takeaways.',
      attending: "21 attending",
      buttonText: "Join",
      buttonColor: "#7C3AED",
    },
  ];

  return (
    <div
      className={`${montserrat.className} "w-full bg-[#FCF1FF] md:pt-14  md:pb-[109px] pt-8 pb-22 px-4 md:px-20`}
    >
      <div className="">
        {/* Trending Discussions Section */}
        <div className="md:mb-[58px] mb-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle
              className="md:w-10 md:h-10 w-6 h-6 text-[#5C1CC5]"
              strokeWidth={1}
            />
            <h2 className="md:text-3xl text-[20px] font-medium text-[#15010D] leading-9">
              Trending Discussions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {discussions.map((discussion, index) => (
              <div
                key={index}
                className="bg-[#FFF] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                style={{
                  boxShadow: "0 2px 8px 4px rgba(20, 1, 49, 0.10)",
                }}
              >
                {/* Replies Badge */}
                <div className="flex items-center gap-4 mb-4">
                  <div className=" flex items-center justify-center">
                    <Image
                      src="/images/light1_icon.png"
                      alt="Roll icon"
                      width={58}
                      height={58}
                      className="block"
                    />
                  </div>
                  <span className="text-[#5C1CC5] font-normal text-[20px]  leading-4  ">
                    {discussion.replies} replies
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[20px] font-normal text-[#15010D] leading-7 mb-4 text-left">
                  {discussion.title}
                </h3>

                {/* Description */}
                <p className="text-[#15010D] md:text-[16px] text-[14px] leading-6 mb-4 text-left grow">
                  {discussion.description}
                </p>

                {/* Avatars */}
                <div className="flex -space-x-3 mb-6 items-center  mt-auto">
                  {discussion.avatars.map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar}
                      alt={`Participant ${idx + 1}`}
                      className=" object-contain"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-[#5C1CC5]  flex items-center justify-center">
                    <span className="text-white text-xs leading-4 font-normal">
                      +42
                    </span>
                  </div>
                </div>

                {/* Join Button */}
                <button className="w-full bg-[#5C1CC5] group hover:bg-[#370589] hover:border hover:scale-105 active:bg-[#FAE1FF] active:border active:border-[#5B1CC5] active:scale-100 active:text-[#5C1CC5] text-white py-2.5 px-7 rounded-full font-medium  transition-colors">
                  Join the conversions
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div>
          <div className="flex items-center md:gap-4 gap-2 mb-[34px]">
            <Rocket
              className="md:w-10 md:h-10 w-6 h-6 text-[#5C1CC5]"
              strokeWidth={2}
            />
            <h2 className="md:text-3xl text-2xl font-medium text-[#15010D] md:leading-9">
              Upcoming Events & Member Highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Status and Date */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-[12px] font-normal leading-4 ${
                      event.status === "Ongoing"
                        ? "text-[#DC2626]"
                        : "text-[#16A34A]"
                    }`}
                  >
                    {event.status}
                  </span>
                  <div className="flex gap-2 items-end">
                    <span className="text-[12px] leading-4 text-[#5C1CC5]">
                      {event.date}
                    </span>
                    <span className="text-[12px] leading-4 text-[#4A5565]">
                      {event.time}
                    </span>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center gap-2 mb-2">
                  <Target
                    className="md:w-4 md:h-4 w-6 h-6 text-[#5C1CC5]"
                    strokeWidth={2}
                  />
                  <span
                    className="text-xs leading-4 tracking-[0.3px] text-[#5C1CC5] font-normal uppercase"
                    style={{ color: event.categoryColor }}
                  >
                    {event.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-normal text-[#15010D] leading-7 mb-2">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-[#6D6D6D] text-sm leading-5 mb-4">
                  {event.description}
                </p>
                <div className="flex justify-between items-center ">
                  {/* Attending */}
                  <p className="text-sm text-[#6D6D6D] leading-5 mb-4">
                    {event.attending}
                  </p>

                  {/* RSVP/Join Button */}
                  <button className=" text-white py-2.5 rounded-sm px-7 group  cursor-pointer hover:bg-[#370589] hover:border  hover:scale-105 active:bg-[#FAE1FF] active:border active:border-[#5B1CC5] bg-[#5C1CC5] active:scale-100 active:text-[#5C1CC5] text-[18px] font-medium hover:opacity-90 transition-opacity">
                    {event.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingEventsSection;
