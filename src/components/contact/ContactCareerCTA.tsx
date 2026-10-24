import Image from "next/image";
import Link from "next/link";
import styles from "./contact-career.module.css";

export default function ContactCareerCTA() {
  return <section className={styles.section} aria-labelledby="contact-career-title"><div className={styles.layout}><div className={styles.photo}><Image src="/images/ppip/but.png" alt="ProductPointers community member in a pink ProductPointers shirt" fill sizes="(max-width: 767px) 100vw, 56vw" /></div><div className={styles.panel}><p className={styles.eyebrow}>TAKE THE NEXT STEP</p><h2 id="contact-career-title" className={styles.heading}>Ready to Build Your Product Management Career?</h2><p className={styles.description}>Whether you’re starting your journey, switching careers, or looking to sharpen your product skills, there’s a path for you at ProductPointers.</p><div className={styles.actions}><Link href="/#upcoming-programs" className={styles.primary}>Explore Programs</Link><Link href="/scholarships" className={styles.secondary}>Apply for a Scholarship</Link></div></div></div></section>;
}
