"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Captions, CircleCheck, CircleDashed, CircleHelp, Mic, MicOff, RefreshCw, Video, VideoOff, Volume2 } from "lucide-react";
import { Badge } from "../admin/AdminUI";
import { PreviewDialog, PreviewTabs } from "../admin/PreviewControls";
import { readInterviewPreview, type InterviewPreview } from "../admin/interview-preview";
import styles from "../admin/admin.module.css";
import ui from "./interview.module.css";

const checks = [
  { name: "Working microphone", description: "Speak into your microphone to confirm that your voice can be detected." },
  { name: "Working camera", description: "Camera is connected and showing a clear picture." },
  { name: "Face in frame", description: "Position your face in the centre of the picture." },
  { name: "Good lighting", description: "Face a window or lamp for a clearer picture." },
  { name: "Stable camera", description: "Keep the picture steady." },
  { name: "Stable internet connection", description: "Check your connection before starting." },
];

export function MediaPreview({ stream, cameraOn }: { stream: MediaStream | null; cameraOn: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (video.current) video.current.srcObject = stream;
  }, [stream, cameraOn]);
  return <div className={ui.video}>
    {stream && cameraOn ? <video ref={video} autoPlay muted playsInline aria-label="Local camera preview" />
      : <div><VideoOff size={32} aria-hidden /><p>{cameraOn ? "Camera preview" : "Camera off"}</p></div>}
  </div>;
}

