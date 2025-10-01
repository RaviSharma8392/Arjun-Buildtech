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
    "inline-flex items-center justify-center gap-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105";

  const variants = {
    primary:
      "bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 hover:shadow-lg",
    secondary:
      "border border-indigo-600 text-indigo-600 px-5 py-2 rounded-full shadow-sm hover:bg-indigo-50 hover:shadow-md",
    whatsapp:
      "bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl",
    danger:
      "bg-red-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-700 hover:shadow-lg",
    black:
      "bg-black text-white px-5 py-2 rounded-full shadow-md hover:bg-red-700 hover:shadow-lg",
  };

  const content = (
    <>
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
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
