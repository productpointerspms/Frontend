import Image from "next/image";
import Link from "next/link";
import styles from "./contact.module.css";

export default function ContactCareerCTA() {
  return <section className={styles.career} aria-labelledby="contact-career-title"><div className={styles.careerLayout}><div className={styles.careerImage}><Image src="/images/ppip/but.png" alt="ProductPointers community member in a pink ProductPointers shirt" fill sizes="(max-width: 767px) 100vw, 58vw" /></div><div className={styles.careerCard}><p className={styles.overline}>TAKE THE NEXT STEP</p><h2 id="contact-career-title">Ready to Build Your Product<br className={styles.desktopBreak} /> Management Career?</h2><p>Whether you’re starting your journey, switching careers, or looking to sharpen your product skills, there’s a path for you at ProductPointers.</p><div className={styles.careerActions}><Link href="/#upcoming-programs" className={styles.pink}>Explore Programs</Link><Link href="/scholarships" className={styles.outline}>Apply for a Scholarship</Link></div></div></div></section>;
}
