"use client";

import Link from "next/link";
import { InterviewVoicePilot } from "./InterviewVoicePilot";
import { useState } from "react";
import { CircleCheck, Clock3, Edit, Eye, Plus, Trash2, Users, X } from "lucide-react";
import { ActionMenu, Badge, DataTable, DetailRows, Metric, PageHeading, displayDate } from "./AdminUI";
import {
  PreviewDialog, PreviewFilters, PreviewInput, PreviewNotes, PreviewNotice, PreviewPagination, PreviewPerson, usePreviewList, value,
} from "./PreviewControls";
import { adminRequest, useAdminResource } from "./admin-api";
import { saveInterviewPreview, type InterviewPreview, type InterviewQuestion } from "./interview-preview";
import styles from "./admin.module.css";
import ui from "./preview.module.css";

const reviewStatuses = ["New", "Under Review", "Shortlisted", "Accepted", "Rejected"];
type InterviewResult = {
  id:string; name:string; email:string; date:string|null; deadline:string|null; invitedAt:string|null;
  config:InterviewPreview|null; answers:Record<string,string>; assessment:null|{percentage:number;points:number;possible:number;model:string;results:{id:string;points:number;maxScore:number;reason:string;evidence:string}[]};
  responses:{question:string;answer:string}[]; status:string; notes:string;
};
type DialogState =
  | { kind: "settings" | "questions" | "publish" }
  | { kind: "assessment" | "accept" | "shortlist" | "reject"; result: InterviewResult }
  | { kind: "question" | "delete"; question?: InterviewQuestion };

export function AiInterview() {
  const config = useAdminResource<InterviewPreview>("interviews/config");
  const records = useAdminResource<InterviewResult[]>("interviews");
  if (!config.data || !records.data) return <p role="status">{config.error || records.error || "Loading interviews…"}</p>;
  return <InterviewWorkspace initialConfig={config.data} results={records.data} reload={records.reload}/>;
}

