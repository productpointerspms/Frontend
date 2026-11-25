"use client";

import { useState, type FormEvent } from "react";
import { BookOpen, CircleCheck, FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { ActionMenu, AdminMutations, ResourceState, Badge, ChoiceField, DataTable, Dialog, DialogActions, Field, Metric, PageHeading, money } from "./AdminUI";
import { type Course } from "./ManagementData";
import { useAdminMutation, useAdminResource } from "./admin-api";
import styles from "./admin.module.css";

const levels = ["Beginner", "Intermediate", "Advanced"];
const deliveryModes = ["Self-paced", "Live"];
const googleClassroom = (value: string) =>
  URL.canParse(value) && new URL(value).origin === "https://classroom.google.com";

type CourseValues = Omit<Course, "id" | "purchases" | "classroom"> & { classroom?: string };

function CourseForm({ course, onClose, onSave }: { course?: Course; onClose: () => void; onSave: (course: CourseValues) => void }) {
  const [classroom, setClassroom] = useState(course?.classroom ?? "");
  const [error, setError] = useState("");
  const [modules, setModules] = useState(() => course?.modules.map((module, index) => ({ ...module, id: String(index) })) ?? []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (key: string) => String(form.get(key) ?? "").trim();
    const name = text("name");
    const category = text("category");
    if (!name || !category || modules.some((module) => !module.title.trim())) {
      setError("Enter a course name, category and title for each module.");
      return;
    }
    if (classroom.trim() && !googleClassroom(classroom.trim())) {
      setError("Enter an HTTPS Google Classroom link.");
      return;
    }
    onSave({
      name, category, level: text("level"), price: Number(text("price")),
      published: course?.published ?? (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "publish",
      description: text("description"), classroom: classroom.trim() || undefined,
      delivery: text("delivery"), requirements: text("requirements"),
      outcomes: text("outcomes"), thumbnail: text("thumbnail") || undefined,
      modules: modules.map(({ title, duration }) => ({ title: title.trim(), duration })),
    });
  }

  return (
    <Dialog title={course ? "Edit Course" : "Create Course"} drawer={Boolean(course)} wide={!course}
      description={course ? undefined : "Set up a standalone learning product."} onClose={onClose}>
      <form method="post" onSubmit={submit}>
        <div className={styles.dialogBody}>
          <Field label="Course Name">{(id) => (
            <input id={id} name="name" placeholder="e.g. Product Design Fundamentals" className={styles.control} defaultValue={course?.name} required />
          )}</Field>
          <Field label="Course Category">{(id) => (
            <input id={id} name="category" placeholder="e.g. Product Management" className={styles.control} defaultValue={course?.category} required />
          )}</Field>
          <Field label="Description">{(id) => <textarea id={id} name="description" className={styles.control} defaultValue={course?.description} />}</Field>
          <Field label="Course thumbnail URL">{(id) => <input id={id} name="thumbnail" type="url" className={styles.control} defaultValue={course?.thumbnail ?? ""} />}</Field>
          <div className={`${styles.detailSection} ${styles.infoBox}`}>
            <h3>Google Classroom</h3>
            <p className={styles.hint}>Save the classroom invite link for staff.</p>
            <Field label="Class link">{(id) => (
              <input id={id} type="url" placeholder="https://classroom.google.com/…" className={styles.control} value={classroom}
                onChange={(event) => { setClassroom(event.target.value); setError(""); }} />
            )}</Field>
          </div>
          <div className={styles.fieldRow}>
            <ChoiceField label="Course Level" name="level" options={levels} defaultValue={course?.level} />
            <Field label="Price (₦)">{(id) => <input id={id} name="price" type="number" min="0" step="0.01" className={styles.control} defaultValue={course?.price ?? 0} required />}</Field>
          </div>

          <>
            <ChoiceField label="Delivery Mode" name="delivery" options={deliveryModes} defaultValue={course?.delivery} />
            <Field label="Requirements">{(id) => <textarea id={id} name="requirements" className={styles.control} defaultValue={course?.requirements} />}</Field>
            <Field label="Learning Outcomes">{(id) => <textarea id={id} name="outcomes" className={styles.control} defaultValue={course?.outcomes} />}</Field>
            <fieldset className={styles.formGroup}>
              <legend>Course Modules</legend>
              {modules.map((module, index) => (
                <div className={styles.inlineFormField} key={module.id}>
                  <Field label={`Module ${index + 1} title`}>{(id) => <input id={id} className={styles.control}
                    value={module.title} onChange={(event) => setModules((all) => all.map((item) => item.id === module.id ? { ...item, title: event.target.value } : item))} required />}</Field>
                  <Field label={`Module ${index + 1} duration`}>{(id) => <input id={id} className={styles.control} placeholder="e.g. 30 min"
                    value={module.duration} onChange={(event) => setModules((all) => all.map((item) => item.id === module.id ? { ...item, duration: event.target.value } : item))} />}</Field>
                  <button type="button" className={styles.iconButton} aria-label={`Remove module ${index + 1}`}
                    onClick={() => setModules((all) => all.filter(({ id }) => id !== module.id))}><Trash2 size={15} aria-hidden /></button>
                </div>
              ))}
              <div><button type="button" className={styles.smallButton} onClick={() =>
                setModules((all) => [...all, { id: crypto.randomUUID(), title: "", duration: "" }])}>
                <Plus size={14} aria-hidden />Add Module
              </button></div>
            </fieldset>
          </>
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
        <DialogActions onClose={onClose}>
          {!course && <button type="submit" value="draft" className={styles.secondary}>Save as draft</button>}
          <button type="submit" value="publish" className={styles.primary}>{course ? "Save Changes" : "Publish"}</button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export function Courses() {
  const resource = useAdminResource<Course[]>("courses");
  const courses = resource.data ?? [];
  const action = useAdminMutation(resource.reload);
  const [dialog, setDialog] = useState<{ kind: "create" } | { kind: "edit" | "publication"; course: Course } | null>(null);
  const close = () => { action.setError(""); setDialog(null); };
  const published = courses.filter((course) => course.published).length;

  function save(value: CourseValues) {
    const id = dialog?.kind === "edit" ? dialog.course.id : undefined;
    void action.save(id ? "courses/" + id : "courses", id ? "PUT" : "POST", value, close);
  }

  return (
    <ResourceState {...resource}><AdminMutations action={action}>
      <PageHeading title="Courses" description="Create and manage standalone learning products." action={
        <button type="button" className={styles.primary} onClick={() => setDialog({ kind: "create" })}><Plus size={17} aria-hidden />Create Course</button>
      } />
      <div className={styles.metrics}>
        <Metric label="Total Courses" value={courses.length} detail="Courses in the library" icon={BookOpen} />
        <Metric label="Published" value={published} detail="Published in the course library" icon={CircleCheck} tone="green" />
        <Metric label="Drafts" value={courses.length - published} detail="In setup or awaiting launch" icon={FileText} tone="orange" />
      </div>
      <DataTable caption="Courses" headings={["Course", "Category", "Level", "Price", "Purchases", "Publication", "Actions"]}>
        {courses.map((course) => (
          <tr key={course.id}>
            <td><button type="button" className={styles.tableLink} onClick={() => setDialog({ kind: "edit", course })}>{course.name}</button></td>
            <td>{course.category}</td><td>{course.level}</td><td>{money(Number(course.price))}</td><td>{course.purchases}</td>
            <td><Badge tone={course.published ? "green" : "muted"}>{course.published ? "Published" : "Draft"}</Badge></td>
            <td><ActionMenu label={`Actions for ${course.name}`} actions={[
              { label: "Edit Course", icon: Pencil, onSelect: () => setDialog({ kind: "edit", course }) },
              { label: course.published ? "Unpublish Course" : "Publish", icon: CircleCheck, onSelect: () => setDialog({ kind: "publication", course }) },
            ]} /></td>
          </tr>
        ))}
      </DataTable>
      {dialog?.kind === "create" && <CourseForm onClose={close} onSave={save} />}
      {dialog?.kind === "edit" && <CourseForm course={dialog.course} onClose={close} onSave={save} />}
      {dialog?.kind === "publication" && <Dialog title={dialog.course.published ? "Unpublish course?" : "Publish course?"}
        description={dialog.course.name} onClose={close}>
        <DialogActions onClose={close}>
          <button type="button" className={styles.primary} onClick={() => void action.save(`courses/${dialog.course.id}/publication`, "PATCH", { published: !dialog.course.published }, close)}>
            {dialog.course.published ? "Unpublish Course" : "Publish Course"}
          </button>
        </DialogActions>
      </Dialog>}
    </AdminMutations></ResourceState>
  );
}
