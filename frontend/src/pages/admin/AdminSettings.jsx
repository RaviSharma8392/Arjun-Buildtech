import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Save, Phone, Mail, MapPin, Building, Tag } from "lucide-react";

const DEFAULT_SETTINGS = {
  phone: "+91 93504 47531",
  phoneRaw: "+919350447531",
  whatsapp: "919350447531",
  companyName: "Arjun Buildtech",
  email: "arjunbuildtech@gmail.com",
  address: "Rohtak, Haryana, India",
  tagline: "Building Trust, Building Homes",
};

const AdminSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const ref = doc(db, "siteSettings", "main");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setSettings({ ...DEFAULT_SETTINGS, ...snap.data() });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "siteSettings", "main"), settings, { merge: true });
      // Clear module-level cache in useSiteSettings so next page load re-fetches
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Failed to save settings. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const fields = [
    {
      key: "companyName",
      label: "Company Name",
      icon: <Building size={16} />,
      placeholder: "Arjun Buildtech",
      type: "text",
    },
    {
      key: "tagline",
      label: "Tagline / Slogan",
      icon: <Tag size={16} />,
      placeholder: "Building Trust, Building Homes",
      type: "text",
    },
    {
      key: "phone",
      label: "Display Phone Number",
      icon: <Phone size={16} />,
      placeholder: "+91 93504 47531",
      type: "text",
      hint: "Shown on the property details page e.g. +91 93504 47531",
    },
    {
      key: "phoneRaw",
      label: "Phone (for tel: link)",
      icon: <Phone size={16} />,
      placeholder: "+919350447531",
      type: "text",
      hint: "No spaces, used for Click-to-Call e.g. +919350447531",
    },
    {
      key: "whatsapp",
      label: "WhatsApp Number",
      icon: <Phone size={16} />,
      placeholder: "919350447531",
      type: "text",
      hint: "Country code + number, no + sign, e.g. 919350447531",
    },
    {
      key: "email",
      label: "Contact Email",
      icon: <Mail size={16} />,
      placeholder: "arjunbuildtech@gmail.com",
      type: "email",
    },
    {
      key: "address",
      label: "Office Address",
      icon: <MapPin size={16} />,
      placeholder: "Rohtak, Haryana, India",
      type: "text",
    },
  ];

  return (
    <div className="px-6 py-10 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Site Settings</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Update your contact details, company info and branding. Changes sync across the entire website.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          {fields.map(({ key, label, icon, placeholder, type, hint }) => (
            <div key={key}>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                <span className="text-red-600">{icon}</span>
                {label}
              </label>
              <input
                type={type}
                value={settings[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
              {hint && (
                <p className="text-xs text-gray-400 mt-1">{hint}</p>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          {saved && (
            <span className="text-green-600 text-sm font-medium">
              ✓ Settings saved successfully!
            </span>
          )}
          {!saved && <span />}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-60 transition shadow-sm"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
