import React from "react";

const ArrayInputField = ({
  label,
  name,
  value = [],
  onChange,
  placeholder,
  required = false,
  error,
  className = "",
  helperText = "Separate multiple items with commas",
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    const arr = value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");
    onChange(name, arr);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={value.join(", ")}
        onChange={handleChange}
        placeholder={placeholder}
        rows="3"
        className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ArrayInputField;
