"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { montserrat } from "@/lib/fonts";

interface StickyApplyBarProps {
  href: string;
  label: string;
  /**
   * Once any of these is on screen the bar steps aside — typically sections
   * that already show the same call to action (pricing, closing CTA) and the footer.
   */
  hideOver?: string[];
}

/**
 * Mobile-only floating CTA for program landing pages. It slides up once the
 * reader has scrolled past the hero (which carries its own apply button) and
 * tucks away again over `hideOver` sections, so the same button never shows twice.
 */
const StickyApplyBar: React.FC<StickyApplyBarProps> = ({ href, label, hideOver = ["footer"] }) => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [standDown, setStandDown] = useState(false);
  const hideOverKey = hideOver.join(",");

  useEffect(() => {
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.7);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = hideOverKey ? Array.from(document.querySelectorAll(hideOverKey)) : [];
    if (targets.length === 0) return;

    const onScreen = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setStandDown(onScreen.size > 0);
      },
      { threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [hideOverKey]);

  const visible = scrolledPastHero && !standDown;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`${montserrat.className}
        fixed inset-x-0 bottom-0 z-50
        px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3
        bg-gradient-to-t from-white via-white/95 to-transparent
        transition-all duration-300 ease-out
        lg:hidden
        ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}
      `}
    >
      <Link
        href={href}
        className="
          flex h-[52px] w-full
          items-center justify-center
          rounded-[8px]
          bg-[#5818D0]
          px-6
          text-[15px]
          font-semibold
          text-white
          shadow-[0_10px_30px_rgba(73,20,170,0.35)]
          transition-colors duration-200
          active:bg-[#4d1ba8]
        "
      >
        {label}
      </Link>
    </div>
  );
};

export default StickyApplyBar;
