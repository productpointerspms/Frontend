"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Play, Search, X } from "lucide-react";
import styles from "./courses.module.css";

type LearningCourse = { id: number; completed: number; total: number };
// Design preview only; no enrollment or completion is inferred for the visitor.
const learningCourses: LearningCourse[] = [
  { id: 1, completed: 4, total: 12 },
  { id: 7, completed: 12, total: 12 },
];
const title = "Product Management Fundamentals";

export default function MyCourses({ visibleIds, onBrowse, onReset }: { visibleIds: number[]; onBrowse: () => void; onReset: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [view, setView] = useState<"lesson" | "syllabus" | "certificate">("lesson");
  const visible = visibleIds.flatMap(id => learningCourses.filter(course => course.id === id));
  function open(view: "lesson" | "syllabus" | "certificate") {
    setView(view);
    dialog.current?.showModal();
  }
  return <>
    <p className={styles.learningPreview}>Learning dashboard preview · Sample courses and progress</p>
    {visible.some(course => course.completed < course.total) && <section className={styles.resumePanel} aria-labelledby="resume-heading">
      <span className={styles.playIcon}><Play size={20} fill="currentColor" aria-hidden="true" /></span>
      <div className={styles.resumeCopy}><p>PICK UP WHERE YOU LEFT OFF</p><h2 id="resume-heading">Module 2, Lesson 2: Interviews and surveys</h2><span>{title} · Preview lesson</span></div>
      <button className={styles.learningAction} onClick={() => open("lesson")}>Resume lesson <ArrowRight size={22} aria-hidden="true" /></button>
    </section>}
    <div className={styles.learningList}>
      {visible.map(course => {
        const complete = course.completed === course.total;
        const percent = Math.round(course.completed / course.total * 100);
        return <article key={course.id} className={styles.learningCard} aria-labelledby={`learning-course-${course.id}`}>
          <div className={styles.learningImage}><Image src="/images/courses/course-laptop.webp" alt="Laptop displaying product management learning material" fill sizes="(max-width: 767px) 100vw, 32vw" /><span>{complete ? "Completed" : "In progress"}</span></div>
          <div className={styles.learningBody}>
            <div className={styles.learningMeta}><span>Product Management</span><span>3 Weeks · Self-paced</span></div>
            <h2 id={`learning-course-${course.id}`}>{title}</h2>
            <p className={styles.learningInstructor}>Instructor: Alex Rivera · Sample enrollment</p>
            <div className={styles.learningProgress}><progress value={course.completed} max={course.total} aria-label={`${title}, ${complete ? "completed" : "in progress"}`} /><span>{course.completed} of {course.total} lessons · {percent}%</span></div>
            <p className={styles.learningNext}>{complete ? "Course completed · Certificate preview available." : "Next up: Interviews and surveys"}</p>
            <div className={styles.learningButtons}>
              <button className={styles.learningAction} onClick={() => open(complete ? "certificate" : "lesson")}>{complete ? "View Certificate" : "Continue Course"} <ArrowRight size={22} aria-hidden="true" /></button>
              {!complete && <button className={styles.syllabusAction} onClick={() => open("syllabus")}>View Syllabus</button>}
            </div>
          </div>
        </article>;
      })}
      {visible.length === 0 && <div className={styles.empty}><Search size={32} aria-hidden="true" /><h2>No matching courses</h2><p>Try another search or clear your filters to see the sample learning dashboard.</p><button className={styles.primary} onClick={onReset}>Clear filters</button></div>}
    </div>
    <section className={styles.browsePrompt} aria-labelledby="browse-heading"><div><h2 id="browse-heading">Looking for your next course?</h2><p>Browse the full catalog to keep building your product skills.</p></div><button className={styles.primary} onClick={onBrowse}>Browse all courses <ArrowRight size={22} aria-hidden="true" /></button></section>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="learning-dialog-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <button className={styles.closeDialog} onClick={() => dialog.current?.close()} aria-label="Close learning preview"><X /></button>
      <span className={styles.resourceEyebrow}>COURSE PREVIEW</span>
      <h2 id="learning-dialog-title">{view === "lesson" ? "Interviews and surveys" : view === "syllabus" ? "Course syllabus" : "Certificate preview"}</h2>
      {view === "lesson" ? <><p>Module 2, Lesson 2 · {title}</p><div className={styles.lessonPreview}><Play size={36} aria-hidden="true" /><p>Lesson video will appear here when course content is connected.</p></div><h3 className={styles.previewSubheading}>In this lesson</h3><p>Explore how interviews and surveys help product teams understand customer needs and inform product decisions.</p></> : view === "syllabus" ? <><p>{title}</p><ol className={styles.syllabusList}><li>Product Management foundations</li><li>Customer discovery: interviews and surveys</li><li>Product strategy and prioritization</li><li>Roadmaps, delivery, and measuring success</li></ol><p className={styles.previewNote}>Sample syllabus. Published modules and lessons will appear when course content is connected.</p></> : <div className={styles.certificatePreview}><span>PREVIEW</span><h3>Certificate of Completion</h3><p>{title}</p><p>Your verified certificate will appear here after enrollment and course completion are connected.</p></div>}
      <p className={styles.previewNote}>This dashboard uses sample data. Enrollment, lesson playback, and verified certificates are not connected yet.</p>
    </dialog>
  </>;
}
