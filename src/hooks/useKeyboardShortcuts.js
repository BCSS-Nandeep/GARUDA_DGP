import { useEffect, useRef } from "react";

const SEQUENCE_WINDOW_MS = 700;

function isTypingTarget(target) {
  const tag = target?.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable;
}

/**
 * Registers global keyboard shortcuts. `bindings` maps a shortcut key to a
 * handler:
 *  - single keys: "/" , "Escape"
 *  - two-key sequences: "g d", "g p", "g n", "g g"
 */
export function useKeyboardShortcuts(bindings) {
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;
  const pendingKeyRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (isTypingTarget(e.target) && e.key !== "Escape") return;

      const single = bindingsRef.current[e.key];
      const pending = pendingKeyRef.current;

      if (pending) {
        const sequence = `${pending} ${e.key.toLowerCase()}`;
        const handler = bindingsRef.current[sequence];
        clearTimeout(timerRef.current);
        pendingKeyRef.current = null;
        if (handler) {
          e.preventDefault();
          handler(e);
          return;
        }
      }

      if (e.key.toLowerCase() === "g" && Object.keys(bindingsRef.current).some((k) => k.startsWith("g "))) {
        pendingKeyRef.current = "g";
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          pendingKeyRef.current = null;
        }, SEQUENCE_WINDOW_MS);
        return;
      }

      if (single) {
        e.preventDefault();
        single(e);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timerRef.current);
    };
  }, []);
}
