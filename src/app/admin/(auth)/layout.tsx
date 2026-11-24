import type { ReactNode } from "react";
import { AccountPreview } from "@/components/admin/AdminAccount";

export default function AdminAccountLayout({ children }: { children: ReactNode }) {
  return <AccountPreview>{children}</AccountPreview>;
}
