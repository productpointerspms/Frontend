import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "ProductPointers | Scholarships",
  description: "Scholarships and product management programs from ProductPointers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteChrome>{children}</SiteChrome></body></html>;
}
