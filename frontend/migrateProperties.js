import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import * as dotenv from "dotenv";

// Import our newly updated schema utility
import propertySchema from "./src/utils/propertySchema.js";
const { normalizePropertyData, buildFirestorePropertyPayload } = propertySchema;

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateCollection(collectionName) {
  console.log(`\nMigration starting for collection: ${collectionName}...`);
  const q = collection(db, collectionName);
  const snapshot = await getDocs(q);
  
  let updatedCount = 0;
  
  for (const docSnap of snapshot.docs) {
    try {
      const rawData = docSnap.data();
      
      // Pass existing data through our new schema normalization
      const normalized = normalizePropertyData({ id: docSnap.id, ...rawData });
      
      // Build the permanent payload with all new fields
      const payload = buildFirestorePropertyPayload(normalized);
      
      // We don't want to overwrite timestamps if they exist, so we keep them
      if (rawData.createdAt) payload.createdAt = rawData.createdAt;
      
      // Add a migrated flag so we know it's been updated to the new schema
      payload.schemaMigrated = true;

      // Update the document in Firestore
      await updateDoc(doc(db, collectionName, docSnap.id), payload);
      
      updatedCount++;
      console.log(`✅ Updated [${updatedCount}/${snapshot.size}]: ${payload.title || docSnap.id}`);
    } catch (error) {
      console.error(`❌ Failed to update document ${docSnap.id}:`, error);
    }
  }

  console.log(`Successfully migrated ${updatedCount} out of ${snapshot.size} documents in ${collectionName}`);
}

async function run() {
  console.log("Starting full database property migration to new schema...");
  
  try {
    await migrateCollection("properties");
    await migrateCollection("featuredproperties");
    console.log("\n🎉 Database migration complete! All properties are now permanently updated to the new schema.");
  } catch (error) {
    console.error("Migration failed:", error);
  }
  
  process.exit(0);
}

run();
