import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      onLogin(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div className="card" style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={{ color: "#a0a0b0", marginBottom: "24px" }}>
          Join TechFest 2026 and explore amazing events!
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required autoComplete="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Min 6 characters" required autoComplete="new-password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" required autoComplete="new-password" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "8px" }} disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#a0a0b0" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" },
  card: { maxWidth: "420px", width: "100%" },
  title: { fontSize: "1.8rem", marginBottom: "8px" },
};

export default Register;
