import React, { useEffect } from "react";

const FormErrorNotification = ({
  messages = [],
  visible,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (visible && messages.length) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, messages, duration, onClose]);

  if (!visible || messages.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-red-600 text-white shadow-md p-4 z-50 animate-slideDown">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-start">
          <ul className="list-disc pl-5">
            {messages.map((msg, i) => (
              <li key={i} className="text-sm">
                {msg}
              </li>
            ))}
          </ul>
          <button
            onClick={onClose}
            className="ml-4 font-bold text-lg hover:text-gray-200">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormErrorNotification;
