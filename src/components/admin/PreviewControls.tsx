"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Dialog, DialogActions, Field } from "./AdminUI";
import styles from "./admin.module.css";
import ui from "./preview.module.css";

const day = 86_400_000;

export function usePreviewList<T>(
  records: T[],
  getText: (record: T) => string,
  getStatus: (record: T) => string,
  getDate: (record: T) => string,
  matchesExtra: (record: T) => boolean = () => true,
) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [period, setPeriod] = useState("");
  const [sort, setSort] = useState("newest");
  const [size, setSize] = useState(6);
  const [page, setPage] = useState(1);
  const latest = Math.max(0, ...records.map((record) => Date.parse(getDate(record)) || 0));
  const queryText = query.trim().toLowerCase();
  const results = records.filter((record) => (
    (!queryText || getText(record).toLowerCase().includes(queryText)) &&
    (!status || getStatus(record) === status) &&
    (!period || latest - Date.parse(getDate(record)) < Number(period) * day) &&
    matchesExtra(record)
  )).sort((first, second) => {
    const difference = Date.parse(getDate(second)) - Date.parse(getDate(first));
    return sort === "newest" ? difference : -difference;
  });
  const pages = Math.max(1, Math.ceil(results.length / size));
  const current = Math.min(page, pages);
  const start = (current - 1) * size;

  return {
    results, rows: results.slice(start, start + size),
    query, status, period, sort, size, pages, current, start,
    setQuery: (next: string) => { setQuery(next); setPage(1); },
    setStatus: (next: string) => { setStatus(next); setPage(1); },
    setPeriod: (next: string) => { setPeriod(next); setPage(1); },
    setSort: (next: string) => { setSort(next); setPage(1); },
    setSize: (next: number) => { setSize(next); setPage(1); },
    setPage,
  };
}

type List = ReturnType<typeof usePreviewList>;

export function PreviewFilters({ list, placeholder, statusLabel, statuses, dateLabel, children }: {
  list: List;
  placeholder: string;
  statusLabel: string;
  statuses: readonly string[];
  dateLabel: string;
  children?: ReactNode;
}) {
  return <div className={ui.filters}>
    <label className={ui.search}>
      <Search size={17} aria-hidden />
      <input type="search" aria-label={placeholder} placeholder={placeholder} value={list.query} onChange={(event) => list.setQuery(event.target.value)} />
    </label>
    <select aria-label={statusLabel} className={styles.control} value={list.status} onChange={(event) => list.setStatus(event.target.value)}>
      <option value="">All {statusLabel.toLowerCase()}</option>
      {statuses.map((status) => <option key={status}>{status}</option>)}
    </select>
    <select aria-label={dateLabel} className={styles.control} value={list.period} onChange={(event) => list.setPeriod(event.target.value)}>
      <option value="">{dateLabel}</option><option value="7">Latest 7 days of activity</option><option value="30">Latest 30 days of activity</option>
    </select>
    <select aria-label="Sort order" className={styles.control} value={list.sort} onChange={(event) => list.setSort(event.target.value)}>
      <option value="newest">Newest first</option><option value="oldest">Oldest first</option>
    </select>
    {children}
  </div>;
}

export function PreviewPagination({ list, noun }: { list: List; noun: string }) {
  const count = list.results.length;
  return <div className={ui.pagination}>
    <p aria-live="polite">{count ? `Showing ${list.start + 1}–${Math.min(list.start + list.size, count)} of ${count} ${noun}` : `No matching ${noun}`}</p>
    <div className={ui.actions}>
      <select className={styles.control} aria-label="Rows per page" value={list.size} onChange={(event) => list.setSize(Number(event.target.value))}>
        {[6, 12, 24].map((size) => <option key={size} value={size}>{size} per page</option>)}
      </select>
      <button type="button" className={styles.iconButton} aria-label="Previous page" disabled={list.current === 1} onClick={() => list.setPage(list.current - 1)}><ChevronLeft size={17} /></button>
      <span aria-label="Current page">{list.current}</span>
      <button type="button" className={styles.iconButton} aria-label="Next page" disabled={list.current === list.pages} onClick={() => list.setPage(list.current + 1)}><ChevronRight size={17} /></button>
    </div>
  </div>;
}

export function PreviewNotice({ feedback }: { feedback: string }) {
  return <p className={ui.notice} role="status">{feedback || "Frontend preview · Changes apply to sample records for this visit."}</p>;
}

export function PreviewDialog({ title, description, close, submit, children, save = "Save changes", drawer, wide, danger }: {
  title: string;
  description?: string;
  close: () => void;
  submit?: (data: FormData) => string | void | Promise<string | void>;
  children: ReactNode;
  save?: string;
  drawer?: boolean;
  wide?: boolean;
  danger?: boolean;
}) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  return <Dialog title={title} description={description} drawer={drawer} wide={wide} onClose={close}>
    {submit ? <form onSubmit={async (event) => {
      event.preventDefault();
      if (pending) return;
      setPending(true);
      try { setError((await submit(new FormData(event.currentTarget))) ?? ""); }
      catch (cause) { setError(cause instanceof Error ? cause.message : "Save failed."); }
      finally { setPending(false); }
    }}>
      <div className={styles.dialogBody}>
        {children}{error && <p className={styles.error} role="alert">{error}</p>}
      </div>
      <DialogActions onClose={close}><button type="submit" disabled={pending} className={danger ? ui.danger : styles.primary}>{save}</button></DialogActions>
    </form> : <div className={styles.dialogBody}>{children}</div>}
  </Dialog>;
}

export function PreviewInput({ label, name, value, type = "text", min, max, step, required = true }: {
  label: string; name: string; value?: string | number; type?: string;
  min?: number; max?: number; step?: number | string; required?: boolean;
}) {
  return <Field label={label}>{(id) => <input id={id} name={name} className={styles.control}
    type={type} defaultValue={value} min={min} max={max} step={step} required={required} maxLength={160} />}</Field>;
}

export function PreviewNotes({ label, name, value, required }: { label: string; name: string; value?: string; required?: boolean }) {
  return <Field label={label}>{(id) => <textarea id={id} name={name} className={styles.control} defaultValue={value} required={required} maxLength={2000} />}</Field>;
}

export function PreviewTabs({ labels, selected, onSelect, name }: { labels: readonly string[]; selected: string; onSelect: (value: string) => void; name: string }) {
  return <div className={ui.tabs} role="group" aria-label={name}>
    {labels.map((label) => <button type="button" key={label} aria-pressed={selected === label} onClick={() => onSelect(label)}>{label}</button>)}
  </div>;
}

export function value(data: FormData, name: string) {
  return String(data.get(name) ?? "").trim();
}

export function downloadPreviewCsv(name: string, rows: readonly (readonly (string | number)[])[]) {
  const csv = rows.map((row) => row.map((field) => {
    const text = String(field);
    // Spreadsheet applications can interpret staff-entered cells as formulas.
    const literal = /^[\s]*[=+\-@]/.test(text) ? "'" + text : text;
    return '"' + literal.replaceAll('"', '""') + '"';
  }).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name + ".csv";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function PreviewPerson({ name, email, open }: { name: string; email: string; open: () => void }) {
  return <button type="button" className={ui.person} onClick={open}>
    <span className={ui.initials} aria-hidden>{name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("")}</span>
    <span><strong>{name}</strong>{email}</span>
  </button>;
}
