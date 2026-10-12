import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import styles from "./coaching.module.css";

export type Coach = {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  expertise: string[];
  bio: string;
  price: number;
};

export default function CoachCard({ coach }: { coach: Coach }) {
  return (
    <article className={styles.coachCard} aria-labelledby={`coach-${coach.id}`}>
      <div className={styles.coachPhoto}>
        <Image src={coach.image} alt={coach.name} fill sizes="(max-width: 760px) 90vw, 34vw" className={styles.cover} />
      </div>
      <div className={styles.coachCopy}>
        <h3 id={`coach-${coach.id}`}>{coach.name}</h3>
        <p className={styles.coachRole}>{coach.role}</p>
        <span className={styles.experience}><BadgeCheck size={13} aria-hidden="true" />{coach.experience}</span>
        <div className={styles.expertise}><p>Areas of expertise</p><ul>{coach.expertise.map(area => <li key={area}>{area}</li>)}</ul></div>
        <p className={styles.coachBio}>{coach.bio}</p>
        <div className={styles.sessionPrice}><span>1-hour session</span><strong>₦{coach.price.toLocaleString("en-NG")}</strong></div>
        <Link href={`/ppcp/apply?coach=${encodeURIComponent(coach.name)}`} className={styles.button}>Book a Session <ArrowRight size={19} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
