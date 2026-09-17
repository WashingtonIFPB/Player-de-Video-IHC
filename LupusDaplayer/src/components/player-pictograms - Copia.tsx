type IconProps = { className?: string };

const common = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function TurtleIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M15 37c0-11 8-19 20-19s18 8 18 19H15Z" fill="currentColor" opacity=".28" />
      <path d="M20 37c1-8 6-13 15-15 8 2 12 7 13 15M27 22l8 15 8-15M20 29h28" />
      <path d="M53 29c7-2 9 2 6 6l-6 2M20 38l-4 7M44 38l4 7M10 37h5" />
      <circle cx="57" cy="31" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WalkerIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="35" cy="10" r="6" fill="currentColor" opacity=".88" />
      <path d="M32 18c-3 6-5 12-5 18l11 2 3-14" fill="currentColor" opacity=".24" />
      <path d="m32 19-5 17 11 2 3-14M28 25l-10 10M40 24l8 10M28 36l-8 17M38 38l8 15" />
      <path d="m14 55 7-2 5 2M43 55h10" strokeWidth="5" />
    </svg>
  );
}

export function RunnerIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="42" cy="10" r="6" fill="currentColor" opacity=".88" />
      <path d="m37 19-12 12 12 8 8-14" fill="currentColor" opacity=".24" />
      <path d="m37 19-12 12 12 8 8-14M28 29l-14 2M45 24l9 7M37 39 21 7M36 39 20 54" />
      <path d="M51 48h8M14 56h11" strokeWidth="5" />
      <path d="M7 18h15M4 25h13" opacity=".5" />
    </svg>
  );
}

export function FrogIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M19 31c3-11 13-17 25-12 8 3 12 10 10 17-3 8-15 10-26 6-8-3-11-6-9-11Z" fill="currentColor" opacity=".3" />
      <circle cx="45" cy="18" r="7" fill="currentColor" opacity=".34" />
      <circle cx="47" cy="17" r="2.4" fill="currentColor" stroke="none" />
      <path d="M51 28c3 1 6 1 9-1M28 41 14 54H5M34 43l14 10h11M21 34 9 29 4 33" />
      <path d="m49 37 7 5" opacity=".7" />
    </svg>
  );
}

export function CarIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="m12 35 7-13h27l7 13 5 3v10H7V38l5-3Z" fill="currentColor" opacity=".32" />
      <path d="m12 35 7-13h27l7 13M17 35h31M22 25l-4 10M43 25l5 10" />
      <circle cx="18" cy="48" r="6" fill="currentColor" />
      <circle cx="47" cy="48" r="6" fill="currentColor" />
    </svg>
  );
}

export function LoudIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="17" cy="14" r="7" fill="currentColor" opacity=".35" />
      <path d="M12 24c8-3 15 1 17 9l-3 20H12l-2-17M29 32l9-5v18l-9-5Z" fill="currentColor" opacity=".28" />
      <path d="M30 32h8M30 40h8M44 26c5 5 5 15 0 20M50 20c9 9 9 23 0 32" />
    </svg>
  );
}

export function MuteIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="31" cy="18" r="11" fill="currentColor" opacity=".25" />
      <path d="M19 19c0-8 5-13 12-13s12 5 12 13-5 14-12 14-12-6-12-14ZM14 57V47c0-9 7-15 17-15s18 6 18 15v10" />
      <circle cx="27" cy="17" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="36" cy="17" r="1.8" fill="currentColor" stroke="none" />
      <path d="M18 40c5 1 9-1 13-5l15-5c5-1 7 6 2 8l-15 6c-5 2-10 1-14-2" fill="currentColor" opacity=".34" />
      <path d="M22 37c4 2 8 2 12 0l13-5M23 25h16M43 29l6 10" />
    </svg>
  );
}

export function MagnifierIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="27" cy="27" r="17" fill="currentColor" opacity=".16" />
      <circle cx="27" cy="27" r="17" />
      <path d="m39 39 16 16" strokeWidth="7" />
    </svg>
  );
}