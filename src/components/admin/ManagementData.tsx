"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type ApplicationStatus = "New" | "Under Review" | "Shortlisted" | "Accepted" | "Rejected";
export type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "Program" | "Scholarship" | "Coaching";
  opportunity: string;
  submitted: string;
  status: ApplicationStatus;
  reviewer: string;
  statement: string;
  notes: string;
};

export type Course = {
  id: string;
  name: string;
  category: string;
  level: string;
  price: number;
  purchases: number;
  published: boolean;
  description: string;
  classroom: string;
  thumbnail?: string;
  delivery: string;
  requirements: string;
  outcomes: string;
  modules: { id: string; title: string; duration: string }[];
};

export type Order = {
  id: string;
  customer: string;
  product: string;
  type: "Course" | "Program";
  amount: number;
  discount: number;
  status: "Successful" | "Pending" | "Failed" | "Refunded";
  date: string;
};

export type Learner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  cohort: string;
  payment: "Paid" | "Pending" | "Failed";
  enrollment: "Active" | "Pending";
  lms: "Active" | "Not synced" | "Failed";
  certificate: "Issued" | "Not yet issued";
};

export type Facilitator = {
  id: string;
  name: string;
  email: string;
  role: "Lead Facilitator" | "Facilitator" | "Guest Facilitator";
  cohorts: string[];
  active: boolean;
};

export const adminRoles = ["Program Admin", "Finance Admin", "Scholarship Admin"] as const;
export type AdminRole = "Super Admin" | typeof adminRoles[number];

export type Administrator = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "Active" | "Invited" | "Inactive";
  lastActive: string;
};

export type MentorApplication = {
  id: string;
  name: string;
  email: string;
  expertise: string;
  experience: number;
  date: string;
  status: "Pending" | "Under Review" | "Approved" | "More Information Required" | "Rejected";
  bio: string;
  decisionNote?: string;
};

export type Mentor = {
  id: string;
  name: string;
  email: string;
  title: string;
  expertise: string;
  experience: number;
  sessions: number;
  rating: string;
  status: "Active" | "Suspended";
  bio: string;
};

export type Booking = {
  id: string;
  mentor: string;
  mentee: string;
  session: string;
  booked: string;
  sessionDate: string;
  amount: number;
  status: "Confirmed" | "Pending Payment" | "Completed" | "Cancelled" | "Refunded";
};

const applications: Application[] = [
  { id: "app-amara", name: "Amara Okafor", email: "amara@example.com", phone: "+234 800 000 0021", type: "Scholarship", opportunity: "Women in Product Scholarship", submitted: "2026-09-24", status: "New", reviewer: "Tomi A.", statement: "I want to build accessible products that solve real problems for my community.", notes: "" },
  { id: "app-john", name: "John Doe", email: "john@example.com", phone: "+234 800 000 0022", type: "Program", opportunity: "PPAP", submitted: "2026-09-24", status: "Under Review", reviewer: "Tomi A.", statement: "I’m transitioning into product management and want practical experience working with a team.", notes: "" },
  { id: "app-david", name: "David M.", email: "david@example.com", phone: "+234 800 000 0023", type: "Coaching", opportunity: "PPCP", submitted: "2026-09-22", status: "Shortlisted", reviewer: "Blessing E.", statement: "I’d like guidance on my portfolio and preparing for interviews.", notes: "" },
  { id: "app-mary", name: "Mary J.", email: "mary@example.com", phone: "+234 800 000 0024", type: "Program", opportunity: "PPIP", submitted: "2026-09-20", status: "Accepted", reviewer: "Kunle O.", statement: "I’m looking for an opportunity to work on a product from discovery to delivery.", notes: "" },
  { id: "app-sarah", name: "Sarah T.", email: "sarah@example.com", phone: "+234 800 000 0025", type: "Scholarship", opportunity: "Women in Product Scholarship", submitted: "2026-09-18", status: "Rejected", reviewer: "Tomi A.", statement: "I’m interested in learning the fundamentals of product management.", notes: "" },
];

const courses: Course[] = [
  { id: "course-pm", name: "Product Management Masterclass", category: "Product", level: "Intermediate", price: 45000, purchases: 48, published: true, description: "Practise core product management skills.", classroom: "", delivery: "Self-paced", requirements: "", outcomes: "", modules: [] },
  { id: "course-fintech", name: "Fintech PM Deep Dive", category: "Fintech", level: "Advanced", price: 80000, purchases: 48, published: true, description: "Explore product work in financial services.", classroom: "", delivery: "Self-paced", requirements: "", outcomes: "", modules: [] },
  { id: "course-portfolio", name: "PM Portfolio Bootcamp", category: "Career", level: "Beginner", price: 35000, purchases: 48, published: false, description: "Build a product management portfolio.", classroom: "", delivery: "Self-paced", requirements: "", outcomes: "", modules: [] },
];

