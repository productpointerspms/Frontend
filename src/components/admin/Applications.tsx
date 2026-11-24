"use client";

import { useState } from "react";
import { ChevronRight, ClipboardList, ClipboardCheck, Hourglass } from "lucide-react";
import { Badge, ChoiceField, DataTable, DetailRows, Dialog, DialogActions, Field, Metric, PageHeading, displayDate } from "./AdminUI";
import { useManagement, saveRecord, type Application, type ApplicationStatus } from "./ManagementData";
import styles from "./admin.module.css";

const statuses: ApplicationStatus[] = ["New", "Under Review", "Shortlisted", "Accepted", "Rejected"];
const tones = { New: "purple", "Under Review": "orange", Shortlisted: "purple", Accepted: "green", Rejected: "red" } as const;
const reviewers = ["Unassigned", "Tomi A.", "Kunle O.", "Blessing E."];
type Filter = Application["type"] | "All";

function ApplicationDetails({
  application, onClose, onSave,
}: {
  application: Application;
  onClose: () => void;
  onSave: (value: Application) => void;
}) {
  const [showSubmission, setShowSubmission] = useState(false);

  return (
    <Dialog title={application.name} description={application.email} drawer onClose={onClose}>
      <form method="post" onSubmit={(event) => {
        event.preventDefault();
        const values = new FormData(event.currentTarget);
        onSave({ ...application, status: values.get("status") as ApplicationStatus,
          reviewer: String(values.get("reviewer")), notes: String(values.get("notes")).trim() });
      }}>
        <div className={styles.dialogBody}>
          <div><Badge tone={tones[application.status]}>{application.status}</Badge></div>
          <div className={`${styles.infoBox} ${styles.lmsInfo}`}>
            <p className={styles.infoLabel}>Target Opportunity</p>
            <p className={styles.infoValue}>{application.opportunity}</p>
            <p className={styles.hint}>Submitted {displayDate(application.submitted)}</p>
          </div>
          <section className={styles.detailSection}>
            <h3>Applicant Profile</h3>
            <DetailRows items={[
              ["Full name", application.name], ["Submission date", displayDate(application.submitted)],
              ["Email address", application.email], ["Phone number", application.phone],
              ["Application type", application.type], ["Opportunity", application.opportunity],
            ]} />
            <button type="button" className={styles.link} aria-expanded={showSubmission}
              onClick={() => setShowSubmission(!showSubmission)}>{showSubmission ? "Hide Submission" : "View Submission"}</button>
            {showSubmission && <div className={styles.infoBox}>
              <p className={styles.infoLabel}>Statement of purpose</p>
              <p>{application.statement}</p>
            </div>}
          </section>
          <section className={`${styles.detailSection} ${styles.infoBox}`}>
            <h3>Internal review</h3>
            <p className={styles.hint}>Manage the review without changing the applicant’s submission.</p>
            <div className={styles.fieldRow}>
              <ChoiceField label="Application Status" name="status" options={statuses} defaultValue={application.status} />
              <ChoiceField label="Assigned Reviewer" name="reviewer" options={reviewers} defaultValue={application.reviewer} />
            </div>
            <Field label="Internal Review Notes">{(id) => (
              <textarea id={id} name="notes" className={styles.control} placeholder="Add your assessment or next steps…"
                defaultValue={application.notes} />
            )}</Field>
          </section>
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Save Changes</button></DialogActions>
      </form>
    </Dialog>
  );
}

export function Applications({ initialFilter }: { initialFilter: Filter }) {
  const { records: { applications }, update } = useManagement();
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [selected, setSelected] = useState<Application | null>(null);
  const rows = filter === "All" ? applications : applications.filter((item) => item.type === filter);
  const close = () => setSelected(null);
  return (
    <>
      <PageHeading title="Applications" description="Review and manage applications across ProductPointers programs." action={
        <label className={styles.filter}>
          <span>Application type</span>
          <select className={styles.control} value={filter} onChange={(event) => setFilter(event.target.value as Filter)}>
            <option value="All">All applications</option><option>Program</option><option>Scholarship</option><option>Coaching</option>
          </select>
        </label>
      } />
      <div className={styles.metrics}>
        <Metric label="New Submissions" value={applications.filter(({ status }) => status === "New").length} detail="Awaiting first review" icon={ClipboardList} />
        <Metric label="Under Review" value={applications.filter(({ status }) => status === "Under Review").length} detail="Currently assigned" icon={Hourglass} tone="green" />
        <Metric label="Shortlisted" value={applications.filter(({ status }) => status === "Shortlisted").length} detail="Qualified for interview" icon={ClipboardCheck} tone="orange" />
      </div>
      <DataTable caption="Applications" headings={["Applicant", "Type", "Program / Scholarship", "Submitted Date", "Status", "Assigned Reviewer", "Actions"]}>
        {rows.map((application) => <tr key={application.id}>
          <td><button type="button" className={styles.tableLink} onClick={() => setSelected(application)}>{application.name}</button></td>
          <td>{application.type}</td><td>{application.opportunity}</td><td>{displayDate(application.submitted)}</td>
          <td><Badge tone={tones[application.status]}>{application.status}</Badge></td><td>{application.reviewer}</td>
          <td><button type="button" className={styles.iconButton} aria-label={`Review ${application.name}`} onClick={() => setSelected(application)}>
            <ChevronRight size={17} aria-hidden />
          </button></td>
        </tr>)}
        {rows.length === 0 && <tr><td colSpan={7}>No applications match this type.</td></tr>}
      </DataTable>
      {selected && <ApplicationDetails application={selected} onClose={close} onSave={(value) => {
        update("applications", (all) => saveRecord(all, value));
        close();
      }} />}
    </>
  );
}
