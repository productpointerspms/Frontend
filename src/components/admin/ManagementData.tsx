import type { PaymentReview, PaymentStatus } from "./AdminData";

export type ApplicationStatus = "New" | "Under Review" | "Shortlisted" | "Accepted" | "Rejected";
export type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "Program" | "Scholarship";
  opportunity: string;
  submitted: string;
  status: ApplicationStatus;
  reviewer: string;
  reviewerId: string | null;
  responses: { question: string; answer: string }[];
  statement: string;
  notes: string;
};

export type Course = {
  id: string;
  name: string;
  category: string;
  level: string;
  price: number | string;
  purchases: number;
  published: boolean;
  description: string;
  classroom: string;
  thumbnail?: string;
  delivery: string;
  requirements: string;
  outcomes: string;
  modules: { id?: string; title: string; duration: string }[];
};

export type Order = {
  id: string;
  customer: string;
  product: string;
  reference: string;
  currency: string;
  type: "Course" | "Program" | "Event" | "Other";
  amount: string;
  discount: string;
  status: "Successful" | "Pending" | "Failed" | "Refunded" | "Unknown";
  date: string;
};

export type Learner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  cohort: string | null;
  providerPayment: PaymentStatus;
  paymentReview: PaymentReview | null;
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
  lastActive: string | null;
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
  amount: string;
  currency: string;
  status: "Confirmed" | "Pending Payment" | "Completed" | "Cancelled" | "Refunded";
};
