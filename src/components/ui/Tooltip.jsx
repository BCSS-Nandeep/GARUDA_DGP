import { useState } from "react";
import styles from "./Tooltip.module.css";

export function Tooltip({ content, children, side = "top" }) {
  const [visible, setVisible] = useState(false);

  if (!content) return children;

  return (
    <span
      className={styles.wrap}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && <span className={[styles.bubble, styles[side]].join(" ")}>{content}</span>}
    </span>
  );
}
