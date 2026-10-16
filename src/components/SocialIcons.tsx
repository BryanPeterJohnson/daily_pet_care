import type { Settings } from "@/lib/settings";

const PATHS: Record<string, string> = {
  facebook: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  instagram: "M12 2.2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-9.6a1.17 1.17 0 1 0 0 2.34 1.17 1.17 0 0 0 0-2.34Z",
  pinterest: "M12 2a10 10 0 0 0-3.64 19.31c-.09-.79-.17-2 .03-2.86l1.2-5.08s-.3-.61-.3-1.5c0-1.41.82-2.46 1.83-2.46.86 0 1.28.65 1.28 1.43 0 .87-.56 2.17-.84 3.38-.24 1 .5 1.83 1.5 1.83 1.8 0 3.18-1.9 3.18-4.63 0-2.42-1.74-4.12-4.23-4.12-2.88 0-4.57 2.16-4.57 4.39 0 .87.33 1.8.75 2.31.08.1.1.19.07.29l-.28 1.14c-.04.18-.15.22-.34.13-1.25-.58-2.03-2.42-2.03-3.89 0-3.17 2.3-6.08 6.64-6.08 3.49 0 6.2 2.49 6.2 5.8 0 3.46-2.18 6.25-5.21 6.25-1.02 0-1.98-.53-2.3-1.15l-.63 2.39c-.23.87-.84 1.97-1.25 2.63A10 10 0 1 0 12 2Z",
  youtube: "M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81ZM10 15V9l5.2 3L10 15Z",
  x: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z",
};

const LABELS: Record<string, string> = { facebook: "Facebook", instagram: "Instagram", pinterest: "Pinterest", youtube: "YouTube", x: "X" };

export function SocialIcons({ settings, className = "" }: { settings: Settings; className?: string }) {
  const links = (["facebook", "instagram", "pinterest", "youtube", "x"] as const)
    .map((k) => ({ k, url: settings[`social_${k}`] }))
    .filter((l) => l.url);
  if (!links.length) return null;
  return (
    <ul className={`flex gap-2 ${className}`}>
      {links.map(({ k, url }) => (
        <li key={k}>
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={LABELS[k]} className="grid h-10 w-10 place-items-center rounded-full bg-fog text-ink transition-colors hover:bg-ball">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true"><path d={PATHS[k]} /></svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
