"use client";

import Link from "next/link";
import { Check, ChevronUp } from "lucide-react";
import { bricolage } from "@/lib/fonts";
import { currencies, useLiveRates } from "@/lib/useLiveRates";
import styles from "./pricing.module.css";

const benefits = [
  "12 weeks hands-on Product Management apprenticeship",
  "LinkedIn & personal brand optimization",
  "Review sessions and assignments",
  "Individual & Group collaborations",
  "Product documentation, MVP planning & development",
  "2-week MVP build sprint & User testing",
  "Final Live Demo presentation",
  "Certificate of Participation",
  "Access to a single one-on-one session with a mentor",
  "Access to the ProductPointers Alumni community",
];

export default function PricingSection() {
  const { currency, setCurrency, formatLive, loading, error, isLive } = useLiveRates(30000);

  return (
    <section id="pricing" data-ppip-section="PricingSection" className={styles.section} aria-labelledby="ppip-pricing-title">
      <div className={styles.container}>
        <header className={styles.header}><p>Invest in your growth</p><h2 id="ppip-pricing-title" className={bricolage.className}>Choose the Payment Plan<br />That Works for You.</h2></header>
        <article className={styles.card} aria-label="PPIP scholarship commitment fee">
          <span className={styles.badge}>Best Value</span>
          <h3 className={styles.eyebrow}>Program fee</h3>
          <p className={styles.payment}>One-time Commitment fee</p>
          <p className={`${bricolage.className} ${styles.price}`}>{formatLive(30000)}</p>
          <div className={styles.currency}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://flagcdn.com/24x18/${currency.country}.png`} alt="" width={16} height={16} />
            <select aria-label="Payment currency" value={currency.code} onChange={event => { const selected = currencies.find(item => item.code === event.target.value); if (selected) setCurrency(selected); }}>
              {currencies.map(item => <option key={item.code} value={item.code}>{item.code}</option>)}
            </select>
            <ChevronUp size={12} aria-hidden="true" />
          </div>
          {currency.code !== "NGN" && <p className={styles.rateStatus} role="status">{loading ? "Updating conversion…" : isLive ? "Live exchange rate" : error ? "Estimated exchange rate" : "Converted price"}</p>}
          <ul className={styles.benefits}>{benefits.map(benefit => <li key={benefit}><span><Check size={9} strokeWidth={2.5} aria-hidden="true" /></span><p>{benefit}</p></li>)}</ul>
          <div className={styles.divider} />
          <Link href={`/ppip/apply?plan=scholarship&currency=${currency.code}`} className={styles.apply}>Apply for the Scholarship</Link>
        </article>
      </div>
    </section>
  );
}
