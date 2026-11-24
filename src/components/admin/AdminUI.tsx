"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { MoreHorizontal, X, type LucideIcon } from "lucide-react";
import styles from "./admin.module.css";

export const money = (amount: number, currency = "NGN") =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);

export function displayDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(
    new Date(date + "T00:00:00Z"),
  );
}

export function PageHeading({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className={styles.pageHeading}>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

export type Tone = "purple" | "green" | "orange" | "red" | "muted";

export function Badge({ tone = "muted", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={styles.badge} data-tone={tone}>{children}</span>;
}

export function IconTile({ icon: Icon, tone = "purple" }: { icon: LucideIcon; tone?: Tone }) {
  return <span className={styles.iconTile} data-tone={tone}><Icon size={15} aria-hidden /></span>;
}

export function Metric({
  label, value, detail, icon, tone, accent, aside,
}: {
  label: string;
  value: ReactNode;
  detail: string;
  icon: LucideIcon;
  tone?: Tone;
  accent?: boolean;
  aside?: ReactNode;
}) {
  return (
    <article className={styles.metric}>
      <div className={styles.metricTop}><h2>{label}</h2><IconTile icon={icon} tone={tone} /></div>
      <div className={styles.metricValue} data-accent={accent}>{value}{aside}</div>
      <p>{detail}</p>
    </article>
  );
}

export function DataTable({ caption, headings, children }: { caption: string; headings: string[]; children: ReactNode }) {
  return (
    <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={caption}>
      <table className={styles.table}>
        <thead><tr>{headings.map((heading) => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function ActionMenu({
  label, actions,
}: {
  label: string;
  actions: { label: string; icon: LucideIcon; onSelect: () => void }[];
}) {
  const details = useRef<HTMLDetailsElement>(null);
  return (
    <details
      className={styles.menu}
      ref={details}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && event.currentTarget.open) {
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}
    >
      <summary className={styles.menuTrigger} aria-label={label}><MoreHorizontal size={17} aria-hidden /></summary>
      <div className={styles.menuItems}>
        {actions.map(({ label: item, icon: Icon, onSelect }) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              if (details.current) {
                details.current.open = false;
                details.current.querySelector("summary")?.focus();
              }
              onSelect();
            }}
          >
            <Icon size={15} aria-hidden />{item}
          </button>
        ))}
      </div>
    </details>
  );
}

export function Field({
  label, hint, children,
}: {
  label: string;
  hint?: string;
  children: (id: string, hintId?: string) => ReactNode;
}) {
  const id = useId();
  const hintId = hint ? id + "-hint" : undefined;
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      {children(id, hintId)}
      {hint && <p id={hintId} className={styles.hint}>{hint}</p>}
    </div>
  );
}

export function Dialog({
  title, description, drawer, wide, onClose, children,
}: {
  title: string;
  description?: string;
  drawer?: boolean;
  wide?: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const element = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = element.current;
    if (!dialog) return;
    const opener = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (opener instanceof HTMLElement && opener.isConnected && document.activeElement === document.body) {
        opener.focus();
      }
    };
  }, []);

  return (
    <dialog
      ref={element}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className={styles.dialog}
      data-drawer={drawer}
      data-wide={wide}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className={styles.dialogHeader}>
        <div>
          <h2 id={titleId}>{title}</h2>
          {description && <p id={descriptionId}>{description}</p>}
        </div>
        <button type="button" className={styles.iconButton} aria-label="Close dialog" onClick={onClose}>
          <X size={19} aria-hidden />
        </button>
      </div>
      {children}
    </dialog>
  );
}

export function DialogActions({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  return (
    <div className={styles.dialogActions}>
      <button type="button" className={styles.secondary} onClick={onClose}>Cancel</button>
      {children}
    </div>
  );
}
