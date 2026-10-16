#!/usr/bin/env node
/**
 * Adds a matching cover photo (free Unsplash license) to the starter articles.
 *   npm run db:covers   → fills cover_image only where it is still empty, so photos you uploaded are never replaced
 * Reads DATABASE_URL from .env (or the environment).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
for (const f of [".env.local", ".env"]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) try { process.loadEnvFile(p); } catch {}
}
if (!process.env.DATABASE_URL) {
  console.error("✗ DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

const img = (id) => `https://images.unsplash.com/photo-${id}?w=1400&q=75&auto=format&fit=crop`;

/** slug → [Unsplash photo id, alt text] */
export const covers = {
  "how-to-choose-a-dog-groomer": ["1528846104175-4fd300ee59da", "Groomer brushing a dog's coat"],
  "pet-sitter-vs-boarding-kennel": ["1601758177266-bc599de87707", "Pet sitter relaxing at home with two dogs and a cat"],
  "how-much-does-a-dog-walker-cost": ["1772135109220-d3fb775194be", "Dog walker walking several dogs on a leafy path"],
  "core-vaccines-for-dogs-and-cats": ["1725409796872-8b41e8eca929", "Veterinarian examining a white kitten"],
  "toxic-foods-for-dogs": ["1555268588-0546b2dc6f31", "Brown and white dog looking up, hoping for food"],
  "indoor-cat-enrichment-ideas": ["1638826595775-e2eae86cda8e", "Cat playing with a toy on the floor"],
  "crate-training-a-puppy": ["1777383504078-8e0f773e8529", "Small dog resting inside a crate"],
  "adopting-a-rescue-pet-first-30-days": ["1522276498395-f4f68f7f8454", "Man hugging his newly adopted dog"],
  "summer-heat-safety-for-dogs": ["1663501258049-77f9638cbaea", "Dog drinking water from an outdoor faucet"],
  "dog-grooming-cost": ["1719464454959-9cf304ef4774", "Small white dog getting a haircut with scissors"],
  "dog-boarding-cost": ["1632236519667-29b4b78da232", "Dog waiting in a boarding kennel"],
  "is-pet-insurance-worth-it": ["1753685726311-e25c0baa55c6", "Woman working on a laptop with her dog beside her"],
  "vet-visit-cost": ["1700665537650-1bf37979aae0", "Veterinarian holding a small dog in an exam room"],
  "doggy-daycare-guide": ["1787152467585-3b6a11777ebd", "Group of dogs playing in a fenced daycare yard"],
  "how-to-choose-a-veterinarian": ["1596272875729-ed2ff7d6d9c5", "Veterinarian holding a silver tabby cat"],
  "how-to-find-a-pet-sitter": ["1557495235-340eb888a9fb", "Woman hugging a dog"],
  "how-often-should-you-bathe-your-dog": ["1672426637959-49f39230ad7e", "Dog standing next to a bathtub filled with water"],
  "how-to-trim-dog-nails-at-home": ["1760907219691-190b168d7800", "Close-up of a dog's paw and nails"],
  "how-much-to-feed-a-dog": ["1714068691210-073dc52c6c1d", "Dog eating food out of a bowl"],
  "human-foods-dogs-can-eat": ["1673134768453-ffaf2f279b81", "Person feeding a dog a piece of food"],
  "how-to-stop-puppy-biting": ["1642680348595-999365a03009", "Puppy chewing a toy in the grass"],
  "cat-peeing-outside-litter-box": ["1727510153658-643787acb16a", "Cat sitting in a litter box"],
  "dog-fireworks-anxiety": ["1453227588063-bb302b62f50b", "Anxious pug hiding under a blanket"],
  "flea-and-tick-prevention-guide": ["1769117327556-cb33587c5298", "Puppy scratching its ear on the grass"],
};

const conn = await mysql.createConnection({ uri: process.env.DATABASE_URL, charset: "utf8mb4" });
try {
  let updated = 0;
  for (const [slug, [id, alt]] of Object.entries(covers)) {
    const [r] = await conn.query(
      "UPDATE posts SET cover_image = ?, cover_alt = COALESCE(NULLIF(cover_alt, ''), ?), updated_at = updated_at WHERE slug = ? AND (cover_image IS NULL OR cover_image = '')",
      [img(id), alt, slug],
    );
    updated += r.affectedRows;
  }
  console.log(`✓ Cover photos added to ${updated} posts (posts that already had a cover were left alone)`);
} catch (e) {
  console.error("✗ Failed:", e.message);
  process.exitCode = 1;
} finally {
  await conn.end();
}
