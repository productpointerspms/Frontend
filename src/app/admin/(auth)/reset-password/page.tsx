import { AdminAccount } from "@/components/admin/AdminAccount";

export const metadata = { title: "Create a new password" };

export default function ResetPasswordPage() {
  return <AdminAccount screen="reset-password" />;
}
