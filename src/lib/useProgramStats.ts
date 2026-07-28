"use client";

import { useEffect, useState } from "react";
import { getProgramStats, type ProgramStats } from "./programs";

/** Static fallback so the homepage never shows blank/broken stats if the fetch fails. */
const DEFAULT_STATS: ProgramStats = {
  professionalsTrained: "300+",
  expertMentors: "15+",
  countriesReached: "13+",
  careerAdvancementRate: "97%",
};

/** Live homepage impact stats from GET /program/stats, falling back to static defaults. */
export function useProgramStats(): ProgramStats {
  const [stats, setStats] = useState<ProgramStats>(DEFAULT_STATS);

  useEffect(() => {
    let cancelled = false;
    getProgramStats()
      .then((live) => {
        if (!cancelled) setStats(live);
      })
      .catch(() => {
        // Keep the static fallback — a failed fetch shouldn't break the homepage.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}
