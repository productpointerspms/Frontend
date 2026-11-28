import { AdminAccount } from "@/components/admin/AdminAccount";

export const metadata = { title: "Set up your administrator account" };

export default function SetupPage() {
  return <AdminAccount screen="setup" />;
}
