"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";
import { Field } from "../admin/AdminUI";
import { PreviewInput, value } from "../admin/PreviewControls";
import styles from "../admin/admin.module.css";

export function ReferralJoin() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = value(form, "name");
    if (!fullName) { setError("Enter your full name."); return; }
    if (form.get("password") !== form.get("confirmation")) { setError("The passwords must match."); return; }
    setName(fullName);
  }

  return <main className={styles.accountPage}>
    <section className={styles.accountCard} aria-labelledby="referral-join-title">
      <header className={styles.accountHeading}>
        {name && <CircleCheck size={36} aria-hidden />}
        <h1 id="referral-join-title">{name ? "Sign-up preview complete" : "Join our referral program"}</h1>
        <p>{name ? `Thanks, ${name}. You’ve completed the sample sign-up.` : "Create an account and start earning by referring people to ProductPointers."}</p>
      </header>
      {name ? <button type="button" className={styles.secondary} onClick={() => { setName(""); setError(""); }}>Start over</button>
        : <form className={styles.accountForm} method="post" onSubmit={submit}>
          <p className={styles.hint}>Frontend preview. Use sample details and a test password.</p>
          <PreviewInput label="Full name" name="name" />
          <PreviewInput label="Email address" name="email" type="email" />
          <Field label="Create password" hint="Use at least 8 characters.">{(id, hintId) => <input id={id} name="password" type="password" autoComplete="new-password"
            className={styles.control} aria-describedby={hintId} minLength={8} maxLength={72} required />}</Field>
          <Field label="Confirm password">{(id) => <input id={id} name="confirmation" type="password" autoComplete="new-password"
            className={styles.control} minLength={8} maxLength={72} required />}</Field>
          <label className={styles.option}><input type="checkbox" required />I agree to the Terms of Service and Privacy Policy.</label>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button type="submit" className={`${styles.primary} ${styles.accountButton}`}>Create referral account</button>
        </form>}
    </section>
  </main>;
}
