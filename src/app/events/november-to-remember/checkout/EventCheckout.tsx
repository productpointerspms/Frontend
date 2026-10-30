"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CalendarDays, Clock3, MapPin, Minus, Plus } from "lucide-react";
import styles from "./checkout.module.css";

const titles = ["Ticket Summary", "Attendee Information", "Payment"];
const money = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function EventCheckout() {
  const params = useSearchParams();
  const late = params.get("tier") === "late";
  const price = late ? 29999 : 9999;
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [attendee, setAttendee] = useState({ firstName: "", lastName: "", email: "", phone: "", role: "", company: "", linkedin: "", expectations: "" });
  const heading = useRef<HTMLHeadingElement>(null);
  function go(next: number) {
    setStep(next);
    requestAnimationFrame(() => {
      heading.current?.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    go(3);
  }
  const field = (name: keyof typeof attendee) => ({
    id: name,
    name,
    value: attendee[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setAttendee(previous => ({ ...previous, [name]: event.target.value })),
  });

  return (
    <div className={styles.page}>
      <section className={styles.card} aria-labelledby="checkout-title">
        <header className={styles.header}>
          <div><p>STEP {step} OF 3</p><h1 id="checkout-title" ref={heading} tabIndex={-1}>{titles[step - 1]}</h1></div>
          <ol className={styles.progress} aria-label="Checkout progress">{titles.map((title, index) => <li key={title} aria-current={index + 1 === step ? "step" : undefined} className={index + 1 === step ? styles.active : ""}><span className="sr-only">{title}</span></li>)}</ol>
        </header>
        {step === 1 && <div className={styles.body}>
          <div className={styles.event}>
            <p className={styles.eyebrow}>SELECTED EVENT</p>
            <h2>NOVEMBER TO REMEMBER</h2><p className={styles.subtitle}>The Product Career Activation Series</p>
            <div className={styles.eventDetails}><span><CalendarDays /> November 7–28, 2026</span><span><Clock3 /> 7:00 PM WAT</span><span><MapPin /> Virtual</span></div>
          </div>
          <div className={styles.ticket}><div><h2>November All-Access Pass</h2><p>{late ? "Late bird" : "Early bird"} · Individual registration ticket</p></div><div className={styles.quantity}><button type="button" aria-label="Remove one ticket" disabled={quantity === 1} onClick={() => setQuantity(q => q - 1)}><Minus size={15} /></button><output aria-live="polite" aria-label="Ticket quantity">{quantity}</output><button type="button" aria-label="Add one ticket" disabled={quantity === 20} onClick={() => setQuantity(q => q + 1)}><Plus size={15} /></button></div></div>
          <div className={styles.breakdown}><div className={styles.currency}><span>🇳🇬 NGN</span></div><div><span>November to Remember Pass{quantity > 1 ? ` × ${quantity}` : ""}</span><strong>{money(price * quantity)}</strong></div><div><span>Processing Fees</span><strong>₦0</strong></div></div>
          <div className={styles.total}><h2>Total Due</h2><strong>{money(price * quantity)}</strong></div>
          <button className={styles.primary} onClick={() => go(2)}>CONTINUE TO ATTENDEE DETAILS</button>
        </div>}
        {step === 2 && <form className={`${styles.body} ${styles.form}`} onSubmit={submit}>
          <div className={styles.fields}>
            <label htmlFor="firstName">First Name *<input {...field("firstName")} required pattern=".*\S.*" autoComplete="given-name" placeholder="Blessing" maxLength={100} /></label>
            <label htmlFor="lastName">Last Name *<input {...field("lastName")} required pattern=".*\S.*" autoComplete="family-name" placeholder="Okomor" maxLength={100} /></label>
            <label className={styles.full} htmlFor="email">Email Address *<input {...field("email")} required type="email" autoComplete="email" placeholder="blessing@example.com" /></label>
            <label className={styles.full} htmlFor="phone">Phone Number *<input {...field("phone")} required type="tel" autoComplete="tel" pattern="[+0-9()\s-]{7,25}" placeholder="+234 800 000 0000" /></label>
            <label htmlFor="role">Current Role *<select {...field("role")} required><option value="" disabled>Select your role</option>{["Aspiring Product Manager", "Product Manager", "Product Designer", "Engineer / Developer", "Student", "Founder / Entrepreneur", "Other"].map(role => <option key={role}>{role}</option>)}</select></label>
            <label htmlFor="company">Company / Organisation<input {...field("company")} autoComplete="organization" placeholder="e.g. Mainstack or N/A" /></label>
            <label className={styles.full} htmlFor="linkedin">LinkedIn Profile URL (Optional)<input {...field("linkedin")} type="url" placeholder="https://www.linkedin.com/yourname" /></label>
            <label className={styles.full} htmlFor="expectations">What are your expectations for the event?<textarea {...field("expectations")} placeholder="What would you like to learn or achieve in November to Remember" rows={4} maxLength={2000} /></label>
          </div>
          <div className={styles.actions}><button className={styles.back} type="button" onClick={() => go(1)}>Back</button><button className={styles.primary} type="submit">CONTINUE TO PAYMENT</button></div>
        </form>}
        {step === 3 && <div className={styles.body}>
          <div className={styles.event}><p className={styles.eyebrow}>ORDER REVIEW</p><h2>November All-Access Pass × {quantity}</h2><p className={styles.subtitle}>{attendee.firstName} {attendee.lastName} · {attendee.email}</p></div>
          <div className={styles.total}><h2>Total Due</h2><strong>{money(price * quantity)}</strong></div>
          <p className={styles.notice} role="status">Online payment for this event is not available yet. Your registration has not been submitted and you have not been charged. Please contact <a href="mailto:support@productpointers.com">support@productpointers.com</a> for registration assistance.</p>
          <div className={styles.actions}><button className={styles.back} onClick={() => go(2)}>Back</button><Link className={styles.back} href="/events/november-to-remember#tickets">Return to event</Link></div>
        </div>}
      </section>
    </div>
  );
}
