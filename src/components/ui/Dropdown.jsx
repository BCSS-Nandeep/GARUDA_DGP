import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import styles from "./Dropdown.module.css";

export function Dropdown({ label, options, value, onChange, icon: Icon }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className={styles.wrap} ref={ref}>
      <button className={styles.trigger} onClick={() => setOpen((v) => !v)}>
        {Icon && <Icon size={14} strokeWidth={2} />}
        <span className={styles.triggerLabel}>{selected ? selected.label : label}</span>
        <ChevronDown size={14} strokeWidth={2} className={[styles.chevron, open ? styles.open : ""].join(" ")} />
      </button>
      {open && (
        <div className={styles.menu} role="listbox">
          {options.map((opt) => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={[styles.item, opt.value === value ? styles.itemActive : ""].filter(Boolean).join(" ")}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
              {opt.value === value && <Check size={14} strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
