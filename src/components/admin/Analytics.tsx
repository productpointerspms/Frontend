"use client";

import Link from "next/link";
import { ArrowRight, ClipboardList, CreditCard, GraduationCap, ShoppingBag } from "lucide-react";
import { Badge, DataTable, Metric, PageHeading, money } from "./AdminUI";
import { lmsTones, useAdminData } from "./AdminData";
import { useManagement } from "./ManagementData";
import styles from "./admin.module.css";

const revenue = [
  { program: "PPAP", amount: 2850000 },
  { program: "PPIP", amount: 2175000 },
  { program: "PPCP", amount: 1350000 },
  { program: "PPFP", amount: 1875000 },
];

export function Analytics() {
  const { programs, cohorts } = useAdminData();
  const { records: { applications, courses, learners, mentorApplications } } = useManagement();
  const totalRevenue = revenue.reduce((total, item) => total + item.amount, 0);
  const maximumRevenue = Math.max(...revenue.map(({ amount }) => amount));
  const applicationTotals = [
    ["Program", applications.filter(({ type }) => type === "Program").length],
    ["Scholarship", applications.filter(({ type }) => type === "Scholarship").length],
    ["Mentorship", mentorApplications.length],
  ] as const;
  const maximumApplications = Math.max(...applicationTotals.map(([, amount]) => amount), 1);
  const learnerTotals = [
    { label: "Total Learners", value: learners.length, detail: "Learner records", tone: "green" },
    { label: "Active Learners", value: learners.filter(({ enrollment }) => enrollment === "Active").length, detail: "Currently enrolled", tone: "orange" },
    { label: "Pending Enrolments", value: learners.filter(({ enrollment }) => enrollment === "Pending").length, detail: "Awaiting confirmation", tone: "purple" },
    { label: "Certificates Issued", value: learners.filter(({ certificate }) => certificate === "Issued").length, detail: "Recorded certificates", tone: "muted" },
  ] as const;

  return (
    <>
      <PageHeading title="Analytics" description="Understand business performance, learner participation and program activity." />
      <div className={styles.metrics} data-columns="4">
        <Metric label="Total Revenue" value={money(totalRevenue)} detail="Illustrative prototype data · NGN" icon={CreditCard} tone="green" />
        <Metric label="Applications" value={programs.reduce((total, program) => total + program.applicants, 0)} detail="Illustrative prototype data" icon={ClipboardList} tone="orange" />
        <Metric label="Scholarship Recipients" value={12} detail="Illustrative prototype data" icon={GraduationCap} />
        <Metric label="Course Purchases" value={courses.reduce((total, course) => total + course.purchases, 0)} detail="Illustrative prototype data" icon={ShoppingBag} />
      </div>

      <div className={styles.dashboardColumns}>
        <section className={styles.panel} aria-labelledby="revenue-by-program">
          <div className={styles.panelHeader}><div><h2 id="revenue-by-program">Revenue by Program</h2><p>Illustrative prototype data · NGN</p></div></div>
          <div className={styles.panelBody}>
            <ul className={styles.barChart} aria-label="Sample program revenue">
              {revenue.map(({ program, amount }) => <li key={program}>
                <div><b>{money(amount)}</b><span className={styles.revenueBar} style={{ height: `${amount / maximumRevenue * 100}%` }} /></div>
                <span>{program}</span>
              </li>)}
            </ul>
          </div>
        </section>
        <section className={styles.panel} aria-labelledby="learner-overview">
          <div className={styles.panelHeader}><div><h2 id="learner-overview">Learner Overview</h2><p>Summary of learner enrolment and progress.</p></div></div>
          <div className={styles.panelBody}>
            <div className={styles.learnerOverview}>
              {learnerTotals.map(({ label, value, detail, tone }) => <div key={label} data-tone={tone}>
                <p>{label}</p><strong>{value}</strong><small>{detail}</small>
              </div>)}
            </div>
            <Link href="/admin/learners" className={`${styles.primary} ${styles.analyticsLink}`}>View All Learners <ArrowRight size={15} aria-hidden /></Link>
          </div>
        </section>
      </div>

      <div className={`${styles.dashboardColumns} ${styles.analyticsPanels}`}>
        <section className={`${styles.panel} ${styles.tablePanel}`} aria-labelledby="cohort-performance">
          <div className={styles.panelHeader}><div><h2 id="cohort-performance">Cohort Performance</h2><p>Enrolment, payment and LMS status across cohorts.</p></div></div>
          <DataTable caption="Cohort performance" headings={["Cohort", "Program", "Enrolled", "Payment", "LMS Sync"]}>
            {cohorts.map((cohort) => {
              const pending = learners.filter((item) => item.cohort === cohort.id && item.payment === "Pending").length;
              return <tr key={cohort.id}>
                <td>{cohort.name}</td><td>{cohort.program}</td><td>{cohort.learners}</td>
                <td>{pending ? <Badge tone="orange">{pending} pending</Badge> : "—"}</td>
                <td><Badge tone={lmsTones[cohort.lms]}>{cohort.lms}</Badge></td>
              </tr>;
            })}
          </DataTable>
        </section>
        <section className={styles.panel} aria-labelledby="analytics-application-types">
          <div className={styles.panelHeader}><h2 id="analytics-application-types">Applications by Type</h2></div>
          <div className={styles.panelBody}>
            <ul className={styles.progressList}>
              {applicationTotals.map(([label, amount]) => <li key={label}>
                <span><b>{label}</b>{amount}</span>
                <progress aria-label={label + " applications"} value={amount} max={maximumApplications} />
              </li>)}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
