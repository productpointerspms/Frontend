"use client";

import {
  createContext, useContext, useRef, useState, type FormEvent, type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleCheck, LockKeyhole, MailCheck, ShieldCheck, type LucideIcon } from "lucide-react";
import { Badge, Field } from "./AdminUI";
import styles from "./admin.module.css";

type PreviewAccount = { name: string; email: string };
const sampleAccount = { name: "Jane Doe", email: "jane@example.com" };

const AccountContext = createContext<{
  account: PreviewAccount;
  setAccount: (account: PreviewAccount) => void;
  notice: string;
  setNotice: (notice: string) => void;
} | null>(null);

export function AccountPreview({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState(sampleAccount);
  const [notice, setNotice] = useState("");
  return <AccountContext.Provider value={{ account, setAccount, notice, setNotice }}>{children}</AccountContext.Provider>;
}

function useAccountPreview() {
  const preview = useContext(AccountContext);
  if (!preview) throw new Error("Admin account screens require the preview layout.");
  return preview;
}

function AccountFrame({
  title, text, icon: Icon, success, children, footer,
}: {
  title: string;
  text: string;
  icon?: LucideIcon;
  success?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className={styles.accountPage}>
      <section className={styles.accountCard} aria-labelledby="admin-account-title">
        <header className={styles.accountHeading}>
          {Icon && <span className={styles.accountIcon} data-tone={success ? "green" : "purple"}><Icon size={22} aria-hidden /></span>}
          <h1 id="admin-account-title">{title}</h1>
          <p>{text}</p>
        </header>
        {children}
        {footer && <div className={styles.accountFooter}>{footer}</div>}
        <p className={`${styles.previewText} ${styles.previewNote}`}>Preview only. Use sample details.</p>
      </section>
    </main>
  );
}

function EmailField() {
  return (
    <Field label="Email address">{(id) => (
      <input id={id} type="email" autoComplete="email" placeholder="Enter email address" className={styles.control} required />
    )}</Field>
  );
}

function SignIn() {
  const router = useRouter();
  const { notice, setNotice } = useAccountPreview();

  return (
    <AccountFrame
      title="Welcome back"
      text="Sign in to your admin account"
      footer="Admin access only. Use the email address associated with your ProductPointers admin account."
    >
      <form method="post" className={styles.accountForm} onSubmit={(event) => {
        event.preventDefault();
        setNotice("");
        router.push("/admin/security-verification");
      }}>
        {notice && <p className={styles.hint} role="status">{notice}</p>}
        <EmailField />
        <Field label="Password">{(id) => (
          <input id={id} type="password" autoComplete="current-password" placeholder="Enter password" className={styles.control} required />
        )}</Field>
        <Link href="/admin/forgot-password" className={styles.link}>Forgot password?</Link>
        <label className={styles.option}><input type="checkbox" />Remember me</label>
        <button className={`${styles.primary} ${styles.accountButton}`} type="submit">Sign in</button>
      </form>
    </AccountFrame>
  );
}

function PasswordForm({ setup = false }: { setup?: boolean }) {
  const router = useRouter();
  const { setAccount, setNotice } = useAccountPreview();
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmation = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.current?.value !== confirmation.current?.value) {
      setError("The passwords must match.");
      confirmation.current?.focus();
      return;
    }
    setError("");
    if (setup) {
      const fullName = name.current?.value.trim();
      const emailAddress = email.current?.value.trim();
      if (!fullName || !emailAddress) {
        setError("Enter your name and email address.");
        return;
      }
      // Only the display details move between preview screens.
      setAccount({ name: fullName, email: emailAddress });
      router.push("/admin/verify-email");
    } else {
      setNotice("Password reset complete in this preview.");
      router.push("/admin/sign-in");
    }
  }

  return (
    <AccountFrame
      title={setup ? "Set up your administrator account" : "Create a new password"}
      text={setup ? "Create the primary administrator account to manage your ProductPointers platform." : "Choose a strong password you haven’t used before."}
      icon={setup ? undefined : LockKeyhole}
      footer={setup ? "Restricted initial setup. Authorized access only." : "Your password will be updated securely."}
    >
      <form className={styles.accountForm} method="post" onSubmit={submit}>
        {setup && <>
          <Field label="Full name">{(id) => (
            <input id={id} ref={name} autoComplete="name" placeholder="Enter your full name" className={styles.control} required />
          )}</Field>
          <Field label="Email address">{(id) => (
            <input id={id} ref={email} type="email" autoComplete="email" placeholder="Enter email address" className={styles.control} required />
          )}</Field>
        </>}
        <Field label="Create password" hint="Use at least 8 characters.">{(id, hintId) => (
          <input id={id} ref={password} type="password" autoComplete="new-password" placeholder="Enter your password"
            minLength={8} aria-describedby={hintId} className={styles.control} required />
        )}</Field>
        <Field label="Confirm password">{(id) => (
          <input id={id} ref={confirmation} type="password" autoComplete="new-password" placeholder="Re-enter your password"
            aria-invalid={Boolean(error)} className={styles.control} required onChange={() => setError("")} />
        )}</Field>
        {setup && <>
          <label className={styles.option}><input type="checkbox" required />I agree to the Terms of Service and Privacy Policy.</label>
          <div className={styles.infoBox}>
            <p className={styles.infoLabel}>Assigned role</p>
            <p className={styles.infoValue}>Super Admin</p>
            <p className={styles.hint}>Full administrative access to the platform.</p>
          </div>
        </>}
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={`${styles.primary} ${styles.accountButton}`} type="submit">
          {setup ? "Create super admin account" : "Reset password"}
        </button>
      </form>
    </AccountFrame>
  );
}

