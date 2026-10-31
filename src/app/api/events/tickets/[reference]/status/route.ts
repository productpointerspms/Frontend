import { eventApiFetch, relay } from "@/lib/eventApi.server";

export async function GET(_req: Request, { params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  return relay(
    await eventApiFetch(`/event/tickets/${encodeURIComponent(reference)}/status`, {
      cache: "no-store",
    })
  );
}
