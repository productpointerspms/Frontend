"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { submitContactForm } from "@/lib/contact";
import styles from "./contact.module.css";

export default function ContactMessageSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = { fullname: String(data.get("fullname") ?? "").trim(), email: String(data.get("email") ?? "").trim(), message: String(data.get("message") ?? "").trim() };
    if (!payload.fullname || !payload.message) { setError("Please enter your full name and message."); setStatus("error"); return; }
    setStatus("sending");
    setError("");
    try { await submitContactForm(payload); setStatus("success"); form.reset(); }
    catch { setError("Your message could not be sent. Please try again."); setStatus("error"); }
  }
  return <section id="send-a-message" className={styles.messageSection} aria-labelledby="contact-message-title"><div className={styles.messageGrid}><div className={styles.messageIntro}><h2 id="contact-message-title">Send us a message</h2><p>Have a detailed question? Fill out the details below and we will route your request to the right team.</p></div>
    <div className={styles.formCard}><div className={styles.formInner}><form id="contact-message-form" onSubmit={submit} aria-busy={status === "sending"}>
      <div><label htmlFor="contact-name">Full Name <span aria-hidden="true">*</span></label><input id="contact-name" name="fullname" autoComplete="name" required maxLength={120} placeholder="e.g. Amara Okafor" disabled={status === "sending"} /></div>
      <div><label htmlFor="contact-email">Email Address <span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="e.g. amara@example.com" disabled={status === "sending"} /></div>
      <div><label htmlFor="contact-message">Your Message <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" required maxLength={5000} placeholder="Tell us how we can help you build your product career or partner with ProductPointers…" disabled={status === "sending"} /></div>
      <p className={styles.consent}>By submitting this form, you agree to allow ProductPointers to contact you regarding your inquiry.</p>
      {status === "error" && <p role="alert" className={styles.error}>{error}</p>}{status === "success" && <p role="status" className={styles.success}>Thank you! Your message has been sent to the ProductPointers team.</p>}
      <button type="submit" className={styles.primary} disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send Message"}<ArrowRight size={20} aria-hidden="true" /></button>
    </form></div></div>
  </div></section>;
}
