import React from "react";
import { Montserrat } from "next/font/google";
import { Search, Lightbulb, Settings, Shield, Eye, type LucideIcon } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Outcome = {
  icon: LucideIcon;
  title: string;
  points: string[];
};

const outcomes: Outcome[] = [
  {
    icon: Search,
    title: "Verified Discovery Evidence",
    points: ["User interviews", "Research reports", "Validation findings"],
  },
  {
    icon: Lightbulb,
    title: "Verified Product Thinking",
    points: ["PRD", "Roadmap", "Prioritization decisions", "Strategy documents"],
  },
  {
    icon: Settings,
    title: "Verified Execution",
    points: ["Working MVP", "Demo recording", "Launch assets", "Public product"],
  },
  {
    icon: Shield,
    title: "Verified Reputation",
    points: [
      "Mentor reviews",
      "Stakeholder testimonial",
      "Public presentation",
      "Talent profile",
    ],
  },
  {
    icon: Eye,
    title: "Recruiter Visibility",
    points: ["Talent showcase", "Demo day", "Talent directory listing"],
  },
];

const OutcomesSection: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-[#FAE1FF] py-20 px-6 md:px-12 lg:px-24`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] text-center mb-14">
          By The End Of PPIP, You&apos;ll Have More Than Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome) => {
            const Icon = outcome.icon;
            return (
              <div
                key={outcome.title}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 text-left flex flex-col h-full"
              >
                <div className="w-11 h-11 rounded-xl bg-[#6024D0] flex items-center justify-center shadow-md shadow-purple-200">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mt-7 mb-5 leading-snug">
                  {outcome.title}
                </h3>
                <div className="space-y-2.5">
                  {outcome.points.map((point) => (
                    <p key={point} className="text-gray-500 text-sm md:text-base">
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;
