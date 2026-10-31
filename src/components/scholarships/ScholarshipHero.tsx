import Image from "next/image";
import { ScholarshipButton } from "./ScholarshipUI";
import styles from "./scholarships.module.css";

const benefits = ["Tuition support", "Quality PM education", "Practical learning", "Limited slots"];

export default function ScholarshipHero() {
  return <section className={styles.hero} aria-labelledby="scholarship-hero-title">
    <Image src="/images/scholarships/hero-background.png" alt="" fill priority sizes="100vw" className={styles.heroBackground} />
    <div className={styles.heroInner}>
      <span className={styles.heroEyebrow}>PRODUCTPOINTERS SCHOLARSHIPS</span>
      <h1 id="scholarship-hero-title"><span>Get the Support</span> You Need to Start or Advance Your Product Management Journey.</h1>
      <p>Explore available ProductPointers scholarships and tuition sponsorship opportunities designed to make quality Product Management education more accessible.</p>
      <div className={styles.actions}><ScholarshipButton href="#available-scholarships">View Available Scholarships</ScholarshipButton><ScholarshipButton href="#sponsor-a-learner" variant="outline">Sponsor a Learner</ScholarshipButton></div>
      <div className={styles.heroBenefitsMarquee}>
        <div className={styles.heroBenefitsTrack}>
          {[0, 1].map(copy => <ul key={copy} className={styles.heroBenefits} aria-hidden={copy === 1 ? true : undefined}>{benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>)}
        </div>
      </div>
    </div>
  </section>;
}
