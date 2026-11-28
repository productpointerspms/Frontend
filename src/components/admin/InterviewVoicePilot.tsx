"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./admin.module.css";

export function InterviewVoicePilot({ questions, minutes, candidate }: { questions: string[]; minutes: number; candidate?: {
    connect: (sdp: string, signal: AbortSignal) => Promise<{sdp:string}>;
    transcript: (text:string) => void;
  } }) {
  const cleanup = useRef<(() => void) | null>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"idle" | "connecting" | "live">("idle");
  const [notice, setNotice] = useState("");
  useEffect(() => () => cleanup.current?.(), []);

  async function start() {
    if (cleanup.current) return;
    const abort = new AbortController();
    let peer: RTCPeerConnection | undefined;
    let stream: MediaStream | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const stop = () => {
      abort.abort();
      clearTimeout(timer);
      peer?.close();
      stream?.getTracks().forEach(track => track.stop());
      if (audio.current) audio.current.srcObject = null;
      cleanup.current = null;
    };
    cleanup.current = stop;
    setState("connecting");
    setNotice("");
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (abort.signal.aborted) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      peer = new RTCPeerConnection();
      for (const track of stream.getAudioTracks()) peer.addTrack(track, stream);
      peer.ontrack = event => {
        if (audio.current) audio.current.srcObject = event.streams[0] || new MediaStream([event.track]);
      };
      peer.onconnectionstatechange = () => {
        if (!abort.signal.aborted && peer?.connectionState === "failed") {
          stop(); setState("idle"); setNotice("Connection lost. Start a new practice session.");
        }
      };
      const channel = peer.createDataChannel("oai-events");
      channel.onmessage = event => {
        if (!candidate || abort.signal.aborted) return;
        const message = JSON.parse(event.data);
        if (message.type === "conversation.item.input_audio_transcription.completed" && message.transcript?.trim()) candidate.transcript(message.transcript.trim());
      };
      channel.onopen = () => {
        if (abort.signal.aborted) return;
        channel.send(JSON.stringify({type:"response.create"}));
        setState("live");
        clearTimeout(timer);
        timer = setTimeout(() => { stop(); setState("idle"); setNotice("Practice time ended."); }, minutes * 60000);
      };
      timer = setTimeout(() => { stop(); setState("idle"); setNotice("Connection timed out. Try again."); }, 30000);
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      let answer: {sdp:string};
      if (candidate) answer = await candidate.connect(offer.sdp!, abort.signal);
      else {
        const response = await fetch("/api/admin/interview/voice", {
          method:"POST", headers:{"Content-Type":"application/json"}, signal:abort.signal,
          body:JSON.stringify({sdp:offer.sdp,questions}),
        });
        const result = await response.json();
        if (!response.ok || !result.data?.sdp) throw new Error(result.message || "Voice connection failed");
        answer = result.data;
      }
      await peer.setRemoteDescription({type:"answer",sdp:answer.sdp});
    } catch (error) {
      if (abort.signal.aborted) return;
      stop(); setState("idle");
      setNotice(error instanceof Error ? error.message : "Voice connection failed");
    }
  }
  return <section className={styles.panel} aria-label="Voice pilot">
    <h2>{candidate ? "Voice interview" : "Practice the live interview"}</h2>
    <p>Starting lets the AI interviewer hear your microphone. {candidate ? "Your spoken answer appears below for you to check." : "Use sample answers."}</p>
    <audio ref={audio} autoPlay />
    {state === "idle" ? <button className={styles.secondary} onClick={start}>{candidate ? "Speak with interviewer" : "Start voice pilot"}</button>
      : <button className={styles.secondary} onClick={() => { cleanup.current?.(); setState("idle"); setNotice("Practice ended."); }}>
        {state === "connecting" ? "Cancel connection" : candidate ? "Finish speaking" : "End voice pilot"}
      </button>}
    <p role="status">{notice || (state === "connecting" ? "Connecting…" : state === "live" ? "Interview in progress" : "")}</p>
  </section>;
}
