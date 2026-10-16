/** Scattered paw prints for decorative backgrounds. Purely visual. */
export function Paw({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true" fill="currentColor">
      <ellipse cx="32" cy="42" rx="13" ry="11" />
      <ellipse cx="14" cy="27" rx="6" ry="7.5" transform="rotate(-18 14 27)" />
      <ellipse cx="25" cy="16" rx="6" ry="8" transform="rotate(-6 25 16)" />
      <ellipse cx="39" cy="16" rx="6" ry="8" transform="rotate(6 39 16)" />
      <ellipse cx="50" cy="27" rx="6" ry="7.5" transform="rotate(18 50 27)" />
    </svg>
  );
}

const SPOTS = [
  { top: "8%", left: "4%", size: 38, rotate: -20 },
  { top: "62%", left: "9%", size: 26, rotate: 15 },
  { top: "18%", left: "46%", size: 22, rotate: 30 },
  { top: "78%", left: "52%", size: 34, rotate: -10 },
  { top: "12%", left: "88%", size: 30, rotate: 25 },
  { top: "55%", left: "93%", size: 24, rotate: -30 },
];

export function PawPattern({ className = "text-ink/[0.05]" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {SPOTS.map((s, i) => (
        <Paw key={i} className="absolute" style={{ top: s.top, left: s.left, width: s.size, height: s.size, transform: `rotate(${s.rotate}deg)` }} />
      ))}
    </div>
  );
}
