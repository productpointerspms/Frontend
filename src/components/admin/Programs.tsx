"use client";

import { useState, type FormEvent } from "react";
import { BookOpen, CreditCard, GraduationCap, Pencil, Plus, RefreshCw } from "lucide-react";
import { ActionMenu, AdminMutations, ResourceState, Badge, DataTable, Dialog, DialogActions, Field, Metric, PageHeading, money } from "./AdminUI";
import { type PaymentStatus, type Program } from "./AdminData";
import { LmsDialog } from "./LmsDialog";
import { useAdminMutation, useAdminResource } from "./admin-api";
import styles from "./admin.module.css";

type ProgramDialogState =
  | { kind: "create" }
  | { kind: "edit" | "payment" | "sync"; program: Program };

type ProgramValues = { name: string; category: string; level: string; cohort?: string; capacity?: number; price: number; draft: boolean };

function ProgramForm({ program, onClose, onSave }: { program?: Program; onClose: () => void; onSave: (program: ProgramValues) => void }) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const value = (name: string) => String(data.get(name) ?? "").trim();
    if (!value("name") || !value("category")) {
      setError("Enter the program name and category.");
      return;
    }
    const cohort = value("cohort");
    onSave({
      name: value("name"), category: value("category"), level: value("level"),
      cohort: program ? undefined : cohort || undefined,
      capacity: !program && value("capacity") ? Number(value("capacity")) : undefined,
      price: value("price") ? Number(value("price")) : 0,
      draft: submitter?.getAttribute("value") === "draft",
    });
  }

  return (
    <Dialog title={program ? "Edit Program" : "Create Program"} description="Set up a program and its cohort details." onClose={onClose} wide>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <fieldset className={styles.formGroup}>
            <legend>Program details</legend>
            <Field label="Program Name">{(id) => (
              <input id={id} name="name" className={styles.control} placeholder="e.g. Product Management" defaultValue={program?.name} required />
            )}</Field>
            <Field label="Program Category">{(id) => (
              <input id={id} name="category" className={styles.control} placeholder="e.g. AI" defaultValue={program?.category} required />
            )}</Field>
            <Field label="Program Level">{(id) => (
              <input id={id} name="level" className={styles.control} placeholder="e.g. Beginner" defaultValue={program?.level} required />
            )}</Field>
          </fieldset>
          <fieldset className={styles.formGroup}>
            <legend>Cohort setup</legend>
            <Field label="Cohort Number">{(id) => (
              <input id={id} name="cohort" className={styles.control} placeholder="e.g. Cohort 3" defaultValue={program?.cohort ?? ""} readOnly={Boolean(program)} />
            )}</Field>
            <Field label="Maximum Participants">{(id) => (
              <input id={id} name="capacity" type="number" min="1" className={styles.control} placeholder="e.g. 25" defaultValue={program?.capacity ?? undefined} readOnly={Boolean(program)} />
            )}</Field>
            <div className={styles.fieldRow}>
              <Field label="Currency">{(id) => (
                <select id={id} name="currency" className={styles.control} defaultValue={program?.currency ?? "NGN"}>
                  <option value="NGN">NGN (₦)</option>
                </select>
              )}</Field>
              <Field label="Program Price">{(id) => (
                <input id={id} name="price" type="number" min="0" step="0.01" className={styles.control} placeholder="350000" defaultValue={program?.price ?? undefined} required />
              )}</Field>
            </div>
          </fieldset>
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
        <DialogActions onClose={onClose}>
          {(!program || program.draft) && <button type="submit" className={styles.secondary} value="draft">Save as draft</button>}
          <button type="submit" className={styles.primary}>{program ? "Save Changes" : "Create Program"}</button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

function PaymentDialog({ program, onClose, onSave }: { program: Program; onClose: () => void; onSave: (review: { status: PaymentStatus; note: string }) => void }) {
  const [status, setStatus] = useState<PaymentStatus>(program.paymentReview?.status ?? "Pending");
  return (
    <Dialog title="Update Payment Status" description={program.name} onClose={onClose}>
      <form method="post" onSubmit={(event) => { event.preventDefault(); onSave({ status, note: String(new FormData(event.currentTarget).get("note")).trim() }); }}>
        <div className={styles.dialogBody}>
          <Field label="New Status">{(id) => (
            <select id={id} className={styles.control} value={status} onChange={(event) => setStatus(event.target.value as PaymentStatus)}>
              <option>Pending</option><option>Paid</option><option>Failed</option>
            </select>
          )}</Field>
          <Field label="Reconciliation note">{(id) => (
            <textarea id={id} name="note" className={styles.control} maxLength={2000} defaultValue={program.paymentReview?.note} required />
          )}</Field>
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Update status</button></DialogActions>
      </form>
    </Dialog>
  );
}

export function Programs() {
  const resource = useAdminResource<Program[]>("programs");
  const programs = resource.data ?? [];
  const action = useAdminMutation(resource.reload);
  const [dialog, setDialog] = useState<ProgramDialogState | null>(null);
  const close = () => { action.setError(""); setDialog(null); };
  const pendingCount = programs.reduce((sum, program) => sum + program.pendingPayments, 0);
  const pendingTotal = programs.reduce((sum, program) => sum + program.pendingPaymentTotal, 0);

  return (
    <ResourceState {...resource}><AdminMutations action={action}>
      <PageHeading title="Programs" description="Manage your programs and monitor their activity." action={
        <button type="button" className={styles.primary} onClick={() => setDialog({ kind: "create" })}><Plus size={17} aria-hidden />Create Program</button>
      } />
      <div className={styles.metrics}>
        <Metric label="Total Programs" value={programs.length} detail="Programs in this register" icon={BookOpen} />
        <Metric label="Enrolled Learners" value={programs.reduce((sum, program) => sum + program.enrolled, 0)} detail="Across program cohorts" icon={GraduationCap} tone="green" />
        <Metric label="Pending Payments" value={money(pendingTotal)} detail="Provider payments awaiting confirmation" icon={CreditCard} tone="orange" accent
          aside={<Badge tone="orange">{pendingCount} Pending</Badge>} />
      </div>

      <DataTable caption="Programs" headings={["Program", "Current Cohort", "Applicants", "Enrolled Learners", "Provider Payments", "Staff Review", "Classroom", "Actions"]}>
        {programs.map((program) => (
          <tr key={program.id}>
            <td>
              <button type="button" className={styles.tableLink} onClick={() => setDialog({ kind: "edit", program })}>{program.name}</button>
              {program.draft && <> <Badge>Draft</Badge></>}
            </td>
            <td>{program.cohort || "—"}</td>
            <td>{program.applicants}</td>
            <td><span className={styles.link}>{program.enrolled}</span></td>
            <td>{program.pendingPayments} pending</td>
            <td>{program.paymentReview ? <><Badge>{program.paymentReview.status}</Badge> {program.paymentReview.note}</> : "—"}</td>
            <td><Badge tone={program.classroomUrl ? "green" : "muted"}>{program.classroomUrl ? "Linked" : "Not linked"}</Badge></td>
            <td><ActionMenu label={`Actions for ${program.name}`} actions={[
              { label: "Edit Program", icon: Pencil, onSelect: () => setDialog({ kind: "edit", program }) },
              { label: "Update Payment Status", icon: CreditCard, onSelect: () => setDialog({ kind: "payment", program }) },
              ...(program.cohortId ? [{ label: "Google Classroom Setup", icon: RefreshCw, onSelect: () => setDialog({ kind: "sync", program }) }] : []),
            ]} /></td>
          </tr>
        ))}
      </DataTable>

      {(dialog?.kind === "create" || dialog?.kind === "edit") &&
        <ProgramForm program={dialog.kind === "edit" ? dialog.program : undefined} onClose={close} onSave={(values) => void action.save(dialog.kind === "edit" ? "programs/" + dialog.program.id : "programs", dialog.kind === "edit" ? "PUT" : "POST", values, close)} />}
      {dialog?.kind === "payment" &&
        <PaymentDialog program={dialog.program} onClose={close} onSave={(values) => void action.save(`programs/${dialog.program.id}/payment-reviews`, "POST", values, close)} />}
      {dialog?.kind === "sync" &&
        <LmsDialog onClose={close} classroom={{ code: dialog.program.classroomCode, url: dialog.program.classroomUrl }} onSave={(values) => void action.save(`cohorts/${dialog.program.cohortId}/classroom`, "PUT", values, close)} />}
    </AdminMutations></ResourceState>
  );
}
