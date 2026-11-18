# SEO and Search Feature Audit

Reviewed: 18 November 2026

## Site structure and crawlability

- The frontend is a Vite React single page app using React Router and `react-helmet-async`. Public routes include the homepage, property search and property details, services, testimonials, profile, blog listing and posts, contact and enquiry pages, and tools. Admin routes are protected and marked `noindex`.
- Property data is fetched in the browser from Firestore collections `properties` and `featuredproperties`. Blog content is stored in frontend data files. Titles, canonical tags, page content, and route-specific JSON-LD are mostly added after JavaScript runs; the initial HTML response is a shared app shell. There is no server rendering or pre-rendering in this project.
- `public/_redirects` contains a Netlify-style `/* /index.html 200` SPA fallback. The configured host was not otherwise established from the repository. The fallback lets client routes load directly, but also returns the app shell with HTTP 200 for unknown paths, which can create soft 404s.
- `public/_redirects` now sends the retired thin SEO slugs to their useful replacement pages with 301 redirects before the SPA fallback. Confirm that the production host honors this Netlify-style file.
- `robots.txt` allows public crawling and disallows `/admin`. It points to the HTTPS sitemap.
- `scripts/generateSitemap.js` merges the static sitemap with public Firestore listings. The npm `build` lifecycle runs this Firebase-dependent script after Vite; it exits after the one-shot read so a Firestore gRPC channel cannot keep the build process open. Sitemap generation still needs Firebase build configuration and database access at deployment time; when the database is unavailable, the curated static URLs and supplied fallback property remain available.
- Query-filtered property searches use a base canonical URL. `/profile` is indexable and now appears in the sitemap. The legacy `/reviews` route canonicalizes to `/testimonials`.

## Changes made

- Replaced sitewide property-specific schema with a shared `WebSite` and `Organization` graph. A property list should not be declared on every route because the initial HTML shell is shared across routes. Removed unrelated developer personal details from the global schema and changed social preview images to the logo file that exists in `public`.
- Kept the business schema at `Organization` level. Address fields conflict across site content, so the structured data does not select one address as the definitive office. Contact details and social links already present on the site are included.
- Added `/profile` page metadata and sitemap inclusion; removed the previous noindex behavior.
- Reused the visible breadcrumb component to emit matching breadcrumb schema and removed duplicate manual breadcrumb graphs. Breadcrumb labels now follow the displayed language.
- Rebuilt the dynamic SEO-location fallback as a useful noindex recovery page with current property-search links, contact and blog paths, and neutral availability language. Replaced the global 404 auto-redirect with a stable 404 page that offers explicit navigation.
- Added supported page-level `WebPage`, `AboutPage`, `ContactPage`, and `CollectionPage` descriptions to public profile, contact, help, tools, calculator, area-converter, and SEO landing pages. These describe the pages for search engines; they do not guarantee a special rich-result treatment.
- Kept `BlogPosting` data limited to real post fields; absent images are omitted, and publisher points to the shared organization. Removed fabricated reader/view counters and a misleading Rohtak post image that depicted Mathura.
- Removed FAQ structured data while keeping the visible FAQ accordion. Google limits FAQ rich results to well-known government and health sites.
- Added the supplied Sector 36 Suncity property to the featured row, property results, and sitemap fallback. Its fallback uses the supplied page text for plot type, ₹2,45,00,000 price, 326 sqft area, and the three visible features. Current availability is not asserted; an existing Firestore record takes precedence, and a record marked unavailable is not reintroduced. The supplied detail URL is preserved.
- Added two honest, Rohtak-focused landing pages for property-dealer searches: `/property-dealer-in-rohtak` and `/property-dealer-in-haryana`. The Haryana page explicitly limits the service scope to Rohtak instead of making a false statewide or Gurgaon claim.
- Retired eight thin legacy SEO slugs that repeated generic plot/price/location copy. They are removed from the sitemap and redirect to the closest useful listing or research page, preserving old links without presenting doorway pages as current content.
- Initialized the homepage featured row and property-results page with that fallback, so the listing can render while Firestore is still loading. This is a visitor-facing loading fallback; it is not a claim that Google will display a special property rich result.
- Fixed property search query handling: `?type=Buy` and `?type=Rent` map to transaction filters, plural terms such as “plots” match the singular property category, and partial location searches no longer collapse to the first matching listing. The result count text now reflects the selected status.
- Fixed SEO listing routes so `...for-sale-in-*` pages apply a sale filter and `rental-property-in-*` pages apply a rental filter.
- Removed generated nearby price estimates and fixed rental yields from property details. Replaced the wrong city image used on the property listing banner and improved property image descriptions.
- Removed the unverified generated city/comparison SEO pages and the unverified bulk article bank from the public blog index and sitemap. The remaining public guides are the curated articles and neutral Rohtak property pages; the unused bulk article source file was deleted so it cannot be accidentally published later.
- Updated static sitemap data to avoid unverified `lastmod` values; the generator now uses a real `updatedAt` value when present.
- Added a page H1 on Contact Us and a route-aware page heading for service pages. Service and contact pages continue to use visible breadcrumbs where present.
- Removed unused global developer contact metadata and unsupported hardcoded company statistics that were not sourced or used by the current UI. Legacy developer-credit aliases remain noindex and excluded from the public sitemap; the dedicated attribution page is documented separately below.
- Reworked `/website-developer` into a focused, indexable hire page using the verified Ravi Sharma/RSDEV contact profile and Arjun Buildtech as the live case study. The legacy `/developer` and `/who-built-arjun-buildtech` aliases remain noindex redirects.
- Removed the developer promotion/contact block and developer link from the public footer and sitemap directory so property pages stay focused while the dedicated developer page remains available.
- Removed obsolete `meta keywords` tags; page titles, descriptions, visible content, canonical URLs, internal links, and supported structured data are the maintained SEO signals.

