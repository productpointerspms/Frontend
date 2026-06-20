import React from "react";
import { User, Briefcase, UserPlus, Building2, Users, LucideIcon } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface Audience {
  icon: LucideIcon;
  title: string;
  description: string;
}

const audiences: Audience[] = [
  {
    icon: User,
    title: "Aspiring Product Managers",
    description: "People looking to break into Product Management.",
  },
  {
    icon: Briefcase,
    title: "Early-Career PMs",
    description: "Professionals looking to gain practical experience.",
  },
  {
    icon: UserPlus,
    title: "Career Switchers",
    description: "Individuals transitioning into Product Management.",
  },
  {
    icon: Building2,
    title: "Employers",
    description: "Founders and hiring managers looking for trusted product talent.",
  },
  {
    icon: Users,
    title: "Organizations",
    description: "Businesses and stakeholders with real problems that need solving.",
  },
];

const WhoWeServe: React.FC = () => {
  return (
    <section className={`${montserrat.className} bg-[#F8E8FF] py-20 px-6 md:px-12 lg:px-24`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-[34px] font-bold text-[#15010D] text-center uppercase tracking-wide mb-14">
          Who We Serve
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {audiences.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="relative bg-white rounded-2xl px-8 pt-14 pb-8 shadow-sm"
            >
              <div className="absolute -top-5 left-8 w-12 h-12 rounded-xl bg-[#6024D0] flex items-center justify-center shadow-md">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#15010D] mb-4 leading-snug">
                {title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
