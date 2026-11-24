import { AdminAccount } from "@/components/admin/AdminAccount";

export const metadata = { title: "Account activated" };

export default function ActivatedPage() {
  return <AdminAccount screen="activated" />;
}
