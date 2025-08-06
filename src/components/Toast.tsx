import React from "react";
import { Icon } from "@iconify/react";

interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
  txSignature?: string;
}

const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  visible,
  txSignature,
}) => {
  if (!visible) return null;

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "mdi:check-circle",
          bgColor: "bg-green-100",
          borderColor: "border-green-500",
          shadowColor: "shadow-[4px_4px_0px_#22c55e]",
          iconColor: "text-green-600",
          titleColor: "text-green-800",
          messageColor: "text-green-700",
        };
      case "error":
        return {
          icon: "mdi:alert-circle",
          bgColor: "bg-red-100",
          borderColor: "border-red-500",
          shadowColor: "shadow-[4px_4px_0px_#ef4444]",
          iconColor: "text-red-600",
          titleColor: "text-red-800",
          messageColor: "text-red-700",
        };
      case "warning":
        return {
          icon: "mdi:alert",
          bgColor: "bg-orange-100",
          borderColor: "border-orange-500",
          shadowColor: "shadow-[4px_4px_0px_#f97316]",
          iconColor: "text-orange-600",
          titleColor: "text-orange-800",
          messageColor: "text-orange-700",
        };
      case "info":
        return {
          icon: "mdi:information",
          bgColor: "bg-blue-100",
          borderColor: "border-blue-500",
          shadowColor: "shadow-[4px_4px_0px_#3b82f6]",
          iconColor: "text-blue-600",
          titleColor: "text-blue-800",
          messageColor: "text-blue-700",
        };
      default:
        return {
          icon: "mdi:information",
          bgColor: "bg-cherry-cream",
          borderColor: "border-cherry-burgundy",
          shadowColor: "shadow-[4px_4px_0px_#5d4037]",
          iconColor: "text-cherry-red",
          titleColor: "text-cherry-burgundy",
          messageColor: "text-cherry-burgundy",
        };
    }
  };

  const config = getToastConfig();

  return (
    <div
      className={`fixed top-10 min-w-lg my-5 right-10 z-50 ${config.bgColor} border-4 ${config.borderColor} rounded-xl ${config.shadowColor} px-5 py-3 flex items-center gap-3 transition-all duration-300 transform opacity-100 translate-y-0`}
    >
      <Icon
        icon={config.icon}
        className={config.iconColor}
        width={24}
        height={24}
      />
      <div className="flex flex-col">
        <span className={`winky-sans-font font-medium ${config.titleColor}`}>
          {title}
        </span>
        <span
          className={`winky-sans-font text-sm ${config.messageColor} opacity-90`}
        >
          {message}
        </span>
        {txSignature && (
          <span
            className={`winky-sans-font text-xs ${config.messageColor} opacity-70 break-all mt-1`}
          >
            Tx: {txSignature}
          </span>
        )}
      </div>
    </div>
  );
};

export default Toast;
