import { Search, X } from "lucide-react";
import styles from "./SearchInput.module.css";

export function SearchInput({ value, onChange, placeholder = "Search...", onSubmit, autoFocus, className = "", inputRef }) {
  return (
    <form
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
    >
      <Search size={16} strokeWidth={2} className={styles.icon} />
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        type="text"
      />
      {value && (
        <button type="button" className={styles.clear} onClick={() => onChange("")} aria-label="Clear search">
          <X size={14} strokeWidth={2} />
        </button>
      )}
    </form>
  );
}
