import { useEffect, useState } from "react";
import { Check, Loader2, TriangleAlert, Circle } from "lucide-react";
import styles from "./QueryOrchestration.module.css";
import { Card } from "../../components/ui/Card";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { searchSystems } from "../../data/profileData";

export function QueryOrchestration({ progressBySystem, elapsedMs, complete, recordsReturned }) {
  const completedCount = Object.keys(progressBySystem).length;

  return (
    <Card>
      <div className={styles.header}>
        <span className={styles.title}>{complete ? "Query complete" : "Initializing intelligence query..."}</span>
        <span className={styles.elapsed}>{(elapsedMs / 1000).toFixed(1)}s elapsed</span>
      </div>
      <ProgressBar value={completedCount} max={searchSystems.length} tone={complete ? "success" : "cyan"} showLabel />
      <div className={styles.grid}>
        {searchSystems.map((sys) => {
          const state = progressBySystem[sys.key];
          const Icon = !state ? Circle : state.status === "DEGRADED" ? TriangleAlert : Check;
          return (
            <div
              key={sys.key}
              className={[styles.row, state ? (state.status === "DEGRADED" ? styles.degraded : styles.done) : styles.pending].join(" ")}
            >
              {!state ? <Loader2 size={14} className={styles.spin} /> : <Icon size={14} strokeWidth={2.5} />}
              <span>{sys.label}</span>
            </div>
          );
        })}
      </div>
      {complete && (
        <div className={styles.summary}>
          {searchSystems.length} systems queried · {recordsReturned} records returned
        </div>
      )}
    </Card>
  );
}
