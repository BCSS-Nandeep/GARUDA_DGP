import { createContext, useContext, useMemo, useState } from "react";
import { currentOfficer } from "../data/usersData";
import { LOGIN_ACCOUNT } from "../data/credentials";
import { roleHasPermission } from "../utils/permissions";

const SESSION_KEY = "garuda.auth";

export const AuthContext = createContext(null);

function readSession() {
  return localStorage.getItem(SESSION_KEY) === "1" ? currentOfficer : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession);

  const value = useMemo(
    () => ({
      user,
      hasPermission: (permission) => (user ? roleHasPermission(user.role, permission) : false),
      login(username, password) {
        const nameOk = username.trim().toLowerCase() === LOGIN_ACCOUNT.username;
        const passwordOk = password === LOGIN_ACCOUNT.password;
        if (!nameOk || !passwordOk) return false;
        localStorage.setItem(SESSION_KEY, "1");
        setUser(currentOfficer);
        return true;
      },
      logout() {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
