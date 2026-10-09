import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

// Default fallback settings if Firestore hasn't been set up yet
const DEFAULT_SETTINGS = {
  phone: "+91 93504 47531",
  phoneRaw: "+919350447531",
  whatsapp: "919350447531",
  companyName: "Arjun Buildtech",
  email: "arjunbuildtech@gmail.com",
  address: "Rohtak, Haryana, India",
  tagline: "Building Trust, Building Homes",
};

let cachedSettings = null; // Module-level cache so we don't re-fetch on every mount

const useSiteSettings = () => {
  const [settings, setSettings] = useState(cachedSettings || DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) return; // already loaded

    const fetchSettings = async () => {
      try {
        const ref = doc(db, "siteSettings", "main");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = { ...DEFAULT_SETTINGS, ...snap.data() };
          cachedSettings = data;
          setSettings(data);
        } else {
          // Use defaults if doc doesn't exist yet
          cachedSettings = DEFAULT_SETTINGS;
          setSettings(DEFAULT_SETTINGS);
        }
      } catch (err) {
        console.error("Failed to load site settings:", err);
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};

export default useSiteSettings;
