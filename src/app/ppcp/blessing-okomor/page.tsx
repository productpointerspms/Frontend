import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, UserRoundCheck } from "lucide-react";
import CoachingOptions from "@/components/ppcp/CoachingOptions";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "Coaching with Blessing Okomor",
  description: "Get practical Product Management guidance from Blessing Okomor. Explore a one-hour session or ongoing coaching.",
  alternates: { canonical: "/ppcp/blessing-okomor" },
};

export default function MentorProfilePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="mentor-name">
        <div className={styles.photo}>
          <Image src="/images/homepage/blessing.jpeg" alt="Blessing Okomor" fill priority sizes="(max-width: 760px) 100vw, 30vw" />
        </div>
        <div className={styles.profile}>
          <h1 id="mentor-name">Blessing Okomor</h1>
          <p className={styles.role}>Product Manager, Mainstack</p>
          <div className={styles.credentials}>
            <span className={styles.verified}><BadgeCheck size={16} aria-hidden="true" />Verified by ProductPointers</span>
            <span>3+ Years of Experience</span>
          </div>
          <div className={styles.expertise}>
            <h2><UserRoundCheck size={22} aria-hidden="true" />EXPERTISE</h2>
            <p>Blessing specializes in helping mentees navigate Fintech, Product Strategy and Growth challenges with practical guidance and real-world context.</p>
            <ul>{["Fintech", "Product Strategy", "Growth"].map(area => <li key={area}>{area}</li>)}</ul>
          </div>
          <a href="#coaching-options" className={styles.primary}>Choose a Coaching Option</a>
        </div>
      </section>

      <section className={styles.about} aria-labelledby="about-mentor">
        <div>
          <p className={styles.eyebrow}>BEHIND THE EXPERIENCE</p>
          <h2 id="about-mentor">About the mentor</h2>
          <p className={styles.intro}>A journey from Accounting, Business and Entrepreneurship into Product Management.</p>
        </div>
        <div className={styles.biography}>
          <p>My journey into Product Management didn’t begin in tech.<br />I came from a background in Accounting, business and entrepreneurship. Like many people trying to find their way into a new career, I had to learn, ask questions, figure things out and find opportunities to gain experience.<br />Along the way, I saw something that kept repeating itself:<br />There are talented people with the potential to succeed in Product Management, but too many don’t know where to start, how to gain practical experience or how to prove what they can do.<br />That belief became ProductPointers.<br />Today, we’re building more than a place to learn Product Management. We’re creating pathways for people to develop real skills, gain practical experience, build evidence of their work and confidently pursue opportunities.<br />Because sometimes, all someone needs is the right guidance, the right opportunity and someone who believes they can get there.</p>
          <p>That journey now informs her mission: helping others build practical skills, gain experience and find their path in Product Management with confidence.</p>
          <h3>What she can help you explore</h3>
          <p className={styles.explore}>Bring questions about finding your path in Product Management, building practical skills and gaining experience. Her areas of expertise are Fintech, Product Strategy and Growth.</p>
        </div>
      </section>
      <CoachingOptions />
    </div>
  );
}
