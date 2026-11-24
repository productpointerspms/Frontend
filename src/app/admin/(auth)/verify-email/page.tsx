import { AdminAccount } from "@/components/admin/AdminAccount";

export const metadata = { title: "Verify email address" };

export default function VerifyEmailPage() {
  return <AdminAccount screen="verify-email" />;
}
