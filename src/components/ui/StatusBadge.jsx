import styles from "./StatusBadge.module.css";

const STATUS_MAP = {
  ONLINE: { tone: "success", label: "Online" },
  HEALTHY: { tone: "success", label: "Healthy" },
  ACTIVE: { tone: "success", label: "Active" },
  COMPLETE: { tone: "success", label: "Complete" },
  SUCCESS: { tone: "success", label: "Success" },
  WRITTEN: { tone: "success", label: "Written" },
  UPDATED: { tone: "success", label: "Updated" },
  PASSED: { tone: "success", label: "Passed" },

  DEGRADED: { tone: "warning", label: "Degraded" },
  WARNING: { tone: "warning", label: "Warning" },
  PROCESSING: { tone: "warning", label: "Processing" },
  PENDING: { tone: "warning", label: "Pending" },
  REVIEW_REQUIRED: { tone: "warning", label: "Review Required" },

  OFFLINE: { tone: "danger", label: "Offline" },
  CRITICAL: { tone: "danger", label: "Critical" },
  FAILED: { tone: "danger", label: "Failed" },
  DENIED: { tone: "danger", label: "Denied" },
  NOT_WRITTEN: { tone: "danger", label: "Not Written" },
  NOT_UPDATED: { tone: "danger", label: "Not Updated" },

  INFO: { tone: "info", label: "Info" },
  SYNCING: { tone: "info", label: "Syncing" },
  UNKNOWN: { tone: "neutral", label: "Unknown" },
};

export function StatusBadge({ status, label, size = "md" }) {
  const meta = STATUS_MAP[status] || { tone: "neutral", label: status };
  return (
    <span className={[styles.wrap, styles[meta.tone], styles[size]].join(" ")}>
      <span className={styles.dot} />
      {label || meta.label}
    </span>
  );
}
