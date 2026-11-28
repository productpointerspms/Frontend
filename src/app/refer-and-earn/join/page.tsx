import { ReferralJoin } from "@/components/previews/ReferralJoin";
import { inter } from "@/lib/fonts";
import styles from "@/components/admin/admin.module.css";

export const metadata = { title: "Join our referral program", robots: { index: false, follow: false } };

export default function ReferralJoinPage() {
  return <div className={`${inter.className} ${styles.admin}`}><ReferralJoin /></div>;
}
