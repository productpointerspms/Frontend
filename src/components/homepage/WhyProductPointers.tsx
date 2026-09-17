"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const FEATURES: Feature[] = [
  {
    id: "structured-learning",
    title: "Structured Learning",
    description:
      "Build a strong foundation with clear, practical learning designed around the skills Product Managers need.",
    image: "/images/homepage/structured-learning.png",
    imageAlt:
      "Learner joining a video call from a home desk setup, with onboarding screen share",
  },
  {
    id: "experienced-practitioners",
    title: "Learn From Experienced Practitioners",
    description:
      "Get guidance and feedback from Product professionals with real-world experience.",
    image: "/images/homepage/experienced-practitioners.png",
    imageAlt: "Practitioner leading a discussion in a meeting room",
  },
  {
    id: "career-focused-learning",
    title: "Practical, Career-Focused Learning",
    description:
      "Move beyond theory by applying what you learn through assignments, projects and real-world challenges.",
    image: "/images/homepage/career-focused-learning.png",
    imageAlt: "Learner working on a laptop in a co-working space",
  },
  {
    id: "community-growth",
    title: "A Community That Supports Your Growth",
    description:
      "Learn alongside a network of product-minded peers, growing beyond the classroom.",
    image: "/images/homepage/community-growth.png",
    imageAlt: "A cohort of graduates celebrating together",
  },
];

const TRANSITION_MS = 550;

type Layer = {
  feature: Feature;
  layerKey: number;

  phase: "entering" | "active" | "leaving";
};

export default function WhyProductPointers() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const [layers, setLayers] = useState<Layer[]>([
    { feature: FEATURES[0], layerKey: 0, phase: "active" },
  ]);
  const nextKey = useRef(1);

  const selectFeature = (feature: Feature) => {
    setActiveId(feature.id);
    setLayers((prev) => {
      if (prev[prev.length - 1]?.feature.id === feature.id) return prev;
      const stillLeaving = prev.map((layer) => ({
        ...layer,
        phase: "leaving" as const,
      }));
      return [
        ...stillLeaving,
        { feature, layerKey: nextKey.current++, phase: "entering" as const },
      ];
    });
  };

  useEffect(() => {
    if (!layers.some((layer) => layer.phase === "entering")) return;
    const raf = requestAnimationFrame(() => {
      setLayers((prev) =>
        prev.map((layer) =>
          layer.phase === "entering" ? { ...layer, phase: "active" } : layer,
        ),
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [layers]);

  // Once a 'leaving' layer has finished animating out, remove it from the DOM.
  useEffect(() => {
    if (!layers.some((layer) => layer.phase === "leaving")) return;
    const timeout = setTimeout(() => {
      setLayers((prev) => prev.filter((layer) => layer.phase !== "leaving"));
    }, TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [layers]);

  return (
    <section className="relative overflow-hidden bg-[rgba(88,24,208,0.08)] py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-full sm:block sm:w-3/5"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(109,40,217,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(109,40,217,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "linear-gradient(to left, black 40%, transparent 100%)",
          maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end md:gap-10">
          <div>
            <p className="md:text-sm text-[12px]  md:font-semibold font-medium tracking-[1.613px] leading-[17.28px] uppercase text-[#5818D0]">
              Why ProductPointers
            </p>
            <h2 className="md:mt-4 text-[20px] md:w-150 tracking-[-1.134px] font-semibold md:font-bold md:leading-[43.47px] leading-normal text-[#0E0A1A] md:text-[30.8px]">
              More Than a Course. A Path to Becoming a Product Manager.
            </h2>
          </div>
          <p className="md:text-[15px] text-[12px] md:w-110 md:leading-5 leading-4 text-[#525252] md:ml-28 md:text-right">
            ProductPointers provides the knowledge, practice, feedback, and
            guidance needed to become a globally competitive product manager.
          </p>
        </div>

        {/* Feature list + image */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:mt-16 lg:gap-16">
          {/* Feature list — appears first, stacked on mobile */}
          <ul className="order-1 space-y-1 md:order-1">
            {FEATURES.map((feature) => {
              const isActive = feature.id === activeId;
              return (
                <li key={feature.id}>
                  <button
                    type="button"
                    onClick={() => selectFeature(feature)}
                    aria-pressed={isActive}
                    className={`w-full border-l-2 py-3 pl-4 text-left transition-colors duration-200 ${
                      isActive
                        ? "border-[#5818D0]"
                        : "border-[#C2C2C2] hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`block font-semibold md:text-base text-sm leading-6 tracking-[-0.16px] transition-colors duration-200 ${
                        isActive ? "text-[#5818D0]" : "text-[#C2C2C2]"
                      }`}
                    >
                      {feature.title}
                    </span>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isActive
                          ? "mt-4 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden text-[12px] leading-normal text-[#525252] md:leading-[23.664px]">
                        {feature.description}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative order-2 md:order-2">
            <div className="relative  h-100 w-full -mt-8 md:mt-0">
              {layers.map((layer, i) => {
                const isSettledIn = layer.phase === "active";
                return (
                  <Image
                    key={layer.layerKey}
                    src={layer.feature.image}
                    alt={layer.feature.imageAlt}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className={`absolute inset-0 object-contain transition-all ease-out ${
                      isSettledIn
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-1 scale-[0.97] opacity-0"
                    }`}
                    style={{ transitionDuration: `${TRANSITION_MS}ms` }}
                    priority={i === 0}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
