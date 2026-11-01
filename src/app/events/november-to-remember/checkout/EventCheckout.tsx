"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { openPaystack } from "@/lib/paystack";
import { CalendarDays, Clock3, MapPin, Check, Mail, ArrowRight, Loader2 } from "lucide-react";
import {
  ATTENDEE_ROLES,
  NOVEMBER_EVENT_SLUG,
  tierStatusLabel,
  formatMoney,
  getEvent,
  getTicketStatus,
  startEventCheckout,
  type CheckoutResult,
  type EventDetails,
  type TicketStatusResult,
} from "@/lib/event";
import styles from "./checkout.module.css";

const titles = ["Ticket Summary", "Attendee Information", "Registration Confirmed"];

/** Keeps only the national number: drops anything that isn't a digit, a pasted 234 country code and the trunk 0. */
function nationalNumber(input: string): string {
  const digits = input.replace(/\D/g, "");
  return (digits.startsWith("234") && digits.length > 10 ? digits.slice(3) : digits).replace(/^0/, "").slice(0, 10);
}
const toNigerianE164 = (input: string) => `+234${nationalNumber(input)}`;

export default function EventCheckout() {
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [attendee, setAttendee] = useState({ firstName: "", lastName: "", email: "", phone: "", role: "", company: "", linkedin: "", expectations: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<CheckoutResult | null>(null);
  const [confirmed, setConfirmed] = useState<TicketStatusResult | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationAttempt, setVerificationAttempt] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let cancelled = false;
    getEvent(NOVEMBER_EVENT_SLUG)
      .then(data => { if (!cancelled) setEvent(data); })
      .catch(err => { if (!cancelled) setLoadError(err instanceof Error ? err.message : "Could not load the event."); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!checkout || confirmed) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    setVerifying(true);
    setVerificationMessage("Waiting for payment confirmation. Complete payment in the Paystack popup.");
    async function verify() {
      try {
        const status = await getTicketStatus(checkout!.reference);
        if (cancelled) return;
        if (status.status === "PAID") {
          setConfirmed(status);
          setVerifying(false);
          setStep(3);
          requestAnimationFrame(() => {
            heading.current?.focus();
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
          return;
        }
        if (["FAILED", "CANCELLED", "EXPIRED"].includes(status.status)) {
          setVerifying(false);
          setVerificationMessage("Payment has not been completed. Contact support with your reference if you were charged.");
          return;
        }
      } catch {
        if (cancelled) return;
        setVerificationMessage("We could not confirm your payment yet. If you were charged, check again before making another payment.");
      }
      if (cancelled) return;
      attempts += 1;
      if (attempts >= 40) {
        setVerifying(false);
        setVerificationMessage("Payment confirmation is taking longer than expected. If you have paid, check the status again. Please do not pay twice.");
        return;
      }
      timer = setTimeout(verify, 3000);
    }
    void verify();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [checkout, confirmed, verificationAttempt]);

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
      const result = checkout ?? await startEventCheckout(NOVEMBER_EVENT_SLUG, {
        firstName: attendee.firstName.trim(),
        lastName: attendee.lastName.trim(),
        email: attendee.email.trim(),
        phoneNumber: toNigerianE164(attendee.phone),
        currentRole: attendee.role,
        company: attendee.company.trim() || undefined,
        linkedInProfile: attendee.linkedin.trim() || undefined,
        expectations: attendee.expectations.trim() || undefined,
      });
      setCheckout(result);
      await openPaystack(result.paymentLink);
      setSubmitting(false);
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
            <ul>{event.tiers.map(t => <li key={t.id}>{t.name}: {tierStatusLabel(t.status)}</li>)}</ul>
          </div>}
          {tier && <>
            <div className={styles.ticket}><div><h2>{tier.name}</h2><p>{tier.description}</p></div></div>
            <div className={styles.breakdown}><div className={styles.currency}><span>{currency === "NGN" ? "🇳🇬 " : ""}{currency}</span></div><div><span>{tier.name}</span><strong>{formatMoney(tier.price, currency)}</strong></div><div><span>Processing Fees</span><strong>{formatMoney(0, currency)}</strong></div></div>
            <div className={styles.total}><h2>Total Due</h2><strong>{formatMoney(tier.price, currency)}</strong></div>
          </>}
          <button className={styles.primary} disabled={!tier} onClick={() => go(2)}>CONTINUE TO ATTENDEE DETAILS</button>
        </div>}
        {step === 2 && <form className={`${styles.body} ${styles.form}`} onSubmit={submit}>
          <fieldset className={styles.fields} disabled={submitting || !!checkout}>
            <label htmlFor="firstName">First Name *<input {...field("firstName")} required pattern=".*\S.*" autoComplete="given-name" placeholder="Blessing" maxLength={100} /></label>
            <label htmlFor="lastName">Last Name *<input {...field("lastName")} required pattern=".*\S.*" autoComplete="family-name" placeholder="Okomor" maxLength={100} /></label>
            <label className={styles.full} htmlFor="email">Email Address *<input {...field("email")} required type="email" autoComplete="email" placeholder="blessing@example.com" /></label>
            <label className={styles.full} htmlFor="phone">Phone Number *
              <span className={styles.phone}>
                <span className={styles.dialCode} aria-hidden="true">🇳🇬 +234</span>
                <input {...field("phone")} onChange={e => setAttendee(previous => ({ ...previous, phone: nationalNumber(e.target.value) }))} required type="tel" inputMode="numeric" autoComplete="tel-national" pattern="[789][01][0-9]{8}" title="Enter your 10-digit Nigerian number, e.g. 803 123 4567" aria-describedby="phone-hint" placeholder="803 123 4567" />
              </span>
              <span id="phone-hint" className="sr-only">Nigerian number; +234 is added for you</span>
            </label>
            <label htmlFor="role">Current Role *<select {...field("role")} required><option value="" disabled>Select your role</option>{ATTENDEE_ROLES.map(role => <option key={role.value} value={role.value}>{role.label}</option>)}</select></label>
            <label htmlFor="company">Company / Organisation<input {...field("company")} autoComplete="organization" placeholder="e.g. Mainstack or N/A" /></label>
            <label className={styles.full} htmlFor="linkedin">LinkedIn Profile URL (Optional)<input {...field("linkedin")} type="url" placeholder="https://www.linkedin.com/yourname" /></label>
            <label className={styles.full} htmlFor="expectations">What are your expectations for the event?<textarea {...field("expectations")} placeholder="What would you like to learn or achieve in November to Remember" rows={4} maxLength={2000} /></label>
          </fieldset>
          {checkout && <div className={styles.notice} role="status"><p>{verifying && <Loader2 className={styles.spinner} size={16} />} {verificationMessage}</p><p className={styles.reference}>Reference: {checkout.reference}</p>{!verifying && <button type="button" className={styles.back} onClick={() => setVerificationAttempt(value => value + 1)}>Check payment status</button>}</div>}
          {submitError && <p className={styles.notice} role="alert">{submitError}</p>}
          <div className={styles.actions}><button className={styles.back} type="button" disabled={submitting || !!checkout} onClick={() => go(1)}>Back</button><button className={styles.primary} type="submit" disabled={submitting}>{submitting ? "OPENING PAYMENT…" : checkout ? "REOPEN PAYSTACK CHECKOUT" : "CONTINUE TO PAYMENT"}</button></div>
        </form>}
        {step === 3 && checkout && confirmed && <div className={`${styles.body} ${styles.success}`}>
          <div className={styles.successIcon}><Check size={38} strokeWidth={2.5} aria-hidden="true" /></div>
          <p className={styles.eyebrow}>YOU’RE ON THE LIST</p>
          <h2>Your November starts here.</h2>
          <p className={styles.successIntro}>Thank you, {attendee.firstName}! Your payment is confirmed and your place at November to Remember is secured.</p>
          <div className={styles.emailNote}><Mail size={24} aria-hidden="true" /><div><h3>Keep an eye on your inbox</h3><p>Registration email: <strong>{attendee.email}</strong></p><p>Check your inbox and spam folder for your ticket and joining details. If they haven’t arrived, contact our team with your reference below.</p></div></div>
          <dl className={styles.receipt}>
            <div><dt>Event</dt><dd>{confirmed.eventTitle}</dd></div>
            <div><dt>Ticket</dt><dd>{confirmed.tierName}</dd></div>
            <div><dt>Amount paid</dt><dd>{formatMoney(confirmed.amount, confirmed.currency)}</dd></div>
            <div><dt>Payment reference</dt><dd>{confirmed.reference}</dd></div>
          </dl>
          <Link className={styles.primary} href="/events/november-to-remember">BACK TO THE EVENT <ArrowRight size={20} aria-hidden="true" /></Link>
          <p className={styles.support}>Need a hand? <a href="mailto:support@productpointers.com">Contact support</a></p>
        </div>}
      </section>
    </div>
  );
}
