import React, { ReactNode } from "react";

interface AuthenticationModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  onSuccess: () => void;
}

const defaultValue: AuthenticationModalContextType = {
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  onSuccess: () => {},
};

const AuthenticationModalContext = React.createContext<
  AuthenticationModalContextType | undefined
>(undefined);

export const AuthenticationModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AuthenticationModalContext.Provider value={defaultValue}>
      {children}
    </AuthenticationModalContext.Provider>
  );
};

export const useAuthenticationModal = (): AuthenticationModalContextType => {
  const context = React.useContext(AuthenticationModalContext);
  if (!context) return defaultValue;
  return context;
};
