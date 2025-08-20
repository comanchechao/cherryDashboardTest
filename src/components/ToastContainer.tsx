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
    <div className="fixed top-4 left-4 right-4 lg:top-6 lg:right-6 lg:left-auto lg:max-w-lg xl:max-w-xl z-[200] space-y-2 lg:space-y-3">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="animate-slideIn"
          style={{
            transform: `translateY(${index * 20}px)`,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <Toast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            visible={toast.visible}
            onClose={() => onHideToast(toast.id)}
            duration={0} // Duration is handled by the hook
            txSignature={toast.txSignature} // Pass the transaction signature
          />
        </div>
      ))}
      
      {/* Custom animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @media (max-width: 1024px) {
          .animate-slideIn {
            animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
        }
      `}</style>
    </div>
  );
};

export default ToastContainer;