export const orders: Order[] = [
  { id: "PP-0024", customer: "Sarah T.", product: "Product Management Masterclass", type: "Course", amount: 65000, discount: 20000, status: "Successful", date: "2026-09-24" },
  { id: "PP-0023", customer: "Blessing Okonkwo", product: "PPAP", type: "Program", amount: 250000, discount: 120000, status: "Pending", date: "2026-09-24" },
  { id: "PP-0022", customer: "Ibe C.", product: "PPIP", type: "Program", amount: 70000, discount: 5000, status: "Failed", date: "2026-09-24" },
  { id: "PP-0021", customer: "Nkem A.", product: "PPCP", type: "Program", amount: 65000, discount: 0, status: "Refunded", date: "2026-09-24" },
];

const learners: Learner[] = [
  { id: "learner-blessing", name: "Blessing Okonkwo", email: "blessing@example.com", phone: "", cohort: "ppap-5", payment: "Paid", enrollment: "Active", lms: "Active", certificate: "Not yet issued" },
  { id: "learner-ibe", name: "Ibe Chukwu", email: "ibe@example.com", phone: "", cohort: "ppfp-5", payment: "Pending", enrollment: "Pending", lms: "Not synced", certificate: "Not yet issued" },
  { id: "learner-mary", name: "Mary Johnson", email: "mary@example.com", phone: "", cohort: "ppip-5", payment: "Paid", enrollment: "Active", lms: "Active", certificate: "Issued" },
  { id: "learner-david", name: "David King", email: "david@example.com", phone: "", cohort: "ppap-5", payment: "Paid", enrollment: "Active", lms: "Failed", certificate: "Issued" },
];

const facilitators: Facilitator[] = [
  { id: "tomia", name: "Tomi A.", email: "tomi@example.com", role: "Lead Facilitator", cohorts: ["ppap-5", "ppfp-5"], active: true },
  { id: "kunleo", name: "Kunle O.", email: "kunle@example.com", role: "Facilitator", cohorts: ["ppip-5"], active: true },
  { id: "blessinge", name: "Blessing E.", email: "blessing.e@example.com", role: "Lead Facilitator", cohorts: ["ppmp-2"], active: true },
  { id: "amakan", name: "Amaka N.", email: "amaka@example.com", role: "Guest Facilitator", cohorts: ["ppcp-1"], active: false },
];

const administrators: Administrator[] = [
  { id: "admin-blessing", name: "Blessing Okafor", email: "blessing.o@example.com", role: "Super Admin", status: "Active", lastActive: "Online now" },
  { id: "admin-daniel", name: "Daniel Adebayo", email: "daniel@example.com", role: "Program Admin", status: "Active", lastActive: "Today, 10:42 AM" },
  { id: "admin-amina", name: "Amina Yusuf", email: "amina@example.com", role: "Finance Admin", status: "Active", lastActive: "Today, 9:15 AM" },
  { id: "admin-chinwe", name: "Chinwe Eze", email: "chinwe@example.com", role: "Scholarship Admin", status: "Active", lastActive: "Yesterday" },
];

const mentorApplications: MentorApplication[] = [
  { id: "mentor-app-ade", name: "Adeaze Okafor", email: "adeaze@example.com", expertise: "Product strategy", experience: 8, date: "2026-06-12", status: "Pending", bio: "Senior product leader helping teams make good decisions about product strategy and discovery." },
  { id: "mentor-app-david", name: "David Adebayo", email: "david.a@example.com", expertise: "Product analytics", experience: 6, date: "2026-06-11", status: "Under Review", bio: "I coach product managers on making sense of user behaviour and measuring results." },
  { id: "mentor-app-priya", name: "Priya Sharma", email: "priya@example.com", expertise: "UX research", experience: 5, date: "2026-06-10", status: "Approved", bio: "I help teams plan research, interpret data and incorporate findings into product decisions." },
  { id: "mentor-app-tunde", name: "Tunde Ajayi", email: "tunde@example.com", expertise: "Product growth", experience: 9, date: "2026-06-08", status: "More Information Required", bio: "Growth product lead with experience coaching teams on experiments and measurement." },
  { id: "mentor-app-chidi", name: "Chidi Okonkwo", email: "chidi@example.com", expertise: "Product leadership", experience: 12, date: "2026-06-07", status: "Rejected", bio: "Product director working across cross-functional product teams." },
  { id: "mentor-app-nana", name: "Nana Mensah", email: "nana@example.com", expertise: "Product discovery", experience: 7, date: "2026-06-06", status: "Pending", bio: "I help product managers run discovery and turn customer needs into better solutions." },
];

