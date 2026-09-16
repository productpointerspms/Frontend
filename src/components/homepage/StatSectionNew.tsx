// components/StatsSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Stat {
  icon: string; // path inside /public
  value: number; // target number
  suffix: string; // "+", "%", etc.
  label: string;
}

const stats: Stat[] = [
  {
    icon: "/images/homepage/groupProfile.png",
    value: 500,
    suffix: "+",
    label: "Community Members",
  },
  {
    icon: "/images/homepage/groupProfile.png",
    value: 276,
    suffix: "+",
    label: "Professionals Trained",
  },
  {
    icon: "/images/homepage/profile.png",
    value: 15,
    suffix: "+",
    label: "Expert Mentors",
  },
  {
    icon: "/images/homepage/globalIcon.png",
    value: 13,
    suffix: "+",
    label: "Countries Reached",
  },
  {
    icon: "/images/homepage/AcademicIcon.png",
    value: 97,
    suffix: "%",
    label: "Career Advancement Rate",
  },
];

/**
 * Hook that animates a number from 0 -> target once `start` becomes true.
 */
function useCountUp(target: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // ease-out cubic for a nice deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, target, duration]);

  return value;
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const count = useCountUp(stat.value, start);

  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="md:w-16 md:h-16 w-8 h-8 flex items-center justify-center md:mb-3 mb-1">
        <Image
          src={stat.icon}
          alt={stat.label}
          width={64}
          height={64}
          className="object-contain hidden md:block"
        />
        <Image
          src={stat.icon}
          alt={stat.label}
          width={32}
          height={32}
          className="object-contain md:hidden block"
        />
      </div>

      <p className="text-3xl md:text-[48px] font-bold text-[#5818D0]">
        {count}
        {stat.suffix}
      </p>

      <p className=" text-[12px] md:text-[16px] text-black whitespace-nowrap">
        {stat.label}
      </p>

      <span className="mt-2 block w-24.25 h-0.5 bg-black" />
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full md:py-16.5 py-12 flex justify-center bg-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10 max-w-6xl w-full px-6">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} start={inView} />
        ))}
      </div>
    </section>
  );
}
