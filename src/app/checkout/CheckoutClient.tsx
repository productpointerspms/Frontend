"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Layers,
  Check,
  ArrowRight,
  ShieldCheck,
  Info,
  Headphones,
  Mail,
  Tag,
  AlertCircle,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { getCurrency, format } from "@/lib/pricing";
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

/**
 * Shared checkout for every program — which program is driven entirely by
 * `?program=<code>` (e.g. PPAP, PPIP), resolved via `getProgramInfo`.
 */
export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const currency = useMemo(
    () => getCurrency(searchParams.get("currency")),
    [searchParams]
  );
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  // Once we have an applicationId, keep checking in the background so we can
  // let the user know the moment their payment is confirmed.
  const { isPaid } = usePaymentStatus(applicationId, applicationId != null);

  // Pre-fill contact details from an existing application, if ?id= is present.
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
  }, [applicationIdParam]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      // Reuse the existing application (from ?id=) instead of registering a
      // duplicate one when we already resolved it.
      const resolvedApplicationId =
        applicationId ??
        (
          await registerApplication({
            fullname,
            email,
            phoneNumber: phone,
            programCode: program.code,
            responses: [],
          })
        ).applicationId;

      setApplicationId(resolvedApplicationId);

      const details = await getPaymentDetails(resolvedApplicationId, currency.code);
      setPaymentDetails(details);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalDue = format(program.feeNgn, currency);
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
          className="bg-white rounded-[28px] shadow-sm p-6 sm:p-10"
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
                Phone number (WhatsApp preferred) * <span className="text-red-500">*</span>
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

              {/* Submit */}
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
        <aside className="bg-white rounded-[28px] shadow-sm p-6 sm:p-8">
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
            <p className="text-sm text-gray-500 mb-1">Program Fee</p>
            {program.originalFeeNgn != null && (
              <p className="text-sm text-gray-400 line-through">
                {format(program.originalFeeNgn, currency)}
              </p>
            )}
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-extrabold text-[#15010D]">
                {totalDue}
              </span>
              {program.originalFeeNgn != null && (
                <span className="inline-flex items-center gap-1 bg-[#F3E8FF] text-[#6024D0] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  <Tag className="w-3 h-3" /> Early Bird
                </span>
              )}
            </div>
            {savingsNgn != null && savingsNgn > 0 && (
              <p className="text-xs text-[#10B981] mt-1">
                save {format(savingsNgn, currency)} on this offer
              </p>
            )}
          </div>

          <div className="h-px bg-gray-100 my-6" />

          {/* Total */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-base font-semibold text-[#15010D]">Total Due</p>
            </div>
            <span className="text-2xl font-extrabold text-[#15010D]">
              {totalDue}
            </span>
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

function WhatsappIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
