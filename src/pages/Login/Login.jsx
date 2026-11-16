import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

export function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  function onSubmit(event) {
    event.preventDefault();
    const ok = login(username, password);
    if (!ok) {
      setError("Those credentials were not recognized.");
      return;
    }
    const next = location.state?.from?.pathname || "/dashboard";
    navigate(next, { replace: true });
  }

  return (
    <main className={styles.page}>
      <form className={styles.card} onSubmit={onSubmit}>
        <img className={styles.mark} src="/garuda-mark.png" alt="GARUDA" />
        <p className={styles.sub}>Intelligence Platform</p>
        <label className={styles.field}>
          <span>User ID</span>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            autoFocus
          />
        </label>
        <label className={styles.field}>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit" variant="primary" fullWidth>
          Sign in
        </Button>
      </form>
    </main>
  );
}
