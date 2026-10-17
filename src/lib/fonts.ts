import localFont from "next/font/local";

// Fonts are self-hosted (latin variable woff2 from Fontsource) instead of using
// next/font/google, so builds never depend on fetching from Google Fonts —
// that fetch was failing on Netlify's build servers.

export const geistSans = localFont({
  src: "../fonts/geist-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-geist-sans",
});

export const geistMono = localFont({
  src: "../fonts/geist-mono-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
});

export const montserrat = localFont({
  src: "../fonts/montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
});

export const bricolage = localFont({
  src: "../fonts/bricolage-grotesque-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
});

// Same face as `bricolage`, exposed under page-specific CSS variables.
export const bricolageHome = localFont({
  src: "../fonts/bricolage-grotesque-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-home-heading",
});

export const bricolagePpfp = localFont({
  src: "../fonts/bricolage-grotesque-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-ppfp-heading",
});

export const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
});
