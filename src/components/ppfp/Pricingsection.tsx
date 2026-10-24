"use client";

import Link from "next/link";
import { Check, ChevronUp } from "lucide-react";
import { currencies, useLiveRates } from "@/lib/useLiveRates";
import styles from "./pricing.module.css";

const plans = [
  {
    id: "once",
    eyebrow: "Pay once",
    title: "Best Value",
    amount: 300000,
    features: [
      "8 weeks of fintech learning",
      "2-week capstone project",
      "Live sessions & practical exercises",
      "Product teardowns & Fintech case studies",
      "Assignments & Cohort collaboration",
      "Capstone project",
      "Student support",
      "Certificate of completion",
    ],
    cta: "Enrol Now",
    featured: true,
  },  {
    id: "three",
    eyebrow: "Pay in 3 installments",
    title: "Split your tuition into three payments",
    amount: 110000,
    features: [
      "Total: ₦330,000",
      "Full program access",
      "Three flexible instalments",
    ],
    cta: "Choose This Plan",
  },
  {
    id: "two",
    eyebrow: "Pay in 2 installments",
    title: "Split your tuition into two payments",
    amount: 150000,
    features: [
      "Total: ₦300,000",
      "Full program access",
      "Two flexible instalments",
    ],
    cta: "Choose This Plan",
  },
];

export default function PricingSection() {
  const { currency, setCurrency, formatLive, loading, isLive, error } = useLiveRates(300000);
  return (
    <section id="pricing" className={styles.section} aria-labelledby="ppfp-pricing-title">
      <div className={styles.container}>
        <header className={styles.header}><p>Pricing</p><h2 id="ppfp-pricing-title">Invest in the fintech expertise<br className={styles.desktopBreak} /> you can take with you.</h2></header>
        <div className={styles.table}>
          {plans.map(plan => <article key={plan.id} className={`${styles.plan} ${plan.featured ? styles.featured : ""}`}>
            <div className={styles.planHeader}><p>{plan.eyebrow}</p>{plan.featured && <span>Recommended</span>}</div>
            <h3>{plan.title}</h3>
            <p className={styles.price}>{formatLive(plan.amount)}</p>
            <div className={styles.currency}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://flagcdn.com/24x18/${currency.country}.png`} width={16} height={16} alt="" />
              <select aria-label={`Currency for ${plan.eyebrow}`} value={currency.code} onChange={event => { const selected = currencies.find(item => item.code === event.target.value); if (selected) setCurrency(selected); }}>{currencies.map(item => <option key={item.code} value={item.code}>{item.code}</option>)}</select>
              <ChevronUp size={12} aria-hidden="true" />
            </div>
            <ul className={styles.features}>{plan.features.map(feature => <li key={feature}><span><Check size={9} strokeWidth={2.5} aria-hidden="true" /></span><p>{feature}</p></li>)}</ul>
            <div className={styles.planFooter}><div className={styles.divider} /><Link href={{ pathname: "/contact", query: { interest: "ppfp-enrollment", plan: plan.id, currency: currency.code } }} className={styles.apply}>{plan.cta}</Link></div>
          </article>)}
        </div>
        {currency.code !== "NGN" && <p className={styles.rateStatus} role="status">{loading ? "Updating currency conversion…" : isLive ? "Prices converted using live exchange rates." : error ? "Estimated conversion. Confirm payment details with our team." : "Prices shown in your selected currency."}</p>}
        <aside className={styles.scholarship} aria-labelledby="ppfp-scholarship-title"><div><h3 id="ppfp-scholarship-title">Ready to Join, but Need Financial Support?</h3><p>You may be eligible for scholarship support towards your FinTech Product Management training. Explore the available opportunities and find out how to apply.</p></div><Link href="/ppfp/apply?plan=scholarship">Check Scholarship Eligibility</Link></aside>
      </div>
    </section>
  );
}
