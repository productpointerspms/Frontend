import SponsorshipTierCard, { type SponsorshipTier } from "./SponsorshipTierCard";
import { ScholarshipButton, SectionHeading } from "./ScholarshipUI";
import styles from "./scholarships.module.css";

const tiers: SponsorshipTier[] = [
  { name: "Supporter", description: "Contribute towards a partial scholarship for one learner on a ProductPointers program.", coverage: "Partial coverage", recognition: "Named in scholarship communications" },
  { name: "Champion", description: "Fund a full scholarship place for one learner covering their entire program access and materials.", coverage: "Full program access", recognition: "Named on scholarship award + community recognition", featured: true },
  { name: "Partner", description: "Fund multiple scholarship places or establish a named scholarship under your organisation’s brand.", coverage: "Multiple learners or named scholarship", recognition: "Featured sponsor + co-branded scholarship" },
];
const steps = [
  { title: "Get in touch", description: "Reach out to discuss your sponsorship interest, preferred tier, and any specific programs you’d like to support." },
  { title: "Define the sponsorship", description: "Choose a program, scholarship structure or learner sponsorship." },
  { title: "Scholar is selected", description: "We manage the full selection process, reviewing applications and identifying the strongest candidate for the scholarship." },
  { title: "See the impact", description: "Receive updates on the learner and scholarship outcome, including program completion and scholarship outcome." },
];

export default function ScholarshipSponsorship() {
  return <section id="sponsor-a-learner" className={`${styles.container} ${styles.sponsorship}`} aria-labelledby="sponsorship-title">
    <div className={styles.sponsorshipIntro}><SectionHeading eyebrow="WANT TO HELP SOMEONE ACCESS PRODUCT MANAGEMENT EDUCATION?" title={<span id="sponsorship-title">Your investment.<br />Their opportunity.</span>} /><p>Sponsor a talented learner and help make quality Product Management education more accessible to someone who is ready to grow but needs financial support.</p></div>
    <div className={styles.sectionBar}><h3>Sponsorship tiers</h3><p>All amounts are indicative. Contact us to discuss your contribution.</p></div>
    <div className={styles.tierGrid}>{tiers.map(tier => <SponsorshipTierCard key={tier.name} tier={tier} />)}</div>
    <div className={`${styles.sectionBar} ${styles.sponsoringHeading}`}><h3>How sponsoring works</h3><p>Simple, transparent, and handled by ProductPointers.</p></div>
    <ol className={styles.sponsoringSteps}>{steps.map((step, index) => <li key={step.title}><span>{index + 1}</span><h4>{step.title}</h4><p>{step.description}</p></li>)}</ol>
    <div className={styles.sponsorCTA}><div><SectionHeading eyebrow="READY TO SPONSOR?" title="Let’s make it happen." /><p>Get in touch and the ProductPointers team will walk you through the sponsorship options, answer any questions, and handle everything from there.</p></div><div className={styles.sponsorCTAActions}><ScholarshipButton href="/contact?interest=sponsorship">Sponsor a Learner</ScholarshipButton><ScholarshipButton href="/downloads/productpointers-sponsor-pack.pdf" download="ProductPointers-Sponsor-Pack.pdf" variant="white">Download sponsor pack</ScholarshipButton></div></div>
  </section>;
}
