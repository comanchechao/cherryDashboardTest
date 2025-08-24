import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import SolanaWalletProvider from "./components/WalletProvider";
import { AuthProvider } from "./components/AuthProvider";
import { AuthenticationModalProvider } from "./contexts/AuthenticationModalContext";
import App from "./App.tsx";
import "./css/cherry.css";
import "./css/cherrybot.css";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SolanaWalletProvider>
        <AuthProvider>
          <AuthenticationModalProvider>
            <App />
          </AuthenticationModalProvider>
        </AuthProvider>
      </SolanaWalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);
