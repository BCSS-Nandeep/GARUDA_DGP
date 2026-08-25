import { CheckCircle2, Info, AlertTriangle, XCircle, ShieldAlert, X } from "lucide-react";
import styles from "./ToastContainer.module.css";
import { useNotifications } from "../context/NotificationContext";

const ICONS = { success: CheckCircle2, info: Info, warning: AlertTriangle, error: XCircle, critical: ShieldAlert };

export function ToastContainer() {
  const { toasts, dismiss } = useNotifications();

  if (!toasts.length) return null;

  return (
    <div className={styles.wrap}>
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] || Info;
        return (
          <div key={toast.id} className={[styles.toast, styles[toast.type]].join(" ")}>
            <Icon size={18} strokeWidth={2} className={styles.icon} />
            <div className={styles.body}>
              {toast.title && <div className={styles.title}>{toast.title}</div>}
              {toast.message && <div className={styles.message}>{toast.message}</div>}
            </div>
            <button className={styles.close} onClick={() => dismiss(toast.id)} aria-label="Dismiss">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
