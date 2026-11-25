"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BookOpen, CalendarDays, CircleCheck, Clock3, CreditCard, FileText,
  GraduationCap, TriangleAlert, Users,
} from "lucide-react";
import { ResourceState, IconTile, Metric, PageHeading, displayDate, money } from "./AdminUI";
import type { Overview } from "./AdminData";
import { useAdminResource } from "./admin-api";
import { useWorkspaceProfile } from "./AdminShell";
import styles from "./admin.module.css";

function RevenueChart({ daily, currency }: { daily: Overview["daily"]; currency: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context || daily.length < 2) return;

    function draw() {
      if (!element || !context) return;
      const { width, height } = element.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      element.width = width * scale;
      element.height = height * scale;
      context.scale(scale, scale);

      const left = 66;
      const right = width - 9;
      const bottom = height - 24;
      const top = 12;
      context.font = "11px sans-serif";
      context.fillStyle = "#726c7d";
      const max = Math.max(1, ...daily.map((point) => point.revenue));
      context.lineWidth = 1;
      for (let line = 0; line <= 3; line++) {
        const y = bottom - line * (bottom - top) / 3;
        context.strokeStyle = "#edeaf2";
        context.beginPath();
        context.moveTo(left, y);
        context.lineTo(right, y);
        context.stroke();
        context.fillText(new Intl.NumberFormat("en-NG", { style: "currency", currency, notation: "compact", maximumFractionDigits: 1 }).format(max * line / 3), 0, y + 4);
      }

      const points = daily.map(({ revenue }, index) => ({
        x: left + (right - left) * index / (daily.length - 1),
        y: bottom - revenue * (bottom - top) / max,
      }));
      context.strokeStyle = "#6622e5";
      context.lineWidth = 2;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let index = 1; index < points.length - 1; index++) {
        const point = points[index];
        const next = points[index + 1];
        context.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2);
      }
      const last = points[points.length - 1];
      context.lineTo(last.x, last.y);
      context.stroke();

      const labels = [0, 0.5, 1].map((ratio) => displayDate(daily[Math.round(ratio * (daily.length - 1))].day));
      labels.forEach((label, index) => {
        const ratio = index / (labels.length - 1);
        const textWidth = context.measureText(label).width;
        context.fillText(label, left + (right - left - textWidth) * ratio, height - 4);
      });
    }

    const resize = new ResizeObserver(draw);
    resize.observe(element);
    return () => resize.disconnect();
  }, [daily, currency]);

  return <canvas ref={canvas} className={styles.chart} role="img"
    aria-label={`Daily revenue over the last ${daily.length} days`} />;
}

