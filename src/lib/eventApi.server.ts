// Server-only helper for the event ticketing API. Do not import from client
// components: it reads the optional EVENT_API_KEY, which must never reach the browser.

import { API_BASE_URL } from "./application";
import { unwrapEnvelope, type EventDetails } from "./event";

export function eventApiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  // Optional: sent as x-api-key only when configured.
  const apiKey = process.env.EVENT_API_KEY;
  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(apiKey ? { "x-api-key": apiKey } : {}),
      ...init.headers,
    },
  });
}

/**
 * Calls the upstream API and relays its response. If the upstream is unreachable or slow, answers
 * 502/504 with an empty envelope instead of letting the route crash; the client maps those to friendly copy.
 */
export async function proxyEvent(path: string, init: RequestInit = {}): Promise<Response> {
  try {
    return await relay(await eventApiFetch(path, { ...init, cache: "no-store", signal: AbortSignal.timeout(15_000) }));
  } catch (err) {
    const timedOut = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
    console.error(`Event API ${init.method ?? "GET"} ${path} failed: ${err instanceof Error ? err.message : String(err)}`);
    return new Response(JSON.stringify({ statusCode: "99", message: "", data: null }), {
      status: timedOut ? 504 : 502,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
}

/** Forwards an upstream response to the browser as-is (status + JSON body). */
export async function relay(res: Response): Promise<Response> {
  const text = await res.text();
  return new Response(text || "{}", {
    status: res.status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/** For server components: the event, or null if the API is unreachable. */
export async function fetchEvent(slug: string): Promise<EventDetails | null> {
  try {
    const res = await eventApiFetch(`/event/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    return await unwrapEnvelope<EventDetails>(res, "Could not load the event");
  } catch (err) {
    // Expected while the event isn't published yet or the API is down — the page
    // renders its "unavailable" state, so a one-line warning is enough.
    console.warn(`Event "${slug}" unavailable: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}
