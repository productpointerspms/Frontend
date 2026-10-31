import Image from "next/image";
import Link from "next/link";
import styles from "./homepage.module.css";

export default function HeroSection() {
  return <>
    <section data-home-section="Hero" className={styles.hero} aria-labelledby="home-title">
      <Image src="/images/homepage/heroBg.jpeg" alt="" fill priority sizes="100vw" className={styles.heroDesktopImage} />
      <Image src="/images/homepage/herobgmo.jpeg" alt="" fill priority sizes="100vw" className={styles.heroMobileImage} />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroContent}>
        <p className={styles.heroBadge}>RAISING WORLD-CLASS PRODUCT TALENT</p>
        <h1 id="home-title">Become a Globally Competitive <span>Product Manager.</span></h1>
        <p className={styles.heroDescription}>Whether you’re aspiring to break into Product Management, transitioning from another career, or growing in your early Product career, we give you the structured learning, practical experience and mentorship you need to build real skills, demonstrate what you can do and confidently pursue opportunities.</p>
        <div className={styles.heroActions}><Link href="#our-programs" className={styles.primary}>Explore Programs</Link><Link href="/scholarships" className={styles.outline}>Apply for a Scholarship</Link></div>
        <p className={styles.heroNote}>Quality Product Management education, made accessible and affordable.</p>
      </div>
    </section>
    <div id="hero-sentinel" className="h-px" aria-hidden="true" />
  </>;
}
