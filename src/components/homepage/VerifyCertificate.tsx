"use client";

import React, { useState } from "react";
import { ArrowRight, XCircle, Info, BadgeCheck, AlertCircle } from "lucide-react";
import { getCertificate, type CertificateRecord } from "@/lib/certificate";

type Result = CertificateRecord | "notfound" | null;

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-6 last:mb-0">
    <p className="text-gray-400 text-sm mb-1">{label}</p>
    <p className="text-[#1A1A1A] text-lg font-semibold">{value}</p>
  </div>
);

const VerifyCertificate = () => {
  const [id, setId] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    const key = id.trim();
    if (!key || loading) return;

    setLoading(true);
    setError(null);
    try {
      const record = await getCertificate(key);
      setResult(record ?? "notfound");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#FCF1FF] py-24 px-6 flex flex-col items-center justify-center text-center">
      <h2 className="text-[0.92rem] min-[375px]:text-[1.01rem] sm:text-2xl md:text-3xl font-bold text-[#1E0F2B] mb-6 whitespace-nowrap sm:whitespace-normal">
        Verify ProductPointers Certificates
      </h2>
      <p className="text-gray-500 text-[11px] min-[375px]:text-[11px] sm:text-base md:text-lg max-w-3xl mb-4 font-medium leading-relaxed">
        <span className="whitespace-nowrap sm:whitespace-normal">Employers and organizations can verify ProductPointers</span><br className="block md:hidden" />
        <span className="whitespace-nowrap sm:whitespace-normal">program completion using a student verification ID.</span>
      </p>
      <p className="text-gray-400 text-xs md:text-sm mb-10">
        Every verified certificate confirms authentic program participation and completion.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleVerify()}
          placeholder="Enter Verification ID"
          className="w-full sm:w-[350px] px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A25D2] text-gray-700 bg-white"
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full sm:w-auto bg-[#6A25D2] hover:bg-[#5b1cb8] text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify Certificate"}
          {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
        </button>
      </div>

      {error && (
        <div className="w-full max-w-2xl mt-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 rounded-xl px-5 py-4 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="w-full max-w-2xl mt-12 bg-white rounded-[28px] border border-gray-200 shadow-sm p-6 md:p-10 text-left">
          {result === "notfound" ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-white fill-red-500" />
                <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
                  Verification Not Found
                </h3>
              </div>
              <p className="text-center text-gray-500 text-sm md:text-base mb-6">
                The entered verification ID doesn&apos;t match any
                ProductPointers certificate records.
              </p>
              <div className="border-t border-gray-100 mb-6" />
              <div className="flex items-center gap-3 bg-red-50 rounded-xl px-5 py-4 mb-6">
                <Info className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-gray-600 text-sm md:text-base">
                  Please confirm the certificate ID and try again.
                </p>
              </div>
              <button
                onClick={() => {
                  setResult(null);
                  setId("");
                }}
                className="w-full border border-red-300 text-red-500 hover:bg-red-50 font-semibold py-4 rounded-xl transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </>
          ) : result.status === "completed" ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-6">
                <BadgeCheck className="w-6 h-6 text-green-600" />
                <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
                  Verified Certificate
                </h3>
              </div>
              <div className="border-t border-gray-100 mb-8" />
              <DetailRow label="Student Name" value={result.name} />
              <DetailRow label="Program" value={result.program} />
              <DetailRow label="Completion Status" value="Successfully Completed" />
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Info className="w-6 h-6 text-amber-500" />
                <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
                  Verification Record Found
                </h3>
              </div>
              <p className="text-center text-gray-500 text-sm md:text-base mb-6">
                This student was enrolled in the program but did not
                successfully complete the graduation requirements.
              </p>
              <div className="border-t border-gray-100 mb-8" />
              <DetailRow label="Student Name" value={result.name} />
              <DetailRow label="Program" value={result.program} />
              <DetailRow label="Completion Status" value="Incomplete" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
