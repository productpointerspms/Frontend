"use client";

import Link from "next/link";
import { ArrowRight, ClipboardList, CreditCard, GraduationCap, ShoppingBag } from "lucide-react";
import { ResourceState, Badge, DataTable, Metric, PageHeading, money } from "./AdminUI";
import type { Overview } from "./AdminData";
import { useAdminResource } from "./admin-api";
import { useWorkspaceProfile } from "./AdminShell";
import styles from "./admin.module.css";

export function Analytics() {
  const account = useWorkspaceProfile();
  const resource = useAdminResource<Overview>("analytics");
  const overview = resource.data;
  if (!overview) return <ResourceState {...resource}>{null}</ResourceState>;
  const maximumRevenue = Math.max(1, ...overview.revenueByProgram.map(({ revenue }) => revenue));
  const maximumApplications = Math.max(1, ...overview.applicationsByType.map(({ total }) => total));
  const learnerTotals = [
    { label: "Total Learners", value: overview.learners, detail: "Learner records", tone: "green" },
    { label: "Active Enrolments", value: overview.activeEnrollments, detail: "Currently enrolled", tone: "orange" },
    { label: "Pending Enrolments", value: overview.pendingEnrollments, detail: "Awaiting confirmation", tone: "purple" },
    { label: "Certificates Issued", value: overview.certificatesIssued, detail: "Recorded certificates", tone: "muted" },
  ] as const;

  return (
    <>
      <PageHeading title="Analytics" description="Understand business performance, learner participation and program activity." />
      <div className={styles.metrics} data-columns="4">
        <Metric label="Total Revenue" value={money(overview.revenue, overview.currency)} detail="Last 30 days · NGN" icon={CreditCard} tone="green" />
        <Metric label="Applications" value={overview.applications} detail="All records" icon={ClipboardList} tone="orange" />
        <Metric label="Scholarship Recipients" value={overview.scholarshipRecipients} detail="All records" icon={GraduationCap} />
        <Metric label="Course Purchases" value={overview.coursePurchases} detail="All records" icon={ShoppingBag} />
      </div>

      <div className={styles.dashboardColumns}>
        <section className={styles.panel} aria-labelledby="revenue-by-program">
          <div className={styles.panelHeader}><div><h2 id="revenue-by-program">Revenue by Program</h2><p>Last 30 days · NGN</p></div></div>
          <div className={styles.panelBody}>
            <ul className={styles.barChart} aria-label="Program revenue">
              {overview.revenueByProgram.map(({ id, title, revenue }) => <li key={id}>
                <div><b>{money(revenue, overview.currency)}</b><span className={styles.revenueBar} style={{ height: `${revenue / maximumRevenue * 100}%` }} /></div>
                <span>{title}</span>
              </li>)}
            </ul>
            {!overview.revenueByProgram.length && <p>No program revenue in this period.</p>}
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
            {account.sections.includes("Learners") && <Link href="/admin/learners" className={`${styles.primary} ${styles.analyticsLink}`}>View All Learners <ArrowRight size={15} aria-hidden /></Link>}
          </div>
        </section>
      </div>

      <div className={`${styles.dashboardColumns} ${styles.analyticsPanels}`}>
        <section className={`${styles.panel} ${styles.tablePanel}`} aria-labelledby="cohort-performance">
          <div className={styles.panelHeader}><div><h2 id="cohort-performance">Cohort Performance</h2><p>Enrolment and classroom setup across cohorts.</p></div></div>
          <DataTable caption="Cohort performance" headings={["Cohort", "Program", "Enrolled", "Status", "Classroom"]}>
            {overview.cohorts.map((cohort) => <tr key={cohort.id}>
              <td>{cohort.name}</td><td>{cohort.program}</td><td>{cohort.enrolled}</td>
              <td><Badge>{cohort.status}</Badge></td>
              <td><Badge tone={cohort.classroomLinked ? "green" : "muted"}>{cohort.classroomLinked ? "Linked" : "Not linked"}</Badge></td>
            </tr>)}
          </DataTable>
        </section>
        <section className={styles.panel} aria-labelledby="analytics-application-types">
          <div className={styles.panelHeader}><h2 id="analytics-application-types">Applications by Type</h2></div>
          <div className={styles.panelBody}>
            <ul className={styles.progressList}>
              {overview.applicationsByType.map(({ type: label, total: amount }) => <li key={label}>
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
