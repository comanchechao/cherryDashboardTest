import { useState, useCallback } from "react";

export interface ToastState {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  visible: boolean;
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback(
    (
      type: ToastState["type"],
      title: string,
      message: string,
      duration: number = 3000
    ) => {
      const id = Date.now().toString();
      const newToast: ToastState = {
        id,
        type,
        title,
        message,
        visible: true,
        duration,
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto remove after duration
      if (duration > 0) {
        setTimeout(() => {
          hideToast(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const hideAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback(
    (title: string, message: string, duration?: number) => {
      return showToast("success", title, message, duration);
    },
    [showToast]
  );

  const showError = useCallback(
    (title: string, message: string, duration?: number) => {
      return showToast("error", title, message, duration);
    },
    [showToast]
  );

  const showWarning = useCallback(
    (title: string, message: string, duration?: number) => {
      return showToast("warning", title, message, duration);
    },
    [showToast]
  );

  const showInfo = useCallback(
    (title: string, message: string, duration?: number) => {
      return showToast("info", title, message, duration);
    },
    [showToast]
  );

  return {
    toasts,
    showToast,
    hideToast,
    hideAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
