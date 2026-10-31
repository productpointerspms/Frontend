"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import {
  ATTENDEE_ROLES,
  NOVEMBER_EVENT_SLUG,
  TIER_STATUS_LABEL,
  formatMoney,
  getEvent,
  startEventCheckout,
  type CheckoutResult,
  type EventDetails,
} from "@/lib/event";
import styles from "./checkout.module.css";

const titles = ["Ticket Summary", "Attendee Information", "Payment"];

export default function EventCheckout() {
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [attendee, setAttendee] = useState({ firstName: "", lastName: "", email: "", phone: "", role: "", company: "", linkedin: "", expectations: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<CheckoutResult | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let cancelled = false;
    getEvent(NOVEMBER_EVENT_SLUG)
      .then(data => { if (!cancelled) setEvent(data); })
      .catch(err => { if (!cancelled) setLoadError(err instanceof Error ? err.message : "Could not load the event."); });
    return () => { cancelled = true; };
  }, []);

  const tier = event?.activeTier ?? null;
  const currency = tier?.currency ?? event?.currency ?? "NGN";

  function go(next: number) {
    setStep(next);
    requestAnimationFrame(() => {
      heading.current?.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  async function submit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await startEventCheckout(NOVEMBER_EVENT_SLUG, {
        firstName: attendee.firstName.trim(),
        lastName: attendee.lastName.trim(),
        email: attendee.email.trim(),
        phoneNumber: attendee.phone.replace(/[\s()-]/g, ""),
        currentRole: attendee.role,
        company: attendee.company.trim() || undefined,
        linkedInProfile: attendee.linkedin.trim() || undefined,
        expectations: attendee.expectations.trim() || undefined,
      });
      setCheckout(result);
      go(3);
      window.location.assign(result.paymentLink);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not start checkout. Please try again.");
      setSubmitting(false);
    }
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
            <h2>{(event?.title ?? "November to Remember").toUpperCase()}</h2><p className={styles.subtitle}>{event?.subtitle ?? "The Product Career Activation Series"}</p>
            <div className={styles.eventDetails}><span><CalendarDays /> November 7–28, 2026</span><span><Clock3 /> 7:00 PM WAT</span><span><MapPin /> {event?.venue ?? "Virtual"}</span></div>
          </div>
          {!event && !loadError && <p className={styles.notice} role="status">Loading ticket details…</p>}
          {loadError && <p className={styles.notice} role="alert">We couldn&apos;t load ticket details right now. Please refresh the page or contact <a href="mailto:support@productpointers.com">support@productpointers.com</a>.</p>}
          {event && !tier && <div className={styles.notice} role="status">
            <p>Tickets aren&apos;t on sale right now.</p>
            <ul>{event.tiers.map(t => <li key={t.id}>{t.name}: {TIER_STATUS_LABEL[t.status] ?? t.status}</li>)}</ul>
          </div>}
          {tier && <>
            <div className={styles.ticket}><div><h2>{tier.name}</h2><p>{tier.description}</p></div></div>
            <div className={styles.breakdown}><div className={styles.currency}><span>{currency === "NGN" ? "🇳🇬 " : ""}{currency}</span></div><div><span>{tier.name}</span><strong>{formatMoney(tier.price, currency)}</strong></div><div><span>Processing Fees</span><strong>{formatMoney(0, currency)}</strong></div></div>
            <div className={styles.total}><h2>Total Due</h2><strong>{formatMoney(tier.price, currency)}</strong></div>
          </>}
          <button className={styles.primary} disabled={!tier} onClick={() => go(2)}>CONTINUE TO ATTENDEE DETAILS</button>
        </div>}
        {step === 2 && <form className={`${styles.body} ${styles.form}`} onSubmit={submit}>
          <div className={styles.fields}>
            <label htmlFor="firstName">First Name *<input {...field("firstName")} required pattern=".*\S.*" autoComplete="given-name" placeholder="Blessing" maxLength={100} /></label>
            <label htmlFor="lastName">Last Name *<input {...field("lastName")} required pattern=".*\S.*" autoComplete="family-name" placeholder="Okomor" maxLength={100} /></label>
            <label className={styles.full} htmlFor="email">Email Address *<input {...field("email")} required type="email" autoComplete="email" placeholder="blessing@example.com" /></label>
            <label className={styles.full} htmlFor="phone">Phone Number *<input {...field("phone")} required type="tel" autoComplete="tel" pattern="[+0-9()\s-]{7,25}" placeholder="+234 800 000 0000" /></label>
            <label htmlFor="role">Current Role *<select {...field("role")} required><option value="" disabled>Select your role</option>{ATTENDEE_ROLES.map(role => <option key={role.value} value={role.value}>{role.label}</option>)}</select></label>
            <label htmlFor="company">Company / Organisation<input {...field("company")} autoComplete="organization" placeholder="e.g. Mainstack or N/A" /></label>
            <label className={styles.full} htmlFor="linkedin">LinkedIn Profile URL (Optional)<input {...field("linkedin")} type="url" placeholder="https://www.linkedin.com/yourname" /></label>
            <label className={styles.full} htmlFor="expectations">What are your expectations for the event?<textarea {...field("expectations")} placeholder="What would you like to learn or achieve in November to Remember" rows={4} maxLength={2000} /></label>
          </div>
          {submitError && <p className={styles.notice} role="alert">{submitError}</p>}
          <div className={styles.actions}><button className={styles.back} type="button" disabled={submitting} onClick={() => go(1)}>Back</button><button className={styles.primary} type="submit" disabled={submitting}>{submitting ? "STARTING PAYMENT…" : "CONTINUE TO PAYMENT"}</button></div>
        </form>}
        {step === 3 && checkout && <div className={styles.body}>
          <div className={styles.event}><p className={styles.eyebrow}>ORDER REVIEW</p><h2>{checkout.tier.name}</h2><p className={styles.subtitle}>{attendee.firstName} {attendee.lastName} · {attendee.email}</p></div>
          <div className={styles.total}><h2>Total Due</h2><strong>{formatMoney(checkout.amount, checkout.currency)}</strong></div>
          <p className={styles.notice} role="status">Redirecting you to our secure payment page… If nothing happens, <a href={checkout.paymentLink}>continue to payment</a>.</p>
          <div className={styles.actions}><Link className={styles.back} href="/events/november-to-remember#tickets">Return to event</Link></div>
        </div>}
      </section>
    </div>
  );
}
