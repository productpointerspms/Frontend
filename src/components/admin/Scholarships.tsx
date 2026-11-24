"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, GraduationCap, Pencil, Plus, Trash2, Users, X } from "lucide-react";
import { ActionMenu, Badge, DataTable, Dialog, DialogActions, Field, Metric, PageHeading, displayDate, money } from "./AdminUI";
import { fieldTypes, programOptions, useAdminData, type FieldType, type FormField, type Scholarship, type ScholarshipStatus } from "./AdminData";
import styles from "./admin.module.css";

const statuses: ScholarshipStatus[] = ["Open", "Closed", "Draft"];
const tones = { Open: "green", Closed: "orange", Draft: "muted" } as const;

function AwardInputs({
  tuition, amount, onAmount, onTuition,
}: {
  tuition: string;
  amount: string;
  onAmount: (amount: string) => void;
  onTuition?: (tuition: string) => void;
}) {
  const contribution = Math.max(0, Number(tuition) - Number(amount));
  return (
    <>
      {onTuition
        ? <div className={styles.fieldRow}>
          <Field label="Full Program Tuition (₦)">{(id) => (
            <input id={id} type="number" min="0" className={styles.control} value={tuition} onChange={(event) => onTuition(event.target.value)} required />
          )}</Field>
          <Field label="Scholarship Amount (₦)">{(id) => (
            <input id={id} type="number" min="0" max={tuition || undefined} className={styles.control} value={amount} onChange={(event) => onAmount(event.target.value)} required />
          )}</Field>
        </div>
        : <>
          <div className={styles.mutedRow}><span>Full Tuition</span><strong>{money(Number(tuition))}</strong></div>
          <Field label="Scholarship Amount">{(id) => (
            <input id={id} type="number" min="0" max={tuition} value={amount} className={styles.control} onChange={(event) => onAmount(event.target.value)} required />
          )}</Field>
        </>}
      <div className={`${styles.infoBox} ${styles.lmsInfo} ${styles.previewCost}`}>
        <span>{onTuition ? "Calculated Applicant Contribution" : "Applicant Pays"}</span>
        <strong>{money(contribution)}</strong>
      </div>
    </>
  );
}

