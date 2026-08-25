import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../utils/motion";

/**
 * Reveals a panel (fade + rise) once on mount via GSAP.
 * `delay` lets a group of panels stagger relative to each other.
 */
export function useRevealOnMount({ delay = 0, y = 22, duration = 0.6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: "all" });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration, delay, ease: "power3.out" }
    );

    return () => tween.kill();
  }, [delay, y, duration]);

  return ref;
}
