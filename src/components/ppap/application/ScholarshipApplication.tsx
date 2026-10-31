"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { registerApplication } from "@/lib/application";
import { scholarshipConfig, scholarshipResponses, wordCount, type ScholarshipProgram } from "./scholarship";
import styles from "./scholarship.module.css";
import ApplicationReceived from "./ApplicationReceived";

function Section({ number, title, description, children }: { number: number; title: string; description: string; children: ReactNode }) {
  return <section className={styles.section} aria-labelledby={`scholarship-section-${number}`}><div className={styles.sectionHeading}><span>{number}</span><div><h2 id={`scholarship-section-${number}`}>{title}</h2><p>{description}</p></div>{number === 1 && <p className={styles.requiredNote}>* Required</p>}</div>{children}</section>;
}
function Label({ htmlFor, children, required = false }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return <label htmlFor={htmlFor} className={styles.label}>{children}{required && <span aria-hidden="true"> *</span>}</label>;
}

function WordAnswer({ name, question, placeholder }: { name: string; question: string; placeholder: string }) {
  const [text, setText] = useState("");
  return <div><Label htmlFor={name} required>{question}</Label><p id={`${name}-help`} className={styles.hint}>Maximum: <strong>200 words.</strong></p><textarea id={name} name={name} value={text} onChange={event => { const value = event.target.value; event.target.setCustomValidity(wordCount(value) > 200 ? "Please use 200 words or fewer." : ""); setText(value); }} required maxLength={10000} aria-describedby={`${name}-help ${name}-count`} placeholder={placeholder} /><p id={`${name}-count`} className={styles.wordCount}>{wordCount(text)}/200 words</p></div>;
}

