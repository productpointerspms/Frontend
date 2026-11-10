"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CalendarDays, Check, Clock3, Copy, CreditCard, Landmark, Loader2, Mail, MapPin, ShieldCheck, UserRound } from "lucide-react";
import SurveyQuestions from "@/components/preregistration/SurveyQuestions";
import { getPaymentDetails, registerApplication, buildResponses, type PaymentDetails } from "@/lib/application";
import { validateRequiredAnswers } from "@/lib/programQuestions";
import { getCurrency } from "@/lib/pricing";
import { currencies, useLiveRates } from "@/lib/useLiveRates";
import { usePaymentStatus } from "@/lib/usePaymentStatus";
import { formatMoney } from "@/lib/event";
import { userMessage } from "@/lib/userMessage";
import {
  checkProgramAvailability,
  clearSavedCheckout,
  isSafePaymentLink,
  loadSavedCheckout,
  planSummary,
  quotePlan,
  saveCheckout,
  type Availability,
  type CheckoutProgram,
} from "@/lib/programCheckout";
import styles from "./checkout.module.css";
import local from "./program-checkout.module.css";

const titles = ["Order Summary", "Your Details", "Payment", "Enrolment Confirmed"];
const AVAILABILITY_TIMEOUT_MS = 10_000;

type Applicant = { firstName: string; email: string };
type Method = "card" | "transfer";

function formatStart(iso: string): string | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" }).format(date);
}

