"use client";

import { useState } from "react";
import { CircleCheck, CircleDashed, Mic, Video, Volume2 } from "lucide-react";
import { Badge } from "../admin/AdminUI";
import { PreviewTabs } from "../admin/PreviewControls";
import { MediaPreview } from "./AiInterviewExperience";
import styles from "../admin/admin.module.css";
import ui from "./interview.module.css";

export function CandidateInterviewSetup({
  stream, cameraBusy, connectCamera, microphone, onMicrophone, speaker, onSpeaker, onStart, starting, error,
}: {
  stream: MediaStream | null;
  cameraBusy: boolean;
  connectCamera: (deviceId?: string) => Promise<void>;
  microphone: string;
  onMicrophone: (deviceId: string) => void;
  speaker: string;
  onSpeaker: (deviceId: string) => void;
  onStart: () => void;
  starting: boolean;
  error: string;
}) {
  const [tab, setTab] = useState("Setup checks");
  const [consent, setConsent] = useState(false);
  const [camera, setCamera] = useState("");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [micReady, setMicReady] = useState(false);
  const [micBusy, setMicBusy] = useState(false);
  const [visualChecks, setVisualChecks] = useState(false);
  const [notice, setNotice] = useState("");

  async function updateDevices() {
    setDevices(await navigator.mediaDevices.enumerateDevices());
  }

  async function testMicrophone() {
    setMicBusy(true);
    setMicReady(false);
    setNotice("");
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        audio: microphone ? { deviceId: { exact: microphone } } : true,
      });
      const connected = media.getAudioTracks().some(track => track.readyState === "live");
      media.getTracks().forEach(track => track.stop());
      setMicReady(connected);
      setNotice(connected ? "Microphone connected." : "The microphone could not be detected.");
      await updateDevices();
    } catch {
      setNotice("Microphone access is unavailable. Allow microphone access in your browser and try again.");
    } finally {
      setMicBusy(false);
    }
  }

  async function testSound() {
    let context: AudioContext | undefined;
    try {
      context = new AudioContext();
      const output = context as AudioContext & { setSinkId?: (deviceId: string) => Promise<void> };
      if (speaker) await output.setSinkId?.(speaker);
      const tone = context.createOscillator();
      const level = context.createGain();
      level.gain.value = 0.1;
      tone.connect(level).connect(context.destination);
      const playback = context;
      tone.onended = () => { void playback.close(); };
      tone.start();
      tone.stop(context.currentTime + 0.2);
      setNotice("Test sound played.");
    } catch {
      if (context) void context.close();
      setNotice("The test sound could not be played.");
    }
  }

  const checks = [
    { name: "Working microphone", description: "Test access to the microphone you want to use.", done: micReady },
    { name: "Working camera", description: "Connect your camera to see your local preview.", done: Boolean(stream) },
    { name: "Face in frame", description: "Position your face in the centre of the picture.", done: Boolean(stream) && visualChecks },
    { name: "Good lighting", description: "Face a window or lamp for a clearer picture.", done: Boolean(stream) && visualChecks },
    { name: "Stable camera", description: "Keep the picture steady.", done: Boolean(stream) && visualChecks },
    { name: "Interview connection", description: "Your private invitation was loaded successfully.", done: true },
  ];

  return <div className={ui.layout}>
    <section className={ui.setup}>
      <h1>Get ready for your interview</h1>
      <p className={styles.hint}>Find a quiet space and test your microphone. Your timer starts when you select Start interview.</p>
      <MediaPreview stream={stream} cameraOn />
      <div className={ui.devices}>
        {[
          { label: "Microphone", kind: "audioinput", value: microphone, change: (id: string) => { onMicrophone(id); setMicReady(false); } },
          { label: "Speaker", kind: "audiooutput", value: speaker, change: onSpeaker },
          { label: "Camera", kind: "videoinput", value: camera, change: setCamera },
        ].map(({ label, kind, value, change }) => <label key={kind}>
          <span>{label}</span>
          <select className={styles.control} value={value} onChange={event => change(event.target.value)}>
            <option value="">Default {label.toLowerCase()}</option>
            {devices.filter(device => device.kind === kind && device.deviceId && device.deviceId !== "default")
              .map(device => <option key={device.deviceId} value={device.deviceId}>{device.label || label}</option>)}
          </select>
        </label>)}
      </div>
      <div className={ui.actions}>
        <button type="button" className={styles.secondary} disabled={cameraBusy} onClick={async () => {
          setVisualChecks(false);
          setNotice("");
          await connectCamera(camera);
          try { await updateDevices(); } catch { /* The default device remains available. */ }
        }}><Video size={16} aria-hidden />{cameraBusy ? "Connecting…" : stream ? "Reconnect camera" : "Connect camera"}</button>
        <button type="button" className={styles.secondary} disabled={micBusy} onClick={() => void testMicrophone()}>
          <Mic size={16} aria-hidden />{micBusy ? "Checking…" : "Test microphone"}
        </button>
        <button type="button" className={styles.secondary} onClick={() => void testSound()}>
          <Volume2 size={16} aria-hidden />Play test sound
        </button>
      </div>
      {notice && <p role="status">{notice}</p>}
      {stream && <label className={styles.option}><input type="checkbox" checked={visualChecks} onChange={event => setVisualChecks(event.target.checked)} />
        My face is in frame, the lighting is clear, and the image is steady.
      </label>}
    </section>
    <section className={ui.panel} aria-label="Interview readiness">
      <div className={ui.panelInner}><PreviewTabs labels={["Setup checks", "About assessment"]} selected={tab} onSelect={setTab} name="Interview preparation" /></div>
      {tab === "Setup checks" ? <>
        <div className={ui.progress}>
          <strong>{checks.filter(check => check.done).length} of {checks.length} checks complete</strong>
          <progress aria-label="Setup checks complete" max={checks.length} value={checks.filter(check => check.done).length} />
        </div>
        <ul className={ui.checks}>{checks.map(({ name, description, done }) => <li key={name}>
          {done ? <CircleCheck size={19} color="#167240" aria-hidden /> : <CircleDashed size={19} color="#817d8b" aria-hidden />}
          <div><strong>{name}</strong><p className={styles.hint}>{description}</p></div>
          <Badge tone={done ? "green" : "muted"}>{done ? "Ready" : "Pending"}</Badge>
        </li>)}</ul>
      </> : <div className={ui.panelInner}>
        <h2>About the assessment</h2>
        <p>Answer aloud when the AI interviewer asks each question. You can read the transcript as you go.</p>
        <p>Staff review your responses and assessment alongside your application. Your camera preview stays on this device.</p>
      </div>}
      <div className={ui.panelInner}>
        <label className={styles.option}><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} />
          I agree to have my responses saved and assessed for this application.
        </label>
        {error && <p role="alert" className={styles.error}>{error}</p>}
        <button type="button" className={styles.primary} disabled={!consent || !micReady || starting || cameraBusy || micBusy} onClick={onStart}>
          {starting ? "Starting interview…" : "Start interview"}
        </button>
      </div>
    </section>
  </div>;
}
