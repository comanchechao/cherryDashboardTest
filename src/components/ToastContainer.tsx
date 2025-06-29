import React from "react";
import Toast from "./Toast";
import { ToastState } from "../hooks/useToast";

interface ToastContainerProps {
  toasts: ToastState[];
  onHideToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onHideToast,
}) => {
  return (
    <div className="fixed top-10 max-w-[88rem] w-full right-10 z-50 space-y-3">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            transform: `translateY(${index * 80}px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <Toast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            visible={toast.visible}
            onClose={() => onHideToast(toast.id)}
            duration={0} // Duration is handled by the hook
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
