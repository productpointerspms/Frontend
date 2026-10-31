import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, MapPin, Check, ChevronDown, Crown } from "lucide-react";
import Countdown from "./Countdown";
import { NOVEMBER_EVENT_SLUG, TIER_STATUS_LABEL, formatEventDate, formatMoney, type EventDetails } from "@/lib/event";
import { fetchEvent } from "@/lib/eventApi.server";
import styles from "./event.module.css";

export const metadata: Metadata = {
  title: "November to Remember — The Product Career Activation Series",
  description: "Four Saturdays. Real conversations about getting hired, getting noticed, finding global product opportunities, and staying in the game. November 7–28, 2026.",
  alternates: { canonical: "/events/november-to-remember" },
};

const phases = [
  { name: "POSITION", phase: "Phase One", color: "#5818d0", description: 'Stop presenting as simply “looking for a job.” Align your CV, LinkedIn, and portfolio to tell a cohesive professional value story.', outcome: "CV & Profile Clarity" },
  { name: "GET NOTICED", phase: "Phase Two", color: "#f5a400", description: "Understand what HR professionals and recruiters actually look for during screening and how candidates get shortlisted.", outcome: "Recruiter Mindset" },
  { name: "GO GLOBAL", phase: "Phase Three", color: "#f000d0", description: "Unlock international remote product roles and learn how to ace interviews using structured product thinking and STAR frameworks.", outcome: "Remote Opportunities" },
  { name: "STAY IN THE GAME", phase: "Phase Four", color: "#0082a6", description: "Build emotional resilience to navigate rejection, ghosting, and comparison without burning out or losing confidence.", outcome: "Mental Well-being" },
];

interface Session {
  title: string;
  date: string;
  tone: "gold" | "purple" | "pink" | "indigo";
  description: string;
  topics: [string[], string[]];
  duration?: string;
  hasPanel?: boolean;
  note?: { label: string; text: string };
}

