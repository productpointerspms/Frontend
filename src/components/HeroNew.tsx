import React from "react";

const HeroNew: React.FC = () => {
  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(180deg, #5C1CC580 -47.03%, #14010D 129.66%), url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "622px",
      }}
      className="relative flex flex-col items-center justify-center text-white text-center px-6 py-16"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* Heading */}
        <div className="w-full flex items-center justify-center">
          <h1
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              lineHeight: "100%",
              letterSpacing: "0px",
              textAlign: "center",
            }}
            className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[44px] max-w-[90%] md:max-w-[900px]"
          >
           An Impact-First Product Management Mentorship Academy
          </h1>
        </div>

        {/* Description */}
        <div className="w-full flex items-center justify-center mt-6">
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              lineHeight: "32.5px",
              letterSpacing: "0px",
              textAlign: "center",
            }}
            className="text-[16px] sm:text-[18px] md:text-[20px] max-w-[90%] md:max-w-[744px]"
          >
            At ProductPointers, we don’t measure success by how many join us.
            We measure it by how many lives transform.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroNew;
