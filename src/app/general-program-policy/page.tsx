import type { Metadata } from "next";
import styles from "./policy.module.css";

export const metadata: Metadata = {
  title: "General Program Policy",
  description: "ProductPointers general program policy covering refunds, scholarships and deferment across programs, cohorts and learning offerings.",
  alternates: { canonical: "/general-program-policy" },
};

const sections = [
  {
    title: "Purpose Of This Policy",
    text: "This General Program Policy establishes the standard rules governing refunds, scholarships and deferment across ProductPointers programs. It is intended to ensure that prospective and enrolled participants understand these terms before making payment, accepting a program place or commencing participation. This policy applies to ProductPointers programs, cohorts, mentorships, apprenticeships and other paid learning offerings unless a specific program agreement expressly provides otherwise.",
  },
  {
    title: "Refund Policy",
    text: "Payment toward a ProductPointers program confirms the participant’s intention to secure a place and supports the resources, coordination, facilitation, administration and other activities required to deliver the program.",
    points: [
      "Payments are generally non-refundable once a participant’s place has been confirmed.",
      "This applies where a participant voluntarily withdraws, becomes inactive, is unable to continue or complete the program, or is removed for violating applicable program rules.",
      "Participants are expected to review the program details, payment terms and this policy carefully before making payment.",
      "Any exception to the general non-refundable policy must be expressly approved by ProductPointers in writing.",
      "Where ProductPointers approves an exception, the applicable refund amount and process will be communicated to the participant in writing.",
      "Removal from a program because of misconduct, persistent non-participation or breach of program requirements does not create an automatic entitlement to a refund.",
    ],
  },
  {
    title: "Scholarship Policy",
    text: "ProductPointers may offer scholarships for selected programs or cohorts. Scholarship availability, eligibility criteria, award amounts and payment requirements may vary by program or scholarship opportunity.",
    points: [
      "A scholarship is awarded to the approved participant only and is not transferable to another person.",
      "A scholarship does not automatically mean that participation is free. Where a balance remains after the scholarship award, the participant is responsible for paying the approved balance within the agreed timeline.",
      "Scholarship recipients remain subject to all program requirements, including attendance, participation, assessments, conduct, deadlines and other applicable obligations.",
      "ProductPointers may request information or documentation to verify scholarship eligibility.",
      "Failure to provide accurate information or meet agreed scholarship conditions may result in withdrawal of the scholarship or restriction of continued participation.",
      "A scholarship does not create an entitlement to a cash alternative or refund unless ProductPointers expressly approves otherwise in writing.",
      "Scholarship terms communicated for a specific program or cohort form part of the applicable program agreement.",
    ],
  },
  {
    title: "Deferment Policy",
    text: "Deferment means an approved move from a participant’s current program or cohort to a future cohort or program offering. Deferment is not automatic and may not be available for every ProductPointers program.",
    points: [
      "A participant who wishes to defer must submit a written request to ProductPointers stating the reason for the request and, where applicable, the preferred future cohort.",
      "Deferment requests should be made as early as possible and before the relevant program or cohort deadline.",
      "Deferment is generally considered for serious or genuinely unforeseen circumstances. Approval remains at the sole discretion of ProductPointers.",
      "Submitting a deferment request does not guarantee approval.",
      "An approved deferment does not create an entitlement to a refund of amounts already paid.",
      "Where deferment is approved, the participant may be required to join a future cohort under the terms, structure and prevailing fee applicable to that cohort.",
      "Where the applicable fee for the future cohort is higher than the amount previously paid, the participant may be required to pay the difference before joining.",
      "ProductPointers may place reasonable limits on deferment, including the period within which a deferred participant must resume participation.",
      "Programs that do not permit deferment will be governed by the specific terms communicated for that program.",
    ],
  },
  {
    title: "Program - Specific Terms",
    text: "This policy establishes the general ProductPointers position on refunds, scholarships and deferment. A specific program may have additional terms relating to payment plans, scholarship eligibility, deferment windows, cohort changes or other administrative requirements. Where a specific written program agreement contains a more specific provision, that provision will apply to the relevant program or cohort.",
  },
  {
    title: "Participant Acknowledgement",
    text: "By making payment, accepting a program place, signing a program agreement or otherwise confirming participation, the participant acknowledges that they have had the opportunity to read and understand this General Program Policy and agree to be bound by the applicable terms.",
  },
  {
    title: "Effective Date",
    text: "This General Program Policy is effective from 17th October, 2026 and applies to ProductPointers programs and cohorts from that date, subject to any specific program terms communicated in writing.",
  },
];

export default function GeneralProgramPolicyPage() {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <h1>ProductPointers General Program Policy</h1>
        <p className={styles.topics}>Refund · Scholarship · Deferment</p>
        <p className={styles.description}>Applicable to ProductPointers programs, cohorts and learning offerings</p>
      </header>
      <div className={styles.content}>
        <ol className={styles.sections}>
          {sections.map(section => (
            <li key={section.title}>
              <section aria-labelledby={section.title.toLowerCase().replaceAll(/[^a-z]+/g, "-")}>
                <h2 id={section.title.toLowerCase().replaceAll(/[^a-z]+/g, "-")}>{section.title}</h2>
                <p>{section.text}</p>
                {section.points && <ul>{section.points.map(point => <li key={point}>{point}</li>)}</ul>}
              </section>
            </li>
          ))}
          <li>
            <section aria-labelledby="authorization">
              <h2 id="authorization">Authorization</h2>
              <div className={styles.authorization}>
                <dl>
                  <div><dt>Name:</dt><dd>Blessing Okomor</dd></div>
                  <div><dt>Position:</dt><dd>Founder / Authorized Representative</dd></div>
                  <div><dt>Signature:</dt><dd>Blessing Okomor</dd></div>
                </dl>
                <dl>
                  <div><dt>Policy Owner:</dt><dd>ProductPointers</dd></div>
                  <div><dt>Status:</dt><dd>Active</dd></div>
                  <div><dt>Applies To:</dt><dd>ProductPointers Programs And Cohorts</dd></div>
                  <div><dt>Date:</dt><dd><time dateTime="2026-10-17">17th October, 2026</time></dd></div>
                  <div><dt>Effective Date:</dt><dd><time dateTime="2026-10-17">17th October, 2026</time></dd></div>
                </dl>
              </div>
            </section>
          </li>
        </ol>
      </div>
    </article>
  );
}
