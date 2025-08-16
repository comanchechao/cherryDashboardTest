import React from "react";

/**
 * A hidden wallet modal button that uses Reown AppKit's web component
 */
const WalletModalButton: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "-9999px",
        left: "-9999px",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <appkit-button />
    </div>
  );
};

export default WalletModalButton;
