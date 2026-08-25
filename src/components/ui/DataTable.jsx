import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Download } from "lucide-react";
import styles from "./DataTable.module.css";
import { SearchInput } from "./SearchInput";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";
import { SkeletonLines } from "./Skeleton";

function toCsv(columns, rows) {
  const header = columns.map((c) => `"${c.header}"`).join(",");
  const lines = rows.map((row) =>
    columns.map((c) => `"${String(c.value ? c.value(row) : row[c.key] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  return [header, ...lines].join("\n");
}

export function DataTable({
  columns,
  data,
  rowKey = "id",
  searchable = false,
  sortable = false,
  pagination = false,
  pageSize = 10,
  exportable = false,
  exportFilename = "garuda-export.csv",
  onRowClick,
  loading = false,
  emptyTitle = "No records found",
  emptyDescription,
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) => columns.some((c) => String(c.value ? c.value(row) : row[c.key] ?? "").toLowerCase().includes(q)));
  }, [data, query, searchable, columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find((c) => c.key === sortKey);
    return [...filtered].sort((a, b) => {
      const av = col?.value ? col.value(a) : a[sortKey];
      const bv = col?.value ? col.value(b) : b[sortKey];
      if (av === bv) return 0;
      const dir = sortDir === "asc" ? 1 : -1;
      return av > bv ? dir : -dir;
    });
  }, [filtered, sortKey, sortDir, columns]);

  const totalPages = pagination ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const pageRows = pagination ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;

  function toggleSort(key) {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function handleExport() {
    const csv = toCsv(columns, sorted);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = exportFilename;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.wrap}>
      {(searchable || exportable) && (
        <div className={styles.toolbar}>
          {searchable && (
            <SearchInput value={query} onChange={setQuery} placeholder="Filter table..." className={styles.search} />
          )}
          {exportable && (
            <Button variant="secondary" size="sm" icon={Download} onClick={handleExport}>
              Export
            </Button>
          )}
        </div>
      )}
      <div className={styles.scrollWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={sortable && col.sortable !== false ? styles.sortable : ""}
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                >
                  <span className={styles.thContent}>
                    {col.header}
                    {sortable && col.sortable !== false && sortKey === col.key && (
                      sortDir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={columns.length}>
                    <SkeletonLines count={1} />
                  </td>
                </tr>
              ))
            ) : pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row[rowKey]}
                  className={onRowClick ? styles.clickable : ""}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            Page {page} of {totalPages} — {sorted.length} records
          </span>
          <div className={styles.pageBtns}>
            <Button variant="ghost" size="sm" icon={ChevronLeft} disabled={page === 1} onClick={() => setPage((p) => p - 1)} />
            <Button variant="ghost" size="sm" icon={ChevronRight} disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} />
          </div>
        </div>
      )}
    </div>
  );
}
