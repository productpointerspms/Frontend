import React from "react";

const recurSection: React.FC = () => {
  return (
    <section className="w-full flex justify-center bg-gradient-to-b from-purple-50 to-purple-100 px-4 py-20">
      <div className="max-w-[1440px] w-full flex flex-col items-center text-center gap-6">
        {/* Heading */}
        <h2 className="font-montserrat font-bold text-[28px] leading-tight sm:text-[37px] md:text-[53px] md:leading-[60px] max-w-[1028px]">
          The-Global'PM Network Subscription
        </h2>

        {/* Short description */}
        <p className="font-montserrat font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-[28px] max-w-[707px] text-gray-700">
          Recurring payments. Cancel anytime.
        </p>

        {/* Card */}
        <div className="mt-12 w-full max-w-[672px] bg-white rounded-[32px] p-6 sm:p-8 flex flex-col gap-8 shadow-lg">
          {/* Price */}
          <div className="text-center">
            <p className="font-montserrat font-bold text-[42px] sm:text-[49px] md:text-[56px] text-gray-900">
              ₦100,000
            </p>
            <p className="font-montserrat text-gray-600 mt-2">
              Everything you need to grow as a PM
            </p>
          </div>

          {/* Features */}
          <ul className="flex flex-col gap-4 text-left">
            {["Structured savings for financial discipline",
              "Monthly LinkedIn growth tasks",
              "Knowledge monetization guides",
              "Exclusive growth calendar & events",
              "Faith-driven accountability network",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 font-montserrat text-gray-800">
                <span className="text-purple-600 text-base">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Button */}
          <button className="w-full h-[50px] bg-purple-600 text-white rounded-[4px] font-montserrat font-semibold hover:bg-purple-700 transition cursor-pointer">
            Subscribe Now
          </button>

          {/* Footer text */}
          <p className="text-xs text-gray-500 text-center">
            Secure Payment • Verified Community
          </p>
        </div>
      </div>
    </section>
  );
};

export default recurSection;