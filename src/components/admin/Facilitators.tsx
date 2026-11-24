"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, CircleMinus, Pencil, Plus, Users } from "lucide-react";
import { ActionMenu, Badge, ChoiceField, DataTable, Dialog, DialogActions, Field, Metric, PageHeading } from "./AdminUI";
import { useAdminData, type Cohort } from "./AdminData";
import { useManagement, saveRecord, type Facilitator } from "./ManagementData";
import styles from "./admin.module.css";

const roles: Facilitator["role"][] = ["Lead Facilitator", "Facilitator", "Guest Facilitator"];

function FacilitatorForm({
  current, all, cohorts, onClose, onSave,
}: {
  current?: Facilitator;
  all: Facilitator[];
  cohorts: Cohort[];
  onClose: () => void;
  onSave: (value: Facilitator) => void;
}) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim().toLowerCase();
    if (!name || all.some((item) => item.id !== current?.id && item.email.toLowerCase() === email)) {
      setError(name ? "A facilitator with this email already exists." : "Enter the facilitator’s full name.");
      return;
    }
    onSave({ id: current?.id ?? crypto.randomUUID(), name, email, role: form.get("role") as Facilitator["role"],
      cohorts: form.getAll("cohorts").map(String), active: form.get("status") === "Active" });
  }

  return (
    <Dialog title={current ? "Edit Facilitator" : "Add Facilitator"} drawer onClose={onClose}>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <Field label="Full Name">{(id) => <input id={id} name="name" className={styles.control} defaultValue={current?.name} placeholder="Enter full name" required />}</Field>
          <Field label="Email Address">{(id) => <input id={id} name="email" type="email" className={styles.control} defaultValue={current?.email} placeholder="name@example.com" required />}</Field>
          <ChoiceField label="Facilitator Role" name="role" options={roles} defaultValue={current?.role} />
          <fieldset className={styles.formGroup}>
            <legend>Assigned Cohorts</legend>
            <p className={styles.hint}>Select the cohorts this facilitator teaches.</p>
            <div className={styles.selectionList}>
              {cohorts.map((item) => <label key={item.id} className={styles.option}>
                <input type="checkbox" name="cohorts" value={item.id} defaultChecked={current?.cohorts.includes(item.id)} />
                {item.program} {item.name}
              </label>)}
            </div>
          </fieldset>
          <ChoiceField label="Status" name="status" options={["Active", "Inactive"]} defaultValue={current?.active === false ? "Inactive" : "Active"} />
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>{current ? "Save Changes" : "Add Facilitator"}</button></DialogActions>
      </form>
    </Dialog>
  );
}

export function Facilitators() {
  const { cohorts } = useAdminData();
  const { records: { facilitators }, update } = useManagement();
  const [dialog, setDialog] = useState<"create" | { kind: "edit" | "toggle"; facilitator: Facilitator } | null>(null);
  const close = () => setDialog(null);
  const active = facilitators.filter((item) => item.active).length;
  const save = (value: Facilitator) => {
    update("facilitators", (items) => saveRecord(items, value));
    close();
  };

  return (
    <>
      <PageHeading title="Facilitators" description="Manage facilitators, assigned cohorts and availability." action={
        <button type="button" className={styles.primary} onClick={() => setDialog("create")}><Plus size={17} aria-hidden />Add Facilitator</button>
      } />
      <div className={styles.metrics}>
        <Metric label="Total Facilitators" value={facilitators.length} detail="Teaching and support personnel" icon={Users} />
        <Metric label="Active Facilitators" value={active} detail="Available for teaching cohorts" icon={CircleCheck} tone="green" />
        <Metric label="Inactive Facilitators" value={facilitators.length - active} detail="Currently inactive" icon={CircleMinus} tone="orange" />
      </div>
      <DataTable caption="Facilitators" headings={["Facilitator", "Role", "Cohorts", "Email", "Status", "Actions"]}>
        {facilitators.map((item) => <tr key={item.id}>
          <td><button type="button" className={styles.tableLink} onClick={() => setDialog({ kind: "edit", facilitator: item })}>{item.name}</button></td>
          <td>{item.role}</td>
          <td>{cohorts.filter((cohort) => item.cohorts.includes(cohort.id)).map((cohort) => `${cohort.program} ${cohort.name}`).join(", ") || "Unassigned"}</td>
          <td>{item.email}</td><td><Badge tone={item.active ? "green" : "muted"}>{item.active ? "Active" : "Inactive"}</Badge></td>
          <td><ActionMenu label={`Actions for ${item.name}`} actions={[
            { label: "Edit Facilitator", icon: Pencil, onSelect: () => setDialog({ kind: "edit", facilitator: item }) },
            { label: item.active ? "Deactivate" : "Activate", icon: item.active ? CircleMinus : CircleCheck, onSelect: () => setDialog({ kind: "toggle", facilitator: item }) },
          ]} /></td>
        </tr>)}
      </DataTable>
      {dialog === "create" && <FacilitatorForm all={facilitators} cohorts={cohorts} onClose={close} onSave={save} />}
      {dialog && typeof dialog === "object" && (dialog.kind === "edit"
        ? <FacilitatorForm current={dialog.facilitator} all={facilitators} cohorts={cohorts} onClose={close} onSave={save} />
        : <Dialog title={dialog.facilitator.active ? "Deactivate facilitator?" : "Activate facilitator?"}
          description={dialog.facilitator.name} onClose={close}>
          <DialogActions onClose={close}><button type="button" className={styles.primary}
            onClick={() => save({ ...dialog.facilitator, active: !dialog.facilitator.active })}>
            {dialog.facilitator.active ? "Deactivate" : "Activate"}
          </button></DialogActions>
        </Dialog>)}
    </>
  );
}
