"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/app/ppcp/blessing-okomor/profile.module.css";

const options = [
  {
    id: "one-hour", name: "1-Hour Session", price: "₦30,000",
    description: "A 1-hour session with Blessing Okomor.",
    features: ["One 60-minute private coaching session", "Personalized guidance, feedback, and practical recommendations", "Personalized recommendations and actionable next steps"],
  },
  {
    id: "three-month", name: "3-Month Coaching", price: "₦500,000",
    description: "Focused support to build your skills and work toward your goals.",
    features: ["6 private one-on-one coaching sessions", "Biweekly sessions focused on your goals and challenges", "Personalized action plans and support as you work toward your goals"],
  },
  {
    id: "six-month", name: "6-Month Coaching", price: "₦700,000",
    description: "Ongoing guidance for long-term growth and development.",
    features: ["12 private one-on-one coaching sessions", "Biweekly sessions focused on long-term growth and development", "Regular progress reviews and personalized recommendations throughout the journey"],
  },
];

export default function CoachingOptions() {
  const [selected, setSelected] = useState(options[0].id);

  return (
    <section id="coaching-options" className={styles.options} aria-labelledby="options-title">
      <div className={styles.optionsHeading}>
        <div><p className={styles.eyebrow}>YOUR NEXT STEP</p><h2 id="options-title">Choose an option to get started<br className={styles.desktopBreak} /> with Blessing.</h2></div>
        <p>Choose an option, then Book a Session or<br className={styles.desktopBreak} /> Get Started with ProductPointers.</p>
      </div>
      <fieldset className={styles.plans}>
        <legend className="sr-only">Choose a coaching option</legend>
        {options.map((option, index) => (
          <div key={option.id} className={`${styles.plan} ${selected === option.id ? styles.selected : ""}`}>
            <label className={styles.planLabel}>
              <input type="radio" name="coaching-option" value={option.id} checked={selected === option.id} onChange={() => setSelected(option.id)} />
              <span>{option.name}</span>
            </label>
            <p className={styles.description}>{option.description}</p>
            <p className={styles.priceLabel}>PRICE</p>
            <p className={styles.price}>{option.price}</p>
            <ul className={styles.features}>{option.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
            <Link
              href={{ pathname: "/ppcp/apply", query: { coach: "Blessing Okomor", plan: option.id } }}
              className={selected === option.id ? styles.primary : styles.secondary}
              aria-label={`${index === 0 ? "Book a session" : "Choose plan"}: ${option.name} with Blessing Okomor`}
            >{index === 0 ? "Book a Session" : "Choose Plan"}</Link>
          </div>
        ))}
      </fieldset>
    </section>
  );
}
