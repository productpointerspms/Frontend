"use client";

import { adminRequest, useAdminResource } from "./admin-api";
import Link from "next/link";
import { useState } from "react";
import { CircleCheck, CircleDollarSign, Edit, Eye, Link2, Plus, UserMinus, UserRoundCheck, Users, Wallet } from "lucide-react";
import { ActionMenu, Badge, DataTable, DetailRows, Metric, PageHeading, displayDate } from "./AdminUI";
import { PreviewDialog, PreviewFilters, PreviewInput, PreviewNotice, PreviewNotes, PreviewPagination, PreviewPerson, usePreviewList, value } from "./PreviewControls";
import styles from "./admin.module.css";
import ui from "./preview.module.css";

type Partner = {
  id: string; name: string; email: string; code: string; referrals: number;
  paid: number; rate: number; earnings: Record<string, number>; added: string; status: "Active" | "Inactive";
};
type Payout = { id: string; partnerId: string; amount: number; currency: string; date: string; note: string };
const formatAmount = (currency: string, amount: number) => new Intl.NumberFormat("en", { style: "currency", currency, currencyDisplay: "code" }).format(amount);
const balances = (values: Record<string, number>) => Object.entries(values).map(([currency, amount]) => formatAmount(currency,amount)).join(" · ") || "—";
type Modal = { kind: "settings" | "add" } | { kind: "details" | "edit" | "toggle" | "payout"; partner: Partner };

