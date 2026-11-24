"use client";

import { useState } from "react";
import { CalendarDays, ClipboardList, CreditCard, Users } from "lucide-react";
import { Badge, DataTable, DetailRows, Dialog, DialogActions, Field, Metric, PageHeading, displayDate, money, type Tone } from "./AdminUI";
import { bookings, saveRecord, useManagement, type Booking, type Mentor, type MentorApplication } from "./ManagementData";
import styles from "./admin.module.css";

const applicationTones: Record<MentorApplication["status"], Tone> = {
  Pending: "orange", "Under Review": "purple", Approved: "green", "More Information Required": "orange", Rejected: "red",
};
const bookingTones: Record<Booking["status"], Tone> = {
  Confirmed: "purple", "Pending Payment": "orange", Completed: "muted", Cancelled: "red", Refunded: "muted",
};
const tabs = ["Applications", "Mentors", "Bookings"] as const;
type Tab = typeof tabs[number];
type Details = { kind: "applications" | "mentors" | "bookings"; id: string };
type Decision = "approve" | "reject" | "request";

const decisionCopy = {
  approve: { title: "Approve application?", description: "Approve this application and add the applicant to the preview marketplace.", button: "Approve Application", label: "" },
  reject: { title: "Reject application?", description: "Record why this application could not be approved.", button: "Reject Application", label: "Rejection reason" },
  request: { title: "Request more information", description: "Describe the additional information you need to continue your review.", button: "Send request", label: "Message to applicant" },
};

function Identity({ name, sub }: { name: string; sub?: string }) {
  const initials = name.split(/\s+/).slice(0, 2).map((word) => word[0]).join("");
  return <div className={styles.rowIdentity}>
    <span className={styles.initials} aria-hidden>{initials}</span>
    <div><strong>{name}</strong>{sub && <small>{sub}</small>}</div>
  </div>;
}

function PersonDetails({ email, bio, expertise, experience }: { email: string; bio: string; expertise: string; experience: number }) {
  return <>
    <section className={styles.detailSection}><h3>Contact</h3><DetailRows items={[["Email", email]]} /></section>
    <section className={styles.detailSection}><h3>Professional bio</h3><p>{bio}</p></section>
    <section className={`${styles.detailSection} ${styles.infoBox} ${styles.lmsInfo}`}><h3>Expertise</h3><p>{expertise}</p></section>
    <section className={styles.detailSection}><h3>Experience &amp; qualifications</h3><p>{experience} years of experience</p></section>
  </>;
}

