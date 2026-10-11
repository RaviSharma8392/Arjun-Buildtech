// Utility for reading and saving verified user details across Arjun Buildtech

export const getUserProfile = () => {
  try {
    const raw = localStorage.getItem("arjun_user_profile");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.name || parsed.phone)) {
        return {
          name: parsed.name || "",
          phone: parsed.phone || "",
          email: parsed.email || "",
          verified: !!parsed.verified,
        };
      }
    }

    // Fallback checks
    const legacyName = localStorage.getItem("smartLeadName") || localStorage.getItem("userName") || "";
    const legacyPhone = localStorage.getItem("smartLeadPhone") || localStorage.getItem("userPhone") || "";
    if (legacyName || legacyPhone) {
      return {
        name: legacyName,
        phone: legacyPhone,
        email: "",
        verified: false,
      };
    }
  } catch (err) {
    console.error("Error reading user profile from storage:", err);
  }

  return { name: "", phone: "", email: "", verified: false };
};

export const saveUserProfile = ({ name, phone, email = "", verified = true }) => {
  try {
    const cleanPhone = phone ? phone.toString().replace(/\D/g, "") : "";
    const profile = {
      name: (name || "").trim(),
      phone: cleanPhone,
      email: (email || "").trim(),
      verified: !!verified,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem("arjun_user_profile", JSON.stringify(profile));
    if (profile.name) {
      localStorage.setItem("smartLeadName", profile.name);
      localStorage.setItem("userName", profile.name);
    }
    if (cleanPhone) {
      localStorage.setItem("smartLeadPhone", cleanPhone);
      localStorage.setItem("userPhone", cleanPhone);
    }

    // Dispatch global event so all open forms update immediately
    const event = new CustomEvent("arjun-profile-updated", { detail: profile });
    window.dispatchEvent(event);
    window.dispatchEvent(new Event("storage"));

    return profile;
  } catch (err) {
    console.error("Error saving user profile:", err);
    return null;
  }
};

export const clearUserProfile = () => {
  try {
    localStorage.removeItem("arjun_user_profile");
    localStorage.removeItem("smartLeadName");
    localStorage.removeItem("smartLeadPhone");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");

    const empty = { name: "", phone: "", email: "", verified: false };
    const event = new CustomEvent("arjun-profile-updated", { detail: empty });
    window.dispatchEvent(event);
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Error clearing user profile:", err);
  }
};
