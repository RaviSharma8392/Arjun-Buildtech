import React, { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

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

  const config = {
    success: {
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    error: {
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      icon: <XCircle className="w-5 h-5 text-red-600" />,
    },
    warning: {
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      icon: <XCircle className="w-5 h-5 text-amber-600" />,
    },
    info: {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
    },
  };

  const { bgColor, borderColor, textColor, icon } = config[type];

  return (
    <div
      className={`fixed top-6 right-6 z-50 ${bgColor} border ${borderColor} text-${textColor} px-4 py-3 rounded-lg shadow-lg animate-slide-in`}>
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-current opacity-20">
        <div
          className="h-full bg-current transition-all duration-300 ease-linear"
          style={{
            width: "100%",
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Notification;
