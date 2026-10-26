"use client";
import Link from "next/link";
import { currencies, useLiveRates } from "@/lib/useLiveRates";
import styles from "./ppmp.module.css";

export default function PricingSection() {
  const { currency, setCurrency, formatLive } = useLiveRates(810000);
  return <section className={styles.section} id="pricing"><div className={styles.container}><p className={styles.eyebrow}>Invest in your growth</p><h2>Choose the Payment Plan<br /> That Works for You.</h2><div className={styles.pricing}>{[
    { name: "One-Time Payment", title: "Full Program Fee", price: 810000, features: ["Get full access to the entire program.", "Pay once, no extra fees.", "Invest in skills that boost your career."], href: "/contact?interest=ppmp-enrollment", cta: "Apply Now" },
    { name: "Scholarship", title: "Apply for a Scholarship", price: 155000, features: ["Open to talented applicants from Africa", "Support based on merit and financial need", "Limited scholarships per cohort"], href: "/ppmp/apply?plan=scholarship", cta: "Apply for Scholarship" },
  ].map((plan,index) => <article key={plan.name} className={index === 1 ? styles.featured : ""}>{index === 1 && <span className={styles.recommended}>Recommended</span>}<p>{plan.name}</p><h3>{plan.title}</h3><strong className={styles.price}>{formatLive(plan.price)}</strong><label className={styles.currency}><span aria-hidden="true">{currency.code === "NGN" ? "🇳🇬" : ""}</span><span className={styles.srOnly}>Currency for {plan.title}</span><select value={currency.code} onChange={e => { const next=currencies.find(c => c.code === e.target.value); if(next) setCurrency(next); }}>{currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}</select></label><ul>{plan.features.map(x => <li key={x}>{x}</li>)}</ul><Link href={plan.href} className={styles.button}>{plan.cta}</Link></article>)}</div></div></section>;
}
