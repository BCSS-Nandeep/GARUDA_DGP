import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Sidebar.module.css";
import { NAV_GROUPS } from "../utils/constants";
import { useSidebarLinks } from "../context/SidebarLinksContext";
import { useAlertsBadge } from "../hooks/useAlertsBadge";

const OPEN_KEY = "garuda.sidebarOpen";

function Item({ item, onNavigate, linkLabel = false, badgeValue }) {
  const Icon = Icons[item.icon] || Icons.AppWindow;
  return (
    <NavLink
      to={item.path}
      title={item.label}
      onClick={onNavigate}
      className={({ isActive }) => [styles.navItem, isActive ? styles.active : ""].filter(Boolean).join(" ")}
    >
      <Icon size={18} strokeWidth={2} className={styles.navIcon} />
      <span className={[styles.navLabel, linkLabel ? styles.linkLabel : ""].filter(Boolean).join(" ")}>
        {item.label}
        {badgeValue > 0 && <span className={styles.navBadge}>{badgeValue}</span>}
      </span>
    </NavLink>
  );
}

function NavItems({ links, unreadAlerts, onNavigate }) {
  const [primary, middle, footer] = NAV_GROUPS;
  return (
    <nav className={styles.nav}>
      <div className={styles.group}>
        {primary.items.map((item) => (
          <Item key={item.key} item={item} onNavigate={onNavigate} />
        ))}
      </div>

      {links.length > 0 && (
        <div className={styles.group}>
          <div className={styles.divider} />
          {links.map((link) => (
            <Item
              key={link.id}
              linkLabel
              onNavigate={onNavigate}
              item={{ key: link.id, label: link.name, path: `/links/${link.id}`, icon: "AppWindow" }}
            />
          ))}
        </div>
      )}

      <div className={styles.group}>
        <div className={styles.divider} />
        {middle.items.map((item) => (
          <Item key={item.key} item={item} onNavigate={onNavigate} />
        ))}
      </div>

      <div className={styles.group}>
        <div className={styles.divider} />
        {footer.items.map((item) => (
          <Item
            key={item.key}
            item={item}
            onNavigate={onNavigate}
            badgeValue={item.badgeKey === "alerts" ? unreadAlerts : undefined}
          />
        ))}
      </div>
    </nav>
  );
}

function ToggleButton({ open, onClick }) {
  const Icon = open ? Icons.ChevronsLeft : Icons.ChevronsRight;
  return (
    <button type="button" className={styles.toggle} onClick={onClick} aria-label={open ? "Close sidebar" : "Open sidebar"}>
      <Icon size={18} strokeWidth={2} className={styles.navIcon} />
      <span className={styles.navLabel}>{open ? "Close" : "Open"}</span>
    </button>
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }) {
  const { links } = useSidebarLinks();
  const unreadAlerts = useAlertsBadge();
  const location = useLocation();
  const [open, setOpen] = useState(() => localStorage.getItem(OPEN_KEY) !== "0");

  useEffect(() => {
    localStorage.setItem(OPEN_KEY, open ? "1" : "0");
  }, [open]);

  useEffect(() => {
    onCloseMobile?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <aside className={[styles.sidebar, open ? styles.sidebarOpen : ""].filter(Boolean).join(" ")}>
        <NavItems links={links} unreadAlerts={unreadAlerts} />
        <ToggleButton open={open} onClick={() => setOpen((value) => !value)} />
      </aside>

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
              <NavItems links={links} unreadAlerts={unreadAlerts} onNavigate={onCloseMobile} />
              <ToggleButton open onClick={onCloseMobile} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
