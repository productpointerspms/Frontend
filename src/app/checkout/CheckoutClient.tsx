"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Layers,
  Check,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Info,
  Headphones,
  Mail,
  Tag,
  AlertCircle,
  Loader2,
  PartyPopper,
  RefreshCw,
  Zap,
} from "lucide-react";
import {
  currencies,
  getCurrency,
  format,
  getConversionRates,
  type Currency,
  type LiveRates,
} from "@/lib/pricing";
import { getProgramInfo } from "@/lib/programs";
import {
  registerApplication,
  getApplicationById,
  getPaymentDetails,
  type PaymentDetails,
} from "@/lib/application";
import { usePaymentStatus } from "@/lib/usePaymentStatus";
import { PaymentDetailsCard } from "@/components/preregistration/PaymentDetailsCard";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[#EADCF7] bg-[#FCF8FF] text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6024D0]/40 focus:border-[#6024D0] transition";

const labelClass = "block text-sm font-medium text-gray-700 mb-2";

/** Read-only contact field — used when the application has already been submitted. */
function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="px-4 py-3 rounded-xl border border-[#EADCF7] bg-[#F6EDFF]/40 text-sm font-medium text-[#15010D] select-all">
        {value || "—"}
      </p>
    </div>
  );
}

/**
 * Shared checkout for every program — which program is driven entirely by
 * `?program=<code>` (e.g. PPAP, PPIP), resolved via `getProgramInfo`.
 */