export function ReferAndEarn() {
  const resource = useAdminResource<{partners: Partner[]; payouts: Payout[]; defaultRate: number}>("referrals");
  const partners = resource.data?.partners ?? [];
  const payouts = resource.data?.payouts ?? [];
  const defaultRate = resource.data?.defaultRate;
  const [currency, setCurrency] = useState("");
  const [payoutId,setPayoutId] = useState("");

  const [performance, setPerformance] = useState("");
  const [feedback, setFeedback] = useState("");
  const [modal, setModal] = useState<Modal | null>(null);
  const list = usePreviewList(partners, (row) => `${row.name} ${row.email} ${row.code}`, (row) => row.status, (row) => row.added,
    (row) => !performance || (performance === "paid" ? row.paid > 0 : row.paid === 0));
  const close = () => setModal(null);
  const finish = (message: string) => { close(); setFeedback(message); };
  const partnerPayouts = (id: string) => payouts.filter((payout) => payout.partnerId === id);
  function available(partner: Partner, currency: string) {
    const payoutsInCurrency = partnerPayouts(partner.id).filter(payout => payout.currency === currency);
    const paidMinor = payoutsInCurrency.reduce((sum, payout) => sum + Math.round(payout.amount * 100), 0);
    return (Math.round((partner.earnings[currency] ?? 0) * 100) - paidMinor) / 100;
  }
  const currencies = (partner: Partner) => Object.keys(partner.earnings).filter(unit => available(partner, unit) > 0);
  const availableBalances = (partner: Partner) => balances(Object.fromEntries(
    Object.keys(partner.earnings).map(unit => [unit, available(partner, unit)]),
  ));
  function openPayout(partner: Partner) {
    setCurrency(currencies(partner)[0]);
    setPayoutId(crypto.randomUUID());
    setModal({ kind: "payout", partner });
  }
  const totals: Record<string, number> = {};
  for (const partner of partners) {
    for (const [unit, amount] of Object.entries(partner.earnings)) {
      totals[unit] = (totals[unit] ?? 0) + amount;
    }
  }

  async function savePartner(data: FormData, partner?: Partner) {
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
    await adminRequest(partner ? "referrals/"+partner.id : "referrals", partner ? "PATCH" : "POST", next);
    resource.reload();
    finish(partner ? "Referral partner updated." : "Referral partner added.");
  }

  if (!resource.data) return <p role="status">{resource.error || "Loading referral partners…"}</p>;
  return <>
    <PageHeading title="Refer & Earn" description="Manage referral partners, track successful referrals and monitor commissions."
      action={<div className={ui.actions}>
        <button type="button" className={styles.secondary} onClick={() => setModal({ kind: "settings" })}>Commission settings</button>
        <button type="button" className={styles.primary} onClick={() => setModal({ kind: "add" })}><Plus size={17} />Add referral partner</button>
      </div>} />
    {feedback && <PreviewNotice feedback={feedback} />}
    <div className={styles.metrics} data-columns="4">
      <Metric label="Total referral partners" value={partners.length} detail={`${partners.filter((row) => row.status === "Active").length} active partners`} icon={Users} />
      <Metric label="Total referrals" value={partners.reduce((sum, row) => sum + row.referrals, 0)} detail="Across all referral codes" icon={Link2} />
      <Metric label="Successful referrals" value={partners.reduce((sum, row) => sum + row.paid, 0)} detail="Applications with confirmed payments" icon={CircleCheck} tone="green" />
      <Metric label="Total commissions" value={balances(totals)} detail="Earned on qualifying payments" icon={CircleDollarSign} />
    </div>
    <section className={`${styles.panel} ${ui.tablePanel}`} aria-labelledby="referral-partners-title">
      <div className={styles.panelHeader}>
        <h2 id="referral-partners-title">Referral partners <small>{partners.length}</small></h2>
        <Link href="/refer-and-earn/join" className={styles.link}>Partner sign-up</Link>
      </div>
      <PreviewFilters list={list} placeholder="Search partners or codes…" statusLabel="Partners" statuses={["Active", "Inactive"]} dateLabel="Date added">
        <select aria-label="Performance" className={styles.control} value={performance} onChange={(event) => { setPerformance(event.target.value); list.setPage(1); }}>
          <option value="">All performance</option><option value="paid">Has qualifying payments</option><option value="unpaid">No qualifying payments</option>
        </select>
      </PreviewFilters>
      <DataTable caption="Referral partners" headings={["Partner", "Code", "Referrals", "Paid", "Rate", "Earned", "Status", "Actions"]}>
        {list.rows.map((row) => <tr key={row.id}>
          <td><PreviewPerson name={row.name} email={row.email} open={() => setModal({ kind: "details", partner: row })} /></td>
          <td>{row.code}</td><td>{row.referrals}</td><td>{row.paid}</td><td>{row.rate}%</td><td>{balances(row.earnings)}</td>
          <td><Badge tone={row.status === "Active" ? "green" : "muted"}>{row.status}</Badge></td>
          <td><ActionMenu label={`Actions for ${row.name}`} actions={[
            { label: "View partner", icon: Eye, onSelect: () => setModal({ kind: "details", partner: row }) },
            { label: "Edit partner", icon: Edit, onSelect: () => setModal({ kind: "edit", partner: row }) },
            ...(currencies(row).length > 0 ? [{ label: "Record payout", icon: Wallet, onSelect: () => openPayout(row) }] : []),
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
    {modal?.kind === "settings" && <PreviewDialog title="Commission settings and records" wide close={close} submit={async (data) => {
      await adminRequest("referrals/settings","PATCH",{rate:Number(value(data,"rate"))}); resource.reload();
      finish("Default commission rate updated.");
    }}>
      <PreviewInput name="rate" label="Default commission rate (%)" type="number" min={0} max={100} step="0.01" value={defaultRate} />
      <p className={styles.hint}>New partners use this rate by default. Existing rates can be edited on each partner.</p>
      <h3>Payout records</h3>
      {payouts.length ? <ul className={ui.questionList}>{payouts.map((payout) => <li key={payout.id}>
        <span>{partners.find((row) => row.id === payout.partnerId)?.name} · {displayDate(payout.date)}</span>
        <strong>{formatAmount(payout.currency,payout.amount)}</strong>
      </li>)}</ul> : <p>No payouts recorded.</p>}
    </PreviewDialog>}
    {modal?.kind === "details" && <PreviewDialog title="Referral partner details" description={modal.partner.name} close={close} drawer>
      <DetailRows items={[["Email address", modal.partner.email], ["Referral code", modal.partner.code], ["Status", modal.partner.status],
        ["Date added", displayDate(modal.partner.added)], ["Referrals", modal.partner.referrals], ["Paid referrals", modal.partner.paid],
        ["Commission rate", `${modal.partner.rate}%`], ["Available commission", availableBalances(modal.partner)]]} />
      <h3>Payout history</h3>
      {partnerPayouts(modal.partner.id).length ? <ul className={ui.questionList}>{partnerPayouts(modal.partner.id).map((item) => <li key={item.id}>
        <span>{displayDate(item.date)} · {item.note}</span><strong>{formatAmount(item.currency,item.amount)}</strong>
      </li>)}</ul> : <p>No payouts recorded.</p>}
      {currencies(modal.partner).length > 0 && <button type="button" className={styles.primary} onClick={() => openPayout(modal.partner)}>Record payout</button>}
    </PreviewDialog>}
    {modal?.kind === "payout" && <PreviewDialog title="Record partner payout" description={modal.partner.name} close={close} save="Record payout" submit={async (data) => {
      const amount = Number(value(data, "amount"));
      if (amount <= 0 || amount > available(modal.partner,currency)) return "Enter an amount within the available commission.";
      const note = value(data, "note");
      if (!note) return "Enter a payout reference or note.";
      await adminRequest(`referrals/${modal.partner.id}/payouts`,"POST",{id:payoutId,amount,currency,note,date:value(data,"date")});
      resource.reload(); finish("Payout recorded.");
    }}>
      <p>Available commission · {availableBalances(modal.partner)}</p>
      <label>Currency<select value={currency} onChange={event=>setCurrency(event.target.value)}>{currencies(modal.partner).map(unit=><option key={unit}>{unit}</option>)}</select></label>
      <PreviewInput name="amount" label={`Payout amount (${currency})`} type="number" min={0.01} max={available(modal.partner,currency)} step="0.01" />
      <PreviewInput name="date" label="Payout date" type="date" />
      <PreviewNotes name="note" label="Payout reference or note" required />
    </PreviewDialog>}
    {modal?.kind === "toggle" && <PreviewDialog title={modal.partner.status === "Active" ? "Deactivate referral partner?" : "Activate referral partner?"}
      description={modal.partner.name} close={close} danger={modal.partner.status === "Active"} save={modal.partner.status === "Active" ? "Deactivate partner" : "Activate partner"}
      submit={async () => {
        await adminRequest(`referrals/${modal.partner.id}/status`,"PATCH",{active:modal.partner.status !== "Active"});
        resource.reload(); finish("Partner status updated.");
      }}><p>Change this partner’s status for new referrals.</p></PreviewDialog>}
  </>;
}
