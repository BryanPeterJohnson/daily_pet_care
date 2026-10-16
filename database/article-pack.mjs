// The full SEO article pack: base articles + extra depth, merged into ready-to-insert posts.
import { seoArticles1 } from "./seo-articles-1.mjs";
import { seoArticles2 } from "./seo-articles-2.mjs";
import { seoArticles3 } from "./seo-articles-3.mjs";
import { expansions1 } from "./seo-expansions-1.mjs";
import { expansions2 } from "./seo-expansions-2.mjs";
import { expansions3 } from "./seo-expansions-3.mjs";

const expansions = { ...expansions1, ...expansions2, ...expansions3 };
const FAQ = "<h2>Frequently asked questions</h2>";

// Meta descriptions kept within ~160 characters so Google doesn't truncate them.
const META = {
  "is-pet-insurance-worth-it": "Pet insurance averages about $62/month for dogs and $32 for cats in the U.S. See how it works, what it covers and when it's worth the cost.",
  "vet-visit-cost": "A routine vet exam costs about $50–$75 in the U.S. See typical prices for vaccines, dental cleanings, spay/neuter, bloodwork and emergency visits.",
  "how-often-should-you-bathe-your-dog": "Most dogs need a bath every 4–8 weeks, but coat type, skin and lifestyle matter. Learn how often to bathe your dog without drying out the skin.",
  "how-to-stop-puppy-biting": "Puppy biting is normal, but those sharp teeth hurt. Learn why puppies bite, 9 positive methods to stop it, and when biting signals a bigger problem.",
  "cat-peeing-outside-litter-box": "Cat peeing outside the litter box? Learn the medical causes to rule out, common litter box mistakes, stress triggers and when it's an emergency.",
  "dog-fireworks-anxiety": "Is your dog scared of fireworks? Learn the signs of noise anxiety and how to keep your dog safe and calm on July 4th and New Year's Eve.",
  "flea-and-tick-prevention-guide": "Compare flea and tick prevention for dogs and cats, why year-round protection matters, how to treat your home, and dog products that are toxic to cats.",
};

function merge(a) {
  const x = expansions[a.slug];
  let content = a.content;
  if (x) {
    if (!content.includes(FAQ)) throw new Error(`No FAQ heading in ${a.slug}`);
    content = content.replace(FAQ, `${x.body}\n${FAQ}\n${x.faq}`);
  }
  return { ...a, content, metaDescription: META[a.slug] || a.metaDescription };
}

export const seoArticles = [...seoArticles1, ...seoArticles2, ...seoArticles3].map(merge);
