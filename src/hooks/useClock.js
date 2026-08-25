import { useEffect, useState } from "react";

function format(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/** Real-time HH:MM:SS clock, ticking every second. */
export function useClock() {
  const [time, setTime] = useState(() => format(new Date()));

  useEffect(() => {
    const timer = setInterval(() => setTime(format(new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}
