"use client";

import { useState, type FormEvent } from "react";
import { Award, CircleCheck, Clock3, CreditCard, Link2, Plus, Users } from "lucide-react";
import { ActionMenu, AdminMutations, ResourceState, Badge, ChoiceField, DataTable, DetailRows, Dialog, DialogActions, Field, Metric, PageHeading, type Tone } from "./AdminUI";
import { type CohortOption } from "./AdminData";
import { type Learner } from "./ManagementData";
import { useAdminMutation, useAdminResource } from "./admin-api";
import styles from "./admin.module.css";

const tones: Record<Learner["providerPayment" | "enrollment" | "lms"], Tone> =
  { Paid: "green", Pending: "orange", Active: "green", Failed: "red", "Not synced": "orange" };

const options = {
  payment: { title: "Update Payment Status", label: "New Status", values: ["Paid", "Pending", "Failed"], button: "Update status", icon: CreditCard },
  lms: { title: "Update LMS Access", label: "New Access", values: ["Active", "Not synced", "Failed"], button: "Update access", icon: Link2 },
  certificate: { title: "Record certificate", label: "Record certificate", values: ["Issued", "Not yet issued"], button: "Save Changes", icon: Award },
} as const;

type Action = keyof typeof options;

function LearnerRegistration({
  cohorts, onClose, onSave,
}: {
  cohorts: CohortOption[];
  onClose: () => void;
  onSave: (values: { name: string; email: string; phone?: string; cohortId: string }) => void;
}) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim().toLowerCase();
    if (!name) {
      setError("Enter the learner’s full name.");
      return;
    }
    onSave({ name, email, phone: String(form.get("phone")).trim() || undefined, cohortId: String(form.get("cohort")) });
  }

  return (
    <Dialog title="Manual Learner Registration" description="Use this form to add a learner to a program cohort." onClose={onClose}>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <Field label="Full Name">{(id) => <input id={id} name="name" className={styles.control} placeholder="e.g. Blessing Okonkwo" required />}</Field>
          <Field label="Email Address">{(id) => <input id={id} name="email" type="email" className={styles.control} placeholder="learner@example.com" required />}</Field>
          <Field label="Program / Cohort">{(id) => <select id={id} name="cohort" className={styles.control} required>
            <option value="">Select a cohort</option>
            {cohorts.map((cohort) => <option key={cohort.id} value={cohort.id}>{cohort.program} {cohort.name}</option>)}
          </select>}</Field>
          <Field label="WhatsApp Phone Number">{(id) => <input id={id} name="phone" type="tel" className={styles.control} placeholder="+234 000 000 0000" />}</Field>
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Save learner</button></DialogActions>
      </form>
    </Dialog>
  );
}

function UpdateLearner({
  learner, action, close, save,
}: {
  learner: Learner;
  action: Action;
  close: () => void;
  save: (value: string, note: string) => void;
}) {
  const option = options[action];
  return (
    <Dialog title={option.title} onClose={close}>
      <form method="post" onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        save(String(form.get("value")), String(form.get("note") ?? "").trim());
      }}>
        <div className={styles.dialogBody}>
          <ChoiceField label={option.label} name="value" options={option.values} defaultValue={action === "payment" ? learner.paymentReview?.status ?? learner.providerPayment : learner[action]} />
          {action === "payment" && <Field label="Reconciliation note">{(id) => <textarea id={id} name="note" className={styles.control} maxLength={2000} defaultValue={learner.paymentReview?.note} required />}</Field>}
        </div>
        <DialogActions onClose={close}><button type="submit" className={styles.primary}>{option.button}</button></DialogActions>
      </form>
    </Dialog>
  );
}

