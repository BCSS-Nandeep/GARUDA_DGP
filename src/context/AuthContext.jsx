import { createContext, useContext, useMemo } from "react";
import { currentOfficer } from "../data/usersData";
import { roleHasPermission } from "../utils/permissions";

export const AuthContext = createContext(null);

// GARUDA runs as a single-officer terminal — no login/session flow.
export function AuthProvider({ children }) {
  const value = useMemo(
    () => ({
      user: currentOfficer,
      hasPermission: (permission) => roleHasPermission(currentOfficer.role, permission),
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
