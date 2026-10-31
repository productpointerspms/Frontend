import Image from "next/image";
import styles from "./why-fintech.module.css";

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
    <section className={styles.section} aria-labelledby="why-fintech-title">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Why Fintech Product Management</p>
          <h2 id="why-fintech-title" className={styles.heading}>Fintech isn’t just tech. It’s<br className={styles.desktopBreak} /> trust, regulation, and money.</h2>
          <div className={styles.description}>
            <p>You can be a good Product Manager and still struggle with fintech.</p>
            <p>You know how to write user stories.</p>
            <p>You understand discovery.</p>
            <p>You can work with designers and engineers.</p>
            <p>But when someone starts talking about: settlement, reconciliation, KYC, AML, payment failures, ledgers, fraud, risk, authorization, APIs or transaction lifecycles, you suddenly realise there is another layer to Product Management.</p>
          </div>
          <dl className={styles.rows}>{rows.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.text}</dd></div>)}</dl>
          <p className={styles.closing}>That’s what this program is designed to help you understand.</p>
        </div>
        <div className={styles.photo}><Image src="/images/ppfp/fintech.png" alt="Product manager taking notes at a laptop" width={519} height={658} sizes="(min-width: 1440px) 519px, (min-width: 1024px) 38vw, (min-width: 768px) 45vw, 100vw" /></div>
      </div>
    </section>
  );
}