const sessions: Session[] = [
  {
    title: "POSITION (Part 1) - How to Position Yourself for Product Opportunities",
    date: "Saturday, Nov 7 · 7:00 PM WAT",
    tone: "gold",
    description: "Getting a product opportunity is not always about having more qualifications. Sometimes, it is about how clearly you communicate who you are, what you can do, and the kind of opportunities you are ready for.",
    topics: [
      ["Understanding your professional positioning", "Identifying the type of product opportunities you want", "Communicating your value clearly", "Aligning your CV, LinkedIn profile and portfolio", "Turning your experience into a compelling professional story"],
      ["Showing transferable experience when transitioning into Product Management", "Positioning your projects and proof of work", "Avoiding a generic ‘I can do everything’ profile", "How to make your profile communicate the kind of opportunity you are looking for"],
    ],
  },
  {
    title: "Positioning Yourself for Product Opportunities Beyond Your Resume (Part 2)",
    date: "Saturday, Nov 7 · 8:00 PM WAT",
    tone: "purple",
    description: "Not every opportunity comes from submitting an application.\nThis session explores what professionals can do beyond having a good CV — how to become more visible, build credibility, demonstrate expertise and create relationships that can lead to opportunities.",
    topics: [
      ["Building professional visibility", "Personal branding for product professionals", "Showing proof of work", "Using LinkedIn strategically", "Networking without feeling transactional"],
      ["Building meaningful professional relationships", "Leveraging communities and professional networks", "Creating opportunities instead of waiting for job postings", "How recruiters, hiring managers and founders discover talent outside traditional applications"],
    ],
    note: { label: "Note", text: "This session will be held on November 7 if the speaker is available. If not, it will remain scheduled as the December 5 bonus session." },
  },
  {
    title: "GET NOTICED - HR & RECRUITER AMA: What Recruiters Really Look For",
    date: "Saturday, Nov 14 · 7:00 PM WAT",
    tone: "pink",
    description: "Candidates often have questions about what happens after they click ‘Apply’.\nWhat makes a recruiter stop at a CV?\nWhy do some candidates get shortlisted while others don’t?\nDoes LinkedIn really matter?\nHow important are certifications?\nWhat happens when you don’t meet every requirement?\nThis session puts HR and recruitment professionals in the hot seat to answer these questions honestly.",
    topics: [
      ["What recruiters look for when screening CVs", "Common reasons qualified candidates get overlooked", "What makes a CV stand out", "LinkedIn profiles and recruiter searches", "The role of certifications", "Common mistakes candidates make", "Following up after applications and interviews"],
      ["Experience vs potential", "Portfolios and proof of work", "Applying when you don’t meet every requirement", "Referrals and networking", "Cover letters — when they matter and when they don’t", "What recruiters wish candidates understood about hiring"],
    ],
    duration: "60–75 minutes + Q&A",
    hasPanel: true,
    note: { label: "Format", text: "This will be a moderated AMA/panel conversation, followed by audience questions." },
  },
  {
    title: "GO GLOBAL (Part 1) - How to Land Global Remote Product Jobs",
    date: "Saturday, Nov 21 · 7:00 PM WAT",
    tone: "indigo",
    description: "There are product opportunities outside your country, but finding them is only the first step.\nThis session focuses on what it actually takes to position yourself for global remote opportunities and get considered by international employers.",
    topics: [
      ["Where to find global remote product opportunities", "Understanding international job descriptions", "What global employers look for in product candidates", "Positioning yourself when applying from another country", "International CV/resume expectations", "How to create an ATS-friendly resume", "Structuring your resume so recruiters can quickly understand your value"],
      ["Writing a strong, targeted cover letter", "Tailoring your resume and cover letter to specific roles", "Making your experience relevant to international employers", "Common mistakes candidates make when applying for global roles", "How to stand out when competing with candidates from different markets"],
    ],
    hasPanel: true,
  },
  {
    title: "GO GLOBAL (Part 2) - How to Confidently Ace Product Interviews",
    date: "Saturday, Nov 21 · 8:00 PM WAT",
    tone: "indigo",
    description: "Getting the interview is one thing. Knowing how to communicate your value once you’re in the room is another.\nThis session will help participants become more confident and intentional about how they show up during product interviews.",
    topics: [
      ["How to introduce yourself confidently", "How to tell your professional story", "Answering ‘Tell me about yourself’", "Using stories to communicate your experience", "Using the STAR framework effectively", "Talking about your skills without simply listing them", "Communicating impact and outcomes", "Common interview mistakes to avoid"],
      ["How to talk about projects and products you’ve worked on", "Answering product-specific interview questions", "Demonstrating product thinking during interviews", "How to handle questions you don’t immediately know the answers to", "Communicating with confidence without overselling yourself", "How to sell your value naturally", "Questions candidates should ask interviewers"],
    ],
    hasPanel: true,
  },
  {
    title: "STAY IN THE GAME - The Mental Health of the Job Search",
    date: "Saturday, Nov 28 · 7:00 PM WAT",
    tone: "pink",
    description: "Nobody really talks about this part of job hunting.\nThe rejection.\nThe silence after interviews.\nThe unanswered applications.\nWatching other people get jobs.\nComparing your journey to everyone else’s.\nApplying again when you’re already tired.\nThis session creates space for an honest conversation about the emotional and mental side of navigating a prolonged job search.",
    topics: [
      ["Dealing with rejection", "Handling interview and application ghosting", "Application fatigue", "Career anxiety", "Comparison and social media pressure", "Impostor syndrome", "Losing confidence during a long job search", "Separating your identity from your job title"],
      ["Managing expectations during the search", "Building healthy routines while job hunting", "Knowing when to rest", "Staying motivated without burning out", "Taking care of yourself while still pursuing your career goals"],
    ],
    hasPanel: true,
  },
];

