import { Handle, Position } from "reactflow";
import { User, Car, Phone, Landmark, Building2, FileText, MapPin } from "lucide-react";
import styles from "./NetworkAnalysis.module.css";

const ICONS = { PERSON: User, VEHICLE: Car, PHONE: Phone, BANK: Landmark, COMPANY: Building2, CASE: FileText, LOCATION: MapPin };
const RISK_TONE = { CRITICAL: "danger", HIGH: "warning", MODERATE: "info", LOW: "success" };

function EntityNode({ data, selected }) {
  const Icon = ICONS[data.type] || User;
  const tone = RISK_TONE[data.risk] || "neutral";

  return (
    <div
      className={[styles.node, styles[tone], selected ? styles.nodeSelected : "", data.dimmed ? styles.nodeDimmed : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <Handle type="target" position={Position.Top} className={styles.handle} />
      <span className={styles.nodeIcon}>
        <Icon size={14} strokeWidth={2} />
      </span>
      <div className={styles.nodeText}>
        <span className={styles.nodeType}>{data.type}</span>
        <span className={styles.nodeLabel}>{data.label}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className={styles.handle} />
    </div>
  );
}

export const nodeTypes = { entityNode: EntityNode };
