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
  onClose,
  txSignature,
}) => {
  if (!visible) return null;

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "mdi:check-circle",
          bgColor: "bg-[var(--color-glass)]",
          borderColor: "border-[var(--color-accent)]/30",
          shadowColor: "shadow-[0_8px_32px_rgba(67,103,201,0.2)]",
          iconColor: "text-[var(--color-accent)]",
          titleColor: "text-[var(--color-text-primary)]",
          messageColor: "text-[var(--color-text-secondary)]/90",
          accentColor: "bg-[var(--color-accent)]/20",
        };
      case "error":
        return {
          icon: "mdi:alert-circle",
          bgColor: "bg-[var(--color-glass)]",
          borderColor: "border-red-500/30",
          shadowColor: "shadow-[0_8px_32px_rgba(239,68,68,0.2)]",
          iconColor: "text-red-500",
          titleColor: "text-[var(--color-text-primary)]",
          messageColor: "text-[var(--color-text-secondary)]/90",
          accentColor: "bg-red-500/20",
        };
      case "warning":
        return {
          icon: "mdi:alert",
          bgColor: "bg-[var(--color-glass)]",
          borderColor: "border-orange-500/30",
          shadowColor: "shadow-[0_8px_32px_rgba(249,115,22,0.2)]",
          iconColor: "text-orange-500",
          titleColor: "text-[var(--color-text-primary)]",
          messageColor: "text-[var(--color-text-secondary)]/90",
          accentColor: "bg-orange-500/20",
        };
      case "info":
        return {
          icon: "mdi:information",
          bgColor: "bg-[var(--color-glass)]",
          borderColor: "border-[var(--color-accent)]/30",
          shadowColor: "shadow-[0_8px_32px_rgba(67,103,201,0.2)]",
          iconColor: "text-[var(--color-accent)]",
          titleColor: "text-[var(--color-text-primary)]",
          messageColor: "text-[var(--color-text-secondary)]/90",
          accentColor: "bg-[var(--color-accent)]/20",
        };
      default:
        return {
          icon: "mdi:information",
          bgColor: "bg-[var(--color-glass)]",
          borderColor: "border-[var(--color-accent)]/30",
          shadowColor: "shadow-[0_8px_32px_rgba(67,103,201,0.2)]",
          iconColor: "text-[var(--color-accent)]",
          titleColor: "text-[var(--color-text-primary)]",
          messageColor: "text-[var(--color-text-secondary)]/90",
          accentColor: "bg-[var(--color-accent)]/20",
        };
    }
  };

  const config = getToastConfig();

  return (
    <div
      className={`relative ${config.bgColor} border ${config.borderColor} rounded-[20px] ${config.shadowColor} backdrop-blur-xl overflow-hidden transition-all duration-300 transform opacity-100 translate-y-0 hover:shadow-[0_12px_40px_rgba(67,103,201,0.3)] group`}
    >
      {/* Floating Decorative Elements */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-[var(--color-accent)]/20 rounded-full animate-ping"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-float"></div>

      {/* Bottom Decorative Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/60 to-transparent rounded-b-[20px]"></div>

      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Icon Container */}
          <div
            className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${config.accentColor} rounded-[16px] flex items-center justify-center`}
          >
            <Icon
              icon={config.icon}
              className={`${config.iconColor} w-5 h-5 sm:w-6 sm:h-6`}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3
                  className={`maladroit-font text-base sm:text-lg font-medium ${config.titleColor} mb-1`}
                >
                  {title}
                </h3>
                <p
                  className={`winky-sans-font text-sm sm:text-sm ${config.messageColor} leading-relaxed`}
                >
                  {message}
                </p>
                {txSignature && (
                  <div className="mt-2 p-2 bg-[var(--color-bg-secondary)]/20 rounded-[12px] border border-[var(--color-accent)]/10">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`winky-sans-font text-xs ${config.messageColor} opacity-70 break-all flex-1`}
                      >
                        <span className="font-medium">Tx:</span>{" "}
                        {txSignature.slice(0, 10)}...{txSignature.slice(-8)}
                      </p>
                      <a
                        href={`https://bscscan.com/tx/${txSignature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-[var(--color-accent)]/10 hover:bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-2 py-1 rounded-[8px] text-xs transition-all duration-200 hover:scale-105 flex-shrink-0"
                      >
                        <Icon icon="mdi:open-in-new" width={12} height={12} />
                        BSCScan
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-[var(--color-accent)]/10 hover:bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group-hover:opacity-100 opacity-60"
                aria-label="Close toast"
              >
                <Icon
                  icon="mdi:close"
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-accent)]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
