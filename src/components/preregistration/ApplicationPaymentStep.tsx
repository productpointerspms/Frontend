"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  Search,
  Mail,
  CreditCard,
  ClipboardCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";
import { usePaymentStatus } from "@/lib/usePaymentStatus";

function getInfoCards(showContinueButton: boolean): { icon: LucideIcon; title: string; desc: string }[] {
  return [
    {
      icon: Search,
      title: "Application Review",
      desc: "Our team reviews every application to confirm your enrollment details.",
    },
    {
      icon: Mail,
      title: "Email Notification",
      desc: "You'll receive a confirmation email with onboarding details.",
    },
    {
      icon: CreditCard,
      title: "Payment Process",
      desc: showContinueButton
        ? "Continue below to securely complete your payment and secure your spot."
        : "We'll email you a secure checkout link once your application is reviewed.",
    },
    {
      icon: ClipboardCheck,
      title: "Program Onboarding",
      desc: "Once payment is confirmed, you'll get access to your cohort and resources.",
    },
  ];
}

function InfoCard({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-10 h-10 bg-[#6024D0] rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-bold text-gray-900 mb-1 text-sm">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

export interface ApplicationPaymentStepProps {
  /** Full display name, e.g. "ProductPointers Accelerator Program". */
  programName: string;
  /** Landing page path, e.g. "/ppap". */
  programPath: string;
  /** Program code the shared checkout expects, e.g. "PPAP". */
  programCode: string;
  applicationId: string;
  currencyCode: string;
  /** Set false for programs where a checkout link is emailed after review instead (e.g. PPIP). */
  showContinueButton?: boolean;
}

const ApplicationPaymentStep: React.FC<ApplicationPaymentStepProps> = ({
  programName,
  programPath,
  programCode,
  applicationId,
  currencyCode,
  showContinueButton = true,
}) => {
  // Keeps polling GET /application/{id} in the background from the moment
  // this page loads, so we notice a payment even if it was completed via a
  // link sent by email rather than the button below.
  const { status, isPaid, checking, error: statusError } = usePaymentStatus(
    applicationId,
    true
  );

  const checkoutHref = `/checkout?program=${encodeURIComponent(
    programCode
  )}&currency=${encodeURIComponent(currencyCode)}&id=${encodeURIComponent(applicationId)}`;

  return (
    <div className="w-full max-w-2xl bg-white rounded-[24px] shadow-sm p-8 md:p-12 animate-in fade-in zoom-in duration-500 text-center mt-6">
      <div className="mx-auto w-20 h-20 bg-[#6024D0] rounded-full flex items-center justify-center mb-8 shadow-lg shadow-purple-200">
        <Check size={40} className="text-white" strokeWidth={3} />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Your Application Has Been Received
      </h1>
      <p className="text-gray-500 mb-4 max-w-md mx-auto">
        Thank you for applying to the {programName}.{" "}
        {showContinueButton
          ? "Continue below to secure your spot with payment."
          : "We'll be in touch with next steps once your application is reviewed."}
      </p>

      {/* Application / payment status */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {isPaid ? (
          <span className="inline-flex items-center gap-1.5 bg-[#ECFDF3] text-[#10B981] text-xs font-semibold px-3 py-1.5 rounded-full">
            <PartyPopper className="w-3.5 h-3.5" /> Payment Received
          </span>
        ) : status ? (
          <span className="inline-flex items-center gap-1.5 bg-[#F3E8FF] text-[#6024D0] text-xs font-semibold px-3 py-1.5 rounded-full">
            {checking && <Loader2 className="w-3 h-3 animate-spin" />}
            Application Status: {status}
          </span>
        ) : checking ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking status…
          </span>
        ) : statusError ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-red-500">
            <AlertCircle className="w-3.5 h-3.5" /> {statusError}
          </span>
        ) : null}
      </div>

      {/* What happens next */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 text-left">
        {getInfoCards(showContinueButton).map((card) => (
          <InfoCard key={card.title} {...card} />
        ))}
      </div>

      <div className="mb-10">
        {isPaid ? (
          <div className="flex items-center justify-center gap-2.5 bg-[#ECFDF3] border border-[#A7F3D0] rounded-xl px-5 py-4 text-[#10B981] font-semibold text-sm">
            <PartyPopper className="w-5 h-5 shrink-0" />
            We&apos;ve received your payment — you&apos;re all set!
          </div>
        ) : showContinueButton ? (
          <>
            <Link
              href={checkoutHref}
              className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold text-sm py-3.5 px-10 rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              Continue to Payment <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400 mt-3">
              You&apos;ll securely complete your payment on the next page.
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-2.5 bg-[#F3E8FF] rounded-xl px-5 py-4 text-[#6024D0] text-sm font-medium">
            <Mail className="w-4 h-4 shrink-0" />
            A secure checkout link will be sent to your email once your
            application is reviewed.
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link
          href={programPath}
          className="bg-[#6024D0] hover:bg-[#4d1ba8] text-white font-semibold text-sm py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          Explore ProductPointers <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm py-3 px-8 rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </div>

      <div className="border-t border-gray-100 mt-10 pt-6">
        <p className="text-[#6024D0] italic text-sm font-medium mb-2">
          We keep our cohorts small to ensure quality mentorship and real results.
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          Looking forward to having you onboard.
          <br />
          For enquiries,{" "}
          <Link href="/contact" className="text-[#6024D0] hover:underline">
            click here
          </Link>{" "}
          to send us a message.
        </p>
      </div>
    </div>
  );
};

export default ApplicationPaymentStep;
