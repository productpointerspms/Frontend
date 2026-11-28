import { AdminAccount } from "@/components/admin/AdminAccount";

export const metadata = { title: "Accept administrator invitation" };

export default function InvitationPage() {
  return <AdminAccount screen="invitation" />;
}
