export function Avatar({ name, src, size = 40 }: { name: string; src?: string | null; size?: number }) {
  const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const style = { width: size, height: size, fontSize: size * 0.38 };
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" width={size} height={size} style={style} className="shrink-0 rounded-full object-cover" />;
  }
  return (
    <span style={style} className="grid shrink-0 place-items-center rounded-full bg-ball font-extrabold text-ink" aria-hidden="true">
      {initials}
    </span>
  );
}
