// Extra depth for articles in part 2.
const H = (s) => s.trim().replace(/\n\s+/g, "\n");

export const expansions2 = {
  "how-to-choose-a-veterinarian": {
    body: H(`
      <h2>Types of veterinary practices</h2>
      <p>Knowing the options helps you build the right care team for your pet:</p>
      <ul>
        <li><strong>General practice:</strong> your pet's primary vet for wellness, vaccines, sick visits and routine surgery.</li>
        <li><strong>Specialty hospitals:</strong> board-certified specialists in areas like surgery, cardiology, dermatology, oncology and internal medicine, usually by referral.</li>
        <li><strong>24-hour emergency hospitals:</strong> nights, weekends and critical care.</li>
        <li><strong>Urgent care clinics:</strong> walk-in help for non-life-threatening problems, often with extended hours.</li>
        <li><strong>Mobile vets:</strong> house calls for anxious pets, seniors or multi-pet homes.</li>
        <li><strong>Feline-only clinics:</strong> quieter, cat-focused practices without barking dogs.</li>
      </ul>
      <h2>Your comparison scorecard</h2>
      <p>Narrow your search to two or three clinics, then score each one from 1 to 5:</p>
      <table>
        <thead><tr><th>Factor</th><th>What a 5 looks like</th></tr></thead>
        <tbody>
          <tr><td>Convenience</td><td>Close by, hours fit your schedule</td></tr>
          <tr><td>Availability</td><td>Sick pets seen same day or next day</td></tr>
          <tr><td>Communication</td><td>Clear explanations, calls back promptly, patient portal</td></tr>
          <tr><td>Handling</td><td>Gentle, low-stress, uses treats and breaks</td></tr>
          <tr><td>Transparency</td><td>Written estimates, explains options</td></tr>
          <tr><td>Facilities</td><td>Clean, in-house lab and imaging</td></tr>
          <tr><td>Emergency plan</td><td>Clear after-hours referral with record sharing</td></tr>
        </tbody>
      </table>
      <h2>Red flags to watch for</h2>
      <ul>
        <li>Staff refuse to let you see where your pet is treated, with no explanation</li>
        <li>Pressure to buy expensive packages or products before an exam</li>
        <li>No written estimate for non-emergency procedures</li>
        <li>Rough handling or dismissive answers to questions</li>
        <li>Consistently long waits for urgent problems</li>
      </ul>
      <h2>Choosing a vet for a new puppy or kitten</h2>
      <p>The first year involves several visits for vaccines, deworming and spay or neuter surgery. Look for a clinic that:</p>
      <ul>
        <li>Offers puppy or kitten packages that bundle the first-year care</li>
        <li>Makes early visits fun with treats and gentle handling</li>
        <li>Can advise on nutrition, training and socialization</li>
      </ul>
      <p>Positive early experiences help your pet stay calmer at the vet for life.</p>
      <h2>Choosing a vet for a senior pet</h2>
      <p>Older pets benefit from a vet who discusses pain management, mobility, quality of life and regular screening bloodwork. Ask whether the clinic offers senior wellness plans and how they handle chronic conditions like kidney disease or arthritis.</p>
      <h2>Moving to a new city? Do this first</h2>
      <ol>
        <li>Ask your current vet for a complete copy of your pet's records.</li>
        <li>Note current medications, vaccine due dates and any allergies.</li>
        <li>Find the nearest 24-hour emergency hospital to your new home before you move.</li>
        <li>Book a "meet the vet" wellness visit within the first month.</li>
      </ol>
    `),
    faq: H(`
      <h3>What does AAHA accreditation mean?</h3>
      <p>It means the hospital chose to be evaluated against the American Animal Hospital Association's standards for areas such as anesthesia, surgery, pain management and cleanliness, and passed.</p>
      <h3>Should I stay with one vet for life?</h3>
      <p>Consistency helps your vet spot changes over time, but it's fine to switch if the fit isn't right. Just make sure records follow your pet.</p>
    `),
  },
  "how-to-find-a-pet-sitter": {
    body: H(`
      <h2>Your pet care sheet template</h2>
      <p>Print this list, fill it in and leave it on the kitchen counter:</p>
      <ul>
        <li><strong>Pets:</strong> names, photos, ages, breeds and microchip numbers</li>
        <li><strong>Feeding:</strong> food brand, exact amount, times and where food is stored</li>
        <li><strong>Treats:</strong> what's allowed and how many</li>
        <li><strong>Medications:</strong> name, dose, time and how to give it</li>
        <li><strong>Walks and potty:</strong> schedule, leash and harness location, favorite route, behavior with other dogs</li>
        <li><strong>Litter:</strong> box locations and how often to scoop</li>
        <li><strong>Behavior notes:</strong> fears, hiding spots, escape artists, things they shouldn't chew</li>
        <li><strong>Home:</strong> alarm code, wifi, thermostat settings, trash day, which doors stay closed</li>
        <li><strong>Contacts:</strong> your phone, a local backup person, your vet and the nearest emergency hospital</li>
      </ul>
      <h2>Pet sitter vs. dog walker vs. house sitter</h2>
      <table>
        <thead><tr><th>Service</th><th>Best for</th></tr></thead>
        <tbody>
          <tr><td>Drop-in pet sitter</td><td>Cats and independent pets while you travel</td></tr>
          <tr><td>Overnight pet sitter</td><td>Dogs, anxious pets and multi-pet homes</td></tr>
          <tr><td>Dog walker</td><td>Midday exercise on workdays</td></tr>
          <tr><td>House sitter</td><td>Long trips where home care (mail, plants) matters too</td></tr>
        </tbody>
      </table>
      <h2>Special considerations for cats</h2>
      <p>Cats often seem fine alone, but they need daily checks. A sitter should confirm your cat is eating, drinking and using the litter box normally — changes can signal illness, especially in male cats, where straining to urinate is an emergency. Ask your sitter to send a photo of your cat at every visit, even if they're hiding under the bed.</p>
      <h2>Special considerations for dogs</h2>
      <ul>
        <li>Agree on the number and length of visits. Most adult dogs need at least three potty breaks a day.</li>
        <li>Share leash manners and any reactivity to other dogs, people or bikes.</li>
        <li>Decide whether the sitter may use dog parks — many owners say no while they're away.</li>
        <li>Confirm the sitter will never let your dog off-leash outside a fenced area.</li>
      </ul>
      <h2>Protecting your home</h2>
      <ul>
        <li>Use a lockbox or give a key that isn't labeled with your address.</li>
        <li>Create a temporary alarm or smart-lock code and delete it after the trip.</li>
        <li>Keep valuables and private documents put away.</li>
        <li>If you use indoor cameras, tell your sitter — it's courteous and legally required in some places.</li>
      </ul>
      <h2>After the first booking</h2>
      <p>Ask for a short report: how your pets ate, any issues and what supplies are running low. If everything went well, book the same sitter again — consistency helps your pets relax.</p>
    `),
    faq: H(`
      <h3>What's the difference between bonded and insured?</h3>
      <p>Insurance covers accidents and liability, such as an injury to your pet in their care. A bond protects you if the sitter steals from your home. Professional sitters often carry both.</p>
      <h3>How many visits a day does a cat need?</h3>
      <p>At least one, and two is better for food, water, litter and a health check.</p>
    `),
  },
  "how-often-should-you-bathe-your-dog": {
    body: H(`
      <h2>Choosing the right dog shampoo</h2>
      <ul>
        <li><strong>Everyday shampoo:</strong> gentle, soap-free formulas for routine baths.</li>
        <li><strong>Oatmeal or moisturizing shampoo:</strong> soothing for dry or mildly itchy skin.</li>
        <li><strong>De-shedding shampoo and conditioner:</strong> helps loosen undercoat on double-coated breeds.</li>
        <li><strong>Puppy shampoo:</strong> extra mild for young skin.</li>
        <li><strong>Medicated shampoo:</strong> for skin infections, yeast or allergies, used as your vet directs.</li>
      </ul>
      <p>Skip heavily fragranced products and essential oils, which can irritate skin. If you have cats in the home, avoid dog products that contain permethrin.</p>
      <h2>Bathing mistakes to avoid</h2>
      <ul>
        <li><strong>Water too hot.</strong> Dogs are more sensitive to heat than we are.</li>
        <li><strong>Getting water in the ears.</strong> Moisture can lead to ear infections. A cotton ball in each ear (removed afterward) helps.</li>
        <li><strong>Not rinsing enough.</strong> Leftover shampoo causes itching and flakes.</li>
        <li><strong>Leaving the undercoat damp.</strong> Trapped moisture can cause hot spots and odor.</li>
        <li><strong>Bathing after applying spot-on flea treatment.</strong> Most products need a couple of dry days first. Check your label, and read our <a href="/blog/flea-and-tick-prevention-guide">flea and tick guide</a>.</li>
      </ul>
      <h2>Drying your dog properly</h2>
      <ol>
        <li>Squeeze water from the coat with your hands before your dog shakes.</li>
        <li>Towel dry with an absorbent microfiber towel.</li>
        <li>Use a pet dryer or a human hairdryer on the cool setting, keeping it moving.</li>
        <li>Brush as you dry to separate fur and speed things up.</li>
        <li>Keep your dog warm and indoors until fully dry.</li>
      </ol>
      <h2>Helping a dog who hates baths</h2>
      <ul>
        <li>Practice getting in the empty tub with treats, no water.</li>
        <li>Use a handheld sprayer on low pressure instead of pouring water.</li>
        <li>Spread peanut butter (xylitol-free) on a lick mat stuck to the wall.</li>
        <li>Keep sessions short and end on a positive note.</li>
        <li>For big or very anxious dogs, a self-serve dog wash with raised tubs can be easier on both of you.</li>
      </ul>
      <h2>Seasonal bathing tips</h2>
      <p><strong>Summer:</strong> rinse off salt water, chlorine and sand after swims. <strong>Winter:</strong> bathe less often to avoid dry skin, and wipe paws to remove de-icing salt after walks. <strong>Spring and fall:</strong> schedule de-shedding baths during heavy shedding seasons.</p>
    `),
    faq: H(`
      <h3>Can I just rinse my dog with water?</h3>
      <p>Yes. A plain water rinse after a muddy walk or a swim is gentle and doesn't strip natural oils.</p>
      <h3>How often should I bathe a dog with allergies?</h3>
      <p>Some allergic dogs benefit from frequent medicated baths, sometimes weekly. Follow your vet's specific plan.</p>
    `),
  },
  "how-to-trim-dog-nails-at-home": {
    body: H(`
      <h2>Clippers vs. grinder: which should you choose?</h2>
      <table>
        <thead><tr><th></th><th>Clippers</th><th>Grinder</th></tr></thead>
        <tbody>
          <tr><td>Speed</td><td>Fast</td><td>Slower</td></tr>
          <tr><td>Finish</td><td>Can leave sharp edges</td><td>Smooth, rounded</td></tr>
          <tr><td>Risk of hitting the quick</td><td>Higher on dark nails</td><td>Lower, with gradual control</td></tr>
          <tr><td>Noise</td><td>Quiet click</td><td>Buzzing; needs desensitizing</td></tr>
          <tr><td>Best for</td><td>Calm dogs, quick touch-ups</td><td>Thick or dark nails, shortening the quick</td></tr>
        </tbody>
      </table>
      <p>Many owners use both: clip off the length, then grind to smooth.</p>
      <h2>How to shorten overgrown nails safely</h2>
      <p>When nails stay long, the quick grows longer too, so you can't cut nails short in one session. Instead, trim a tiny amount every five to seven days. Each trim encourages the quick to recede a little. Over several weeks, nails can return to a healthy length. Your vet can also trim very overgrown nails, sometimes with sedation if needed.</p>
      <h2>Holding positions that make it easier</h2>
      <ul>
        <li><strong>Small dogs:</strong> sit with your dog in your lap facing away, or on a towel on a table with someone holding them.</li>
        <li><strong>Large dogs:</strong> have your dog lie on their side on a mat, and work on the paws closest to the floor.</li>
        <li><strong>Back paws:</strong> lift the paw backward, like a farrier shoeing a horse, so your dog stays balanced.</li>
        <li><strong>Helper:</strong> a second person can feed treats or offer a lick mat while you trim.</li>
      </ul>
      <h2>Nail care for puppies</h2>
      <p>Start handling paws as soon as your puppy comes home. Trim just the sharp tips every week, even if they don't need much. You're building a lifelong habit — short, positive sessions now prevent fights later.</p>
      <h2>Nail care for senior dogs</h2>
      <p>Older dogs often walk less, so nails grow longer, and arthritis makes holding a paw uncomfortable. Use a comfortable lying position, keep sessions short and trim more frequently. Long nails can make it harder for seniors to grip floors, so consider rugs or non-slip runners at home.</p>
      <h2>Signs of a nail problem</h2>
      <p>See your vet if you notice swelling around a nail, limping, pus, a nail that is cracked to the quick, licking at one toe, or nails that suddenly become brittle or misshapen.</p>
    `),
    faq: H(`
      <h3>Why is my dog's nail bleeding a lot?</h3>
      <p>The quick has a good blood supply, so a cut quick can bleed more than expected. Apply styptic powder with firm pressure. Call your vet if it doesn't stop within several minutes.</p>
      <h3>Should I trim the fur between my dog's paw pads?</h3>
      <p>Long fur between the pads can cause slipping and collect ice and burrs. Trim it carefully with rounded-tip scissors or ask your groomer.</p>
    `),
  },
  "how-much-to-feed-a-dog": {
    body: H(`
      <h2>Worked example: feeding a 50 lb dog</h2>
      <ol>
        <li>Your dog's ideal weight is 50 lb (about 22.7 kg).</li>
        <li>From the chart, a moderately active, spayed or neutered adult needs about 1,160 calories a day.</li>
        <li>Your kibble provides 360 kcal per cup.</li>
        <li>1,160 ÷ 360 = about 3.2 cups per day.</li>
        <li>Subtract treats: if your dog gets about 100 calories of treats, reduce food to about 2.9 cups.</li>
        <li>Split into two meals of about 1.5 cups each.</li>
        <li>Weigh your dog in a month and adjust.</li>
      </ol>
      <h2>How life stage changes calorie needs</h2>
      <table>
        <thead><tr><th>Life stage</th><th>What changes</th></tr></thead>
        <tbody>
          <tr><td>Puppy</td><td>High needs for growth; multiple meals a day</td></tr>
          <tr><td>Adult</td><td>Stable needs based on activity</td></tr>
          <tr><td>Spayed or neutered adult</td><td>Often needs fewer calories than before surgery</td></tr>
          <tr><td>Senior</td><td>Usually needs fewer calories but high-quality protein to maintain muscle</td></tr>
          <tr><td>Working or very active dog</td><td>May need significantly more calories</td></tr>
        </tbody>
      </table>
      <h2>How to read a dog food label</h2>
      <ul>
        <li><strong>AAFCO statement:</strong> look for "complete and balanced" for your dog's life stage.</li>
        <li><strong>Calorie content:</strong> listed as kcal per kg and per cup or can.</li>
        <li><strong>Guaranteed analysis:</strong> minimum protein and fat, maximum fiber and moisture.</li>
        <li><strong>Ingredient list:</strong> ordered by weight before cooking — useful, but not the whole story.</li>
      </ul>
      <h2>Switching foods without an upset stomach</h2>
      <p>Change foods gradually over about a week:</p>
      <ul>
        <li><strong>Days 1–2:</strong> 25% new food, 75% old</li>
        <li><strong>Days 3–4:</strong> 50% new, 50% old</li>
        <li><strong>Days 5–6:</strong> 75% new, 25% old</li>
        <li><strong>Day 7:</strong> 100% new food</li>
      </ul>
      <p>Slow down if you notice loose stools.</p>
      <h2>Feeding mistakes to avoid</h2>
      <ul>
        <li>Using a scoop or mug instead of a real measuring cup</li>
        <li>Forgetting that every family member gives treats</li>
        <li>Feeding for the weight your dog is, not the weight they should be</li>
        <li>Adding toppers without reducing kibble</li>
        <li>Ignoring gradual weight gain until it's significant</li>
      </ul>
    `),
    faq: H(`
      <h3>Why is my dog always hungry?</h3>
      <p>Many dogs are food-motivated by nature. Try splitting meals, using puzzle feeders or adding low-calorie vegetables. If hunger is sudden or paired with weight loss or drinking more water, see your vet.</p>
      <h3>How much should a puppy eat?</h3>
      <p>Follow the puppy food label as a starting point and adjust to keep your puppy lean. Your vet can confirm your puppy is growing at a healthy rate.</p>
    `),
  },
};
