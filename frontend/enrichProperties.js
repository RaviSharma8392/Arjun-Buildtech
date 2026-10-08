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
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to generate a premium description based on property details
const generateRichDescription = (prop) => {
  const type = prop.type || "Property";
  const location = prop.location || "Rohtak";
  const title = prop.title || `${type} in ${location}`;
  const price = prop.price || "Contact for Price";
  const status = prop.status || "Available";

  let template = "";

  if (type.toLowerCase().includes("plot")) {
    template = `Welcome to an exceptional investment opportunity in the heart of ${location}. This premium ${title} represents the perfect canvas for your future dream home or a highly lucrative long-term investment. Situated in one of Rohtak's most sought-after and rapidly developing sectors, this plot offers unparalleled connectivity to major highways, top-tier educational institutions, and world-class medical facilities.

Unlike standard properties, investing in a plot in ${location} grants you the absolute freedom to design and construct a bespoke residence that perfectly aligns with your architectural vision. The surrounding neighborhood is characterized by wide, well-maintained roads, lush green parks, and an elite community of high-net-worth individuals, ensuring a safe, secure, and prestigious living environment.

Currently listed as ${status}, this property is priced at ${price}. Given the massive infrastructure push by the Haryana Government and the continuous expansion of Rohtak, land values in this specific sector are projected to appreciate significantly over the next few years. 

Do not miss out on securing this highly coveted piece of real estate. Contact Arjun Buildtech today to schedule a site visit and take the first step towards building your legacy.`;
  } else if (type.toLowerCase().includes("villa") || type.toLowerCase().includes("house")) {
    template = `Experience the pinnacle of luxury living with this breathtaking ${title} located in the prestigious neighborhood of ${location}. Designed with meticulous attention to detail and uncompromising quality, this magnificent residence is perfect for families seeking elegance, comfort, and state-of-the-art amenities.

From the moment you step inside, you will be greeted by expansive, sunlit living spaces, premium flooring, and a highly functional floor plan that seamlessly blends indoor and outdoor living. The gourmet kitchen is an absolute masterpiece, while the master suite offers a private sanctuary complete with spa-like bathrooms and ample wardrobe space. 

Located in ${location}, you are just minutes away from Rohtak's best shopping districts, fine dining restaurants, and premium schools. The property also boasts advanced security features, ample parking space, and beautifully landscaped private gardens.

Priced at ${price} and currently ${status}, this ${type} is a rare gem in today's highly competitive Rohtak real estate market. Whether you are upgrading your lifestyle or looking for a high-yield rental asset, this property delivers on all fronts. Partner with Arjun Buildtech to make this extraordinary home yours today.`;
  } else if (type.toLowerCase().includes("commercial") || type.toLowerCase().includes("shop")) {
    template = `Unlock unparalleled business potential with this highly strategic ${title} situated in the commercial epicenter of ${location}. In the fast-paced world of retail and business, location is everything, and this property places you right in the middle of Rohtak's highest footfall zone.

Ideal for retail showrooms, corporate offices, banks, or premium dining establishments, this commercial space offers massive visibility and a highly lucrative catchment area filled with affluent consumers. The building features modern architecture, excellent frontage, high ceilings, and ample dedicated parking for your clients and customers.

With Rohtak rapidly expanding as a major commercial and industrial hub in Haryana, properties in ${location} are generating exceptional rental yields and massive capital appreciation. Priced competitively at ${price} and currently ${status}, this is a golden opportunity for savvy investors and business owners looking to scale their operations.

Secure your business's future today. Contact Arjun Buildtech for a comprehensive tour and financial breakdown of this premium commercial asset.`;
  } else {
    template = `Discover an outstanding real estate opportunity with this premium ${title}, strategically located in the highly desirable area of ${location}. This property has been carefully vetted by the experts at Arjun Buildtech to ensure it meets our strict standards for quality, legality, and investment potential.

Situated in a thriving neighborhood, this property offers excellent connectivity to major transport hubs, essential utilities, and community centers. The surrounding infrastructure is rapidly upgrading, making ${location} one of the most promising sectors in Rohtak for both end-users and investors.

Priced at ${price}, this property is currently ${status} and ready for immediate transaction. The Rohtak real estate market is witnessing unprecedented growth, and securing a property in this location guarantees substantial long-term returns. 

At Arjun Buildtech, we pride ourselves on absolute transparency and seamless transactions. Reach out to our dedicated team today to learn more about this exclusive listing and arrange a private viewing.`;
  }

  return template;
};

const enrichProperties = async () => {
  try {
    console.log("Fetching properties from Firebase...");
    const propertiesRef = collection(db, "properties");
    const snapshot = await getDocs(propertiesRef);
    
    console.log(`Found ${snapshot.size} properties. Beginning enrichment...`);
    
    let updatedCount = 0;
    
    for (const document of snapshot.docs) {
      const propData = document.data();
      
      // Generate the new rich description
      const richDescription = generateRichDescription(propData);
      
      // Update the document in Firestore
      const docRef = doc(db, "properties", document.id);
      await updateDoc(docRef, {
        description: richDescription
      });
      
      updatedCount++;
      console.log(`Updated [${updatedCount}/${snapshot.size}]: ${propData.title}`);
    }
    
    console.log(`\n✅ Successfully enriched ${updatedCount} properties with premium SEO descriptions!`);
    process.exit(0);
  } catch (error) {
    console.error("Error enriching properties:", error);
    process.exit(1);
  }
};

enrichProperties();
