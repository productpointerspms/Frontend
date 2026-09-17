"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  BadgeCheck,
  ArrowRight,
  ArrowLeft,
  XCircle,
  Info,
  AlertCircle,
  Check,
} from "lucide-react";
import { getCertificate, type CertificateRecord } from "@/lib/certificate";

const FEATURES = [
  { icon: ShieldCheck, text: "Tamper-evident verification" },
  { icon: Lock, text: "Secure student records" },
  { icon: BadgeCheck, text: "Trusted by employers and recruiters" },
];

type Result = CertificateRecord | "notfound" | null;

const DetailRow = ({
  label,
  value,
  valueClassName = "text-[#0E0A1A]",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) => (
  <div className="flex items-start justify-between gap-4 border-b border-[#E5E5E5] py-4 last:border-b-0">
    <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.6px] text-[#8A8A8A]">
      {label}
    </p>
    <p className={`text-right text-sm font-semibold ${valueClassName}`}>
      {value}
    </p>
  </div>
);

export default function CertificateVerification() {
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    const key = studentId.trim();
    if (!key || loading) return;

    setLoading(true);
    setError(null);
    try {
      const record = await getCertificate(key);
      setResult(record ?? "notfound");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setStudentId("");
  };

  return (
    <section className="w-full bg-white px-6 md:py-40 py-20 md:px-12 lg:px-20">
      <div className="mx-auto grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left column */}
        <div>
          <p className="md:text-sm md:mb-4 mb-2 text-[12px] md:font-semibold font-medium text-[#5818D0] leading-[17.28px] tracking-[1.613px] uppercase">
            Certificate verification
          </p>
          <h2 className="md:mb-0 mb-3 w-80 md:w-140 md:text-[30.8px] text-[20px] md:font-bold font-semibold md:leading-[43.47px] leading-normal text-[#0E0A1A] tracking-[-1.134px]">
            Verify a ProductPointers Certificate
          </h2>

          <p className="mt-6 md:w-100 mb-3 text-sm leading-5 text-[#525252]">
            Confirm the authenticity of a ProductPointers certificate using the
            Student ID shown on the certificate.
          </p>

          <ul className="mt-3 space-y-4">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-7 gap-3 w-7 flex-none items-center justify-center rounded-full bg-[#5818D0]">
                  <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </span>
                <span className="text-[13px] leading-[18.368px] text-[#525252]">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column - verification card */}
        <div className="rounded-lg border border-[#C2C2C2] bg-white md:p-10 p-6">
          {!result ? (
            <>
              <h3 className="md:text-[16px] text-sm font-medium md:font-semibold md:leading-normal leading-4 md:w-90 text-[#0E0A1A] md:tracking-[0.73px] tracking-[0.5px]">
                For Employers, Recruiters, And Anyone Who Wants To Verify A
                Certificate.
              </h3>

              <label
                htmlFor="student-id"
                className="mt-6 mb-2 block text-[13px] font-semibold text-[#525252] leading-[18.72px] md:tracking-[0.25px]"
              >
                Student ID
              </label>

              <input
                id="student-id"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                placeholder="Enter Verification ID (e.g. PP-2024-0031)"
                disabled={loading}
                className="w-full rounded-lg border border-[#C2C2C2] px-8 py-3 text-sm text-[#525252] placeholder:text-[rgba(14,10,26,0.50)] md:placeholder:text-[14px] placeholder:text-[12px] focus:border-[#5818D0] focus:outline-none focus:ring-1 focus:ring-[#5818D0] disabled:bg-gray-50"
              />

              {error && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleVerify}
                disabled={!studentId.trim() || loading}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-md py-3.5 text-sm font-semibold leading-[21.12px] tracking-[0.282px] text-white transition-colors ${
                  studentId.trim() && !loading
                    ? "bg-[#5818D0] cursor-pointer hover:opacity-95 active:opacity-90"
                    : "bg-[rgba(88,24,208,0.50)] cursor-not-allowed"
                }`}
              >
                {loading ? "Verifying..." : "Verify Certificate"}
                {!loading && (
                  <ArrowRight className="h-6 w-6" strokeWidth={2.5} />
                )}
              </button>
            </>
          ) : result === "notfound" ? (
            <>
              <div className="mb-3 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <h3 className="text-sm font-semibold text-[#0E0A1A]">
                  Verification Not Found
                </h3>
              </div>
              <p className="mb-5 text-xs text-[#525252]">
                The entered verification ID doesn&apos;t match any
                ProductPointers certificate records.
              </p>
              <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3">
                <Info className="h-4 w-4 shrink-0 text-red-500" />
                <p className="text-xs text-[#525252]">
                  Please confirm the certificate ID and try again.
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full cursor-pointer rounded-md border border-[#C2C2C2] py-3.5 text-sm font-semibold text-[#525252] transition-colors hover:bg-gray-50"
              >
                Try Again
              </button>
            </>
          ) : result.status === "completed" ? (
            <>
              {/* Verified header */}
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-green-50">
                  <Check className="h-5 w-5 text-green-600" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold leading-tight text-[#0E0A1A]">
                    Certificate Verified
                  </h3>
                  <p className="text-xs font-medium text-green-600">
                    Authentic ProductPointers Certificate
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="border-t border-[#E5E5E5]">
                <DetailRow label="Student Name" value={result.name} />
                <DetailRow label="Program" value={result.program} />
                <DetailRow
                  label="Certificate Status"
                  value="✓ Verified & Authentic"
                  valueClassName="text-green-600"
                />
                <DetailRow
                  label="Student ID"
                  value={result.certificateNumber}
                />
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#5818D0] hover:opacity-80"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                Verify another certificate
              </button>
            </>
          ) : (
            <>
              <div className="mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-amber-500" />
                <h3 className="text-sm font-semibold text-[#0E0A1A]">
                  Verification Record Found
                </h3>
              </div>
              <p className="mb-5 text-xs text-[#525252]">
                This student was enrolled in the program but did not
                successfully complete the graduation requirements.
              </p>
              <div className="border-t border-[#E5E5E5]">
                <DetailRow label="Student Name" value={result.name} />
                <DetailRow label="Program" value={result.program} />
                <DetailRow
                  label="Certificate Status"
                  value="Incomplete"
                  valueClassName="text-amber-600"
                />
                <DetailRow
                  label="Student ID"
                  value={result.certificateNumber}
                />
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#5818D0] hover:opacity-80"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                Verify another certificate
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