const roles = ["Product Managers", "Associate Product Managers", "Product Owners", "Product Designers", "UI/UX Designers", "Product Marketers", "Product Analysts", "Product Operations Professionals", "Product Engineers", "Software Engineers working in product teams", "Technical Product Managers", "Growth Product Managers", "Product Growth Professionals", "Business Analysts working in product teams", "Product Leaders", "Founders building or leading products"];
const speakers = [
  { name: "Elizabeth Odetokun", role: "HR & Operations Lead", image: "elizabeth-odetokun.png", width: 720, height: 1280, position: "center 62%" },
  { name: "Olabanji Ewenla", role: "Head of Product, Evtrify", image: "olabanji-ewenla.png", width: 1024, height: 1280, position: "center 35%" },
  { name: "Salami Abdullateef", role: "Talent Acquisition Specialist", image: "salami-abdullateef.png", width: 1280, height: 1221, position: "center 35%" },
  { name: "Mary Ayuba", role: "Psychologist; PM · Talk Mental Health", image: "mary-ayuba.png", width: 852, height: 1280, position: "center top" },
];
const benefits = [
  ["4 Main Virtual Saturdays", "Live access to all 4 November interactive sessions."],
  ["Live Recruiter AMA Access", "Ask questions directly to real HR professionals."],
  ["Masterclass Bonus 7th November", "How to position beyond the resume."],
  ["Network & Chill Access", "Invitation to the physical December offline community event."],
  ["Career Toolkits & Templates", "ATS-friendly resume templates & STAR interview framework guides."],
  ["Session Recording Access", "Replay access for registered attendees so you don’t miss a beat."],
];
const ticketFeatures = ["All 4 November Virtual Sessions", "HR Professionals Recruiter AMA", "December Masterclasses & Resources", "Offline Network & Chill Invitation"];
const faqs = [
  ["How will the virtual sessions be hosted?", "All Saturday sessions take place virtually at 7:00 PM WAT. Meeting links and joining instructions will be sent directly to your registered email address prior to each session."],
  ["What does my ₦9,999 registration ticket cover?", "Your single ticket covers all four November virtual sessions, the HR AMA panel, session resources, the December 5 bonus masterclass, and access to the December 12 ProductPointers Network & Chill physical community experience."],
  ["Will recordings be available if I miss a live session?", "Yes, session replays and resource slides will be provided to all registered participants following each weekend session."],
  ["Where will ProductPointers Network & Chill take place?", "The December 12 offline networking experience will be held at JJT Park. Registered November participants will receive the full community meetup details by email."],
];

function EventDetails() {
  return <div className={styles.eventDetails}><span><CalendarDays /> November 7–28, 2026</span><span><Clock3 /> 7:00 PM WAT</span><span><MapPin /> Virtual</span></div>;
}

