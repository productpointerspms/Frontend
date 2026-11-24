"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import type { ReactNode } from "react";

export default function SiteChrome({
  children,
  header,
  footer,
  structuredData,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  structuredData: ReactNode;
}) {
  // Match the rendered segment so fallback pages keep the same chrome when they hydrate.
  const segment = useSelectedLayoutSegment();
  if (segment === "admin") return children;

  return (
    <>
      {structuredData}
      <div className="relative min-h-screen flex flex-col">
        {header}
        <main className="flex-1">{children}</main>
        {footer}
      </div>
    </>
  );
}
