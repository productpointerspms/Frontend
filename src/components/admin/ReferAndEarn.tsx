"use client";

import Link from "next/link";
import { useState } from "react";
import { CircleCheck, CircleDollarSign, Edit, Eye, Link2, Plus, UserMinus, UserRoundCheck, Users, Wallet } from "lucide-react";
import { ActionMenu, Badge, DataTable, DetailRows, Metric, PageHeading, displayDate, money } from "./AdminUI";
import { PreviewDialog, PreviewFilters, PreviewInput, PreviewNotice, PreviewNotes, PreviewPagination, PreviewPerson, usePreviewList, value } from "./PreviewControls";
import styles from "./admin.module.css";
import ui from "./preview.module.css";

type Partner = {
  id: string; name: string; email: string; code: string; referrals: number;
  paid: number; rate: number; earned: number; added: string; status: "Active" | "Inactive";
};
type Payout = { id: string; partnerId: string; amount: number; date: string; note: string };
const initialPartners: Partner[] = [
  { id: "1", name: "Chinwe Okeke", email: "chinwe@example.test", code: "CHINWE24", referrals: 32, paid: 20, rate: 10, earned: 60000, added: "2026-11-24", status: "Active" },
  { id: "2", name: "Femi Ogunleye", email: "femi@example.test", code: "FEMI-PP", referrals: 28, paid: 16, rate: 12.5, earned: 60000, added: "2026-11-23", status: "Active" },
  { id: "3", name: "Amina Yusuf", email: "amina@example.test", code: "AMINA26", referrals: 24, paid: 14, rate: 10, earned: 42000, added: "2026-11-22", status: "Active" },
  { id: "4", name: "Emeka Obi", email: "emeka@example.test", code: "EMEKA-PP", referrals: 18, paid: 12, rate: 10, earned: 36000, added: "2026-11-21", status: "Active" },
  { id: "5", name: "Bisi Adebayo", email: "bisi@example.test", code: "BISI26", referrals: 14, paid: 8, rate: 7.5, earned: 18000, added: "2026-11-20", status: "Inactive" },
  { id: "6", name: "Obinna Nnamdi", email: "obinna@example.test", code: "OBINNA24", referrals: 12, paid: 6, rate: 10, earned: 18000, added: "2026-11-19", status: "Active" },
  { id: "7", name: "Zainab Bello", email: "zainab.b@example.test", code: "ZAINAB26", referrals: 3, paid: 0, rate: 10, earned: 0, added: "2026-11-02", status: "Active" },
];
type Modal = { kind: "settings" | "add" } | { kind: "details" | "edit" | "toggle" | "payout"; partner: Partner };

