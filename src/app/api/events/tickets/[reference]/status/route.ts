import { proxyEvent } from "@/lib/eventApi.server";

export async function GET(_req: Request, { params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  return proxyEvent(`/event/tickets/${encodeURIComponent(reference)}/status`);
}
