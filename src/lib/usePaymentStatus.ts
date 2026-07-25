"use client";

import { useEffect, useState } from "react";
import { getApplicationById, TRANSACTION_STATUS } from "./application";

const POLL_INTERVAL_MS = 5000;

export interface PaymentStatusState {
  status: string | null;
  /** True once `transaction.status` reports TRANSACTION_STATUS.COMPLETED ("00"). */
  isPaid: boolean;
  /** Raw transaction status code, e.g. "03" while pending. Null until a transaction exists. */
  transactionStatus: string | null;
  checking: boolean;
  error: string | null;
}

/**
 * Polls `GET /application/{id}` until the transaction's status reports
 * TRANSACTION_STATUS.COMPLETED, then stops. Pass `enabled: false` to hold off
 * polling until it's relevant (e.g. before the applicationId is known).
 */
export function usePaymentStatus(
  applicationId: string | null,
  enabled: boolean
): PaymentStatusState {
  const [state, setState] = useState<PaymentStatusState>({
    status: null,
    isPaid: false,
    transactionStatus: null,
    checking: false,
    error: null,
  });

  useEffect(() => {
    if (!applicationId || !enabled) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const poll = async () => {
      setState((prev) => ({ ...prev, checking: true, error: null }));
      try {
        const app = await getApplicationById(applicationId);
        if (cancelled) return;

        const transactionStatus = app.transaction?.status ?? null;
        const isPaid = transactionStatus === TRANSACTION_STATUS.COMPLETED;
        setState({
          status: app.status,
          isPaid,
          transactionStatus,
          checking: false,
          error: null,
        });

        if (!isPaid) {
          timer = setTimeout(poll, POLL_INTERVAL_MS);
        }
      } catch (err) {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          checking: false,
          error:
            err instanceof Error ? err.message : "Could not check payment status.",
        }));
        // Keep retrying — a transient network/API error shouldn't stop polling.
        timer = setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [applicationId, enabled]);

  return state;
}
