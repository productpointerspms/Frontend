import Link from "next/link";
import { ChevronDown } from "lucide-react";
import styles from "./coaching.module.css";

const questions = [
  { question: "Who is the one-on-one Coaching for?", answer: "Coaching is for people seeking personalised guidance for their Product career, working through a specific Product Management challenge, looking for feedback, or planning a transition into Product Management." },
  { question: "What can I discuss during a Coaching session?", answer: "Bring your Product career questions, strategy challenges, portfolio or project work, interview preparation, or decisions you would like a Product professional’s perspective on." },
  { question: "What happens after I book?", answer: "Submit your request through the coaching application page. Contact the team to confirm your coach’s availability, session arrangements, and next steps." },
  { question: "How should I prepare for my session?", answer: "Come with a clear goal, the questions you want to discuss, and relevant work or context. Think about the challenge you want to address and what you hope to leave with." },
  { question: "How is PPCP different from other programs?", answer: "PPCP gives you focused one-on-one time with a Product professional around your own goals and challenges. Explore the other ProductPointers programs if you’re looking for a structured learning journey." },
];

export default function CoachingFAQ() {
  return (
    <section data-ppcp-section="CoachingFAQ" className={`${styles.section} ${styles.faq}`} aria-labelledby="coaching-faq-title">
      <div className={`${styles.container} ${styles.faqGrid}`}>
        <div><p className={styles.eyebrow}>FAQ</p><h2 id="coaching-faq-title" className={styles.heading}><span className={styles.desktopFAQTitle}>Everything You<br />Need to Know.</span><span className={styles.mobileFAQTitle}>Questions We Hear Most Often</span></h2><div className={styles.faqContact}><h3>Still have a question?</h3><p>If your question is not answered here, reach out using our contact page. We’re happy to help you figure out if PPCP is the right fit.</p><Link href="/contact" className={styles.button}>Send Message</Link></div></div>
        <div className={styles.faqList}>{questions.map(item => <details key={item.question} className={styles.faqItem} name="coaching-faq"><summary>{item.question}<ChevronDown size={20} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
      </div>
    </section>
  );
}
