"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./ppmp.module.css";

type Session = {
  tab: string;
  title: string;
  tagline: string;
  theme?: "purple";
  intro: string[];
  groups: { title?: string; skills: string[] }[];
  aside: { label: string; lead: string; flow?: string; notes: string[] };
};

const sessions: Session[] = [
  { tab: "AI-Powered PM", title: "AI-Powered Product Management", tagline: "Work smarter. Think faster. Prototype earlier.", intro: ["AI can change how Product Managers research, think, communicate and execute."], groups: [{ skills: ["Build AI-powered PM workflows", "Write better prompts for product work", "Use AI for product discovery and research", "Synthesize user research and feedback", "Use AI for PRDs and product strategy", "Analyse product information with AI", "Generate and challenge product hypotheses", "Rapidly prototype ideas using AI tools", "Evaluate AI-powered features and products", "Know where human judgement is still essential"] }], aside: { label: "Practical application", lead: "Take a real product problem through:", flow: "Discovery → Idea → PRD → Prototype → Validation", notes: ["You’ll leave knowing how to use AI as a PM — not just talk about AI."] } },
  {
    tab: "Technical PM", title: "Technical Product Management", tagline: "Stop seeing Engineering as a black box.", theme: "purple",
    intro: ["You don’t need to become a developer.", "But understanding how your product works behind the interface helps you ask better questions, understand constraints and make better product decisions."],
    groups: [{ skills: ["How modern software products are built", "Frontend vs backend", "APIs and how they work", "Reading API documentation", "HTTP methods and status codes", "Requests, responses and JSON", "API authentication", "CRUD", "Databases and data relationships", "How data moves through a product", "System architecture fundamentals", "Third-party integrations", "Technical dependencies and constraints", "Technical debt", "Working effectively with engineers"] }],
    aside: { label: "Hands-on", lead: "Postman/API Testing + Product Architecture Mapping", notes: ["You’ll interact with APIs and map how a product works behind the interface.", "You’ll leave better equipped to ask technical questions, understand constraints and make informed trade-offs."] },
  },
  { tab: "Data", title: "Data, Analytics & Growth", tagline: "Go beyond dashboards. Understand the story.", intro: ["Use product data to understand behaviour, find opportunities and design experiments."], groups: [{ skills: ["Define meaningful product metrics", "Create an event-tracking plan", "Analyse activation and conversion funnels", "Understand retention and cohorts", "Identify drop-offs and opportunities", "Design and evaluate growth experiments"] }], aside: { label: "Practical application", lead: "Take a real product problem through:", flow: "Tracking plan → Funnel analysis → Insight → Growth experiment", notes: ["Use evidence to explain what changed and what to do next."] } },
  { tab: "Product Quality", title: "Product Quality, Fintech & Risk", tagline: "Build confidence in the products you ship.", intro: ["Understand product quality, financial journeys and the risks behind product decisions."], groups: [{ skills: ["Map critical user journeys", "Write practical test scenarios", "Test a feature and report bugs", "Prioritise defects by severity and impact", "Understand payments and fintech concepts", "Evaluate launch readiness and product risk"] }], aside: { label: "Practical application", lead: "Take a real product problem through:", flow: "Test a journey → Report defects → Assess risk → Recommend a release decision", notes: ["Collaborate with QA and business teams with greater confidence."] } },
  { tab: "Strategy", title: "Product Strategy & Leadership", tagline: "Make the decision. Defend the trade-off.", intro: ["Connect user needs, technical constraints and business goals to a clear product direction."], groups: [{ skills: ["Frame product opportunities", "Connect strategy to outcomes", "Prioritise competing opportunities", "Evaluate trade-offs", "Communicate decisions to stakeholders", "Lead across functions without authority"] }], aside: { label: "Practical application", lead: "Take a real product problem through:", flow: "Product problem → Options → Trade-offs → Recommendation → Defence", notes: ["Leave with a clearer approach to product judgement and leadership."] } },
];
export default function Curriculum() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const session = sessions[active];
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % sessions.length;
    else if (event.key === "ArrowLeft") next = (index + sessions.length - 1) % sessions.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = sessions.length - 1;
    else return;
    event.preventDefault(); setActive(next); tabs.current[next]?.focus();
  }
  return <section className={styles.section} id="curriculum"><div className={styles.container}>
    <p className={styles.eyebrow}>What you will be learning</p><h2>Five areas that can change how you<br /> operate as a PM.</h2>
    <p className={styles.intro}>Each mastery session goes beyond theory. You’ll learn the concepts, apply them to product problems and use the tools involved in the work.</p>
    <div className={styles.curriculum} data-theme={session.theme}>
      <div className={styles.tabs} role="tablist" aria-label="Mastery sessions">{sessions.map((item, index) => <button key={item.tab} ref={el => { tabs.current[index] = el; }} type="button" role="tab" id={`mastery-tab-${index}`} aria-controls="mastery-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onKeyDown={event => navigate(event, index)} onClick={() => setActive(index)}><strong>0{index + 1}</strong>{item.tab}</button>)}</div>
      <div className={styles.session} role="tabpanel" id="mastery-panel" aria-labelledby={`mastery-tab-${active}`} tabIndex={0}>
        <div className={styles.sessionGrid}><div><div className={styles.sessionTitle}><span>0{active + 1}</span><div><p>Mastery session 0{active + 1}</p><h3>{session.title}</h3></div></div><p className={styles.tagline}>{session.tagline}</p>{session.intro.map(paragraph => <p key={paragraph} className={styles.sessionIntro}>{paragraph}</p>)}<h4>You’ll learn how to:</h4><div className={styles.skillGroups}>{session.groups.map((group, groupIndex) => <div key={group.title ?? groupIndex}>{group.title && <h5>{group.title}</h5>}<ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>)}</div></div><aside><h4>{session.aside.label}</h4><p className={styles.asideLead}>{session.aside.lead}</p>{session.aside.flow && <strong>{session.aside.flow}</strong>}<div className={styles.asideNotes}>{session.aside.notes.map(note => <p key={note}>{note}</p>)}</div></aside></div>
        <div className={styles.progress} aria-hidden="true">{sessions.map((item, index) => <span key={item.tab} data-active={index <= active} />)}</div>
      </div>
    </div>
  </div></section>;
}