export default function CheckoutClient() {
  const searchParams = useSearchParams();
  // User-switchable — seeded from ?currency= but changeable via the dropdown below.
  const [currency, setCurrency] = useState<Currency>(() =>
    getCurrency(searchParams.get("currency"))
  );
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(event.target as Node)
      ) {
        setCurrencyMenuOpen(false);
      }
    };
    if (currencyMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [currencyMenuOpen]);

  const applicationIdParam = searchParams.get("id");

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [applicationId, setApplicationId] = useState<string | null>(null);

  // The application's own program (title, code, fee) — set once we've
  // fetched it via ?id=. Takes priority over ?program= since it's the
  // authoritative source for that specific application.
  const [applicationProgram, setApplicationProgram] = useState<{
    code?: string;
    title?: string;
    feeNgn?: number;
  } | null>(null);

  const program = useMemo(() => {
    const base = getProgramInfo(applicationProgram?.code ?? searchParams.get("program"));
    return {
      ...base,
      title: applicationProgram?.title ?? base.title,
      feeNgn: applicationProgram?.feeNgn ?? base.feeNgn,
    };
  }, [applicationProgram, searchParams]);

  const [loadingApplication, setLoadingApplication] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Live converted amounts for program.feeNgn, from /transaction/rates/{amount}.
  // Falls back to the static rate table in lib/pricing.ts if the request fails.
  const [liveRates, setLiveRates] = useState<LiveRates | null>(null);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError] = useState(false);
  // Tracks when the displayed price last changed so we can animate it.
  const [priceKey, setPriceKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLiveRates(null);
    setRatesLoading(true);
    setRatesError(false);
    getConversionRates(program.feeNgn)
      .then((rates) => {
        if (!cancelled) {
          setLiveRates(rates);
          setPriceKey((k) => k + 1);
        }
      })
      .catch(() => {
        if (!cancelled) setRatesError(true);
        /* silently fall back to the static rate table */
      })
      .finally(() => {
        if (!cancelled) setRatesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [program.feeNgn]);

  // Formats an NGN amount in the selected currency, preferring the live rate.
  // Non-fee amounts (e.g. the strikethrough original price) are scaled by the
  // same live rate ratio so they stay consistent with the fee's live figure.
  const formatLive = (ngnAmount: number) => {
    if (currency.code === "NGN") {
      return `${currency.symbol}${Math.round(ngnAmount).toLocaleString()}`;
    }
    const liveFeeAmount = liveRates?.[currency.code];
    if (liveFeeAmount != null && program.feeNgn > 0) {
      const scaled = (liveFeeAmount / program.feeNgn) * ngnAmount;
      return `${currency.symbol}${Math.round(scaled).toLocaleString()}`;
    }
    return format(ngnAmount, currency);
  };

  /** Returns the live-rate converted amount for a given currency (fee only). */
  const getLiveAmount = (c: Currency): string | null => {
    if (c.code === "NGN") return `₦${Math.round(program.feeNgn).toLocaleString()}`;
    const live = liveRates?.[c.code];
    if (live != null) return `${c.symbol.trim()}${Math.round(live).toLocaleString()}`;
    return null;
  };

  // Track when currency changes to animate the price.
  const handleCurrencyChange = (c: Currency) => {
    setCurrency(c);
    setCurrencyMenuOpen(false);
    setPriceKey((k) => k + 1);
  };

  const isUsingLiveRate = liveRates != null && currency.code !== "NGN";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  // Once we have an applicationId, keep checking in the background so we can
  // let the user know the moment their payment is confirmed.
  const { isPaid } = usePaymentStatus(applicationId, applicationId != null);

  // Fetches transfer + card details together — no per-method button needed,
  // the tabs in PaymentDetailsCard let the user switch between whichever
  // methods come back.
  const fetchPaymentDetails = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const details = await getPaymentDetails(id, currency.code);
        setPaymentDetails(details);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [currency.code]
  );

  // Re-fetch transfer/card details if the user switches currency after
  // they're already showing, so they match the newly selected currency.
  useEffect(() => {
    if (applicationId && paymentDetails) {
      fetchPaymentDetails(applicationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency.code]);

  // Pre-fill contact details from an existing application, if ?id= is
  // present, then fetch its payment details right away.
  useEffect(() => {
    if (!applicationIdParam) return;

    let cancelled = false;
    setLoadingApplication(true);
    setLoadError(null);

    getApplicationById(applicationIdParam)
      .then((app) => {
        if (cancelled) return;
        setFullname(app.fullname);
        setEmail(app.email);
        setPhone(app.phoneNumber);
        setApplicationId(app.applicationId);
        setApplicationProgram({
          code: app.programCode,
          title: app.programName,
          feeNgn: app.fee,
        });
        fetchPaymentDetails(app.applicationId);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(
          err instanceof Error
            ? err.message
            : "Could not load your application details."
        );
      })
      .finally(() => {
        if (!cancelled) setLoadingApplication(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationIdParam]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    // Already have an application (from ?id=) — just retry the fetch.
    if (applicationId) {
      fetchPaymentDetails(applicationId);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await registerApplication({
        fullname,
        email,
        phoneNumber: phone,
        programCode: program.code,
        responses: [],
      });
      setApplicationId(result.applicationId);
      await fetchPaymentDetails(result.applicationId);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  const totalDue = formatLive(program.feeNgn);
  const savingsNgn =
    program.originalFeeNgn != null ? program.originalFeeNgn - program.feeNgn : null;

  return (
    <div className="min-h-screen w-full bg-[#FCF1FF] py-12 px-4 sm:px-6 lg:px-10 font-montserrat">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#15010D] mb-4">
          Complete Your Application
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
          Secure your spot in the next ProductPointers cohort by completing your
          payment below.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-8 items-start">
        {/* ----------------------------- Left: Form ---------------------------- */}
        <form
          onSubmit={handleSubmit}
          className="order-2 lg:order-1 bg-white rounded-[28px] shadow-sm p-6 sm:p-10"
        >
          {/* Contact Information */}
          <h2 className="text-xl font-bold text-[#15010D]">
            Contact Information
          </h2>
          <div className="h-px bg-gray-100 my-6" />

          {loadingApplication && (
            <div className="flex items-center gap-2 bg-[#F6EDFF] text-[#6024D0] rounded-xl px-4 py-3 text-sm mb-6">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>Loading your application details…</span>
            </div>
          )}

          {loadError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loadError}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* When an application already exists the fields are locked —
                the user submitted these details in the apply flow; they
                should not be changed here. */}
            {applicationIdParam ? (
              <>
                <ReadOnlyField label="Full Name" value={fullname} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <ReadOnlyField label="Email address" value={email} />
                  <ReadOnlyField label="Phone number" value={phone} />
                </div>
                <p className="flex items-center gap-1.5 text-xs text-[#6024D0] bg-[#F3E8FF] rounded-xl px-4 py-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  Your details are locked from your submitted application.
                </p>
              </>
            ) : (
              <>
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={loadingApplication}
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Enter your full name"
                    className={`${inputClass} disabled:opacity-60`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      disabled={loadingApplication}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className={`${inputClass} disabled:opacity-60`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Phone number (WhatsApp preferred) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      disabled={loadingApplication}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 XXX XXX XXXX"
                      className={`${inputClass} disabled:opacity-60`}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Payment */}
          <h2 className="text-xl font-bold text-[#15010D] mt-10">
            Payment
          </h2>
          <div className="h-px bg-gray-100 my-6" />

          {isPaid ? (
            <div className="flex items-center gap-2.5 bg-[#ECFDF3] border border-[#A7F3D0] rounded-xl px-5 py-4 text-[#10B981] font-semibold text-sm">
              <PartyPopper className="w-5 h-5 shrink-0" />
              We&apos;ve received your payment — you&apos;re all set!
            </div>
          ) : (
            <>
              <PaymentDetailsCard
                details={paymentDetails}
                loading={loading}
                amountLabel={totalDue}
                idleMessage={
                  <>
                    Fill in your details above and click{" "}
                    <span className="font-semibold text-[#15010D]">Complete Payment</span>{" "}
                    to see your payment details.
                  </>
                }
              />

              {paymentDetails && (
                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-4">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  We&apos;ll update this page automatically once your payment is confirmed.
                </p>
              )}

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl px-5 py-4 text-sm mt-6">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit — hidden once details are already loaded (e.g. via ?id=) */}
              {!paymentDetails && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#6024D0] hover:bg-[#4d1ba8] text-white py-4 rounded-xl font-semibold text-base mt-10 flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      Processing <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Complete Payment <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </>
          )}

          <p className="flex items-center justify-center gap-1.5 text-xs text-[#10B981] mt-4">
            <ShieldCheck className="w-4 h-4" />
            Payments are secure and encrypted
          </p>

          {/* Footnote */}
          <div className="mt-10 flex items-start gap-3 bg-[#F6EDFF] rounded-2xl px-5 py-4 max-w-md mx-auto">
            <Info className="w-5 h-5 text-[#6024D0] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">
              After successful payment, you&apos;ll receive onboarding
              instructions and next-step details via email
            </p>
          </div>
        </form>

        {/* -------------------------- Right: Summary -------------------------- */}
        <aside className="order-1 lg:order-2 bg-white rounded-[28px] shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#15010D]">
            Application Summary
          </h2>
          <div className="h-px bg-gray-100 my-6" />

          {/* Program */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6 text-[#6024D0]" />
            </div>
            <div>
              <h3 className="font-bold text-[#15010D] leading-snug">
                {program.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{program.description}</p>
              <span className="inline-block mt-2 bg-[#F3E8FF] text-[#6024D0] text-[11px] font-semibold px-3 py-1 rounded-full">
                {program.durationLabel}
              </span>
            </div>
          </div>

          <div className="h-px bg-gray-100 my-6" />

          {/* Features */}
          <ul className="space-y-4">
            {program.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#ECFDF3] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#10B981]" strokeWidth={3} />
                </span>
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="h-px bg-gray-100 my-6" />

          {/* Fee */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Program Fee</p>
                {/* Live rate indicator */}
                {ratesLoading && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#6024D0] font-medium bg-[#F3E8FF] px-2 py-0.5 rounded-full animate-pulse">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    Fetching live rates…
                  </span>
                )}
                {!ratesLoading && isUsingLiveRate && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#10B981] font-semibold bg-[#ECFDF3] px-2 py-0.5 rounded-full">
                    <Zap className="w-2.5 h-2.5" />
                    Live rate
                  </span>
                )}
                {!ratesLoading && ratesError && currency.code !== "NGN" && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
                    Est. rate
                  </span>
                )}
              </div>

              {/* Currency selector */}
              <div className="relative" ref={currencyDropdownRef}>
                <button
                  type="button"
                  onClick={() => setCurrencyMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 border border-gray-200 rounded-full pl-2 pr-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Flag country={currency.country} />
                  {currency.code}
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
                      currencyMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {currencyMenuOpen && (
                  <div className="absolute z-20 mt-2 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl w-52 py-2 max-h-72 overflow-auto">
                    {/* Header */}
                    <div className="px-4 pb-2 border-b border-gray-100 mb-1">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Select Currency</p>
                    </div>
                    {currencies.map((c) => {
                      const liveAmt = getLiveAmount(c);
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => handleCurrencyChange(c)}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                            c.code === currency.code
                              ? "bg-[#F3E8FF] text-[#6024D0] font-semibold"
                              : "text-gray-700 hover:bg-purple-50"
                          }`}
                        >
                          <Flag country={c.country} />
                          <div className="flex flex-col items-start flex-1 min-w-0">
                            <span className="font-semibold">{c.code}</span>
                            {liveAmt ? (
                              <span className={`text-[10px] truncate ${
                                c.code === currency.code ? "text-[#6024D0]/70" : "text-gray-400"
                              }`}>
                                {liveAmt}
                              </span>
                            ) : ratesLoading ? (
                              <span className="text-[10px] text-gray-300">Loading…</span>
                            ) : null}
                          </div>
                          {c.code === currency.code && (
                            <Check className="w-3.5 h-3.5 text-[#6024D0] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1">
              {/* Price with shimmer while loading */}
              {ratesLoading && currency.code !== "NGN" ? (
                <span className="inline-block h-8 w-28 rounded-lg bg-gray-200 animate-pulse" />
              ) : (
                <span
                  key={`price-${priceKey}-${currency.code}`}
                  className="text-2xl font-extrabold text-[#15010D] transition-all"
                  style={{ animation: "fadeInUp 0.3s ease" }}
                >
                  {totalDue}
                </span>
              )}
            </div>
          </div>

          <div className="h-px bg-gray-100 my-6" />

          {/* Total */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-base font-semibold text-[#15010D]">Total Due</p>
              {isUsingLiveRate && !ratesLoading && (
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Converted at live market rate
                </p>
              )}
            </div>
            {ratesLoading && currency.code !== "NGN" ? (
              <span className="inline-block h-8 w-28 rounded-lg bg-gray-200 animate-pulse" />
            ) : (
              <span
                key={`total-${priceKey}-${currency.code}`}
                className="text-2xl font-extrabold text-[#15010D]"
                style={{ animation: "fadeInUp 0.3s ease" }}
              >
                {totalDue}
              </span>
            )}
          </div>

          {/* Help */}
          <div className="mt-8 flex items-start gap-3 bg-[#F6EDFF] rounded-2xl p-4">
            <div className="w-9 h-9 rounded-full bg-[#E9D5FF] flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4 text-[#6024D0]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#15010D]">Need Help?</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                Our team is available to help you with any enrollment or payment
                questions.
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs font-semibold">
                <a
                  href="mailto:support@productpointers.com"
                  className="flex items-center gap-1.5 text-[#6024D0] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" /> Email Support
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="https://wa.me/+2348102567773"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#10B981] hover:underline"
                >
                  <WhatsappIcon /> Whatsapp
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------- Sub-parts ------------------------------- */

function Flag({ country }: { country: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/24x18/${country}.png`}
      alt=""
      width={18}
      height={13}
      className="w-4 h-auto rounded-sm shrink-0"
    />
  );
}

function WhatsappIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