export function Dashboard() {
  const [days, setDays] = useState(30);
  const [showActivity, setShowActivity] = useState(false);
  const account = useWorkspaceProfile();
  const resource = useAdminResource<Overview>("dashboard?days=" + days);
  const overview = resource.data;
  const attention = [
    { count: overview?.pendingPayments, title: "Payments pending", link: "/admin/orders-payments", access: ["Orders & Payments", "Transactions"], icon: Clock3, tone: "orange" },
    { count: overview?.failedLms, title: "Failed LMS access records", link: "/admin/learners", access: ["Learners"], icon: TriangleAlert, tone: "red" },
    { count: overview?.newApplications, title: "New applications", link: "/admin/applications", access: ["Applications", "Scholarship Applications"], icon: FileText, tone: "orange" },
  ] as const;
  const activityIcons = { "Application submitted": FileText, "Payment received": CircleCheck, "Learner enrolled": Users };
  return (
    <>
      <PageHeading title={`Welcome, ${account.name.split(" ")[0] || "Administrator"}`} description="Here’s what’s happening at ProductPointers today." action={
        <label className={styles.period}>
          <CalendarDays size={17} aria-hidden />
          <select aria-label="Revenue period" value={days} onChange={(event) => setDays(Number(event.target.value))}>
            <option value={30}>Last 30 days</option>
            <option value={7}>Last 7 days</option>
          </select>
        </label>
      } />
      <ResourceState {...resource}>{overview && <>
      <div className={styles.metrics} data-columns="4">
        <Metric label="Total Learners" value={overview.learners} detail="All registered learners" icon={Users} />
        <Metric label="Total Applications" value={overview.applications} detail="All submitted applications" icon={FileText} />
        <Metric label="Revenue" value={money(overview.revenue, overview.currency)} detail="Selected period · NGN" icon={CreditCard} />
        <Metric label="Pending Payments" value={overview.pendingPayments} detail="Awaiting confirmation" icon={Clock3} tone="orange" />
      </div>

      <div className={styles.dashboardColumns}>
        <section className={styles.panel} aria-labelledby="admin-revenue">
          <div className={styles.panelHeader}>
            <div><h2 id="admin-revenue">Revenue Overview</h2><p>Last {days} days · Daily revenue</p></div>
            <span className={styles.chartLegend}>Revenue</span>
          </div>
          <div className={styles.panelBody}><RevenueChart daily={overview.daily} currency={overview.currency} /></div>
        </section>
        <section className={styles.panel} id="needs-attention" aria-labelledby="admin-attention">
          <div className={styles.panelHeader}>
            <h2 id="admin-attention">Needs Attention</h2>
          </div>
          <div className={styles.panelBody}>
            <ul className={styles.dashboardList}>
              {attention.filter((item) => item.count).map((item) => (
                <li key={item.title}>
                  <IconTile icon={item.icon} tone={item.tone} />
                  <strong>{item.count} · {item.title}</strong>
                  {item.access.some((section) => account.sections.includes(section)) && <Link className={styles.smallButton} href={item.link}>Review</Link>}
                </li>
              ))}
              {!attention.some((item) => item.count) && <li>No items need attention.</li>}
            </ul>
          </div>
        </section>
      </div>

      <section className={styles.panel} aria-labelledby="admin-application-types">
        <div className={styles.panelHeader}>
          <h2 id="admin-application-types">Applications by Type</h2>
        </div>
        <div className={styles.panelBody}>
          <ul className={styles.dashboardList}>
            {["Program", "Scholarship", "Mentorship"].map((type) => {
              const mentorship = type === "Mentorship";
              const canReview = mentorship ? account.sections.includes(type) :
                account.sections.includes("Applications") || (type === "Scholarship" && account.sections.includes("Scholarship Applications"));
              return <li key={type}>
                <IconTile icon={mentorship ? BookOpen : GraduationCap} />
                <strong>{type}</strong>
                <strong className={styles.listEnd}>{overview.applicationsByType.find((item) => item.type === type)?.total ?? 0}</strong>
                {canReview && <Link href={mentorship ? "/admin/mentorship" : "/admin/applications?type=" + type} className={styles.smallButton} aria-label={`Review ${type} applications`}>Review</Link>}
              </li>;
            })}
          </ul>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="admin-recent-activity">
        <div className={styles.panelHeader}>
          <h2 id="admin-recent-activity">Recent Activity</h2>
          <button type="button" className={styles.link} aria-expanded={showActivity} onClick={() => setShowActivity(!showActivity)}>
            {showActivity ? "Show less" : "View all"}
          </button>
        </div>
        <div className={styles.panelBody}>
          <ul className={styles.dashboardList}>
            {overview.recent.slice(0, showActivity ? undefined : 4).map((item) => (
              <li key={item.id + item.activity}>
                <IconTile icon={activityIcons[item.activity as keyof typeof activityIcons] ?? FileText} /><strong>{item.activity}</strong>
                <small className={styles.listEnd}>{displayDate(item.date)}</small>
              </li>
            ))}
            {!overview.recent.length && <li>No recent activity.</li>}
          </ul>
        </div>
      </section>
      </>}</ResourceState>
    </>
  );
}
