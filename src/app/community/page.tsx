import { Montserrat } from "next/font/google";
import CommunityAboutSection from "@/components/community/CommunityAboutSection";
import CommunityGuide from "@/components/community/CommunityGuide";
import CommunityPeep from "@/components/community/CommunityPeep";
import TrendingEventsSection from "@/components/community/TrendingEventsSection";
import PricingPlan from "@/components/community/PricingPlan";
import CommunityLowerHero from "@/components/community/CommunityLowerHero";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CommunityPage() {
  const features = [
    {
      iconSrc: "/images/networkIcon.png", // Update with your actual icon path
      title: "Global Network",
      description:
        "Connect with professionals from 20+ countries and diverse backgrounds",
    },
    {
      iconSrc: "/images/supportIcon.png", // Update with your actual icon path
      title: "24/7 Support",
      description:
        "Get help, share ideas, and learn from peers in our active community channels",
    },
    {
      iconSrc: "/images/careerIcon.png", // Update with your actual icon path
      title: "Career Growth",
      description:
        "95% of our members report significant career advancement within 12 months",
    },
  ];
  return (
    <div>
      <section className="relative min-h-[500px] md:min-h-[680px]">
        <div className="absolute inset-0">
          <img
            src="/images/communityHero.png"
            alt="Community gathering"
            className="w-full md:h-[680px] h-full object-cover hidden md:block"
          />
          <img
            src="/images/communityHeroMb.png"
            alt="Community gathering"
            className="w-full md:hidden block h-full object-cover"
          />
          <img
            src="/images/communityRec.png"
            alt="Overlay"
            className="absolute inset-0 w-full h-full  md:h-[680px] object-cover hidden md:block"
          />
          <img
            src="/images/communityRecMb.png"
            alt="Overlay"
            className="absolute inset-0 w-full h-full  md:h-[680px] object-cover md:hidden block"
          />
        </div>
        <div
          className={`${montserrat.className} relative z-10  md:pt-[72px] pt-[221px] md:px-20 px-4  text-center`}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm  rounded-[999px] mb-14 md:mb-0 px-4 py-2 border border-white/20 w-fit">
            <img src="images/starIcon.png" alt="starIcon" className="w-6 h-6" />
            <span className="text-[#FFFFFFE5] leading-5 text-sm font-normal">
              Where Product Leaders Connect
            </span>
          </div>
          <h1 className="text-[32px]  md:text-[56px] font-bold hidden md:block  mx-auto text-white text-center mb-6 leading-normal">
            Join a Thriving Community of Product Builders
          </h1>
          <h1 className="text-[32px]  md:text-[56px] font-bold md:hidden block  mx-auto text-white text-center mb-6 leading-normal">
            Join a Thriving <br /> Community of <br /> Product Builders
          </h1>
          <p className="text-[12px] md:text-2xl md:w-[850px] w-[343px] text-white/90 text-center mb-10  mx-auto font-normal md:leading-8 leading-normal">
            Connect, learn, and grow with mentors, peers, and leaders shaping
            the next generation of products
          </p>
          <button className="group relative text-[20px] cursor-pointer font-medium hover:bg-[#370589] hover:border bg-[#5C1CC5] text-white leading-normal px-7 py-2.5 rounded-sm transition-all duration-300 shadow-sm hover:shadow-2xl hover:scale-105 active:bg-[#FAE1FF] active:border active:border-[#5B1CC5] active:rounded-lg active:scale-100">
            <span className="relative z-10 text-[20px] font-medium active:text-[#5C1CC5]">
              Join community
            </span>
          </button>
        </div>
        {/* Stats Cards */}
        <div className="relative z-10 h-full md:flex items-end  pt-14  px-20  hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 font-[Arial] justify-center">
              {/* Active Members */}
              <div className="bg-white/20 backdrop-blur-sm rounded-[14px] text-center  p-4 flex flex-col justify-center items-center">
                <h3 className="text-[30px] font-bold text-[#FFFFFF] ">167+</h3>
                <p className="text-[#FFFFFF] text-sm font-normal">
                  Active Members
                </p>
              </div>

              {/* Countries */}
              <div className="bg-white/20 backdrop-blur-sm rounded-[14px] text-center  p-4  flex flex-col justify-center items-center">
                <h3 className=" text-[30px] font-bold text-[#FFFFFF]">7+</h3>
                <p className="text-[#FFFFFF] text-sm  font-normal">Countries</p>
              </div>

              {/* Career Growth */}
              <div className="bg-white/20 backdrop-blur-sm rounded-[14px] text-center  p-4  flex flex-col justify-center items-center">
                <h3 className="text-[30px] font-bold text-[#FFFFFF]">97%</h3>
                <p className="text-[#FFFFFF] text-base font-normal">
                  Career Growth
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${montserrat.className} py-16 relative z-10 h-full flex items-end md:hidden`}
        >
          <div className="w-full px-5 ">
            <div className="grid grid-cols-3 gap-3  justify-center">
              {/* Active Members */}
              <div className="bg-white/20 backdrop-blur-sm rounded-[3.6px] text-center  p-2 flex flex-col justify-center items-center">
                <h3 className="text-[12px] font-bold text-[#FFFFFF] pb-3 ">
                  167+
                </h3>
                <p className="text-[#FFFFFF] text-[8px] leading-[5.2px] font-normal">
                  Active Members
                </p>
              </div>

              {/* Countries */}
              <div className="bg-white/20 backdrop-blur-sm rounded-[3.6px] text-center  p-2  flex flex-col justify-center items-center">
                <h3 className=" text-[12px] font-bold text-[#FFFFFF] pb-3">
                  11+
                </h3>
                <p className="text-[#FFFFFF] text-[8px] leading-[5.2px] font-normal">
                  Countries
                </p>
              </div>

              {/* Career Growth */}
              <div className="bg-white/20 backdrop-blur-sm rounded-[3.6px] text-center  p-2  flex flex-col justify-center items-center">
                <h3 className="text-[12px] font-bold text-[#FFFFFF] pb-3">
                  97%
                </h3>
                <p className="text-[#FFFFFF] text-[8px] leading-[5.2px] font-normal">
                  Career Growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CommunityAboutSection />
      <CommunityGuide />
      <CommunityPeep />
      <TrendingEventsSection />
      <PricingPlan />
      <CommunityLowerHero />
    </div>
  );
}
