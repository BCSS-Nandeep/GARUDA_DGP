import { useAuth } from "../context/AuthContext";

export function usePermission(permission) {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
}
