// Extra depth for articles in part 1. `body` goes before the FAQ section; `faq` is added at the top of it.
const H = (s) => s.trim().replace(/\n\s+/g, "\n");

export const expansions1 = {
  "dog-grooming-cost": {
    body: H(`
      <h2>Grooming costs by breed: real-world examples</h2>
      <p>Weight is only half the story. Two 50 lb dogs can have very different bills depending on their coat. Here's how common U.S. breeds usually fall:</p>
      <table>
        <thead><tr><th>Breed</th><th>Typical service</th><th>Where it lands</th></tr></thead>
        <tbody>
          <tr><td>Chihuahua, Pug, Dachshund</td><td>Bath, brush, nails</td><td>Low end of small-dog pricing</td></tr>
          <tr><td>Shih Tzu, Maltese, Yorkie</td><td>Full haircut every 4–6 weeks</td><td>Small full-groom pricing; more if matted</td></tr>
          <tr><td>Labrador, Beagle, Boxer</td><td>Bath and de-shed</td><td>Medium to large bath pricing</td></tr>
          <tr><td>Golden Retriever, Husky, German Shepherd</td><td>Bath, de-shed, tidy trim</td><td>Large bath pricing plus a de-shedding add-on</td></tr>
          <tr><td>Goldendoodle, Labradoodle, Standard Poodle</td><td>Full haircut every 4–8 weeks</td><td>Top of large or extra-large full-groom pricing</td></tr>
          <tr><td>Newfoundland, Great Pyrenees</td><td>Bath, de-shed, long dry time</td><td>Extra-large pricing, often $200+</td></tr>
        </tbody>
      </table>
      <p>Doodle owners are often surprised to pay the most. Their soft, curly coats mat easily and take a long time to wash, dry and scissor. Keeping your Doodle on a regular schedule is the single best way to control the cost.</p>
      <h2>What a yearly grooming budget looks like</h2>
      <p>Multiply the price of one visit by how often your dog needs it:</p>
      <ul>
        <li><strong>Short-coated medium dog,</strong> bath every 8–12 weeks: about 4–6 visits a year</li>
        <li><strong>Small dog with a haircut,</strong> every 6 weeks: about 8–9 full grooms a year</li>
        <li><strong>Doodle,</strong> every 6 weeks: about 8–9 large full grooms a year — often the biggest grooming budget of any breed</li>
      </ul>
      <p>Add 15–20% for tips, plus any add-ons, and you have a realistic annual number to plan around.</p>
      <h2>How to read a grooming quote</h2>
      <p>A clear quote should list the base service, your dog's size category and any likely extras. Before you agree, ask:</p>
      <ol>
        <li>Is the price based on weight, breed or time?</li>
        <li>What counts as matting, and how is de-matting charged?</li>
        <li>Is there a fee if my dog needs a second handler?</li>
        <li>Are nail grinding and ear cleaning included or extra?</li>
        <li>Will you call me before doing anything that changes the price?</li>
      </ol>
      <h2>Grooming mistakes that cost you money</h2>
      <ul>
        <li><strong>Waiting too long between appointments.</strong> An overgrown, tangled coat takes far longer to fix than a regular maintenance groom.</li>
        <li><strong>Bathing at home without brushing first.</strong> Water tightens tangles into mats.</li>
        <li><strong>Choosing the cheapest salon without asking about safety.</strong> A vet bill after an injury costs far more than the difference in price.</li>
        <li><strong>Skipping nail trims.</strong> Overgrown nails can lead to cracked nails and painful paws.</li>
      </ul>
      <h2>DIY grooming vs. professional: a quick comparison</h2>
      <p>Grooming at home makes the most sense for short-coated dogs and for in-between maintenance like brushing, baths and nails. A professional is worth the money for full haircuts, double-coat de-shedding with high-velocity dryers, matted coats and dogs who need careful handling. Many owners split the difference: professional grooms every other cycle, with home baths in between.</p>
    `),
    faq: H(`
      <h3>Do groomers charge more for Doodles?</h3>
      <p>Usually, yes. Their curly, fast-growing coats take longer to bathe, dry and scissor, and they mat easily. Expect to pay at the top of the price range for their size.</p>
      <h3>Is a puppy's first groom cheaper?</h3>
      <p>Many salons offer an inexpensive introductory "puppy groom" — a gentle bath, face and paw tidy and nail trim to get puppies used to the routine.</p>
    `),
  },
  "dog-boarding-cost": {
    body: H(`
      <h2>What a week of boarding really costs</h2>
      <p>The nightly rate is just the starting point. Here's how a typical one-week trip can add up for one medium-sized dog at a standard kennel in a mid-priced U.S. city:</p>
      <table>
        <thead><tr><th>Item</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>7 nights of standard boarding</td><td>7 × the nightly rate</td></tr>
          <tr><td>Daily playgroup or extra walk</td><td>Added per day</td></tr>
          <tr><td>Medication administration</td><td>Added per day, if needed</td></tr>
          <tr><td>Exit bath</td><td>One-time fee</td></tr>
          <tr><td>Holiday surcharge</td><td>Per night during peak dates</td></tr>
        </tbody>
      </table>
      <p>Get each line item in writing so you can compare facilities fairly. One facility's "all-inclusive" rate may actually be cheaper than another's lower nightly price plus add-ons.</p>
      <h2>Boarding dogs with special needs</h2>
      <h3>Senior dogs</h3>
      <p>Older dogs may struggle with hard floors, noise and changes in routine. Ask about orthopedic bedding, quieter rooms and how often staff check on them. An in-home sitter is often kinder for seniors.</p>
      <h3>Dogs on medication</h3>
      <p>Bring medications in original labeled containers with written instructions. Ask who gives the medication and how they record each dose.</p>
      <h3>Anxious dogs</h3>
      <p>Book a trial day or overnight before your trip. Bring familiar food and a worn t-shirt, and ask whether your dog can have a private run away from the busiest areas.</p>
      <h3>Puppies</h3>
      <p>Young puppies need frequent potty breaks and must be fully vaccinated. Confirm the facility has puppy-specific play groups and supervision.</p>
      <h2>Your boarding packing checklist</h2>
      <ul>
        <li>Pre-portioned meals in labeled bags (plus a couple of extra days' worth)</li>
        <li>Medications and written instructions</li>
        <li>Vaccine records (email them ahead if possible)</li>
        <li>Collar with ID tags</li>
        <li>A durable toy or chew the facility allows</li>
        <li>An item that smells like home</li>
        <li>Your contact details, a backup contact and your vet's information</li>
      </ul>
      <h2>Red flags when touring a kennel</h2>
      <ul>
        <li>They won't show you where dogs sleep</li>
        <li>Strong urine or chemical smells</li>
        <li>Dogs left in runs with no water</li>
        <li>No staff on site overnight and no monitoring plan</li>
        <li>No vaccine requirements</li>
        <li>Staff can't explain what happens in a medical emergency</li>
      </ul>
      <h2>Ways to save on boarding</h2>
      <ol>
        <li>Book early to lock in non-holiday rates.</li>
        <li>Ask about multi-dog and long-stay discounts.</li>
        <li>Skip add-ons your dog doesn't need.</li>
        <li>Compare standard rooms with luxury suites — many dogs are just as happy in a basic, clean run.</li>
        <li>Consider a trusted friend or an in-home sitter for short trips.</li>
      </ol>
    `),
    faq: H(`
      <h3>Do boarding kennels charge by the night or by the day?</h3>
      <p>It varies. Some charge per night, others per calendar day, which can mean paying for both drop-off and pickup days. Ask how they count before you book.</p>
      <h3>Is it normal for my dog to have diarrhea after boarding?</h3>
      <p>Mild, short-lived stomach upset from excitement and stress is common. Call your vet if it lasts more than a day or two, or if there's vomiting, blood or lethargy.</p>
    `),
  },
  "is-pet-insurance-worth-it": {
    body: H(`
      <h2>Real-world scenarios: when insurance pays off</h2>
      <p>Seeing the numbers side by side makes the decision clearer. These examples use a policy with a $250 annual deductible and 90% reimbursement.</p>
      <h3>Scenario 1: A swallowed toy</h3>
      <p>A young Lab swallows part of a toy and needs surgery costing $4,000. After the deductible, insurance reimburses about $3,375. The owner pays roughly $625 — plus the premiums paid that year.</p>
      <h3>Scenario 2: A healthy year</h3>
      <p>A cat has only a routine checkup and vaccines. An accident and illness policy pays nothing, because routine care isn't covered. The owner paid roughly $390 in premiums for peace of mind.</p>
      <h3>Scenario 3: A chronic condition</h3>
      <p>A dog develops allergies that need medication and vet visits every year. If the condition started after enrollment, insurance can help year after year. If it started before, it's pre-existing and not covered.</p>
      <p>The pattern is clear: pet insurance is a financial safety net for large, unexpected bills — not a way to save money on routine care.</p>
      <h2>Pet insurance terms, explained</h2>
      <ul>
        <li><strong>Premium:</strong> the monthly or yearly price of the policy.</li>
        <li><strong>Annual deductible:</strong> you pay it once per policy year before coverage begins.</li>
        <li><strong>Per-condition deductible:</strong> you pay it for each new condition.</li>
        <li><strong>Reimbursement:</strong> the share of eligible costs the insurer pays after the deductible.</li>
        <li><strong>Annual or lifetime limit:</strong> the cap on what the insurer will pay.</li>
        <li><strong>Waiting period:</strong> the time after enrollment before coverage starts.</li>
        <li><strong>Pre-existing condition:</strong> a problem that showed signs before coverage began.</li>
        <li><strong>Curable vs. incurable:</strong> some insurers will cover a cured condition again after a symptom-free period. Check how each policy defines it.</li>
      </ul>
      <h2>How to keep premiums manageable</h2>
      <ol>
        <li><strong>Raise the deductible.</strong> A higher deductible lowers the monthly premium.</li>
        <li><strong>Choose 80% instead of 90% reimbursement</strong> if the savings are meaningful.</li>
        <li><strong>Skip the wellness add-on</strong> unless the math clearly works in your favor.</li>
        <li><strong>Ask about discounts</strong> for multiple pets, annual payment or employer benefits.</li>
        <li><strong>Enroll early.</strong> Young pets get lower starting premiums and fewer exclusions.</li>
      </ol>
      <h2>Questions to ask before you buy</h2>
      <ul>
        <li>How is a pre-existing condition defined, and can it ever become covered?</li>
        <li>Are hereditary and congenital conditions covered?</li>
        <li>Are exam fees, prescription food and alternative therapies included?</li>
        <li>Is there an age limit for enrollment?</li>
        <li>How do premiums change as my pet ages?</li>
        <li>How long do claims usually take to pay?</li>
      </ul>
    `),
    faq: H(`
      <h3>Is pet insurance worth it for indoor cats?</h3>
      <p>Indoor cats have fewer accidents, but they still develop costly illnesses such as urinary blockages, kidney disease and dental disease. An accident and illness policy can still make sense, especially if you couldn't cover a sudden large bill.</p>
      <h3>Can I get insurance for an older pet?</h3>
      <p>Many insurers accept senior pets, but premiums are higher and existing conditions won't be covered. Compare carefully against building an emergency fund.</p>
    `),
  },
  "vet-visit-cost": {
    body: H(`
      <h2>Sample annual vet budget</h2>
      <p>Here's what a typical year of preventive care might include for a healthy adult pet. Use it as a checklist when you plan your budget:</p>
      <ul>
        <li>One wellness exam (two for seniors)</li>
        <li>Vaccines due that year</li>
        <li>Heartworm test (dogs)</li>
        <li>Fecal parasite test</li>
        <li>Monthly flea, tick and heartworm prevention</li>
        <li>Routine bloodwork for pets over about seven years old</li>
        <li>A dental cleaning when your vet recommends it</li>
      </ul>
      <p>Prevention is the biggest recurring cost for most owners, but it protects you from far larger bills later. Read our <a href="/blog/flea-and-tick-prevention-guide">flea and tick prevention guide</a> for help choosing products.</p>
      <h2>Senior pet vet costs</h2>
      <p>Dogs and cats are often considered seniors around seven years old (earlier for large breeds). Seniors benefit from twice-yearly exams and regular bloodwork to catch kidney disease, diabetes, thyroid problems and arthritis early. Budget more for this stage of life — early detection usually means simpler, less expensive treatment.</p>
      <h2>Urgent care vs. emergency: where to go</h2>
      <table>
        <thead><tr><th>Go to an emergency hospital</th><th>Urgent care or your regular vet may be fine</th></tr></thead>
        <tbody>
          <tr><td>Trouble breathing, collapse or seizures</td><td>Mild vomiting or diarrhea with normal energy</td></tr>
          <tr><td>Swollen, hard belly with retching (possible bloat)</td><td>Minor cuts and scrapes</td></tr>
          <tr><td>Male cat straining with little or no urine</td><td>Ear scratching or head shaking</td></tr>
          <tr><td>Known poison or toxic food ingestion</td><td>A mild limp with normal behavior</td></tr>
          <tr><td>Hit by a car, severe bleeding</td><td>Skin itching or a small lump</td></tr>
        </tbody>
      </table>
      <p>When in doubt, call. Many clinics will triage over the phone.</p>
      <h2>How to read a vet estimate</h2>
      <p>Most estimates show a low and high range. The low end covers the expected plan; the high end allows for complications. Ask your vet:</p>
      <ol>
        <li>Which items are essential today?</li>
        <li>Which tests could wait or be done in stages?</li>
        <li>Is there a less expensive option with similar outcomes?</li>
        <li>What would happen if we chose to monitor instead?</li>
      </ol>
      <p>Good vets are happy to talk through options. Being open about your budget helps them help you.</p>
      <h2>Low-cost care options in the U.S.</h2>
      <ul>
        <li><strong>Shelter and humane society clinics</strong> often offer low-cost vaccines, microchips and spay/neuter surgery.</li>
        <li><strong>Veterinary schools</strong> may provide care at teaching hospitals, sometimes at lower cost.</li>
        <li><strong>Vaccine clinics</strong> at pet stores or community events offer basic shots at set prices.</li>
        <li><strong>Charitable assistance programs</strong> help with emergency bills for qualifying families.</li>
      </ul>
    `),
    faq: H(`
      <h3>How much is a vet visit for a sick pet?</h3>
      <p>The exam fee is similar to a wellness visit, but diagnostics such as bloodwork, X-rays or urine tests can add a few hundred dollars or more, depending on the problem.</p>
      <h3>Why are vet costs rising?</h3>
      <p>Advanced equipment, specialized medications and staffing costs have all increased. Pets today also receive more sophisticated care than in the past.</p>
    `),
  },
  "doggy-daycare-guide": {
    body: H(`
      <h2>A typical day at doggy daycare</h2>
      <p>Most good facilities follow a structured schedule rather than nonstop play:</p>
      <ul>
        <li><strong>Morning drop-off:</strong> a calm intake, then dogs join play groups matched by size and energy.</li>
        <li><strong>Morning play:</strong> supervised group play, games and enrichment.</li>
        <li><strong>Midday rest:</strong> one to two hours of quiet time in individual suites or crates.</li>
        <li><strong>Afternoon play:</strong> another, often shorter, play session.</li>
        <li><strong>Wind-down and pickup:</strong> calmer activities before going home.</li>
      </ul>
      <p>If a daycare doesn't schedule rest, ask why. Overtired dogs are more likely to get snappy, and scuffles are more common late in the day.</p>
      <h2>Understanding the temperament test</h2>
      <p>Before your dog's first full day, most daycares do an evaluation. Staff introduce your dog to a calm "helper" dog, then gradually to a small group, watching for:</p>
      <ul>
        <li>Relaxed, loose body language and play bows</li>
        <li>Respecting other dogs' signals to back off</li>
        <li>Resource guarding over toys, water or people</li>
        <li>Signs of fear like hiding, trembling or snapping</li>
      </ul>
      <p>Not passing isn't a failure — it just means group play isn't the right setting for your dog right now. Many daycares can suggest alternatives.</p>
      <h2>Reading your dog after daycare</h2>
      <p>Pay attention to how your dog behaves in the evening:</p>
      <ul>
        <li><strong>Good signs:</strong> happy to go in the morning, pleasantly tired, normal appetite.</li>
        <li><strong>Warning signs:</strong> reluctant at the door, extremely exhausted, hoarse from barking, new scrapes, irritability or loss of appetite.</li>
      </ul>
      <p>Warning signs mean it's time to talk to the staff and maybe reduce days.</p>
      <h2>Daycare alternatives</h2>
      <ul>
        <li><strong>Dog walkers:</strong> a midday walk breaks up the day without group play.</li>
        <li><strong>Small-group or in-home daycare:</strong> fewer dogs, calmer environment.</li>
        <li><strong>Pack walks or adventure hikes:</strong> structured exercise with a small group.</li>
        <li><strong>Enrichment at home:</strong> puzzle feeders, frozen food toys and sniff games for dogs left alone a few hours.</li>
      </ul>
      <h2>Getting the most value from your membership</h2>
      <ol>
        <li>Buy a small package first to see if your dog enjoys daycare.</li>
        <li>Choose consistent days so your dog gets to know the staff and the group.</li>
        <li>Ask whether training or grooming add-ons are discounted for members.</li>
        <li>Check package expiration dates before buying a large bundle.</li>
      </ol>
    `),
    faq: H(`
      <h3>What age can a puppy start daycare?</h3>
      <p>Most daycares accept puppies once they've completed their vaccine series, usually around four months. Some offer special puppy groups.</p>
      <h3>My dog came home with a scratch. Is that normal?</h3>
      <p>Minor scratches can happen during rough play, but the staff should tell you about any injury at pickup. Repeated injuries are a red flag.</p>
    `),
  },
};
