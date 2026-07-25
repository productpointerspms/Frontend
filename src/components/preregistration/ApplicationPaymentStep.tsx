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
  type LucideIcon,
} from "lucide-react";

const infoCards: { icon: LucideIcon; title: string; desc: string }[] = [
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
    desc: "We'll send you payment instructions by email to secure your spot.",
  },
  {
    icon: ClipboardCheck,
    title: "Program Onboarding",
    desc: "Once payment is confirmed, you'll get access to your cohort and resources.",
  },
];

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
  applicationId: string;
  fullname: string;
  email: string;
  amount: number;
  currencyCode: string;
  reference?: string;
}

const ApplicationPaymentStep: React.FC<ApplicationPaymentStepProps> = ({
  programName,
  programPath,
}) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-[24px] shadow-sm p-8 md:p-12 animate-in fade-in zoom-in duration-500 text-center mt-6">
      <div className="mx-auto w-20 h-20 bg-[#6024D0] rounded-full flex items-center justify-center mb-8 shadow-lg shadow-purple-200">
        <Check size={40} className="text-white" strokeWidth={3} />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Your Application Has Been Received
      </h1>
      <p className="text-gray-500 mb-10 max-w-md mx-auto">
        Thank you for applying to the {programName}. We&apos;ll be in touch
        with payment and onboarding instructions via email.
      </p>

      {/* What happens next */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 text-left">
        {infoCards.map((card) => (
          <InfoCard key={card.title} {...card} />
        ))}
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
