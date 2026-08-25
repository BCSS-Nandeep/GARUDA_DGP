import styles from "./Button.module.css";

const VARIANTS = ["primary", "secondary", "ghost", "danger", "outline", "gold", "green"];

export function Button({
  variant = "secondary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  className = "",
  ...rest
}) {
  const variantClass = VARIANTS.includes(variant) ? variant : "secondary";
  return (
    <button
      className={[styles.btn, styles[variantClass], styles[size], fullWidth ? styles.fullWidth : "", className]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        Icon && iconPosition === "left" && <Icon size={16} strokeWidth={2} />
      )}
      {children && <span>{children}</span>}
      {!loading && Icon && iconPosition === "right" && <Icon size={16} strokeWidth={2} />}
    </button>
  );
}