function DatesAndSlots({ scholarship }: { scholarship?: Scholarship }) {
  return (
    <div className={styles.fieldRow}>
      <Field label="Application Deadline">{(id) => (
        <input id={id} type="date" name="deadline" className={styles.control} defaultValue={scholarship?.deadline} required />
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

function CreateScholarship({
  defaults, onClose, onSave,
}: {
  defaults: FormField[];
  onClose: () => void;
  onSave: (scholarship: Scholarship) => void;
}) {
  const [tuition, setTuition] = useState("");
  const [amount, setAmount] = useState("");
  const [eligibility, setEligibility] = useState<string[]>([]);
  const [requirement, setRequirement] = useState("");
  const [fields, setFields] = useState<FormField[]>(defaults);
  const [error, setError] = useState("");

  function addRequirement() {
    const value = requirement.trim();
    if (!value) return;
    setEligibility((current) => [...current, value]);
    setRequirement("");
  }

  function updateField(id: string, update: Partial<Pick<FormField, "label" | "type">>) {
    setFields((current) => current.map((field) => field.id === id ? { ...field, ...update } : field));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();
    const draft = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "draft";
    if (!text("name") || !text("description") || fields.some((field) => !field.label.trim())) {
      setError("Enter the scholarship name, description, and a label for each application field.");
      return;
    }
    onSave({
      id: crypto.randomUUID(),
      name: text("name"),
      program: text("program"),
      description: text("description"),
      eligibility,
      tuition: Number(tuition),
      amount: Number(amount),
      deadline: text("deadline"),
      slots: Number(text("slots")),
      status: draft ? "Draft" : text("status") as ScholarshipStatus,
      visibility: text("visibility") as Scholarship["visibility"],
      fields: fields.map((field) => ({ ...field, label: field.label.trim() })),
    });
  }

  return (
    <Dialog title="Create Scholarship" description="Set up funding, eligibility and the application experience." onClose={onClose} wide>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <fieldset className={styles.formGroup}>
            <legend>Basic Details</legend>
            <Field label="Scholarship Name">{(id) => (
              <input id={id} name="name" className={styles.control} placeholder="Enter scholarship name" required />
            )}</Field>
            <Field label="Program">{(id) => (
              <select id={id} name="program" className={styles.control} defaultValue="" required>
                <option value="" disabled>Select a program</option>
                {programOptions.map((name) => <option key={name}>{name}</option>)}
              </select>
            )}</Field>
            <Field label="Description">{(id) => (
              <textarea id={id} name="description" className={styles.control} placeholder="Describe the mission and scope of this scholarship" required />
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
            <AwardInputs tuition={tuition} amount={amount} onTuition={setTuition} onAmount={setAmount} />
            <DatesAndSlots />
          </fieldset>
          <fieldset className={styles.formGroup}>
            <legend>Application Form</legend>
            {fields.map((field, position) => (
              <div className={styles.inlineFormField} key={field.id}>
                <Field label={`Field ${position + 1} label`}>{(id) => (
                  <input id={id} className={styles.control} value={field.label} required onChange={(event) => updateField(field.id, { label: event.target.value })} />
                )}</Field>
                <Field label={`Field ${position + 1} type`}>{(id) => (
                  <select id={id} className={styles.control} value={field.type} onChange={(event) => updateField(field.id, { type: event.target.value as FieldType })}>
                    {fieldTypes.map((type) => <option key={type}>{type}</option>)}
                  </select>
                )}</Field>
                <button type="button" className={styles.iconButton} aria-label={`Remove field ${position + 1}`}
                  onClick={() => setFields((current) => current.filter((item) => item.id !== field.id))}>
                  <Trash2 size={15} aria-hidden />
                </button>
              </div>
            ))}
            <div><button type="button" className={styles.smallButton} onClick={() =>
              setFields((current) => [...current, { id: crypto.randomUUID(), label: "", type: "Text", required: false }])}>
              <Plus size={14} aria-hidden />Add Field
            </button></div>
          </fieldset>
          <StatusAndVisibility />
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
        <DialogActions onClose={onClose}>
          <button type="submit" className={styles.secondary} value="draft">Save as draft</button>
          <button type="submit" className={styles.primary}>Publish</button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

function ScholarshipDetails({
  scholarship, onClose, onSave,
}: {
  scholarship: Scholarship;
  onClose: () => void;
  onSave: (scholarship: Scholarship) => void;
}) {
  const [amount, setAmount] = useState(String(scholarship.amount));

  return (
    <Dialog title="Scholarship Details" onClose={onClose} drawer>
      <form method="post" onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSave({
          ...scholarship,
          program: String(data.get("program")),
          amount: Number(amount),
          deadline: String(data.get("deadline")),
          slots: Number(data.get("slots")),
          status: data.get("status") as ScholarshipStatus,
          visibility: data.get("visibility") as Scholarship["visibility"],
        });
      }}>
        <div className={styles.dialogBody}>
          <Field label="Scholarship Program">{(id) => (
            <select id={id} name="program" className={styles.control} defaultValue={scholarship.program}>
              {programOptions.map((program) => <option key={program}>{program}</option>)}
            </select>
          )}</Field>
          <div><Badge tone={tones[scholarship.status]}>{scholarship.status}</Badge></div>
          <fieldset className={styles.formGroup}>
            <legend>Scholarship Information</legend>
            <AwardInputs tuition={String(scholarship.tuition)} amount={amount} onAmount={setAmount} />
            <DatesAndSlots scholarship={scholarship} />
            <StatusAndVisibility scholarship={scholarship} />
          </fieldset>
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Save Changes</button></DialogActions>
      </form>
    </Dialog>
  );
}

function AddField({ onClose, onSave, fields }: { onClose: () => void; onSave: (field: FormField) => void; fields: FormField[] }) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const label = String(data.get("label")).trim();
    if (!label || fields.some((field) => field.label.toLowerCase() === label.toLowerCase())) {
      setError(label ? "A field with this label already exists." : "Enter a field label.");
      return;
    }
    onSave({ id: crypto.randomUUID(), label, type: data.get("type") as FieldType, required: false });
  }

  return (
    <Dialog title="Add Form Field" description="Add a question to the scholarship application form." onClose={onClose}>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <div className={styles.fieldRow}>
            <Field label="Label">{(id) => <input id={id} name="label" className={styles.control} placeholder="e.g. Phone number" required />}</Field>
            <Field label="Type">{(id) => (
              <select id={id} name="type" className={styles.control}>{fieldTypes.map((type) => <option key={type}>{type}</option>)}</select>
            )}</Field>
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Add Field</button></DialogActions>
      </form>
    </Dialog>
  );
}

export function Scholarships() {
  const { scholarships, setScholarships, applicationFields, setApplicationFields } = useAdminData();
  const [dialog, setDialog] = useState<"create" | "field" | Scholarship | null>(null);
  const [newField, setNewField] = useState<FormField | null>(null);
  const [toast, setToast] = useState("");
  const close = () => setDialog(null);

  function save(scholarship: Scholarship) {
    setScholarships((current) => current.some((item) => item.id === scholarship.id)
      ? current.map((item) => item.id === scholarship.id ? scholarship : item)
      : [...current, scholarship]);
    close();
  }

  function appendField(field: FormField) {
    setApplicationFields((current) => [...current, field]);
    setNewField(field);
    setToast(`Field “${field.label}” added to the form`);
    close();
  }

  return (
    <>
      <PageHeading title="Scholarships" description="Manage scholarship opportunities, funding and application availability." action={
        <button type="button" className={styles.primary} onClick={() => setDialog("create")}><Plus size={17} aria-hidden />Create Scholarship</button>
      } />
      <div className={styles.metrics}>
        <Metric label="Total Scholarships" value={scholarships.length} detail="Scholarships in this preview" icon={GraduationCap} />
        <Metric label="Open Scholarships" value={scholarships.filter((item) => item.status === "Open").length} detail="Currently accepting applications" icon={CircleCheck} tone="green" />
        <Metric label="Scholarship Recipients" value={3} detail="Sample awards" icon={Users} tone="orange" />
      </div>
      <DataTable caption="Scholarships" headings={["Scholarship", "Program", "Full Tuition", "Scholarship Amount", "Applicant Pays", "Deadline", "Available Slots", "Status", "Actions"]}>
        {scholarships.map((item) => (
          <tr key={item.id}>
            <td><button type="button" className={styles.tableLink} onClick={() => setDialog(item)}>{item.name}</button></td>
            <td>{item.program}</td>
            <td>{money(item.tuition)}</td>
            <td>{money(item.amount)}</td>
            <td>{money(item.tuition - item.amount)}</td>
            <td>{displayDate(item.deadline)}</td>
            <td>{item.slots}</td>
            <td><Badge tone={tones[item.status]}>{item.status}</Badge></td>
            <td><ActionMenu label={`Actions for ${item.name}`} actions={[{ label: "Edit Scholarship", icon: Pencil, onSelect: () => setDialog(item) }]} /></td>
          </tr>
        ))}
      </DataTable>

      <section className={styles.panel} aria-labelledby="scholarship-form-fields">
        <div className={styles.panelHeader}><h2 id="scholarship-form-fields">Scholarship application form fields</h2></div>
        <div className={styles.panelBody}>
          <ul className={styles.formFields}>
            {applicationFields.map((field) => (
              <li key={field.id} data-new={newField?.id === field.id}>
                <span>{field.label}{newField?.id === field.id && <> <Badge tone="green">New</Badge></>}</span>
                <span>{field.type} · {field.required ? "Required" : "Optional"}</span>
              </li>
            ))}
          </ul>
          <button type="button" className={styles.smallButton} onClick={() => setDialog("field")}><Plus size={15} aria-hidden />Add Field</button>
        </div>
      </section>

      {dialog === "create" && <CreateScholarship defaults={applicationFields} onClose={close} onSave={save} />}
      {dialog === "field" && <AddField fields={applicationFields} onClose={close} onSave={appendField} />}
      {dialog && typeof dialog === "object" && <ScholarshipDetails scholarship={dialog} onClose={close} onSave={save} />}
      {toast && <div className={styles.toast}>
        <CircleCheck size={17} color="#68df9c" aria-hidden /><span role="status">{toast}</span>
        <button type="button" className={styles.iconButton} aria-label="Dismiss notification" onClick={() => setToast("")}><X size={16} aria-hidden /></button>
      </div>}
    </>
  );
}