## Google Search feature eligibility

Google supports specific Search features, not every Schema.org type. Structured data can help Google interpret content, but valid markup does not guarantee a rich result or an enhancement report.

| Feature | Google support and candidate pages | Missing items, limits, and implementation |
|---|---|---|
| Organization details | Google documents organization markup for homepages and organization information. | Implemented shared `Organization` with name, URL, logo, phone, email, contact point, service area, and social profiles. Postal address is omitted until the conflicting office/location copy is confirmed. This is not a guaranteed rich result. |
| Local business | Google supports LocalBusiness structured data for an eligible real-world business location. | Not implemented: the site names “Sector 27 & Sector 1” in company settings, “G74P, Sector-27” in privacy and SEO copy, and “828, Sector-1” as another office on an SEO page. Confirm exact public-facing location(s), address, and hours before choosing LocalBusiness markup. |
| Breadcrumbs | Breadcrumb rich results are supported for pages with a visible hierarchy. | Implemented through the shared visible `Breadcrumb` component and matching `BreadcrumbList` JSON-LD. Google chooses whether to show it. |
| Article | Article structured data is supported for eligible news and blog pages. | `BlogPosting` is present on individual blog pages with visible title, excerpt, available publication dates, and only a real article image when supplied. Named authors/dates and image rights should be checked against editorial records. SPA rendering still limits the initial HTML. |
| Video | Google documents video results for pages with an actual, watchable video and required video metadata. | The home page embeds social media content, but the project has no dedicated video watch pages or verified `VideoObject` data such as thumbnail, upload date, and duration. Not implemented. |
| Images and licensable images | Google supports image metadata, including licensing metadata for qualifying images. | Descriptive alt text and relevant image use were improved where practical. No creator, copyright, or license data is maintained, so licensable metadata was not added. Property images are loaded from listing data and must be crawlable and rights-cleared. |
| Vacation rental | Google has a vacation-rental feature with strict business and technical eligibility, including Hotel Center/Google account requirements. | Not applicable to ordinary sale, plot, rental, and commercial property listings. The site does not document bookable vacation accommodation or the required inventory data. |
| Product snippets / merchant listings | Supported for eligible product pages; merchant listings require purchase-capable offers. | Not applicable to real estate brokerage listings. No `Product`, `Offer`, or fake checkout markup was added. |
| Review snippets | Google supports review snippets for eligible subjects and review types. | No review markup added. Reviews about the business on its own site are self-serving for the business/local-business entity and do not qualify for review snippets. |
| FAQ rich results | Google currently limits FAQ rich results to well-known authoritative government and health sites. | FAQ content remains visible, but `FAQPage` markup was removed because this property business is outside the stated eligibility group. |
| Sitelinks | Sitelinks are selected algorithmically from site structure and query context. | Clear navigation, route titles, breadcrumbs, and internal links help Google understand page hierarchy. There is no schema or guarantee that forces sitelinks. |
| Sitelinks search box | Google discontinued the sitelinks search box feature in November 2024. | No `SearchAction` markup was added for this discontinued result feature. The site’s own search UI remains available to visitors. |
| General property listing result | Google’s current Search Gallery does not list a general real-estate-listing rich result. | Property pages use a `WebPage` with a relevant Schema.org property entity. This describes visible page content but does not create a Google property listing enhancement. |

