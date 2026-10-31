"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, MessageSquare, Share2, X } from "lucide-react";
import { submitContactForm } from "@/lib/contact";
import styles from "./course-actions.module.css";

type Modal = "contact" | "share";

export default function CourseActions({ title }: { title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const linkInput = useRef<HTMLInputElement>(null);
  const [modal, setModal] = useState<Modal>("contact");
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function show(next: Modal) {
    setModal(next);
    setUrl(window.location.href);
    setCopyStatus("");
    setOpen(true);
    dialog.current?.showModal();
  }
  function close() { dialog.current?.close(); }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("Link copied");
    } catch {
      linkInput.current?.focus();
      linkInput.current?.select();
      setCopyStatus("Select and copy the link above to share it.");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const fullname = String(values.get("fullname") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    if (!fullname || !message.trim()) {
      setError("Please enter your full name and a message.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await submitContactForm({ fullname, email, message: `Course enquiry: ${title}\n${url}\n\n${message.trim()}` });
      setStatus("success");
      form.reset();
      setMessage("");
    } catch {
      setStatus("error");
      setError("Your message could not be sent. Please try again.");
    }
  }

  return <>
    <button type="button" aria-haspopup="dialog" onClick={() => show("contact")}><MessageSquare size={16} aria-hidden="true" />Contact Seller</button>
    <button type="button" aria-haspopup="dialog" onClick={() => show("share")}><Share2 size={16} aria-hidden="true" />Share</button>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="course-action-title" onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className={styles.body}>
        <div className={styles.heading}><h2 id="course-action-title">{modal === "contact" ? "Contact Seller" : "Share product link"}</h2><button type="button" className={styles.close} aria-label="Close modal" onClick={close}><X size={18} strokeWidth={1.5} /></button></div>
        {modal === "contact" ? <form onSubmit={submit} className={styles.form} aria-busy={status === "sending"}>
          <div><label htmlFor="seller-name">Full Name <span aria-hidden="true">*</span></label><input id="seller-name" name="fullname" autoComplete="name" placeholder="e.g. Amara Okafor" required maxLength={120} disabled={status === "sending"} /></div>
          <div><label htmlFor="seller-email">Email Address <span aria-hidden="true">*</span></label><input id="seller-email" name="email" type="email" autoComplete="email" placeholder="e.g. amara@example.com" required maxLength={254} disabled={status === "sending"} /></div>
          <div><label htmlFor="seller-message">Your Message <span aria-hidden="true">*</span></label><div className={styles.message}><textarea id="seller-message" name="message" required maxLength={150} value={message} onChange={event => { setMessage(event.target.value); if (status !== "sending") setStatus("idle"); }} aria-describedby="seller-message-count" disabled={status === "sending"} /><span id="seller-message-count">{message.length}/150</span></div></div>
          {status === "error" && <p className={styles.error} role="alert">{error}</p>}
          {status === "success" && <p className={styles.success} role="status">Your message has been sent to the ProductPointers team.</p>}
          <button className={styles.send} type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send Message"}<ArrowRight size={22} aria-hidden="true" /></button>
        </form> : <div><div className={styles.shareField}><input ref={linkInput} aria-label="Product link" value={url} readOnly onFocus={event => event.currentTarget.select()} /><button type="button" onClick={copy}>{copyStatus === "Link copied" ? "Copied!" : "Copy link"}</button></div><p role="status" className={styles.copyStatus}>{copyStatus}</p></div>}
      </div>
    </dialog>
  </>;
}
