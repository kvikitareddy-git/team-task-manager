import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful 🎉");
      navigate("/");
    } catch {
      alert("Signup failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bg}></div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <h2 style={styles.title}>Create Account 🚀</h2>

        <div className="inputGroup">
          <input required onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <label>Name</label>
        </div>

        <div className="inputGroup">
          <input required onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <label>Email</label>
        </div>

        <div className="inputGroup">
          <input type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <label>Password</label>
        </div>

        <motion.button whileHover={{ scale: 1.05 }} style={styles.button} onClick={handleSignup}>
          Signup
        </motion.button>

        <p>
          Already have account? <Link to="/">Login</Link>
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
    background: "linear-gradient(45deg,#43e97b,#38f9d7,#4facfe,#00f2fe)",
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
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};