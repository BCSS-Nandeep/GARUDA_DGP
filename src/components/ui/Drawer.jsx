import { useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Drawer.module.css";
import { IconButton } from "./IconButton";

export function Drawer({ open, onClose, title, subtitle, children, footer, width = 440 }) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className={styles.drawer}
            style={{ width }}
            role="dialog"
            aria-modal="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.header}>
              <div>
                <h2 className={styles.title}>{title}</h2>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
              <IconButton icon={X} label="Close" onClick={onClose} />
            </div>
            <div className={styles.body}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