export default function ProgramCheckout({ program }: { program: CheckoutProgram }) {
  const searchParams = useSearchParams();
  const heading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(1);
  const [planId, setPlanId] = useState(() => {
    const requested = searchParams.get("plan");
    return program.plans.find(p => p.id === requested)?.id ?? program.plans[0].id;
  });
  const [person] = useState(() => searchParams.get("coach")?.trim().slice(0, 80) || undefined);
  const plan = program.plans.find(p => p.id === planId) ?? program.plans[0];

  const [availability, setAvailability] = useState<Availability>({ state: "checking" });
  const quote = quotePlan(program, plan, availability);
  const rates = useLiveRates(quote.dueTodayNgn ?? plan.amountNgn, searchParams.get("currency"));
  const { currency, setCurrency, formatLive } = rates;

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [detailsCurrency, setDetailsCurrency] = useState<string | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [method, setMethod] = useState<Method>("card");
  const [redirectError, setRedirectError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const focusTop = useCallback(() => {
    requestAnimationFrame(() => {
      heading.current?.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);
  const go = useCallback((next: number) => { setStep(next); focusTop(); }, [focusTop]);

  // Is this program open for enrolment, and what does the backend charge?
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    // A slow API shouldn't trap people on a spinner: after the timeout we let them continue.
    const timer = setTimeout(() => controller.abort(), AVAILABILITY_TIMEOUT_MS);
    checkProgramAvailability(program.code, controller.signal)
      .then(result => { if (active) setAvailability(result); })
      .catch(() => { if (active) setAvailability({ state: "unknown" }); });
    return () => { active = false; controller.abort(); clearTimeout(timer); };
  }, [program.code]);

  const fetchDetails = useCallback(async (id: string, currencyCode: string) => {
    setDetailsLoading(true);
    setDetailsError(null);
    setRedirectError(null);
    try {
      const result = await getPaymentDetails(id, currencyCode);
      setDetails(result);
      setDetailsCurrency(currencyCode);
      setMethod(result.link ? "card" : "transfer");
    } catch (err) {
      setDetails(null);
      setDetailsError(userMessage(err, "We couldn't load your payment options. Please try again."));
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  // Coming back after a refresh, or from the payment page: resume instead of re-registering.
  useEffect(() => {
    const saved = loadSavedCheckout(program.slug);
    if (!saved) return;
    if (program.plans.some(p => p.id === saved.planId)) setPlanId(saved.planId);
    setCurrency(getCurrency(saved.currency));
    setApplicant({ firstName: saved.firstName, email: saved.email });
    setApplicationId(saved.applicationId);
    setStep(3);
    void fetchDetails(saved.applicationId, saved.currency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program.slug]);

  // Polls the application until its transaction completes (card return or bank transfer).
  const { isPaid } = usePaymentStatus(applicationId, step === 3);
  useEffect(() => {
    if (!isPaid || step === 4) return;
    clearSavedCheckout(program.slug);
    go(4);
  }, [isPaid, step, program.slug, go]);

  function choosePlan(id: string) {
    setPlanId(id);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("plan", id);
      window.history.replaceState(window.history.state, "", url);
    } catch { /* cosmetic only */ }
  }

  async function submitDetails(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (submitting) return;
    const form = formEvent.currentTarget;
    const data = new FormData(form);
    const missing = validateRequiredAnswers(program.questions, data);
    if (missing) { setSubmitError(missing); return; }

    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phoneNumber = String(data.get("phoneNumber") ?? "").replace(/[\s()-]/g, "");

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await registerApplication({
        fullname: `${firstName} ${lastName}`.trim(),
        email,
        phoneNumber,
        programCode: program.code,
        responses: [
          { category: "TRACK_SELECTION", question: "Selected payment plan", response: planSummary(plan, person) },
          ...buildResponses(data, program.questions),
        ],
      });
      if (!result.applicationId) throw new Error("");
      setApplicant({ firstName, email });
      setApplicationId(result.applicationId);
      saveCheckout(program.slug, { applicationId: result.applicationId, planId: plan.id, currency: currency.code, firstName, email, person });
      go(3);
      void fetchDetails(result.applicationId, currency.code);
    } catch (err) {
      setSubmitError(userMessage(err, "We couldn't submit your details. Please check them and try again."));
    } finally {
      setSubmitting(false);
    }
  }

  function payByCard() {
    const link = details?.link?.paymentLink;
    if (!link || !isSafePaymentLink(link)) {
      setRedirectError("We couldn't open the secure payment page. Please try again, or pay by bank transfer.");
      return;
    }
    // Flutterwave returns to /payment/callback, which confirms the payment.
    window.location.assign(link);
  }

  async function copyAccountNumber(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked — the number is selectable */ }
  }

  function startOver() {
    clearSavedCheckout(program.slug);
    setApplicationId(null);
    setApplicant(null);
    setDetails(null);
    setDetailsError(null);
    go(1);
  }

  const dueToday = quote.dueTodayNgn;
  const blocked = availability.state === "closed" || dueToday == null;
  const startDate = availability.state === "open" && availability.startsAt ? formatStart(availability.startsAt) : null;
  const linkAmount = details?.link?.amount != null && details.link.currency
    ? formatMoney(details.link.amount, details.link.currency)
    : null;
  const amountDue = linkAmount ?? (dueToday != null ? formatLive(dueToday) : "");

  const contactCta = <Link className={styles.back} href={program.contactHref}>Talk to our team</Link>;

  return (
    <div className={styles.page}>
      <section className={styles.card} aria-labelledby="checkout-title">
        <header className={styles.header}>
          <div><p>STEP {step} OF {titles.length}</p><h1 id="checkout-title" ref={heading} tabIndex={-1}>{titles[step - 1]}</h1></div>
          <ol className={styles.progress} aria-label="Checkout progress">{titles.map((title, index) => <li key={title} aria-current={index + 1 === step ? "step" : undefined} className={index + 1 === step ? styles.active : ""}><span className="sr-only">{title}</span></li>)}</ol>
        </header>

        {step === 1 && <div className={styles.body}>
          <div className={styles.event}>
            <p className={styles.eyebrow}>SELECTED PROGRAM</p>
            <h2>{program.title.toUpperCase()}</h2><p className={styles.subtitle}>{program.subtitle}</p>
            <div className={styles.eventDetails}>
              {startDate && <span><CalendarDays /> Starts {startDate}</span>}
              <span><Clock3 /> {program.duration}</span>
              <span><MapPin /> {program.format}</span>
              {person && <span><UserRound /> {program.personLabel ?? "With"}: {person}</span>}
            </div>
          </div>

          {availability.state === "checking" && <p className={`${styles.notice} ${local.gap}`} role="status"><Loader2 className={styles.spinner} size={16} aria-hidden="true" /> Checking enrolment availability…</p>}
          {availability.state === "closed" && <div className={`${styles.notice} ${local.gap}`} role="status">
            <p><strong>Online enrolment for this program isn&apos;t open yet.</strong> Our team can answer your questions and reserve your place for the next cohort.</p>
            <div className={local.inlineActions}>{contactCta}<Link className={local.textLink} href={program.landingPath}>Back to program page</Link></div>
          </div>}

          {availability.state !== "closed" && <>
            {program.plans.length > 1 && <fieldset className={local.plans}>
              <legend>Choose your plan</legend>
              {program.plans.map(option => <label key={option.id} className={`${local.plan} ${option.id === plan.id ? local.planSelected : ""}`}>
                <input type="radio" name="plan" value={option.id} checked={option.id === plan.id} onChange={() => choosePlan(option.id)} />
                <span className={local.planCopy}><strong>{option.label}</strong><span>{option.detail}</span></span>
                <span className={local.planPrice}>{formatLive(option.amountNgn)}{option.payments ? <small> × {option.payments}</small> : null}</span>
              </label>)}
            </fieldset>}
            {program.plans.length === 1 && <div className={styles.ticket}><div><h2>{plan.label}</h2><p>{plan.detail}</p></div></div>}

            {plan.kind === "product" && dueToday == null && availability.state === "open" && <div className={`${styles.notice} ${local.gap}`} role="status">
              <p><strong>{plan.label} can&apos;t be booked online yet.</strong> Message our team and we&apos;ll set it up with you{person ? ` and ${person}` : ""}.</p>
              <div className={local.inlineActions}>{contactCta}</div>
            </div>}

            {dueToday != null && <>
              <div className={styles.breakdown}>
                <div className={styles.currency}>
                  <label className={local.currencySelect}>
                    <span className="sr-only">Payment currency</span>
                    <select value={currency.code} onChange={e => setCurrency(getCurrency(e.target.value))}>
                      {currencies.map(item => <option key={item.code} value={item.code}>{item.code === "NGN" ? "🇳🇬 " : ""}{item.code}</option>)}
                    </select>
                  </label>
                </div>
                <div><span>{plan.label}</span><strong>{formatLive(dueToday)}</strong></div>
                <div><span>Processing Fees</span><strong>{formatLive(0)}</strong></div>
              </div>
              <div className={styles.total} aria-live="polite"><h2>Total Due Today</h2><strong>{formatLive(dueToday)}</strong></div>
              {quote.note && <p className={local.planNote} role="note">{quote.note} <Link href={program.contactHref}>Talk to our team</Link></p>}
              {currency.code !== "NGN" && <p className={local.fxNote}>{rates.loading ? "Updating conversion…" : rates.isLive ? "Converted at today’s live rate." : "Estimated conversion."} The exact amount is confirmed on the payment step.</p>}
              {availability.state === "unknown" && <p className={local.fxNote}>We&apos;ll confirm availability and the final amount before you pay.</p>}
            </>}
          </>}

          <button className={styles.primary} disabled={availability.state === "checking" || blocked} onClick={() => go(2)}>CONTINUE TO YOUR DETAILS</button>
        </div>}

        {/* Kept mounted (hidden) so answers survive going back to the summary. */}
        <form className={`${styles.body} ${styles.form} ${local.mobileInputs}`} onSubmit={submitDetails} hidden={step !== 2}>
          <fieldset className={styles.fields} disabled={submitting}>
            <label htmlFor="firstName">First Name *<input id="firstName" name="firstName" required pattern=".*\S.*" autoComplete="given-name" placeholder="Blessing" maxLength={100} /></label>
            <label htmlFor="lastName">Last Name *<input id="lastName" name="lastName" required pattern=".*\S.*" autoComplete="family-name" placeholder="Okomor" maxLength={100} /></label>
            <label className={styles.full} htmlFor="email">Email Address *<input id="email" name="email" required type="email" autoComplete="email" inputMode="email" placeholder="blessing@example.com" maxLength={254} /></label>
            <label className={styles.full} htmlFor="phoneNumber">Phone Number (WhatsApp preferred) *
              <input id="phoneNumber" name="phoneNumber" required type="tel" inputMode="tel" autoComplete="tel" pattern="\+?[0-9][0-9 \(\)\-]{6,19}" title="Include your country code, e.g. +234 803 123 4567" placeholder="+234 803 123 4567" maxLength={24} />
            </label>
          </fieldset>
          {program.questions.length > 0 && <fieldset className={local.questions} disabled={submitting}>
            <legend>A few questions about you</legend>
            <SurveyQuestions questions={program.questions} />
          </fieldset>}
          {submitError && <p className={`${styles.notice} ${local.gap}`} role="alert">{submitError}</p>}
          <div className={styles.actions}>
            <button className={styles.back} type="button" disabled={submitting} onClick={() => go(1)}>Back</button>
            <button className={styles.primary} type="submit" disabled={submitting}>{submitting ? <><Loader2 className={styles.spinner} size={18} aria-hidden="true" />&nbsp;SAVING YOUR DETAILS…</> : "CONTINUE TO PAYMENT"}</button>
          </div>
        </form>

        {step === 3 && <div className={styles.body}>
          <div className={styles.ticket}><div><h2>{plan.label}</h2><p>{program.title}{person ? ` · ${person}` : ""}</p></div></div>

          {detailsLoading && <p className={styles.notice} role="status"><Loader2 className={styles.spinner} size={16} aria-hidden="true" /> Preparing your secure payment options…</p>}

          {!detailsLoading && detailsError && <div className={styles.notice} role="alert">
            <p>{detailsError}</p>
            <div className={local.inlineActions}><button type="button" className={styles.back} onClick={() => applicationId && fetchDetails(applicationId, currency.code)}>Try again</button></div>
          </div>}

          {!detailsLoading && details && !details.link && !details.transfer && <div className={styles.notice} role="status">
            <p><strong>Online payment isn&apos;t available in {detailsCurrency} yet.</strong>{detailsCurrency !== "NGN" ? " You can pay in Naira instead, or" : ""} our team can help you complete your enrolment.</p>
            <div className={local.inlineActions}>
              {detailsCurrency !== "NGN" && applicationId && <button type="button" className={styles.back} onClick={() => { setCurrency(getCurrency("NGN")); void fetchDetails(applicationId, "NGN"); }}>Pay in NGN</button>}
              {contactCta}
            </div>
          </div>}

          {!detailsLoading && details && (details.link || details.transfer) && <>
            <div className={styles.total}><h2>Amount Due</h2><strong>{amountDue}</strong></div>
            {quote.note && <p className={local.planNote} role="note">{quote.note} <Link href={program.contactHref}>Talk to our team</Link></p>}

            {details.link && details.transfer && <div className={local.methods} role="radiogroup" aria-label="Payment method">
              <button type="button" role="radio" aria-checked={method === "card"} className={method === "card" ? local.methodActive : ""} onClick={() => setMethod("card")}><CreditCard size={18} aria-hidden="true" /> Card</button>
              <button type="button" role="radio" aria-checked={method === "transfer"} className={method === "transfer" ? local.methodActive : ""} onClick={() => setMethod("transfer")}><Landmark size={18} aria-hidden="true" /> Bank transfer</button>
            </div>}

            {method === "card" && details.link && <>
              <p className={local.methodHint}><ShieldCheck size={16} aria-hidden="true" /> You&apos;ll be taken to our payment partner, Flutterwave, and brought back once you&apos;ve paid.</p>
              {redirectError && <p className={`${styles.notice} ${local.gap}`} role="alert">{redirectError}</p>}
              <button type="button" className={styles.primary} onClick={payByCard}>PAY {amountDue} SECURELY</button>
            </>}

            {(method === "transfer" || !details.link) && details.transfer && <>
              <dl className={`${styles.receipt} ${local.account}`}>
                <div><dt>Bank</dt><dd>{details.transfer.bankName}</dd></div>
                <div><dt>Account number</dt><dd className={local.accountNumber}>
                  <span>{details.transfer.accountNumber}</span>
                  <button type="button" onClick={() => copyAccountNumber(details.transfer!.accountNumber)} aria-label="Copy account number"><Copy size={14} aria-hidden="true" /> {copied ? "Copied" : "Copy"}</button>
                </dd></div>
                <div><dt>Account name</dt><dd>{details.transfer.accountName}</dd></div>
                <div><dt>Amount</dt><dd>{amountDue}</dd></div>
              </dl>
              <span className="sr-only" role="status">{copied ? "Account number copied" : ""}</span>
              <p className={styles.notice} role="status"><Loader2 className={styles.spinner} size={16} aria-hidden="true" /> Waiting for your transfer. This page updates automatically once it arrives, usually within a few minutes. Send the exact amount, and only once.</p>
            </>}
          </>}

          {applicationId && <p className={styles.reference}>Application reference: {applicationId}</p>}
          <p className={styles.support}>Not you, or picked the wrong plan? <button type="button" className={local.textButton} onClick={startOver}>Start a new application</button></p>
        </div>}

        {step === 4 && <div className={`${styles.body} ${styles.success}`}>
          <div className={styles.successIcon}><Check size={38} strokeWidth={2.5} aria-hidden="true" /></div>
          <p className={styles.eyebrow}>YOU’RE IN</p>
          <h2>Your journey starts here.</h2>
          <p className={styles.successIntro}>Thank you{applicant?.firstName ? `, ${applicant.firstName}` : ""}! Your payment is confirmed and your place in the {program.title} is secured.</p>
          <div className={styles.emailNote}><Mail size={24} aria-hidden="true" /><div><h3>Keep an eye on your inbox</h3>{applicant?.email && <p>Registration email: <strong>{applicant.email}</strong></p>}<p>We&apos;ll send your onboarding details there. Check your spam folder too, and contact us with your reference below if nothing arrives.</p></div></div>
          <dl className={styles.receipt}>
            <div><dt>Program</dt><dd>{program.title}</dd></div>
            <div><dt>Plan</dt><dd>{plan.label}{person ? ` · ${person}` : ""}</dd></div>
            {amountDue && <div><dt>Amount paid</dt><dd>{amountDue}</dd></div>}
            {applicationId && <div><dt>Reference</dt><dd>{applicationId}</dd></div>}
          </dl>
          <Link className={styles.primary} href={program.landingPath}>BACK TO THE PROGRAM <ArrowRight size={20} aria-hidden="true" /></Link>
          <p className={styles.support}>Need a hand? <a href="mailto:support@productpointers.com">Contact support</a></p>
        </div>}
      </section>
    </div>
  );
}
