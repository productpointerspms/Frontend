"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@/lib/application";
import { InterviewVoicePilot } from "../admin/InterviewVoicePilot";
import styles from "../admin/admin.module.css";

type Session = {
  deadline: string | null;
  intro?: string;
  submitted: string | null;
  questions?: { id: string; group: string; prompt: string }[];
  answers: Record<string, string>;
};
async function request<T>(
  token: string,
  path: string,
  method = "GET",
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(API_BASE_URL + "/interview" + path, {
    method,
    signal,
    cache: "no-store",
    headers: {
      Authorization: "Bearer " + token,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = await response.json();
  if (!response.ok || result.statusCode !== "00")
    throw Error(result.message || "Interview request failed");
  return result.data;
}

export function CandidateInterview() {
  const [token, setToken] = useState("");
  const [session, setSession] = useState<Session>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [consent, setConsent] = useState(false);
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const currentDraft = useRef("");
  const [now, setNow] = useState(Date.now);
  const [saved, setSaved] = useState("");
  const queue = useRef(Promise.resolve());
  const persist = useCallback(
    (id: string, answer: string) => {
      // Serialize drafts so a slow request cannot overwrite a newer answer.
      const operation = queue.current.then(async () => {
        await request(token, "/answer", "PUT", { id, answer });
        setSession((previous) =>
          previous
            ? { ...previous, answers: { ...previous.answers, [id]: answer } }
            : previous,
        );
      });
      queue.current = operation.catch(() => {});
      return operation;
    },
    [token],
  );
  useEffect(() => {
    const credential = window.location.hash.slice(1);
    if (!credential) {
      setError("Open the private interview link from your application email.");
      return;
    }
    setToken(credential);
    request<Session>(credential, "")
      .then((data) => {
        setSession(data);
        const next = Math.max(
          0,
          data.questions?.findIndex((q) => !data.answers[q.id]) ?? 0,
        );
        setIndex(next);
        const text = data.answers[data.questions?.[next]?.id ?? ""] ?? "";
        currentDraft.current = text;
        setDraft(text);
      })
      .catch((e) => setError(e.message));
  }, []);
  useEffect(() => {
    if (!session?.deadline || session.submitted) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [session?.deadline, session?.submitted]);
  const question = session?.questions?.[index];
  const remaining = Math.max(
    0,
    Math.ceil((Date.parse(session?.deadline ?? "") - now) / 1000),
  );
  const questionId = question?.id;
  const storedAnswer = questionId ? (session?.answers[questionId] ?? "") : "";
  useEffect(() => {
    if (!questionId || session?.submitted || draft === storedAnswer) return;
    const timer = window.setTimeout(async () => {
      try {
        await persist(questionId, draft);
        if (draft === currentDraft.current) setSaved("Answer saved");
      } catch {
        setError(
          "Could not save this answer. Check your connection and select Save answer.",
        );
      }
    }, 700);
    return () => window.clearTimeout(timer);
  }, [draft, questionId, session?.submitted, storedAnswer, persist]);
  function update(text: string) {
    currentDraft.current = text;
    setDraft(text);
    setSaved("");
  }
  async function action(fn: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }
  async function save() {
    if (!question) return;
    const answer = currentDraft.current;
    await persist(question.id, answer);
    setSaved("Answer saved");
  }
  function move(next: number) {
    if (!session?.questions) return;
    setIndex(next);
    update(session.answers[session.questions[next].id] ?? "");
  }
  return (
    <main className={`${styles.admin} ${styles.accountPage}`}>
      <section className={styles.accountCard}>
        <h1>Apprenticeship scholarship interview</h1>
        {error && <p role="alert">{error}</p>}
        {session?.submitted ? (
          <p>
            Your responses have been submitted. The admissions team will review
            them alongside your application.
          </p>
        ) : session && !session.deadline ? (
          <>
            <p>
              You can speak with the AI interviewer or type each answer. Staff
              will review your answers and assessment. Your timer starts when
              you begin.
            </p>
            <label>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />{" "}
              I agree to have my responses saved and assessed for this
              application.
            </label>
            <button
              className={styles.primary}
              disabled={!consent || busy}
              onClick={() =>
                action(async () =>
                  setSession(await request(token, "/start", "POST")),
                )
              }
            >
              Begin interview
            </button>
          </>
        ) : question && session ? (
          <>
            <p>{session.intro}</p>
            <p>
              Question {index + 1} of {session.questions!.length} ·{" "}
              {Math.floor(remaining / 60)}:
              {String(remaining % 60).padStart(2, "0")} remaining
            </p>
            <h2>{question.group}</h2>
            <p>{question.prompt}</p>
            {remaining > 0 && (
              <InterviewVoicePilot
                key={question.id}
                questions={[question.prompt]}
                minutes={remaining / 60}
                candidate={{
                  connect: (sdp, signal) =>
                    request(
                      token,
                      "/voice",
                      "POST",
                      { id: question.id, sdp },
                      signal,
                    ),
                  transcript: (text) =>
                    update(
                      [currentDraft.current, text]
                        .filter(Boolean)
                        .join("\n")
                        .slice(0, 8000),
                    ),
                }}
              />
            )}
            <div className={styles.answerForm}>
              <div className={styles.field}>
                <label htmlFor="candidate-answer">Your answer</label>
                <textarea
                  id="candidate-answer"
                  className={styles.control}
                  rows={8}
                  value={draft}
                  maxLength={8000}
                  disabled={busy || !remaining}
                  onChange={(e) => update(e.target.value)}
                />
              </div>
              <p role="status">
                {remaining
                  ? saved
                  : "Time ended. Your saved answers will be submitted."}
              </p>
              <div className={styles.buttonRow}>
                {remaining > 0 && (
                  <>
                    <button
                      className={styles.secondary}
                      disabled={busy}
                      onClick={() => action(save)}
                    >
                      Save answer
                    </button>
                    {index > 0 && (
                      <button
                        disabled={busy}
                        onClick={() =>
                          action(async () => {
                            await save();
                            move(index - 1);
                          })
                        }
                      >
                        Previous question
                      </button>
                    )}
                  </>
                )}
                {remaining > 0 && index + 1 < session.questions!.length ? (
                  <button
                    className={styles.primary}
                    disabled={busy}
                    onClick={() =>
                      action(async () => {
                        await save();
                        move(index + 1);
                      })
                    }
                  >
                    Next question
                  </button>
                ) : (
                  <button
                    className={styles.primary}
                    disabled={busy}
                    onClick={() =>
                      action(async () => {
                        if (remaining) await save();
                        await request(token, "/submit", "POST");
                        setSession({
                          ...session,
                          submitted: new Date().toISOString(),
                        });
                      })
                    }
                  >
                    Submit interview
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          !error && <p>Opening interview…</p>
        )}
      </section>
    </main>
  );
}
