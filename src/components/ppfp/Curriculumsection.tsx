"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Block = { type: "p"; text: string } | { type: "list"; items: string[] };

type Week = {
  week: number;
  title: string;
  outcomes: string[];
  activity: Block[];
  deliverable: Block[];
};

const p = (text: string): Block => ({ type: "p", text });
const list = (...items: string[]): Block => ({ type: "list", items });

const WEEKS: Week[] = [
  {
    week: 1,
    title: "Understanding Fintech & Financial Services",
    outcomes: [
      "Explain what fintech is and how it differs from traditional financial services.",
      "Understand the major areas of financial services, including payments, banking, lending, savings, investments, insurance, and financial infrastructure.",
      "Identify the major players in a fintech ecosystem and understand how they interact.",
      "Understand what makes building financial products different from building other digital products.",
      "Identify different types of fintech products and the problems they solve.",
      "Understand the different Product Management opportunities that exist within fintech.",
    ],
    activity: [
      p("Map a Fintech Ecosystem"),
      p("You will select a fintech company and map its:"),
      list(
        "Customers → Product → Financial Service → Partners → Infrastructure → Revenue",
      ),
    ],
    deliverable: [p("Fintech Ecosystem Map + Company Teardown")],
  },
  {
    week: 2,
    title: "Payments: How Money Moves",
    outcomes: [
      "Explain how a basic digital payment works from initiation to completion.",
      "Understand different payment methods and payment product categories.",
      "Identify the key players involved in a payment transaction.",
      "Understand the basic role of payment gateways, processors, switches, banks, and payment networks.",
      "Understand basic concepts such as authorization, clearing, settlement, and reconciliation.",
      "Identify common reasons payments fail and how you can investigate them as a Product Manager.",
      "Map a simple end-to-end payment flow.",
    ],
    activity: [
      p('"What Happens When I Click Pay?"'),
      p(
        "You will map the journey of a payment and identify where things can go wrong.",
      ),
    ],
    deliverable: [
      p("End-to-End Payment Flow Diagram + Payment Failure Analysis"),
    ],
  },
  {
    week: 3,
    title: "Fintech Products: Wallets, Cards, Banking & Lending",
    outcomes: [
      "Understand how digital wallets and stored-value products work.",
      "Understand the basic lifecycle of cards and card-based products.",
      "Understand how digital banking and account-based products work.",
      "Understand the fundamentals of lending and credit products.",
      "Understand the basic lending lifecycle from application to repayment.",
      "Understand products such as BNPL and other digital credit products at a foundational level.",
      "Compare different fintech products based on their customers, value proposition, business model, and risks.",
      "Identify the key product considerations for different financial products.",
    ],
    activity: [
      p("Conduct a Fintech Product Teardown"),
      p("You will select one fintech product:"),
      list(
        "Digital wallet",
        "Digital bank",
        "Card",
        "Lending product",
        "BNPL product",
      ),
      p("Then break down how it works."),
    ],
    deliverable: [p("Fintech Product Teardown")],
  },
  {
    week: 4,
    title: "Fintech Infrastructure, Operations & Partnerships",
    outcomes: [
      "Understand the basic infrastructure that powers fintech products.",
      "Understand the role of ledgers in financial products.",
      "Understand how transactions are recorded and tracked.",
      "Understand the importance of reconciliation and settlement in financial operations.",
      "Understand the role of APIs and third-party integrations in fintech.",
      "Understand why fintech companies rely heavily on banking, payment, technology, and infrastructure partners.",
      "Understand your role as a Product Manager when managing technical and business partnerships.",
      "Identify common operational challenges that can affect fintech products.",
    ],
    activity: [
      p("Investigate a Transaction Problem"),
      p(
        "Scenario: A customer was charged, but the merchant says they haven't received the money.",
      ),
      p(
        "You will investigate the possible journey of the transaction and identify where the issue could have occurred.",
      ),
    ],
    deliverable: [p("Transaction Flow + Operations Problem Analysis")],
  },
  {
    week: 5,
    title: "Fintech Regulation, Compliance, Risk & Trust",
    outcomes: [
      "Understand why fintech and financial services are regulated.",
      "Understand the role of licensing in financial products and services.",
      "Understand the basic concepts of KYC, KYB, AML, fraud prevention, and customer protection.",
      "Understand the relationship between regulation, compliance, risk, and product development.",
      "Identify where compliance and risk considerations appear within a user journey.",
      "Understand how fraud and financial risks can affect fintech products.",
      "Recognize when you need to involve compliance, legal, risk, or regulatory teams.",
      "Design a simple product flow while considering regulatory and risk requirements.",
    ],
    activity: [
      p("Design a KYC/KYB Product Flow"),
      p("You will work through a fintech onboarding scenario and determine:"),
      list(
        "Where should verification happen?",
        "What information is required?",
        "What happens when verification fails?",
        "How does this affect the user experience?",
      ),
    ],
    deliverable: [p("Compliance & Risk Journey Map")],
  },
  {
    week: 6,
    title: "Fintech Business Models, Metrics & Data",
    outcomes: [
      "Understand how fintech companies make money.",
      "Identify common fintech revenue and business models.",
      "Understand the difference between product, business, operational, and risk metrics.",
      "Identify important metrics across payments, wallets, banking, and lending products.",
      "Understand how transaction volume, revenue, retention, success rates, default, fraud, and other metrics can indicate product performance.",
      "Analyze basic fintech data to identify product problems and opportunities.",
      "Turn data into actionable product insights.",
    ],
    activity: [
      p("Turn Fintech Data Into Product Insights"),
      p("You will work with a simple fintech dataset or dashboard."),
      p("For example:"),
      p(
        "Payment attempts increased by 30%, but successful transactions dropped by 15%.",
      ),
      p("You'll investigate:"),
      list(
        "What happened?",
        "Why might it have happened?",
        "What would you investigate?",
      ),
    ],
    deliverable: [p("Fintech Metrics Analysis + Product Insight")],
  },
  {
    week: 7,
    title: "Building & Managing Fintech Products",
    outcomes: [
      "Understand your role as a Product Manager in fintech.",
      "Apply product discovery and problem-solving principles to fintech products.",
      "Identify and prioritize customer problems within a fintech context.",
      "Balance customer needs, business goals, technology, operations, risk, and regulation.",
      "Understand how fintech PMs work with Engineering, Design, Operations, Compliance, Risk, Legal, and external partners.",
      "Define a fintech product problem and develop an MVP solution.",
      "Create a simple product plan from problem discovery to launch.",
    ],
    activity: [
      p("Solve a Fintech Product Case"),
      p(
        "Scenario: A fintech company wants to increase successful transactions among small businesses.",
      ),
      p("You will:"),
      list(
        "Understand the problem",
        "Identify users",
        "Analyse the current journey",
        "Identify pain points",
        "Propose solutions",
        "Prioritize features",
        "Define success metrics",
        "Consider risk and compliance",
        "Present your recommendation",
      ),
    ],
    deliverable: [p("Fintech Product Brief")],
  },
  {
    week: 8,
    title: "Emerging Fintech & Product Strategy",
    outcomes: [
      "Understand emerging fintech models and how they are changing financial services.",
      "Understand the basic concepts behind embedded finance and open banking.",
      "Understand how fintech products can be delivered through APIs and platforms.",
      "Understand the basics of cross-border payments and multi-currency products.",
      "Understand the role of stablecoins and blockchain in modern financial products at a foundational level.",
      "Understand how AI is being applied across fintech products and operations.",
      "Identify opportunities and challenges created by emerging fintech technologies.",
      "Evaluate an emerging fintech opportunity from a Product Manager's perspective.",
    ],
    activity: [
      p('"Should We Build This?"'),
      p("You will assess an emerging fintech opportunity such as:"),
      list(
        "Embedded finance",
        "Open banking",
        "Cross-border payments",
        "Stablecoin payments",
        "AI-powered financial products",
      ),
      p("Using:"),
      list(
        "Problem → Users → Opportunity → Business Value → Risks → Feasibility → MVP",
      ),
    ],
    deliverable: [p("Emerging Fintech Opportunity Assessment")],
  },
  {
    week: 9,
    title: "Capstone Discovery & Product Definition",
    outcomes: [
      "Select and define a fintech problem.",
      "Identify and define your target customer.",
      "Conduct basic problem discovery and research.",
      "Develop a clear problem statement.",
      "Analyse the existing experience or product.",
      "Map the user journey.",
      "Analyse competitors and alternatives.",
      "Define the product opportunity.",
      "Define your MVP scope.",
      "Identify relevant financial, operational, regulatory, and risk considerations.",
      "Define success metrics.",
    ],
    activity: [p("Capstone Discovery & Product Definition")],
    deliverable: [
      p(
        "Problem Statement + Research + User Journey + Product Opportunity + MVP Scope",
      ),
    ],
  },
  {
    week: 10,
    title: "Capstone Solution & Presentation",
    outcomes: [
      "Develop a product solution to a fintech problem.",
      "Create an end-to-end product flow.",
      "Define key product features.",
      "Create basic wireframes or prototypes.",
      "Define success metrics.",
      "Identify technical and integration dependencies.",
      "Consider risk and compliance requirements.",
      "Develop your product strategy.",
      "Present and defend your product solution to a panel of fintech professionals.",
    ],
    activity: [p("Capstone Solution & Presentation")],
    deliverable: [
      p("Fintech Product Case Study / Portfolio Project"),
      p(
        "A complete piece of product work that demonstrates how you approached a real fintech problem-from problem discovery and research to product definition, solution, strategy and presentation.",
      ),
    ],
  },
];

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 mb-3">
      <span className="mt-1.25 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#FFBB1D]" />
      <span className="text-sm leading-[19.6px]">{children}</span>
    </li>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((b, i) =>
        b.type === "p" ? (
          <p key={i}>{b.text}</p>
        ) : (
          <ul key={i} className="space-y-2">
            {b.items.map((it) => (
              <Bullet key={it}>{it}</Bullet>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-3 text-[12px] font-semibold uppercase  text-[#FFBB1D]">
      {children}
    </h4>
  );
}

function WeekCard({
  item,
  open,
  onToggle,
}: {
  item: Week;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `week-panel-${item.week}`;

  return (
    <div
      style={{ order: item.week }}
      className="rounded-2xl border-[1.5px] lg:w-140 border-[#FFBB1D] bg-[#5818D0] text-white shadow-[0_8px_24px_0_rgba(229,193,88,0.04)]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 px-8 pt-8 text-left"
      >
        <span className="block flex-1">
          <span className="block text-[12px] font-bold uppercase  text-[#FFBB1D]">
            Week {item.week}
          </span>
          <span className="mt-1.5 block text-base  font-semibold leading-[28.6px] ">
            {item.title}
          </span>
        </span>
        <ChevronDown
          className={`mt-5 h-4 w-4 shrink-0 text-[#FFBB1D] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <span
        className={`mx-8 block h-px bg-white transition-all duration-300 ${
          open ? "my-6" : "mb-2 mt-8"
        }`}
      />
      {/* Smooth height animation without measuring */}
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-6 px-5 pb-6 pt-2 text-[13px] leading-relaxed text-white/90">
            <div>
              <Label>Learning Outcomes</Label>
              <ul className="space-y-2.5">
                {item.outcomes.map((o) => (
                  <Bullet key={o}>{o}</Bullet>
                ))}
              </ul>
            </div>

            <div>
              <Label>Practical Activity</Label>
              <Blocks blocks={item.activity} />
            </div>

            <div>
              <Label>Evidence / Deliverable</Label>
              <Blocks blocks={item.deliverable} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CurriculumSection() {
  const [openWeek, setOpenWeek] = useState<number | null>(null);

  return (
    <section className="bg-white px-4 py-20 md:px-10 lg:px-14 lg:py-40">
      <div className="mx-auto max-w-275">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="md:text-sm text-[12px]  md:font-semibold font-medium tracking-[1.613px] leading-[17.28px] uppercase text-[#5818D0]">
              Curriculum
            </p>
            <h2 className="md:mt-4 text-[20px] md:w-110 tracking-[-1.134px] font-semibold md:font-bold md:leading-[43.47px] leading-normal text-[#0E0A1A] md:text-[30.8px]">
              What You&apos;ll Learn
            </h2>
          </div>
          <p className="md:w-120 md:text-[15px] text-[12px] md:leading-6 leading-4 text-[#525252]">
            A comprehensive 10-week program engineered to transform product
            managers into technical, domain-expert leaders in fintech.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
          {[
            WEEKS.filter((w) => w.week % 2 === 1),
            WEEKS.filter((w) => w.week % 2 === 0),
          ].map((column, i) => (
            <div
              key={i}
              className="contents md:flex md:flex-1 md:flex-col md:gap-4"
            >
              {column.map((item) => (
                <WeekCard
                  key={item.week}
                  item={item}
                  open={openWeek === item.week}
                  onToggle={() =>
                    setOpenWeek(openWeek === item.week ? null : item.week)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
