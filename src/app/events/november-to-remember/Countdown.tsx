"use client";

import { useEffect, useState } from "react";
import { Hourglass } from "lucide-react";
import styles from "./event.module.css";

const startsAt = Date.parse("2026-11-07T19:00:00+01:00");

export default function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, startsAt - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const seconds = remaining === null ? null : Math.floor(remaining / 1000);
  const values = seconds === null ? [null, null, null, null] : [
    Math.floor(seconds / 86400),
    Math.floor((seconds % 86400) / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ];

  return (
    <div className={styles.countdown}>
      <p><Hourglass size={19} aria-hidden="true" /> {remaining === 0 ? "The career conversations have started" : "Your Career Countdown"}</p>
      <div className={styles.timer} role="timer" aria-label="Time until November to Remember">
        {values.map((value, index) => (
          <div key={index}><strong>{value === null ? "––" : String(value).padStart(2, "0")}</strong><span>{["Days", "Hours", "Mins", "Secs"][index]}</span></div>
        ))}
      </div>
      <a href="#tickets" className={styles.goldButton}>Get your Ticket</a>
    </div>
  );
}
