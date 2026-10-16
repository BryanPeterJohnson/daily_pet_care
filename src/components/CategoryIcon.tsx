import { Bone, Cat, Dog, GraduationCap, HandHeart, HeartHandshake, PawPrint, Scissors, Stethoscope, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "dog-care": Dog,
  "cat-care": Cat,
  "pet-health": Stethoscope,
  nutrition: Bone,
  grooming: Scissors,
  training: GraduationCap,
  "pet-services": HandHeart,
  adoption: HeartHandshake,
};

const TINTS = ["bg-tint-1", "bg-tint-2", "bg-tint-3", "bg-tint-4", "bg-tint-5", "bg-tint-6", "bg-tint-7", "bg-tint-8"];

export function categoryIcon(slug?: string | null): LucideIcon {
  return (slug && ICONS[slug]) || PawPrint;
}

export function categoryTint(slug?: string | null): string {
  if (!slug) return "bg-fog";
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const known = Object.keys(ICONS).indexOf(slug);
  return TINTS[known >= 0 ? known : h % TINTS.length];
}
