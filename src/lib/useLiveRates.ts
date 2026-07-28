"use client";

import { useEffect, useRef, useState } from "react";
import {
  currencies,
  getCurrency,
  format,
  getConversionRates,
  type Currency,
  type LiveRates,
} from "./pricing";

export interface UseLiveRatesResult {
  /** All live rates keyed by currency code (e.g. { USD: 106.6, EUR: 91.6 }). Null while loading or on error. */
  liveRates: LiveRates | null;
  /** True while the API call is in-flight. */
  loading: boolean;
  /** True if the API call failed; the consumer falls back to static rates. */
  error: boolean;
  /** Currently selected currency object. */
  currency: Currency;
  /** Change the selected currency. */
  setCurrency: (c: Currency) => void;
  /**
   * Format any NGN amount in the selected currency.
   * Uses the live rate when available, scaled from the fee base; falls back to static.
   */
  formatLive: (ngnAmount: number) => string;
  /**
   * Return the live-converted fee string for *any* currency (for dropdown previews).
   * Returns null while rates haven't loaded yet.
   */
  getLiveAmount: (c: Currency) => string | null;
  /** True when showing a live foreign rate (not NGN, rates loaded). */
  isLive: boolean;
  /** Bump this when price changes so animated consumers can re-key. */
  priceKey: number;
}

/**
 * Fetches /transaction/rates/{feeNgn} once (and re-fetches when feeNgn changes).
 * Returns the selected currency, helpers to format amounts, and loading/error state.
 *
 * @param feeNgn    The base NGN amount to convert (e.g. PROGRAM_FEE_NGN).
 * @param initialCurrencyCode  Optional — seeds from a URL param or default "NGN".
 */
export function useLiveRates(
  feeNgn: number,
  initialCurrencyCode?: string | null
): UseLiveRatesResult {
  const [currency, setCurrencyState] = useState<Currency>(() =>
    getCurrency(initialCurrencyCode)
  );
  const [liveRates, setLiveRates] = useState<LiveRates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [priceKey, setPriceKey] = useState(0);

  // Keep a ref so the effect doesn't re-run just because feeNgn reference changes.
  const feeRef = useRef(feeNgn);
  feeRef.current = feeNgn;

  useEffect(() => {
    if (!feeNgn || feeNgn <= 0) return;
    let cancelled = false;
    setLiveRates(null);
    setLoading(true);
    setError(false);

    getConversionRates(feeNgn)
      .then((rates) => {
        if (!cancelled) {
          setLiveRates(rates);
          setPriceKey((k) => k + 1);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [feeNgn]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    setPriceKey((k) => k + 1);
  };

  const formatLive = (ngnAmount: number): string => {
    if (currency.code === "NGN") {
      return `${currency.symbol}${Math.round(ngnAmount).toLocaleString()}`;
    }
    const liveFeeAmount = liveRates?.[currency.code];
    if (liveFeeAmount != null && feeNgn > 0) {
      const scaled = (liveFeeAmount / feeNgn) * ngnAmount;
      return `${currency.symbol}${Math.round(scaled).toLocaleString()}`;
    }
    return format(ngnAmount, currency);
  };

  const getLiveAmount = (c: Currency): string | null => {
    if (c.code === "NGN") return `\u20a6${Math.round(feeNgn).toLocaleString()}`;
    const live = liveRates?.[c.code];
    if (live != null) return `${c.symbol.trim()}${Math.round(live).toLocaleString()}`;
    return null;
  };

  const isLive = liveRates != null && currency.code !== "NGN";

  return {
    liveRates,
    loading,
    error,
    currency,
    setCurrency,
    formatLive,
    getLiveAmount,
    isLive,
    priceKey,
  };
}

/** Re-export the full currency list so consumers don't need a separate import. */
export { currencies };
