import {
  DollarSign,
  Users,
  Star,
  TrendingUp,
  CalendarCheck,
  Heart,
} from "lucide-react";

const WhyJoinSection = () => {
  const benefits = [
    {
      title: "Exclusive Savings",
      desc: "Access discounts on tools, courses, and resources you need as a PM.",
      icon: DollarSign,
    },
    {
      title: "Rich Culture",
      desc: "Connect with like-minded product managers across the globe.",
      icon: Users,
    },
    {
      title: "LinkedIn Branding",
      desc: "Boost your professional presence with our network badge and resources.",
      icon: Star,
    },
    {
      title: "Monetization Opportunities",
      desc: "Unlock exclusive partnerships and revenue streams.",
      icon: TrendingUp,
    },
    {
      title: "Growth Calendar",
      desc: "Stay on track with monthly goals and accountability check-ins.",
      icon: CalendarCheck,
    },
    {
      title: "Community Support",
      desc: "Get help, advice, and mentorship from experienced PMs worldwide.",
      icon: Heart,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#FAE1FF] to-[#FCF1FF] py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-[901px] mx-auto text-center">
          <h2 className="font-montserrat font-bold text-[#15010D] text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[60px]">
            Why Join The-Global’PM Network?
          </h2>
          <p className="mt-4 font-montserrat text-[#15010D] text-base sm:text-lg lg:text-[20px] leading-relaxed">
            Unlock exclusive benefits designed to accelerate your product management career
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 flex flex-col gap-6 min-h-[216px]"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#2B1248] flex items-center justify-center">
                  <Icon size={24} color="#ffffff" />
                </div>

                <h3 className="font-montserrat font-semibold text-[#15010D] text-lg sm:text-xl">
                  {item.title}
                </h3>

                <p className="font-montserrat text-[#6B6B6B] text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
