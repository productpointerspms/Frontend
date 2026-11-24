import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { AdminDataProvider } from "@/components/admin/AdminData";

export default function AdminWorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <AdminDataProvider>
      <AdminShell>{children}</AdminShell>
    </AdminDataProvider>
  );
}
