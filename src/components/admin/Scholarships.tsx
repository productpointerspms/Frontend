"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, GraduationCap, Pencil, Plus, Trash2, Users } from "lucide-react";
import { ActionMenu, AdminMutations, ResourceState, Badge, DataTable, Dialog, DialogActions, Field, Metric, PageHeading, displayDate, money } from "./AdminUI";
import { fieldTypes, type ProgramOption, type FieldType, type FormField, type Scholarship, type ScholarshipStatus } from "./AdminData";
import { useAdminMutation, useAdminResource } from "./admin-api";
import styles from "./admin.module.css";

const statuses: ScholarshipStatus[] = ["Open", "Closed", "Draft"];
const tones = { Open: "green", Closed: "orange", Draft: "muted" } as const;

function AwardInputs({
  tuition, amount, onAmount,
}: {
  tuition: string;
  amount: string;
  onAmount: (amount: string) => void;
}) {
  const contribution = Math.max(0, Number(tuition) - Number(amount));
  return (
    <>
      <div className={styles.mutedRow}><span>Full Tuition</span><strong>{tuition ? money(Number(tuition)) : "—"}</strong></div>
      <Field label="Scholarship Amount (₦)">{(id) => (
        <input id={id} type="number" min="0" step="0.01" max={tuition || undefined} value={amount} className={styles.control} onChange={(event) => onAmount(event.target.value)} required />
      )}</Field>
      <div className={`${styles.infoBox} ${styles.lmsInfo} ${styles.previewCost}`}>
        <span>Calculated Applicant Contribution</span>
        <strong>{money(contribution)}</strong>
      </div>
    </>
  );
}

function DatesAndSlots({ scholarship }: { scholarship?: Scholarship }) {
  return (
    <div className={styles.fieldRow}>
      <Field label="Application Deadline">{(id) => (
        <input id={id} type="date" name="deadline" className={styles.control} defaultValue={scholarship?.deadline.slice(0, 10)} required />
      )}</Field>
      <Field label="Available Slots">{(id) => (
        <input id={id} name="slots" type="number" min="0" className={styles.control} defaultValue={scholarship?.slots} placeholder="10" required />
      )}</Field>
    </div>
  );
}

function StatusAndVisibility({ scholarship }: { scholarship?: Scholarship }) {
  return (
    <div className={styles.fieldRow}>
      <Field label={scholarship ? "Scholarship Status" : "Initial Application Status"}>{(id) => (
        <select id={id} name="status" className={styles.control} defaultValue={scholarship?.status ?? "Open"}>
          {statuses.map((status) => <option key={status}>{status}</option>)}
        </select>
      )}</Field>
      <Field label="Visibility">{(id) => (
        <select id={id} name="visibility" className={styles.control} defaultValue={scholarship?.visibility ?? "Public"}>
          <option>Public</option><option>Hidden</option>
        </select>
      )}</Field>
    </div>
  );
}

type ScholarshipValues = Pick<Scholarship, "name" | "programId" | "description" | "amount" | "deadline" | "slots" | "status" | "visibility" | "fields"> & { eligibility: string[] };

