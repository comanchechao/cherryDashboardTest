import React, { useEffect } from "react";
import { Icon } from "@iconify/react";

export interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  visible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-100",
          border: "border-green-500",
          shadow: "shadow-[4px_4px_0px_#22c55e]",
          iconColor: "text-green-600",
          titleColor: "text-green-800",
          messageColor: "text-green-700",
          icon: "mdi:check-circle",
        };
      case "error":
        return {
          bg: "bg-red-100",
          border: "border-red-500",
          shadow: "shadow-[4px_4px_0px_#ef4444]",
          iconColor: "text-red-600",
          titleColor: "text-red-800",
          messageColor: "text-red-700",
          icon: "mdi:alert-circle",
        };
      case "warning":
        return {
          bg: "bg-orange-100",
          border: "border-orange-500",
          shadow: "shadow-[4px_4px_0px_#f97316]",
          iconColor: "text-orange-600",
          titleColor: "text-orange-800",
          messageColor: "text-orange-700",
          icon: "mdi:alert",
        };
      case "info":
        return {
          bg: "bg-blue-100",
          border: "border-blue-500",
          shadow: "shadow-[4px_4px_0px_#3b82f6]",
          iconColor: "text-blue-600",
          titleColor: "text-blue-800",
          messageColor: "text-blue-700",
          icon: "mdi:information",
        };
      default:
        return {
          bg: "bg-cherry-cream",
          border: "border-cherry-burgundy",
          shadow: "shadow-[4px_4px_0px_#321017]",
          iconColor: "text-cherry-burgundy",
          titleColor: "text-cherry-burgundy",
          messageColor: "text-cherry-burgundy",
          icon: "mdi:information",
        };
    }
  };

  const styles = getToastStyles();

  if (!visible) return null;

  return (
    <div
      className={`fixed top-10 right-10 z-50 ${styles.bg} border-4 ${
        styles.border
      } rounded-xl ${
        styles.shadow
      } px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10 pointer-events-none"
      } max-w-sm`}
    >
      <Icon
        icon={styles.icon}
        className={styles.iconColor}
        width={24}
        height={24}
      />
      <div className="flex flex-col flex-1">
        <span className={`winky-sans-font font-medium ${styles.titleColor}`}>
          {title}
        </span>
        <span
          className={`winky-sans-font text-sm ${styles.messageColor} opacity-90`}
        >
          {message}
        </span>
      </div>
      <button
        onClick={onClose}
        className={`${styles.iconColor} hover:opacity-70 transition-opacity duration-200 flex-shrink-0`}
      >
        <Icon icon="mdi:close" width={20} height={20} />
      </button>
    </div>
  );
};

export default Toast;
