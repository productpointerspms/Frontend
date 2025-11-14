import React from "react";

export default function PMCoachingHero() {
  return (
    <section className="relative min-h-screen bg-[linear-gradient(172deg,#9171BB_8.6%,#5C1CC5_46.62%,#7B45D4_93.64%)] overflow-hidden md:pb-[180px] pb-[300px]">
      {/* Floating Profile Images */}
      <div className="absolute md:top-26 top-24 md:left-16 left-6 w-[134px] h-[134px] rounded-[134px] overflow-hidden ">
        <img
          src="/images/pmIcon1.png"
          alt="Product Manager"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-120 md:block hidden left-24 w-[83px] h-[83px] rounded-[83px] overflow-hidden ">
        <img
          src="/images/pmIcon2.png"
          alt="Product Manager"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute md:top-100 hidden md:block right-24 w-[83px] h-[83px] rounded-[83px] overflow-hidden">
        <img
          src="/images/pmIcon2.png"
          alt="Product Manager"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute  bottom-24 block md:hidden right-12 w-[83px] h-[83px] rounded-[83px] overflow-hidden">
        <img
          src="/images/pmIcon2.png"
          alt="Product Manager"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-[100px]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-[32px] md:text-[72px] hidden md:block lg:text-7xl font-bold text-white mb-[35px] md:leading-[90px] pt-50 md:pt-0">
            Be Part of the Next Generation of <br /> Product Leaders
          </h1>
          <h1 className="text-[32px] md:hidden block mx-auto  font-bold text-white mb-[35px] md:leading-[90px] pt-50 md:pt-0">
            Be Part of the Next Generation of Product Leaders
          </h1>

          {/* Subheading */}
          <p className="text-sm md:text-2xl  text-white/90 mb-2 md:w-[670px] w-[343px] mx-auto leading-5 md:leading-[39px]">
            Join 500+ professionals who've transformed their careers with
            ProductPointers. Your journey to product leadership starts here.
          </p>

          {/* Benefits List */}
          <ul className="text-white/80 md:text-base text-[12px] font-normal leading-6 mb-12 space-y-3 max-w-2xl mx-auto">
            <li className="flex items-center justify-center gap-3">
              <span className="w-2 h-2 bg-[#000000] rounded-full"></span>
              <span>Expert mentorship from industry leaders</span>
            </li>
            <li className="flex items-center justify-center gap-3">
              <span className="w-2 h-2 bg-[#000000] rounded-full"></span>
              <span>Practical skills that delivers immediate impact</span>
            </li>
            <li className="flex items-center justify-center gap-3">
              <span className="w-2 h-2 bg-[#000000] rounded-full"></span>
              <span>Lifetime access to our global community</span>
            </li>
          </ul>

          {/* CTA Button */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <button className="bg-[#FAE1FF] text-[#5B1CC5] border border-[#5B1CC5] hover:bg-[#5C1CC5] hover:text-white hover:border hover:border-white cursor-pointer font-medium px-7 py-2.5 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform">
              Apply Now
            </button>
            <div className="text-left text-white/80">
              <p className="font-bold text-sm leading-5">
                Next cohort starts January 16, 2026
              </p>
              <p className="text-sm font-normal leading-5 text-white/80">
                Limited to 20 participants
              </p>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-white/60 text-sm font-normal leading-5">
            🔒 Application review within 48 hours • 💰 Payment plans available
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
    </section>
  );
}
