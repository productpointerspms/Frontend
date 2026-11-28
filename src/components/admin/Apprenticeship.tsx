"use client";

import { adminRequest, useAdminResource } from "./admin-api";
import { useState } from "react";
import { CircleCheck, Clock3, Download, Edit, Eye, UserMinus, Users, UserRoundCheck, X } from "lucide-react";
import { ActionMenu, Badge, DataTable, DetailRows, Metric, PageHeading, displayDate } from "./AdminUI";
import {
  PreviewDialog, PreviewFilters, PreviewInput, PreviewNotice, PreviewNotes, PreviewPagination, PreviewPerson, PreviewTabs,
  downloadPreviewCsv, usePreviewList, value,
} from "./PreviewControls";
import styles from "./admin.module.css";
import ui from "./preview.module.css";

const decisions = ["Pending Review", "Shortlisted", "Accepted", "Rejected"] as const;
type Decision = typeof decisions[number];
type Applicant = {
  id: string; name: string; email: string; applied: string;
  interview: string; decision: Decision; payment: "Not requested" | "Awaiting Payment" | "Paid"; notes?: string;
};
type Learner = { id: string; name: string; email: string; enrolled: string; cohort: string | null; status: "Active" | "Inactive" };

type Modal =
  | { kind: "settings" }
  | { kind: "applicant" | "accept" | "shortlist" | "reject"; applicant: Applicant }
  | { kind: "learner" | "edit" | "deactivate" | "activate"; learner: Learner };

