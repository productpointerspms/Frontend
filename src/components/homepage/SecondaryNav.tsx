"use client";

import React from "react";
import Link from "next/link";

const SecondaryNav: React.FC = () => {
  const links = [
    "What Drives Us",
    "Why ProductPointer",
    "Pillars",
    "Roadmap",
    "Upcoming Programs",
    "Founder",
    "Community",
    "Alumni",
    "FAQ",
  ];

  return (
    <div className="w-full bg-[#FCF1FF] border-purple-100 border-t md:border-b">

      {/* ✅ DESKTOP LAYOUT */}
      <nav
        className="
          hidden md:flex 
          w-full 
          px-20 py-8
          items-center justify-center gap-6 
          text-purple-700 font-medium
        "
      >
        {links.map((link, index) => (
          <React.Fragment key={link}>
            <Link
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-purple-900 transition"
            >
              {link}
            </Link>

            {/* Vertical divider */}
            {index !== links.length - 1 && (
              <span className="h-6 w-[1.5px] bg-purple-300" />
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* ✅ MOBILE LAYOUT */}
      <div className="md:hidden">
        <nav
          className="
            flex 
            w-full max-w-[343px] mx-auto 
            flex-wrap justify-center items-center 
            gap-2 py-3
            text-xs text-purple-700 font-medium
          "
        >
          {links.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-purple-900 transition"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* ✅ LINE UNDER MOBILE NAV */}
        <div className="w-full h-[1.5px] bg-purple-200"></div>
      </div>
    </div>
  );
};

export default SecondaryNav;
