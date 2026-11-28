"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./admin.module.css";

export function InterviewVoicePilot({ questions, minutes, candidate }: { questions: string[]; minutes: number; candidate?: {
    microphone?: string;
    speaker?: string;
    muted?: boolean;
    connect: (sdp: string, signal: AbortSignal) => Promise<{sdp:string}>;
    transcript: (text:string) => void;
    // Kome's words for on-screen captions; done is true once a reply is complete.
    speech?: (text:string, done:boolean) => void;
  } }) {
  const cleanup = useRef<(() => void) | null>(null);
  const input = useRef<MediaStream | null>(null);
  const muted = useRef(false);
  const inputReady = useRef(!candidate);
  const audio = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"idle" | "connecting" | "opening" | "live">("idle");
  const [notice, setNotice] = useState("");
  useEffect(() => () => cleanup.current?.(), []);

  useEffect(() => {
    muted.current = Boolean(candidate?.muted);
    input.current?.getAudioTracks().forEach(track => { track.enabled = inputReady.current && !muted.current; });
  }, [candidate?.muted]);

  async function start() {
    if (cleanup.current) return;
    const abort = new AbortController();
    let peer: RTCPeerConnection | undefined;
    let stream: MediaStream | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let openingResponse: string | undefined;
    // Caption text for Kome's reply in progress; a new reply replaces it.
    let spoken = { response: "", text: "" };
    const stop = () => {
      abort.abort();
      clearTimeout(timer);
      peer?.close();
      stream?.getTracks().forEach(track => track.stop());
      input.current = null;
      inputReady.current = !candidate;
      if (audio.current) audio.current.srcObject = null;
      cleanup.current = null;
    };
    cleanup.current = stop;
    setState("connecting");
    setNotice("");
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: candidate ? {
          ...(candidate.microphone ? { deviceId: { exact: candidate.microphone } } : {}),
          echoCancellation: true,
          noiseSuppression: true,
        } : true,
      });
      if (abort.signal.aborted) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      input.current = stream;
      stream.getAudioTracks().forEach(track => { track.enabled = inputReady.current && !muted.current; });
      peer = new RTCPeerConnection();
      for (const track of stream.getAudioTracks()) peer.addTrack(track, stream);
      peer.ontrack = async event => {
        const output = audio.current as (HTMLAudioElement & { setSinkId?: (id: string) => Promise<void> }) | null;
        if (!output) return;
        if (candidate?.speaker) {
          await output.setSinkId?.(candidate.speaker).catch(() => {
            if (!abort.signal.aborted) setNotice("Using the default speaker.");
          });
        }
        if (!abort.signal.aborted) output.srcObject = event.streams[0] || new MediaStream([event.track]);
      };
      peer.onconnectionstatechange = () => {
        if (!abort.signal.aborted && peer?.connectionState === "failed") {
          stop(); setState("idle"); setNotice("Voice connection lost. Try again.");
        }
      };
      const channel = peer.createDataChannel("oai-events");
      const failConnection = (message: string) => {
        stop();
        setState("idle");
        setNotice(message);
      };
      const startListening = () => {
        inputReady.current = true;
        stream?.getAudioTracks().forEach(track => { track.enabled = !muted.current; });
        setState("live");
        clearTimeout(timer);
        timer = setTimeout(() => failConnection(candidate ? "Interview time ended." : "Practice time ended."), minutes * 60000);
      };
      channel.onmessage = event => {
        if (!candidate || abort.signal.aborted) return;
        const message = JSON.parse(event.data);
        // The session transcribes Kome's audio as it is generated; captions follow it
        // during the opening and every later turn. Text can run slightly ahead of audio.
        if (message.type === "response.output_audio_transcript.delta" && typeof message.delta === "string") {
          if (message.response_id !== spoken.response) spoken = { response: message.response_id, text: "" };
          spoken.text += message.delta;
          candidate.speech?.(spoken.text, false);
        } else if (message.type === "response.output_audio_transcript.done") {
          candidate.speech?.(typeof message.transcript === "string" ? message.transcript : spoken.text, true);
        }
        if (!inputReady.current) {
          if (message.type === "output_audio_buffer.started") {
            openingResponse ??= message.response_id;
          } else if (message.type === "output_audio_buffer.stopped" && openingResponse && message.response_id === openingResponse) {
            // Generated audio can still be playing after response.done.
            startListening();
          } else if (message.type === "error" ||
                     (message.type === "response.done" && message.response?.status !== "completed")) {
            failConnection("The interviewer could not open the question. Try again.");
          }
          return;
        }
        if (message.type === "conversation.item.input_audio_transcription.completed" && message.transcript?.trim()) {
          candidate.transcript(message.transcript.trim());
        }
      };
      channel.onopen = () => {
        if (abort.signal.aborted) return;
        channel.send(JSON.stringify({ type: "response.create" }));
        if (candidate) {
          setState("opening");
          clearTimeout(timer);
          timer = setTimeout(() => failConnection("The opening audio did not finish. Try again."), 30000);
        } else {
          startListening();
        }
      };
      timer = setTimeout(() => failConnection("Connection timed out. Try again."), 30000);
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
  return <section className={styles.panel} aria-label={candidate ? "Voice interview with Kome" : "Voice pilot"}>
    <h2>{candidate ? "Voice interview with Kome" : "Practice the live interview"}</h2>
    <p>{candidate ? "Starting lets Kome hear your microphone. Your spoken answer appears in the transcript." : "Starting lets the AI interviewer hear your microphone. Use sample answers."}</p>
    <audio ref={audio} autoPlay />
    {state === "idle" ? <button className={styles.secondary} disabled={candidate?.muted} onClick={start}>{candidate ? "Speak with interviewer" : "Start voice pilot"}</button>
      : <button className={styles.secondary} onClick={() => { cleanup.current?.(); setState("idle"); setNotice(candidate ? "Microphone disconnected." : "Practice ended."); }}>
        {state === "connecting" || state === "opening" ? "Cancel connection" : candidate ? "Finish speaking" : "End voice pilot"}
      </button>}
    <p role="status">{notice || (state === "connecting" ? "Connecting…" :
      state === "opening" ? "Interviewer speaking. Wait for your turn." :
      state === "live" ? (candidate ? (candidate.muted ? "Microphone muted." : "Your turn. Speak into your microphone.") : "Interview in progress") : "")}</p>
  </section>;
}
