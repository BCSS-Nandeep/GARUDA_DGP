import { usePermission } from "../../hooks/usePermission";

/**
 * UI-level authorization gate. Hides UI the current role cannot use.
 * This is a UX convenience only — the backend must enforce authorization
 * independently; hiding a button here is not a security boundary.
 */
export function PermissionGate({ permission, fallback = null, children }) {
  const allowed = usePermission(permission);
  return allowed ? children : fallback;
}
