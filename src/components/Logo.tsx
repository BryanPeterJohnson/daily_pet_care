export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  // A pet ID tag with a paw — the site's mark.
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="5" r="3.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M20 8.5c8.6 0 14.5 6.4 14.5 14.3S28.6 37.5 20 37.5 5.5 30.7 5.5 22.8 11.4 8.5 20 8.5Z" fill="#FFC845" stroke="currentColor" strokeWidth="2.2" />
      <ellipse cx="20" cy="27" rx="4.6" ry="3.8" fill="currentColor" />
      <circle cx="13.6" cy="21.4" r="2.1" fill="currentColor" />
      <circle cx="17.4" cy="17.4" r="2.1" fill="currentColor" />
      <circle cx="22.6" cy="17.4" r="2.1" fill="currentColor" />
      <circle cx="26.4" cy="21.4" r="2.1" fill="currentColor" />
    </svg>
  );
}

export function Logo({ name }: { name: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 text-ink">
      <LogoMark />
      <span className="text-[1.3rem] font-extrabold tracking-tight whitespace-nowrap">{name}</span>
    </span>
  );
}
