import { eventApiFetch, relay } from "@/lib/eventApi.server";

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return relay(
    await eventApiFetch(`/event/${encodeURIComponent(slug)}/checkout`, {
      method: "POST",
      body: await req.text(),
      cache: "no-store",
    })
  );
}
