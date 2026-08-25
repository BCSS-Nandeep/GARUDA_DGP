import { Calendar } from "lucide-react";
import styles from "./DatePicker.module.css";

export function DatePicker({ value, onChange, label }) {
  return (
    <label className={styles.wrap}>
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.inputWrap}>
        <Calendar size={14} strokeWidth={2} className={styles.icon} />
        <input type="date" className={styles.input} value={value || ""} onChange={(e) => onChange(e.target.value)} />
      </span>
    </label>
  );
}
