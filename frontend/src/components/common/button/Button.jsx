import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  label,
  to,
  onClick,
  variant = "primary",
  type = "button",
  icon, // optional icon component
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors text-sm focus:outline-none focus:ring-1 focus:ring-red-600";

  const variants = {
    primary:
      "bg-red-600 text-white px-5 py-2.5 rounded hover:bg-red-700 shadow-sm",
    secondary:
      "border border-red-600 text-red-600 px-5 py-2.5 rounded hover:bg-red-50",
    whatsapp:
      "bg-emerald-600 text-white px-6 py-3 rounded font-semibold hover:bg-emerald-700 shadow-sm",
    danger:
      "bg-red-600 text-white px-5 py-2.5 rounded hover:bg-red-700 shadow-sm",
    black:
      "bg-gray-900 text-white px-5 py-2.5 rounded hover:bg-red-600 shadow-sm",
  };

  const content = (
    <>
      {icon && <span className="w-4 h-4 shrink-0">{icon}</span>}
      <span>{label}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${variants[variant]}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}>
      {content}
    </button>
  );
};

export default Button;