export function ReferAndEarn() {
  const [partners, setPartners] = useState(initialPartners);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [defaultRate, setDefaultRate] = useState(10);
  const [performance, setPerformance] = useState("");
  const [feedback, setFeedback] = useState("");
  const [modal, setModal] = useState<Modal | null>(null);
  const list = usePreviewList(partners, (row) => `${row.name} ${row.email} ${row.code}`, (row) => row.status, (row) => row.added,
    (row) => !performance || (performance === "paid" ? row.paid > 0 : row.paid === 0));
  const close = () => setModal(null);
  const finish = (message: string) => { close(); setFeedback(message); };
  const partnerPayouts = (id: string) => payouts.filter((payout) => payout.partnerId === id);
  const available = (partner: Partner) => Math.max(0, Math.round(partner.earned * 100 - partnerPayouts(partner.id).reduce((sum, item) => sum + Math.round(item.amount * 100), 0)) / 100);

  function savePartner(data: FormData, partner?: Partner) {
    const name = value(data, "name");
    const email = value(data, "email").toLowerCase();
    const code = value(data, "code").toUpperCase();
    if (!name || !email || !/^[A-Z0-9-]{3,24}$/.test(code)) {
      return "Enter a name, email and a 3–24 character code using letters, numbers or a hyphen.";
    }
    if (partners.some((item) => item.id !== partner?.id && (item.code === code || item.email === email))) {
      return "This email or referral code belongs to another partner.";
    }
    const next = { name, email, code, rate: Number(value(data, "rate")) };
    if (partner) setPartners((all) => all.map((item) => item.id === partner.id ? { ...item, ...next } : item));
    else setPartners((all) => [{
      ...next, id: crypto.randomUUID(), added: new Date().toISOString().slice(0, 10),
      status: "Active", referrals: 0, paid: 0, earned: 0,
    }, ...all]);
    finish(partner ? "Sample referral partner updated." : "Sample referral partner added.");
  }

  return <>
    <PageHeading title="Refer & Earn" description="Manage referral partners, track successful referrals and monitor commissions."
      action={<div className={ui.actions}>
        <button type="button" className={styles.secondary} onClick={() => setModal({ kind: "settings" })}>Commission settings</button>
        <button type="button" className={styles.primary} onClick={() => setModal({ kind: "add" })}><Plus size={17} />Add referral partner</button>
      </div>} />
    <PreviewNotice feedback={feedback} />
    <div className={styles.metrics} data-columns="4">
      <Metric label="Total referral partners" value={partners.length} detail={`${partners.filter((row) => row.status === "Active").length} active partners`} icon={Users} />
      <Metric label="Total referrals" value={partners.reduce((sum, row) => sum + row.referrals, 0)} detail="Across all referral codes" icon={Link2} />
      <Metric label="Successful referrals" value={partners.reduce((sum, row) => sum + row.paid, 0)} detail="Sample qualifying payments" icon={CircleCheck} tone="green" />
      <Metric label="Total commissions" value={money(partners.reduce((sum, row) => sum + row.earned, 0))} detail="Earned on qualifying payments" icon={CircleDollarSign} />
    </div>
    <section className={`${styles.panel} ${ui.tablePanel}`} aria-labelledby="referral-partners-title">
      <div className={styles.panelHeader}>
        <h2 id="referral-partners-title">Referral partners <small>{partners.length}</small></h2>
        <Link href="/refer-and-earn/join" className={styles.link}>Preview sign-up</Link>
      </div>
      <PreviewFilters list={list} placeholder="Search partners or codes…" statusLabel="Partners" statuses={["Active", "Inactive"]} dateLabel="Date added">
        <select aria-label="Performance" className={styles.control} value={performance} onChange={(event) => { setPerformance(event.target.value); list.setPage(1); }}>
          <option value="">All performance</option><option value="paid">Has qualifying payments</option><option value="unpaid">No qualifying payments</option>
        </select>
      </PreviewFilters>
      <DataTable caption="Referral partners" headings={["Partner", "Code", "Referrals", "Paid", "Rate", "Earned", "Status", "Actions"]}>
        {list.rows.map((row) => <tr key={row.id}>
          <td><PreviewPerson name={row.name} email={row.email} open={() => setModal({ kind: "details", partner: row })} /></td>
          <td>{row.code}</td><td>{row.referrals}</td><td>{row.paid}</td><td>{row.rate}%</td><td>{money(row.earned)}</td>
          <td><Badge tone={row.status === "Active" ? "green" : "muted"}>{row.status}</Badge></td>
          <td><ActionMenu label={`Actions for ${row.name}`} actions={[
            { label: "View partner", icon: Eye, onSelect: () => setModal({ kind: "details", partner: row }) },
            { label: "Edit partner", icon: Edit, onSelect: () => setModal({ kind: "edit", partner: row }) },
            ...(available(row) > 0 ? [{ label: "Record payout", icon: Wallet, onSelect: () => setModal({ kind: "payout", partner: row }) }] : []),
            { label: row.status === "Active" ? "Deactivate partner" : "Activate partner", icon: row.status === "Active" ? UserMinus : UserRoundCheck,
              onSelect: () => setModal({ kind: "toggle", partner: row }) },
          ]} /></td>
        </tr>)}
      </DataTable>
      <PreviewPagination list={list} noun="partners" />
    </section>
    {(modal?.kind === "add" || modal?.kind === "edit") && (() => {
      const partner = "partner" in modal ? modal.partner : undefined;
      return <PreviewDialog key={modal.kind} title={partner ? "Edit referral partner" : "Add referral partner"} close={close}
        save={partner ? "Save changes" : "Add partner"} submit={(data) => savePartner(data, partner)}>
        <PreviewInput name="name" label="Full name" value={partner?.name} />
        <PreviewInput name="email" label="Email address" type="email" value={partner?.email} />
        <PreviewInput name="code" label="Referral code" value={partner?.code} />
        <PreviewInput name="rate" label="Commission rate (%)" type="number" min={0} max={100} step="0.01" value={partner?.rate ?? defaultRate} />
      </PreviewDialog>;
    })()}
    {modal?.kind === "settings" && <PreviewDialog title="Commission settings and records" wide close={close} submit={(data) => {
      setDefaultRate(Number(value(data, "rate")));
      finish("Default sample commission rate updated.");
    }}>
      <PreviewInput name="rate" label="Default commission rate (%)" type="number" min={0} max={100} step="0.01" value={defaultRate} />
      <p className={styles.hint}>New partners use this rate by default. Existing rates can be edited on each partner.</p>
      <h3>Payout records</h3>
      {payouts.length ? <ul className={ui.questionList}>{payouts.map((payout) => <li key={payout.id}>
        <span>{partners.find((row) => row.id === payout.partnerId)?.name} · {displayDate(payout.date)}</span>
        <strong>{money(payout.amount)}</strong>
      </li>)}</ul> : <p>No sample payouts recorded.</p>}
    </PreviewDialog>}
    {modal?.kind === "details" && <PreviewDialog title="Referral partner details" description={modal.partner.name} close={close} drawer>
      <DetailRows items={[["Email address", modal.partner.email], ["Referral code", modal.partner.code], ["Status", modal.partner.status],
        ["Date added", displayDate(modal.partner.added)], ["Referrals", modal.partner.referrals], ["Paid referrals", modal.partner.paid],
        ["Commission rate", `${modal.partner.rate}%`], ["Available commission", money(available(modal.partner))]]} />
      <h3>Payout history</h3>
      {partnerPayouts(modal.partner.id).length ? <ul className={ui.questionList}>{partnerPayouts(modal.partner.id).map((item) => <li key={item.id}>
        <span>{displayDate(item.date)} · {item.note}</span><strong>{money(item.amount)}</strong>
      </li>)}</ul> : <p>No payouts recorded.</p>}
      {available(modal.partner) > 0 && <button type="button" className={styles.primary} onClick={() => setModal({ ...modal, kind: "payout" })}>Record payout</button>}
    </PreviewDialog>}
    {modal?.kind === "payout" && <PreviewDialog title="Record partner payout" description={modal.partner.name} close={close} save="Record payout" submit={(data) => {
      const amount = Number(value(data, "amount"));
      if (amount <= 0 || amount > available(modal.partner)) return "Enter an amount within the available commission.";
      const note = value(data, "note");
      if (!note) return "Enter a payout reference or note.";
      setPayouts((all) => [{ id: crypto.randomUUID(), partnerId: modal.partner.id, amount, date: value(data, "date"), note }, ...all]);
      finish("Sample payout recorded.");
    }}>
      <p>Available commission · {money(available(modal.partner))}</p>
      <PreviewInput name="amount" label="Payout amount (₦)" type="number" min={0.01} max={available(modal.partner)} step="0.01" />
      <PreviewInput name="date" label="Payout date" type="date" />
      <PreviewNotes name="note" label="Payout reference or note" required />
    </PreviewDialog>}
    {modal?.kind === "toggle" && <PreviewDialog title={modal.partner.status === "Active" ? "Deactivate referral partner?" : "Activate referral partner?"}
      description={modal.partner.name} close={close} danger={modal.partner.status === "Active"} save={modal.partner.status === "Active" ? "Deactivate partner" : "Activate partner"}
      submit={() => {
        setPartners((all) => all.map((row) => row.id === modal.partner.id ? { ...row, status: row.status === "Active" ? "Inactive" : "Active" } : row));
        finish("Sample partner status updated.");
      }}><p>Change this partner’s status in the preview.</p></PreviewDialog>}
  </>;
}
