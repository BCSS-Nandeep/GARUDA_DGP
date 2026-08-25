export function EagleLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <polygon points="18,2 32,10 32,26 18,34 4,26 4,10" fill="none" stroke="#00d4ff" strokeWidth="0.75" opacity="0.4" />
      <polygon points="18,5 29,11.5 29,24.5 18,31 7,24.5 7,11.5" fill="rgba(0,212,255,0.06)" />
      <path d="M4,16 Q9,12 14,14 L18,18 L14,22 Q9,24 4,20Z" fill="rgba(0,212,255,0.3)" stroke="#00d4ff" strokeWidth="0.5" />
      <path d="M32,16 Q27,12 22,14 L18,18 L22,22 Q27,24 32,20Z" fill="rgba(0,212,255,0.3)" stroke="#00d4ff" strokeWidth="0.5" />
      <ellipse cx="18" cy="18" rx="5" ry="7" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="0.75" />
      <circle cx="18" cy="11" r="3" fill="rgba(0,212,255,0.2)" stroke="#00d4ff" strokeWidth="0.75" />
      <path d="M18,14 L20,15.5 L18,15" fill="#00d4ff" />
      <circle cx="19" cy="10.5" r="0.8" fill="#00d4ff" />
      <path d="M15,25 L13,28 M17,25 L16,28 M19,25 L19,28 M21,25 L22,28" stroke="#00d4ff" strokeWidth="0.75" />
    </svg>
  );
}
