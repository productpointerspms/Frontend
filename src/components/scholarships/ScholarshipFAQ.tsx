import { ChevronDown } from "lucide-react";
import { ScholarshipButton, SectionHeading } from "./ScholarshipUI";
import styles from "./scholarships.module.css";

const questions = [
  { question: "Who can apply?", answer: "Eligibility varies by scholarship. Check the requirements for your chosen opportunity, including program commitment and any financial support criteria, before applying." },
  { question: "What scholarships are currently available?", answer: "Contact the ProductPointers team for current scholarship openings, application deadlines, and the programs they support." },
  { question: "How much tuition does the scholarship cover?", answer: "Tuition coverage varies by scholarship and program. Each scholarship listing clearly states the amount covered and the remaining tuition payable by the recipient." },
  { question: "Do I pay anything?", answer: "Check the specific scholarship details for any remaining tuition or associated costs. Ask our team to confirm the full payment breakdown before you commit." },
  { question: "Can I apply for more than one scholarship?", answer: "Application rules depend on the opportunity. Contact the team to confirm whether you can apply for multiple scholarships." },
  { question: "What happens after I apply?", answer: "Follow the application instructions for your chosen scholarship. The team can explain the review process, any next steps, and when you can expect an update." },
  { question: "How are recipients selected?", answer: "Applications are reviewed against the eligibility and selection criteria for the scholarship. Review those criteria and provide the information requested in your application." },
  { question: "Can I apply if I’m outside Nigeria?", answer: "Location requirements vary by scholarship and program. Check the specific opportunity or contact our team to confirm eligibility from your country." },
  { question: "Can I sponsor a learner?", answer: "Yes. Explore the Supporter, Champion, and Partner tiers above, then get in touch to discuss the learner or program you would like to support." },
  { question: "Can organizations sponsor multiple learners?", answer: "The Partner tier supports multiple scholarship places or a named scholarship under your organisation’s brand. Contact the team to discuss the structure and contribution." },
];

export default function ScholarshipFAQ() {
  return <section className={`${styles.container} ${styles.faq}`} aria-labelledby="scholarship-faq-title"><div className={styles.faqIntro}><SectionHeading eyebrow="FAQ" title={<span id="scholarship-faq-title"><span className={styles.desktopFAQTitle}>Everything You<br />Need to Know.</span><span className={styles.mobileFAQTitle}>Questions We Hear Most Often</span></span>} /><div className={styles.faqContact}><h3>Still have a question?</h3><p>If your question is not answered here, reach out. We’re happy to help you find the right scholarship or sponsorship option.</p><ScholarshipButton href="/contact">Send Message</ScholarshipButton></div></div><div className={styles.faqList}>{questions.map(item => <details key={item.question} className={styles.faqItem} name="scholarship-faq"><summary>{item.question}<ChevronDown size={20} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>;
}
