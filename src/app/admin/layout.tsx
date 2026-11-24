import type { Metadata } from "next";
import type { ReactNode } from "react";
import { inter } from "@/lib/fonts";
import styles from "@/components/admin/admin.module.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | ProductPointers Admin" },
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className={`${inter.className} ${styles.admin}`}>{children}</div>;
}
