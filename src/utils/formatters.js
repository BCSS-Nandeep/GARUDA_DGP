export function maskPhone(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 6) return phone;
  return `${digits.slice(0, 4)}-XXXXXX`;
}

export function maskAccount(account) {
  if (!account) return "";
  const digits = account.replace(/\D/g, "");
  if (digits.length < 4) return account;
  return `XXXX-XXXX-${digits.slice(-4)}`;
}

export function maskGeneric(value, visibleTail = 4) {
  if (!value) return "";
  if (value.length <= visibleTail) return value;
  return `${"X".repeat(Math.max(value.length - visibleTail, 4))}${value.slice(-visibleTail)}`;
}

export function formatRelativeTime(timestamp) {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  if (diffSec < 60) return "just now";
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(timestamp) {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatNumber(value) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatCurrency(value) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value, digits = 0) {
  if (value === null || value === undefined) return "—";
  return `${value.toFixed(digits)}%`;
}

/** Compact Indian currency notation, e.g. ₹4.2Cr / ₹18.5L, for tight KPI tiles. */
export function formatCompactCurrency(value) {
  if (value === null || value === undefined) return "—";
  const crore = 1e7;
  const lakh = 1e5;
  if (Math.abs(value) >= crore) return `₹${(value / crore).toFixed(1)}Cr`;
  if (Math.abs(value) >= lakh) return `₹${(value / lakh).toFixed(1)}L`;
  return formatCurrency(value);
}