## Facts to confirm before deployment

- Confirm the public office address or addresses and whether each is a staffed location. The current copy conflicts, so the structured data intentionally avoids a postal address.
- Confirm that the footer hours, Monday–Saturday, 10:00 AM–6:00 PM, are current and public.
- Confirm the Sector 36 listing’s current price, area/unit, listed features, and active status. Those details came from the provided page-text capture; static fallback details can become stale if the Firestore entry is absent or unavailable.
- Confirm publication dates, author names, market-growth claims, approvals, and other financial/legal statements in the blog and SEO landing-page content against source records. Do not infer any relationship with the similarly named Kurukshetra company.

## Remaining work outside this code change

- Reliable per-route HTML, title, and JSON-LD for crawlers requires server rendering or pre-rendering of public routes. Current client-side Firestore rendering means Google may need to execute the app before it sees listings and their metadata.
- Configure real HTTP 404 responses for unknown/removed URLs at the host or edge. The current SPA fallback returns HTTP 200.
- Confirm the production host and deploy pipeline. The repository has a Netlify-style redirects file, but the actual hosting provider is not declared. Ensure the Firebase-dependent sitemap postbuild is configured and succeeds.
- The Vite build succeeds, but its main JavaScript chunk is about 859 KB (about 226 KB gzipped), above Vite's 500 KB warning threshold. Further code-splitting could reduce the initial download, alongside measuring the Firestore request cost.
- After deployment, submit `https://arjunbuildtech.com/sitemap.xml` in Search Console, inspect the homepage, `/properties`, a property URL, and a blog post with URL Inspection, and review indexing/canonical outcomes. Use Google’s Rich Results Test for supported features such as breadcrumbs and articles, and the Schema Markup Validator for general Schema.org graphs. Search Console only reports enhancements Google supports and detects; it is not a control panel for enabling every feature.

## Local verification

- `npm run lint` passed.
- `npm run build` passed with the native Vite config loader and generated the postbuild sitemap. Vite reports the existing ~859 KB main JavaScript chunk warning; no build error occurred.
- The static sitemap parsed successfully and contains 55 URLs, including `/profile`, the two property-dealer landing pages, the dedicated developer attribution page, five new research guides, curated blog routes, and the supplied Sector 36 property URL. The sitemap generator now adds every blog published by the frontend and filters source entries to blog slugs that are actually published.

## Official Google references

- [Search Gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Video structured data](https://developers.google.com/search/docs/appearance/structured-data/video)
- [Image license metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)
- [Vacation rental structured data](https://developers.google.com/search/docs/appearance/structured-data/vacation-rental)
- [Merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
- [Review snippet policies](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Google’s FAQ rich result change](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Sitelinks guidance](https://developers.google.com/search/docs/appearance/sitelinks)
- [Sitelinks search box discontinuation](https://developers.google.com/search/blog/2024/10/sitelinks-search-box)
- [Search Console structured data validation](https://support.google.com/webmasters/answer/13300208)
