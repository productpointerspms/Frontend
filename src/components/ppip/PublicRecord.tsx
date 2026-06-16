import React from "react";
import {
  BadgeCheck,
  Box,
  Users,
  FileText,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type Stat = {
  icon: LucideIcon;
  number: string;
  label: string;
};

const stats: Stat[] = [
  { icon: Box, number: "2", label: "Products Built" },
  { icon: Users, number: "24", label: "User Interviews" },
  { icon: FileText, number: "3", label: "Verified PRDs" },
  { icon: PlayCircle, number: "2", label: "Product Demos" },
];

const tabs = ["Verified Products", "Research & PRDs", "Stakeholder Reviews"];

const PublicRecord: React.FC = () => {
  return (
    <section
      className={`${montserrat.className} bg-[#5C1CC5] text-white py-20 px-6 md:px-12 lg:px-24`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Your Public Record Of Product Work
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mt-4">
            Recruiters don&apos;t just see what you claim. They see what you&apos;ve
            done.
          </p>
        </div>

        {/* Talent Profile card */}
        <div className="bg-white rounded-3xl shadow-2xl max-w-3xl mx-auto text-[#1a1a1a] overflow-hidden">
          {/* Browser bar */}
          <div className="bg-[#FBF0FF] px-6 py-4 flex justify-center">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-xs md:text-sm text-gray-500 max-w-full truncate">
              talent.productpointers.com/Blessing-okomor
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Identity */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#EDE3FF] border-4 border-white shadow-sm text-[#6024D0] flex items-center justify-center font-bold text-2xl shrink-0">
                BO
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl md:text-2xl">
                    Deborah Philips
                  </span>
                  <BadgeCheck className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Product Manager • PPIP Batch 3 Alumni
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                    Open To Roles
                  </span>
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                    B2B SaaS
                  </span>
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                    Fintech
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-[#F4EFFF] rounded-xl p-4 text-center"
                  >
                    <Icon className="w-5 h-5 text-[#6024D0] mx-auto mb-2" />
                    <div className="text-xl font-bold text-[#1a1a1a]">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-6 border-b border-gray-100 mb-6 text-sm">
              {tabs.map((tab, i) => (
                <span
                  key={tab}
                  className={
                    i === 0
                      ? "font-semibold text-[#6024D0] border-b-2 border-[#6024D0] pb-2 -mb-px"
                      : "text-gray-400 pb-2"
                  }
                >
                  {tab}
                </span>
              ))}
            </div>

            {/* Product evidence card */}
            <div className="border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40 h-28 rounded-xl bg-[#F4EFFF] flex items-center justify-center shrink-0">
                <Box className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#1a1a1a] mb-1">DataSync Pro</h4>
                <p className="text-gray-500 text-sm mb-3">
                  An automated data reconciliation tool built for local accounting
                  firms to reduce manual entry errors by 40%.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#6024D0] bg-[#F4EFFF] rounded-md px-2.5 py-1">
                    <FileText className="w-3.5 h-3.5" /> PRD Attached
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#6024D0] bg-[#F4EFFF] rounded-md px-2.5 py-1">
                    <PlayCircle className="w-3.5 h-3.5" /> Demo Recording
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicRecord;
