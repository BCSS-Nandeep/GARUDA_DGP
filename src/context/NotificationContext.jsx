import { createContext, useCallback, useContext, useMemo, useState } from "react";

const NotificationContext = createContext(null);

let seq = 0;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    ({ type = "info", title, message, duration = 5000 }) => {
      const id = ++seq;
      setToasts((prev) => [...prev, { id, type, title, message }]);
      if (duration) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      toasts,
      notify,
      dismiss,
      success: (title, message) => notify({ type: "success", title, message }),
      info: (title, message) => notify({ type: "info", title, message }),
      warning: (title, message) => notify({ type: "warning", title, message }),
      error: (title, message) => notify({ type: "error", title, message }),
      critical: (title, message) => notify({ type: "critical", title, message, duration: 8000 }),
    }),
    [toasts, notify, dismiss]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
