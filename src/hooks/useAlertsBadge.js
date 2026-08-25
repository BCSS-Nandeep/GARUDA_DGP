import { useEffect, useState } from "react";
import { getAlerts } from "../services/alertService";

/** Polls the unread alert count for the sidebar/header badges. */
export function useAlertsBadge(intervalMs = 30000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      const alerts = await getAlerts();
      if (active) setCount(alerts.filter((a) => a.status === "unread").length);
    }
    load();
    const timer = setInterval(load, intervalMs);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [intervalMs]);

  return count;
}
