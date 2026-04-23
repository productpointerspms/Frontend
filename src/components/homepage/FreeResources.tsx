import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import teardownImg from "@/assets/images/pd0.png";
import vibeCodingImg from "@/assets/images/pd1.png";
import upworkJobsImg from "@/assets/images/pd2.png";

const FreeResources: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-[#FDF7FF]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-[#15010D] mb-4">
            Get Access to Free Product Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat text-sm md:text-base">
            Explore practical product management insights, tutorials, and real-world breakdowns — all for free.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Large Video Card */}
          <div className="lg:w-2/3 pb-3">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col overflow-hidden group cursor-pointer">
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src={teardownImg}
                  alt="Product Teardown Masterclass"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Small Video Cards */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col overflow-hidden group cursor-pointer">
              <div className="relative w-full aspect-video">
                <Image
                  src={vibeCodingImg}
                  alt="Vibe Coding Masterclass"
                  fill
                  className="object-cover"
                />
              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col overflow-hidden group cursor-pointer">
              <div className="relative w-full aspect-video">
                <Image
                  src={upworkJobsImg}
                  alt="How to Land Remote Jobs on Upwork"
                  fill
                  className="object-cover"
                />

              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="https://youtube.com/@the-globalpm?si=RZKGO1g-N2Hwt-Al"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C62828] hover:bg-[#A82121] text-white px-8 py-3 rounded-full font-semibold font-montserrat transition-colors text-sm md:text-base"
          >
            View Channel
          </a>
        </div>
      </div>
    </section>
  );
};

export default FreeResources;
