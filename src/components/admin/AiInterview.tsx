"use client";

import Link from "next/link";
import { InterviewVoicePilot } from "./InterviewVoicePilot";
import { useState } from "react";
import { CircleCheck, Clock3, Edit, Eye, Plus, Trash2, Users, X } from "lucide-react";
import { ActionMenu, Badge, DataTable, DetailRows, Metric, PageHeading, displayDate } from "./AdminUI";
import {
  PreviewDialog, PreviewFilters, PreviewInput, PreviewNotes, PreviewNotice, PreviewPagination, PreviewPerson, usePreviewList, value,
} from "./PreviewControls";
import { interviewQuestions, readInterviewPreview, saveInterviewPreview, type InterviewQuestion } from "./interview-preview";
import styles from "./admin.module.css";
import ui from "./preview.module.css";

const reviewStatuses = ["Pending Review", "Shortlisted", "Rejected"] as const;
type ReviewStatus = typeof reviewStatuses[number];
type InterviewResult = { id: number; name: string; email: string; date: string; score: number; commitment: string; status: ReviewStatus; notes?: string };
const initialResults: InterviewResult[] = [
  { id: 1, name: "Adaeze Okafor", email: "adaeze@example.test", date: "2026-11-24T10:42:00Z", score: 82, commitment: "No concerns", status: "Pending Review" },
  { id: 2, name: "Tunde Adeyemi", email: "tunde@example.test", date: "2026-11-24T09:18:00Z", score: 76, commitment: "Needs review", status: "Shortlisted" },
  { id: 3, name: "Ibrahim Bello", email: "ibrahim@example.test", date: "2026-11-23T16:05:00Z", score: 88, commitment: "No concerns", status: "Shortlisted" },
  { id: 4, name: "Temitope Akinola", email: "temitope@example.test", date: "2026-11-23T15:12:00Z", score: 61, commitment: "Needs review", status: "Rejected" },
  { id: 5, name: "Olumide Bakare", email: "olumide@example.test", date: "2026-11-23T11:02:00Z", score: 79, commitment: "No concerns", status: "Pending Review" },
  { id: 6, name: "Zainab Abdullahi", email: "zainab@example.test", date: "2026-11-22T15:10:00Z", score: 72, commitment: "No concerns", status: "Pending Review" },
  { id: 7, name: "Ngozi Nwosu", email: "ngozi@example.test", date: "2026-11-20T13:30:00Z", score: 70, commitment: "Needs review", status: "Pending Review" },
];
type DialogState =
  | { kind: "settings" | "questions" | "publish" }
  | { kind: "assessment" | "shortlist" | "reject"; result: InterviewResult }
  | { kind: "question" | "delete"; question?: InterviewQuestion };

