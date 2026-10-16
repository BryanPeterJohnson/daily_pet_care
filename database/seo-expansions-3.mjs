// Extra depth for articles in part 3.
const H = (s) => s.trim().replace(/\n\s+/g, "\n");

export const expansions3 = {
  "human-foods-dogs-can-eat": {
    body: H(`
      <h2>Quick reference: safe serving ideas</h2>
      <table>
        <thead><tr><th>Food</th><th>How to serve</th><th>Small dog (about 10 lb)</th><th>Large dog (about 70 lb)</th></tr></thead>
        <tbody>
          <tr><td>Carrots</td><td>Raw sticks or cooked coins</td><td>1–2 baby carrots</td><td>A small handful</td></tr>
          <tr><td>Blueberries</td><td>Fresh or frozen</td><td>A few berries</td><td>A small handful</td></tr>
          <tr><td>Apple</td><td>Thin slices, no core or seeds</td><td>1–2 thin slices</td><td>A few slices</td></tr>
          <tr><td>Cooked chicken</td><td>Plain, boneless, shredded</td><td>A tablespoon</td><td>A few tablespoons</td></tr>
          <tr><td>Plain pumpkin</td><td>100% canned pumpkin</td><td>About 1 teaspoon</td><td>About 1–2 tablespoons</td></tr>
          <tr><td>Peanut butter</td><td>Xylitol-free, unsalted</td><td>A small lick</td><td>About 1 teaspoon</td></tr>
        </tbody>
      </table>
      <p>These are treat-sized amounts, not meal replacements. Adjust for your dog's overall calories.</p>
      <h2>Healthy homemade dog treat ideas</h2>
      <ul>
        <li><strong>Frozen pumpkin cubes:</strong> spoon plain pumpkin into an ice-cube tray and freeze.</li>
        <li><strong>Frozen blueberries:</strong> a cooling summer snack.</li>
        <li><strong>Stuffed chew toy:</strong> mix a little plain yogurt or pumpkin with kibble, stuff a rubber toy and freeze.</li>
        <li><strong>Carrot "chews":</strong> large carrot pieces for supervised gnawing.</li>
        <li><strong>Chicken training bites:</strong> plain boiled chicken cut into pea-sized pieces.</li>
      </ul>
      <h2>Foods to feed with caution</h2>
      <ul>
        <li><strong>Dairy:</strong> many adult dogs digest lactose poorly. Small amounts only.</li>
        <li><strong>Fatty meats and skin:</strong> rich foods can trigger stomach upset or pancreatitis.</li>
        <li><strong>Salty snacks:</strong> chips and pretzels add sodium dogs don't need.</li>
        <li><strong>Corn:</strong> kernels off the cob are fine; the cob can cause intestinal blockages.</li>
        <li><strong>Nuts:</strong> high in fat, and some, like macadamias, are toxic. Skip them.</li>
        <li><strong>Raw meat and eggs:</strong> carry a risk of bacteria such as Salmonella for pets and people in the home.</li>
      </ul>
      <h2>Signs a new food doesn't agree with your dog</h2>
      <p>Watch for vomiting, diarrhea, gas, itching, ear infections or a loss of appetite after trying something new. Stop feeding it and call your vet if signs are severe or don't settle quickly.</p>
      <h2>Holiday table safety</h2>
      <p>Thanksgiving and other holidays bring a rush of tempting, risky food. Keep guests from slipping scraps, put trash out of reach, and avoid turkey skin, gravy, stuffing (often contains onions), cooked bones and desserts. Instead, set aside a small plate of plain turkey and green beans for your dog.</p>
    `),
    faq: H(`
      <h3>Can dogs eat bread?</h3>
      <p>Plain bread in small amounts is generally safe but offers little nutrition. Avoid raisin bread, garlic bread and raw dough.</p>
      <h3>Can dogs eat tuna?</h3>
      <p>An occasional small amount of plain canned tuna in water is usually fine, but it shouldn't be a regular treat because of mercury.</p>
    `),
  },
  "how-to-stop-puppy-biting": {
    body: H(`
      <h2>A sample daily routine that reduces biting</h2>
      <ul>
        <li><strong>Wake up:</strong> potty break, then breakfast in a puzzle feeder.</li>
        <li><strong>Short play and training:</strong> 5–10 minutes of tug with a toy and simple cues.</li>
        <li><strong>Nap:</strong> one to two hours in a crate or pen.</li>
        <li><strong>Potty, short walk or sniff time.</strong></li>
        <li><strong>Chew time:</strong> a stuffed rubber toy while you work.</li>
        <li><strong>Nap.</strong></li>
        <li><strong>Afternoon play and training.</strong></li>
        <li><strong>Evening wind-down:</strong> calm chews and handling practice before bed.</li>
      </ul>
      <p>Notice how often naps appear. "Witching hour" biting in the evening is often a sign your puppy needs more sleep, not more play.</p>
      <h2>Good toys for mouthy puppies</h2>
      <ul>
        <li><strong>Tug toys:</strong> long enough to keep teeth away from hands.</li>
        <li><strong>Rubber chew toys:</strong> stuff with food and freeze for teething relief.</li>
        <li><strong>Flirt poles:</strong> a toy on a rope that lets puppies chase without targeting feet.</li>
        <li><strong>Puzzle feeders:</strong> turn meals into brain work.</li>
        <li><strong>Frozen washcloth:</strong> soak, twist and freeze for sore gums (supervise).</li>
      </ul>
      <h2>Biting during specific situations</h2>
      <h3>Biting ankles while you walk</h3>
      <p>Stop moving and stand still. When your puppy disengages, reward them and redirect to a toy you drag along the floor. Keep a toy in your pocket for these moments.</p>
      <h3>Biting during petting</h3>
      <p>Some puppies get overstimulated. Keep petting short and calm, and pet the chest rather than the top of the head.</p>
      <h3>Biting the leash</h3>
      <p>Carry a tug toy on walks and swap it in. Some owners use a chain or cable leash section near the clip during this phase.</p>
      <h3>Biting during grooming or handling</h3>
      <p>Pair handling with a lick mat or treats, and practice in very short sessions. Our <a href="/blog/how-to-trim-dog-nails-at-home">nail trimming guide</a> shows how to build tolerance step by step.</p>
      <h2>Breed tendencies</h2>
      <p>Herding breeds such as Border Collies, Australian Shepherds and Corgis may nip at moving feet, while retrievers and other sporting breeds often love to carry and mouth objects. Give these instincts a legal outlet: chase games with toys for herders, fetch and carrying games for retrievers.</p>
      <h2>Finding a good trainer</h2>
      <p>Look for a trainer who uses positive reinforcement and avoids prong, choke and shock collars. Certifications such as CPDT-KA show a trainer has studied learning theory and behavior. Group puppy classes are a great value and help with safe socialization.</p>
    `),
    faq: H(`
      <h3>Is it OK to let my puppy mouth me gently?</h3>
      <p>Gentle mouthing while your puppy learns bite inhibition is normal. Over time, gradually raise the bar so even soft mouthing ends play, and teach your puppy to use toys instead.</p>
      <h3>Why does my puppy bite more at night?</h3>
      <p>Overtiredness. Many puppies get "zoomies" and nip more in the evening. An earlier nap or calm chew time usually helps.</p>
    `),
  },
  "cat-peeing-outside-litter-box": {
    body: H(`
      <h2>A step-by-step plan to fix it</h2>
      <ol>
        <li><strong>Book a vet visit</strong> and bring a fresh urine sample if your vet asks.</li>
        <li><strong>Clean every soiled spot</strong> with an enzymatic cleaner. A blacklight can help you find old stains.</li>
        <li><strong>Add boxes</strong> to meet the "one per cat plus one" guideline, in different rooms.</li>
        <li><strong>Offer a litter "buffet":</strong> put two boxes side by side with different litters to learn your cat's preference.</li>
        <li><strong>Scoop daily</strong> and do a full change regularly.</li>
        <li><strong>Reduce stress:</strong> daily play, a predictable schedule, cat trees and safe hiding places.</li>
        <li><strong>Track progress</strong> in a simple log: date, location and what changed.</li>
      </ol>
      <h2>Multi-cat homes</h2>
      <p>Tension between cats is a leading cause of house soiling. Subtle signs include one cat blocking a doorway, staring, or waiting near the litter box. To help:</p>
      <ul>
        <li>Spread resources — food, water, beds, scratching posts and litter boxes — across the home so no cat can control them.</li>
        <li>Provide multiple routes in and out of each room.</li>
        <li>Add vertical space so cats can share a room at different heights.</li>
        <li>Separate cats and reintroduce them gradually if fights occur.</li>
      </ul>
      <h2>Senior cats and litter boxes</h2>
      <p>Older cats often have arthritis, even if they don't limp. Choose boxes with a low entry (or cut one into a storage tub), place boxes on every floor of the home, add night lights, and keep paths clear. Increased thirst or urination in a senior cat is a reason for bloodwork, since kidney disease, diabetes and hyperthyroidism are common.</p>
      <h2>Litter box setup checklist</h2>
      <ul>
        <li>Enough boxes for the number of cats</li>
        <li>Large, uncovered boxes</li>
        <li>Unscented, clumping litter about 2 inches deep</li>
        <li>Quiet locations with escape routes</li>
        <li>Away from food and water</li>
        <li>Scooped at least once a day</li>
      </ul>
      <h2>What not to do</h2>
      <ul>
        <li>Don't punish or rub your cat's nose in urine — it increases fear and stress.</li>
        <li>Don't move all the boxes at once.</li>
        <li>Don't switch to a scented litter to cover odor.</li>
        <li>Don't assume it's behavioral before your vet has checked for medical causes.</li>
      </ul>
    `),
    faq: H(`
      <h3>Can a new litter brand cause problems?</h3>
      <p>Yes. Cats can be very particular about texture and scent. Introduce a new litter gradually by mixing it with the old one, or offer it in a separate box.</p>
      <h3>Will getting another cat fix the problem?</h3>
      <p>Usually not. Adding a cat often increases stress and competition for resources, which can make house soiling worse.</p>
    `),
  },
  "dog-fireworks-anxiety": {
    body: H(`
      <h2>Your fireworks-night checklist</h2>
      <ul>
        <li>ID tag on, with a current phone number</li>
        <li>Microchip registration checked</li>
        <li>Recent photo of your dog saved on your phone</li>
        <li>Safe room or covered crate ready</li>
        <li>White noise or music set up</li>
        <li>Long-lasting chews or frozen food toys prepared</li>
        <li>Walk and dinner done before dark</li>
        <li>Windows, doors and gates secured</li>
        <li>Guests reminded to keep doors closed</li>
        <li>Any vet-prescribed medication given on schedule</li>
        <li>Emergency vet's number saved</li>
      </ul>
      <h2>Building a long-term plan</h2>
      <p>Noise fear often gets worse each year without help. The most effective long-term approach combines:</p>
      <ol>
        <li><strong>Desensitization:</strong> very quiet recordings of fireworks or thunder, increased slowly over weeks.</li>
        <li><strong>Counter-conditioning:</strong> pairing the sounds with something your dog loves, like special treats or play.</li>
        <li><strong>Management:</strong> reducing exposure on big nights so your dog isn't overwhelmed.</li>
        <li><strong>Medication when needed:</strong> some dogs need prescription help to feel safe enough to learn.</li>
      </ol>
      <p>A veterinary behaviorist or certified trainer can create a plan for severe cases.</p>
      <h2>Thunderstorms and other loud noises</h2>
      <p>Many dogs who fear fireworks also fear thunderstorms, construction noise or gunshots. The same strategies help, and storm season is a good time to practice your safe-space routine. Some dogs also react to the pressure changes and static before a storm, so start your calming routine early.</p>
      <h2>Cats and fireworks</h2>
      <p>Cats are often frightened by fireworks too. Keep them indoors, close windows, and make sure they have hiding places like covered beds, boxes or space under furniture. Don't pull a hiding cat out — let them come out when they're ready.</p>
      <h2>Traveling for the holiday?</h2>
      <p>If you'll be away, leave your sitter or boarding facility clear instructions about your dog's fears and medications. Many boarding facilities have quieter areas for noise-sensitive dogs. See our <a href="/blog/dog-boarding-cost">boarding guide</a> for questions to ask.</p>
    `),
    faq: H(`
      <h3>Can I give my dog Benadryl for fireworks?</h3>
      <p>Don't give any human medication without talking to your vet first. Your vet can recommend safe, effective options and the right dose for your dog.</p>
      <h3>How long does fireworks anxiety last after the event?</h3>
      <p>Some dogs bounce back within hours; others stay jumpy for a day or more. If fear lasts or gets worse, talk to your vet.</p>
    `),
  },
  "flea-and-tick-prevention-guide": {
    body: H(`
      <h2>Comparing prevention options</h2>
      <table>
        <thead><tr><th>Type</th><th>Typical duration</th><th>Pros</th><th>Considerations</th></tr></thead>
        <tbody>
          <tr><td>Oral chew</td><td>1–3 months</td><td>No residue, can't wash off</td><td>Some pets refuse chews; discuss seizure history with your vet</td></tr>
          <tr><td>Topical spot-on</td><td>About 1 month</td><td>Some repel ticks</td><td>Avoid baths around application; keep cats away from dog products</td></tr>
          <tr><td>Collar</td><td>Several months</td><td>Long-lasting, low effort</td><td>Must fit well; watch for skin irritation</td></tr>
          <tr><td>Shampoo or spray</td><td>Short-term</td><td>Quick knockdown of live fleas</td><td>No lasting protection</td></tr>
        </tbody>
      </table>
      <h2>Regional risks in the U.S.</h2>
      <ul>
        <li><strong>Northeast and Upper Midwest:</strong> high risk of Lyme disease carried by deer ticks.</li>
        <li><strong>Southeast and Gulf Coast:</strong> warm, humid weather keeps fleas, ticks and mosquitoes active most of the year; heartworm is common.</li>
        <li><strong>South Central states:</strong> several tick-borne diseases, including ehrlichiosis and Rocky Mountain spotted fever.</li>
        <li><strong>West Coast:</strong> ticks in grassy and wooded areas; fleas thrive in mild climates.</li>
      </ul>
      <p>Disease maps change as ticks spread. Your vet knows the local risks and can tailor prevention.</p>
      <h2>Signs your pet has fleas</h2>
      <ul>
        <li>Scratching, chewing or licking, especially near the tail base</li>
        <li>Hair loss or scabs on the lower back</li>
        <li>"Flea dirt": black specks that turn red on a damp paper towel</li>
        <li>Tapeworm segments that look like rice grains near the tail</li>
        <li>Itchy bites on people in the home</li>
      </ul>
      <h2>Protecting your yard</h2>
      <ul>
        <li>Keep grass short and remove leaf litter.</li>
        <li>Create a gravel or wood-chip border between lawn and wooded areas.</li>
        <li>Discourage wildlife such as deer, raccoons and feral cats, which carry fleas and ticks.</li>
        <li>Use pet-safe yard treatments only, and keep pets off treated areas as directed.</li>
      </ul>
      <h2>Mistakes to avoid</h2>
      <ul>
        <li>Stopping prevention in winter in regions where parasites stay active</li>
        <li>Treating only one pet in a multi-pet home</li>
        <li>Using the wrong weight range or splitting doses</li>
        <li>Combining products without your vet's advice</li>
        <li>Buying deeply discounted products from unverified sellers</li>
      </ul>
    `),
    faq: H(`
      <h3>How soon do flea treatments work?</h3>
      <p>Many modern products start killing fleas within hours. You may still see fleas for a few weeks as new ones hatch from your home and die after contact with your treated pet.</p>
      <h3>Can people get Lyme disease from their dog?</h3>
      <p>Not directly, but dogs can bring ticks into the home. Check pets and family members after time outdoors.</p>
    `),
  },
};
