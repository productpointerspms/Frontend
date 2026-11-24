"use client";

import { useState, type FormEvent } from "react";
import { CalendarDays, CalendarCheck, CalendarClock, Pencil, RefreshCw } from "lucide-react";
import { ActionMenu, Badge, DataTable, Dialog, DialogActions, Field, Metric, PageHeading, displayDate } from "./AdminUI";
import { lmsTones, useAdminData, type Cohort, type CohortStatus } from "./AdminData";
import { LmsDialog } from "./LmsDialog";
import styles from "./admin.module.css";

const states: CohortStatus[] = ["Upcoming", "Active", "Completed"];
const statusTones = { Upcoming: "orange", Active: "green", Completed: "muted" } as const;

function CohortDetails({ cohort, onClose, onSave }: { cohort: Cohort; onClose: () => void; onSave: (cohort: Cohort) => void }) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name")).trim();
    const start = String(data.get("start"));
    const end = String(data.get("end"));
    if (!name || start > end) {
      setError(!name ? "Enter a cohort name." : "The end date must be on or after the start date.");
      return;
    }
    onSave({ ...cohort, name, start, end, status: data.get("status") as CohortStatus });
  }

  return (
    <Dialog title="Cohort Details" onClose={onClose} drawer>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <Field label="Cohort Name">{(id) => <input id={id} name="name" className={styles.control} defaultValue={cohort.name} required />}</Field>
          <Field label="Program">{(id) => <input id={id} className={styles.control} value={cohort.program} readOnly />}</Field>
          <fieldset className={styles.formGroup}>
            <legend>Cohort Schedule</legend>
            <div className={styles.fieldRow}>
              <Field label="Start Date">{(id) => <input id={id} name="start" type="date" className={styles.control} defaultValue={cohort.start} required />}</Field>
              <Field label="End Date">{(id) => <input id={id} name="end" type="date" className={styles.control} defaultValue={cohort.end} required />}</Field>
            </div>
          </fieldset>
          <Field label="Cohort Status">{(id) => (
            <select id={id} name="status" className={styles.control} defaultValue={cohort.status}>
              {states.map((status) => <option key={status}>{status}</option>)}
            </select>
          )}</Field>
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Save Changes</button></DialogActions>
      </form>
    </Dialog>
  );
}

export function Cohorts() {
  const { cohorts, setCohorts } = useAdminData();
  const [dialog, setDialog] = useState<{ kind: "edit" | "sync"; cohort: Cohort } | null>(null);
  const close = () => setDialog(null);

  function save(cohort: Cohort) {
    setCohorts((current) => current.map((item) => item.id === cohort.id ? cohort : item));
    close();
  }

  return (
    <>
      <PageHeading title="Cohorts" description="Manage program batches, schedules, learners and facilitators." />
      <div className={styles.metrics}>
        <Metric label="Total Cohorts" value={cohorts.length} detail="Cohorts in this preview" icon={CalendarDays} />
        <Metric label="Active Cohorts" value={cohorts.filter((cohort) => cohort.status === "Active").length} detail="Currently running" icon={CalendarCheck} tone="green" />
        <Metric label="Upcoming Cohorts" value={cohorts.filter((cohort) => cohort.status === "Upcoming").length} detail="Scheduled to start soon" icon={CalendarClock} tone="orange" />
      </div>
      <DataTable caption="Cohorts" headings={["Cohort", "Program", "Start Date", "End Date", "Status", "Learners", "Facilitators", "LMS Status", "Actions"]}>
        {cohorts.map((cohort) => (
          <tr key={cohort.id}>
            <td><button type="button" className={styles.tableLink} onClick={() => setDialog({ kind: "edit", cohort })}>{cohort.name}</button></td>
            <td>{cohort.program}</td>
            <td>{displayDate(cohort.start)}</td>
            <td>{displayDate(cohort.end)}</td>
            <td><Badge tone={statusTones[cohort.status]}>{cohort.status}</Badge></td>
            <td>{cohort.learners}</td>
            <td>{cohort.facilitator}</td>
            <td><Badge tone={lmsTones[cohort.lms]}>{cohort.lms === "Synced" ? "✓ Synced" : cohort.lms}</Badge></td>
            <td><ActionMenu label={`Actions for ${cohort.program} ${cohort.name}`} actions={[
              { label: "Edit Cohort", icon: Pencil, onSelect: () => setDialog({ kind: "edit", cohort }) },
              { label: "Sync with LMS", icon: RefreshCw, onSelect: () => setDialog({ kind: "sync", cohort }) },
            ]} /></td>
          </tr>
        ))}
      </DataTable>
      {dialog?.kind === "edit" && <CohortDetails cohort={dialog.cohort} onClose={close} onSave={save} />}
      {dialog?.kind === "sync" && <LmsDialog onClose={close} onSync={() => save({ ...dialog.cohort, lms: "Synced" })} />}
    </>
  );
}
