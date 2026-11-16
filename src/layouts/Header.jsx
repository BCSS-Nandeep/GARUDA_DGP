import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import styles from "./Header.module.css";
import { useAuth } from "../context/AuthContext";
import { useClock } from "../hooks/useClock";
import { TOP_NAV_TABS } from "../utils/constants";

export function Header({ onOpenNav }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const clock = useClock();

  return (
    <header className={styles.header}>
      <button className={styles.menuBtn} onClick={onOpenNav} aria-label="Open navigation">
        <Menu size={20} strokeWidth={2} />
      </button>

      <div className={styles.brand}>
        <img className={styles.brandMark} src="/garuda-mark.png" alt="" />
        <div>
          <div className={styles.brandName}>GARUDA</div>
          <div className={styles.brandSub}>GRID-BASED ANALYTICS &amp; REAL-TIME UNIFIED DATA ARCHITECTURE</div>
        </div>
      </div>

      <nav className={styles.center}>
        {TOP_NAV_TABS.map((tab) => (
          <NavLink
            key={tab.key}
            to={tab.path}
            className={({ isActive }) => [styles.navTab, isActive ? styles.navTabActive : ""].filter(Boolean).join(" ")}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.right}>
        <span className={styles.statusDot} />
        <span className={styles.statusText}>SYSTEM ONLINE</span>
        <div className={styles.officerBadge}>
          <span className={styles.officerAvatar}>
            {user.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div className={styles.officerText}>
            <div className={styles.officerName}>{user.name}</div>
            <div className={styles.officerRole}>{user.badge}</div>
          </div>
        </div>
        <div className={styles.clock}>{clock}</div>
        <button
          type="button"
          className={styles.logout}
          aria-label="Sign out"
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
        >
          <LogOut size={16} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
