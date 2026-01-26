const AboutNetworkSection = () => {
  return (
    <section className="w-full bg-[#FCF1FF] py-16 sm:py-20">
      <div className="max-w-[1441px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src="images/aboutnetwork.png"
              alt="About The-Global’PM Network"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 max-w-[630px]">
            <h2 className="font-montserrat font-bold text-[#15010D] text-2xl sm:text-3xl lg:text-[40px] leading-tight">
              About The-Global’PM Network
            </h2>

            <div className="mt-6 space-y-6 font-montserrat text-[#15010D] text-sm sm:text-base leading-relaxed sm:leading-[36px]">
              <p>
                The-Global’PM Network is a premium growth circle for professionals who want more clarity, confidence, and control over their personal and financial growth.
              </p>
              <p>
                In a world where most people focus only on career advancement, this network helps you go further helping you build sustainable habits, strengthen your personal brand, and turn your knowledge into income.
              </p>
              <p>
                Whether you’re in tech, business, or any professional field, The-Global’PM Network gives you the structure and community you need to grow in every area of your life.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-10">
              <div>
                <p className="text-[#6A2FF5] font-bold text-2xl">50+</p>
                <p className="text-sm">Members</p>
              </div>
              <div>
                <p className="text-[#6A2FF5] font-bold text-2xl">7+</p>
                <p className="text-sm">Countries</p>
              </div>
              <div>
                <p className="text-[#6A2FF5] font-bold text-2xl">2025</p>
                <p className="text-sm">Active since</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNetworkSection;