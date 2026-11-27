"use client";

import { createContext, useContext, useEffect, useId, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3, BookOpen, ChevronDown, CircleDollarSign, ClipboardList,
  CreditCard, GraduationCap, LayoutGrid, Link2, Menu, Search, Settings, Users,
  X, type LucideIcon,
} from "lucide-react";
import { adminRequest, useAdminAction, useAdminResource } from "./admin-api";
import type { AdminProfile } from "./AdminAccount";
import { ResourceState } from "./AdminUI";
import styles from "./admin.module.css";

const sections = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Programs", path: "/admin/programs" },
  { name: "Cohorts", path: "/admin/cohorts" },
  { name: "Scholarships", path: "/admin/scholarships" },
  { name: "Applications", path: "/admin/applications" },
  { name: "Courses", path: "/admin/courses" },
  { name: "Orders & Payments", path: "/admin/orders-payments" },
  { name: "Learners", path: "/admin/learners" },
  { name: "Facilitators", path: "/admin/facilitators" },
  { name: "Analytics", path: "/admin/analytics" },
  { name: "Settings", path: "/admin/settings" },
  { name: "Mentorship", path: "/admin/mentorship" },
  { name: "Apprenticeship", path: "/admin/apprenticeship" },
  { name: "AI Interview", path: "/admin/ai-interview" },
  { name: "Refer & Earn", path: "/admin/refer-and-earn" },
];

type Section = typeof sections[number];
const [
  dashboard, programs, cohorts, scholarships, applications, courses, orders,
  learners, facilitators, analytics, settings, mentorship, apprenticeship, interview, referral,
] = sections;

function Avatar({ name }: { name: string }) {
  return <span className={styles.avatar} aria-hidden>{name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()}</span>;
}