function CodeInput({ label }: { label: string }) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function enter(index: number, value: string) {
    const numbers = value.replace(/[^0-9]/g, "");
    if (!numbers) {
      if (!value) setDigits(digits.map((digit, position) => position === index ? "" : digit));
      return;
    }
    const start = numbers.length >= digits.length ? 0 : index;
    const entered = numbers.slice(0, digits.length - start);
    setDigits(digits.map((digit, position) => entered[position - start] ?? digit));
    inputs.current[Math.min(start + entered.length, digits.length - 1)]?.focus();
  }

  return (
    <fieldset className={styles.field}>
      <legend className={styles.fieldLegend}>{label}</legend>
      <div className={styles.otp}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => { inputs.current[index] = node; }}
            aria-label={`Digit ${index + 1} of ${digits.length}`}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            pattern="[0-9]"
            value={digit}
            required
            onChange={(event) => enter(index, event.target.value)}
            onFocus={(event) => event.currentTarget.select()}
            onPaste={(event) => {
              event.preventDefault();
              enter(index, event.clipboardData.getData("text"));
            }}
            onKeyDown={(event) => {
              if ((event.key === "Backspace" && !digit) || event.key === "ArrowLeft") inputs.current[index - 1]?.focus();
              if (event.key === "ArrowRight") inputs.current[index + 1]?.focus();
            }}
          />
        ))}
      </div>
    </fieldset>
  );
}

function Verification({ security = false }: { security?: boolean }) {
  const router = useRouter();
  const { account } = useAccountPreview();
  const [resend, setResend] = useState(false);

  return (
    <AccountFrame
      title={security ? "Security verification" : "Verify email address"}
      text={security ? "Enter the six-digit code from your authenticator app to continue." : "Create your admin account to get started."}
      icon={security ? ShieldCheck : MailCheck}
      success={security}
      footer={!security && <>
        <p>Didn’t receive the code?</p>
        <button type="button" className={styles.link} onClick={() => setResend(true)}>Resend code</button>
        {resend && <p role="status">Code resend simulated. You can use any six digits in this preview.</p>}
      </>}
    >
      <form className={styles.accountForm} method="post" onSubmit={(event) => {
        event.preventDefault();
        router.push(security ? "/admin/dashboard" : "/admin/activated");
      }}>
        {!security && <div className={styles.infoBox}>
          <p className={styles.infoLabel}>Verification email sent to</p>
          <p className={styles.infoValue}>{account.email}</p>
        </div>}
        <CodeInput label={security ? "Authentication code" : "Enter verification code"} />
        <button className={`${styles.primary} ${styles.accountButton}`} type="submit">
          {security ? "Verify and continue" : "Verify email"}
        </button>
      </form>
    </AccountFrame>
  );
}

function Activated() {
  const { account } = useAccountPreview();
  return (
    <AccountFrame
      title="Account activated!"
      text="Your email has been verified and your admin account is ready."
      icon={CircleCheck}
      success
      footer="You can now sign in using your registered email and password."
    >
      <dl className={`${styles.infoBox} ${styles.accountSummary}`}>
        <div><dt>Name</dt><dd>{account.name}</dd></div>
        <div><dt>Email</dt><dd>{account.email}</dd></div>
        <div><dt>Assigned role</dt><dd><Badge tone="purple">Super Admin</Badge></dd></div>
        <div><dt>Account status</dt><dd><Badge tone="purple">Active</Badge></dd></div>
      </dl>
      <Link href="/admin/sign-in" className={`${styles.primary} ${styles.accountButton}`}>Continue to sign in</Link>
    </AccountFrame>
  );
}

function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <AccountFrame
      title="Forgot your password?"
      text="Enter the email address linked to your admin account and we’ll send you a password reset link."
      icon={LockKeyhole}
      footer={<Link href="/admin/sign-in" className={styles.link}>Back to sign in</Link>}
    >
      <form className={styles.accountForm} method="post" onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}>
        <EmailField />
        <button className={`${styles.primary} ${styles.accountButton}`} type="submit">Send reset link</button>
        {submitted && <div className={styles.infoBox} role="status">
          <p>A reset request was simulated.</p>
          <Link href="/admin/reset-password" className={styles.link}>Preview the password reset screen</Link>
        </div>}
      </form>
    </AccountFrame>
  );
}

export function AdminAccount({ screen }: {
  screen: "sign-in" | "setup" | "verify-email" | "activated" | "forgot-password" | "reset-password" | "security-verification";
}) {
  switch (screen) {
    case "sign-in": return <SignIn />;
    case "setup": return <PasswordForm setup />;
    case "reset-password": return <PasswordForm />;
    case "verify-email": return <Verification />;
    case "security-verification": return <Verification security />;
    case "activated": return <Activated />;
    case "forgot-password": return <ForgotPassword />;
  }
}
