import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import styles from "./Breadcrumbs.module.css";

export function Breadcrumbs({ items }) {
  return (
    <nav className={styles.wrap} aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className={styles.crumb}>
            {item.path && !isLast ? (
              <Link to={item.path} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? styles.current : ""}>{item.label}</span>
            )}
            {!isLast && <ChevronRight size={12} className={styles.sep} />}
          </span>
        );
      })}
    </nav>
  );
}
