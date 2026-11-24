"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BarChart3, Bell, BookOpen, ChevronDown, CircleDollarSign, ClipboardList,
  CreditCard, GraduationCap, LayoutGrid, Link2, Menu, Search, Settings, Users,
  X, type LucideIcon,
} from "lucide-react";
import styles from "./admin.module.css";

const sections = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Programs", path: "/admin/programs" },
  { name: "Cohorts", path: "/admin/cohorts" },
  { name: "Scholarships", path: "/admin/scholarships" },
];

type Section = typeof sections[number];
const [dashboard, programs, cohorts, scholarships] = sections;

function Avatar({ size }: { size: number }) {
  return <Image src="/images/Blessing.png" alt="" width={size} height={size} className={styles.avatar} />;
}

function NavigationItem({
  label, icon: Icon, section, onNavigate,
}: {
  label: string;
  icon?: LucideIcon;
  section?: Section;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const contents = <>{Icon && <Icon size={16} aria-hidden />}{label}</>;
  return (
    <li>
      {section
        ? <Link href={section.path} className={styles.navEntry} aria-current={pathname === section.path ? "page" : undefined} onClick={onNavigate}>{contents}</Link>
        : <span className={styles.navEntry} aria-disabled="true">{contents}</span>}
    </li>
  );
}

function NavigationGroup({
  label, icon: Icon, initiallyOpen, children,
}: {
  label: string;
  icon: LucideIcon;
  initiallyOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(Boolean(initiallyOpen));
  const id = useId();
  return (
    <li>
      <button type="button" className={styles.navEntry} aria-controls={id} aria-expanded={open} onClick={() => setOpen(!open)}>
        <Icon size={16} aria-hidden />{label}<ChevronDown size={15} className={styles.navChevron} aria-hidden />
      </button>
      <ul id={id} className={styles.navChildren} hidden={!open}>{children}</ul>
    </li>
  );
}

function SearchPages({ onNavigate }: { onNavigate: () => void }) {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const query = search.trim().toLowerCase();
  const results = query ? sections.filter(({ name }) => name.toLowerCase().includes(query)) : [];
  return (
    <div
      className={styles.search}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(event) => { if (event.key === "Escape") setFocused(false); }}
    >
      <Search size={16} aria-hidden />
      <input aria-label="Search admin pages" placeholder="Search" type="search" value={search} onChange={(event) => {
        setSearch(event.target.value);
        setFocused(true);
      }} />
      {focused && query && <div className={styles.popoverPanel}>
        {results.length ? results.map(({ name, path }) => (
          <Link key={path} href={path} onClick={() => {
            setSearch("");
            setFocused(false);
            onNavigate();
          }}>{name}</Link>
        )) : <p>No pages found.</p>}
      </div>}
    </div>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popover, setPopover] = useState<"profile" | "notifications" | null>(null);

  function closeNavigation() {
    setMobileOpen(false);
    setPopover(null);
  }

  return (
    <div className={styles.workspace} onKeyDown={(event) => {
      if (event.key === "Escape") closeNavigation();
    }}>
      <a className={styles.skipLink} href="#admin-content">Skip to content</a>
      <aside className={styles.sidebar} data-open={mobileOpen} id="admin-navigation">
        <Link className={styles.brand} href={dashboard.path} onClick={closeNavigation}>
          <Image src="/pp_logo.png" width={200} height={39} alt="ProductPointers" />
        </Link>
        <nav aria-label="Admin navigation">
          <ul className={styles.navList}>
            <NavigationItem label="Dashboard" icon={LayoutGrid} section={dashboard} onNavigate={closeNavigation} />
            <NavigationGroup label="Learning" icon={GraduationCap} initiallyOpen>
              <NavigationItem label="Programs" section={programs} onNavigate={closeNavigation} />
              <NavigationItem label="Cohorts" section={cohorts} onNavigate={closeNavigation} />
            </NavigationGroup>
            <NavigationGroup label="Apprenticeship" icon={Link2} initiallyOpen>
              <NavigationItem label="Apprenticeship" onNavigate={closeNavigation} />
              <NavigationItem label="AI Interview" onNavigate={closeNavigation} />
            </NavigationGroup>
            <NavigationItem label="Analytics" icon={BarChart3} onNavigate={closeNavigation} />
            <NavigationItem label="Scholarships" icon={GraduationCap} section={scholarships} onNavigate={closeNavigation} />
            <NavigationItem label="Applications" icon={ClipboardList} onNavigate={closeNavigation} />
            <NavigationItem label="Mentorship" icon={BookOpen} onNavigate={closeNavigation} />
            <NavigationItem label="Orders & Payments" icon={CreditCard} onNavigate={closeNavigation} />
            <NavigationItem label="Refer & Earn" icon={CircleDollarSign} onNavigate={closeNavigation} />
            <NavigationGroup label="People" icon={Users} initiallyOpen>
              <NavigationItem label="Learners" onNavigate={closeNavigation} />
              <NavigationItem label="Facilitators" onNavigate={closeNavigation} />
            </NavigationGroup>
            <NavigationItem label="Settings" icon={Settings} onNavigate={closeNavigation} />
          </ul>
        </nav>
        <div className={styles.sidebarProfile}>
          <Avatar size={35} />
          <div><p>Blessing O.</p><small>Super Admin</small></div>
        </div>
      </aside>

      <header className={styles.topbar}>
        <button type="button" className={`${styles.iconButton} ${styles.mobileNav}`}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-controls="admin-navigation"
          aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
        <SearchPages onNavigate={closeNavigation} />
        <div className={styles.topActions}>
          <span className={styles.previewText}>Preview</span>
          <div className={styles.popover} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPopover(null);
          }}>
            <button type="button" className={styles.iconButton} aria-label="Notifications"
              aria-expanded={popover === "notifications"} onClick={() => setPopover(popover === "notifications" ? null : "notifications")}>
              <Bell size={20} aria-hidden /><span className={styles.notificationDot} aria-hidden />
            </button>
            {popover === "notifications" && <div className={styles.popoverPanel}>
              <Link href="/admin/dashboard#needs-attention" onClick={closeNavigation}>Needs Attention</Link>
            </div>}
          </div>
          <div className={styles.popover} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPopover(null);
          }}>
            <button type="button" className={styles.profileButton} aria-label="Blessing O. account menu"
              aria-expanded={popover === "profile"} onClick={() => setPopover(popover === "profile" ? null : "profile")}>
              <Avatar size={36} /><div><p>Blessing O.</p><small>Super Admin</small></div><ChevronDown size={14} aria-hidden />
            </button>
            {popover === "profile" && <div className={styles.popoverPanel}>
              <Link href="/admin/sign-in" onClick={closeNavigation}>Exit admin preview</Link>
            </div>}
          </div>
        </div>
      </header>

      <main className={styles.main} id="admin-content" tabIndex={-1}>{children}</main>
    </div>
  );
}
