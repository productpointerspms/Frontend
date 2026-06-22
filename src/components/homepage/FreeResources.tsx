import React from "react";

const FreeResources: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-gradient-to-r from-[#FAE1FF] to-[#FCF1FF]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[0.92rem] min-[375px]:text-[1.01rem] sm:text-2xl md:text-3xl font-bold font-montserrat text-[#15010D] mb-4 whitespace-nowrap sm:whitespace-normal">
            Get Access to Free Product Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat text-xs md:text-sm">
            Explore practical product management insights, tutorials, and real-world breakdowns — all for free.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Large Video Card */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col overflow-hidden">
              <div className="relative w-full aspect-[16/10]">
                <iframe
                  src="https://www.youtube.com/embed/FWWueWdw7es?start=24"
                  title="How to Conduct a Product Teardown | Product Management for Beginners"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-6 flex-grow flex items-center bg-white">
                <h3 className="text-lg font-semibold font-montserrat text-[#15010D]">
                  How to Conduct a Product Teardown | Product Management for
                  Beginners
                </h3>
              </div>
            </div>
          </div>

          {/* Small Video Cards */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col overflow-hidden">
              <div className="relative w-full aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/NCqpMe2HhWc?start=8"
                  title="Vibe Coding with Bolt: Build & Prototype Apps Fast (PM Masterclass)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-4 flex-grow flex items-center bg-white">
                <h3 className="text-xs md:text-sm font-semibold font-montserrat text-[#15010D]">
                  Vibe Coding with Bolt: Build & Prototype Apps Fast (PM
                  Masterclass)
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col overflow-hidden">
              <div className="relative w-full aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/fuHdmGevE7Y?start=9"
                  title="How to Land Remote Jobs on Upwork Using Video Proposals in 2026"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-4 flex-grow flex items-center bg-white">
                <h3 className="text-xs md:text-sm font-semibold font-montserrat text-[#15010D]">
                  How to Land Remote Jobs on Upwork Using Video Proposals in
                  2026 | A Step by Step Guide
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://www.youtube.com/@The-GlobalPM"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#6024D0] hover:bg-[#4F1AB0] text-white px-8 py-3 rounded-full font-semibold font-montserrat transition-colors text-xs md:text-sm cursor-pointer inline-block"
          >
            View Channel
          </a>
        </div>
      </div>
    </section>
  );
};

export default FreeResources;
