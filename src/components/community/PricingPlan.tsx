import React from "react";

import { Montserrat } from "next/font/google";

import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function PricingPlan() {
  const features = [
    "All community channels & discussions",
    "Access to mentors and alumni",
    "Exclusive resources & live sessions",
    "Priority event registration",
  ];

  return (
    <div
      className={`${montserrat.className} min-h-screen   flex items-center justify-center p-4  pb-[103px]`}
      style={{
        background: "linear-gradient(180deg, #FAE1FF 15.88%, #FCF1FF 100%)",
      }}
    >
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center md:mb-[72px] mb-8">
          <h1 className="md:text-5xl text-2xl font-bold text-[#15010D] md:mb-[30px] mb-4 md:mt-[99px] mt-7 md:leading-[60px leading-normal mb-4">
            Choose Your Plan
          </h1>
          <p className="text-[#15010D] md:text-[20px] text-[12px] text-center mx-auto leading-5 md:leading-7 font-normal">
            Invest in personalized coaching that transforms your PM career
          </p>
        </div>

        {/* Pricing Card */}
        <div className=" rounded-2xl shadow-sm overflow-hidden mb-[72px] md:w-[520px] w-full mx-auto">
          {/* Purple Header */}
          <div
            className="bg-[#5C1CC5] text-white text-center md:pt-3.5 pb-[27px] pt-[14.5px]  pr-[114px] md:pr-0  pl-[115px] md:pl-0  "
            style={{ borderRadius: "17.261px 17.261px 0 0" }}
          >
            <h2 className="text-5xl font-semibold mb-1">Free</h2>
            <p className="text-[#FFFFFF] text-sm leading-[12.946px] font-normal">
              Lifetime Access
            </p>
          </div>

          {/* Features List */}
          <div
            className="p-8 bg-[#FCF1FF]"
            style={{ borderRadius: "0 0 17.261px 17.261px " }}
          >
            <ul className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center pl-12 gap-2">
                  <Image
                    src="/images/curveCheck_icon.png"
                    alt="Roll icon"
                    width={13}
                    height={8}
                  />
                  <span className="text-[#15010D] text-[12.946px] leading-[12.946px]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button className="md:w-full w-[280px] group   hover:bg-[#370589] hover:border  hover:scale-105 active:bg-[#FAE1FF] active:border active:border-[#5B1CC5] bg-[#5C1CC5] active:scale-100 active:text-[#5C1CC5] md:text-[20px] text-sm cursor-pointer text-white font-medium py-2 px-4 md:rounded-lg rounded-2xl transition-colors duration-200 mb-4">
                Claim Free Access
              </button>
            </div>
            {/* Subtext */}
            <p className="text-center text-[#6D6D6D] text-sm leading-5 pb-4">
              Free for all Product managers
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-[#FAE1FF] backdrop-blur-sm rounded-2xl p-8 text-center md:w-[600px] w-full mx-auto">
          <h3 className="md:text-2xl text-[20px] leading-7 font-normal text-[#15010D] mb-6">
            Lifetime Access Guarantees
          </h3>
          <p className="text-[#15010D] md:text-[18px] text-[12px] md:leading-7 leading-5 font-normal">
            No subscriptions. No hidden fees. Just unlimited access to a
            community that grows with you.
          </p>
        </div>
      </div>
    </div>
  );
}
