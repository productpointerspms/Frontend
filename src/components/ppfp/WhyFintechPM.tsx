// components/WhyFintechPM.tsx
import Image from "next/image";

const rows = [
  {
    label: "Users",
    text: "Whose money, trust and livelihood is involved in every decision.",
  },
  {
    label: "Technology",
    text: "Complex infrastructure, APIs, integrations and real-time data flows.",
  },
  {
    label: "Data",
    text: "Transactions, behaviour, risk signals and growth metrics.",
  },
  {
    label: "Business",
    text: "Unit economics, monetisation, regulatory requirements and margins.",
  },
  {
    label: "Trust",
    text: "The most fragile and most essential element of any financial product.",
  },
  {
    label: "Financial Experiences",
    text: "From onboarding to payment to statement every moment matters.",
  },
];

export default function WhyFintechPM() {
  return (
    <section className="bg-white px-4 py-20 md:px-12 lg:px-14 lg:py-40">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* Left column */}
        <div>
          <p className="md:text-sm text-[12px]  md:font-semibold font-medium tracking-[1.613px] leading-[17.28px] uppercase text-[#5818D0]">
            Why Fintech Product Management
          </p>

          <h2 className="md:mt-4 text-[20px] md:w-110 tracking-[-1.134px] font-semibold md:font-bold md:leading-[43.47px] leading-normal text-[#0E0A1A] md:text-[30.8px]">
            Fintech isn&apos;t just tech. It&apos;s trust, regulation, and
            money.
          </h2>

          <div className="mt-6 space-y-0 md:text-[15px] text-[12px] leading-4 md:leading-6 md:w-140 text-[#525252]">
            <p>
              You can be a good Product Manager and still struggle with fintech.
            </p>
            <p>You know how to write user stories.</p>
            <p>You understand discovery.</p>
            <p>You can work with designers and engineers.</p>
            <p className="mt-0">
              But when someone starts talking about: settlement, reconciliation,
              KYC, AML, payment failures, ledgers, fraud, risk, authorization,
              APIs or transaction lifecycles, you suddenly realise there is
              another layer to Product Management.
            </p>
          </div>

          <dl className="mt-10 border-t border-[#C2C2C2]">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-3 border-b border-[#C2C2C2] py-6 md:gap-2"
              >
                <dt className="w-25 md:w-44 shrink-0 text-[12px] font-bold uppercase leading-4.5 tracking-[0.72px] text-[#0E0A1A]">
                  {row.label}
                </dt>
                <dd className="flex-1 lg:w-140 text-left md:text-[14px] text-[12px] leading-[21.824px] text-[#0E0A1A] sm:text-right">
                  {row.text}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-base md:text-[24px]  font-medium md:font-semibold text-[#101828]">
            That&apos;s what this program is designed to help you understand.
          </p>
        </div>

        {/* Right column: image (bar is part of the image) */}
        <div className="flex lg:justify-end">
          <Image
            src="/images/ppfp/fintech.png"
            alt="Product manager taking notes at a laptop"
            width={519}
            height={658}
            sizes="(min-width: 1024px) 420px, 100vw"
            className="h-auto w-full max-w-105"
            priority
          />
        </div>
      </div>
    </section>
  );
}