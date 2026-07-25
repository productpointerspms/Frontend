import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Week = {
  num: string;
  week: string;
  title: string;
  desc: string;
  outcome: string;
};

const weeks: Week[] = [
  {
    num: "1",
    week: "Week 1",
    title: "Stakeholder Discovery",
    desc: "Work directly with a real stakeholder to understand their challenge.",
    outcome: "Verified Problem Brief",
  },
  {
    num: "2",
    week: "Week 2",
    title: "User Validation",
    desc: "Interview real users and validate assumptions.",
    outcome: "Research Report + Validation Score",
  },
  {
    num: "3",
    week: "Week 3",
    title: "Product Strategy",
    desc: "Define users, JTBD, vision, and success metrics.",
    outcome: "Approved Product Strategy",
  },
  {
    num: "4",
    week: "Week 4",
    title: "PRD & Prioritization",
    desc: "Create a professional PRD and MVP roadmap.",
    outcome: "Mentor-Verified PRD",
  },
  {
    num: "5-6",
    week: "Week 5-6",
    title: "MVP Build",
    desc: "Build using modern AI-assisted tools.",
    outcome: "Functional MVP",
  },
  {
    num: "7",
    week: "Week 7",
    title: "User Testing",
    desc: "Observe users interacting with your product.",
    outcome: "Verified Testing Report",
  },
  {
    num: "8",
    week: "Week 8",
    title: "Public Launch",
    desc: "Launch your MVP publicly.",
    outcome: "Live Product",
  },
  {
    num: "9",
    week: "Week 9",
    title: "Post-Launch Feedback",
    desc: "Collect adoption insights and iterate.",
    outcome: "Impact Report",
  },
  {
    num: "10",
    week: "Week 10",
    title: "Talent Verification",
    desc: "Present your work and complete your ProductPointers Talent Profile.",
    outcome: "Verified Product Talent Profile",
  },
];

const ApprenticeshipTimeline: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className={`${montserrat.className} bg-[#FCF1FF] py-20 px-6 md:px-12 lg:px-24 scroll-mt-10`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="border border-[#a855f7] text-[#a855f7] bg-[#FAE1FF] rounded-full px-4 py-1.5 text-xs font-semibold mb-6 inline-block">
            10-Weeks Structured Program
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
            A Structured 10-Week Product Apprenticeship
          </h2>
        </div>

        <div className="relative border-l-2 border-[#D8B4FE] ml-4 md:ml-12 space-y-8">
          {weeks.map((week) => (
            <div key={week.week} className="relative pl-8 md:pl-12">
              <div className="absolute -left-[11px] top-9 w-5 h-5 rounded-full border-[3px] border-[#a855f7] bg-[#FAF5FF]" />
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 flex gap-4">
                <div className="shrink-0 w-9 h-9 bg-[#FAE1FF] text-[#6D28D9] rounded-lg flex items-center justify-center font-bold text-sm">
                  {week.num}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold bg-[#F3E8FF] text-[#6D28D9] px-2.5 py-0.5 rounded-full">
                    {week.week}
                  </span>
                  <h3 className="text-lg font-bold text-[#1a1a1a] mt-3 mb-1">
                    {week.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-5">{week.desc}</p>

                  <hr className="border-t border-gray-100 mb-4" />

                  <div className="text-xs font-bold text-[#6D28D9] tracking-wider mb-1">
                    OUTCOME:
                  </div>
                  <p className="text-gray-500 text-sm">{week.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApprenticeshipTimeline;
