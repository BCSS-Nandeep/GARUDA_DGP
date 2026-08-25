import { useEffect } from "react";
import * as Icons from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Sidebar.module.css";
import { NAV_GROUPS } from "../utils/constants";
import { useAlertsBadge } from "../hooks/useAlertsBadge";

function NavItems({ unreadAlerts, onNavigate }) {
  return (
    <nav className={styles.nav}>
      {NAV_GROUPS.map((group, i) => (
        <div key={i} className={styles.group}>
          {i > 0 && <div className={styles.divider} />}
          {group.items.map((item) => {
            const Icon = Icons[item.icon];
            const badgeValue = item.badgeKey === "alerts" ? unreadAlerts : undefined;
            return (
              <NavLink
                key={item.key}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) => [styles.navItem, isActive ? styles.active : ""].filter(Boolean).join(" ")}
              >
                <Icon size={18} strokeWidth={2} className={styles.navIcon} />
                <span className={styles.navLabel}>
                  {item.label}
                  {badgeValue > 0 && <span className={styles.navBadge}>{badgeValue}</span>}
                </span>
              </NavLink>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }) {
  const unreadAlerts = useAlertsBadge();
  const location = useLocation();

  // Close the mobile overlay whenever the route changes.
  useEffect(() => {
    onCloseMobile?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      {/* Desktop/laptop rail — hover to expand. */}
      <aside className={styles.sidebar}>
        <NavItems unreadAlerts={unreadAlerts} />
      </aside>

      {/* Tablet/mobile overlay drawer. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => e.target === e.currentTarget && onCloseMobile?.()}
          >
            <motion.aside
              className={styles.mobileDrawer}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <NavItems unreadAlerts={unreadAlerts} onNavigate={onCloseMobile} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
