import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./scholarships.module.css";

export function ScholarshipButton({ children, href, variant = "primary", download }: { children: ReactNode; href: string; variant?: "primary" | "outline" | "pink" | "dark" | "white"; download?: string }) {
  const className = `${styles.button} ${styles[variant]}`;
  return download ? <a className={className} href={href} download={download}>{children}</a> : <Link className={className} href={href}>{children}</Link>;
}

export function SectionHeading({ eyebrow, title, className = "" }: { eyebrow?: string; title: ReactNode; className?: string }) {
  return <div className={className}>{eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}<h2 className={styles.heading}>{title}</h2></div>;
}
