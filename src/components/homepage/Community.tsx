import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Community() {
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
    <div className="pt-[168px] bg-[#FCF1FF] hidden md:block pb-20">
      <section className={`${montserrat.className} text-center px-4`}>
        <h1 className="text-4xl md:text-5xl leading-12 font-bold text-[#14010D] mb-6">
          Join Our Thriving Community
        </h1>

        <p className="text-[20px] text-[#364153] font-normal mx-auto leading-7 md:pb-[76px] ">
          Connect with like-minded product professionals from around the world.
          <br />
          Share knowledge, celebrate wins, and grow together.
        </p>
      </section>
      {/* Stats Section with Background Image */}
      <section className="relative min-h-[500px] md:min-h-[520px]">
        {/* Background Image with Purple Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/communityImg.jpg"
            alt="Community gathering"
            className="w-full h-full object-fill"
          />
          <img
            src="/images/overlayImg.png"
            alt="Overlay"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Stats Cards */}
        <div className="relative z-10 h-full flex items-end  pt-[360px]  px-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 font-[Arial] justify-center">
              {/* Active Members */}
              <div className="bg-white/20 backdrop-blur-sm rounded-[14px] text-center  p-4 flex flex-col justify-center items-center">
                <h3 className="text-[30px] font-bold text-[#FFFFFF] ">50+</h3>
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
      </section>
      <section className={`${montserrat.className} w-full  pt-[76px] px-20`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16  rounded-full flex items-center justify-center mb-2 ">
                  <Image
                    src={feature.iconSrc}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[20px] font-bold text-[#14010D] leading-7 mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-[#6D6D6D] text-[16px] leading-6 font-normal  w-[320px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center pb-[135px]">
            <button className="bg-[#5C1CC5] hover:border hover:border-[#5C1CC5] text-[18px] hover:bg-[#FAE1FF] cursor-pointer hover:text-[#5C1CC5]  text-white font-semibold px-7 py-2.5 rounded-sm transition-all duration-300 transform hover:scale-105 ease-in-out">
              Join Community
            </button>
          </div>
        </div>
      </section>
      <h3 className="text-center md:text-[#14010D] text-[#15010D] hidden md:block font-bold text-2xl  md:text-5xl md:leading-12 leading-normal pb-4 md:pb-6">
        Alumni Success Stories
      </h3>
      <p className="text-[#364153] mx-auto text-center hidden md:block text-[12px] md:text-[20px] font-normal leading-5 md:leading-7 md:w-[750px] w-[340px] ">
        Our alumni are now leading product teams at the world's most innovative
        companies. Here are just a few of their incredible journeys.
      </p>
    </div>
  );
}
