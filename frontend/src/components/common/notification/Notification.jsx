import React, { useEffect } from "react";

const Notification = ({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) => {
  // Auto-hide after `duration` milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div
      className={`fixed top-6 right-6 z-50 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg transition-all`}>
      {message}
      <button
        onClick={onClose}
        className="ml-3 text-white font-bold hover:opacity-75 transition">
        ×
      </button>
    </div>
  );
};

export default Notification;
