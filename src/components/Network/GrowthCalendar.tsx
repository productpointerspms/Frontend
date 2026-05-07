import React from "react";

/* ===================== TYPES ===================== */
type CalendarEvent = {
  title: string;
  time: string;
};

type EventsByDay = Record<number, CalendarEvent[]>;

/* ===================== EVENTS ===================== */
const events: EventsByDay = {
  4: [{ title: "Book Reading Session", time: "6:00 PM" }],
  8: [{ title: "Clarity & Confidence Workshop", time: "6:00 PM" }],
  11: [{ title: "Book Reading Session", time: "6:00 PM" }],
  15: [{ title: "Financial Growth Workshop", time: "4:30 PM" }],
  18: [{ title: "Book Reading Session", time: "6:00 PM" }],
  19: [{ title: "Community Prayer Session", time: "6:00 PM" }],
  22: [{ title: "Personal Branding Masterclass", time: "3:00 PM" }],
  25: [{ title: "Book Reading Session", time: "6:00 PM" }],
  26: [{ title: "Peer Networking & Collaboration Circle", time: "5:00 PM" }],
  29: [{ title: "Community Prayer Session", time: "6:00 PM" }],
};

/* ===================== COMPONENT ===================== */
const GrowthCalendarSection: React.FC = () => {
  return (
    <section className="w-full py-20 bg-white">
      {/* ===================== HEADING ===================== */}
      <div className="max-w-[882px] mx-auto text-center px-4">
        <h2 className="font-montserrat font-bold text-[#15010D] text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[60px]">
          Take a Look at How Our
          <br />
          Professionals Are Growing
        </h2>

        <p className="mt-4 text-[#15010D]/70 text-base sm:text-lg">
          Every week, our network hosts exclusive events, training, and growth
          sessions. Here’s what’s coming up!
        </p>
      </div>

      {/* ===================== CALENDAR WRAPPER ===================== */}
      <div className="mt-16 px-4">
        <div className="max-w-[1280px] mx-auto bg-white border border-[#5C1CC5] rounded-3xl overflow-hidden">
          {/* ===================== CALENDAR HEADER ===================== */}
          <div className="bg-[#5C1CC5] text-white px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Left */}
              <div>
                <h3 className="text-2xl font-semibold">Growth Calendar</h3>
                <p className="text-sm opacity-90">
                  Your personalized PM development schedule
                </p>

                {/* Tabs */}
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 bg-white text-[#5C1CC5] rounded-lg text-sm font-medium">
                    This Week
                  </button>
                  <button className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-sm">
                    Month View
                  </button>
                  <button className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-sm">
                    My Goals
                  </button>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 text-sm">
                <button className="text-white text-xl">‹</button>
                <span className="font-medium">October 2025</span>
                <button className="text-white text-xl">›</button>
              </div>
            </div>
          </div>

          {/* ===================== CALENDAR BODY ===================== */}
          <div className="p-6">
            {/* Days */}
            <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-4">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const dayEvents = events[day];

                return (
                  <div
                    key={day}
                    className="min-h-[120px] rounded-xl bg-[#FAE1FF] p-3 text-sm flex flex-col"
                  >
                    {/* Date */}
                    <span className="text-[#15010D] font-medium">{day}</span>

                    {/* Events */}
                    {dayEvents?.map(
                      (event: CalendarEvent, idx: number) => (
                        <div
                          key={idx}
                          className="mt-2 rounded-lg bg-[#8F3CF7] px-3 py-2 text-xs text-white"
                        >
                          <p className="font-medium leading-tight">
                            {event.title}
                          </p>
                          <p className="opacity-90">{event.time}</p>
                        </div>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthCalendarSection;