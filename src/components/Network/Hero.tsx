const HeroNetwork = () => {
  return (
    <section
      className="relative w-screen h-[711px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('images/NetworkHero.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5C1CC5]/10 via-[#2B1248]/40 to-[#14010D]/90" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6">
        
        {/* Heading */}
        <div className="w-full max-w-[1280px]">
          <h1 className="font-montserrat font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-[100%] text-center">
            Grow Together with The-Global’PM
            <br />
            Network
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-white text-xs sm:text-sm md:text-[16px] text-center max-w-[720px]">
          Grow beyond your career. Build your brand, your finances, and your
          future.
        </p>

        {/* CTA */}
        <button className="mt-8 sm:mt-10 px-6 sm:px-10 py-3 sm:py-4 rounded-lg bg-[#6A2FF5] hover:bg-[#5a26e0] transition text-white font-semibold cursor-pointer">
          Subscribe Now
        </button>
      </div>
    </section>
  );
};

export default HeroNetwork;