export function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function AiInterviewExperience() {
  const [stage, setStage] = useState<"setup" | "interview" | "completed">("setup");
  const [reviewTab, setReviewTab] = useState("Setup checks");
  const [permission, setPermission] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [sampleChecks, setSampleChecks] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [camera, setCamera] = useState("");
  const [microphone, setMicrophone] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [mediaStatus, setMediaStatus] = useState("");
  const [requesting, setRequesting] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRequest = useRef(0);
  const [config, setConfig] = useState<InterviewPreview | null>(null);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [captions, setCaptions] = useState(false);
  const [dialog, setDialog] = useState<"end" | "help" | null>(null);

  useEffect(() => () => {
    mediaRequest.current += 1;
    streamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  useEffect(() => {
    if (!deadline || stage !== "interview") return;
    const timer = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0) {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setStream(null);
        setDialog(null);
        setStage("completed");
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [deadline, stage]);

  function releaseMedia() {
    mediaRequest.current += 1;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setRequesting(false);
    setStream(null);
  }

  async function connectDevices() {
    releaseMedia();
    const request = mediaRequest.current;
    setRequesting(true);
    setMediaStatus("Waiting for camera and microphone permission…");
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: camera ? { deviceId: { exact: camera } } : true,
        audio: microphone ? { deviceId: { exact: microphone } } : true,
      });
      if (request !== mediaRequest.current) {
        media.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = media;
      setStream(media);
      setCameraOn(true);
      setMicOn(true);
      setMediaStatus("Camera and microphone connected locally.");
      const available = await navigator.mediaDevices.enumerateDevices();
      if (request === mediaRequest.current) setDevices(available);
    } catch {
      if (request === mediaRequest.current) setMediaStatus("Camera or microphone access is unavailable. Check your browser permissions or run the sample checks.");
    } finally {
      if (request === mediaRequest.current) setRequesting(false);
    }
  }

  async function playSound() {
    let audio: AudioContext | undefined;
    try {
      // A short tone checks the browser's output without recording or uploading media.
      audio = new AudioContext();
      const output = audio as AudioContext & { setSinkId?: (deviceId: string) => Promise<void> };
      if (speaker && output.setSinkId) await output.setSinkId(speaker);
      const tone = audio.createOscillator();
      const level = audio.createGain();
      level.gain.value = 0.1;
      tone.connect(level).connect(audio.destination);
      tone.start();
      tone.stop(audio.currentTime + 0.2);
      const context = audio;
      tone.onended = () => { void context.close(); };
      setMediaStatus("Played a short test tone.");
    } catch {
      if (audio) void audio.close();
      setMediaStatus("The test sound could not be played.");
    }
  }

  const active = config?.questions[index];
  const ready = permission && acknowledged && sampleChecks;

  function start() {
    if (!ready) return;
    const configuration = readInterviewPreview();
    const seconds = configuration.duration * 60;
    setConfig(configuration);
    setRemaining(seconds);
    setDeadline(Date.now() + seconds * 1000);
    setStage("interview");
  }

  function finish() {
    releaseMedia();
    setAnswered(false);
    setDialog(null);
    setStage("completed");
  }

  function advance() {
    if (!answered || !config) return;
    setResponseCount((count) => count + 1);
    if (index + 1 === config.questions.length) finish();
    else {
      setIndex(index + 1);
      setAnswered(false);
    }
  }

  function toggleTrack(kind: "audio" | "video") {
    const enabled = kind === "audio" ? !micOn : !cameraOn;
    stream?.getTracks().filter((track) => track.kind === kind).forEach((track) => { track.enabled = enabled; });
    if (kind === "audio") setMicOn(enabled);
    else setCameraOn(enabled);
  }

  return <main className={ui.experience}>
    <header className={ui.brand}>
      <Image src="/pp_logo2.png" width={176} height={34} alt="ProductPointers" priority />
      <span className={styles.hint}>Interview preview</span>
    </header>
    {stage === "setup" && <div className={ui.layout}>
      <section className={ui.setup}>
        <h1>Get ready for your interview</h1>
        <p className={styles.hint}>Find a quiet space and keep your camera and microphone on. Use sample checks to walk through this preview.</p>
        <MediaPreview stream={stream} cameraOn={cameraOn} />
        <label className={styles.option}><input type="checkbox" checked={permission} onChange={(event) => {
          setPermission(event.target.checked);
          if (!event.target.checked) { releaseMedia(); setSampleChecks(false); setMediaStatus(""); }
        }} />I agree to use camera and microphone permissions for the local preview.</label>
        <div className={ui.devices}>
          {[
            { label: "Microphone", kind: "audioinput", selected: microphone, change: setMicrophone },
            { label: "Speaker", kind: "audiooutput", selected: speaker, change: setSpeaker },
            { label: "Camera", kind: "videoinput", selected: camera, change: setCamera },
          ].map(({ label, kind, selected, change }) => <label key={kind}>
            <span>{label}</span>
            <select className={styles.control} value={selected} onChange={(event) => change(event.target.value)} disabled={!permission}>
              <option value="">Default {label.toLowerCase()}</option>
              {devices.filter((device) => device.kind === kind && device.deviceId && device.deviceId !== "default")
                .map((device) => <option key={device.deviceId} value={device.deviceId}>{device.label || label}</option>)}
            </select>
          </label>)}
        </div>
        <div className={ui.actions}>
          <button type="button" className={styles.secondary} disabled={!permission || requesting} onClick={() => void connectDevices()}>
            {stream ? <RefreshCw size={17} /> : <Video size={17} />}{stream ? "Restart devices" : "Connect camera and microphone"}
          </button>
          <button type="button" className={styles.secondary} onClick={() => void playSound()}><Volume2 size={17} />Play test sound</button>
        </div>
        {mediaStatus && <p role="status" className={styles.hint}>{mediaStatus}</p>}
      </section>
      <section className={ui.panel} aria-label="Interview readiness">
        <div className={ui.panelInner}><PreviewTabs labels={["Setup checks", "About assessment"]} selected={reviewTab} onSelect={setReviewTab} name="Interview preparation" /></div>
        {reviewTab === "Setup checks" ? <>
          <div className={ui.progress}><strong>{sampleChecks ? "6 of 6" : "0 of 6"} checks complete</strong><progress aria-label="Setup checks complete" max={checks.length} value={sampleChecks ? checks.length : 0} /></div>
          <ul className={ui.checks}>{checks.map((check) => <li key={check.name}>
            {sampleChecks ? <CircleCheck color="#167240" size={19} aria-hidden /> : <CircleDashed color="#817d8b" size={19} aria-hidden />}
            <div><strong>{check.name}</strong><p className={styles.hint}>{check.description}</p></div>
            <Badge tone={sampleChecks ? "green" : "muted"}>{sampleChecks ? "Sample pass" : "Pending"}</Badge>
          </li>)}</ul>
          <div className={ui.panelInner}>
            <button type="button" className={styles.secondary} disabled={!permission} onClick={() => setSampleChecks(true)}>
              {sampleChecks ? "Run sample checks again" : "Run sample checks"}
            </button>
          </div>
        </> : <div className={ui.panelInner}>
          <h2>About the assessment</h2>
          <p className={styles.hint}>The sample interview walks through product management questions. The staff dashboard shows sample scores and supports human review.</p>
          <p className={styles.hint}>Your video stays on this device. The preview uses a sample spoken answer.</p>
        </div>}
        <div className={ui.panelInner}>
          <label className={styles.option}><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} />
            I understand this is a preview of an AI-assisted interview.</label>
          <button type="button" className={styles.primary} disabled={!ready} onClick={start}>Start interview</button>
        </div>
      </section>
    </div>}
    {stage === "interview" && active && config && <div className={ui.layout}>
      <section className={ui.setup} aria-label="Interview controls">
        <MediaPreview stream={stream} cameraOn={cameraOn} />
        {captions && <p className={ui.caption}>{active.prompt}</p>}
        <div className={ui.actions}>
          <button type="button" className={styles.secondary} aria-pressed={micOn} onClick={() => toggleTrack("audio")}>{micOn ? <Mic size={17} /> : <MicOff size={17} />}Microphone</button>
          <button type="button" className={styles.secondary} aria-pressed={cameraOn} onClick={() => toggleTrack("video")}>{cameraOn ? <Video size={17} /> : <VideoOff size={17} />}Camera</button>
          <button type="button" className={styles.secondary} aria-pressed={captions} onClick={() => setCaptions(!captions)}><Captions size={17} />Captions</button>
          <button type="button" className={styles.secondary} onClick={() => setDialog("help")}><CircleHelp size={17} />Help</button>
          <button type="button" className={ui.danger} onClick={() => setDialog("end")}>End interview</button>
        </div>
      </section>
      <section className={ui.panel} aria-label="Interview questions">
        <div className={ui.progress}>
          <strong>Question group {index + 1} of {config.questions.length}</strong>
          <time>{formatTime(remaining)} remaining</time>
          <progress aria-label="Interview question progress" value={index + 1} max={config.questions.length} />
        </div>
        <div className={ui.panelInner}>
          <h1>{active.group}</h1>
          {index === 0 && <p className={styles.hint}>{config.intro}</p>}
          <p>{active.prompt}</p>
          <div className={ui.transcript}>
            <h2>Your spoken answer</h2>
            <p>{answered ? "I would start by speaking with learners and checking where they stop progressing." : "Your transcript will appear here after you speak."}</p>
          </div>
          {!answered && <button type="button" className={styles.secondary} onClick={() => setAnswered(true)}>Show sample transcript</button>}
          <button type="button" className={styles.primary} disabled={!answered} onClick={advance}>
            {index + 1 === config.questions.length ? "Finish interview" : "Next question"}
          </button>
        </div>
      </section>
    </div>}
    {stage === "completed" && <section className={ui.completed} aria-labelledby="interview-completed">
      <CircleCheck size={48} aria-hidden />
      <h1 id="interview-completed">Interview completed.</h1>
      <p>Your preview is complete. You answered {responseCount} {responseCount === 1 ? "question" : "questions"}.</p>
      <button type="button" className={styles.secondary} onClick={() => window.location.reload()}>Restart preview</button>
    </section>}
    {dialog === "end" && <PreviewDialog title="End your interview?" close={() => setDialog(null)} save="End interview" danger submit={finish}>
      <p>Ending the preview closes this interview and releases your devices.</p>
    </PreviewDialog>}
    {dialog === "help" && <PreviewDialog title="Interview help" close={() => setDialog(null)}>
      <p>Check your browser permissions if you lose access to your devices. Select Show sample transcript to try the interview progression.</p>
    </PreviewDialog>}
  </main>;
}
