import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import * as dotenv from "dotenv";

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

async function normalizeCollection(collectionName) {
  const q = collection(db, collectionName);
  const snapshot = await getDocs(q);
  
  let updatedCount = 0;
  
  const promises = snapshot.docs.map(async (docSnap) => {
    const property = docSnap.data();
    let updated = false;
    const updates = {};

    if (property.type) {
       const normType = property.type.trim().replace(/\b\w/g, l => l.toUpperCase());
       if (normType !== property.type) { updates.type = normType; updated = true; }
    }
    
    if (property.location) {
       let normLoc = property.location.trim().replace(/\b\w/g, l => l.toUpperCase());
       normLoc = normLoc.replace(/Sector\s*-\s*(\d+)/ig, "Sector-$1");
       normLoc = normLoc.replace(/Sector\s+(\d+)/ig, "Sector-$1");
       if (normLoc !== property.location) { updates.location = normLoc; updated = true; }
    }

    if (updated) {
      await updateDoc(doc(db, collectionName, docSnap.id), updates);
      updatedCount++;
    }
  });

  await Promise.all(promises);
  console.log(`Normalized ${updatedCount} documents in ${collectionName}`);
}

async function run() {
  console.log("Starting normalization...");
  await normalizeCollection("properties");
  await normalizeCollection("featuredproperties");
  console.log("Done");
  process.exit(0);
}

run();
