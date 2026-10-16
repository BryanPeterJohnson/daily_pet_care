// Starter content for a U.S. pet care blog. Edit or delete freely from the admin panel.

export const categories = [
  { name: "Dog Care", slug: "dog-care", description: "Everyday care, exercise, safety and life-stage advice for dogs of every size.", sort: 1 },
  { name: "Cat Care", slug: "cat-care", description: "Indoor living, litter, enrichment and wellbeing for cats and kittens.", sort: 2 },
  { name: "Pet Health", slug: "pet-health", description: "Vaccines, preventive care, common conditions and when to call your vet.", sort: 3 },
  { name: "Nutrition", slug: "nutrition", description: "Food labels, feeding schedules, treats and foods to avoid.", sort: 4 },
  { name: "Grooming", slug: "grooming", description: "Bathing, brushing, nail trims and how to choose a professional groomer.", sort: 5 },
  { name: "Training", slug: "training", description: "Positive-reinforcement training, house training and behavior help.", sort: 6 },
  { name: "Pet Services", slug: "pet-services", description: "Dog walkers, pet sitters, boarding, daycare and how to hire well.", sort: 7 },
  { name: "Adoption", slug: "adoption", description: "Preparing for, choosing and welcoming a rescue or shelter pet.", sort: 8 },
];

const H = (s) => s.trim().replace(/\n\s+/g, "\n");

