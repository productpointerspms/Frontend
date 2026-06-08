import React from "react";
import { ArrowRight, Briefcase } from "lucide-react";
import { Montserrat } from "next/font/google";
import img1 from "@/assets/images/about1.png"
import user1 from "@/assets/images/eniola.png";
import user2 from "@/assets/images/mercy.png";
import user3 from "@/assets/images/udochukwu.png";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HeroNew: React.FC = () => {
  return (
    <section className={`${montserrat.className} bg-[#FDF4FF] min-h-screen pt-10 md:pt-15 pb-20 px-4 md:px-12 lg:px-24 flex items-center`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="flex flex-col items-start text-left order-1 lg:order-1">
          <h1 className="text-[#0C1115] text-[22px] md:text-[40px] font-extrabold leading-[1.2] md:leading-[52px] capitalize mb-8 max-w-[658px] text-left">
            We Don't Just Teach <br />
            Product Management <br />
            We Build Product <br />
            Managers
          </h1>

          <p className="text-[#15010D] opacity-70 text-base md:text-lg max-w-[540px] leading-relaxed mb-10">
            ProductPointers is a mentorship-first academy focused on helping you
            gain real product experience, build confidence, and become
            job-ready, not just certified.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto justify-start">
            <button className="bg-[#6024D0] hover:bg-[#4F1AB0] text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto">
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-transparent border border-[#15010D]/20 hover:bg-[#F9E5FF] text-[#15010D] px-8 py-4 rounded-xl font-medium text-base transition-all cursor-pointer w-full sm:w-auto">
              Find Your Program
            </button>
          </div>
        </div>

        {/* Right Image Grid */}
        <div className="relative h-[240px] sm:h-[320px] lg:h-[420px] xl:h-[500px] w-full order-2 lg:order-2">
          {/* Main Large Image (Left) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] rounded-[40px] overflow-hidden shadow-xl">
            <img
              src={img1.src}
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-3 justify-start order-3 lg:order-3">
          <div className="flex -space-x-3">
            {[user1, user3, user2].map((userImg, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-[3px] border-[#FCF1FF] overflow-hidden bg-gray-200 shadow-sm">
                <img src={userImg.src} alt={`User ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-[10px] min-[375px]:text-xs md:text-sm text-[#15010D] opacity-60 whitespace-nowrap">
            Trusted by <span className="font-bold opacity-100">300+</span> aspiring Product Managers building real experience
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;