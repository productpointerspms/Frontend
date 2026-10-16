// components/HashScroll.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Wait a moment so the target section has rendered
    const timer = setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