export function Learners() {
  const resource = useAdminResource<Learner[]>("learners");
  const cohorts = useAdminResource<CohortOption[]>("lookups/cohorts");
  const learners = resource.data ?? [];
  const action = useAdminMutation(resource.reload);
  const [dialog, setDialog] = useState<"create" | { kind: Action | "details"; learner: Learner } | null>(null);
  const close = () => { action.setError(""); setDialog(null); };
  const cohortLabel = (learner: Learner) => [learner.program, learner.cohort].filter(Boolean).join(" · ");

  return (
    <ResourceState {...resource}><AdminMutations action={action}>
      <PageHeading title="Learners" description="Manage learner records, enrolment, payments, LMS access and certificates." action={
        <button type="button" className={styles.primary} onClick={() => setDialog("create")}><Plus size={17} aria-hidden />Add Learner</button>
      } />
      <div className={styles.metrics}>
        <Metric label="Total Learners" value={learners.length} detail="Across active and historic cohorts" icon={Users} />
        <Metric label="Active Learners" value={learners.filter((item) => item.enrollment === "Active").length} detail="Currently enrolled" icon={CircleCheck} tone="green" />
        <Metric label="Pending Enrolment" value={learners.filter((item) => item.enrollment === "Pending").length} detail="Awaiting confirmation" icon={Clock3} tone="orange" />
      </div>
      <DataTable caption="Learners" headings={["Learner", "Email", "Program / Cohort", "Provider Payment", "Staff Review", "Enrolment", "LMS", "Certificate", "Actions"]}>
        {learners.map((learner) => <tr key={learner.id}>
          <td><button type="button" className={styles.tableLink} onClick={() => setDialog({ kind: "details", learner })}>{learner.name}</button></td>
          <td>{learner.email}</td><td>{cohortLabel(learner)}</td>
          <td><Badge tone={tones[learner.providerPayment]}>{learner.providerPayment}</Badge></td>
          <td>{learner.paymentReview ? <Badge tone={tones[learner.paymentReview.status]}>{learner.paymentReview.status}</Badge> : "—"}</td>
          <td><Badge tone={tones[learner.enrollment]}>{learner.enrollment}</Badge></td>
          <td><Badge tone={tones[learner.lms]}>{learner.lms}</Badge></td>
          <td>{learner.certificate}</td>
          <td><ActionMenu label={`Actions for ${learner.name}`} actions={(["payment", "lms", "certificate"] as const).map((kind) => ({
            label: kind === "certificate" ? "Record Certificate" : options[kind].title,
            icon: options[kind].icon, onSelect: () => setDialog({ kind, learner }),
          }))} /></td>
        </tr>)}
      </DataTable>
      {dialog === "create" && (cohorts.data?.length ?
        <LearnerRegistration cohorts={cohorts.data} onClose={close} onSave={(values) => void action.save("learners", "POST", values, close)} /> :
        <Dialog title="Manual Learner Registration" onClose={close}><div className={styles.dialogBody}><ResourceState {...cohorts}>Create a cohort before adding a learner.</ResourceState></div></Dialog>)}
      {dialog && typeof dialog === "object" && (dialog.kind === "details"
        ? <Dialog title={dialog.learner.name} description={dialog.learner.email} drawer onClose={close}>
          <div className={styles.dialogBody}><DetailRows items={[
            ["Program / Cohort", cohortLabel(dialog.learner)], ["WhatsApp", dialog.learner.phone || "—"],
            ["Provider Payment", dialog.learner.providerPayment], ["Staff Review", dialog.learner.paymentReview?.status ?? "—"], ["Reconciliation Note", dialog.learner.paymentReview?.note ?? "—"], ["Enrolment", dialog.learner.enrollment],
            ["LMS access", dialog.learner.lms], ["Certificate", dialog.learner.certificate],
          ]} /></div>
        </Dialog>
        : <UpdateLearner learner={dialog.learner} action={dialog.kind} close={close} save={(value, note) => {
          const path = "learners/" + dialog.learner.id;
          if (dialog.kind === "payment") void action.save(path + "/payment-reviews", "POST", { status: value, note }, close);
          if (dialog.kind === "lms") void action.save(path + "/lms", "PATCH", { status: value }, close);
          if (dialog.kind === "certificate") void action.save(path + "/certificate", "PATCH", { issued: value === "Issued" }, close);
        }} />)}
    </AdminMutations></ResourceState>
  );
}
