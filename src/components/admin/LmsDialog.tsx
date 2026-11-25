"use client";

import { useState, type FormEvent } from "react";
import { Dialog, DialogActions, Field } from "./AdminUI";
import styles from "./admin.module.css";

export function LmsDialog({ onClose, onSave, classroom }: { onClose: () => void; onSave: (value: { code: string; url: string }) => void; classroom?: { code?: string | null; url?: string | null } }) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const invite = URL.canParse(String(form.get("invite"))) ? new URL(String(form.get("invite"))) : null;
    if (!String(form.get("code")).trim() || invite?.protocol !== "https:" || invite.hostname !== "classroom.google.com") {
      setError("Enter a classroom code and an HTTPS Google Classroom invite link.");
      return;
    }
    onSave({ code: String(form.get("code")).trim(), url: invite.href });
  }

  return (
    <Dialog title="Google Classroom Setup" onClose={onClose}>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <div className={`${styles.infoBox} ${styles.lmsInfo}`}>
            <p className={styles.infoValue}>Google Classroom Setup</p>
            <p className={styles.hint}>Save the classroom code and invite link for staff.</p>
          </div>
          <Field label="Google Classroom Code">{(id) => (
            <input id={id} name="code" className={styles.control} placeholder="e.g. pp-co-2026" defaultValue={classroom?.code ?? ""} required />
          )}</Field>
          <Field label="Google Classroom Invite Link">{(id) => (
            <input id={id} type="url" name="invite" className={styles.control} placeholder="https://classroom.google.com/…" defaultValue={classroom?.url ?? ""} required />
          )}</Field>
          {error && <p role="alert" className={styles.error}>{error}</p>}
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Save Classroom</button></DialogActions>
      </form>
    </Dialog>
  );
}