function ScholarshipForm({ scholarship, programs, addFieldOnOpen = false, onClose, onSave }: {
  scholarship?: Scholarship;
  programs: ProgramOption[];
  addFieldOnOpen?: boolean;
  onClose: () => void;
  onSave: (values: ScholarshipValues) => void;
}) {
  const [programId, setProgramId] = useState(scholarship?.programId ?? "");
  const tuition = scholarship?.tuition ?? programs.find((program) => program.id === programId)?.price;
  const [amount, setAmount] = useState(scholarship ? String(scholarship.amount) : "");
  const [eligibility, setEligibility] = useState(scholarship?.eligibility?.split("\n").filter(Boolean) ?? []);
  const [requirement, setRequirement] = useState("");
  const [fields, setFields] = useState<FormField[]>(() => {
    const existing = scholarship?.fields.map((field, index) => ({ ...field, id: String(index) })) ?? [];
    if (addFieldOnOpen) existing.push({ id: "new-field", label: "", type: "Text", required: false });
    return existing;
  });
  const [error, setError] = useState("");

  function addRequirement() {
    const value = requirement.trim();
    if (!value) return;
    setEligibility((current) => [...current, value]);
    setRequirement("");
  }

  function updateField(id: string, update: Partial<Pick<FormField, "label" | "type" | "required">>) {
    setFields((current) => current.map((field) => field.id === id ? { ...field, ...update } : field));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();
    const draft = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "draft";
    if (!text("name") || fields.some((field) => !field.label.trim())) {
      setError("Enter the scholarship name and a label for each application field.");
      return;
    }
    onSave({
      name: text("name"),
      programId,
      description: text("description"),
      eligibility,
      amount: Number(amount),
      deadline: text("deadline"),
      slots: Number(text("slots")),
      status: draft ? "Draft" : text("status") as ScholarshipStatus,
      visibility: text("visibility") as Scholarship["visibility"],
      fields: fields.map(({ label, type, required }) => ({ label: label.trim(), type, required })),
    });
  }

  return (
    <Dialog title={scholarship ? "Scholarship Details" : "Create Scholarship"} drawer={Boolean(scholarship)} description="Set up funding, eligibility and the application experience." onClose={onClose} wide>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <fieldset className={styles.formGroup}>
            <legend>Basic Details</legend>
            <Field label="Scholarship Name">{(id) => (
              <input id={id} name="name" className={styles.control} placeholder="Enter scholarship name" defaultValue={scholarship?.name} required />
            )}</Field>
            <Field label="Program">{(id) => (
              scholarship ? <input id={id} value={scholarship.program} className={styles.control} readOnly /> :
                <select id={id} className={styles.control} value={programId} onChange={(event) => setProgramId(event.target.value)} required>
                  <option value="" disabled>Select a program</option>
                  {programs.map((program) => <option key={program.id} value={program.id}>{program.name}</option>)}
                </select>
            )}</Field>
            <Field label="Description">{(id) => (
              <textarea id={id} name="description" className={styles.control} placeholder="Describe the mission and scope of this scholarship" defaultValue={scholarship?.description} />
            )}</Field>
          </fieldset>
          <fieldset className={styles.formGroup}>
            <legend>Eligibility</legend>
            <Field label="Eligibility Requirement">{(id) => (
              <div className={styles.inlineEntry}>
                <input id={id} className={styles.control} placeholder="Enter an eligibility requirement" value={requirement}
                  onChange={(event) => setRequirement(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") { event.preventDefault(); addRequirement(); }
                  }} />
                <button type="button" className={styles.secondary} onClick={addRequirement}>Add</button>
              </div>
            )}</Field>
            {eligibility.map((item, position) => (
              <div key={`${position}-${item}`} className={styles.mutedRow}>
                <span>{item}</span>
                <button type="button" className={styles.iconButton} aria-label={`Remove requirement ${position + 1}`}
                  onClick={() => setEligibility((current) => current.filter((_, index) => index !== position))}>
                  <Trash2 size={15} aria-hidden />
                </button>
              </div>
            ))}
          </fieldset>
          <fieldset className={styles.formGroup}>
            <legend>Award &amp; Availability</legend>
            <AwardInputs tuition={tuition == null ? "" : String(tuition)} amount={amount} onAmount={setAmount} />
            <DatesAndSlots scholarship={scholarship} />
          </fieldset>
          <fieldset className={styles.formGroup}>
            <legend>Application Form</legend>
            {fields.map((field, position) => (
              <div className={styles.inlineFormField} key={field.id}>
                <Field label={`Field ${position + 1} label`}>{(id) => (
                  <input id={id} className={styles.control} value={field.label} maxLength={160} autoFocus={field.id === "new-field"} required onChange={(event) => updateField(field.id, { label: event.target.value })} />
                )}</Field>
                <Field label={`Field ${position + 1} type`}>{(id) => (
                  <select id={id} className={styles.control} value={field.type} onChange={(event) => updateField(field.id, { type: event.target.value as FieldType })}>
                    {fieldTypes.map((type) => <option key={type}>{type}</option>)}
                  </select>
                )}</Field>
                <label className={styles.option}><input type="checkbox" checked={field.required} onChange={(event) => updateField(field.id, { required: event.target.checked })} />Required</label>
                <button type="button" className={styles.iconButton} aria-label={`Remove field ${position + 1}`}
                  onClick={() => setFields((current) => current.filter((item) => item.id !== field.id))}>
                  <Trash2 size={15} aria-hidden />
                </button>
              </div>
            ))}
            <div><button type="button" className={styles.smallButton} disabled={fields.length >= 80} onClick={() =>
              setFields((current) => [...current, { id: crypto.randomUUID(), label: "", type: "Text", required: false }])}>
              <Plus size={14} aria-hidden />Add Field
            </button></div>
          </fieldset>
          <StatusAndVisibility scholarship={scholarship} />
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
        <DialogActions onClose={onClose}>
          <button type="submit" className={styles.secondary} value="draft">Save as draft</button>
          <button type="submit" className={styles.primary}>{scholarship ? "Save Changes" : "Publish"}</button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export function Scholarships() {
  const resource = useAdminResource<Scholarship[]>("scholarships");
  const programs = useAdminResource<ProgramOption[]>("lookups/programs");
  const scholarships = resource.data ?? [];
  const action = useAdminMutation(resource.reload);
  const [dialog, setDialog] = useState<"create" | { scholarship: Scholarship; addField?: boolean } | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const selected = scholarships.find(item => item.id === selectedId) ?? scholarships[0];
  const close = () => { action.setError(""); setDialog(null); };

  return (
    <ResourceState {...resource}><AdminMutations action={action}>
      <PageHeading title="Scholarships" description="Manage scholarship opportunities, funding and application availability." action={
        <button type="button" className={styles.primary} onClick={() => setDialog("create")}><Plus size={17} aria-hidden />Create Scholarship</button>
      } />
      <div className={styles.metrics}>
        <Metric label="Total Scholarships" value={scholarships.length} detail="Scholarships in this register" icon={GraduationCap} />
        <Metric label="Open Scholarships" value={scholarships.filter((item) => item.status === "Open").length} detail="Currently accepting applications" icon={CircleCheck} tone="green" />
        <Metric label="Scholarship Recipients" value={scholarships.reduce((total, item) => total + item.recipients, 0)} detail="Paid scholarship applications" icon={Users} tone="orange" />
      </div>
      <DataTable caption="Scholarships" headings={["Scholarship", "Program", "Full Tuition", "Scholarship Amount", "Applicant Pays", "Deadline", "Available Slots", "Status", "Actions"]}>
        {scholarships.map((item) => (
          <tr key={item.id}>
            <td><button type="button" className={styles.tableLink} onClick={() => { setSelectedId(item.id); setDialog({ scholarship: item }); }}>{item.name}</button></td>
            <td>{item.program}</td>
            <td>{money(item.tuition)}</td>
            <td>{money(item.amount)}</td>
            <td>{money(item.contribution)}</td>
            <td>{displayDate(item.deadline)}</td>
            <td>{item.slots}</td>
            <td><Badge tone={tones[item.status]}>{item.status}</Badge></td>
            <td><ActionMenu label={`Actions for ${item.name}`} actions={[{ label: "Edit Scholarship", icon: Pencil, onSelect: () => { setSelectedId(item.id); setDialog({ scholarship: item }); } }]} /></td>
          </tr>
        ))}
      </DataTable>

      <section className={`${styles.panel} ${styles.scholarshipFieldPanel}`} aria-labelledby="scholarship-form-fields">
        <div className={styles.panelHeader}><h2 id="scholarship-form-fields">Scholarship application form fields</h2></div>
        {selected ? <>
          <Field label="Scholarship">{id => (
            <select id={id} className={styles.control} value={selected.id} onChange={event => setSelectedId(event.target.value)}>
              {scholarships.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          )}</Field>
          {selected.fields.length ? (
            <ul className={styles.scholarshipFields}>
              {selected.fields.map((field, index) => (
                <li className={styles.mutedRow} key={index}>
                  <span>{field.label}</span><span>{field.type} · {field.required ? "Required" : "Optional"}</span>
                </li>
              ))}
            </ul>
          ) : <p className={styles.hint}>No custom fields have been added to this scholarship.</p>}
          <button type="button" className={styles.smallButton} disabled={selected.fields.length >= 80}
            onClick={() => setDialog({ scholarship: selected, addField: true })}>
            <Plus size={14} aria-hidden />Add field
          </button>
        </> : <p className={styles.hint}>Create a scholarship to manage its application fields.</p>}
      </section>

      {dialog === "create" && (programs.data?.some((program) => program.price !== null) ?
        <ScholarshipForm programs={programs.data.filter((program) => program.price !== null)} onClose={close}
          onSave={(values) => void action.save("scholarships", "POST", values, close)} /> :
        <Dialog title="Create Scholarship" onClose={close}><div className={styles.dialogBody}><ResourceState {...programs}>A program with tuition is required before creating a scholarship.</ResourceState></div></Dialog>)}
      {dialog && typeof dialog === "object" && <ScholarshipForm scholarship={dialog.scholarship} addFieldOnOpen={dialog.addField} programs={[]} onClose={close}
        onSave={(values) => void action.save("scholarships/" + dialog.scholarship.id, "PUT", values, close)} />}
    </AdminMutations></ResourceState>
  );
}
