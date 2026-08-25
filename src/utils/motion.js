/**
 * Single source of truth for the reduced-motion check. Guarded so it is safe
 * in jsdom/SSR contexts where matchMedia may be missing.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
