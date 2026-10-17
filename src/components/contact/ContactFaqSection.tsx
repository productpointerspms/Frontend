import Link from "next/link";
import { ChevronDown } from "lucide-react";
import styles from "./contact.module.css";

const faqData = [
  {
    question: "Who is ProductPointers for?",
    answer:
      "ProductPointers is designed for aspiring Product Managers, career switchers and early-career Product professionals. Whether you're trying to break into Product Management, gain practical experience or strengthen your Product skills, we have different learning paths designed to meet you where you are.",
  },
  {
    question: "Which ProductPointers program is right for me?",
    answer:
      "The right program depends on your current experience, career goals and the type of support you need. Our learning paths cover mentorship, practical experience, internships and specialization tracks.",
  },
  {
    question: "Do I need a background in Tech or Product Management to apply?",
    answer:
      "No. ProductPointers supports both beginners and people transitioning from other career paths. You can start without prior Product Management or technical experience.",
  },
  {
    question: "Will I get practical experience, or is it just classroom learning?",
    answer:
      "Our programs are designed to combine structured learning with practical exercises, projects and real-world Product Management scenarios so you can build hands-on experience.",
  },
  {
    question: "Are scholarships or sponsorship opportunities available?",
    answer:
      "Scholarship and sponsorship opportunities may be available for selected programs. Availability can vary, so we recommend checking the specific program details or contacting the ProductPointers team.",
  },
  {
    question: "What happens after I complete a ProductPointers program?",
    answer:
      "After completing a program, you can continue building your portfolio, pursue more advanced learning tracks and apply your new skills to internships, entry-level roles and practical Product opportunities.",
  },
];

export default function ContactFaqSection() {
  return <section className={styles.faqSection} aria-labelledby="contact-faq-title"><div className={styles.faqGrid}><div><p className={styles.overline}>FAQ</p><h2 id="contact-faq-title">Questions We Hear<br />Most Often</h2><div className={styles.stillQuestion}><h3>Still have a question?</h3><p>Can’t find an answer to your question? Send us a message and we will get back to you as soon as possible.</p><Link href="#contact-message-form" className={styles.primary}>Send Message</Link></div></div><div className={styles.faqList}>{faqData.map((faq, index) => <details key={faq.question} name="contact-faq" open={index === 0}><summary>{faq.question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}
