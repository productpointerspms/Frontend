"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isSponsorHomepage = pathname === "/";

  if (!isSponsorHomepage) {
    return children;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
