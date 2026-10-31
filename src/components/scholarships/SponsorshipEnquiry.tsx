"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { submitContactForm } from "@/lib/contact";
import type { SponsorshipTier } from "./SponsorshipTierCard";
import styles from "./sponsorship-enquiry.module.css";

export default function SponsorshipEnquiry({ tier }: { tier: SponsorshipTier }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const feedback = useRef<HTMLParagraphElement>(null);
  const privacyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    if (!value("fullname")) { setError("Please enter your full name."); setStatus("error"); return; }
    sending.current = true;
    setStatus("sending"); setError("");
    try {
      await submitContactForm({ fullname: value("fullname"), email: value("email"), message: [
        `Sponsorship enquiry — ${tier.name}`, `Coverage: ${tier.coverage}`, `Recognition: ${tier.recognition}`,
        `Organisation: ${value("organisation") || "Not provided"}`, `Phone: ${value("phone") || "Not provided"}`,
        `Preferred program: ${value("program") || "I’d like help choosing a program"}`, `Message: ${value("message") || "Not provided"}`,
        "Consent: Applicant agreed to be contacted about this sponsorship enquiry.",
      ].join("\n") });
      setStatus("success");
      form.reset();
      requestAnimationFrame(() => feedback.current?.focus());
    } catch { setStatus("error"); setError("Your enquiry could not be sent. Your details are still here—please try again."); }
    finally { sending.current = false; }
  }
  return <div className={styles.page}>
    <header className={styles.intro}><Link href="/scholarships#sponsor-a-learner" className={styles.back}><ArrowLeft size={16} aria-hidden="true" />Back to sponsorship tiers</Link><p className={styles.eyebrow}>SPONSOR A LEARNER</p><p className={styles.description}>You’ve chosen {tier.name}. Share a few details and our team will help you turn your contribution into {tier.name === "Partner" ? "opportunities for learners" : "an opportunity for one learner"}.</p><h1>Let’s make a scholarship happen.</h1></header>
    <div className={styles.layout}><aside><div className={styles.tier}><p className={styles.tierEyebrow}><CheckCircle2 size={16} aria-hidden="true" />YOUR SELECTED TIER</p><div className={styles.tierTitle}><h2>{tier.name}</h2>{tier.featured && <span>Most chosen</span>}</div><p className={styles.tierDescription}>{tier.description}</p><dl><div><dt>COVERAGE</dt><dd>{tier.coverage}</dd></div><div><dt>RECOGNITION</dt><dd>{tier.recognition}</dd></div></dl><Link href="/scholarships#sponsor-a-learner">Choose a different tier</Link></div><div className={styles.next}><h2>What happens next?</h2><p>Our team will get in touch to discuss your contribution, confirm the program and explain how we select and support your scholar.</p><p className={styles.noPayment}><ShieldCheck size={16} aria-hidden="true" />No payment or commitment at this stage.</p></div></aside>
    <section className={styles.formCard} aria-labelledby="sponsor-form-title"><div className={styles.formHeading}><h2 id="sponsor-form-title">Tell us a little about yourself</h2><span><b>*</b> Required fields</span></div><p className={styles.formDescription}>Sponsoring personally or through an organisation? We’d love to hear from you.</p><form onSubmit={submit} aria-busy={status === "sending"}><fieldset disabled={status === "sending" || status === "success"} className={styles.fields}><div className={styles.grid}>
      <div><label htmlFor="sponsor-name">Full name <b>*</b></label><input id="sponsor-name" name="fullname" autoComplete="name" placeholder="Enter your full name" required maxLength={160} /></div><div><label htmlFor="sponsor-email">Email address <b>*</b></label><input id="sponsor-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></div>
      <div><label htmlFor="sponsor-organisation">Organisation <span>(optional)</span></label><input id="sponsor-organisation" name="organisation" autoComplete="organization" placeholder="Your organisation’s name" maxLength={200} /></div><div><label htmlFor="sponsor-phone">Phone number <span>(optional)</span></label><input id="sponsor-phone" name="phone" type="tel" autoComplete="tel" placeholder="Include country code" maxLength={30} /></div>
      <div className={styles.full}><label htmlFor="sponsor-program">Preferred program <span>(optional)</span></label><select id="sponsor-program" name="program" defaultValue=""><option value="">I’d like help choosing a program</option><option>Product Management Accelerator Program (PPAP)</option><option>Product Management Apprenticeship/Internship Program (PPIP)</option><option>Fintech Product Management Program (PPFP)</option><option>Product Management Mastery Program (PPMP)</option></select></div>
      <div className={styles.full}><label htmlFor="sponsor-message">Anything you’d like us to know? <span>(optional)</span></label><textarea id="sponsor-message" name="message" placeholder="Tell us about your sponsorship goals, preferred timing or any questions you have." maxLength={5000} /></div>
    </div><label className={styles.consent}><input type="checkbox" name="consent" required /><span>I agree to be contacted about my sponsorship enquiry.{privacyUrl && <> I’ve read the <a href={privacyUrl} target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</>} <b>*</b></span></label><button className={styles.submit} type="submit">{status === "sending" ? "Sending enquiry…" : status === "success" ? "Enquiry sent" : "Send sponsorship enquiry"}</button></fieldset>
    {status === "error" && <p role="alert" className={styles.error}>{error}</p>}{status === "success" && <p role="status" ref={feedback} tabIndex={-1} className={styles.success}>Thank you! Your {tier.name} sponsorship enquiry has been sent. Our team will get in touch to discuss the details.</p>}<p className={styles.note}>This is an enquiry, not a payment. We’ll confirm the details with you first.</p></form></section></div>
  </div>;
}
