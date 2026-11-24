"use client";

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

export type LmsStatus = "Synced" | "Sync pending" | "Not synced";
export type PaymentStatus = "Pending" | "Paid" | "Failed";
export type CohortStatus = "Active" | "Upcoming" | "Completed";
export type ScholarshipStatus = "Open" | "Closed" | "Draft";
export type FieldType = "Text" | "Long text" | "Dropdown" | "Email" | "Phone";

export type Program = {
  id: string;
  name: string;
  category: string;
  level: string;
  cohort: string;
  capacity: number;
  currency: string;
  price: number;
  applicants: number;
  enrolled: number;
  pendingPayments: number;
  pendingPaymentTotal: number;
  paymentStatus: PaymentStatus;
  lms: LmsStatus;
  draft?: boolean;
};

export type Cohort = {
  id: string;
  name: string;
  program: string;
  start: string;
  end: string;
  status: CohortStatus;
  learners: number;
  facilitator: string;
  lms: LmsStatus;
};

export type FormField = { id: string; label: string; type: FieldType; required: boolean };

export type Scholarship = {
  id: string;
  name: string;
  program: string;
  description: string;
  eligibility: string[];
  tuition: number;
  amount: number;
  deadline: string;
  slots: number;
  status: ScholarshipStatus;
  visibility: "Public" | "Hidden";
  fields: FormField[];
};

const programSamples: Program[] = [
  {
    id: "program-accelerator", name: "ProductPointers Accelerator Program", category: "Product Management",
    level: "Beginner", cohort: "Cohort 5", capacity: 40, currency: "NGN", price: 350000,
    applicants: 34, enrolled: 20, pendingPayments: 4, pendingPaymentTotal: 150000, paymentStatus: "Pending", lms: "Synced",
  },
  {
    id: "program-ppfp", name: "ProductPointers Fellowship Program", category: "Product Management",
    level: "Intermediate", cohort: "Cohort 4", capacity: 40, currency: "NGN", price: 175000,
    applicants: 17, enrolled: 20, pendingPayments: 4, pendingPaymentTotal: 150000, paymentStatus: "Pending", lms: "Synced",
  },
  {
    id: "program-ppip", name: "ProductPointers Internship Program", category: "Product Management",
    level: "Intermediate", cohort: "Cohort 5", capacity: 40, currency: "NGN", price: 265000,
    applicants: 34, enrolled: 4, pendingPayments: 4, pendingPaymentTotal: 150000, paymentStatus: "Pending", lms: "Not synced",
  },
];

const cohortSamples: Cohort[] = [
  { id: "ppap-5", name: "Cohort 5", program: "PPAP", start: "2026-01-13", end: "2026-04-30", status: "Active", learners: 42, facilitator: "Tomi A.", lms: "Synced" },
  { id: "ppip-5", name: "Cohort 5", program: "PPIP", start: "2026-02-15", end: "2026-05-28", status: "Upcoming", learners: 42, facilitator: "Kunle O.", lms: "Synced" },
  { id: "ppmp-2", name: "Cohort 2", program: "PPMP", start: "2026-11-10", end: "2027-02-20", status: "Completed", learners: 42, facilitator: "Blessing E.", lms: "Synced" },
  { id: "ppcp-1", name: "Cohort 1", program: "PPCP", start: "2026-03-05", end: "2026-03-30", status: "Active", learners: 42, facilitator: "Tomi A.", lms: "Synced" },
  { id: "ppfp-5", name: "Cohort 5", program: "PPFP", start: "2026-04-12", end: "2026-08-30", status: "Upcoming", learners: 42, facilitator: "Unassigned", lms: "Sync pending" },
];

export const scholarshipFormSamples: FormField[] = [
  { id: "name", label: "Full Name", type: "Text", required: true },
  { id: "email", label: "Email", type: "Text", required: true },
  { id: "education", label: "Education level", type: "Dropdown", required: true },
  { id: "motivation", label: "Why are you applying?", type: "Long text", required: true },
  { id: "linkedin", label: "LinkedIn URL", type: "Text", required: false },
];

const scholarshipSamples: Scholarship[] = [
  { id: "onome", name: "ONOME Scholarship", program: "PPAP", tuition: 285000, amount: 210000, deadline: "2026-10-10", status: "Open" },
  { id: "adesuwa", name: "ADESUWA Scholarship", program: "PPAP", tuition: 285000, amount: 160000, deadline: "2026-09-10", status: "Open" },
  { id: "didi", name: "DIDI Scholarship", program: "PPAP", tuition: 285000, amount: 220000, deadline: "2026-09-20", status: "Closed" },
  { id: "ppmp", name: "PPMP Scholarship", program: "PPMP", tuition: 285000, amount: 250000, deadline: "2027-01-15", status: "Open" },
  { id: "ppfp", name: "PPFP Scholarship", program: "PPFP", tuition: 175000, amount: 140000, deadline: "2026-10-12", status: "Open" },
  { id: "chisom", name: "CHISOM Scholarship", program: "PPFP", tuition: 300000, amount: 150000, deadline: "2026-10-15", status: "Open" },
].map((record) => ({
  ...record,
  status: record.status as ScholarshipStatus,
  slots: 10,
  description: "",
  eligibility: [],
  visibility: "Public",
  fields: scholarshipFormSamples,
}));

export const programOptions = ["PPAP", "PPCP", "PPFP", "PPIP", "PPMP", "PPTP"] as const;
export const fieldTypes: FieldType[] = ["Text", "Long text", "Dropdown", "Email", "Phone"];

export const lmsTones = { Synced: "green", "Sync pending": "orange", "Not synced": "muted" } as const;

type Store = {
  programs: Program[];
  setPrograms: Dispatch<SetStateAction<Program[]>>;
  cohorts: Cohort[];
  setCohorts: Dispatch<SetStateAction<Cohort[]>>;
  scholarships: Scholarship[];
  setScholarships: Dispatch<SetStateAction<Scholarship[]>>;
  applicationFields: FormField[];
  setApplicationFields: Dispatch<SetStateAction<FormField[]>>;
};

const AdminDataContext = createContext<Store | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  // These records exist only for this visit to the preview workspace.
  const [programs, setPrograms] = useState(programSamples);
  const [cohorts, setCohorts] = useState(cohortSamples);
  const [scholarships, setScholarships] = useState(scholarshipSamples);
  const [applicationFields, setApplicationFields] = useState(scholarshipFormSamples);
  return (
    <AdminDataContext.Provider value={{
      programs, setPrograms, cohorts, setCohorts,
      scholarships, setScholarships, applicationFields, setApplicationFields,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const store = useContext(AdminDataContext);
  if (!store) throw new Error("Admin pages require the preview workspace layout.");
  return store;
}
