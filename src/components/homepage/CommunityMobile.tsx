import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CommunityMobile() {
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
    <div className="  md:hidden block ">
      {/* Stats Section with Background Image */}
      <section className="relative min-h-[310px] ">
        {/* Background Image with Purple Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/communityImgMb.jpg"
            alt="Community gathering"
            className="w-full h-full object-fill"
          />
          <img
            src="/images/overlayMb.png"
            alt="Overlay"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <section
          className={`${montserrat.className} relative z-10 text-center pt-14 px-4`}
        >
          <h1 className="text-2xl pb-4 font-bold text-[#FFFFFF]">
            Join Our Thriving Community
          </h1>

          <p className="text-[10px] text-[#FFFFFF] font-normal mx-auto leading-5 pb-[50px]">
            Connect with like-minded product professionals from <br /> around
            the world. Share knowledge, celebrate wins, and <br />
            grow together.
          </p>
        </section>
        {/* Stats Cards */}
        <div
          className={`${montserrat.className} relative z-10 h-full flex items-end`}
        >
          <div className="w-full px-5 ">
            <div className="grid grid-cols-3 gap-3  justify-center">
              {/* Active Members */}
              <div className="bg-white/20 backdrop-blur-sm rounded-[3.6px] text-center  p-2 flex flex-col justify-center items-center">
                <h3 className="text-[12px] font-bold text-[#FFFFFF] pb-3 ">
                  50+
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
      <section
        className={`${montserrat.className} w-full bg-[#FCF1FF] pt-6 px-4`}
      >
        <div className="w-full">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16  rounded-full flex items-center justify-center ">
                  <Image
                    src={feature.iconSrc}
                    alt={feature.title}
                    width={17}
                    height={17}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[12px] font-bold text-[#14010D] leading-[7.5px] mb-[6.3px] -mt-2">
                  {feature.title}
                </h3>
                <p className="text-[#6D6D6D] text-[6px]  font-normal w-[104px] ">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center pb-10 ">
            <button className="group   hover:bg-[#370589] hover:border  hover:scale-105 active:bg-[#FAE1FF] active:border active:border-[#5B1CC5] bg-[#5C1CC5] active:scale-100 active:text-[#5C1CC5] text-[12px] cursor-pointer   text-white font-semibold p-2 rounded-sm transition-all duration-300 transform  ease-in-out">
              Join Community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
