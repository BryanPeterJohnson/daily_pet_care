import { categoryIcon, categoryTint } from "./CategoryIcon";

/** Unsplash serves any size from the same URL; ask for roughly what the slot needs. */
export function sizedSrc(src: string, width?: number) {
  if (!width || !src.includes("images.unsplash.com")) return src;
  return src.replace(/([?&])w=d+/, `$1w=${width}`);
}

/** Post cover image, or a calm illustrated placeholder keyed to the category. */
export function CoverArt({
  src, alt, categorySlug, className = "", iconSize = 56, priority = false, width,
}: {
  src?: string | null; alt?: string | null; categorySlug?: string | null; className?: string; iconSize?: number; priority?: boolean; width?: number;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={sizedSrc(src, width)}
        alt={alt || ""}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  const Icon = categoryIcon(categorySlug);
  return (
    <div className={`flex h-full w-full items-center justify-center ${categoryTint(categorySlug)} ${className}`} aria-hidden="true">
      <Icon size={iconSize} strokeWidth={1.4} className="text-ink/70" />
    </div>
  );
}
