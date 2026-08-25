import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import styles from "./AmbientBackdrop.module.css";
import { hasWebGL } from "../../utils/webgl";

// Everything that touches "three"/"@react-three/fiber" lives in this one
// lazily-loaded chunk so the (large) 3D stack never enters the critical
// initial bundle — it loads in the background after first paint.
const AmbientScene = lazy(() => import("./AmbientScene"));

/**
 * Subtle ambient 3D backdrop — a slow-drifting field of data-node particles
 * with soft bloom, sitting behind all page content. Degrades to nothing if
 * WebGL is unavailable; stops drifting (but still renders) if the user
 * prefers reduced motion.
 */
export function AmbientBackdrop() {
  const [supported, setSupported] = useState(false);
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  if (!supported) return null;

  return (
    <div className={styles.wrap} aria-hidden="true">
      <Suspense fallback={null}>
        <AmbientScene animate={!reduceMotion} />
      </Suspense>
    </div>
  );
}
