import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./community-closing.module.css";
import { montserrat, bricolage } from "@/lib/fonts";

type CommunityLowerHeroProps = {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
};

export default function CommunityLowerHero({
  eyebrow = "TAKE THE NEXT STEP",
  title = <>Ready to Build Your Product <br className="hidden sm:block" />Management Career?</>,
  description = "Whether you're starting your journey, switching careers, or looking to sharpen your product skills, there's a path for you at ProductPointers.",
  primaryAction = { label: "Explore Programs", href: "/community#path-to-community" },
  secondaryAction = { label: "Apply for a Scholarship", href: "/ppap/apply?plan=scholarship" },
  imageSrc = "/images/ppip/but.png",
  imageAlt = "ProductPointers community member",
}: CommunityLowerHeroProps) {
  return (
    <section className={`${montserrat.className} ${styles.section}`} aria-labelledby="community-closing-title">
      <div className={styles.layout}>
        <div className={styles.photo}><Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 1440px) 812px, (min-width: 1024px) 57vw, 100vw" /></div>
        <div className={styles.panel}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id="community-closing-title" className={`${bricolage.className} ${styles.heading}`}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}><Link href={primaryAction.href} className={styles.primary}>{primaryAction.label}</Link><Link href={secondaryAction.href} className={styles.secondary}>{secondaryAction.label}</Link></div>
        </div>
      </div>
    </section>
  );
}
