import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import mark from "@/assets/luppus-mark.png";
import frogSkip from "@/assets/frog-skip.png";
import mutePerson from "@/assets/mute-person.png";
import {
  LoudIcon,
  MagnifierIcon,
  MuteIcon,
  RunnerIcon,
  TurtleIcon,
  WalkerIcon,
} from "@/components/player-pictograms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luppus Player" },
      {
        name: "description",
        content:
          "Luppus Player: reprodutor de vídeo local que roda inteiro no navegador, com interface gestual sem rótulos.",
      },
      { property: "og:title", content: "Luppus Player" },
      {
        property: "og:description",
        content:
          "Reprodutor de vídeo offline com interface gestual: sem textos, sem ícones convencionais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Pulse = { id: number; x: number; y: number };

function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState<0.5 | 1 | 2>(1);
  const [full, setFull] = useState(false);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const spark = (x = 50, y = 50) => {
    const id = Date.now() + Math.random();
    setPulses((p) => [...p, { id, x, y }]);
    setTimeout(() => setPulses((p) => p.filter((q) => q.id !== id)), 650);
  };

  const load = useCallback((file: File) => {
    if (!file.type.startsWith("video/")) return;
    setSrc((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
    setTime(0);
    setDuration(0);
    setPlaying(false);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.volume = volume;
      v.muted = muted;
      v.playbackRate = speed;
    }
  }, [volume, muted, speed, src]);

  useEffect(() => {
    const onFs = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v || !src) return;
    if (v.paused) void v.play();
    else v.pause();
    spark();
  };

  const nudge = (delta: number) => {
    const v = videoRef.current;
    if (!v || !src) return;
    v.currentTime = Math.min(Math.max(0, v.currentTime + delta), v.duration || 0);
    spark(delta > 0 ? 78 : 22);
  };

  const seekFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = ratio * duration;
    setTime(ratio * duration);
  };

  const volumeFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = 1 - Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    setVolume(ratio);
    if (ratio > 0) setMuted(false);
  };

  const changeSpeed = (nextSpeed: 0.5 | 1 | 2) => {
    setSpeed(nextSpeed);
    const v = videoRef.current;
    if (v) v.playbackRate = nextSpeed;
  };

  const toggleFull = () => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen();
  };

  const progress = duration ? time / duration : 0;

  return (
    <main className="den-field flex h-screen w-full flex-col items-center justify-center gap-3 p-3 select-none md:gap-8 md:p-5">
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) load(f);
          e.target.value = "";
        }}
      />

      {/* stage */}
      <div
        ref={stageRef}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) load(f);
        }}
        className={`relative flex w-full max-w-5xl flex-1 items-center justify-center overflow-hidden bg-[var(--den)] transition-shadow duration-500 ${
          dragOver ? "shadow-[var(--glow-ember)]" : ""
        }`}
        style={{
          clipPath:
            "polygon(3% 0, 97% 0, 100% 6%, 100% 94%, 97% 100%, 3% 100%, 0 94%, 0 6%)",
        }}
      >
        {src ? (
          <video
            ref={videoRef}
            src={src}
            onClick={toggle}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => {
              setDuration(e.currentTarget.duration);
              e.currentTarget.volume = volume;
            }}
            className="h-full w-full object-contain"
          />
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="group flex h-full w-full items-center justify-center"
          >
            <span
              className={`breathing block ${dragOver ? "scale-110" : ""} shard`}
              style={{
                filter:
                  "drop-shadow(0 0 34px color-mix(in oklab, var(--ember) 45%, transparent))",
              }}
            >
              <img
                src={mark}
                alt=""
                width={816}
                height={816}
                className="h-36 w-36 opacity-90 md:h-48 md:w-48"
              />
            </span>
          </button>
        )}

        {/* fullscreen-only overlay controls */}
        {full && src && (
            <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 bg-gradient-to-t from-[var(--den)] to-transparent p-4 md:gap-6 md:p-6">
            <Track progress={progress} onPointer={seekFromPointer} />
            <Core playing={playing} onClick={toggle} compact />
              <MagnifierButton onClick={toggleFull} open />
          </div>
        )}

        {pulses.map((p) => (
          <span
            key={p.id}
            className="ripple pointer-events-none absolute h-24 w-24 rounded-full border border-[var(--ember)]"
            style={{ left: `${p.x}%`, top: `${p.y}%`, translate: "-50% -50%" }}
          />
        ))}
      </div>

      {/* control constellation */}
      <div className="grid w-full max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto_auto] items-stretch gap-2 md:gap-5">
        {/* sigil / import */}
        <button
          onClick={() => inputRef.current?.click()}
          aria-label="Importar vídeo"
          title="Importar vídeo"
          className="shard group grid w-11 shrink-0 place-items-center bg-[var(--card)] hover:-translate-y-1 hover:shadow-[var(--glow-ember)] md:w-14"
          style={{ clipPath: "polygon(0 12%, 50% 0, 100% 12%, 100% 88%, 50% 100%, 0 88%)" }}
        >
          <img
            src={mark}
            alt=""
            width={816}
            height={816}
            loading="lazy"
            className="h-8 w-8 opacity-70 transition-opacity group-hover:opacity-100"
          />
        </button>

        {/* seek, transport and playback speed */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-4">
          <Track progress={progress} onPointer={seekFromPointer} />
          <div className="flex items-center justify-center gap-1 md:gap-6">
            <FrogButton dir="left" onClick={() => nudge(-10)} />
            <Core playing={playing} onClick={toggle} />
            <FrogButton dir="right" onClick={() => nudge(10)} />
          </div>
          <SpeedControl speed={speed} onChange={changeSpeed} />
        </div>

        {/* volume column */}
        <div className="flex w-11 shrink-0 flex-col bg-[var(--card)] md:w-14">
          <button
            onClick={() => setMuted((current) => !current)}
            aria-label={muted ? "Ativar som" : "Silenciar vídeo"}
            title={muted ? "Ativar som" : "Silenciar vídeo"}
            className="shard grid h-12 place-items-center text-2xl hover:-translate-y-0.5 md:h-14 md:text-3xl"
          >
            {muted ? (
              <img
                src={mutePerson}
                alt=""
                width={816}
                height={816}
                className="h-10 w-10 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] md:h-12 md:w-12"
              />
            ) : (
              <LoudIcon className="h-8 w-8 text-[var(--bone)] md:h-10 md:w-10" />
            )}
          </button>
          <div
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              volumeFromPointer(e);
            }}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) volumeFromPointer(e);
            }}
            aria-label="Ajustar volume"
            title="Ajustar volume"
            className="relative flex min-h-16 flex-1 cursor-pointer flex-col-reverse gap-1 p-2"
          >
            {Array.from({ length: 7 }).map((_, i) => {
              const on = !muted && volume > i / 7;
              return (
                <span
                  key={i}
                  className="shard flex-1"
                  style={{
                    clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 60%)",
                    background: on ? "var(--ember)" : "var(--secondary)",
                    opacity: on ? 0.35 + (i / 7) * 0.65 : 0.5,
                    boxShadow: on ? "var(--glow-moss)" : "none",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* fullscreen */}
        <MagnifierButton onClick={toggleFull} open={full} />
      </div>
    </main>
  );
}

function Track({
  progress,
  onPointer,
}: {
  progress: number;
  onPointer: (e: React.PointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        onPointer(e);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) onPointer(e);
      }}
      className="relative h-10 flex-1 cursor-pointer"
    >
      <div
        className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-[var(--secondary)]"
        style={{ clipPath: "polygon(0 30%, 100% 0, 100% 70%, 0 100%)" }}
      />
      <div
        className="absolute top-1/2 left-0 h-2 -translate-y-1/2 bg-[var(--ember)] transition-[width] duration-100"
        style={{
          width: `${progress * 100}%`,
          clipPath: "polygon(0 30%, 100% 0, 100% 70%, 0 100%)",
          boxShadow: "var(--glow-moss)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl leading-none drop-shadow-[var(--glow-ember)] transition-[left] duration-100 md:text-3xl"
        style={{
          left: `${progress * 100}%`,
        }}
      >
        🚗
      </span>
    </div>
  );
}

function Core({
  playing,
  onClick,
  compact,
}: {
  playing: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  const size = compact ? "h-14 w-14" : "h-20 w-20";
  return (
    <button
      onClick={onClick}
      aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
      title={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
      className={`shard relative grid ${size} shrink-0 place-items-center bg-[var(--card)] hover:shadow-[var(--glow-ember)]`}
      style={{
        clipPath: "polygon(25% 2%, 75% 2%, 100% 50%, 75% 98%, 25% 98%, 0 50%)",
      }}
    >
      <span
        className="shard block"
        style={
          playing
            ? {
                width: compact ? 14 : 18,
                height: compact ? 14 : 18,
                borderRadius: "50%",
                background: "var(--playing)",
                filter: "drop-shadow(var(--glow-playing))",
              }
            : {
                width: compact ? 20 : 28,
                height: compact ? 20 : 28,
                clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                background: "var(--paused)",
                filter: "drop-shadow(var(--glow-paused))",
              }
        }
      />
    </button>
  );
}

function FrogButton({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  const label = dir === "right" ? "Avançar 10 segundos" : "Retroceder 10 segundos";
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="shard grid h-12 w-10 place-items-center hover:-translate-y-0.5 md:h-14 md:w-16"
    >
      <span
        aria-hidden="true"
        className="frog-jump block h-10 w-10 md:h-12 md:w-12"
        style={{ transform: dir === "left" ? "scaleX(-1)" : undefined }}
      >
        <img
          src={frogSkip}
          alt=""
          loading="lazy"
          className="h-full w-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
        />
      </span>
    </button>
  );
}

function SpeedControl({
  speed,
  onChange,
}: {
  speed: 0.5 | 1 | 2;
  onChange: (speed: 0.5 | 1 | 2) => void;
}) {
  const choices = [
    { value: 0.5 as const, Icon: TurtleIcon, label: "Velocidade 0,5 vezes" },
    { value: 1 as const, Icon: WalkerIcon, label: "Velocidade normal" },
    { value: 2 as const, Icon: RunnerIcon, label: "Velocidade 2 vezes" },
  ];

  return (
    <div className="mx-auto flex h-9 items-center bg-[var(--card)] p-1" aria-label="Velocidade do vídeo">
      {choices.map((choice) => (
        <button
          key={choice.value}
          onClick={() => onChange(choice.value)}
          aria-label={choice.label}
          aria-pressed={speed === choice.value}
          title={choice.label}
          className={`shard grid h-7 w-10 place-items-center text-xl leading-none hover:-translate-y-0.5 md:w-12 ${
            speed === choice.value ? "bg-[var(--secondary)] shadow-[var(--glow-moss)]" : "opacity-45"
          }`}
        >
          <choice.Icon className="h-7 w-7 text-[var(--bone)]" />
        </button>
      ))}
    </div>
  );
}

function MagnifierButton({ onClick, open }: { onClick: () => void; open: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Sair da tela cheia" : "Entrar em tela cheia"}
      title={open ? "Sair da tela cheia" : "Entrar em tela cheia"}
      className="shard relative grid h-full min-h-14 w-11 shrink-0 place-items-center bg-[var(--card)] hover:shadow-[var(--glow-ember)] md:w-14"
      style={{ clipPath: "polygon(0 0, 88% 0, 100% 14%, 100% 100%, 12% 100%, 0 86%)" }}
    >
      <MagnifierIcon
        className={`h-8 w-8 text-[var(--bone)] transition-transform ${open ? "scale-90" : "scale-110"}`}
      />
    </button>
  );
}
