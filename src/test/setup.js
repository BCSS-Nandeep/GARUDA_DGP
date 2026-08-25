import "@testing-library/jest-dom/vitest";

// jsdom does not implement matchMedia — polyfill it so components that check
// prefers-reduced-motion (or other media queries) don't throw in tests.
// Reduced motion is reported as "on" so GSAP/Framer Motion components render
// their final state synchronously instead of mid-tween.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