function FeatureList({ items }: { items: string[] }) {
  return <ul className={styles.featureList}>{items.map(item => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>;
}

function FlyerPin() {
  return (
    <Image
      className={styles.flyerPin}
      src="/images/november-event/pin.png"
      alt=""
      aria-hidden="true"
      width={1024}
      height={1024}
      sizes="(max-width: 767px) 110px, 160px"
    />
  );
}

function TierCards({ event }: { event: EventDetails | null }) {
  if (!event) {
    return <article className={`${styles.ticket} ${styles.inactiveTicket}`}><span className={styles.ticketBadge}>UNAVAILABLE</span><h3>Tickets</h3><p>Ticket details will be available shortly. Please check back soon.</p></article>;
  }
  const tiers = [...event.tiers].sort((a, b) => a.sortOrder - b.sortOrder);
  return <>{tiers.map(tier => {
    const active = tier.id === event.activeTier?.id;
    return (
      <article key={tier.id} className={`${styles.ticket} ${active ? styles.activeTicket : styles.inactiveTicket}`}>
        <span className={styles.ticketBadge}>{active ? "CURRENT TIER · ACTIVE" : (TIER_STATUS_LABEL[tier.status] ?? tier.status).toUpperCase()}</span>
        <h3>{tier.name}</h3>
        <p>{tier.description}</p>
        <div className={styles.price}>{formatMoney(tier.price, tier.currency)} <span>/ attendee</span></div>
        <FeatureList items={tier.benefits.length ? tier.benefits : ticketFeatures} />
        {active && <div className={styles.deadline}><CalendarDays size={24} /><div>{tier.name.toUpperCase()} ENDS<strong>{formatEventDate(tier.salesEndAt, event.timeZone)} WAT</strong></div></div>}
        {active
          ? <Link href="/events/november-to-remember/checkout" className={styles.registerButton}>Get {tier.name.toLowerCase()}</Link>
          : <span className={styles.registerButton} aria-disabled="true">{TIER_STATUS_LABEL[tier.status] ?? tier.status}</span>}
      </article>
    );
  })}</>;
}

export default async function NovemberEventPage() {
  const event = await fetchEvent(NOVEMBER_EVENT_SLUG);
  const activeTier = event?.activeTier ?? null;
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.badge}><CalendarDays size={20} /> Upcoming Event</p>
            <h1>NOVEMBER TO <span>REMEMBER</span></h1>
            <h2>The Product Career Activation Series</h2>
            <p className={styles.heroDescription}>You have the skills. You’re looking for the opportunity. Let’s talk about what happens in between.</p>
            <EventDetails />
            <Countdown />
          </div>
          <div className={styles.heroArtwork}>
            <div className={`${styles.pinnedFlyer} ${styles.heroFlyer}`}>
              <Image
                className={styles.heroArt}
                src="/images/november-event/product-career-activation-flyer.jpg"
                alt="November to Remember Product Career Activation Series event schedule, November 7–28"
                width={1080}
                height={1350}
                sizes="(max-width: 767px) 85vw, (max-width: 1150px) 40vw, 500px"
                quality={90}
                priority
              />
              <FlyerPin />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <div className={`${styles.container} ${styles.aboutGrid}`}>
          <div><p className={styles.eyebrow}>About the event</p><h2>Four Saturdays.<br />Four career conversation</h2><p className={styles.muted}>Real conversations about getting hired, getting noticed, finding opportunities beyond your country, and staying sane through the process.</p><EventDetails /><div className={styles.handwritten}>Real people<br />Real conversation<br />Real opportunities <span aria-hidden="true">⤴</span></div></div>
          <div className={styles.aboutArtwork}>
            <Image
              src="/images/november-event/product-professional-at-cafe.png"
              alt="Product professional working on a laptop in a café"
              width={1200}
              height={1200}
              sizes="(max-width: 767px) 80vw, (max-width: 1150px) 40vw, 500px"
              className={styles.aboutArt}
            />
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.reality}`}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>The reality check</p><h2>The Gap Between Having<br />Skills & <span className={styles.underline}>Getting Hired</span></h2></div><p className={styles.muted}>Getting a product opportunity is rarely about taking another course or collecting another certificate. It’s about how clearly you communicate who you are, what you can do, and how you position yourself in front of decision-makers.</p></div>
        <div className={styles.phaseGrid}>{phases.map((phase, index) => <article className={styles.phaseCard} key={phase.name}><span className={styles.phaseNumber} style={{ backgroundColor: phase.color }}>{String(index + 1).padStart(2, "0")}</span><p style={{ color: phase.color }}>{phase.phase}</p><h3>{phase.name}</h3><p className={styles.muted}>{phase.description}</p><div className={styles.outcome}><Check size={17} />{phase.outcome}</div></article>)}</div>
      </section>

      <section className={`${styles.container} ${styles.sessions}`}>
        <p className={styles.eyebrow}>The sessions</p><h2>What Will We Actually Talk About?</h2>
        <div className={styles.sessionList}>
          {sessions.map((session, index) => (
            <details key={session.title} className={`${styles.session} ${styles[session.tone]}`} open={index === 0}>
              <summary>
                <span className={styles.sessionNumber}>{index + 1}</span>
                <div>
                  <span className={styles.sessionDate}>{session.date}</span>
                  <h3>{session.title}</h3>
                </div>
                <ChevronDown size={21} className={styles.chevron} aria-hidden="true" />
              </summary>
              <div className={styles.sessionBody}>
                <p className={styles.sessionDescription}>{session.description}</p>
                <h4>Key Areas To Explore:</h4>
                <div className={styles.sessionTopics}>
                  {session.topics.map((topics, column) => <FeatureList key={column} items={topics} />)}
                </div>
                <div className={styles.duration}>
                  <p>Duration: {session.duration ?? "45 minutes + Q&A"}</p>
                  {session.hasPanel && <p>Panel: Speakers to be announced</p>}
                </div>
                {session.note && <p className={styles.sessionNote}><strong>{session.note.label}:</strong> {session.note.text}</p>}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.bonus}>
        <div className={styles.container}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Exclusive additions</p><h2>Your Experience Doesn’t End in November.</h2></div><p>Keep the momentum going with an extra session + a bonus experience designed to help you grow, connect and thrive.</p></div>
          <div className={styles.bonusCard}><div><div className={styles.bonusLabels}><span>DECEMBER 12 · 11am – 12pm</span><strong>BONUS EXPERIENCE</strong></div><h3>ProductPointers Network & Chill 🥂</h3><p>The November conversations move offline.<br />A physical community experience designed to give participants the opportunity to:</p><ul>{["Meet other product professionals", "Make meaningful connections", "Share experiences", "Learn from one another", "Build their professional network", "Continue conversations beyond the virtual sessions"].map(item => <li key={item}>{item}</li>)}</ul><div className={styles.bonusLocation}><span><MapPin size={20} /> JJT Park</span><strong>Access: Included with November registration.</strong></div></div><div className={`${styles.pinnedFlyer} ${styles.bonusFlyer}`}><Image className={styles.flyerImage} src="/images/november-event/network-and-chill-flyer.jpg" alt="ProductPointers Network & Chill, December 12, 2026 at JJT Park" width={1080} height={1350} sizes="(max-width: 767px) 80vw, (max-width: 1150px) 32vw, 400px" quality={90} /><FlyerPin /></div></div>
        </div>
      </section>

      <section className={styles.audience}><div className={styles.container}><h2>Is this for you?</h2><div className={styles.audienceGrid}>{["You’re looking for your first product role", "You’re applying but not getting interviews", "You’re a professional seeking a better role", "You’re pursuing remote or international opportunities"].map(item => <p key={item}>{item}</p>)}</div><div className={styles.roleCard}><h3>Product professionals at every stage</h3><p>NOVEMBER TO REMEMBER is for product professionals at different stages of their careers, including:</p><div className={styles.roleTags}>{roles.map(role => <span key={role}>{role}</span>)}</div><p className={styles.roleNote}>Whether you build the product, design it, market it, analyse it, engineer it, or lead the team behind it, if you work in product, there’s something for you at NOVEMBER TO REMEMBER.</p></div></div></section>

      <section className={`${styles.container} ${styles.speakers}`}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Learn with guidance</p><h2>Meet the People Joining Us</h2></div><p className={styles.muted}>A practical conversation needs people who have actually been there.</p></div><div className={styles.speakerGrid}>{speakers.map(speaker => <article className={styles.speaker} key={speaker.name}><Image src={`/images/november-event/${speaker.image}`} alt={speaker.name} width={speaker.width} height={speaker.height} sizes="(max-width: 767px) calc(50vw - 27px), (max-width: 1150px) calc(25vw - 35px), 305px" style={{ objectPosition: speaker.position }} /><h3>{speaker.name}</h3><p>{speaker.role}</p></article>)}{Array.from({ length: 4 }, (_, index) => <article className={styles.speaker} key={`upcoming-${index}`}><div className={styles.speakerPlaceholder} aria-hidden="true" /><h3>To be announced</h3><p>More voices joining the conversation</p></article>)}</div>
        <div className={styles.included}><div className={styles.sectionHeading}><h2>Everything Included In Your Ticket</h2><p className={styles.muted}>One single payment unlocks all November virtual sessions, December bonuses, and resources.</p></div><div className={styles.benefitGrid}>{benefits.map(([title, description]) => <div key={title}><Check size={22} /><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></div>
      </section>

      <section id="tickets" className={`${styles.container} ${styles.tickets}`}><p className={styles.eyebrow}>Investment in your career</p><h2>Reserve Your All-Access Pass</h2><div className={styles.ticketGrid}><TierCards event={event} /><article className={`${styles.ticket} ${styles.valueTicket}`}><h3>THE VALUE YOU GET <Crown size={23} /></h3><div className={styles.price}>₦100,000</div><h4>Worth of career-building experiences</h4><FeatureList items={["All 4 November Virtual Sessions", "Network & Chill bonus experience", "HR Professionals Recruiter AMA", "December Masterclasses & Resources"]} /><div className={styles.ticketPattern} aria-hidden="true">✦ ◒<br />◕ ✦</div></article></div></section>

      <section className={styles.faq}><div className={styles.container}><h2>Frequently Asked Questions</h2><div className={styles.faqList}>{faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></div></section>

      <section className={styles.closing}><span>Activate Your Product Career</span><h2>Ready to make this a<br /><em>November to Remember?</em></h2><p>Stop navigating the job market in the dark. Secure your pass, gain clarity<br className={styles.desktopBreak} /> on positioning, and take charge of your product journey.</p><Link href="/events/november-to-remember/checkout" className={styles.closingButton}>Register now{activeTier ? ` · ${formatMoney(activeTier.price, activeTier.currency)}` : ""}</Link></section>
    </div>
  );
}
