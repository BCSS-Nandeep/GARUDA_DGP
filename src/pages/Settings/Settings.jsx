import { useState } from "react";
import { Settings as SettingsIcon, ShieldCheck, Bell, Monitor, KeyRound, Server } from "lucide-react";
import styles from "./Settings.module.css";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Dropdown } from "../../components/ui/Dropdown";
import { PermissionGate } from "../../components/ui/PermissionGate";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";

function Toggle({ checked, onChange, label, description }) {
  return (
    <label className={styles.toggleRow}>
      <div>
        <div className={styles.toggleLabel}>{label}</div>
        {description && <div className={styles.toggleDescription}>{description}</div>}
      </div>
      <span className={[styles.switch, checked ? styles.switchOn : ""].join(" ")} onClick={() => onChange(!checked)}>
        <span className={styles.switchThumb} />
      </span>
    </label>
  );
}

export function Settings() {
  const { user } = useAuth();
  const notifications = useNotifications();

  const [prefs, setPrefs] = useState({ landing: "/dashboard", pageSize: "10" });
  const [notifPrefs, setNotifPrefs] = useState({ critical: true, high: true, medium: false, info: false });
  const [security, setSecurity] = useState({ mfa: true });
  const [display, setDisplay] = useState({ compact: false, sidebarCollapsed: false });

  return (
    <div>
      <PageHeader icon={SettingsIcon} title="Settings" description="Manage your profile, preferences, notifications, and security options." />

      <div className={styles.grid}>
        <Card>
          <SectionHeader icon={ShieldCheck} title="Profile" />
          <div className={styles.profileRow}>
            <span className={styles.avatar}>
              {user?.name
                ?.split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <div className={styles.profileName}>{user?.name}</div>
              <div className={styles.profileMeta}>{user?.role}</div>
            </div>
          </div>
          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Badge Number</span>
              <span className={styles.fieldValue}>{user?.badge}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Station / Unit</span>
              <span className={styles.fieldValue}>{user?.station}</span>
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeader icon={Monitor} title="Preferences" />
          <div className={styles.prefRow}>
            <span>Default landing page</span>
            <Dropdown
              value={prefs.landing}
              onChange={(v) => setPrefs((p) => ({ ...p, landing: v }))}
              options={[
                { value: "/dashboard", label: "Dashboard" },
                { value: "/profile-search", label: "Profile Search" },
                { value: "/alerts", label: "Alerts" },
              ]}
            />
          </div>
          <div className={styles.prefRow}>
            <span>Results per page</span>
            <Dropdown
              value={prefs.pageSize}
              onChange={(v) => setPrefs((p) => ({ ...p, pageSize: v }))}
              options={[
                { value: "10", label: "10" },
                { value: "25", label: "25" },
                { value: "50", label: "50" },
              ]}
            />
          </div>
        </Card>

        <Card>
          <SectionHeader icon={Bell} title="Notifications" />
          <Toggle
            label="Critical alerts"
            description="Geo-fence breaches, warrant executions"
            checked={notifPrefs.critical}
            onChange={(v) => setNotifPrefs((p) => ({ ...p, critical: v }))}
          />
          <Toggle
            label="High severity alerts"
            checked={notifPrefs.high}
            onChange={(v) => setNotifPrefs((p) => ({ ...p, high: v }))}
          />
          <Toggle
            label="Medium severity alerts"
            checked={notifPrefs.medium}
            onChange={(v) => setNotifPrefs((p) => ({ ...p, medium: v }))}
          />
          <Toggle
            label="Informational alerts"
            checked={notifPrefs.info}
            onChange={(v) => setNotifPrefs((p) => ({ ...p, info: v }))}
          />
        </Card>

        <Card>
          <SectionHeader icon={KeyRound} title="Security" />
          <Toggle
            label="Multi-factor authentication"
            description="Require a second factor at login"
            checked={security.mfa}
            onChange={(v) => setSecurity((s) => ({ ...s, mfa: v }))}
          />
          <div className={styles.prefRow}>
            <span>Session timeout</span>
            <Badge tone="neutral">30 minutes</Badge>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => notifications.info("Password reset", "A reset link would be sent to your registered account")}
          >
            Change password
          </Button>
        </Card>

        <Card>
          <SectionHeader title="Session" />
          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Device</span>
              <span className={styles.fieldValue}>WKS-HYD-014</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Signed in</span>
              <span className={styles.fieldValue}>Today, 09:14</span>
            </div>
          </div>
          <Button variant="danger" size="sm" onClick={() => notifications.success("Other sessions signed out")}>
            Sign out all other sessions
          </Button>
        </Card>

        <Card>
          <SectionHeader title="Display" />
          <Toggle
            label="Compact density"
            description="Reduce spacing in tables and lists"
            checked={display.compact}
            onChange={(v) => setDisplay((d) => ({ ...d, compact: v }))}
          />
          <Toggle
            label="Collapse sidebar by default"
            checked={display.sidebarCollapsed}
            onChange={(v) => setDisplay((d) => ({ ...d, sidebarCollapsed: v }))}
          />
        </Card>

        <PermissionGate permission="settings.admin">
          <Card className={styles.adminCard}>
            <SectionHeader icon={Server} title="System Configuration" description="Administrator only" />
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Environment</span>
                <span className={styles.fieldValue}>{import.meta.env.VITE_APP_ENV || "development"}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>API Base URL</span>
                <span className={styles.fieldValue}>{import.meta.env.VITE_API_BASE_URL || "/api"}</span>
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => notifications.info("Opens role & permission management")}>
              Manage Roles &amp; Permissions
            </Button>
          </Card>
        </PermissionGate>
      </div>
    </div>
  );
}
