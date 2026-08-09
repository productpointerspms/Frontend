import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SOCIAL_LINKS } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Arial = {
  variable: "--font-arial",
};

const DEFAULT_TITLE =
  "ProductPointers — Product Management Courses, Mentorship & Community";

// e.g. "https://x.com/ProductPointers" -> "@ProductPointers"
const X_HANDLE = `@${SOCIAL_LINKS.x.split("/").filter(Boolean).pop()}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Product Management course",
    "Product Manager training",
    "Product Management mentorship",
    "Product Management internship",
    "how to become a Product Manager",
    "Product Management community Africa",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/logo.png" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${Arial.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-montserrat" suppressHydrationWarning>
        <OrganizationJsonLd />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
