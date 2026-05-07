import React from "react";
import { ArrowRight, Briefcase } from "lucide-react";
import { Montserrat } from "next/font/google";
import img1 from "@/assets/images/about1.png"
import img2 from "@/assets/images/about2.png"
import img3 from "@/assets/images/about3.png"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HeroNew: React.FC = () => {
  return (
    <section className={`${montserrat.className} bg-[#FDF4FF] min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24 flex items-center`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left">
          <h1 className="text-[#15010D] text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] mb-8">
            We Don't Just Teach Product Management <br />
            We Build Product Managers
          </h1>
          
          <p className="text-[#15010D] opacity-70 text-lg md:text-xl max-w-[540px] leading-relaxed mb-10">
            ProductPointers is a mentorship-first academy focused on helping you 
            gain real product experience, build confidence, and become 
            job-ready, not just certified.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="bg-[#6024D0] hover:bg-[#4F1AB0] text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 transition-all">
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-transparent border border-[#15010D]/20 hover:bg-[#F9E5FF] text-[#15010D] px-8 py-4 rounded-xl font-medium text-lg transition-all">
              Find Your Program
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm md:text-base text-[#15010D] opacity-60">
              Trusted by <span className="font-bold opacity-100">300+</span> aspiring Product Managers building real experience
            </p>
          </div>
        </div>

        {/* Right Image Grid */}
        <div className="relative h-[500px] md:h-[600px] w-full hidden md:block">
          {/* Main Large Image (Left) */}
          <div className="absolute left-0 top-0 w-[60%] h-[80%] rounded-[100px] overflow-hidden shadow-xl">
            <img 
              src={img1.src} // Replace with your image
              alt="Team collaboration" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right Circle Image */}
          <div className="absolute right-4 top-0 w-[40%] aspect-square rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={img2.src} // Replace with your image
              alt="Working on laptop" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Right Vertical Image */}
          <div className="absolute right-0 bottom-0 w-[45%] h-[65%] rounded-[80px] overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={img3.src} // Replace with your image
              alt="Mentorship session" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Job Ready Badge */}
          <div className="absolute left-0 bottom-4 bg-[#6024D0] text-white p-4 pr-10 rounded-tr-[50px] rounded-br-[50px] rounded-bl-[50px] flex items-center gap-4 shadow-2xl">
            <div className="bg-white p-3 rounded-2xl">
              <Briefcase className="text-[#6024D0] w-6 h-6" />
            </div>
            <span className="font-bold text-sm leading-tight uppercase tracking-wider">
              Job-Ready<br />Outcomes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;