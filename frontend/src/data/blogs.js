import { moreBlogs } from "./moreBlogs";

/**
 * Blog data for Arjun Buildtech
 *
 * Fields used by BlogDetailsPage / blog listing:
 *  - id          unique number
 *  - slug        URL slug (never change after publishing; it is the indexed URL)
 *  - title       keep under ~60 characters, primary keyword near the start
 *  - date        ISO format "YYYY-MM-DD" (safe for schema + sorting)
 *  - updatedAt   OPTIONAL "YYYY-MM-DD". Add it only when you genuinely update a post.
 *  - author      OPTIONAL real person's name (shows as a Person in schema, good for E-E-A-T)
 *  - category    used for related posts
 *  - excerpt     meta description, aim for 120-160 characters
 *  - content     HTML. Start with <h2> (the page title is the only <h1>)
 *  - image       absolute URL (or a path under /public)
 */

const INVEST_NOTE = `<p><em>Note: This article is for general information and is not investment, legal or tax advice. Past price growth does not guarantee future returns. Verify documents and current rules before you buy.</em></p>`;

const CTA = `<p>Need help with a property in Rohtak? <a href="/contact">Talk to the Arjun Buildtech team</a> for verified listings and end-to-end documentation support.</p>`;

const allBlogs = [
  {
    id: 1,
    slug: "rohtak-infrastructure-updates-2026",
    title: "New Infrastructure Projects Announced for Rohtak, Haryana",
    date: "2026-10-05",
    category: "Market News",
    excerpt:
      "Haryana's 2026–27 budget proposes road, utility and commercial projects in Rohtak. Here's what they could mean for HSVP sector property prices.",
    content: `
      <h2>Infrastructure plans for Rohtak in the 2026–27 state budget</h2>
      <p>The Haryana Government's 2026–27 budget places fresh emphasis on road connectivity and utility upgrades in Rohtak, particularly in the newly developing HSVP sectors.</p>

      <h3>Key highlights</h3>
      <ul>
        <li><strong>Road connectivity:</strong> Multi-lane bypass work is planned to ease traffic in the city centre and improve access to Sector 27 and Suncity.</li>
        <li><strong>Utility upgrades:</strong> Better water treatment and underground cabling are planned across major residential zones.</li>
        <li><strong>Commercial hubs:</strong> New commercial and IT park projects are proposed near the Rohtak–Delhi bypass.</li>
      </ul>

      <h3>What it could mean for property buyers</h3>
      <p>Better roads and utilities usually improve day-to-day livability, and that tends to raise demand for residential plots and villas in the affected sectors. Buyers from Delhi NCR are already comparing Rohtak with costlier nearby markets.</p>
      <p>Project timelines can change, so check official announcements for status before making a decision. For background on the market, read our <a href="/blog/why-invest-in-rohtak-real-estate">5 reasons Rohtak is the next real estate hub</a> and the <a href="/blog/top-sectors-for-investment-rohtak">top sectors to invest in</a>.</p>
      ${CTA}
    `,
    // TODO: replace this image with a Rohtak photo; this Wikimedia image shows a location in Mathura, UP
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8b/Kusum_Sarovar_-Mathura_-Uttar_Pradesh_-PXL_20210217111946742.jpg",
  },
  {
    id: 2,
    slug: "suncity-sector-appreciation",
    title: "Suncity Rohtak Sectors 34–36A: 15% Price Growth",
    date: "2026-09-28",
    category: "Investment Guide",
    excerpt:
      "Plots and villas in Suncity Sectors 34, 35, 36 and 36A saw about 15% appreciation last quarter, based on Arjun Buildtech's transaction data.",
    content: `
      <h2>Why Suncity is drawing buyers in Rohtak</h2>
      <p>Over the last quarter, Suncity's Sectors 34, 35, 36 and 36A recorded roughly 15% appreciation in property values, based on Arjun Buildtech's own tracking of deals and enquiries.</p>

      <h3>What is driving demand</h3>
      <p>Families and investors want secure, modern and well-planned living environments. Suncity offers:</p>
      <ul>
        <li>Gated security</li>
        <li>Parks and community spaces</li>
        <li>Access to good schools and hospitals</li>
      </ul>

      <h3>Investment outlook</h3>
      <p>Limited premium plots and steady interest from buyers leaving congested metro areas support demand. Even so, prices can move both ways, so compare recent registry values, check plot facing and size, and verify all documents before buying. If you are weighing a villa against a plot here, read our <a href="/blog/luxury-villas-vs-plots">villa vs plot comparison</a>.</p>
      ${INVEST_NOTE}
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 3,
    slug: "property-registration-guidelines-egras",
    title: "E-GRAS Property Registration Guidelines in Haryana",
    date: "2026-09-12",
    category: "Policy Update",
    excerpt:
      "Haryana's e-GRAS portal has simplified online stamp duty payment. Here is what you need ready before you register a property in Rohtak.",
    content: `
      <h2>Online stamp duty and registration in Haryana</h2>
      <p>Haryana has moved much of the property registration process online. Paying stamp duty through the e-GRAS portal and keeping your documents ready can make registration at the Tehsil faster and more transparent.</p>

      <h3>What to keep ready</h3>
      <ul>
        <li><strong>Property ID:</strong> Urban property transactions in Haryana generally require a valid Property ID, which is linked to the municipal property tax record.</li>
        <li><strong>Stamp duty payment:</strong> Pay stamp duty and registration fees online via e-GRAS and keep the challan for your Tehsil appointment.</li>
        <li><strong>No Dues Certificate (NDC):</strong> The municipal corporation issues NDCs online, which saves time compared with the old paper process.</li>
        <li><strong>Identity and photographs:</strong> Buyers, sellers and witnesses need valid ID proofs.</li>
      </ul>

      <p>Rules and portal steps change from time to time, so confirm the current process with the sub-registrar's office. To estimate your costs first, see our guide to <a href="/blog/understanding-property-taxes-haryana">stamp duty and registration charges in Haryana</a>.</p>
      <p>Arjun Buildtech's team helps clients with end-to-end documentation so the registry is completed smoothly.</p>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    slug: "why-invest-in-rohtak-real-estate",
    title: "5 Reasons Rohtak Is the Next Big Real Estate Hub",
    date: "2026-08-20",
    category: "Market Insights",
    excerpt:
      "From Delhi connectivity to MDU and IMT Rohtak, here are five reasons investors from Delhi NCR are looking at Rohtak real estate.",
    content: `
      <h2>Rohtak: a rising real estate market in Haryana</h2>
      <p>Once known mainly as an educational hub, Rohtak is becoming a serious real estate destination. Here are five reasons investors are paying attention:</p>

      <ol>
        <li><strong>Proximity to Delhi:</strong> Highway upgrades on the Delhi–Rohtak corridor have cut travel time and make Rohtak a practical satellite city.</li>
        <li><strong>Education hub:</strong> Maharshi Dayanand University (MDU) and PGIMS draw students and professionals, which supports steady rental demand.</li>
        <li><strong>Value compared with NCR:</strong> Plots and villas in Rohtak are generally priced well below Gurugram or Noida.</li>
        <li><strong>HSVP planning:</strong> Haryana Shahari Vikas Pradhikaran (HSVP) sectors offer planned layouts, wide roads and underground services.</li>
        <li><strong>Industrial growth:</strong> IMT Rohtak (Industrial Model Township) creates jobs, which in turn drives housing demand.</li>
      </ol>

      <p>Ready to look at options? Start with our <a href="/blog/top-sectors-for-investment-rohtak">top sectors for investment</a> and the <a href="/blog/guide-to-buying-hsvp-plots">guide to buying HSVP plots</a>.</p>
      ${INVEST_NOTE}
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80",
  },
  {
    id: 5,
    slug: "guide-to-buying-hsvp-plots",
    title: "How to Buy HSVP Plots in Rohtak: A Complete Guide",
    date: "2026-08-05",
    category: "Buying Guide",
    excerpt:
      "Buying an HSVP plot in Rohtak? Learn how to verify allotment papers, clear dues and complete the transfer safely.",
    content: `
      <h2>Buying an HSVP plot safely</h2>
      <p>HSVP (Haryana Shahari Vikas Pradhikaran, formerly HUDA) sectors are popular because of planned layouts, wide roads and government-developed infrastructure. A resale purchase still needs careful checking.</p>

      <h3>Steps to a secure purchase</h3>
      <ol>
        <li><strong>Verify the papers:</strong> Check the original allotment or transfer letter and match the owner's name, plot number and sector.</li>
        <li><strong>Check dues:</strong> Confirm with the Estate Office that enhancement, extension and any other fees are cleared.</li>
        <li><strong>Inspect the plot:</strong> Visit the site, confirm boundaries and possession, and check for encroachment.</li>
        <li><strong>Complete the transfer formalities:</strong> Follow HSVP's transfer process and obtain the required NDC before the registry.</li>
        <li><strong>Register the deed:</strong> Pay stamp duty and registration charges and register at the Tehsil. See our <a href="/blog/understanding-property-taxes-haryana">cost breakdown</a>.</li>
      </ol>

      <p>Sectors 1, 2, 3, 25 and 27 are among the more active HSVP sectors in Rohtak. Arjun Buildtech handles verified HSVP plot transactions with transparent documentation.</p>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
  },
  {
    id: 6,
    slug: "commercial-property-trends-2026",
    title: "Rohtak Commercial Property Trends for Late 2026",
    date: "2026-07-18",
    category: "Commercial",
    excerpt:
      "High-street shops, warehousing and co-working are shaping Rohtak's commercial market. See the trends investors are watching in late 2026.",
    content: `
      <h2>What is changing in Rohtak's commercial market</h2>
      <p>As shopping habits change and the local economy diversifies, demand is shifting toward specific kinds of commercial property.</p>

      <h3>Key trends</h3>
      <ul>
        <li><strong>High-street retail:</strong> Many investors prefer shops and SCOs in established sectors over enclosed malls because of steady footfall and lower maintenance costs.</li>
        <li><strong>Warehousing:</strong> E-commerce growth is increasing demand for storage and logistics plots around IMT Rohtak.</li>
        <li><strong>Co-working spaces:</strong> Smaller offices are being converted into co-working hubs for freelancers and small businesses.</li>
      </ul>

      <p>Commercial returns depend heavily on location, frontage, tenant quality and lease terms. For a closer look at one of the main retail hubs, read <a href="/blog/commercial-shops-sector-14-rohtak">commercial shops in Sector 14</a>.</p>
      ${INVEST_NOTE}
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
  },
  {
    id: 7,
    slug: "tips-for-selling-your-property-fast",
    title: "7 Tips to Sell Your Property Fast in Rohtak",
    date: "2026-07-02",
    category: "Selling Guide",
    excerpt:
      "Want to sell your plot or villa in Rohtak? These seven practical tips help you price right, attract serious buyers and close faster.",
    content: `
      <h2>How to sell quickly and get a fair price</h2>
      <p>Selling can take months if the price, paperwork or presentation is off. These steps help you attract serious buyers sooner.</p>

      <h3>Seven tips from Arjun Buildtech</h3>
      <ol>
        <li><strong>Price it right:</strong> Overpricing is the most common reason properties sit unsold. Get a realistic valuation first. See <a href="/blog/property-valuation-rohtak">how property valuation works</a>.</li>
        <li><strong>Improve curb appeal:</strong> For villas, repaint the exterior and tidy the garden. For plots, clear debris and overgrowth.</li>
        <li><strong>Keep documents ready:</strong> Have the registry, latest tax receipts, Property ID and NDC available for serious buyers.</li>
        <li><strong>Use good photos:</strong> Clear, bright photos increase online enquiries.</li>
        <li><strong>Highlight location benefits:</strong> Mention schools, hospitals, markets and highway access.</li>
        <li><strong>Be flexible with viewings:</strong> Allow visits on weekends and evenings.</li>
        <li><strong>Work with a local expert:</strong> A local agency has buyers already looking for properties in your sector.</li>
      </ol>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1296&q=80",
  },
  {
    id: 8,
    slug: "understanding-property-taxes-haryana",
    title: "Stamp Duty and Registration Charges in Haryana 2026",
    date: "2026-06-15",
    category: "Financial Insights",
    excerpt:
      "Current stamp duty for male, female and joint buyers in urban Haryana, plus registration fee rules and a worked cost example.",
    content: `
      <h2>What it costs to register a property in Haryana</h2>
      <p>The purchase price is only part of your budget. Buyers also pay stamp duty and a registration fee. The rates below are commonly reported for 2026, but they can change, so confirm them with the sub-registrar or the official notification before you register.</p>

      <h3>Stamp duty (municipal / urban areas)</h3>
      <ul>
        <li><strong>Male buyer:</strong> 7% of the transaction value</li>
        <li><strong>Female buyer:</strong> 5% of the transaction value</li>
        <li><strong>Joint (male and female):</strong> 6% of the transaction value</li>
      </ul>
      <p>Rural areas carry lower rates.</p>

      <h3>Registration fee</h3>
      <p>The registration fee is generally 1% of the property value, subject to a cap of ₹50,000. Small additional charges such as e-registration and pasting fees also apply.</p>

      <h3>Worked example</h3>
      <p>For a ₹40 lakh property, a male buyer pays about ₹2.8 lakh in stamp duty plus ₹40,000 in registration fee, roughly ₹3.2 lakh in total. A female buyer pays about ₹2 lakh plus ₹40,000, roughly ₹2.4 lakh. On an ₹80 lakh property, the 1% fee would be ₹80,000, but the cap limits it to ₹50,000.</p>

      <h3>Which value is used?</h3>
      <p>Duty is calculated on the higher of the actual sale price or the collector (circle) rate. Always register at the correct value to avoid legal and tax problems later.</p>
      <p>Also read: <a href="/blog/property-registration-guidelines-egras">E-GRAS registration guidelines</a> and <a href="/blog/rohtak-property-tax-online-payment">Rohtak property tax online payment</a>.</p>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1311&q=80",
  },
  {
    id: 9,
    slug: "luxury-villas-vs-plots",
    title: "Villa vs Plot in Rohtak: Which Investment Is Better?",
    date: "2026-06-01",
    category: "Investment Guide",
    excerpt:
      "Ready-built villa or open plot? Compare appreciation, cost, rental income and effort to decide which suits your goals in Rohtak.",
    content: `
      <h2>Choosing between a villa and a plot</h2>
      <p>One of the most common questions we hear at Arjun Buildtech is whether to buy a residential plot or a ready-built luxury villa. Both have clear advantages.</p>

      <h3>Residential plots</h3>
      <p><strong>Pros:</strong> Lower entry cost, freedom to design your own home, and potential for strong land appreciation.<br>
      <strong>Cons:</strong> Construction takes time, money and supervision, and a vacant plot earns no rent.</p>

      <h3>Luxury villas</h3>
      <p><strong>Pros:</strong> Immediate possession, no construction hassle, rental potential from day one, and access to ready amenities.<br>
      <strong>Cons:</strong> Higher upfront capital and limited scope to change the core structure.</p>

      <h3>Which one fits you?</h3>
      <p>If you want long-term land appreciation and are willing to build, a plot in an HSVP sector such as Sector 27 may suit you. If you want a ready premium home, a villa in <a href="/blog/suncity-sector-appreciation">Suncity</a> is worth considering.</p>
      ${INVEST_NOTE}
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1175&q=80",
  },
  {
    id: 10,
    slug: "nri-property-investment-india",
    title: "NRI Guide to Buying Property in Rohtak",
    date: "2026-05-22",
    category: "NRI Services",
    excerpt:
      "NRIs can buy residential and commercial property in India under FEMA. Learn the rules, payment channels and limits for investing in Rohtak.",
    content: `
      <h2>NRI investment in Indian real estate</h2>
      <p>Many Non-Resident Indians are looking at tier-2 cities like Rohtak for growth potential and ties to their hometown.</p>

      <h3>FEMA rules in brief</h3>
      <p>Under the Foreign Exchange Management Act (FEMA), NRIs can buy residential and commercial property in India. They cannot buy agricultural land, plantation property or farmhouses.</p>

      <h3>Payment and funding</h3>
      <p>Payments must go through normal banking channels from an NRE, NRO or FCNR(B) account. Indian banks also offer home loans to NRIs.</p>

      <h3>Before you invest</h3>
      <ul>
        <li>Verify title and dues through a trusted local representative or lawyer.</li>
        <li>If you use a power of attorney, keep it limited and properly registered.</li>
        <li>Check tax and repatriation rules with a chartered accountant, since they depend on your situation.</li>
      </ul>

      <p>Arjun Buildtech offers property consulting and management support for NRIs so that purchases are verified and well looked after while you are abroad.</p>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80",
  },
  {
    id: 11,
    slug: "top-5-mistakes-first-time-buyers",
    title: "5 Mistakes First-Time Home Buyers Make in Rohtak",
    date: "2026-05-10",
    category: "Buying Guide",
    excerpt:
      "Skipping title checks and ignoring hidden costs are common errors. Learn the five mistakes first-time buyers should avoid in Rohtak.",
    content: `
      <h2>Common first-time buyer mistakes</h2>
      <p>Buying your first property is exciting but can be overwhelming. Avoid these five mistakes:</p>

      <ol>
        <li><strong>Skipping the title search:</strong> Have a lawyer verify the chain of title and confirm there are no loans, disputes or encumbrances.</li>
        <li><strong>Ignoring hidden costs:</strong> Budget for stamp duty, registration, brokerage and maintenance deposits, not just the price. See <a href="/blog/understanding-property-taxes-haryana">stamp duty and registration charges</a>.</li>
        <li><strong>Not checking RERA registration:</strong> For under-construction projects, confirm the project is registered with HRERA (Haryana Real Estate Regulatory Authority).</li>
        <li><strong>Buying on emotion:</strong> Make sure the property fits your budget, commute and long-term needs.</li>
        <li><strong>Skipping professional help:</strong> Saving on agent fees can cost far more if you buy a disputed property. Work with a registered, reputed consultant. Here is <a href="/blog/best-real-estate-broker-in-rohtak">how to choose one</a>.</li>
      </ol>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 12,
    slug: "future-of-rohtak-real-estate",
    title: "Rohtak Real Estate Outlook 2026–2030",
    date: "2026-04-28",
    category: "Market Insights",
    excerpt:
      "Where could Rohtak real estate be heading by 2030? A look at NCR integration, IMT expansion and smart-city plans, without the hype.",
    content: `
      <h2>Looking ahead: 2026 to 2030</h2>
      <p>As Rohtak integrates more closely with the National Capital Region (NCR), several trends could shape its property market over the next five years. No one can predict prices exactly, but these factors are worth watching.</p>

      <h3>Smart city and civic upgrades</h3>
      <p>Digital municipal services, better waste management and improved public transport can raise a city's livability, which supports housing demand.</p>

      <h3>IMT expansion</h3>
      <p>Growth of the Industrial Model Township can bring more jobs to the region, creating demand for quality housing and rentals.</p>

      <h3>Connectivity</h3>
      <p>Better highways and rail links to Delhi make Rohtak more attractive to people who want NCR access at lower property prices.</p>

      <h3>How to plan</h3>
      <p>Focus on well-planned sectors with clear titles, compare recent registry values rather than asking prices, and invest with a time horizon of several years. For current picks, see <a href="/blog/top-sectors-for-investment-rohtak">top sectors to invest in</a>.</p>
      ${INVEST_NOTE}
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 13,
    slug: "3-bhk-flats-in-rohtak",
    title: "3 BHK Flats in Rohtak: Best Areas and Buying Guide",
    date: "2026-04-15",
    category: "Buying Guide",
    excerpt:
      "Compare the best areas for 3 BHK flats in Rohtak and learn what to check before you buy: RERA, carpet area, parking and more.",
    content: `
      <h2>Why 3 BHK flats are in demand</h2>
      <p>As more professionals move to Rohtak for work in IMT and nearby institutions, demand for <strong>3 BHK flats in Rohtak</strong> has grown. They offer a good balance of space, cost and community amenities.</p>

      <h3>Areas to consider</h3>
      <ul>
        <li><strong>Sector 14 and Sector 1:</strong> Established sectors with builder floors and apartments.</li>
        <li><strong>Omaxe City and Suncity:</strong> Gated townships with clubhouse and recreation facilities.</li>
        <li><strong>Sector 27:</strong> A developing area with good access to the highway.</li>
      </ul>

      <h3>Checks before you buy</h3>
      <ul>
        <li>Confirm HRERA registration for under-construction projects.</li>
        <li>Compare carpet area, not just super built-up area.</li>
        <li>Check parking, water supply, power backup and maintenance charges.</li>
        <li>Verify the occupancy or completion certificate for ready flats.</li>
      </ul>

      <p>Not sure whether a flat or an independent floor suits you? Read <a href="/blog/builder-floors-vs-high-rise">builder floors vs high-rise apartments</a>.</p>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 14,
    slug: "agricultural-land-for-sale-rohtak",
    title: "Agricultural Land in Rohtak: Is It a Smart Investment?",
    date: "2026-04-02",
    category: "Investment Guide",
    excerpt:
      "Farmland around Rohtak is drawing investors as the city grows. Understand the opportunity, the risks and the legal checks first.",
    content: `
      <h2>The case for land investment</h2>
      <p>Alongside residential and commercial property, <strong>agricultural land for sale in Rohtak</strong> and nearby villages attracts long-term investors who expect the city to expand.</p>

      <h3>Why investors look at agricultural land</h3>
      <p>New highways and city expansion can change land use over time, and land near growing corridors often becomes more valuable. Land, however, can be illiquid and may take years to appreciate, so it suits patient investors.</p>

      <h3>Legal checks</h3>
      <ul>
        <li>Haryana generally allows non-agriculturists to buy agricultural land.</li>
        <li>Verify ownership through the latest Jamabandi and mutation (intkal) records.</li>
        <li>Check for disputes, mortgages or acquisition notices on the land.</li>
        <li>Any commercial or residential use needs a Change of Land Use (CLU) permission and the relevant approvals.</li>
      </ul>

      <p>Arjun Buildtech assists with land verification, paperwork and CLU guidance. NRIs should note that they cannot buy agricultural land; see our <a href="/blog/nri-property-investment-india">NRI guide</a>.</p>
      ${INVEST_NOTE}
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
  },
  {
    id: 15,
    slug: "best-real-estate-broker-in-rohtak",
    title: "How to Choose the Best Real Estate Broker in Rohtak",
    date: "2026-03-20",
    category: "Buying Guide",
    excerpt:
      "Choosing the wrong broker can cost lakhs. Here is how to check HRERA registration, local expertise and service quality in Rohtak.",
    content: `
      <h2>Why your choice of consultant matters</h2>
      <p>The market has many unverified agents. Choosing the <strong>best real estate broker in Rohtak</strong> helps keep your transaction legally sound and financially fair.</p>

      <h3>What to look for</h3>
      <ol>
        <li><strong>HRERA registration:</strong> Real estate agents in Haryana are required to be registered with the Haryana Real Estate Regulatory Authority. Ask for the number and verify it.</li>
        <li><strong>Local expertise:</strong> A good broker knows sector-wise pricing in HSVP areas and private townships.</li>
        <li><strong>End-to-end service:</strong> Look for help with property search, legal checks, loans and Tehsil registration.</li>
        <li><strong>Transparency:</strong> Brokerage terms should be clear and in writing.</li>
        <li><strong>Track record:</strong> Ask for references from recent clients.</li>
      </ol>

      <p>At <strong>Arjun Buildtech</strong> we focus on transparent dealings and verified listings. Read about the <a href="/blog/top-5-mistakes-first-time-buyers">mistakes first-time buyers make</a> before you start your search.</p>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80",
  },
  {
    id: 16,
    slug: "commercial-shops-sector-14-rohtak",
    title: "Commercial Shops in Sector 14 Rohtak: Investment Guide",
    date: "2026-03-05",
    category: "Commercial",
    excerpt:
      "Sector 14 is Rohtak's main commercial hub. Learn what drives shop demand and rents there, and what to check before you invest.",
    content: `
      <h2>Sector 14: the heart of Rohtak's retail</h2>
      <p>Investors who want rental income often look at <strong>commercial shops in Sector 14 Rohtak</strong>. The sector is fully developed and remains one of the city's main shopping and dining destinations.</p>

      <h3>Why Sector 14 attracts tenants</h3>
      <p>Consistent footfall appeals to banks, retail brands and restaurants. Shops on main roads or in busy market clusters tend to see stronger demand.</p>

      <h3>Returns: what to expect</h3>
      <p>Rental yields differ widely by shop size, floor, frontage and tenant. Commercial yields in tier-2 cities are usually in the mid single digits, with appreciation depending on the market. Check actual lease rents in the same lane and compare them with the price per square foot before you invest.</p>

      <h3>Checklist</h3>
      <ul>
        <li>Verify ownership and approved use of the shop.</li>
        <li>Check existing tenancy and lease terms.</li>
        <li>Review parking and access.</li>
      </ul>
      <p>See also our overview of <a href="/blog/commercial-property-trends-2026">commercial property trends</a>.</p>
      ${INVEST_NOTE}
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1582062547070-5899981beeb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 17,
    slug: "affordable-housing-projects-rohtak",
    title: "DDJAY Affordable Housing and Plots in Rohtak",
    date: "2026-02-18",
    category: "Policy Update",
    excerpt:
      "How DDJAY plotted housing works in Haryana, who it suits, and what to verify before buying an affordable plot near Rohtak.",
    content: `
      <h2>Affordable plotted housing under DDJAY</h2>
      <p>The Haryana Government's Deen Dayal Jan Awas Yojana (DDJAY) promotes affordable, plotted colonies. For buyers looking at <strong>affordable housing projects in Rohtak</strong>, it created a budget-friendly route to owning a plot.</p>

      <h3>Features of DDJAY colonies</h3>
      <ul>
        <li><strong>Smaller plots:</strong> Plot sizes are capped at modest sizes, which keeps entry costs lower.</li>
        <li><strong>Floor-wise registry:</strong> The policy allows separate registration of floors, depending on the approved building plan.</li>
        <li><strong>Bank finance:</strong> Plots and floors in approved colonies are generally eligible for home loans, subject to bank policy.</li>
      </ul>

      <h3>What to verify</h3>
      <ul>
        <li>The colony has a valid licence from the Town and Country Planning department.</li>
        <li>Approved layout plan, roads, and the status of services.</li>
        <li>Current policy rules, since they have been revised over time.</li>
      </ul>

      <p>Arjun Buildtech can help you shortlist licensed DDJAY projects near Rohtak. Compare the costs with an HSVP sector using our <a href="/blog/guide-to-buying-hsvp-plots">HSVP plot guide</a>.</p>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 18,
    slug: "property-valuation-rohtak",
    title: "How Property Valuation Works in Rohtak",
    date: "2026-02-05",
    category: "Financial Insights",
    excerpt:
      "Collector rate vs market rate: learn what drives property valuation in Rohtak and how to estimate your plot or house's worth.",
    content: `
      <h2>Understanding property valuation</h2>
      <p>Whether you are buying or selling, knowing a property's realistic value matters. In Rohtak, <strong>property valuation</strong> combines government-set rates with live market demand.</p>

      <h3>Collector rate vs market rate</h3>
      <p>The <em>collector rate</em> (circle rate) is the minimum value used for registration and stamp duty, set by the government. The <em>market rate</em> is what buyers actually pay, and in popular sectors it is often higher than the collector rate.</p>

      <h3>Factors that affect value</h3>
      <ul>
        <li>Sector and approval status (HSVP, licensed colony or unauthorised)</li>
        <li>Corner plots, park-facing plots and proximity to main roads</li>
        <li>Width of the facing road, for example 12 m vs 24 m</li>
        <li>Age and condition of construction for built-up houses</li>
      </ul>

      <h3>How to estimate</h3>
      <p>Compare recent registry values for similar plots in the same sector, adjust for facing and road width, and cross-check with a local expert. Stamp duty is paid on the higher of price or collector rate; see our <a href="/blog/understanding-property-taxes-haryana">stamp duty guide</a>.</p>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 19,
    slug: "rohtak-property-tax-online-payment",
    title: "Rohtak Property Tax Online Payment: Step-by-Step",
    date: "2026-01-20",
    category: "Policy Update",
    excerpt:
      "Pay your Rohtak municipal property tax online with your Property ID, avoid penalties and keep your NDC ready for resale.",
    content: `
      <h2>Paying property tax in Rohtak</h2>
      <p>Annual property tax to the Municipal Corporation Rohtak (MCR) is mandatory, and cleared dues are needed to get a No Dues Certificate (NDC) when you sell. Payment is now online.</p>

      <h3>How to pay online</h3>
      <ol>
        <li>Open the official Urban Local Bodies (ULB) Haryana property tax portal.</li>
        <li>Choose the property tax payment option and select Rohtak as your municipality.</li>
        <li>Enter your Property ID, which you can find on older tax receipts or through your Parivar Pehchan Patra linked records.</li>
        <li>Check the owner details and the pending amount.</li>
        <li>Pay using UPI, net banking or card.</li>
        <li>Download and save the receipt.</li>
      </ol>

      <p>Keeping your tax up to date makes a future sale or transfer smoother. If your property details are wrong on the portal, Arjun Buildtech can help you get them corrected. Related: <a href="/blog/property-registration-guidelines-egras">E-GRAS registration guidelines</a>.</p>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 20,
    slug: "builder-floors-vs-high-rise",
    title: "Builder Floor vs High-Rise Flat in Rohtak",
    date: "2026-01-08",
    category: "Buying Guide",
    excerpt:
      "Independent builder floor or high-rise flat? Compare privacy, land share, maintenance and amenities for Rohtak homebuyers.",
    content: `
      <h2>Choosing the right home type</h2>
      <p>Many Rohtak buyers have to choose between an <strong>independent builder floor</strong> in an HSVP sector and a flat in a gated high-rise society.</p>

      <h3>Independent builder floors</h3>
      <p>Common in sectors such as 2, 3 and 14, these are low-rise buildings (usually three to four floors) on individual plots.</p>
      <ul>
        <li><strong>Pros:</strong> More privacy, a larger undivided share of land, lower maintenance charges, and often roof rights.</li>
        <li><strong>Cons:</strong> Fewer amenities such as pools and gyms, and security that depends on the sector rather than a dedicated society team.</li>
      </ul>

      <h3>High-rise apartments</h3>
      <ul>
        <li><strong>Pros:</strong> Round-the-clock security, power backup, clubhouse, parks and community living.</li>
        <li><strong>Cons:</strong> Higher monthly maintenance and a small share of land.</li>
      </ul>

      <p>The right choice depends on your lifestyle and budget. If you are leaning toward flats, read our <a href="/blog/3-bhk-flats-in-rohtak">3 BHK buying guide</a>.</p>
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 21,
    slug: "renting-property-rohtak-guide",
    title: "Landlord's Guide to Renting Out Property in Rohtak",
    date: "2025-12-15",
    category: "Financial Insights",
    excerpt:
      "Protect your rental income: tenant verification, registered lease deeds, security deposits and clear maintenance clauses in Haryana.",
    content: `
      <h2>Renting out safely and profitably</h2>
      <p>Rohtak's mix of education and industry keeps rental demand healthy, but landlords still need sound paperwork to protect their property.</p>

      <h3>Best practices for landlords</h3>
      <ul>
        <li><strong>Tenant verification:</strong> Complete tenant verification with the police as required in Haryana.</li>
        <li><strong>Written, registered agreement:</strong> A lease of one year or more must be registered. Many landlords use 11-month agreements; whichever you choose, put the terms in writing.</li>
        <li><strong>Security deposit:</strong> The amount is negotiable and commonly one to three months of rent. State the refund conditions clearly.</li>
        <li><strong>Maintenance clauses:</strong> Define who pays property tax, society maintenance, utilities and minor repairs.</li>
        <li><strong>Inspection:</strong> Record the condition of the property at move-in with photos.</li>
      </ul>

      <p>Arjun Buildtech provides property management support, from finding reliable tenants to drafting clear agreements. Planning to sell instead? Read our <a href="/blog/tips-for-selling-your-property-fast">tips for selling fast</a>.</p>
      ${CTA}
    `,
    // TODO: this image is also used by post id 4. Use a different one to avoid duplicate images.
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80",
  },
  {
    id: 22,
    slug: "top-sectors-for-investment-rohtak",
    title: "Top 5 Sectors to Invest in Rohtak (2026)",
    date: "2025-11-30",
    category: "Investment Guide",
    excerpt:
      "Sector 27, Suncity, Sector 2, Sector 25 and the IMT surroundings: five Rohtak locations investors are watching in 2026.",
    content: `
      <h2>Where investors are looking in Rohtak</h2>
      <p>Picking the right location matters as much as picking the right price. Here are five areas on our watchlist for 2026:</p>

      <ol>
        <li><strong>Sector 27:</strong> Benefits from highway connectivity. Prices are rising but still offer entry points for mid-sized budgets.</li>
        <li><strong>Suncity Township (Sectors 34–36A):</strong> One of Rohtak's most premium addresses, suited to villas and high-end plots. See the <a href="/blog/suncity-sector-appreciation">latest price update</a>.</li>
        <li><strong>Sector 2:</strong> A fully developed, affluent sector with active resale demand.</li>
        <li><strong>Sector 25:</strong> A growing mix of residential and commercial use near institutional development.</li>
        <li><strong>IMT surroundings:</strong> Villages and new sectors near the Industrial Model Township, better for long-term land holding.</li>
      </ol>

      <p>Every investment carries risk, so check titles, approvals and recent registry values for any plot you consider. Arjun Buildtech's advisors can help you build a balanced property portfolio.</p>
      ${INVEST_NOTE}
      ${CTA}
    `,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  ...moreBlogs,
];

// Newest first. Works best when every date is ISO ("YYYY-MM-DD").
export const blogs = [...allBlogs].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);