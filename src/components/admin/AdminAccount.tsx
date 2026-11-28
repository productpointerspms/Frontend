"use client";

import {
  createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleCheck, LockKeyhole, MailCheck, ShieldCheck, type LucideIcon } from "lucide-react";
import { Badge, Field } from "./AdminUI";
import { adminRequest, useAdminAction } from "./admin-api";
import type { AdminRole } from "./ManagementData";
import styles from "./admin.module.css";

export type AdminProfile = { id: string; name: string; email: string; role: AdminRole; sections: string[] };
type Challenge = { token: string; email?: string; remember?: boolean };

const AccountContext = createContext<{
  activated: AdminProfile | null;
  setActivated: (account: AdminProfile) => void;
  challenge: Challenge | null;
  setChallenge: (challenge: Challenge | null) => void;
  notice: string;
  setNotice: (notice: string) => void;
} | null>(null);

export function AdminAccountProvider({ children }: { children: ReactNode }) {
  const [activated, setActivated] = useState<AdminProfile | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [notice, setNotice] = useState("");
  return <AccountContext.Provider value={{ activated, setActivated, challenge, setChallenge, notice, setNotice }}>{children}</AccountContext.Provider>;
}

function useAccount() {
  const account = useContext(AccountContext);
  if (!account) throw new Error("Administrator screens require the account layout.");
  return account;
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
      </section>
    </main>
  );
}

function EmailField() {
  return (
    <Field label="Email address">{(id) => (
      <input id={id} name="email" type="email" autoComplete="email" placeholder="Enter email address" className={styles.control} required />
    )}</Field>
  );
}

function SignIn() {
  const router = useRouter();
  const { notice, setNotice, setChallenge } = useAccount();
  const { run, error, pending } = useAdminAction();

  return (
    <AccountFrame
      title="Welcome back"
      text="Sign in to your admin account"
      footer="Admin access only. Use the email address associated with your ProductPointers admin account."
    >
      <form method="post" className={styles.accountForm} onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const remember = form.has("remember");
        void run(async () => {
          const challenge = await adminRequest<Challenge & { requiresMfa: boolean }>("auth/login", "POST", {
            email: form.get("email"), password: form.get("password"), remember,
          });
          setNotice("");
          if (!challenge.requiresMfa) {
            setChallenge(null);
            router.replace("/admin/dashboard");
            return;
          }
          setChallenge({ ...challenge, remember });
          router.push("/admin/security-verification");
        });
      }}>
        {notice && <p className={styles.hint} role="status">{notice}</p>}
        <EmailField />
        <Field label="Password">{(id) => (
          <input id={id} name="password" type="password" autoComplete="current-password" placeholder="Enter password" className={styles.control} required />
        )}</Field>
        <Link href="/admin/forgot-password" className={styles.link}>Forgot password?</Link>
        <label className={styles.option}><input type="checkbox" name="remember" />Remember me</label>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={`${styles.primary} ${styles.accountButton}`} type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
      </form>
    </AccountFrame>
  );
}

