"use client";

import React from "react";

import { Heart } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CommunityLowerHero() {
  return (
    <section
      className={`${montserrat.className} relative min-h-screen overflow-hidden md:pb-[100px] pb-[200px]`}
      style={{
        background:
          "linear-gradient(177deg, #FCF1FF 2.61%, #5C1CC5 66.02%, #2C0E5F 120.81%)",
      }}
    >
      {/* Floating Profile Images */}
      <div className="absolute md:top-26 top-24 md:left-16 left-6 w-[134px] h-[134px] rounded-[134px] overflow-hidden animate-[fadeInOut_4s_ease-in-out_infinite]">
        <img
          src="/images/pmIcon1.png"
          alt="Product Manager"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-40 md:block hidden left-24 w-[83px] h-[83px] rounded-[83px] overflow-hidden animate-[fadeInOut_4s_ease-in-out_infinite] [animation-delay:1s] ">
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
      <div className="absolute  bottom-20 block md:hidden right-12 w-[83px] h-[83px] rounded-[83px] overflow-hidden">
        <img
          src="/images/pmIcon2.png"
          alt="Product Manager"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:pt-[100px] ">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-12 pt-60 md:pt-0">
            <div
              className="border border-white"
              style={{
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.10)",
                padding: "8px 16px",
              }}
            >
              <p className="text-[#5C1CC5] font-normal leading-6 flex items-center gap-1">
                <Heart className="w-4 h-4 fill-[#5C1CC5] text-[#5C1CC5]" />
                Your People Are Waiting
                <Heart className="w-4 h-4 fill-[#5C1CC5] text-[#5C1CC5]" />
              </p>
            </div>
          </div>
          {/* Heading */}
          <h1 className="text-[32px] md:text-[70px] hidden md:block lg:text-7xl font-bold text-white mb-[35px] md:leading-[90px] pt-20 md:pt-0">
            Grow, share, and build with people who get it
          </h1>
          <h1 className="text-[32px] md:hidden w-[300px] block mx-auto  font-bold text-white mb-6 md:leading-[90px] pt-[15px] md:pt-0">
            Grow, share, and build with people who get it
          </h1>

          {/* Subheading */}
          <p className="text-[13px] md:text-2xl  text-white/90 md:mb-8 mb-2 md:w-full w-[343px] mx-auto leading-5 md:leading-[39px]">
            Join a community where your wins are celebrated, your questions are
            answered, and your growth is everyone's priority
          </p>

          {/* CTA Button */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:mb-6 mb-4">
            <button className="bg-[#FAE1FF] text-[#5B1CC5] border border-[#5B1CC5] hover:bg-[#5C1CC5] hover:text-white hover:border hover:border-white cursor-pointer font-medium px-7 py-2.5 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform">
              Join Now
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-white/60 text-sm font-normal leading-5 w-[300px] text-center md:w-full">
            No credit card required • Instant access • Join 800+ product
            builders
          </p>
        </div>
      </div>
    </section>
  );
}
