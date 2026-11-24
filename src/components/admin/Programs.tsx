"use client";

import { useState, type FormEvent } from "react";
import { BookOpen, CreditCard, GraduationCap, Pencil, Plus, RefreshCw } from "lucide-react";
import { ActionMenu, Badge, DataTable, Dialog, DialogActions, Field, Metric, PageHeading, money } from "./AdminUI";
import { lmsTones, useAdminData, type PaymentStatus, type Program } from "./AdminData";
import { LmsDialog } from "./LmsDialog";
import styles from "./admin.module.css";

type ProgramDialogState =
  | { kind: "create" }
  | { kind: "edit" | "payment" | "sync"; program: Program };

function ProgramForm({ program, onClose, onSave }: { program?: Program; onClose: () => void; onSave: (program: Program) => void }) {
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
      id: program?.id ?? crypto.randomUUID(),
      name: value("name"),
      category: value("category"),
      level: value("level"),
      cohort: cohort && !/^cohort\b/i.test(cohort) ? `Cohort ${cohort}` : cohort,
      capacity: Number(value("capacity")),
      currency: value("currency"),
      price: Number(value("price")),
      applicants: program?.applicants ?? 0,
      enrolled: program?.enrolled ?? 0,
      pendingPayments: program?.pendingPayments ?? 0,
      pendingPaymentTotal: program?.pendingPaymentTotal ?? 0,
      paymentStatus: program?.paymentStatus ?? "Pending",
      lms: program?.lms ?? "Not synced",
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
              <input id={id} name="level" className={styles.control} placeholder="e.g. Beginner" defaultValue={program?.level} />
            )}</Field>
          </fieldset>
          <fieldset className={styles.formGroup}>
            <legend>Cohort setup</legend>
            <Field label="Cohort Number">{(id) => (
              <input id={id} name="cohort" className={styles.control} placeholder="e.g. Cohort 3" defaultValue={program?.cohort} />
            )}</Field>
            <Field label="Maximum Participants">{(id) => (
              <input id={id} name="capacity" type="number" min="1" className={styles.control} placeholder="e.g. 25" defaultValue={program?.capacity || undefined} />
            )}</Field>
            <div className={styles.fieldRow}>
              <Field label="Currency">{(id) => (
                <select id={id} name="currency" className={styles.control} defaultValue={program?.currency ?? "NGN"}>
                  <option value="NGN">NGN (₦)</option>
                </select>
              )}</Field>
              <Field label="Program Price">{(id) => (
                <input id={id} name="price" type="number" min="0" className={styles.control} placeholder="350000" defaultValue={program?.price} />
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

function PaymentDialog({ program, onClose, onSave }: { program: Program; onClose: () => void; onSave: (status: PaymentStatus) => void }) {
  const [status, setStatus] = useState(program.paymentStatus);
  return (
    <Dialog title="Update Payment Status" description={program.name} onClose={onClose}>
      <form method="post" onSubmit={(event) => { event.preventDefault(); onSave(status); }}>
        <div className={styles.dialogBody}>
          <Field label="New Status">{(id) => (
            <select id={id} className={styles.control} value={status} onChange={(event) => setStatus(event.target.value as PaymentStatus)}>
              <option>Pending</option><option>Paid</option><option>Failed</option>
            </select>
          )}</Field>
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Update status</button></DialogActions>
      </form>
    </Dialog>
  );
}

export function Programs() {
  const { programs, setPrograms } = useAdminData();
  const [dialog, setDialog] = useState<ProgramDialogState | null>(null);
  const close = () => setDialog(null);
  const pending = programs.filter((program) => program.paymentStatus === "Pending");
  const pendingCount = pending.reduce((sum, program) => sum + program.pendingPayments, 0);
  const pendingTotal = pending.reduce((sum, program) => sum + program.pendingPaymentTotal, 0);

  function save(program: Program) {
    setPrograms((current) => current.some((item) => item.id === program.id)
      ? current.map((item) => item.id === program.id ? program : item)
      : [...current, program]);
    close();
  }

  return (
    <>
      <PageHeading title="Programs" description="Manage your programs and monitor their activity." action={
        <button type="button" className={styles.primary} onClick={() => setDialog({ kind: "create" })}><Plus size={17} aria-hidden />Create Program</button>
      } />
      <div className={styles.metrics}>
        <Metric label="Total Programs" value={programs.length} detail="Programs in this register" icon={BookOpen} />
        <Metric label="Enrolled Learners" value={programs.reduce((sum, program) => sum + program.enrolled, 0)} detail="Across program cohorts" icon={GraduationCap} tone="green" />
        <Metric label="Pending Payments" value={money(pendingTotal)} detail="Sample amount awaiting reconciliation" icon={CreditCard} tone="orange" accent
          aside={<Badge tone="orange">{pendingCount} Pending</Badge>} />
      </div>

      <DataTable caption="Programs" headings={["Program", "Current Cohort", "Applicants", "Enrolled Learners", "Payment Status", "LMS Status", "Actions"]}>
        {programs.map((program) => (
          <tr key={program.id}>
            <td>
              <button type="button" className={styles.tableLink} onClick={() => setDialog({ kind: "edit", program })}>{program.name}</button>
              {program.draft && <> <Badge>Draft</Badge></>}
            </td>
            <td>{program.cohort || "—"}</td>
            <td>{program.applicants}</td>
            <td><span className={styles.link}>{program.enrolled}</span></td>
            <td><Badge tone={program.paymentStatus === "Paid" ? "green" : program.paymentStatus === "Failed" ? "red" : "orange"}>
              {program.paymentStatus === "Pending" && program.pendingPayments > 0 ? `${program.pendingPayments} pending` : program.paymentStatus}
            </Badge></td>
            <td><Badge tone={lmsTones[program.lms]}>{program.lms === "Synced" ? "✓ Synced" : program.lms}</Badge></td>
            <td><ActionMenu label={`Actions for ${program.name}`} actions={[
              { label: "Edit Program", icon: Pencil, onSelect: () => setDialog({ kind: "edit", program }) },
              { label: "Update Payment Status", icon: CreditCard, onSelect: () => setDialog({ kind: "payment", program }) },
              { label: "Sync with LMS", icon: RefreshCw, onSelect: () => setDialog({ kind: "sync", program }) },
            ]} /></td>
          </tr>
        ))}
      </DataTable>

      {(dialog?.kind === "create" || dialog?.kind === "edit") &&
        <ProgramForm program={dialog.kind === "edit" ? dialog.program : undefined} onClose={close} onSave={save} />}
      {dialog?.kind === "payment" &&
        <PaymentDialog program={dialog.program} onClose={close} onSave={(paymentStatus) => save({ ...dialog.program, paymentStatus })} />}
      {dialog?.kind === "sync" &&
        <LmsDialog onClose={close} onSync={() => save({ ...dialog.program, lms: "Synced" })} />}
    </>
  );
}