function PasswordForm({ setup = false, invited = false }: { setup?: boolean; invited?: boolean }) {
  const router = useRouter();
  const { setChallenge, setNotice } = useAccount();
  const { run, error, pending, setError } = useAdminAction();
  const confirmation = useRef<HTMLInputElement>(null);
  const linkToken = useRef("");
  useEffect(() => {
    if (setup) return;
    const url = new URL(window.location.href);
    const token = new URLSearchParams(url.hash.slice(1)).get("token") ?? url.searchParams.get("token");
    if (token) {
      // Keep the emailed credential in memory after removing it from browser history.
      linkToken.current = token;
      url.hash = "";
      url.searchParams.delete("token");
      window.history.replaceState(window.history.state, "", url);
    }
  }, [setup]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!setup && !linkToken.current) {
      setError("Open the link from your email to continue.");
      return;
    }
    const password = form.get("password");
    if (password !== confirmation.current?.value) {
      setError("The passwords must match.");
      confirmation.current?.focus();
      return;
    }

    void run(async () => {
      if (setup || invited) {
        const email = String(form.get("email")).trim();
        const result = await adminRequest<Challenge>("auth/setup", "POST", {
          email, name: String(form.get("name")).trim(), password, ...(invited ? { inviteToken: linkToken.current } : {}),
        });
        setChallenge({ ...result, email });
        router.replace(invited ? "/admin/verify-invitation" : "/admin/verify-email");
      } else {
        await adminRequest("auth/reset-password", "POST", { password, token: linkToken.current });
        setNotice("Your password was reset. Sign in with your new password.");
        router.replace("/admin/sign-in");
      }
    });
  }

  return (
    <AccountFrame
      title={invited ? "You’re invited!" : setup ? "Set up your administrator account" : "Create a new password"}
      text={invited ? "Set up your account to join ProductPointers." : setup
        ? "Create the primary administrator account to manage your ProductPointers platform."
        : "Choose a strong password you haven’t used before."}
      icon={setup || invited ? undefined : LockKeyhole}
      footer={invited ? undefined : setup ? "Restricted initial setup. Authorized access only." : "Your password will be updated securely."}
    >
      <form className={styles.accountForm} method="post" onSubmit={submit}>
        {(setup || invited) && <>
          <Field label="Full name">{(id) => (
            <input id={id} name="name" autoComplete="name" placeholder="Enter your full name" className={styles.control} required />
          )}</Field>
          <Field label="Email address">{(id) => (
            <input id={id} name="email" type="email" autoComplete="email" placeholder="Enter email address" className={styles.control} required />
          )}</Field>
        </>}
        <Field label="Create password" hint="Use at least 8 characters.">{(id, hintId) => (
          <input id={id} name="password" type="password" autoComplete="new-password" placeholder="Enter your password"
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
        <button className={`${styles.primary} ${styles.accountButton}`} type="submit" disabled={pending}>
          {pending ? (setup || invited ? "Creating account…" : "Resetting password…") : invited ? "Create account" : setup ? "Create super admin account" : "Reset password"}
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
            name="digit"
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

function Verification({ security = false, invited = false }: { security?: boolean; invited?: boolean }) {
  const router = useRouter();
  const { challenge, setChallenge, setActivated } = useAccount();
  const { run, error, pending } = useAdminAction();
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);

  return (
    <AccountFrame
      title={security ? "Security verification" : "Verify email address"}
      text={security ? "Enter the six-digit code from your authenticator app to continue." : "Enter the code sent to your administrator email."}
      icon={security ? ShieldCheck : MailCheck}
      success={security}
      footer={!security && challenge && <>
        <button type="button" className={styles.link} disabled={pending} onClick={() => void run(async () => {
          setResending(true);
          try {
            const result = await adminRequest<Challenge>("auth/resend", "POST", { token: challenge.token });
            setChallenge({ ...challenge, token: result.token });
            setResent(true);
          } finally { setResending(false); }
        })}>{resending ? "Sending…" : "Resend code"}</button>
        {resent && <p role="status">A new code was sent.</p>}
      </>}
    >
      {challenge ? <form className={styles.accountForm} method="post" onSubmit={(event) => {
        event.preventDefault();
        const code = new FormData(event.currentTarget).getAll("digit").join("");
        void run(async () => {
          const body = { token: challenge.token, code };
          if (security) {
            await adminRequest("auth/verify-authenticator", "POST", { ...body, remember: challenge.remember });
            router.replace("/admin/dashboard");
          } else {
            setActivated(await adminRequest<AdminProfile>("auth/verify-email", "POST", body));
            router.replace("/admin/activated");
          }
          setChallenge(null);
        });
      }}>
        {!security && <div className={styles.infoBox}>
          <p className={styles.infoLabel}>Verification email sent to</p>
          <p className={styles.infoValue}>{challenge.email}</p>
        </div>}
        <CodeInput key={challenge.token} label={security ? "Authentication code" : "Enter verification code"} />
        <button className={`${styles.primary} ${styles.accountButton}`} type="submit" disabled={pending}>
          {pending && !resending ? "Verifying…" : security ? "Verify and continue" : "Verify email"}
        </button>
      </form> : <Link className={styles.link} href={security ? "/admin/sign-in" : invited ? "/admin/sign-in" : "/admin/setup"}>
        {security ? "Return to sign in" : invited ? "Reopen the invitation link from your email" : "Restart account setup"}
      </Link>}
      {error && <p className={styles.error} role="alert">{error}</p>}
    </AccountFrame>
  );
}

function Activated() {
  const { activated: account } = useAccount();
  return (
    <AccountFrame
      title="Account activated!"
      text="Your email has been verified and your admin account is ready."
      icon={CircleCheck}
      success
      footer="You can now sign in using your registered email and password."
    >
      {account && <dl className={`${styles.infoBox} ${styles.accountSummary}`}>
        <div><dt>Name</dt><dd>{account.name}</dd></div>
        <div><dt>Email</dt><dd>{account.email}</dd></div>
        <div><dt>Assigned role</dt><dd><Badge tone="purple">{account.role}</Badge></dd></div>
        <div><dt>Account status</dt><dd><Badge tone="purple">Active</Badge></dd></div>
      </dl>}
      <Link href="/admin/sign-in" className={`${styles.primary} ${styles.accountButton}`}>Continue to sign in</Link>
    </AccountFrame>
  );
}

function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const { run, error, pending } = useAdminAction();
  return (
    <AccountFrame
      title="Forgot your password?"
      text="Enter the email address linked to your admin account and we’ll send you a password reset link."
      icon={LockKeyhole}
      footer={<Link href="/admin/sign-in" className={styles.link}>Back to sign in</Link>}
    >
      <form className={styles.accountForm} method="post" onSubmit={(event) => {
        event.preventDefault();
        const email = new FormData(event.currentTarget).get("email");
        void run(async () => {
          await adminRequest("auth/forgot-password", "POST", { email });
          setSubmitted(true);
        });
      }}>
        <EmailField />
        <button className={`${styles.primary} ${styles.accountButton}`} type="submit" disabled={pending}>{pending ? "Sending…" : "Send reset link"}</button>
        {error && <p className={styles.error} role="alert">{error}</p>}
        {submitted && <div className={styles.infoBox} role="status">
          <p>If the account exists, you’ll receive a password reset link.</p>
        </div>}
      </form>
    </AccountFrame>
  );
}

export function AdminAccount({ screen }: {
  screen: "sign-in" | "setup" | "verify-email" | "activated" | "forgot-password" | "reset-password" | "security-verification" | "invitation" | "verify-invitation";
}) {
  switch (screen) {
    case "sign-in": return <SignIn />;
    case "setup": return <PasswordForm setup />;
    case "reset-password": return <PasswordForm />;
    case "verify-email": return <Verification />;
    case "security-verification": return <Verification security />;
    case "activated": return <Activated />;
    case "forgot-password": return <ForgotPassword />;
    case "invitation": return <PasswordForm invited />;
    case "verify-invitation": return <Verification invited />;
  }
}
