import { CalendarClock } from "lucide-react";
import styles from "./Dashboard.module.css";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";

const PHASES = [
  {
    label: "Phase 1 — Foundation & Infrastructure",
    status: "COMPLETE",
    color: "var(--success)",
    pct: 100,
    detail: "GPU servers · VPN/MPLS · Schema design · Security sign-off · Months 1–2",
  },
  {
    label: "Phase 2 — Critical System Integrations",
    status: "72% DONE",
    color: "var(--accent-cyan)",
    pct: 72,
    detail: "CCTNS · ICJS · CDR/IPDR · Unocross · C-DATA · LLM ETL · Months 2–3",
  },
  {
    label: "Phase 3 — Testing, UAT & Hardening",
    status: "PENDING",
    color: "var(--warning)",
    pct: 12,
    detail: "End-to-end testing · UAT · Security audit · Performance benchmark · Months 3–4",
  },
  {
    label: "Phase 4 — Deployment, Training & Handover",
    status: "UPCOMING",
    color: "var(--text-muted)",
    pct: 0,
    detail: "Production go-live · Officer training · 90-day hypercare · Months 4–6",
  },
];

export function ImplementationTimeline() {
  return (
    <Card>
      <SectionHeader icon={CalendarClock} title="Implementation Timeline" description="6-month plan" />
      <div className={styles.phaseList}>
        {PHASES.map((phase) => (
          <div className={styles.phaseWrap} key={phase.label}>
            <div className={styles.phaseLabelRow}>
              <span>{phase.label}</span>
              <span style={{ color: phase.color }}>{phase.status}</span>
            </div>
            <div className={styles.phaseTrack}>
              <div className={styles.phaseFill} style={{ width: `${phase.pct}%`, background: phase.color }} />
            </div>
            <div className={styles.phaseDetail}>{phase.detail}</div>
          </div>
        ))}
      </div>
      <div className={styles.phaseStats}>
        <div className={styles.phaseStatCell}>
          <div className={styles.phaseStatLabel}>Elapsed</div>
          <div className={styles.phaseStatValue} style={{ color: "var(--accent-cyan)" }}>
            72 Days
          </div>
        </div>
        <div className={styles.phaseStatCell}>
          <div className={styles.phaseStatLabel}>Remaining</div>
          <div className={styles.phaseStatValue} style={{ color: "var(--warning)" }}>
            108 Days
          </div>
        </div>
        <div className={styles.phaseStatCell}>
          <div className={styles.phaseStatLabel}>Target Go-Live</div>
          <div className={styles.phaseStatValueSm} style={{ color: "var(--success)" }}>
            Sep 2026
          </div>
        </div>
      </div>
    </Card>
  );
}