function InterviewWorkspace({initialConfig,results,reload}:{initialConfig:InterviewPreview;results:InterviewResult[];reload:()=>void}){
  const [publishedPreview,setPublishedPreview]=useState(initialConfig);
  const { questions: published, duration, intro } = publishedPreview;
  const [questions, setQuestions] = useState(published);
  const [selectedId, setSelectedId] = useState(questions[0]?.id);
  const [editingError, setEditingError] = useState("");
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [feedback, setFeedback] = useState("");
  const list = usePreviewList(results, (row) => row.name + " " + row.email, (row) => row.status, (row) => row.date || row.invitedAt || "");
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
    const question = { id: existing?.id ?? crypto.randomUUID(), group, prompt, criteria, maxScore:Number(value(data,"maxScore")), followUp: value(data, "followUp") };
    setQuestions((all) => existing ? all.map((item) => item.id === existing.id ? question : item) : [...all, question]);
    setSelectedId(question.id);
    showQuestions();
  }

  return <>
    <PageHeading title="AI Interview" description="Manage interview questions, evaluate applicant responses and control interview decisions."
      action={<div className={ui.actions}>
        <button type="button" className={styles.secondary} onClick={() => setDialog({ kind: "settings" })}>Interview settings</button>
        <Link href="/ai-interview/setup?preview=1" onClick={()=>saveInterviewPreview(duration,published,intro)} className={styles.secondary}>Preview interview</Link>
        <button type="button" className={styles.primary} onClick={showQuestions}>Manage questions</button>
      </div>} />
    {feedback && <PreviewNotice feedback={feedback} />}
    <InterviewVoicePilot questions={published.map(question => question.prompt)} minutes={duration} />
    <div className={styles.metrics} data-columns="4">
      <Metric label="Total interviewed" value={results.filter(row=>row.date).length} detail="Submitted interviews" icon={Users} />
      <Metric label="Pending review" value={results.filter((row) => row.date && ["New","Under Review"].includes(row.status)).length} detail="Awaiting an admin decision" icon={Clock3} tone="orange" />
      <Metric label="Shortlisted" value={results.filter((row) => row.status === "Shortlisted").length} detail="Awaiting the next step" icon={CircleCheck} tone="green" />
      <Metric label="Rejected" value={results.filter((row) => row.status === "Rejected").length} detail="Reviewed by the team" icon={X} tone="red" />
    </div>
    <section className={`${styles.panel} ${ui.tablePanel}`} aria-labelledby="interview-results-title">
      <div className={styles.panelHeader}><h2 id="interview-results-title">Interview results <small>{results.length}</small></h2><button className={styles.secondary} onClick={reload}>Refresh results</button></div>
      <PreviewFilters list={list} placeholder="Search applicants…" statusLabel="Statuses" statuses={reviewStatuses} dateLabel="Completed date" />
      <DataTable caption="Interview results" headings={["Applicant", "Completed", "AI score", "Commitment", "Interview", "Review status", "Actions"]}>
        {list.rows.map((row) => <tr key={row.id}>
          <td><PreviewPerson name={row.name} email={row.email} open={() => setDialog({ kind: "assessment", result: row })} /></td>
          <td>{row.date?displayDate(row.date):"—"}</td>
          <td>{row.assessment ? row.assessment.percentage+" / 100" : "—"}</td>
          <td>{row.assessment?.results.find(item=>row.config?.questions.some(q=>q.id===item.id && q.group.toLowerCase()==="commitment"))?.evidence || "—"}</td>
          <td>{row.assessment ? "Assessed" : row.date ? "Awaiting assessment" : row.deadline ? "In progress" : row.invitedAt ? "Invited" : "Invitation queued"}</td><td><Badge tone={row.status === "Rejected" ? "muted" : "purple"}>{row.status}</Badge></td>
          <td><ActionMenu label={`Actions for ${row.name}`} actions={[
            { label: "View assessment", icon: Eye, onSelect: () => setDialog({ kind: "assessment", result: row }) },
            ...(row.assessment ? [{label:"Accept applicant",icon:CircleCheck,onSelect:()=>setDialog({kind:"accept",result:row})}] : []),
            { label: "Shortlist applicant", icon: CircleCheck, onSelect: () => setDialog({ kind: "shortlist", result: row }) },
            { label: "Reject applicant", icon: X, onSelect: () => setDialog({ kind: "reject", result: row }) },
          ]} /></td>
        </tr>)}
      </DataTable>
      <PreviewPagination list={list} noun="applicants" />
    </section>
    {dialog?.kind === "settings" && <PreviewDialog title="Interview settings" close={close} submit={async (data) => {
      const nextDuration = Number(value(data, "duration"));
      const nextIntro = value(data, "intro");
      if (!nextIntro) return "Enter candidate instructions.";
      await adminRequest("interviews/config","PUT",{duration:nextDuration,questions:published,intro:nextIntro});
      setPublishedPreview({ questions: published, duration: nextDuration, intro: nextIntro });
      finish("Interview settings saved.");
    }}>
      <PreviewInput name="duration" label="Interview duration (minutes)" type="number" min={1} max={120} value={duration} />
      <PreviewNotes name="intro" label="Candidate instructions" value={intro} required />
      <p className={styles.hint}>An administrator reviews each assessment before an admissions decision.</p>
    </PreviewDialog>}
    {dialog && "result" in dialog && <PreviewDialog key={dialog.kind}
      title={dialog.kind === "assessment" ? "Applicant interview assessment" : dialog.kind === "accept" ? "Accept applicant" : dialog.kind === "shortlist" ? "Shortlist applicant?" : "Reject applicant?"}
      description={dialog.result.name} close={close} drawer={dialog.kind === "assessment"} danger={dialog.kind === "reject"}
      save={dialog.kind === "accept" ? "Accept applicant" : dialog.kind === "shortlist" ? "Shortlist applicant" : "Reject applicant"}
      submit={dialog.kind === "assessment" ? undefined : async (data) => {
        const notes = value(data, "notes");
        if (dialog.kind === "reject" && !notes) return "Enter a reason for rejection.";
        const status = dialog.kind === "accept" ? "Accepted" : dialog.kind === "shortlist" ? "Shortlisted" : "Rejected";
        await adminRequest("apprenticeship/applicants/"+dialog.result.id,"PATCH",{decision:status,notes});
        reload();finish("Review decision saved.");
      }}>
      {dialog.kind === "assessment" ? <>
        <DetailRows items={[["Email",dialog.result.email],["Status",dialog.result.status],["Score",dialog.result.assessment ? `${dialog.result.assessment.points} / ${dialog.result.assessment.possible} (${dialog.result.assessment.percentage}%)` : "Awaiting assessment"],["Review notes",dialog.result.notes||"—"]]} />
        <h3>Original application</h3>
        {dialog.result.responses.map((v,i)=><p key={i}><strong>{v.question}</strong><br/>{v.answer}</p>)}
        <h3>Interview answers and assessment</h3>
        {dialog.result.config?.questions.map(q=>{
          const score=dialog.result.assessment?.results.find(item=>item.id===q.id);
          return <details key={q.id}><summary>{q.prompt}</summary><p>{dialog.result.answers[q.id]||"No answer"}</p><p>{q.criteria}</p>
            {score && <><p>{score.points} / {score.maxScore} · {score.reason}</p><blockquote>{score.evidence}</blockquote></>}</details>;
        })}
        {!dialog.result.date && <button className={styles.secondary} onClick={async()=>{
          try{await adminRequest("interviews/"+dialog.result.id+"/invite","POST",{});reload();finish("Replacement invitation queued.");}
          catch(e){setFeedback(e instanceof Error?e.message:"Could not resend invitation");close();}
        }}>Resend private invitation</button>}
        <div className={ui.actions}>
          {dialog.result.assessment && <button type="button" className={styles.primary} onClick={()=>setDialog({...dialog,kind:"accept"})}>Accept applicant</button>}
          <button type="button" className={styles.primary} onClick={() => setDialog({ ...dialog, kind: "shortlist" })}>Shortlist applicant</button>
          <button type="button" className={styles.secondary} onClick={() => setDialog({ ...dialog, kind: "reject" })}>Reject applicant</button>
        </div>
      </> : <PreviewNotes name="notes" label={dialog.kind === "reject" ? "Reason for rejection" : "Review notes"} required={dialog.kind === "reject"} />}
    </PreviewDialog>}
    {dialog?.kind === "questions" && <PreviewDialog title="Interview question management" description={modified ? "Draft changes pending publication." : "These questions are used for new interview sessions."} wide close={close}>
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
          <PreviewInput name="maxScore" type="number" label="Maximum points" min={1} max={100} value={selected.maxScore??10} />
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
      <PreviewInput name="maxScore" type="number" label="Maximum points" min={1} max={100} value={dialog.question?.maxScore??10} />
      <PreviewNotes name="followUp" label="Follow-up question" value={dialog.question?.followUp} />
    </PreviewDialog>}
    {dialog?.kind === "delete" && <PreviewDialog title="Delete question?" description={dialog.question?.group} danger close={showQuestions}
      save="Delete from draft" submit={() => {
        setQuestions((all) => all.filter((item) => item.id !== dialog.question?.id));
        showQuestions();
      }}><p>Publish the draft to apply the change to future interviews.</p></PreviewDialog>}
    {dialog?.kind === "publish" && <PreviewDialog title="Publish question changes?" close={showQuestions} save="Publish changes" submit={async () => {
      await adminRequest("interviews/config","PUT",{duration,questions,intro});
      setPublishedPreview({ questions, duration, intro });
      finish("Questions published for new interviews.");
    }}><p>New interviews will use these {questions.length} questions.</p></PreviewDialog>}
  </>;
}
