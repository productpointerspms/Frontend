"use client";

import { useEffect, useState } from "react";
import { getProgramByCode } from "./programs";

export interface ProgramDates {
  startTime: Date | null;
  endTime: Date | null;
}

/** Live `startTime`/`endTime` for a program code, via GET /program/get-by-code/{code}. */
export function useProgramDates(code: string): ProgramDates {
  const [dates, setDates] = useState<ProgramDates>({ startTime: null, endTime: null });

  useEffect(() => {
    let cancelled = false;
    getProgramByCode(code)
      .then((p) => {
        if (cancelled) return;
        const start = p.startTime ? new Date(p.startTime) : null;
        const end = p.endTime ? new Date(p.endTime) : null;
        setDates({
          startTime: start && !Number.isNaN(start.getTime()) ? start : null,
          endTime: end && !Number.isNaN(end.getTime()) ? end : null,
        });
      })
      .catch(() => {
        // Leave dates null — callers fall back to a "coming soon" message.
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return dates;
}

const ORDINAL_SUFFIXES = ["th", "st", "nd", "rd"];

function ordinal(day: number): string {
  const v = day % 100;
  return `${day}${ORDINAL_SUFFIXES[(v - 20) % 10] ?? ORDINAL_SUFFIXES[v] ?? ORDINAL_SUFFIXES[0]}`;
}

/** e.g. "July 8th – October 14th, 2026". */
export function formatDateRange(start: Date | null, end: Date | null): string {
  if (!start || !end) return "Dates coming soon";
  const month = (d: Date) => d.toLocaleDateString("en-US", { month: "long" });
  return `${month(start)} ${ordinal(start.getDate())} – ${month(end)} ${ordinal(
    end.getDate()
  )}, ${end.getFullYear()}`;
}

/** Whole-week span between two dates, rounded to the nearest week. */
export function formatDurationWeeks(start: Date | null, end: Date | null): string {
  if (!start || !end) return "";
  const weeks = Math.round((end.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return `${Math.max(weeks, 1)} Weeks`;
}
