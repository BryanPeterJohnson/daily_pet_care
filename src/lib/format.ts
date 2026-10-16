export function formatDate(d: Date | string | null | undefined, opts: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" }) {
  if (!d) return "";
  return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "America/New_York" }).format(new Date(d));
}

export function siteUrl(path = "") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  return base + path;
}

export function compactNumber(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(n);
}