function canVisit(section: Section, profile: AdminProfile) {
  // The sample areas have no backend grants yet. Keep them behind an existing Super Admin session.
  if (section === apprenticeship || section === interview || section === referral) {
    return profile.role === "Super Admin" || profile.sections.includes(section.name);
  }
  const aliases: Record<string, string[]> = {
    Dashboard: ["Analytics"],
    Applications: ["Applications", "Scholarship Applications"],
    "Orders & Payments": ["Orders & Payments", "Transactions"],
  };
  return (aliases[section.name] ?? [section.name]).some((name) => profile.sections.includes(name));
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

function SearchPages({ onNavigate, pages }: { pages: Section[]; onNavigate: () => void }) {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const query = search.trim().toLowerCase();
  const results = query ? pages.filter(({ name }) => name.toLowerCase().includes(query)) : [];
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
  const router = useRouter();
  const pathname = usePathname();
  const profile = useAdminResource<AdminProfile>("auth/me");
  const account = profile.data;
  const pages = account ? sections.filter((section) => canVisit(section, account)) : [];
  useEffect(() => {
    if (profile.status === 401) router.replace("/admin/sign-in");
  }, [profile.status, router]);
  useEffect(() => {
    if (account && pathname === dashboard.path && !canVisit(dashboard, account)) {
      const first = sections.find((section) => canVisit(section, account));
      if (first) router.replace(first.path);
    }
  }, [account, pathname, router]);
  if (!account) return <div className={styles.accountPage}>
    <ResourceState {...profile}>{null}</ResourceState>
  </div>;
  return <Workspace account={account} pages={pages} allowed={pages.some((page) => page.path === pathname)}>{children}</Workspace>;
}

const WorkspaceProfile = createContext<AdminProfile | null>(null);

export function useWorkspaceProfile() {
  const profile = useContext(WorkspaceProfile);
  if (!profile) throw new Error("Administrator screens require a signed-in workspace.");
  return profile;
}

function Workspace({ account, pages, allowed, children }: { account: AdminProfile; pages: Section[]; allowed: boolean; children: ReactNode }) {
  const router = useRouter();
  const logout = useAdminAction();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popover, setPopover] = useState<"profile" | null>(null);

  function closeNavigation() {
    setMobileOpen(false);
    setPopover(null);
  }

  return (
    <WorkspaceProfile.Provider value={account}><div className={styles.workspace} onKeyDown={(event) => {
      if (event.key === "Escape") closeNavigation();
    }}>
      <a className={styles.skipLink} href="#admin-content">Skip to content</a>
      <aside className={styles.sidebar} data-open={mobileOpen} id="admin-navigation">
        <Link className={styles.brand} href={pages[0]?.path ?? "/admin/sign-in"} onClick={closeNavigation}>
          <Image src="/pp_logo.png" width={200} height={39} alt="ProductPointers" />
        </Link>
        <nav aria-label="Admin navigation">
          <ul className={styles.navList}>
            {pages.includes(dashboard) && <NavigationItem label="Dashboard" icon={LayoutGrid} section={dashboard} onNavigate={closeNavigation} />}
            {[programs, cohorts, courses].some((page) => pages.includes(page)) && <NavigationGroup label="Learning" icon={GraduationCap} initiallyOpen>
              {pages.includes(programs) && <NavigationItem label="Programs" section={programs} onNavigate={closeNavigation} />}
              {pages.includes(cohorts) && <NavigationItem label="Cohorts" section={cohorts} onNavigate={closeNavigation} />}
              {pages.includes(courses) && <NavigationItem label="Courses" section={courses} onNavigate={closeNavigation} />}
            </NavigationGroup>}
            {[apprenticeship, interview].some((page) => pages.includes(page)) && <NavigationGroup label="Apprenticeship" icon={Link2} initiallyOpen>
              {pages.includes(apprenticeship) && <NavigationItem label="Apprenticeship" section={apprenticeship} onNavigate={closeNavigation} />}
              {pages.includes(interview) && <NavigationItem label="AI Interview" section={interview} onNavigate={closeNavigation} />}
            </NavigationGroup>}
            {pages.includes(analytics) && <NavigationItem label="Analytics" icon={BarChart3} section={analytics} onNavigate={closeNavigation} />}
            {pages.includes(scholarships) && <NavigationItem label="Scholarships" icon={GraduationCap} section={scholarships} onNavigate={closeNavigation} />}
            {pages.includes(applications) && <NavigationItem label="Applications" icon={ClipboardList} section={applications} onNavigate={closeNavigation} />}
            {pages.includes(mentorship) && <NavigationItem label="Mentorship" icon={BookOpen} section={mentorship} onNavigate={closeNavigation} />}
            {pages.includes(orders) && <NavigationItem label="Orders & Payments" icon={CreditCard} section={orders} onNavigate={closeNavigation} />}
            {pages.includes(referral) && <NavigationItem label="Refer & Earn" icon={CircleDollarSign} section={referral} onNavigate={closeNavigation} />}
            {[learners, facilitators].some((page) => pages.includes(page)) && <NavigationGroup label="People" icon={Users} initiallyOpen>
              {pages.includes(learners) && <NavigationItem label="Learners" section={learners} onNavigate={closeNavigation} />}
              {pages.includes(facilitators) && <NavigationItem label="Facilitators" section={facilitators} onNavigate={closeNavigation} />}
            </NavigationGroup>}
            {pages.includes(settings) && <NavigationItem label="Settings" icon={Settings} section={settings} onNavigate={closeNavigation} />}
          </ul>
        </nav>
        <div className={styles.sidebarProfile}>
          <Avatar name={account.name} />
          <div><p>{account.name}</p><small>{account.role}</small></div>
        </div>
      </aside>

      <header className={styles.topbar}>
        <button type="button" className={`${styles.iconButton} ${styles.mobileNav}`}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-controls="admin-navigation"
          aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
        <SearchPages onNavigate={closeNavigation} pages={pages} />
        <div className={styles.topActions}>
          <div className={styles.popover} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPopover(null);
          }}>
            <button type="button" className={styles.profileButton} aria-label={(account.name || "Administrator") + " account menu"}
              aria-expanded={popover === "profile"} onClick={() => setPopover(popover === "profile" ? null : "profile")}>
              <Avatar name={account.name} /><div><p>{account.name}</p><small>{account.role}</small></div><ChevronDown size={14} aria-hidden />
            </button>
            {popover === "profile" && <div className={styles.popoverPanel}>
              <button type="button" className={styles.link} disabled={logout.pending} onClick={() => void logout.run(async () => {
                await adminRequest("auth/logout", "POST", {});
                router.replace("/admin/sign-in");
              })}>Sign out</button>
              {logout.error && <p role="alert">{logout.error}</p>}
            </div>}
          </div>
        </div>
      </header>

      <main className={styles.main} id="admin-content" tabIndex={-1}>{allowed ? children : <p role="status">You don’t have access to this section.</p>}</main>
    </div></WorkspaceProfile.Provider>
  );
}
