import "dotenv/config";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { isPropertyPubliclyAvailable, normalizePropertyData } from "../src/utils/propertySchema.js";
import { createSlug } from "../src/utils/slugify.js";

const siteUrl = "https://arjunbuildtech.com";
const sourcePath = resolve("public/sitemap.xml");
const outputPath = resolve("dist/sitemap.xml");
const excludedPaths = new Set([
  "/about",
  "/commercial-property-rohtak",
  "/contact-agent",
  "/hsvp-plots-rohtak",
  "/investment-property-rohtak",
  "/plots-in-rohtak-sector-1",
  "/plots-in-rohtak-sector-2",
  "/plots-in-rohtak-sector-3",
  "/plots-in-rohtak-sector-4",
  "/profile",
  "/residential-plots-rohtak",
  "/reviews",
  "/who-built-arjun-buildtech",
  "/developer",
]);

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  throw new Error("Firebase web configuration is required to generate the property sitemap.");
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const [sourceXml, propertiesSnapshot, featuredSnapshot] = await Promise.all([
  readFile(sourcePath, "utf8"),
  getDocs(collection(db, "properties")),
  getDocs(collection(db, "featuredproperties")),
]);

const parsedSitemap = new XMLParser().parse(sourceXml);
const sourceUrls = parsedSitemap.urlset.url || [];
const urls = new Map();

for (const sourceEntry of Array.isArray(sourceUrls) ? sourceUrls : [sourceUrls]) {
  const loc = sourceEntry.loc;
  if (!loc) continue;

  const parsedUrl = new URL(loc);
  if (
    parsedUrl.origin !== siteUrl ||
    parsedUrl.search ||
    parsedUrl.hash ||
    parsedUrl.pathname.startsWith("/admin") ||
    parsedUrl.pathname.startsWith("/property/") ||
    excludedPaths.has(parsedUrl.pathname)
  ) {
    continue;
  }

  urls.set(parsedUrl.href, {
    loc: parsedUrl.href,
    ...(sourceEntry.lastmod ? { lastmod: sourceEntry.lastmod } : {}),
  });
}

const propertiesById = new Map();
for (const propertyDoc of [
  ...propertiesSnapshot.docs,
  ...featuredSnapshot.docs,
]) {
  const rawProperty = { id: propertyDoc.id, ...propertyDoc.data() };
  if (!isPropertyPubliclyAvailable(rawProperty)) continue;

  const property = normalizePropertyData(rawProperty);
  const locationSlug = createSlug(property.location || property.city);
  const nameSlug = createSlug(property.name || property.title);
  if (!locationSlug || !nameSlug) continue;

  const lastModified = rawProperty.updatedAt || rawProperty.createdAt;
  const lastmod = lastModified?.toDate
    ? lastModified.toDate().toISOString().slice(0, 10)
    : lastModified instanceof Date
      ? lastModified.toISOString().slice(0, 10)
      : undefined;

  propertiesById.set(propertyDoc.id, {
    loc: `${siteUrl}/property/${locationSlug}/${nameSlug}/${encodeURIComponent(propertyDoc.id)}`,
    ...(lastmod ? { lastmod } : {}),
  });
}

for (const propertyEntry of propertiesById.values()) {
  urls.set(propertyEntry.loc, propertyEntry);
}

const xmlBuilder = new XMLBuilder({
  format: true,
  suppressEmptyNode: true,
  ignoreAttributes: false,
});
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n${xmlBuilder.build({
  urlset: {
    "@_xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
    url: [...urls.values()],
  },
})}`;

await writeFile(outputPath, sitemapXml, "utf8");
console.log(`Generated sitemap with ${urls.size} public URLs.`);