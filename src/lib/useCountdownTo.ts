"use client";

import { useEffect, useState } from "react";

export interface CountdownParts {
  days: string;
  hours: string;
  minutes: string;
}

const ZERO: CountdownParts = { days: "00", hours: "00", minutes: "00" };

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

function partsUntil(target: Date): CountdownParts {
  const totalMinutes = Math.max(0, Math.floor((target.getTime() - Date.now()) / 60000));
  return {
    days: pad(Math.floor(totalMinutes / 1440)),
    hours: pad(Math.floor((totalMinutes % 1440) / 60)),
    minutes: pad(totalMinutes % 60),
  };
}

/** Ticking days/hours/minutes remaining until `target`; all-zero once it has passed or is null. */
export function useCountdownTo(target: Date | null): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(ZERO);

  useEffect(() => {
    if (!target) {
      setParts(ZERO);
      return;
    }

    const tick = () => setParts(partsUntil(target));
    tick();
    // Minute-level precision, so refreshing every 30s is plenty.
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [target]);

  return parts;
}
