import React from "react";
import { useLocation } from "react-router-dom";
// import WalletAuth from "./WalletAuth";
// import WalletConnectionManager from "./WalletConnectionManager";
// import { useAuth } from "./AuthProvider";
import BSCWalletButton from "./BSCWalletButton";

const UnifiedAuth: React.FC = () => {
  const location = useLocation();

  const showWalletButton =
    location.pathname === "/dashboard" || location.pathname === "/rewards";

  if (!showWalletButton) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      {/* {isAuthenticated ? (
        user?.authMethod === "telegram" ? (
          <WalletConnectionManager />
        ) : (
          <WalletAuth />
        )
      ) : (
        <WalletAuth />
      )} */}
      <BSCWalletButton />
    </div>
  );
};

export default UnifiedAuth;
