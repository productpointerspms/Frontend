import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage:  "linear-gradient(180deg, #5C1CC580 -47.03%, #14010D 129.66%), url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Purple/dark overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#5C1CC5]/50 to-[#8e2de2]/50" /> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-white font-montserrat font-bold text-[34px] sm:text-[48px] md:text-[50px] leading-tight mb-6">
          Get Mentored Into Product <br className="hidden sm:block" />
          Management. Not Just Trained
        </h1>

        <p className="text-gray-200 font-montserrat text-sm sm:text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          A mentorship-first product management academy helping beginners
          transition, entry-level PMs grow, and professionals accelerate through
          structured programs, internships, and 1:1 coaching.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 w-full sm:w-auto">
          <a
            href="/apply"
            className="bg-[#5C1CC5] hover:bg-[#4a15a0] text-white font-semibold font-montserrat px-8 py-3.5 rounded-md transition-colors w-full sm:w-auto"
          >
            Apply for a Program
          </a>
          <a
            href="/pm-journey"
            className="border border-white hover:bg-white/10 text-white font-semibold font-montserrat px-8 py-3.5 rounded-md transition-colors w-full sm:w-auto"
          >
            Start Your PM Journey
          </a>
        </div>

        <div className="font-montserrat space-y-1">
          <p className="font-bold text-white text-sm sm:text-base">
            Next Cohort Begins:{" "}
            <span className="font-bold">April 27th 2026</span>
          </p>
          <p className="text-gray-300 text-xs sm:text-sm">
            Limited slots available - Register now to join the next global
            product leaders.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
