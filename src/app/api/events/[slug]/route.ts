import { proxyEvent } from "@/lib/eventApi.server";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return proxyEvent(`/event/${encodeURIComponent(slug)}`);
}
