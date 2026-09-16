"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

type Demo = {
  id: string;
  name: string;
  poster: string; // path under /public
  caption: string;
  youtubeId: string;
};

const demos: Demo[] = [
  {
    id: "janet",
    name: "Janet Chisom Okorie",
    poster: "/images/homepage/chisomCard.png",
    caption:
      "Janet shares her journey through the ProductPointers Internship Program and how she moved from understanding Product Management in theory to applying product thinking in practice.",
    youtubeId: "9ZTL1YoIkSE",
  },
  {
    id: "funmi",
    name: "Funmilayo Ochei",
    poster: "/images/homepage/funmiCard.png",
    caption:
      "Students presented a case study on the challenges Nigerian freelancers face with delayed international payments and unclear transaction information.",
    youtubeId: "Cu5bzRipKNI",
  },
];

export default function BuildWithItSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="bg-white px-6 py-6 pb-14 sm:px-10 lg:px-18">
      <div className="mx-auto max-w-6xl">
        <header className=" flex flex-col gap-6  pb-13.25 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-xs md:text-base md:font-semibold font-medium uppercase tracking-[1.613px] leading-[17.28px] text-[#5818D0]">
              Learning in Action
            </p>
            <h2 className="md:w-150 w-80 md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
              Don&apos;t Just Learn Product. Build With It.
            </h2>
          </div>
          <p className="md:w-120 w-86 md:text-[15px] text-[12px] leading-4 md:leading-[151.667%] text-[#525252] sm:text-right">
            At ProductPointers, learning goes beyond frameworks and
            certificates. Our learners apply what they learn to real problems,
            build product solutions and create work they can confidently
            showcase.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <AutoplayCard
            demo={demos[0]}
            isActive={activeId === demos[0].id}
            onBecomeVisible={() => setActiveId((prev) => prev ?? demos[0].id)}
          />
          <HoverPlayCard
            demo={demos[1]}
            isActive={activeId === demos[1].id}
            onPlay={() => setActiveId(demos[1].id)}
            onStop={() => setActiveId(demos[0].id)}
          />
        </div>
      </div>
    </section>
  );
}

function AutoplayCard({
  demo,
  isActive,
  onBecomeVisible,
}: {
  demo: Demo;
  isActive: boolean;
  onBecomeVisible: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onBecomeVisible();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onBecomeVisible]);

  const src = `https://www.youtube.com/embed/${demo.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${demo.youtubeId}&controls=1&rel=0&playsinline=1`;

  return (
    <div ref={containerRef}>
      <VideoCard demo={demo}>
        {isActive ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={src}
            title={demo.name}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Image
            src={demo.poster}
            alt={demo.name}
            fill
            className="object-cover"
            priority
          />
        )}
      </VideoCard>
    </div>
  );
}

function HoverPlayCard({
  demo,
  isActive,
  onPlay,
  onStop,
}: {
  demo: Demo;
  isActive: boolean;
  onPlay: () => void;
  onStop: () => void;
}) {
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice.current) onPlay();
  }, [onPlay]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice.current) onStop();
  }, [onStop]);

  const handleClick = useCallback(() => {
    if (isTouchDevice.current) {
      isActive ? onStop() : onPlay();
    } else {
      onPlay();
    }
  }, [isActive, onPlay, onStop]);

  const src = `https://www.youtube.com/embed/${demo.youtubeId}?autoplay=1&mute=1&controls=1&rel=0&playsinline=1`;

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <VideoCard demo={demo}>
        {isActive ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={src}
            title={demo.name}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }}
            aria-label={`Play video: ${demo.name}`}
            style={{ background: "transparent" }}
            className="absolute inset-0 h-full w-full cursor-pointer bg-transparent! p-0 outline-none focus-visible:ring-2 focus-visible:ring-violet-500 [&:hover]:bg-transparent! active:bg-transparent! focus:bg-transparent!"
          >
            <Image
              src={demo.poster}
              alt={demo.name}
              fill
              className="object-cover"
            />
          </div>
        )}
      </VideoCard>
    </div>
  );
}

function VideoCard({
  demo,
  children,
}: {
  demo: Demo;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden">
        {children}
      </div>

      <p className="mt-6  md:text-[13.6px] text-[10px] md:leading-[22.44px] leading-[12.914px]">
        {demo.caption}
      </p>
    </div>
  );
}
