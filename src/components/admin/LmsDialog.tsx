"use client";

import { useState, type FormEvent } from "react";
import { Dialog, DialogActions, Field } from "./AdminUI";
import styles from "./admin.module.css";

export function LmsDialog({ onClose, onSync }: { onClose: () => void; onSync: () => void }) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const invite = URL.canParse(String(form.get("invite"))) ? new URL(String(form.get("invite"))) : null;
    if (!String(form.get("code")).trim() || invite?.protocol !== "https:" || invite.hostname !== "classroom.google.com") {
      setError("Enter a classroom code and an HTTPS Google Classroom invite link.");
      return;
    }
    onSync();
  }

  return (
    <Dialog title="Sync with LMS" onClose={onClose}>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <div className={`${styles.infoBox} ${styles.lmsInfo}`}>
            <p className={styles.infoValue}>Google Classroom Setup</p>
            <p className={styles.hint}>Connect this cohort to its Google Classroom stream and invite link.</p>
          </div>
          <Field label="Google Classroom Code">{(id) => (
            <input id={id} name="code" className={styles.control} placeholder="e.g. pp-co-2026" required />
          )}</Field>
          <Field label="Google Classroom Invite Link">{(id) => (
            <input id={id} type="url" name="invite" className={styles.control} placeholder="https://classroom.google.com/…" required />
          )}</Field>
          {error && <p role="alert" className={styles.error}>{error}</p>}
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Sync Now</button></DialogActions>
      </form>
    </Dialog>
  );
}
