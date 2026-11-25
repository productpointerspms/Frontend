import { NextRequest, NextResponse } from "next/server";

const cookieName = "pp_admin_session";

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const route = path.join("/");
  const base = process.env.ADMIN_API_BASE_URL;
  if (!base) return NextResponse.json({ message: "The administrator API is not configured." }, { status: 503 });
  if (path.some((segment) => !/^[a-zA-Z0-9-]+$/.test(segment))) {
    return NextResponse.json({ message: "Invalid API route." }, { status: 404 });
  }
  // Next normalizes loopback addresses in nextUrl. Host preserves the origin the browser actually contacted.
  const origin = request.nextUrl.protocol + "//" + request.headers.get("host");
  if (request.method !== "GET" && request.headers.get("origin") !== origin) {
    return NextResponse.json({ message: "This action requires a same-origin request." }, { status: 403 });
  }

  const token = request.cookies.get(cookieName)?.value;
  const verification = route === "auth/verify-authenticator";
  try {
    const body = request.method === "GET" ? undefined : await request.text();
    const upstream = await fetch(
      new URL("/admin/" + route + request.nextUrl.search, base),
      {
        method: request.method, body, cache: "no-store", redirect: "error",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
      },
    );
    const expiredLogout = route === "auth/logout" && upstream.status === 401;
    const result = expiredLogout ? { statusCode: "00", message: "Signed out", data: null } : await upstream.json();
    const session = verification && upstream.ok ? result.data?.token : undefined;
    if (session) result.data = null;
    const response = NextResponse.json(result, {
      status: expiredLogout ? 200 : upstream.status, headers: { "Cache-Control": "no-store" },
    });
    const secure = request.nextUrl.protocol === "https:";
    if (session) {
      const remember = body && JSON.parse(body).remember === true;
      response.cookies.set(cookieName, session, {
        httpOnly: true, sameSite: "lax", secure, path: "/api/admin",
        ...(remember ? { maxAge: 7 * 86400 } : {}),
      });
    } else if ((route === "auth/logout" && (upstream.ok || expiredLogout)) || (upstream.status === 401 && route === "auth/me")) {
      response.cookies.set(cookieName, "", { maxAge: 0, path: "/api/admin", httpOnly: true, sameSite: "lax", secure });
    }
    return response;
  } catch {
    return NextResponse.json({ message: "Could not reach the administrator API. Try again." }, { status: 502 });
  }
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH };
