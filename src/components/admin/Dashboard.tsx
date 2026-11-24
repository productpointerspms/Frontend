"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BookOpen, CalendarDays, CircleCheck, Clock3, CreditCard, FileText,
  GraduationCap, TriangleAlert, Users,
} from "lucide-react";
import { Badge, IconTile, Metric, PageHeading, money } from "./AdminUI";
import { useAdminData } from "./AdminData";
import styles from "./admin.module.css";

const revenue = [
  0.5, 2.5, 1.2, 3.7, 2.3, 5, 3.8, 5.7, 4.2, 7.6, 5.8, 8.1, 7.4, 9.3, 8.4,
  10.2, 8.8, 11.4, 10, 12.3, 10.9, 13.5, 12.1, 14.1, 12.4, 14.7, 13.2, 16, 15.6, 17.3,
];
const attention = [
  { title: "4 payments pending", detail: "PPAP Cohort 5", link: "/admin/programs", action: "Review", icon: Clock3, tone: "orange" },
  { title: "2 failed Google Classroom/LMS syncs", detail: "Learner enrolments", link: "/admin/cohorts", action: "Fix", icon: TriangleAlert, tone: "red" },
  { title: "26 new applications", detail: "ONOME Scholarship", link: "/admin/applications?type=Scholarship", action: "Review", icon: FileText, tone: "orange" },
  { title: "Scholarship deadline approaching", detail: "PPFP Scholarship", link: "/admin/scholarships", action: "Review", icon: Clock3, tone: "orange" },
] as const;

const applicationTypes = [
  { type: "Programs", detail: "Cohorts and program applications", count: 42, icon: GraduationCap, link: "/admin/applications?type=Program" },
  { type: "Scholarships", detail: "Scholarship applications", count: 43, icon: GraduationCap, link: "/admin/applications?type=Scholarship" },
  { type: "Mentorship", detail: "Mentorship applications", count: 43, icon: BookOpen, link: "/admin/mentorship" },
];

const activity = [
  { name: "New PPAP application received", when: "8 minutes ago", icon: FileText, tone: "purple" },
  { name: "Payment received", when: "13 minutes ago", icon: CircleCheck, tone: "green" },
  { name: "Learner enrolled in PPFP Cohort 4", when: "42 minutes ago", icon: Users, tone: "purple" },
  { name: "Course published", when: "1 hour ago", icon: BookOpen, tone: "purple" },
  { name: "Cohort schedule updated", when: "2 hours ago", icon: CalendarDays, tone: "purple" },
] as const;

function RevenueChart({ days }: { days: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;

    function draw() {
      if (!element || !context) return;
      const { width, height } = element.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      element.width = width * scale;
      element.height = height * scale;
      context.scale(scale, scale);

      const left = 47;
      const right = width - 9;
      const bottom = height - 24;
      const top = 12;
      context.font = "11px sans-serif";
      context.fillStyle = "#726c7d";
      context.lineWidth = 1;
      for (let line = 0; line <= 3; line++) {
        const y = bottom - line * (bottom - top) / 3;
        context.strokeStyle = "#edeaf2";
        context.beginPath();
        context.moveTo(left, y);
        context.lineTo(right, y);
        context.stroke();
        context.fillText(line === 0 ? "₦0" : `₦${line * 100}k`, 0, y + 4);
      }

      const points = revenue.slice(-days).map((value, index) => ({
        x: left + (right - left) * index / (days - 1),
        y: bottom - value * (bottom - top) / 19,
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

      const labels = days === 7 ? ["Oct 3", "Oct 5", "Oct 7", "Oct 9"] : ["Sep 10", "Sep 17", "Sep 24", "Oct 1", "Oct 9"];
      labels.forEach((label, index) => {
        const ratio = index / (labels.length - 1);
        const textWidth = context.measureText(label).width;
        context.fillText(label, left + (right - left - textWidth) * ratio, height - 4);
      });
    }

    const resize = new ResizeObserver(draw);
    resize.observe(element);
    return () => resize.disconnect();
  }, [days]);

  return <canvas ref={canvas} className={styles.chart} role="img"
    aria-label={`Sample revenue trending upward over the last ${days} days`} />;
}

export function Dashboard() {
  const [days, setDays] = useState(30);
  const [showAttention, setShowAttention] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const { programs } = useAdminData();
  const pending = programs.reduce((sum, item) => sum + (item.paymentStatus === "Pending" ? item.pendingPayments : 0), 0);
  return (
    <>
      <PageHeading title="Good morning, Blessing 👋" description="Here’s what’s happening at ProductPointers today." action={
        <label className={styles.period}>
          <CalendarDays size={17} aria-hidden />
          <select aria-label="Revenue period" value={days} onChange={(event) => setDays(Number(event.target.value))}>
            <option value={30}>Last 30 days</option>
            <option value={7}>Last 7 days</option>
          </select>
        </label>
      } />
      <div className={styles.metrics} data-columns="4">
        <Metric label="Total Learners" value={programs.reduce((sum, item) => sum + item.enrolled, 0)} detail="All registered learners" icon={Users} />
        <Metric label="Total Applications" value={programs.reduce((sum, item) => sum + item.applicants, 0)} detail="All submitted applications" icon={FileText} />
        <Metric label="Revenue" value={money(days === 30 ? 2850000 : 960000)} detail="Selected period · NGN" icon={CreditCard} />
        <Metric label="Pending Payments" value={pending} detail="Awaiting confirmation" icon={Clock3} tone="orange" />
      </div>

      <div className={styles.dashboardColumns}>
        <section className={styles.panel} aria-labelledby="admin-revenue">
          <div className={styles.panelHeader}>
            <div><h2 id="admin-revenue">Revenue Overview</h2><p>Last {days} days · Daily revenue</p></div>
            <span className={styles.chartLegend}>Revenue</span>
          </div>
          <div className={styles.panelBody}><RevenueChart days={days} /></div>
        </section>
        <section className={styles.panel} id="needs-attention" aria-labelledby="admin-attention">
          <div className={styles.panelHeader}>
            <h2 id="admin-attention">Needs Attention</h2>
            <button type="button" className={styles.link} aria-expanded={showAttention} onClick={() => setShowAttention(!showAttention)}>
              {showAttention ? "Show less" : "View all"}
            </button>
          </div>
          <div className={styles.panelBody}>
            <ul className={styles.dashboardList}>
              {attention.slice(0, showAttention ? undefined : 3).map((item) => (
                <li key={item.title}>
                  <IconTile icon={item.icon} tone={item.tone} />
                  <div><strong>{item.title}</strong><small>{item.detail}</small></div>
                  <div className={styles.listEnd}>
                    <Link className={styles.smallButton} href={item.link}>{item.action}</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className={styles.panel} aria-labelledby="admin-application-types">
        <div className={styles.panelHeader}>
          <h2 id="admin-application-types">Applications by Type</h2>
          <Badge>Illustrative sample data</Badge>
        </div>
        <div className={styles.panelBody}>
          <ul className={styles.dashboardList}>
            {applicationTypes.map((item) => (
              <li key={item.type}>
                <IconTile icon={item.icon} />
                <div><strong>{item.type}</strong><small>{item.detail}</small></div>
                <strong className={styles.listEnd}>{item.count}</strong>
                <Link href={item.link} className={styles.smallButton} aria-label={`Review ${item.type} applications`}>Review</Link>
              </li>
            ))}
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
            {activity.slice(0, showActivity ? undefined : 4).map((item) => (
              <li key={item.name}>
                <IconTile icon={item.icon} tone={item.tone} /><strong>{item.name}</strong>
                <small className={styles.listEnd}>{item.when}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
