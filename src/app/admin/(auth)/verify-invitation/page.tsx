import { AdminAccount } from "@/components/admin/AdminAccount";

export const metadata = { title: "Verify administrator invitation" };

export default function VerifyInvitationPage() {
  return <AdminAccount screen="verify-invitation" />;
}
