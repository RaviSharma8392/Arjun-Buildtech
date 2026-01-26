import React from "react";

const FormSection = ({
  title,
  subtitle,
  children,
  className = "",
  columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}) => {
  return (
    <div className={` p-6  ${className}`}>
      <div className=" pb-2 border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div className={`grid ${columns} gap-4`}>{children}</div>
    </div>
  );
};

export default FormSection;
