import styles from "./Skeleton.module.css";

export function Skeleton({ width = "100%", height = 16, radius = 6, className = "" }) {
  return (
    <span
      className={[styles.skeleton, className].filter(Boolean).join(" ")}
      style={{ width, height, borderRadius: radius }}
    />
  );
}

export function SkeletonLines({ count = 3, gap = 8 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} width={i === count - 1 ? "60%" : "100%"} />
      ))}
    </div>
  );
}
