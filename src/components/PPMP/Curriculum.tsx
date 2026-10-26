"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./ppmp.module.css";

const sessions = [
  { tab: "AI-Powered PM", title: "AI-Powered Product Management", tagline: "Work smarter. Think faster. Prototype earlier.", description: "AI can change how Product Managers research, think, communicate and execute.", skills: ["Build AI-powered PM workflows", "Write better prompts for product work", "Use AI for product discovery and research", "Synthesize user research and feedback", "Use AI for PRDs and product strategy", "Analyse product information with AI", "Generate and challenge product hypotheses", "Rapidly prototype ideas using AI tools", "Evaluate AI-powered features and products", "Know where human judgement is still essential"], application: "Discovery → Idea → PRD → Prototype → Validation", takeaway: "You’ll leave knowing how to use AI as a PM — not just talk about AI." },
  { tab: "Technical PM", title: "Technical Product Management", tagline: "Understand what happens behind the interface.", description: "Build the technical fluency to work more confidently with engineering teams.", skills: ["Understand APIs and integrations", "Read API documentation", "Explore requests, responses and authentication", "Understand system dependencies", "Ask better technical questions", "Make informed technical trade-offs"], application: "Explore an API → Send requests → Test responses → Document findings", takeaway: "Turn technical conversations into better product decisions." },
  { tab: "Data", title: "Data, Analytics & Growth", tagline: "Go beyond dashboards. Understand the story.", description: "Use product data to understand behaviour, find opportunities and design experiments.", skills: ["Define meaningful product metrics", "Create an event-tracking plan", "Analyse activation and conversion funnels", "Understand retention and cohorts", "Identify drop-offs and opportunities", "Design and evaluate growth experiments"], application: "Tracking plan → Funnel analysis → Insight → Growth experiment", takeaway: "Use evidence to explain what changed and what to do next." },
  { tab: "Product Quality", title: "Product Quality, Fintech & Risk", tagline: "Build confidence in the products you ship.", description: "Understand product quality, financial journeys and the risks behind product decisions.", skills: ["Map critical user journeys", "Write practical test scenarios", "Test a feature and report bugs", "Prioritise defects by severity and impact", "Understand payments and fintech concepts", "Evaluate launch readiness and product risk"], application: "Test a journey → Report defects → Assess risk → Recommend a release decision", takeaway: "Collaborate with QA and business teams with greater confidence." },
  { tab: "Strategy", title: "Product Strategy & Leadership", tagline: "Make the decision. Defend the trade-off.", description: "Connect user needs, technical constraints and business goals to a clear product direction.", skills: ["Frame product opportunities", "Connect strategy to outcomes", "Prioritise competing opportunities", "Evaluate trade-offs", "Communicate decisions to stakeholders", "Lead across functions without authority"], application: "Product problem → Options → Trade-offs → Recommendation → Defence", takeaway: "Leave with a clearer approach to product judgement and leadership." },
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
    <div className={styles.curriculum}>
      <div className={styles.tabs} role="tablist" aria-label="Mastery sessions">{sessions.map((item, index) => <button key={item.tab} ref={el => { tabs.current[index] = el; }} type="button" role="tab" id={`mastery-tab-${index}`} aria-controls="mastery-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onKeyDown={event => navigate(event, index)} onClick={() => setActive(index)}><strong>0{index + 1}</strong>{item.tab}</button>)}</div>
      <div className={styles.session} role="tabpanel" id="mastery-panel" aria-labelledby={`mastery-tab-${active}`} tabIndex={0}>
        <div className={styles.sessionGrid}><div><div className={styles.sessionTitle}><span>0{active + 1}</span><div><p>Mastery session 0{active + 1}</p><h3>{session.title}</h3></div></div><p className={styles.tagline}>{session.tagline}</p><p>{session.description}</p><h4>You’ll learn how to:</h4><ul>{session.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div><aside><h4>Practical application</h4><p>Take a real product problem through:</p><strong>{session.application}</strong><p>{session.takeaway}</p></aside></div>
        <div className={styles.progress} aria-hidden="true">{sessions.map((item, index) => <span key={item.tab} data-active={index === active} />)}</div>
      </div>
    </div>
  </div></section>;
}
