import { Applications } from "@/components/admin/Applications";

export const metadata = { title: "Applications" };

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const filter = type === "Program" || type === "Scholarship" ? type : "All";
  return <Applications key={filter} initialFilter={filter} />;
}
