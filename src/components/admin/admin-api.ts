"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export class AdminApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export async function adminRequest<T = unknown>(path: string, method = "GET", body?: unknown, signal?: AbortSignal): Promise<T> {
  const response = await fetch("/api/admin/" + path, {
    method, signal, cache: "no-store",
    ...(body === undefined ? {} : {
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    }),
  });
  const result = await response.json();
  if (!response.ok || result.statusCode !== "00") {
    const fields = Array.isArray(result.data) ? result.data.flatMap(
      (field: { constraints?: Record<string, string> }) => Object.values(field.constraints ?? {}),
    ) : [];
    throw new AdminApiError(fields.join(" ") || result.message || "The request failed.", response.status);
  }
  return result.data as T;
}

export function useAdminResource<T>(path: string | null, keepOnRefreshError = false) {
  const [request, setRequest] = useState({ path: "", data: undefined as T | undefined, error: "", status: 0, version: -1 });
  const [version, setVersion] = useState(0);
  const reload = useCallback(() => setVersion((current) => current + 1), []);
  useEffect(() => {
    if (path === null) return;
    const controller = new AbortController();
    adminRequest<T>(path, "GET", undefined, controller.signal).then((data) => {
      if (!controller.signal.aborted) setRequest({ path, data, error: "", status: 200, version });
    }).catch((error) => {
      if (!controller.signal.aborted) {
        const status = error instanceof AdminApiError ? error.status : 0;
        setRequest(previous => ({ path, version, status, error: error.message,
          data: keepOnRefreshError && previous.path === path && (status === 0 || status >= 500) ? previous.data : undefined,
        }));
        if (error instanceof AdminApiError && error.status === 401 && path !== "auth/me") {
          window.location.assign("/admin/sign-in");
        }
      }
    });
    return () => controller.abort();
  }, [path, version, keepOnRefreshError]);

  return {
    data: request.path === path ? request.data : undefined,
    error: request.path === path ? request.error : "",
    status: request.path === path ? request.status : 0,
    refreshing: request.version !== version,
    loading: path !== null && request.path !== path,
    reload,
  };
}

export function useAdminAction() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const inFlight = useRef(false);

  async function run(action: () => Promise<void>) {
    if (inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    setError("");
    try {
      await action();
    } catch (error) {
      setError(error instanceof Error ? error.message : "The request failed.");
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }
  return { run, error, pending, setError };
}

export function useAdminMutation(reload: () => void) {
  const action = useAdminAction();
  return {
    ...action,
    save: (path: string, method: string, body: unknown, done?: () => void) =>
      action.run(async () => {
        await adminRequest(path, method, body);
        reload();
        done?.();
      }),
  };
}
