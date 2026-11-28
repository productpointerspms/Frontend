"use client";

import { useState, type FormEvent } from "react";
import { CalendarDays, CalendarCheck, CalendarClock, Plus, Pencil, RefreshCw } from "lucide-react";
import { ActionMenu, AdminMutations, ResourceState, Badge, DataTable, Dialog, DialogActions, Field, Metric, PageHeading, displayDate } from "./AdminUI";
import { type Cohort, type CohortStatus, type ProgramOption } from "./AdminData";
import { LmsDialog } from "./LmsDialog";
import { useAdminMutation, useAdminResource } from "./admin-api";
import styles from "./admin.module.css";

const states: CohortStatus[] = ["Upcoming", "Active", "Completed"];
const statusTones = { Upcoming: "orange", Active: "green", Completed: "muted" } as const;

type CohortValues = { programId: string; name: string; start?: string; end?: string; status: CohortStatus; capacity?: number };

function CohortDetails({ cohort, programs, onClose, onSave }: { cohort?: Cohort; programs?: ProgramOption[]; onClose: () => void; onSave: (values: CohortValues) => void }) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name")).trim();
    const start = String(data.get("start"));
    const end = String(data.get("end"));
    if (!name || (start && end && start > end)) {
      setError(!name ? "Enter a cohort name." : "The end date must be on or after the start date.");
      return;
    }
    onSave({ programId: cohort?.programId ?? String(data.get("programId")), name, start: start || undefined, end: end || undefined, capacity: data.get("capacity") ? Number(data.get("capacity")) : undefined, status: data.get("status") as CohortStatus });
  }

  return (
    <Dialog title={cohort ? "Cohort Details" : "Create Cohort"} onClose={onClose} drawer>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <Field label="Cohort Name">{(id) => <input id={id} name="name" className={styles.control} defaultValue={cohort?.name} required />}</Field>
          <Field label="Program">{(id) => cohort ? <input id={id} className={styles.control} value={cohort.program} readOnly /> : <select id={id} name="programId" className={styles.control} defaultValue="" required><option value="" disabled>Select a program</option>{programs?.map((program) => <option key={program.id} value={program.id}>{program.name}</option>)}</select>}</Field>
          <fieldset className={styles.formGroup}>
            <legend>Cohort Schedule</legend>
            <div className={styles.fieldRow}>
              <Field label="Start Date">{(id) => <input id={id} name="start" type="date" className={styles.control} defaultValue={cohort?.start?.slice(0, 10)} />}</Field>
              <Field label="End Date">{(id) => <input id={id} name="end" type="date" className={styles.control} defaultValue={cohort?.end?.slice(0, 10)} />}</Field>
            </div>
          </fieldset>
          <Field label="Cohort Status">{(id) => (
            <select id={id} name="status" className={styles.control} defaultValue={cohort?.status ?? "Upcoming"}>
              {states.map((status) => <option key={status}>{status}</option>)}
            </select>
          )}</Field>
          <Field label="Maximum Participants">{(id) => <input id={id} name="capacity" type="number" min="1" className={styles.control} defaultValue={cohort?.capacity ?? undefined} />}</Field>
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Save Changes</button></DialogActions>
      </form>
    </Dialog>
  );
}

export function Cohorts() {
  const resource = useAdminResource<Cohort[]>("cohorts");
  const programs = useAdminResource<ProgramOption[]>("lookups/programs");
  const cohorts = resource.data ?? [];
  const action = useAdminMutation(resource.reload);
  const [dialog, setDialog] = useState<{ kind: "create" } | { kind: "edit" | "sync"; cohort: Cohort } | null>(null);
  const close = () => { action.setError(""); setDialog(null); };

  return (
    <ResourceState {...resource}><AdminMutations action={action}>
      <PageHeading title="Cohorts" description="Manage program batches, schedules, learners and facilitators." action={
        <button type="button" className={styles.primary} onClick={() => setDialog({ kind: "create" })}><Plus size={17} aria-hidden />Create Cohort</button>
      } />
      <div className={styles.metrics}>
        <Metric label="Total Cohorts" value={cohorts.length} detail="Cohorts in this register" icon={CalendarDays} />
        <Metric label="Active Cohorts" value={cohorts.filter((cohort) => cohort.status === "Active").length} detail="Currently running" icon={CalendarCheck} tone="green" />
        <Metric label="Upcoming Cohorts" value={cohorts.filter((cohort) => cohort.status === "Upcoming").length} detail="Scheduled to start soon" icon={CalendarClock} tone="orange" />
      </div>
      <DataTable caption="Cohorts" headings={["Cohort", "Program", "Start Date", "End Date", "Status", "Learners", "Facilitators", "Classroom", "Actions"]}>
        {cohorts.map((cohort) => (
          <tr key={cohort.id}>
            <td><button type="button" className={styles.tableLink} onClick={() => setDialog({ kind: "edit", cohort })}>{cohort.name}</button></td>
            <td>{cohort.program}</td>
            <td>{displayDate(cohort.start)}</td>
            <td>{displayDate(cohort.end)}</td>
            <td><Badge tone={statusTones[cohort.status]}>{cohort.status}</Badge></td>
            <td>{cohort.learners}</td>
            <td>{cohort.facilitators.join(", ") || "Unassigned"}</td>
            <td><Badge tone={cohort.classroomUrl ? "green" : "muted"}>{cohort.classroomUrl ? "Linked" : "Not linked"}</Badge></td>
            <td><ActionMenu label={`Actions for ${cohort.program} ${cohort.name}`} actions={[
              { label: "Edit Cohort", icon: Pencil, onSelect: () => setDialog({ kind: "edit", cohort }) },
              { label: "Google Classroom Setup", icon: RefreshCw, onSelect: () => setDialog({ kind: "sync", cohort }) },
            ]} /></td>
          </tr>
        ))}
      </DataTable>
      {dialog?.kind === "create" && (programs.data?.length ?
        <CohortDetails programs={programs.data} onClose={close} onSave={(values) => void action.save("cohorts", "POST", values, close)} /> :
        <Dialog title="Create Cohort" onClose={close}><div className={styles.dialogBody}><ResourceState {...programs}>Create a program before adding a cohort.</ResourceState></div></Dialog>)}
      {dialog?.kind === "edit" && <CohortDetails cohort={dialog.cohort} onClose={close} onSave={(values) => void action.save("cohorts/" + dialog.cohort.id, "PUT", values, close)} />}
      {dialog?.kind === "sync" && <LmsDialog onClose={close} classroom={{ code: dialog.cohort.classroomCode, url: dialog.cohort.classroomUrl }}
        onSave={(values) => void action.save(`cohorts/${dialog.cohort.id}/classroom`, "PUT", values, close)} />}
    </AdminMutations></ResourceState>
  );
}
