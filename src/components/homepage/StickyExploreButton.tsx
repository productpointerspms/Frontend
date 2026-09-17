"use client";

import Link from "next/link";

export default function StickyExploreBar({ href = "#programs" }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center 
                 bg-white px-4 py-6 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] 
                 md:hidden"
    >
      <Link
        href={href}
        className=" max-w-sm rounded-md bg-[#5B21B6] px-8 py-3 
                   text-center text-sm font-semibold text-white 
                   transition-transform active:scale-95"
      >
        Explore Programs
      </Link>
    </div>
  );
}