export const posts = [
  {
    title: "How to Choose a Dog Groomer: 10 Questions to Ask Before You Book",
    slug: "how-to-choose-a-dog-groomer",
    category: "grooming",
    featured: true,
    daysAgo: 2,
    tags: ["Dog Grooming", "Hiring Tips", "Dogs"],
    excerpt:
      "A great groomer keeps your dog clean, comfortable and safe. Here are the questions that separate a true professional from a risky booking.",
    content: H(`
      <p>Handing your dog to a stranger with clippers and scissors takes trust. Most groomers in the U.S. do excellent work, but grooming is largely unregulated in many states, so it pays to ask a few pointed questions before you book. Use this checklist on the phone or during a quick salon visit.</p>
      <h2>1. Are you certified, and by whom?</h2>
      <p>Certification is voluntary in most states, which makes it a useful signal. Look for credentials from organizations such as the National Dog Groomers Association of America (NDGAA) or International Professional Groomers (IPG), or for training in pet first aid and CPR.</p>
      <h2>2. Can I see where my dog will be groomed and kept?</h2>
      <p>A reputable salon will happily show you the grooming area and the space where dogs wait. Look for clean surfaces, secure crates or pens, good ventilation and staff who handle dogs calmly.</p>
      <h2>3. How do you dry dogs?</h2>
      <p>Ask specifically about cage dryers. Heated cage dryers left unattended have caused heatstroke, especially in flat-faced breeds like Pugs, Bulldogs and Shih Tzus. The safest answer is hand drying or unheated cage dryers with constant supervision.</p>
      <h2>4. What happens if my dog gets anxious or snappy?</h2>
      <p>Good groomers pause, use breaks and low-stress handling, and will call you rather than force a nervous dog through a full groom. Be wary of anyone who mentions sedating your dog — that should only ever happen under a veterinarian's care.</p>
      <h2>5. Which vaccines do you require?</h2>
      <p>Most salons require proof of rabies vaccination, and many also ask for DHPP and Bordetella. Strict vaccine rules are a good sign: they protect your dog from the other dogs in the building.</p>
      <h2>6. Do you have experience with my breed and coat type?</h2>
      <p>Double-coated breeds such as Huskies and Golden Retrievers generally should not be shaved down, while Poodles and Doodles need regular scissoring to prevent matting. Ask what they recommend for your dog's coat, and why.</p>
      <h2>7. How long will my dog be there?</h2>
      <p>Long waits in a crate add stress. Many salons now offer appointment-only "express" grooms, and mobile groomers come to your driveway with a one-dog-at-a-time van.</p>
      <h2>8. What exactly is included in the price?</h2>
      <p>A full groom typically includes a bath, blow-dry, haircut, nail trim and ear cleaning. Teeth brushing, anal gland expression, de-matting and flea treatments are often extra. Ask for a written quote for your dog's size and coat condition.</p>
      <h2>9. Are you insured?</h2>
      <p>Professional groomers should carry liability insurance and, ideally, animal bailee coverage, which protects pets while they are in the groomer's care.</p>
      <h2>10. What will you do in an emergency?</h2>
      <p>The right answer names a nearby veterinary clinic and a clear plan to contact you immediately.</p>
      <blockquote><p><strong>Tip:</strong> Book a short "puppy intro" or nail-trim-only visit first. It lets your dog meet the groomer without a two-hour appointment, and lets you judge how they handle your pet.</p></blockquote>
      <h2>The bottom line</h2>
      <p>Choose the groomer who answers openly, puts safety ahead of speed, and treats your dog like an individual. Once you find them, regular visits every four to eight weeks keep coats healthy and grooming far less stressful.</p>
    `),
  },
  {
    title: "Pet Sitter vs. Boarding Kennel: Which Is Right for Your Pet?",
    slug: "pet-sitter-vs-boarding-kennel",
    category: "pet-services",
    featured: true,
    daysAgo: 5,
    tags: ["Pet Sitting", "Boarding", "Travel"],
    excerpt:
      "Going out of town? Compare in-home pet sitting and boarding facilities on cost, safety, stress and supervision to pick the best fit.",
    content: H(`
      <p>Whether it's a holiday trip or a work conference, deciding who cares for your pet while you're away is one of the biggest pet-parent decisions you'll make each year. The two main options — an in-home pet sitter or a boarding facility — each have clear strengths.</p>
      <h2>In-home pet sitting</h2>
      <p>A sitter either visits your home several times a day or stays overnight. Your pet keeps its normal routine, food and surroundings.</p>
      <ul>
        <li><strong>Best for:</strong> cats, senior pets, anxious dogs, multi-pet households and pets on medication.</li>
        <li><strong>Pros:</strong> lowest stress, no exposure to other animals' illnesses, your home looks lived-in.</li>
        <li><strong>Cons:</strong> less supervision between drop-in visits; quality depends heavily on one person.</li>
      </ul>
      <h2>Boarding kennels and pet resorts</h2>
      <p>Your pet stays at a facility with staff on site. Options range from basic kennels to "pet hotels" with private suites, play groups and webcams.</p>
      <ul>
        <li><strong>Best for:</strong> social, healthy, vaccinated dogs who enjoy activity.</li>
        <li><strong>Pros:</strong> staff present all day, structured exercise, often closer access to veterinary help.</li>
        <li><strong>Cons:</strong> new environment, noise, and exposure to illnesses such as kennel cough.</li>
      </ul>
      <h2>What does each cost?</h2>
      <p>Prices vary widely by city, but in most U.S. markets expect roughly $25–$35 for a 30-minute drop-in visit, $75–$125 per night for an overnight sitter, and $40–$85 per night for standard dog boarding. Luxury suites and holiday dates cost more, and many facilities charge less for cats.</p>
      <h2>Questions to ask either option</h2>
      <ol>
        <li>Are you licensed (where required), bonded and insured?</li>
        <li>What is your plan if my pet gets sick or injured?</li>
        <li>Can we do a meet-and-greet or trial stay first?</li>
        <li>How will you update me — photos, texts, report cards?</li>
        <li>Who else will care for my pet, and how are they screened?</li>
      </ol>
      <h2>How to decide</h2>
      <p>If your pet is older, shy, has medical needs, or is a cat, an experienced sitter is usually the kinder choice. If you have a young, social dog who loves company, a well-run boarding facility or a sitter who offers in-their-home boarding can be a great fit. Whichever you choose, book early — reputable providers fill up weeks ahead of Thanksgiving, the winter holidays and summer weekends.</p>
    `),
  },
  {
    title: "How Much Does a Dog Walker Cost? A U.S. Pricing Guide",
    slug: "how-much-does-a-dog-walker-cost",
    category: "pet-services",
    featured: false,
    daysAgo: 8,
    tags: ["Dog Walking", "Pricing", "Hiring Tips"],
    excerpt:
      "From 20-minute potty breaks to hour-long adventure hikes, here's what dog walking typically costs across the U.S. and what affects the price.",
    content: H(`
      <p>A reliable dog walker can be a lifesaver for busy pet parents, but rates vary a lot from one city to the next. Here's a practical guide to typical prices and the factors behind them.</p>
      <h2>Typical dog walking rates</h2>
      <table>
        <thead><tr><th>Service</th><th>Typical U.S. range</th></tr></thead>
        <tbody>
          <tr><td>15–20 minute potty break</td><td>$15–$22</td></tr>
          <tr><td>30-minute solo walk</td><td>$20–$30</td></tr>
          <tr><td>60-minute solo walk</td><td>$30–$45</td></tr>
          <tr><td>Group walk (per dog)</td><td>$15–$25</td></tr>
          <tr><td>Each additional dog</td><td>+$5–$10</td></tr>
        </tbody>
      </table>
      <p>Expect the higher end of these ranges in large metro areas such as New York, San Francisco, Seattle and Boston, and the lower end in smaller cities and suburbs.</p>
      <h2>What affects the price</h2>
      <ul>
        <li><strong>Location:</strong> cost of living and travel time drive most of the difference.</li>
        <li><strong>Walk length and frequency:</strong> weekly packages often bring the per-walk price down.</li>
        <li><strong>Solo vs. group walks:</strong> group walks are cheaper but not ideal for reactive or very young dogs.</li>
        <li><strong>Timing:</strong> weekends, holidays, and early or late walks often carry a surcharge.</li>
        <li><strong>Special care:</strong> puppies, seniors and dogs needing medication may cost more.</li>
      </ul>
      <h2>Independent walker or app?</h2>
      <p>Apps make booking easy and include some insurance coverage, but the walker may change from week to week and the platform takes a cut. Independent walkers and local companies often offer more consistency — the same person who knows your dog — and may be better value for regular schedules.</p>
      <h2>Red flags</h2>
      <ul>
        <li>No proof of insurance or bonding</li>
        <li>Unwilling to do a free meet-and-greet</li>
        <li>Walking too many dogs at once (more than four to six is a common limit, and some cities cap it)</li>
        <li>No GPS updates or check-in messages</li>
      </ul>
      <p>The best value isn't always the cheapest walker — it's the one who shows up on time, keeps your dog safe, and sends you a happy photo every day.</p>
    `),
  },
  {
    title: "Core Vaccines for Dogs and Cats: A Plain-English Guide",
    slug: "core-vaccines-for-dogs-and-cats",
    category: "pet-health",
    featured: true,
    daysAgo: 11,
    tags: ["Vaccines", "Preventive Care", "Dogs", "Cats"],
    excerpt:
      "Which shots does your pet really need? Learn the difference between core and lifestyle vaccines, plus a typical puppy and kitten schedule.",
    content: H(`
      <p>Vaccines are one of the simplest, most effective ways to protect your pet's health. Veterinarians divide them into two groups: <strong>core vaccines</strong> recommended for nearly every pet, and <strong>non-core (lifestyle) vaccines</strong> given based on where your pet lives and what it does.</p>
      <h2>Core vaccines for dogs</h2>
      <ul>
        <li><strong>Rabies</strong> — required by law in nearly every U.S. state.</li>
        <li><strong>Distemper</strong> — a serious, often fatal virus affecting the lungs, gut and nervous system.</li>
        <li><strong>Parvovirus</strong> — a highly contagious virus that is especially dangerous to puppies.</li>
        <li><strong>Adenovirus (hepatitis)</strong> — usually combined with the above in the "DHPP" or "DAPP" shot.</li>
      </ul>
      <h2>Core vaccines for cats</h2>
      <ul>
        <li><strong>Rabies</strong> — required in many states, even for indoor cats.</li>
        <li><strong>FVRCP</strong> — protects against feline viral rhinotracheitis (herpesvirus), calicivirus and panleukopenia.</li>
        <li><strong>FeLV (feline leukemia)</strong> — strongly recommended for kittens, then based on lifestyle.</li>
      </ul>
      <h2>Common lifestyle vaccines</h2>
      <p>Your vet may also recommend <strong>Bordetella</strong> (kennel cough) for dogs who board, groom or go to daycare; <strong>Leptospirosis</strong> for dogs exposed to wildlife or standing water; <strong>Lyme</strong> in tick-heavy regions like the Northeast and Upper Midwest; and <strong>canine influenza</strong> for very social dogs.</p>
      <h2>A typical puppy and kitten timeline</h2>
      <p>Puppies and kittens usually start their series at 6–8 weeks old and receive boosters every 3–4 weeks until about 16 weeks of age. Rabies is typically given between 12 and 16 weeks. A booster follows at about one year, and after that many core vaccines are given every one to three years depending on the product and local law.</p>
      <h3>Why the series matters</h3>
      <p>Antibodies from the mother can block a single early shot from working. Repeating the vaccine across several weeks makes sure protection "takes" once those maternal antibodies fade.</p>
      <h2>Are vaccines safe?</h2>
      <p>Serious reactions are rare. Mild tiredness or soreness for a day is common. Call your vet right away if you notice facial swelling, hives, vomiting or difficulty breathing after a vaccine.</p>
      <blockquote><p>Every pet is different. Use this guide to prepare questions, and let your veterinarian build the schedule that fits your pet's age, health and lifestyle.</p></blockquote>
    `),
  },
  {
    title: "Toxic Foods for Dogs: What to Keep Off the Counter",
    slug: "toxic-foods-for-dogs",
    category: "nutrition",
    featured: false,
    daysAgo: 14,
    tags: ["Pet Safety", "Dogs", "Nutrition"],
    excerpt:
      "Chocolate is only the beginning. These common kitchen foods can make dogs seriously ill — and here's what to do if your dog eats one.",
    content: H(`
      <p>Dogs are expert counter-surfers, and some everyday human foods can be dangerous to them. Knowing the biggest offenders helps you prevent an emergency vet visit.</p>
      <h2>The most dangerous foods</h2>
      <h3>Xylitol</h3>
      <p>This sugar substitute appears in sugar-free gum, some peanut butters, candy, baked goods and even toothpaste. In dogs it can cause a rapid drop in blood sugar and liver damage. Always check peanut butter labels before sharing.</p>
      <h3>Chocolate and caffeine</h3>
      <p>Chocolate contains theobromine and caffeine. Dark and baking chocolate are the most dangerous; even milk chocolate can cause vomiting, a racing heart and tremors in small dogs.</p>
      <h3>Grapes and raisins</h3>
      <p>These can cause sudden kidney failure in some dogs, and there's no known "safe" amount. Watch out for trail mix, raisin bread and cookies.</p>
      <h3>Onions, garlic, leeks and chives</h3>
      <p>Raw, cooked or powdered, these can damage red blood cells. Be careful with leftovers, gravies and seasoned meats.</p>
      <h3>Macadamia nuts</h3>
      <p>They can cause weakness, vomiting, tremors and fever.</p>
      <h3>Alcohol and raw yeast dough</h3>
      <p>Both can cause dangerous drops in blood sugar, body temperature and blood pressure. Rising dough can also expand painfully in the stomach.</p>
      <h2>Other hazards</h2>
      <ul>
        <li>Cooked bones, which can splinter</li>
        <li>Corn cobs and fruit pits, which can cause blockages</li>
        <li>Fatty trimmings, which may trigger pancreatitis</li>
      </ul>
      <h2>What to do if your dog eats something toxic</h2>
      <ol>
        <li>Stay calm and move your dog away from the food.</li>
        <li>Note what was eaten, roughly how much, and when.</li>
        <li><strong>Call your veterinarian or an emergency animal hospital immediately.</strong></li>
        <li>You can also call the ASPCA Animal Poison Control Center at (888) 426-4435 or the Pet Poison Helpline at (855) 764-7661 (consultation fees may apply).</li>
        <li>Do not make your dog vomit unless a veterinary professional tells you to.</li>
      </ol>
      <p>Save your vet's number and the nearest 24-hour emergency clinic in your phone today — it's the easiest thing you can do to be ready.</p>
    `),
  },
  {
    title: "Indoor Cat Enrichment: 12 Easy Ideas for a Happier Cat",
    slug: "indoor-cat-enrichment-ideas",
    category: "cat-care",
    featured: false,
    daysAgo: 18,
    tags: ["Cats", "Enrichment", "Behavior"],
    excerpt:
      "Indoor cats live longer, safer lives — but they need to hunt, climb and explore. These simple enrichment ideas keep boredom away.",
    content: H(`
      <p>Keeping cats indoors protects them from cars, predators and disease, and it protects local wildlife too. The trade-off is boredom, which can show up as overeating, scratching furniture, or late-night zoomies. The fix is enrichment: giving your cat chances to act on natural instincts.</p>
      <h2>Feed the hunter</h2>
      <ol>
        <li><strong>Use puzzle feeders</strong> or treat balls instead of a bowl for some meals.</li>
        <li><strong>Hide small portions</strong> of kibble around the house for a "hunt."</li>
        <li><strong>Play before meals</strong> — chase, catch, eat, groom, sleep mirrors a cat's natural cycle.</li>
      </ol>
      <h2>Go vertical</h2>
      <ol start="4">
        <li><strong>Add a tall cat tree</strong> near a window.</li>
        <li><strong>Install wall shelves</strong> to create a climbing route.</li>
        <li><strong>Clear a window perch</strong> and place a bird feeder outside for "cat TV."</li>
      </ol>
      <h2>Play every day</h2>
      <ol start="7">
        <li><strong>Wand toys</strong> are the gold standard. Aim for two or three 10-minute sessions a day.</li>
        <li><strong>Rotate toys</strong> weekly so they feel new again.</li>
        <li><strong>End laser play on a real toy</strong> so your cat gets the satisfaction of a "catch."</li>
      </ol>
      <h2>Engage the senses</h2>
      <ol start="10">
        <li><strong>Grow cat grass</strong> or offer catnip or silver vine.</li>
        <li><strong>Provide cardboard boxes</strong> and paper bags (handles removed) to explore.</li>
        <li><strong>Try a catio or harness training</strong> for safe outdoor time.</li>
      </ol>
      <h2>Signs enrichment is working</h2>
      <p>A well-enriched cat is curious, sleeps soundly, uses scratching posts instead of furniture, and keeps a healthy weight. If your cat seems persistently withdrawn, overgrooms, or changes litter habits, schedule a vet visit — behavior changes can signal a medical problem.</p>
    `),
  },
  {
    title: "Crate Training a Puppy: A Simple Week-by-Week Plan",
    slug: "crate-training-a-puppy",
    category: "training",
    featured: false,
    daysAgo: 22,
    tags: ["Puppies", "Training", "House Training"],
    excerpt:
      "A crate can become your puppy's favorite den. Follow this gentle, positive plan to speed up house training and prevent separation stress.",
    content: H(`
      <p>Done right, crate training gives your puppy a safe den, speeds up house training, and keeps them out of trouble when you can't watch them. The key is to make the crate a happy place — never a punishment.</p>
      <h2>Choose the right crate</h2>
      <p>Your puppy should be able to stand, turn around and lie down comfortably. Too much space invites accidents in one corner. Many wire crates come with a divider so the crate can grow with your dog.</p>
      <h2>Week 1: Make friends with the crate</h2>
      <ul>
        <li>Leave the door open and toss treats inside.</li>
        <li>Feed meals in or near the crate.</li>
        <li>Add a soft blanket and a safe chew toy.</li>
        <li>Close the door for a few seconds while your puppy eats, then open it before they finish.</li>
      </ul>
      <h2>Week 2: Build duration</h2>
      <ul>
        <li>Give a long-lasting chew in the crate and sit nearby for 5–10 minutes.</li>
        <li>Practice short absences: leave the room for a minute, return calmly.</li>
        <li>Start overnight crating next to your bed so your puppy can hear you.</li>
      </ul>
      <h2>Week 3 and beyond: Real-life practice</h2>
      <ul>
        <li>Gradually extend time alone to 30–60 minutes.</li>
        <li>Keep arrivals and departures low-key.</li>
        <li>Use a cue like "crate" or "bed" and reward them for going in on their own.</li>
      </ul>
      <h2>How long can a puppy stay in a crate?</h2>
      <p>A common rule of thumb is that a puppy can hold their bladder about one hour per month of age, plus one — so a three-month-old can manage roughly three to four hours during the day. If you work long hours, a midday dog walker or puppy daycare is a worthwhile investment.</p>
      <h2>Mistakes to avoid</h2>
      <ul>
        <li>Using the crate for punishment</li>
        <li>Letting your puppy out while they are whining (wait for a brief quiet moment)</li>
        <li>Crating for most of the day</li>
      </ul>
      <p>If your puppy panics, drools heavily or injures themselves trying to escape, stop and talk to your vet or a certified trainer — this can signal separation anxiety that needs a tailored plan.</p>
    `),
  },
  {
    title: "Adopting a Rescue Pet: Your First 30 Days Checklist",
    slug: "adopting-a-rescue-pet-first-30-days",
    category: "adoption",
    featured: false,
    daysAgo: 26,
    tags: ["Adoption", "Rescue", "New Pet"],
    excerpt:
      "Bringing home a shelter pet? This checklist covers supplies, the first vet visit, and the decompression period that helps rescues settle in.",
    content: H(`
      <p>Adopting from a shelter or rescue is one of the most rewarding things you can do. The first month sets the tone, so a little planning goes a long way.</p>
      <h2>Before your pet comes home</h2>
      <ul>
        <li>Food (ask the shelter what they've been feeding), bowls and treats</li>
        <li>Collar or harness, leash and an ID tag with your phone number</li>
        <li>Crate or bed, and for cats, a litter box and scratching post</li>
        <li>Enzyme cleaner for accidents</li>
        <li>Pet-proofing: secure trash cans, cords, medications and toxic plants</li>
      </ul>
      <h2>Days 1–3: Decompress</h2>
      <p>Many rescuers follow the "3-3-3 rule": about three days to decompress, three weeks to learn the routine, and three months to feel at home. Keep the first few days quiet. Skip the welcome party, limit visitors, and give your pet a calm space of their own.</p>
      <h2>Week 1: Vet visit and microchip</h2>
      <ul>
        <li>Schedule a wellness exam within the first week or two, and bring the shelter's medical records.</li>
        <li>Confirm the microchip is registered to <em>you</em> — this step is often missed.</li>
        <li>Ask about parasite prevention and any vaccines that are due.</li>
      </ul>
      <h2>Weeks 2–3: Build routines</h2>
      <p>Consistent times for meals, walks, play and sleep help rescues feel secure. Start simple positive-reinforcement training with high-value treats. A group class is a great way to bond.</p>
      <h2>Week 4: Expand their world</h2>
      <p>Gradually introduce new people, places and — if appropriate — other pets. Watch body language and move at your pet's pace.</p>
      <h2>When to ask for help</h2>
      <p>Most shelters offer post-adoption support. Reach out if you see persistent fear, aggression, or house-training setbacks. A certified trainer or veterinary behaviorist can help early, before habits form.</p>
      <blockquote><p>Patience is the secret ingredient. The shy pet hiding behind the couch in week one is often the shadow following you around by month three.</p></blockquote>
    `),
  },
  {
    title: "Summer Heat Safety for Dogs: Warning Signs and Prevention",
    slug: "summer-heat-safety-for-dogs",
    category: "dog-care",
    featured: false,
    daysAgo: 30,
    tags: ["Dogs", "Pet Safety", "Summer"],
    excerpt:
      "Dogs overheat faster than people. Learn the early signs of heatstroke, how hot pavement really gets, and how to keep walks safe in summer.",
    content: H(`
      <p>Dogs cool themselves mainly by panting, which makes them far less efficient at shedding heat than people. Heatstroke can develop in minutes and is a true emergency.</p>
      <h2>Who is most at risk?</h2>
      <ul>
        <li>Flat-faced breeds such as Bulldogs, Pugs, Boston Terriers and Boxers</li>
        <li>Puppies, seniors and overweight dogs</li>
        <li>Dogs with heart or breathing conditions</li>
        <li>Thick-coated breeds in humid climates</li>
      </ul>
      <h2>Warning signs of overheating</h2>
      <ul>
        <li>Heavy, frantic panting and thick drool</li>
        <li>Bright red or pale gums</li>
        <li>Weakness, stumbling or confusion</li>
        <li>Vomiting or diarrhea</li>
        <li>Collapse</li>
      </ul>
      <h2>What to do right away</h2>
      <ol>
        <li>Move your dog to shade or air conditioning.</li>
        <li>Wet them with cool — not ice-cold — water and use a fan.</li>
        <li>Offer small amounts of water.</li>
        <li><strong>Head to a vet immediately</strong>, even if your dog seems to recover; internal damage can show up later.</li>
      </ol>
      <h2>Prevention tips</h2>
      <ul>
        <li>Walk early in the morning or after sunset.</li>
        <li>Use the five-second test: if you can't hold the back of your hand on the pavement for five seconds, it's too hot for paws.</li>
        <li>Never leave a dog in a parked car — temperatures inside can climb dangerously within minutes, even with windows cracked.</li>
        <li>Carry water and a collapsible bowl.</li>
        <li>Swap long runs for sniff walks, swimming or indoor games on hot days.</li>
      </ul>
    `),
  },
];
