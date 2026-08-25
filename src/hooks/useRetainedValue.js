import { useEffect, useRef } from "react";

/**
 * Keeps the last non-null value around after `value` clears.
 *
 * Drawers/modals need this: if the parent stops rendering the panel the moment
 * its data goes null, the element unmounts instantly and AnimatePresence never
 * gets to play the exit animation. Retaining the previous value lets the panel
 * keep showing its content while it animates out.
 */
export function useRetainedValue(value) {
  const retained = useRef(value);

  useEffect(() => {
    if (value != null) retained.current = value;
  }, [value]);

  return value != null ? value : retained.current;
}