export function Apprenticeship() {
  const resource = useAdminResource<{
    applicants: Applicant[]; learners: Learner[];
    settings: { programme: string; cohort: string | null; capacity: number | null; fee: number };
  }>("apprenticeship");
  const applicants = resource.data?.applicants ?? [];
  const learners = resource.data?.learners ?? [];
  const settings = resource.data?.settings;
  const [view, setView] = useState("Applicants");
  const [modal, setModal] = useState<Modal | null>(null);
  const [feedback, setFeedback] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const applicantsList = usePreviewList(applicants, (row) => row.name + " " + row.email, (row) => row.decision, (row) => row.applied);
  const learnersList = usePreviewList(learners, (row) => row.name + " " + row.email, (row) => row.status, (row) => row.enrolled);
  const close = () => setModal(null);
  const finish = (message: string) => { close(); setFeedback(message); };
  const cohortEnrolled = learners.filter((row) => row.status === "Active" && row.cohort && row.cohort === settings?.cohort).length;
  const enrolled = learners.filter((learner) => learner.status === "Active").length;

  function exportCurrent() {
    const rows = view === "Applicants"
      ? [["Name", "Email", "Applied", "Interview", "Decision", "Payment"], ...applicantsList.results
        .filter((row) => !selected.length || selected.includes(row.id))
        .map((row) => [row.name, row.email, row.applied, row.interview, row.decision, row.payment])]
      : [["Name", "Email", "Enrolled", "Status"], ...learnersList.results.map((row) => [row.name, row.email, row.enrolled, row.status])];
    downloadPreviewCsv(`apprenticeship-${view.toLowerCase()}`, rows);
    setFeedback("Results exported.");
  }

  if (!settings) return <p role="status">{resource.error || "Loading apprenticeship…"}</p>;
  return <>
    <PageHeading title="Apprenticeship" description="Manage your apprenticeship programme, applicants and enrolled learners."
      action={<div className={ui.actions}>
        <button type="button" className={styles.secondary} onClick={exportCurrent}><Download size={16} />Export</button>
        <button type="button" className={styles.primary} onClick={() => setModal({ kind: "settings" })}>Programme settings</button>
      </div>} />
    {feedback && <PreviewNotice feedback={feedback} />}
    <div className={styles.metrics} data-columns="4">
      <Metric label="Total applicants" value={applicants.length} detail="All PPIP applications" icon={Users} />
      <Metric label="Shortlisted applicants" value={applicants.filter((row) => row.decision === "Shortlisted").length} detail="Awaiting the next step" icon={UserRoundCheck} />
      <Metric label="Enrolled learners" value={enrolled} detail="Across PPIP cohorts" icon={CircleCheck} tone="green" />
      <Metric label="Cohort progress" value={`${cohortEnrolled} / ${settings.capacity ?? "—"}`} detail="Enrolled learner target" icon={Clock3}
        aside={<progress className={ui.progress} aria-label="Cohort progress" value={cohortEnrolled} max={settings.capacity ?? undefined} />} />
    </div>
    <section className={`${styles.panel} ${ui.tablePanel}`} aria-label="Apprenticeship register">
      <div className={styles.panelHeader}>
        <PreviewTabs labels={["Applicants", "Learners"]} name="Apprenticeship views" selected={view} onSelect={(next) => { setView(next); setSelected([]); }} />
        <p>Cohort: {settings.cohort || "Unassigned"}</p>
      </div>
      {view === "Applicants" ? <>
        <PreviewFilters list={applicantsList} placeholder="Search applicants…" statusLabel="Decisions" statuses={decisions} dateLabel="Application date" />
        {selected.length > 0 && <div className={ui.filters}><strong>{selected.length} selected</strong>
          <button type="button" className={styles.smallButton} onClick={exportCurrent}>Export selected</button>
          <button type="button" className={styles.link} onClick={() => setSelected([])}>Clear selection</button>
        </div>}
        <DataTable caption="Apprenticeship applicants" headings={["Select", "Applicant", "Applied", "Interview", "Decision", "Payment", "Actions"]}>
          {applicantsList.rows.map((row) => <tr key={row.id}>
            <td><input type="checkbox" aria-label={`Select ${row.name}`} checked={selected.includes(row.id)}
              onChange={(event) => setSelected(event.target.checked ? [...selected, row.id] : selected.filter((id) => id !== row.id))} /></td>
            <td><PreviewPerson name={row.name} email={row.email} open={() => setModal({ kind: "applicant", applicant: row })} /></td>
            <td>{displayDate(row.applied)}</td><td>{row.interview}</td>
            <td><Badge tone={row.decision === "Rejected" ? "muted" : "purple"}>{row.decision}</Badge></td>
            <td><Badge tone={row.payment === "Paid" ? "green" : "muted"}>{row.payment}</Badge></td>
            <td><ActionMenu label={`Actions for ${row.name}`} actions={[
              { label: "View applicant", icon: Eye, onSelect: () => setModal({ kind: "applicant", applicant: row }) },
              ...(row.decision !== "Shortlisted" ? [{ label: "Shortlist applicant", icon: UserRoundCheck, onSelect: () => setModal({ kind: "shortlist", applicant: row }) }] : []),
              ...(row.decision !== "Rejected" ? [{ label: "Reject applicant", icon: X, onSelect: () => setModal({ kind: "reject", applicant: row }) }] : []),
            ]} /></td>
          </tr>)}
        </DataTable>
        <PreviewPagination list={applicantsList} noun="applicants" />
      </> : <>
        <PreviewFilters list={learnersList} placeholder="Search learners…" statusLabel="Statuses" statuses={["Active", "Inactive"]} dateLabel="Enrolment date" />
        <DataTable caption="Apprenticeship learners" headings={["Learner", "Enrolled", "Cohort", "Status", "Actions"]}>
          {learnersList.rows.map((row) => <tr key={row.id}>
            <td><PreviewPerson name={row.name} email={row.email} open={() => setModal({ kind: "learner", learner: row })} /></td>
            <td>{displayDate(row.enrolled)}</td><td>{row.cohort || "Unassigned"}</td>
            <td><Badge tone={row.status === "Active" ? "green" : "muted"}>{row.status}</Badge></td>
            <td><ActionMenu label={`Actions for ${row.name}`} actions={[
              { label: "View learner", icon: Eye, onSelect: () => setModal({ kind: "learner", learner: row }) },
              { label: "Edit learner", icon: Edit, onSelect: () => setModal({ kind: "edit", learner: row }) },
              row.status === "Active"
                ? { label: "Deactivate learner", icon: UserMinus, onSelect: () => setModal({ kind: "deactivate", learner: row }) }
                : { label: "Activate learner", icon: UserRoundCheck, onSelect: () => setModal({ kind: "activate", learner: row }) },
            ]} /></td>
          </tr>)}
        </DataTable>
        <PreviewPagination list={learnersList} noun="learners" />
      </>}
    </section>
    {modal?.kind === "settings" && <PreviewDialog title="Programme settings" close={close} submit={async (data) => {
      const programme = value(data, "programme");
      const cohort = value(data, "cohort");
      const capacity = Number(value(data, "capacity"));
      if (!programme || !cohort) return "Enter a programme and cohort name.";
      if (capacity < cohortEnrolled) return "The learner target must cover the current enrolment.";
      await adminRequest("apprenticeship/settings", "PATCH", { programme, cohort, capacity, fee: Number(value(data, "fee")) });
      resource.reload();
      finish("Programme settings saved.");
    }}>
      <PreviewInput name="programme" label="Programme name" value={settings.programme} />
      <PreviewInput name="cohort" label="Cohort name" value={settings.cohort ?? ""} />
      <div className={styles.fieldRow}>
        <PreviewInput name="capacity" label="Learner target" type="number" min={1} value={settings.capacity ?? undefined} />
        <PreviewInput name="fee" label="Programme fee (₦)" type="number" min={0} step="0.01" value={settings.fee} />
      </div>
    </PreviewDialog>}
    {modal && "applicant" in modal && <PreviewDialog key={modal.kind} title={modal.kind === "applicant" ? "Applicant details" : modal.kind === "accept" ? "Accept applicant" : modal.kind === "shortlist" ? "Shortlist applicant?" : "Reject applicant?"}
      description={modal.applicant.name} close={close} drawer={modal.kind === "applicant"} save={modal.kind === "accept" ? "Accept applicant" : modal.kind === "shortlist" ? "Shortlist applicant" : "Reject applicant"} danger={modal.kind === "reject"}
      submit={modal.kind === "applicant" ? undefined : async (data) => {
        const decision = modal.kind === "accept" ? "Accepted" : modal.kind === "shortlist" ? "Shortlisted" : "Rejected";
        const notes = value(data, "notes");
        if (decision === "Rejected" && !notes) return "Enter a reason for rejection.";
        await adminRequest(`apprenticeship/applicants/${modal.applicant.id}`, "PATCH", { decision, notes });
        resource.reload();
        finish(`${modal.applicant.name} marked ${decision.toLowerCase()}.`);
      }}>
      {modal.kind === "applicant" ? <>
        <DetailRows items={[["Email", modal.applicant.email], ["Applied", displayDate(modal.applicant.applied)], ["Interview", modal.applicant.interview],
          ["Decision", modal.applicant.decision], ["Payment", modal.applicant.payment], ["Review notes", modal.applicant.notes || "—"]]} />
        <div className={ui.actions}>
          {modal.applicant.interview === "Completed" && <button type="button" className={styles.primary} onClick={() => setModal({ ...modal, kind: "accept" })}>Accept applicant</button>}
          <button type="button" className={styles.primary} onClick={() => setModal({ ...modal, kind: "shortlist" })}>Shortlist applicant</button>
          <button type="button" className={styles.secondary} onClick={() => setModal({ ...modal, kind: "reject" })}>Reject applicant</button>
        </div>
      </> : <PreviewNotes name="notes" label={modal.kind === "reject" ? "Reason for rejection" : "Review notes"} required={modal.kind === "reject"} />}
    </PreviewDialog>}
    {modal && "learner" in modal && <PreviewDialog key={modal.kind} title={modal.kind === "learner" ? "Learner details" : modal.kind === "edit" ? "Edit learner information" : modal.kind === "deactivate" ? "Deactivate learner?" : "Activate learner?"}
      description={modal.learner.name} close={close} drawer={modal.kind === "learner"} danger={modal.kind === "deactivate"}
      save={modal.kind === "deactivate" ? "Deactivate learner" : modal.kind === "activate" ? "Activate learner" : "Save changes"}
      submit={modal.kind === "learner" ? undefined : async (data) => {
        const learner = modal.learner;
        if (modal.kind === "edit") {
          const name = value(data, "name");
          const email = value(data, "email");
          if (!name || !email) return "Enter a name and email address.";
          await adminRequest(`apprenticeship/learners/${learner.id}`, "PATCH", {name,email});
        } else await adminRequest(`apprenticeship/learners/${learner.id}`, "PATCH", {active:modal.kind === "activate"});
        resource.reload();
        finish("Learner updated.");
      }}>
      {modal.kind === "edit" ? <>
        <PreviewInput name="name" label="Full name" value={modal.learner.name} />
        <PreviewInput name="email" label="Email address" type="email" value={modal.learner.email} />
      </> : modal.kind === "learner" ? <DetailRows items={[["Email", modal.learner.email], ["Cohort", modal.learner.cohort || "Unassigned"], ["Enrolled", displayDate(modal.learner.enrolled)], ["Status", modal.learner.status]]} />
        : <p>Change the learner’s active status for this enrolment.</p>}
    </PreviewDialog>}
  </>;
}
