export type PaymentStatus = "Pending" | "Paid" | "Failed";
export type CohortStatus = "Active" | "Upcoming" | "Completed";
export type ScholarshipStatus = "Open" | "Closed" | "Draft";
export type FieldType = "Text" | "Long text" | "Dropdown" | "Email" | "Phone";

export type Program = {
  id: string;
  name: string;
  category: string;
  level: string;
  cohort: string | null;
  cohortId: string | null;
  classroomCode: string | null;
  classroomUrl: string | null;
  capacity: number | null;
  currency: string;
  price: number;
  applicants: number;
  enrolled: number;
  pendingPayments: number;
  pendingPaymentTotal: number;
  paymentReview: PaymentReview | null;
  draft?: boolean;
};

export type Cohort = {
  id: string;
  name: string;
  program: string;
  programId: string;
  capacity: number | null;
  start: string | null;
  end: string | null;
  status: CohortStatus;
  learners: number;
  facilitators: string[];
  classroomUrl: string | null;
  classroomCode: string | null;
};

export type FormField = { id: string; label: string; type: FieldType; required: boolean };

export type Scholarship = {
  id: string;
  name: string;
  program: string;
  programId: string;
  description: string;
  eligibility: string;
  contribution: number;
  recipients: number;
  tuition: number;
  amount: number;
  deadline: string;
  slots: number;
  status: ScholarshipStatus;
  visibility: "Public" | "Hidden";
  fields: Omit<FormField, "id">[];
};

export type PaymentReview = { status: PaymentStatus; note: string; date: string; reviewerId: string };
export type CohortOption = Pick<Cohort, "id" | "program" | "name">;
export type ProgramOption = { id: string; name: string; price: number | null };
export const fieldTypes: FieldType[] = ["Text", "Long text", "Dropdown", "Email", "Phone"];

export type Overview = {
  days: number;
  currency: string;
  learners: number;
  applications: number;
  newApplications: number;
  pendingPayments: number;
  failedLms: number;
  scholarshipRecipients: number;
  coursePurchases: number;
  activeEnrollments: number;
  pendingEnrollments: number;
  certificatesIssued: number;
  revenue: number;
  daily: { day: string; revenue: number }[];
  revenueByProgram: { id: string; title: string; revenue: number }[];
  applicationsByType: { type: string; total: number }[];
  cohorts: { id: string; name: string; program: string; status: string; classroomLinked: boolean; enrolled: number }[];
  recent: { id: string; activity: string; date: string }[];
};
