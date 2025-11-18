import React from "react";
import Image from "next/image";
import hero from "@/assets/images/hero.jpg";

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen md:h-[90vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={hero}
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(210, 143, 221, 0.15) -69.12%, rgba(24, 1, 15, 0.9) 102.99%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[90%] sm:max-w-2xl mx-auto px-4 md:px-6 flex flex-col items-center">
       <h1
  className="text-white text-center font-[montserrat] font-bold 
             text-[28px] sm:text-[32px] md:text-[35px] 
             leading-[36px] sm:leading-[44px] md:leading-[56px]"
>
  Turn Your Product Management <br /> Dreams Into Impactful Careers
</h1>


        <p className="text-sm sm:text-base md:text-lg mt-4 mb-8 font-[montserrat] text-gray-200 max-w-md sm:max-w-2xl">
          Join a global community of 500+ product professionals. Learn from
          industry experts, accelerate your career, and build products that
          matter.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 w-full sm:w-auto">
          <button className="bg-purple-600 hover:bg-purple-700 text-white [font-semibold]  px-6 py-3 rounded-md transition w-full sm:w-auto">
            Apply for a Program
          </button>
          <button className="border border-white hover:bg-white/10 text-white font-[semibold] px-6 py-3 rounded-md transition w-full sm:w-auto">
            Join the Community
          </button>
        </div>

        <div className="text-xs sm:text-sm md:text-base font-[montserrat] space-y-1">
          <p className="font-semibold">
            Next Cohort Begins:{" "}
            <span className="text-white">January 19th, 2026</span>
          </p>
          <p className="text-gray-300">
            Limited slots available — Register now to join the next global
            product leaders.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
