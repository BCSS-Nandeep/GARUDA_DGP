import styles from "./Card.module.css";

export function Card({ children, padded = true, hoverable = false, className = "", as: Component = "div", ...rest }) {
  return (
    <Component
      className={[styles.card, padded ? styles.padded : "", hoverable ? styles.hoverable : "", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Component>
  );
}
