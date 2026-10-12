import { ScholarshipButton } from "./ScholarshipUI";
import styles from "./scholarships.module.css";

export type SponsorshipTier = { name: string; description: string; coverage: string; recognition: string; featured?: boolean };

export default function SponsorshipTierCard({ tier }: { tier: SponsorshipTier }) {
  return <article className={`${styles.tierCard} ${tier.featured ? styles.featuredTier : ""}`}><div className={styles.tierTitle}><h3>{tier.name}</h3>{tier.featured && <span>Most chosen</span>}</div><p className={styles.tierDescription}>{tier.description}</p><dl className={styles.tierDetails}><div><dt>Coverage</dt><dd>{tier.coverage}</dd></div><div><dt>Recognition</dt><dd>{tier.recognition}</dd></div></dl><ScholarshipButton href={`/contact?interest=sponsorship&tier=${encodeURIComponent(tier.name)}`} variant={tier.featured ? "white" : "dark"}>Get in touch</ScholarshipButton></article>;
}