function ApplicationDecision({ decision, onClose, onSave }: { decision: Decision; onClose: () => void; onSave: (note: string) => void }) {
  const copy = decisionCopy[decision];
  const [error, setError] = useState("");
  return (
    <Dialog title={copy.title} description={copy.description} onClose={onClose}>
      <form method="post" onSubmit={(event) => {
        event.preventDefault();
        const note = String(new FormData(event.currentTarget).get("note") ?? "").trim();
        if (copy.label && !note) { setError("Enter the reason or message before continuing."); return; }
        onSave(note);
      }}>
        {copy.label && <div className={styles.dialogBody}>
          <Field label={copy.label}>{(id) => <textarea id={id} name="note" className={styles.control} required />}</Field>
          {error && <p role="alert" className={styles.error}>{error}</p>}
        </div>}
        <DialogActions onClose={onClose}>
          <button type="submit" className={`${styles.primary} ${decision === "reject" ? styles.destructive : ""}`}>{copy.button}</button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

function BookingDetails({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  return (
    <Dialog title="Booking details" description="Mentorship session booking" drawer onClose={onClose}>
      <div className={styles.dialogBody}>
        <div><Badge tone={bookingTones[booking.status]}>{booking.status}</Badge></div>
        <div className={`${styles.infoBox} ${styles.lmsInfo}`}>
          <p className={styles.infoLabel}>Booking reference</p><p className={styles.infoValue}>{booking.id}</p>
        </div>
        <section className={styles.detailSection}><h3>Session</h3>
          <DetailRows items={[["Session type", booking.session], ["Booked", displayDate(booking.booked)], ["Session date", displayDate(booking.sessionDate)]]} />
        </section>
        <section className={styles.detailSection}><h3>Participants</h3><DetailRows items={[["Mentor", booking.mentor], ["Mentee", booking.mentee]]} /></section>
        <section className={`${styles.detailSection} ${styles.infoBox}`}><h3>Payment details</h3>
          <DetailRows items={[["Booking amount", money(booking.amount, "USD")], ["Status", booking.status]]} />
        </section>
        <section className={styles.detailSection}><h3>Booking activity</h3><p>Booking created on {displayDate(booking.booked)}.</p></section>
      </div>
    </Dialog>
  );
}

export function Mentorship() {
  const { records: { mentorApplications, mentors }, update } = useManagement();
  const [tab, setTab] = useState<Tab>("Applications");
  const [details, setDetails] = useState<Details | null>(null);
  const [decision, setDecision] = useState<Decision | "mentor-status" | null>(null);
  const close = () => { setDetails(null); setDecision(null); };
  const application = details?.kind === "applications" ? mentorApplications.find((item) => item.id === details.id) : undefined;
  const mentor = details?.kind === "mentors" ? mentors.find((item) => item.id === details.id) : undefined;
  const booking = details?.kind === "bookings" ? bookings.find((item) => item.id === details.id) : undefined;
  const pending = mentorApplications.filter((item) => item.status === "Pending" || item.status === "Under Review").length;
  const upcoming = bookings.filter((item) => item.status === "Confirmed").length;
  const tabCounts = { Applications: mentorApplications.length, Mentors: mentors.length, Bookings: bookings.length };

  function saveDecision(item: MentorApplication, choice: Decision, note: string) {
    const status = { approve: "Approved", reject: "Rejected", request: "More Information Required" } as const;
    update("mentorApplications", (all) => saveRecord(all, { ...item, status: status[choice], decisionNote: note }));
    if (choice === "approve") {
      update("mentors", (all) => all.some((record) => record.email === item.email) ? all : [...all, {
        id: crypto.randomUUID(), name: item.name, email: item.email, title: "Mentor", expertise: item.expertise,
        experience: item.experience, sessions: 0, rating: "Not yet rated", status: "Active", bio: item.bio,
      }]);
    }
    setDecision(null);
  }

  return (
    <>
      <PageHeading title="Mentorship" description="Manage mentor applications, marketplace mentors and bookings." />
      <div className={styles.metrics} data-columns="4">
        <Metric label="Total Mentors" value={mentors.length} detail="Marketplace mentors" icon={Users} tone="orange" />
        <Metric label="Pending Applications" value={pending} detail="Awaiting review" icon={ClipboardList} />
        <Metric label="Total Bookings" value={bookings.length} detail="Across the marketplace" icon={CreditCard} tone="green" />
        <Metric label="Upcoming Sessions" value={upcoming} detail="Confirmed sessions in the preview" icon={CalendarDays} />
      </div>
      <div className={styles.tabList} role="tablist" aria-label="Mentorship sections">
        {tabs.map((item, index) => <button key={item} role="tab" type="button" id={`mentorship-tab-${item}`} aria-controls={`mentorship-panel-${item}`}
          aria-selected={item === tab} tabIndex={item === tab ? 0 : -1} onClick={() => setTab(item)}
          onKeyDown={(event) => {
            const next = event.key === "ArrowRight" ? (index + 1) % tabs.length
              : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length
              : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : null;
            if (next === null) return;
            event.preventDefault();
            setTab(tabs[next]);
            document.getElementById(`mentorship-tab-${tabs[next]}`)?.focus();
          }}>
          {item} <small>{tabCounts[item]}</small>
        </button>)}
      </div>
      <section className={`${styles.panel} ${styles.tablePanel}`} role="tabpanel" id={`mentorship-panel-${tab}`} aria-labelledby={`mentorship-tab-${tab}`}>
        <div className={styles.panelHeader}>
          <div><h2>{tab}</h2><p>{tab === "Applications" ? "Review mentor applications."
            : tab === "Mentors" ? "Manage mentor availability in the marketplace." : "Review bookings, sessions and payments."}</p></div>
          <Badge tone="purple">{tab === "Applications" ? `${pending} pending review` : tab === "Mentors"
            ? `${mentors.filter((record) => record.status === "Active").length} active` : `${upcoming} upcoming`}</Badge>
        </div>
        {tab === "Applications" && <DataTable caption="Mentor applications" headings={["Applicant", "Expertise", "Experience", "Submitted", "Status", "Actions"]}>
          {mentorApplications.map((item) => <tr key={item.id}>
            <td><Identity name={item.name} sub={item.email} /></td><td>{item.expertise}</td><td>{item.experience} years</td><td>{displayDate(item.date)}</td>
            <td><Badge tone={applicationTones[item.status]}>{item.status}</Badge></td>
            <td><button type="button" className={styles.link} aria-label={`View application for ${item.name}`} onClick={() => setDetails({ kind: "applications", id: item.id })}>View Application</button></td>
          </tr>)}
        </DataTable>}
        {tab === "Mentors" && <DataTable caption="Mentors" headings={["Mentor", "Expertise", "Experience", "Sessions", "Rating", "Status", "Actions"]}>
          {mentors.map((item) => <tr key={item.id}>
            <td><Identity name={item.name} sub={item.title} /></td><td>{item.expertise}</td><td>{item.experience} years</td><td>{item.sessions}</td><td>{item.rating}</td>
            <td><Badge tone={item.status === "Active" ? "purple" : "orange"}>{item.status}</Badge></td>
            <td><button type="button" className={styles.link} aria-label={`View details for ${item.name}`} onClick={() => setDetails({ kind: "mentors", id: item.id })}>View Details</button></td>
          </tr>)}
        </DataTable>}
        {tab === "Bookings" && <DataTable caption="Mentorship bookings" headings={["Booking ID", "Mentor", "Mentee", "Session Type", "Booked", "Session Date", "Amount", "Status", "Actions"]}>
          {bookings.map((item) => <tr key={item.id}>
            <td>{item.id}</td><td>{item.mentor}</td><td>{item.mentee}</td><td>{item.session}</td><td>{displayDate(item.booked)}</td><td>{displayDate(item.sessionDate)}</td><td>{money(item.amount, "USD")}</td>
            <td><Badge tone={bookingTones[item.status]}>{item.status}</Badge></td>
            <td><button type="button" className={styles.link} aria-label={`View details for ${item.id}`} onClick={() => setDetails({ kind: "bookings", id: item.id })}>View Details</button></td>
          </tr>)}
        </DataTable>}
      </section>

      {application && <Dialog title="Application details" description={`Submitted ${displayDate(application.date)}`} drawer onClose={close}>
        <div className={styles.dialogBody}>
          <Identity name={application.name} sub={application.email} />
          <div><Badge tone={applicationTones[application.status]}>{application.status}</Badge></div>
          <PersonDetails {...application} />
          {application.decisionNote && <section className={styles.detailSection}><h3>Review note</h3><p>{application.decisionNote}</p></section>}
          {application.status !== "Approved" && application.status !== "Rejected" && <div className={styles.buttonRow}>
            <button type="button" className={styles.primary} onClick={() => setDecision("approve")}>Approve Application</button>
            <button type="button" className={styles.secondary} onClick={() => setDecision("reject")}>Reject</button>
            <button type="button" className={styles.secondary} onClick={() => setDecision("request")}>Request More Information</button>
          </div>}
        </div>
      </Dialog>}
      {application && decision && decision !== "mentor-status" && <ApplicationDecision decision={decision} onClose={() => setDecision(null)} onSave={(note) => saveDecision(application, decision, note)} />}
      {mentor && <Dialog title="Mentor details" description="Public marketplace mentor" drawer onClose={close}>
        <div className={styles.dialogBody}>
          <Identity name={mentor.name} sub={mentor.title} />
          <div><Badge tone={mentor.status === "Active" ? "purple" : "orange"}>{mentor.status}</Badge></div>
          <PersonDetails {...mentor} />
          <section className={`${styles.detailSection} ${styles.infoBox}`}><h3>Marketplace performance</h3>
            <DetailRows items={[["Sessions", mentor.sessions], ["Rating", mentor.rating]]} />
          </section>
          <div><button type="button" className={styles.secondary} onClick={() => setDecision("mentor-status")}>{mentor.status === "Active" ? "Suspend Mentor" : "Reinstate Mentor"}</button></div>
        </div>
      </Dialog>}
      {mentor && decision === "mentor-status" && <Dialog title={mentor.status === "Active" ? "Suspend mentor?" : "Reinstate mentor?"}
        description={mentor.status === "Active" ? "Pause this mentor’s marketplace availability." : "Make this mentor available for new marketplace bookings."} onClose={() => setDecision(null)}>
        <DialogActions onClose={() => setDecision(null)}><button type="button"
          className={`${styles.primary} ${mentor.status === "Active" ? styles.destructive : ""}`}
          onClick={() => {
            const status: Mentor["status"] = mentor.status === "Active" ? "Suspended" : "Active";
            update("mentors", (all) => saveRecord(all, { ...mentor, status }));
            setDecision(null);
          }}>{mentor.status === "Active" ? "Suspend Mentor" : "Reinstate Mentor"}</button></DialogActions>
      </Dialog>}
      {booking && <BookingDetails booking={booking} onClose={close} />}
    </>
  );
}
