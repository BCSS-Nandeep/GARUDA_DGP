import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
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
          <span className={styles.passwordWrap}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.eye}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
            </button>
          </span>
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit" variant="primary" fullWidth>
          Sign in
        </Button>
      </form>
    </main>
  );
}
