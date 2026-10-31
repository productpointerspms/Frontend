import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./contact.module.css";

export default function AdvisoryCTA() {
  return <section className={styles.advisorySection} aria-labelledby="advisory-title"><div className={styles.advisory}><span className={styles.ringOne} aria-hidden="true" /><span className={styles.ringTwo} aria-hidden="true" /><span className={styles.ringThree} aria-hidden="true" /><div className={styles.advisoryCopy}><p className={styles.overline}>PRACTICAL GUIDANCE</p><h2 id="advisory-title">Unsure which program fits your<br className={styles.desktopBreak} /> PM experience level?</h2><p>Our admissions advisors are available for a 15-minute diagnostic chat to help you choose between foundational courses and advanced career tracks.</p></div><Link href="#contact-message-form" className={styles.pink}>Book Advisory Call <ArrowRight size={20} aria-hidden="true" /></Link></div></section>;
}
