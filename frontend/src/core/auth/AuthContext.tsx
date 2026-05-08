import { createContext, useContext, useMemo, type ReactNode } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  user: null;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  user: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AuthContextValue>(() => ({ isAuthenticated: false, user: null }), []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