const mentors: Mentor[] = [
  { id: "mentor-amara", name: "Amara Nwosu", email: "amara.n@example.com", title: "Group Product Manager", expertise: "Product leadership", experience: 10, sessions: 32, rating: "4.9 (24)", status: "Active", bio: "Product leader helping teams turn customer insights into practical product strategies." },
  { id: "mentor-tunde", name: "Tunde Ajayi", email: "tunde@example.com", title: "Growth Product Lead", expertise: "Product growth", experience: 7, sessions: 12, rating: "4.7 (10)", status: "Suspended", bio: "I mentor product managers on running experiments and developing a growth strategy." },
  { id: "mentor-david", name: "David Adebayo", email: "david.a@example.com", title: "Senior Product Analyst", expertise: "Product analytics", experience: 9, sessions: 18, rating: "4.8 (16)", status: "Active", bio: "I coach teams on making good use of their product data." },
  { id: "mentor-priya", name: "Priya Sharma", email: "priya@example.com", title: "Lead UX Researcher", expertise: "UX research", experience: 6, sessions: 24, rating: "4.9 (21)", status: "Active", bio: "I help teams incorporate research into product planning." },
];

export const bookings: Booking[] = [
  { id: "PP-MB-038", mentor: "Amara Nwosu", mentee: "Dami Bello", session: "Career clarity", booked: "2026-06-12", sessionDate: "2026-06-19", amount: 75, status: "Confirmed" },
  { id: "PP-MB-037", mentor: "David Adebayo", mentee: "Sarah Cole", session: "Portfolio review", booked: "2026-06-11", sessionDate: "2026-06-18", amount: 60, status: "Pending Payment" },
  { id: "PP-MB-036", mentor: "Priya Sharma", mentee: "Emeka Obi", session: "Career clarity", booked: "2026-06-10", sessionDate: "2026-06-15", amount: 75, status: "Confirmed" },
  { id: "PP-MB-035", mentor: "Chidi Okonkwo", mentee: "Fola James", session: "Product strategy", booked: "2026-06-08", sessionDate: "2026-06-10", amount: 120, status: "Completed" },
  { id: "PP-MB-034", mentor: "Tunde Ajayi", mentee: "Kemi Morgan", session: "Growth advisory", booked: "2026-06-08", sessionDate: "2026-06-09", amount: 80, status: "Cancelled" },
  { id: "PP-MB-033", mentor: "Nana Mensah", mentee: "Zainab Ali", session: "Portfolio review", booked: "2026-06-06", sessionDate: "2026-06-07", amount: 60, status: "Refunded" },
];

export const accessSections = [
  "Programs", "Cohorts", "Scholarships", "Scholarship Applications", "Applications", "Courses",
  "Orders & Payments", "Transactions", "Learners", "Facilitators", "Analytics", "Settings",
] as const;

const access: Record<typeof adminRoles[number], string[]> = {
  "Program Admin": ["Programs", "Cohorts", "Applications", "Courses", "Learners", "Facilitators"],
  "Finance Admin": ["Orders & Payments", "Transactions"],
  "Scholarship Admin": ["Scholarships", "Scholarship Applications"],
};

const samples = { applications, courses, learners, facilitators, administrators, mentorApplications, mentors, access };
type Data = typeof samples;
type Store = {
  records: Data;
  update: <Key extends keyof Data>(key: Key, transform: (value: Data[Key]) => Data[Key]) => void;
};

const ManagementContext = createContext<Store | null>(null);

export function ManagementProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState(samples);

  function update<Key extends keyof Data>(key: Key, transform: (value: Data[Key]) => Data[Key]) {
    setRecords((current) => ({ ...current, [key]: transform(current[key]) }));
  }

  return <ManagementContext.Provider value={{ records, update }}>{children}</ManagementContext.Provider>;
}

export function useManagement() {
  const store = useContext(ManagementContext);
  if (!store) throw new Error("Management screens require the admin preview layout.");
  return store;
}

export function saveRecord<T extends { id: string }>(records: T[], record: T) {
  return records.some(({ id }) => id === record.id)
    ? records.map((item) => item.id === record.id ? record : item)
    : [...records, record];
}
