import React, { useState } from "react";

const Checkbox = () => {
  const [consent, setConsent] = useState(false);

  return (
    <div className="flex items-start gap-2 mt-4">
      <input
        type="checkbox"
        id="consent"
        checked={consent}
        onChange={(e) => setConsent(e.target.checked)}
        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="consent" className="text-sm text-gray-600 leading-5">
        I agree to be contacted through{" "}
        <span className="font-medium">Call, WhatsApp, SMS & Email</span> by
        <span className="font-medium"> RealEstateIndia </span> and other
        advertisers for similar properties.
      </label>
    </div>
  );
};

export default Checkbox;
