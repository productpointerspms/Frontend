"use client";

import Image from "next/image";
import { Captions, CircleCheck, CircleHelp, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@/lib/application";
import { InterviewVoicePilot } from "../admin/InterviewVoicePilot";
import { PreviewDialog } from "../admin/PreviewControls";
import { CandidateInterviewSetup } from "./CandidateInterviewSetup";
import { formatTime, MediaPreview } from "./AiInterviewExperience";
import styles from "../admin/admin.module.css";
import ui from "./interview.module.css";

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
  const [dialog, setDialog] = useState<"end" | "help" | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraBusy, setCameraBusy] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const cameraStream = useRef<MediaStream | null>(null);
  const cameraRequest = useRef(0);
  const cameraDevice = useRef("");
  const [microphone, setMicrophone] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(false);
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
  useEffect(() => () => {
    cameraRequest.current += 1;
    cameraStream.current?.getTracks().forEach(track => track.stop());
  }, []);

  function stopCamera() {
    cameraRequest.current += 1;
    cameraStream.current?.getTracks().forEach(track => track.stop());
    cameraStream.current = null;
    setStream(null);
    setCameraBusy(false);
  }

  async function connectCamera(deviceId = cameraDevice.current) {
    stopCamera();
    const request = cameraRequest.current;
    cameraDevice.current = deviceId;
    setCameraBusy(true);
    setCameraError("");
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
      });
      if (request !== cameraRequest.current) {
        media.getTracks().forEach(track => track.stop());
        return;
      }
      cameraStream.current = media;
      setStream(media);
      media.getVideoTracks().forEach(track => {
        track.onended = () => {
          if (cameraStream.current === media) stopCamera();
        };
      });
    } catch {
      if (request === cameraRequest.current) {
        setCameraError("Camera access is unavailable. Check your permissions or continue without video.");
      }
    } finally {
      if (request === cameraRequest.current) setCameraBusy(false);
    }
  }

  useEffect(() => {
    if (!session?.deadline || session.submitted) return;
    const deadline = Date.parse(session.deadline);
    const timer = window.setInterval(() => {
      const time = Date.now();
      setNow(time);
      if (time >= deadline) {
        stopCamera();
        window.clearInterval(timer);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [session?.deadline, session?.submitted]);
  const question = session?.questions?.[index];
  const remaining = Math.max(
    0,
    Math.ceil((Date.parse(session?.deadline ?? "") - now) / 1000),
  );
  const hasTime = remaining > 0;
  const questionId = question?.id;
  const storedAnswer = questionId ? (session?.answers[questionId] ?? "") : "";
  useEffect(() => {
    if (!questionId || !hasTime || busy || session?.submitted || draft === storedAnswer) return;
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
  }, [draft, questionId, hasTime, busy, session?.submitted, storedAnswer, persist]);
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
  async function submit() {
    setBusy(true);
    setError("");
    try {
      if (Date.parse(session?.deadline ?? "") > Date.now()) await save();
      await request(token, "/submit", "POST");
      stopCamera();
      setDialog(null);
      setSession(previous => previous && { ...previous, submitted: new Date().toISOString() });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={ui.experience}>
      <header className={ui.brand}>
        <Image src="/pp_logo2.png" width={176} height={34} alt="ProductPointers" priority />
      </header>
      {session?.submitted ? (
        <section className={ui.completed} aria-labelledby="interview-completed">
          <CircleCheck size={48} aria-hidden />
          <h1 id="interview-completed">Interview completed.</h1>
          <p>Your responses have been submitted. The admissions team will review them alongside your application.</p>
        </section>
      ) : session && !session.deadline ? (
        <CandidateInterviewSetup
          stream={stream}
          cameraBusy={cameraBusy}
          connectCamera={connectCamera}
          microphone={microphone}
          onMicrophone={setMicrophone}
          speaker={speaker}
          onSpeaker={setSpeaker}
          onStart={() => void action(async () => {
            const started = await request<Session>(token, "/start", "POST");
            setNow(Date.now());
            setSession(started);
          })}
          starting={busy}
          error={error || cameraError}
        />
      ) : question && session ? (
        <div className={ui.layout}>
          <section className={ui.roomMedia} aria-label="Interview controls">
            <MediaPreview stream={hasTime ? stream : null} cameraOn={hasTime && Boolean(stream)} />
            {captions && <p className={ui.caption}>{question.prompt}</p>}
            <div className={ui.actions}>
              <button type="button" className={styles.secondary} aria-pressed={!muted} disabled={!hasTime} onClick={() => setMuted(value => !value)}>
                {muted ? <MicOff size={17} aria-hidden /> : <Mic size={17} aria-hidden />}Microphone
              </button>
              <button type="button" className={styles.secondary} aria-pressed={Boolean(stream) && hasTime} disabled={cameraBusy || !hasTime}
                onClick={() => stream ? stopCamera() : void connectCamera()}>
                {stream ? <Video size={17} aria-hidden /> : <VideoOff size={17} aria-hidden />}{cameraBusy ? "Connecting…" : "Camera"}
              </button>
              <button type="button" className={styles.secondary} aria-pressed={captions} onClick={() => setCaptions(value => !value)}>
                <Captions size={17} aria-hidden />Question captions
              </button>
              <button type="button" className={styles.secondary} onClick={() => setDialog("help")}>
                <CircleHelp size={17} aria-hidden />Help
              </button>
              <button type="button" className={ui.danger} disabled={busy} onClick={() => setDialog("end")}>End interview</button>
            </div>
            {cameraError && <p role="alert">{cameraError}</p>}
            {hasTime && (
              <InterviewVoicePilot
                key={question.id}
                questions={[question.prompt]}
                minutes={remaining / 60}
                candidate={{
                  microphone,
                  speaker,
                  muted: muted || busy,
                  connect: (sdp, signal) => request(token, "/voice", "POST", { id: question.id, sdp }, signal),
                  transcript: text => update([currentDraft.current, text].filter(Boolean).join("\n").slice(0, 8000)),
                }}
              />
            )}
          </section>
          <section className={ui.panel} aria-label="Interview questions">
            <div className={ui.progress}>
              <div className={ui.questionProgress}>
                <strong>Question {index + 1} of {session.questions!.length}</strong>
                <time>{formatTime(remaining)} remaining</time>
              </div>
              <progress aria-label="Interview question progress" value={index + 1} max={session.questions!.length} />
            </div>
            <div className={ui.panelInner}>
              <h1>{question.group}</h1>
              {index === 0 && <p className={styles.hint}>{session.intro}</p>}
              <p className={ui.questionPrompt}>{question.prompt}</p>
              <div className={ui.transcript} aria-labelledby="candidate-answer">
                <h2 id="candidate-answer">Your spoken answer</h2>
                <p>{draft || "Your transcript will appear here after you speak."}</p>
              </div>
              <p role="status">{hasTime ? saved : "Time is up. Submit your saved answers."}</p>
              {error && <p className={styles.error} role="alert">{error}</p>}
              <div className={styles.buttonRow}>
                {hasTime && <>
                  <button type="button" className={styles.secondary} disabled={busy} onClick={() => void action(save)}>Save answer</button>
                  {index > 0 && (
                    <button type="button" className={styles.secondary} disabled={busy} onClick={() => void action(async () => {
                      await save();
                      move(index - 1);
                    })}>Previous question</button>
                  )}
                </>}
                {hasTime && index + 1 < session.questions!.length ? (
                  <button type="button" className={styles.primary} disabled={busy} onClick={() => void action(async () => {
                    await save();
                    move(index + 1);
                  })}>Next question</button>
                ) : (
                  <button type="button" className={styles.primary} disabled={busy} onClick={() => setDialog("end")}>Submit interview</button>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <section className={ui.completed}>
          <h1>Apprenticeship scholarship interview</h1>
          {error ? <p role="alert">{error}</p> : <p role="status">Opening interview…</p>}
        </section>
      )}
      {dialog === "end" && (
        <PreviewDialog title="End your interview?" close={() => setDialog(null)} save="Submit interview" danger submit={submit}>
          <p>Submitting ends the interview and sends your answers for review.</p>
        </PreviewDialog>
      )}
      {dialog === "help" && (
        <PreviewDialog title="Interview help" close={() => setDialog(null)}>
          <p>If your microphone stops working, check your browser permissions and reconnect with Speak with interviewer.</p>
        </PreviewDialog>
      )}
    </main>
  );
}
