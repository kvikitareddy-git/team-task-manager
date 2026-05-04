import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bg}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.card}
      >
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <div className="inputGroup">
          <input required onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <label>Email</label>
        </div>

        <div className="inputGroup">
          <input type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <label>Password</label>
        </div>

        <motion.button whileHover={{ scale: 1.05 }} style={styles.button} onClick={handleLogin}>
          Login
        </motion.button>

        <p>
          New user? <Link to="/signup">Signup</Link>
        </p>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  bg: {
    position: "absolute",
    width: "200%",
    height: "200%",
    background: "linear-gradient(45deg,#4facfe,#00f2fe,#43e97b,#38f9d7)",
    animation: "gradientMove 12s infinite linear",
    zIndex: -1,
  },
  card: {
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.2)",
    padding: 40,
    borderRadius: 16,
    width: 320,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },
  title: { textAlign: "center", color: "#fff" },
  button: {
    padding: 12,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};