export function AiInterview() {
  const [results, setResults] = useState(initialResults);
  const [publishedPreview, setPublishedPreview] = useState(readInterviewPreview);
  const { questions: published, duration, intro } = publishedPreview;
  const [questions, setQuestions] = useState(published);
  const [selectedId, setSelectedId] = useState(questions[0]?.id);
  const [editingError, setEditingError] = useState("");
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [feedback, setFeedback] = useState("");
  const list = usePreviewList(results, (row) => row.name + " " + row.email, (row) => row.status, (row) => row.date);
  const close = () => setDialog(null);
  const finish = (message: string) => { close(); setFeedback(message); };
  const showQuestions = () => { setEditingError(""); setDialog({ kind: "questions" }); };
  const selected = questions.find((item) => item.id === selectedId) ?? questions[0];
  const modified = questions !== published;

  function editQuestion(data: FormData, existing?: InterviewQuestion) {
    const group = value(data, "group");
    const prompt = value(data, "prompt");
    const criteria = value(data, "criteria");
    if (!group || !prompt || !criteria) return "Enter a group, question and review criteria.";
    const question = { id: existing?.id ?? crypto.randomUUID(), group, prompt, criteria, followUp: value(data, "followUp") };
    setQuestions((all) => existing ? all.map((item) => item.id === existing.id ? question : item) : [...all, question]);
    setSelectedId(question.id);
    showQuestions();
  }

  return <>
    <PageHeading title="AI Interview" description="Manage interview questions, evaluate applicant responses and control interview decisions."
      action={<div className={ui.actions}>
        <button type="button" className={styles.secondary} onClick={() => setDialog({ kind: "settings" })}>Interview settings</button>
        <Link href="/ai-interview/setup" className={styles.secondary}>Preview interview</Link>
        <button type="button" className={styles.primary} onClick={showQuestions}>Manage questions</button>
      </div>} />
    <PreviewNotice feedback={feedback} />
    <InterviewVoicePilot questions={published.map(question => question.prompt)} minutes={duration} />
    <div className={styles.metrics} data-columns="4">
      <Metric label="Total interviewed" value={results.length} detail="Completed sample interviews" icon={Users} />
      <Metric label="Pending review" value={results.filter((row) => row.status === "Pending Review").length} detail="Awaiting an admin decision" icon={Clock3} tone="orange" />
      <Metric label="Shortlisted" value={results.filter((row) => row.status === "Shortlisted").length} detail="Awaiting the next step" icon={CircleCheck} tone="green" />
      <Metric label="Rejected" value={results.filter((row) => row.status === "Rejected").length} detail="Reviewed by the team" icon={X} tone="red" />
    </div>
    <section className={`${styles.panel} ${ui.tablePanel}`} aria-labelledby="interview-results-title">
      <div className={styles.panelHeader}><h2 id="interview-results-title">Interview results <small>{results.length}</small></h2><p>Human review required</p></div>
      <PreviewFilters list={list} placeholder="Search applicants…" statusLabel="Statuses" statuses={reviewStatuses} dateLabel="Completed date" />
      <DataTable caption="Interview results" headings={["Applicant", "Completed", "AI score", "Commitment", "Review status", "Actions"]}>
        {list.rows.map((row) => <tr key={row.id}>
          <td><PreviewPerson name={row.name} email={row.email} open={() => setDialog({ kind: "assessment", result: row })} /></td>
          <td>{displayDate(row.date)}</td>
          <td><strong>{row.score} / 100</strong><br /><progress className={ui.progress} value={row.score} max={100} aria-label="Sample AI score" /></td>
          <td>{row.commitment}</td><td><Badge tone={row.status === "Rejected" ? "muted" : "purple"}>{row.status}</Badge></td>
          <td><ActionMenu label={`Actions for ${row.name}`} actions={[
            { label: "View assessment", icon: Eye, onSelect: () => setDialog({ kind: "assessment", result: row }) },
            { label: "Shortlist applicant", icon: CircleCheck, onSelect: () => setDialog({ kind: "shortlist", result: row }) },
            { label: "Reject applicant", icon: X, onSelect: () => setDialog({ kind: "reject", result: row }) },
          ]} /></td>
        </tr>)}
      </DataTable>
      <PreviewPagination list={list} noun="applicants" />
    </section>
    {dialog?.kind === "settings" && <PreviewDialog title="Interview settings" close={close} submit={(data) => {
      const nextDuration = Number(value(data, "duration"));
      const nextIntro = value(data, "intro");
      if (!nextIntro) return "Enter candidate instructions.";
      try { saveInterviewPreview(nextDuration, published, nextIntro); }
      catch { return "Browser storage is unavailable. Try again with storage enabled."; }
      setPublishedPreview({ questions: published, duration: nextDuration, intro: nextIntro });
      finish("Sample interview settings saved.");
    }}>
      <PreviewInput name="duration" label="Interview duration (minutes)" type="number" min={1} max={120} value={duration} />
      <PreviewNotes name="intro" label="Candidate instructions" value={intro} required />
      <p className={styles.hint}>An administrator reviews each assessment before an admissions decision.</p>
    </PreviewDialog>}
    {dialog && "result" in dialog && <PreviewDialog key={dialog.kind}
      title={dialog.kind === "assessment" ? "Applicant interview assessment" : dialog.kind === "shortlist" ? "Shortlist applicant?" : "Reject applicant?"}
      description={dialog.result.name} close={close} drawer={dialog.kind === "assessment"} danger={dialog.kind === "reject"}
      save={dialog.kind === "shortlist" ? "Shortlist applicant" : "Reject applicant"}
      submit={dialog.kind === "assessment" ? undefined : (data) => {
        const notes = value(data, "notes");
        if (dialog.kind === "reject" && !notes) return "Enter a reason for rejection.";
        const status = dialog.kind === "shortlist" ? "Shortlisted" : "Rejected";
        setResults((all) => all.map((row) => row.id === dialog.result.id ? { ...row, status, ...(notes ? { notes } : {}) } : row));
        finish("Sample review decision saved.");
      }}>
      {dialog.kind === "assessment" ? <>
        <DetailRows items={[["Email", dialog.result.email], ["Completed", displayDate(dialog.result.date)], ["Sample AI score", `${dialog.result.score} / 100`],
          ["Commitment", dialog.result.commitment], ["Review status", dialog.result.status], ["Review notes", dialog.result.notes || "—"]]} />
        <h3>Assessment evidence</h3>
        {interviewQuestions.map((question) => <details key={question.id} className={styles.infoBox}>
          <summary>{question.group}</summary><p>{question.prompt}</p><p className={styles.hint}>{question.criteria}</p>
          <p className={styles.hint}>Sample evidence for manual review.</p>
        </details>)}
        <div className={ui.actions}>
          <button type="button" className={styles.primary} onClick={() => setDialog({ ...dialog, kind: "shortlist" })}>Shortlist applicant</button>
          <button type="button" className={styles.secondary} onClick={() => setDialog({ ...dialog, kind: "reject" })}>Reject applicant</button>
        </div>
      </> : <PreviewNotes name="notes" label={dialog.kind === "reject" ? "Reason for rejection" : "Review notes"} required={dialog.kind === "reject"} />}
    </PreviewDialog>}
    {dialog?.kind === "questions" && <PreviewDialog title="Interview question management" description={modified ? "Draft changes pending publication." : "Questions are published to the local preview."} wide close={close}>
      <div className={ui.actions}>
        <button type="button" className={styles.secondary} onClick={() => setDialog({ kind: "question" })}><Plus size={16} />Add question</button>
        <button type="button" className={styles.primary} disabled={!modified || questions.length === 0} onClick={() => setDialog({ kind: "publish" })}>Publish questions</button>
      </div>
      <div className={ui.split}>
        <ol className={ui.questionList}>{questions.map((question) => <li key={question.id} data-selected={selected?.id === question.id}>
          <button type="button" aria-pressed={selected?.id === question.id}
            onClick={() => { setSelectedId(question.id); setEditingError(""); }}><strong>{question.group}</strong></button>
          <ActionMenu label={`Actions for ${question.group}`} actions={[
            { label: "Edit question", icon: Edit, onSelect: () => { setSelectedId(question.id); setEditingError(""); } },
            { label: "Delete question", icon: Trash2, onSelect: () => setDialog({ kind: "delete", question }) },
          ]} />
        </li>)}</ol>
        {selected ? <form className={styles.formGroup} key={selected.id} onSubmit={(event) => {
          event.preventDefault();
          setEditingError(editQuestion(new FormData(event.currentTarget), selected) ?? "");
        }}>
          <PreviewInput name="group" label="Question group" value={selected.group} />
          <PreviewNotes name="prompt" label="Question" value={selected.prompt} required />
          <PreviewNotes name="criteria" label="Assessment criteria" value={selected.criteria} required />
          <PreviewNotes name="followUp" label="Follow-up question" value={selected.followUp} />
          {editingError && <p className={styles.error} role="alert">{editingError}</p>}
          <button type="submit" className={styles.secondary}>Save draft</button>
        </form> : <p>Add a question to start a new draft.</p>}
      </div>
    </PreviewDialog>}
    {dialog?.kind === "question" && <PreviewDialog title={dialog.question ? "Edit interview question" : "Add interview question"} wide close={showQuestions}
      save="Save draft" submit={(data) => editQuestion(data, dialog.question)}>
      <PreviewInput name="group" label="Question group" value={dialog.question?.group} />
      <PreviewNotes name="prompt" label="Question" value={dialog.question?.prompt} required />
      <PreviewNotes name="criteria" label="Assessment criteria" value={dialog.question?.criteria} required />
      <PreviewNotes name="followUp" label="Follow-up question" value={dialog.question?.followUp} />
    </PreviewDialog>}
    {dialog?.kind === "delete" && <PreviewDialog title="Delete question?" description={dialog.question?.group} danger close={showQuestions}
      save="Delete from draft" submit={() => {
        setQuestions((all) => all.filter((item) => item.id !== dialog.question?.id));
        showQuestions();
      }}><p>Publish the draft to apply the change to the sample interview.</p></PreviewDialog>}
    {dialog?.kind === "publish" && <PreviewDialog title="Publish question changes?" close={showQuestions} save="Publish changes" submit={() => {
      try { saveInterviewPreview(duration, questions, intro); }
      catch { return "Browser storage is unavailable. Try again with storage enabled."; }
      setPublishedPreview({ questions, duration, intro });
      finish("Questions published to the local interview preview.");
    }}><p>The browser preview will use these {questions.length} questions.</p></PreviewDialog>}
  </>;
}