export default function ScholarshipApplication({ program = "PPAP" }: { program?: ScholarshipProgram }) {
  const config = scholarshipConfig(program);
  const [journey, setJourney] = useState("");
  const [motivation, setMotivation] = useState("");
  const [reason, setReason] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const submitLock = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    if (!value("firstName") || !value("lastName") || !value("location") || !value("motivation") || !value("scholarshipReason") || (value("journey") === "Others" && !value("otherJourney"))) {
      setError("Please complete all required fields with your details."); return;
    }
    if (program !== "PPMP" && wordCount(value("scholarshipReason")) > 200) { setError("Please keep your scholarship answer to 200 words or fewer."); document.getElementById("scholarshipReason")?.focus(); return; }
    if (program === "PPFP" && ["training", "products", "fintechMotivation"].some(name => !value(name))) { setError("Please complete your training, products, and Fintech motivation answers."); return; }
    if (program === "PPFP" && ["products", "fintechMotivation"].some(name => wordCount(value(name)) > 200)) { setError("Please keep each answer to 200 words or fewer."); return; }
    const digits = value("phone").replace(/\D/g, "").replace(/^0+/, "");
    const phoneNumber = `${value("dialCode")}${digits}`;
    if (!/^\+[1-9]\d{7,14}$/.test(phoneNumber)) { setError("Please enter a valid WhatsApp phone number, without the country code."); document.getElementById("scholarship-phone")?.focus(); return; }
    submitLock.current = true;
    setSending(true); setError("");
    try {
      const result = await registerApplication({ fullname: `${value("firstName")} ${value("lastName")}`, email: value("email"), phoneNumber, programCode: program, responses: scholarshipResponses(data, program) });
      if (!result.applicationId) throw new Error("No application confirmation was returned. Please contact the team before submitting again.");
      setSubmitted(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Your application could not be submitted. Please try again."); }
    finally { submitLock.current = false; setSending(false); }
  }
  if (submitted) return <ApplicationReceived program={program} />;

  return <div className={styles.page}><div className={styles.card}><header className={styles.header}><h1>Scholarship Application</h1><p>Tell us a little about yourself and your career journey to apply for the {config.programName}. Complete all sections on this single form below.</p></header><form className={styles.form} onSubmit={submit} aria-busy={sending}><fieldset disabled={sending} className={styles.fields}>
    <Section number={1} title="Personal Information" description="Provide your official contact details for candidate tracking."><div className={styles.grid}>
      <div><Label htmlFor="scholarship-first-name" required>First Name</Label><input id="scholarship-first-name" name="firstName" autoComplete="given-name" placeholder="John" required maxLength={80} /></div>
      <div><Label htmlFor="scholarship-last-name" required>Last Name</Label><input id="scholarship-last-name" name="lastName" autoComplete="family-name" placeholder="Jack" required maxLength={80} /></div>
      <div><Label htmlFor="scholarship-email" required>Email Address</Label><input id="scholarship-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" required maxLength={254} /></div>
      <div><Label htmlFor="scholarship-phone" required>WhatsApp Phone Number</Label><div className={styles.phone}><select name="dialCode" aria-label="Phone country code" defaultValue="+234"><option value="+234">NG +234</option><option value="+233">GH +233</option><option value="+254">KE +254</option><option value="+27">ZA +27</option><option value="+44">UK +44</option><option value="+1">US/CA +1</option></select><input id="scholarship-phone" name="phone" type="tel" autoComplete="tel-national" placeholder="801 234 5678" required pattern="[0-9 ()-]{7,20}" /></div></div>
      <div className={styles.fullWidth}><Label htmlFor="scholarship-location" required>Where are you currently based?</Label><input id="scholarship-location" name="location" autoComplete="address-level2" placeholder="Lagos, Nigeria" list="scholarship-locations" required maxLength={150} /><datalist id="scholarship-locations"><option>Lagos, Nigeria</option><option>Abuja, Nigeria</option><option>Port Harcourt, Nigeria</option><option>Accra, Ghana</option><option>Nairobi, Kenya</option></datalist></div>
    </div></Section>
    <Section number={2} title="Education & Eligibility Verification" description="Provide your academic status and eligibility details."><div className={styles.stack}><div><Label htmlFor="scholarship-education" required>Highest Level of Education</Label><select id="scholarship-education" name="education" required defaultValue=""><option value="" disabled>Select highest education completed or ongoing</option>{["Secondary school", "Undergraduate", "OND / NCE", "HND", "Bachelor’s degree", "Postgraduate diploma", "Master’s degree", "Doctorate", "Other"].map(value => <option key={value}>{value}</option>)}</select></div>{config.requiresNysc && <div><Label htmlFor="scholarship-nysc" required>What is your current NYSC status?</Label><select id="scholarship-nysc" name="nysc" required defaultValue=""><option value="" disabled>Select your NYSC status</option>{["Not yet started", "Currently serving", "Completed", "Exempted", "Not applicable"].map(value => <option key={value}>{value}</option>)}</select></div>}</div></Section>
    <Section number={3} title="Your Product Journey & Profile" description="Help us understand your current background and experience level."><fieldset className={styles.choices}><legend className={styles.label}>Which best describes where you are today in your product journey? <span aria-hidden="true">*</span></legend>{config.journeyOptions.map(option => <label key={option} className={styles.choice}><input type="radio" name="journey" value={option} checked={journey === option} onChange={() => setJourney(option)} required /><span>{option}</span></label>)}</fieldset>{journey === "Others" && <div className={styles.extra}><Label htmlFor="otherJourney" required>Tell us about your product journey</Label><input id="otherJourney" name="otherJourney" required maxLength={300} /></div>}<div className={styles.extra}><Label htmlFor="scholarship-linkedin">LinkedIn Profile</Label><input id="scholarship-linkedin" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/yourprofile" maxLength={500} /></div></Section>
    <Section number={4} title="Motivation & Program Commitment" description="Your answers help our selection committee evaluate your readiness and passion."><div className={styles.stack}><div><Label htmlFor="motivation" required>{config.motivationQuestion}</Label><p id="motivation-help" className={styles.hint}>Recommended Length: <strong>100 to 150 words.</strong></p><textarea id="motivation" name="motivation" required value={motivation} onChange={event => setMotivation(event.target.value)} maxLength={10000} aria-describedby="motivation-help motivation-count" placeholder={(program === "PPFP" || program === "PPMP") ? "Your experience…" : program === "PPIP" ? "Share your motivation…" : "Share what drives your interest in Product Management, what problems you want to solve, and where you envision your career…"} /><p id="motivation-count" className={styles.wordCount}>{wordCount(motivation)} words</p></div>{program === "PPFP" && <><div><Label htmlFor="training" required>Where did you complete your foundational Product Management training?</Label><input id="training" name="training" placeholder="Training/Institution" required maxLength={300} /></div><WordAnswer name="products" question="Share at least 2 products you have built or worked on." placeholder="Product names, your role, contributions, and links…" /><WordAnswer name="fintechMotivation" question="Why do you want to transition into Fintech Product Management?" placeholder="What specifically interests you about building financial products, and what are you hoping to achieve through this program?" /></>}<div><Label htmlFor="scholarshipReason" required>{config.secondQuestion}</Label>{program === "PPMP" ? <input id="scholarshipReason" name="scholarshipReason" placeholder="Describe your current Product Management challenge" required maxLength={500} /> : <><p id="reason-help" className={styles.hint}>Maximum: <strong>200 words.</strong></p><textarea id="scholarshipReason" name="scholarshipReason" value={reason} onChange={event => { const text = event.target.value; event.target.setCustomValidity(wordCount(text) > 200 ? "Please use 200 words or fewer." : ""); setReason(text); }} required maxLength={10000} aria-describedby="reason-help reason-count" placeholder={program === "PPFP" ? "Tell us why this opportunity matters to you right now" : program === "PPIP" ? "e.g. A problem in Finance, Healthcare…" : "Highlight your dedication, potential impact, financial need, or why this opportunity will transform your career trajectory…"} /><p id="reason-count" className={styles.wordCount}>{wordCount(reason)}/200 words</p></>}</div>
    <div className={styles.commitment}><fieldset className={styles.choices}><legend className={styles.label}>Can you commit to the full {config.duration} {config.programLabel} and pay the remaining {config.contribution} tuition contribution if selected? <span aria-hidden="true">*</span></legend><label className={styles.choice}><input type="radio" name="commitment" value="Yes" required /><span>Yes, I can commit to the full program schedule and pay the {config.contribution} tuition contribution.</span></label>{program === "PPFP" && <label className={styles.choice}><input type="radio" name="commitment" value="Yes, with 3 installments" required /><span>Yes, I would like to use the minimum 3-installment option.</span></label>}<label className={styles.choice}><input type="radio" name="commitment" value="No" required /><span>No, I am unable to make this financial or time commitment at this time.</span></label></fieldset><p className={styles.financial}><strong>Important Financial Note:</strong> Selecting “Yes” confirms that you understand the scholarship covers {config.coverage} of the total {config.tuition} tuition value, and that selected scholars are responsible for paying the remaining {config.contribution} contribution to secure their slot.</p></div></div></Section>
    <Section number={5} title="Application Declaration" description="Please confirm your application terms before submitting."><fieldset className={styles.choices}><legend className={styles.label}>Please check all boxes to confirm your submission: <span aria-hidden="true">*</span></legend>{config.declarations.map((declaration, index) => <label key={declaration} className={styles.choice}><input type="checkbox" name={`declaration-${index}`} required /><span>{declaration}</span></label>)}</fieldset></Section>
    </fieldset>{error && <p className={styles.error} role="alert">{error}</p>}<div className={styles.submitRow}><button type="submit" disabled={sending} className={styles.submit}>{sending ? <><Loader2 size={20} className={styles.spinner} aria-hidden="true" />Submitting…</> : <>Submit Application<ArrowRight size={20} aria-hidden="true" /></>}</button></div>
  </form></div></div>;
}
