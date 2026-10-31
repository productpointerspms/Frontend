"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NOVEMBER_EVENT_SLUG, formatEventRange, getEvent, type EventDetails } from "@/lib/event";

interface ProgramItem {
  title: string;
  date: string;
  description: string;
  subtitle?: string;
  cta: string;
  href: string;
}

const upcomingPrograms: ProgramItem[] = [
  {
    title: "ProductPointers Accelerator Program",
    date: "Next Cohort Starts September 18, 2026",
    description:
      "A 12-week accelerator for aspiring Product Managers, combining live sessions with practical product work.",
    cta: "Apply Now",
    href: "/ppap#pricing",
  },
  {
    title: "ProductPointers Apprenticeship/Internship Program",
    date: "Next Batch Starts October 12, 2026",
    description:
      "For those ready to go deeper. Intermediate product frameworks and leadership skills.",
    cta: "Join The Waitlist",
    href: "/ppip#pricing",
  },
  {
    title: "Product Management Mastery Program",
    date: "Next Cohort Starts January 15, 2027",
    description:
      "For Product Managers ready to deepen their expertise and advance their careers.",
    cta: "Apply Now",
    href: "/ppmp/apply?plan=scholarship",
  },
  {
    title: "1 on 1 Coaching",
    date: "Rolling Applications Open",
    description:
      "One-on-one coaching tailored to your goals. Limited spots available each quarter.",
    cta: "Apply Now",
    href: "/ppcp/blessing-okomor",
  },
  {
    title: "Fintech Product Management Program",
    date: "Next Batch Starts October 15, 2026",
    description: "For aspiring and practicing PMs who want to build specialized Product Management skills for fintech and financial products.",
    cta: "Apply Now",
    href: "/ppfp#pricing",
  },
];

// Fallback card, shown until (or if) the event API responds.
const fallbackEvent: ProgramItem = {
  title: "November to Remember",
  date: "Nov 7–28, 2026 · 7:00 PM",
  subtitle: "The Product Career Activation Series",
  description:
    "Four Saturdays. Real conversations about getting hired, getting noticed, and finding opportunities beyond your country.",
  cta: "View Event",
  href: "/events/november-to-remember",
};

function eventToItem(event: EventDetails): ProgramItem {
  return {
    title: event.title || fallbackEvent.title,
    date: formatEventRange(event.startsAt, event.endsAt, event.timeZone),
    subtitle: event.subtitle || fallbackEvent.subtitle,
    description: event.description || fallbackEvent.description,
    cta: event.activeTier ? "Get Ticket" : "View Event",
    href: `/events/${event.slug}${event.activeTier ? "#tickets" : ""}`,
  };
}

const tabs = [
  { id: "programs", label: "Upcoming Programs" },
  { id: "events", label: "Events & Masterclasses" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function WhatsHappening() {
  const [activeTab, setActiveTab] = useState<TabId>("programs");
  const [eventItem, setEventItem] = useState<ProgramItem>(fallbackEvent);

  useEffect(() => {
    let cancelled = false;
    getEvent(NOVEMBER_EVENT_SLUG)
      .then((event) => { if (!cancelled) setEventItem(eventToItem(event)); })
      .catch(() => { /* keep the fallback card */ });
    return () => { cancelled = true; };
  }, []);

  const activeData = activeTab === "programs" ? upcomingPrograms : [eventItem];

  return (
    <section data-home-section="Upcoming"
      id="upcoming-programs"
      className="bg-[#F2EDFB] px-6 py-10 md:pt-20 sm:px-10 lg:px-16 md:pb-0"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="md:text-sm md:mb-4 mb-2 text-[12px] md:font-semibold font-medium text-[#5818D0] leading-[17.28px] tracking-[1.613px] uppercase">
              What&apos;s Next
            </p>
            <h2 className="md:mb-0 mb-3 md:block hidden md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
              What&apos;s Happening at ProductPointers
            </h2>
            <h2 className="md:mb-8 md:hidden block mb-3 md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
              What&apos;s Happening at <br /> ProductPointers
            </h2>
          </div>
          <p className="md:w-80 w-86 md:text-[15px] text-[12px] leading-4 md:leading-[151.667%] text-[#525252] sm:text-right">
            See what&apos;s coming up at ProductPointers and find your next
            opportunity to learn and grow.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 inline-flex gap-1 rounded-lg bg-[#E8E8E8] p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-sm px-4 cursor-pointer py-2 md:text-[13px] text-[12px] md:leading-[20.16px] leading-[18.842px] font-semibold transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-[#5818D0] shadow-sm"
                  : "border border-transparent font-medium text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className={`divide-y divide-[#C2C2C2] max-md:divide-y-0 overflow-hidden bg-white ${activeTab === "events" ? "rounded-lg" : ""}`}>
          {activeData.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className={activeTab === "events" ? "max-w-[640px]" : undefined}>
                <div className={`flex md:gap-6 gap-0 ${activeTab === "events" ? "flex-wrap items-start gap-y-2 md:items-center" : "items-center flex-row"}`}>
                  <h3 className="font-semibold hidden md:block text-[#0E0A1A] tracking-[-0.252px] md:text-base text-[11px] leading-[25.2px]">
                    {item.title}
                  </h3>
                  <h3 className="font-semibold w-48 block md:hidden text-[#0E0A1A] tracking-[-0.252px] md:text-base text-[11px] leading-[25.2px]">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center rounded-sm bg-[rgba(255,187,29,0.10)] px-2 py-1 md:px-3 ">
                    <span className="text-[8px] md:text-[12px] font-medium text-[#FFBB1D] leading-[17.76px]">
                      {item.date}
                    </span>
                  </span>
                </div>
                <p className="mt-2 md:text-[12px] text-[10px] md:leading-[21.08px] leading-normal text-[#5A5470]">
                  {item.subtitle && <>{item.subtitle}<br /></>}
                  {item.description}
                </p>
              </div>
              <Link
                href={item.href}
                className="w-29.25 h-7 self-start shrink-0 flex items-center justify-center rounded-md bg-[#5818D0] hover:bg-[#0A0718] md:w-auto md:h-auto md:self-auto md:px-8 md:py-3 px-0 text-[12px] md:text-sm font-semibold leading-none md:leading-[21.12px] tracking-[0.14px] md:tracking-[0.282px] text-white transition-colors cursor-pointer"
              >
                {item.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
