"use client";

import React from "react";
import Image from "next/image";
import { Globe, Quote, TrendingUp, Heart } from "lucide-react";

interface StatItem {
  icon: React.ReactElement;
  stat: string;
  text: string;
}

const stats: StatItem[] = [
  {
    icon: <TrendingUp size={26} />,
    stat: "92%",
    text: "Average salary increase within first year",
  },
  {
    icon: <Heart size={26} />,
    stat: "98%",
    text: "Would recommend to a friend",
  },
];

const RealStories: React.FC = () => {
  return (
    <section className="w-full bg-[#FCF1FF] py-24 font-[Montserrat]">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow mb-4">
            <Heart className="text-[#5C1CC5]" size={28} />
          </div>

          <h2 className="text-[46px] font-bold text-[#15010D] leading-[58px]">
            Real Stories, Real Impact
          </h2>

          <p className="text-[#4A5565] mt-4 text-[19px] leading-[28px] max-w-[720px]">
            Behind every number is a human story. Discover how our community transforms
            careers and builds connections that span the globe.
          </p>
        </div>

        {/* Top Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-14 w-full">

          {/* Map + Card */}
          <div className="relative w-full">
            <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/Map.png"
                alt="Global Map"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-[-35px] right-[-35px] bg-white rounded-2xl shadow-xl p-6 w-[350px] border border-gray-100">
              <div className="text-[#5C1CC5] mb-2">
                <Globe size={22} />
              </div>
              <h4 className="font-semibold text-[17px] text-[#15010D]">
                Global Reach
              </h4>
              <p className="text-[#4A5565] text-[14px] leading-[20px] mt-2">
                Our growing community spans Ireland, Moscow, the US, the UK, and
                Equatorial Guinea, bringing together product leaders from every
                corner of the world.
              </p>
            </div>
          </div>

          {/* Testimonial + Stats */}
          <div className="flex flex-col justify-start gap-10">

            {/* Testimonial */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-left border border-gray-100">
              <div className="text-[#5C1CC5] mb-3">
                <Quote size={26} />
              </div>

              <p className="italic text-[16px] leading-[24px] text-[#4A5565] mb-5">
                “The program has helped me grow by widening my knowledge about happenings in the world that I had little or zero knowledge about. It&apos;s solved a specific problem for me by changing my thought pattern. One of the major effects of the program on me is a broadened knowledge.”
              </p>

              <div className="flex items-center gap-3 mt-4">
                <Image
                  src="/images/Bless.png"
                  alt="Blessing Conference"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#5C1CC5]">Blessing Conference</p>
                  <p className="text-sm text-[#4A5565]">Product Manager</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map((item: StatItem, index: number) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="text-[#5C1CC5] mb-3">{item.icon}</div>
                  <h4 className="text-[30px] font-bold text-[#5C1CC5]">{item.stat}</h4>
                  <p className="text-sm text-[#4A5565] leading-tight mt-2">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Grid */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

          {/* Team Success */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-[220px]">
            <Image
              src="/images/Newsuccess.png"
              alt="Team Success"
              fill
              className="object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Bottom-anchored text */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white">
              <h4 className="font-semibold">Team Success</h4>
              <p className="text-sm leading-relaxed">
                Collaborative growth among passionate professionals.
              </p>
            </div>
          </div>


          {/* Samuel */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col justify-between">
            <div className="text-[#5C1CC5] mb-3">
              <Quote size={24} />
            </div>

            <p className="italic text-[#4A5565] leading-[22px]">
              “The program transformed my perspective, teaching me how to research,
              plan, and align products with user needs and business goals.”
            </p>

            <div className="flex items-center gap-3 mt-5">
              <Image
                src="/images/Samuel.png"
                alt="Samuel Ogunleye"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-[#5C1CC5]">Samuel Ogunleye</p>
                <p className="text-sm text-[#4A5565]">Product Manager</p>
              </div>
            </div>
          </div>

          {/* Individual Growth */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-[220px]">
            <Image
              src="/images/individual.png"
              alt="Individual Growth"
              fill
              className="object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Bottom text */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white">
              <h4 className="font-semibold">Individual Growth</h4>
              <p className="text-sm leading-relaxed">
                Personal transformation through product leadership.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default RealStories;
