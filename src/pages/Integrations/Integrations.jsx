import { useState } from "react";
import { Pencil, Plug, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useSidebarLinks } from "../../context/SidebarLinksContext";
import styles from "./Integrations.module.css";

export function Integrations() {
  const navigate = useNavigate();
  const { links, addLink, updateLink, removeLink } = useSidebarLinks();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  function resetForm() {
    setName("");
    setUrl("");
    setEditingId(null);
    setError("");
  }

  function onSubmit(event) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Enter a name for the sidebar.");
      return;
    }
    try {
      const item = editingId ? updateLink(editingId, name, url) : addLink(name, url);
      resetForm();
      navigate(`/links/${item.id}`);
    } catch {
      setError("Enter a valid http or https URL.");
    }
  }

  function startEdit(link) {
    setEditingId(link.id);
    setName(link.name);
    setUrl(link.url);
    setError("");
  }

  return (
    <div>
      <PageHeader
        icon={Plug}
        title="Integrations"
        description="Add a name and URL. The name appears in the sidebar and opens that URL."
      />

      <Card>
        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            <input
              className={styles.input}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="CCTNS"
              maxLength={40}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>URL</span>
            <input
              className={styles.input}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com"
              inputMode="url"
            />
          </label>
          <div className={styles.formActions}>
            <Button type="submit" variant="primary">
              {editingId ? "Save" : "Add to sidebar"}
            </Button>
            {editingId && (
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </Card>

      <div className={styles.list}>
        {links.length === 0 && <p className={styles.empty}>No links yet. Added names show up in the sidebar.</p>}
        {links.map((link) => (
          <div key={link.id} className={styles.row}>
            <button type="button" className={styles.rowMain} onClick={() => navigate(`/links/${link.id}`)}>
              <span className={styles.rowName}>{link.name}</span>
              <span className={styles.rowUrl}>{link.url}</span>
            </button>
            <div className={styles.rowActions}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={Pencil}
                aria-label={`Edit ${link.name}`}
                onClick={() => startEdit(link)}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                icon={Trash2}
                aria-label={`Remove ${link.name}`}
                onClick={() => {
                  if (editingId === link.id) resetForm();
                  removeLink(link.id);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
