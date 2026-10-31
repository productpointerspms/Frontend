import { eventApiFetch, relay } from "@/lib/eventApi.server";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return relay(await eventApiFetch(`/event/${encodeURIComponent(slug)}`, { cache: "no-store" }));
}
