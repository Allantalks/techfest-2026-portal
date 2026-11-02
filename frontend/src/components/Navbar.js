import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>&#9889;</span> TechFest 2026
        </Link>

        {/* Hamburger for mobile */}
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>

        <div style={{ ...styles.links, ...(menuOpen ? styles.linksOpen : {}) }}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/events" style={styles.link}>Events</Link>
          <Link to="/gallery" style={styles.link}>Gallery</Link>
          <Link to="/about" style={styles.link}>About</Link>

          {user ? (
            <div style={styles.userSection}>
              <span style={styles.userName}>Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: "6px 16px", fontSize: "0.85rem" }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={styles.userSection}>
              <Link to="/login" className="btn btn-secondary" style={{ padding: "6px 16px", fontSize: "0.85rem" }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: "6px 16px", fontSize: "0.85rem" }}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#16213e",
    padding: "12px 0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#6c63ff",
    textDecoration: "none",
  },
  logoIcon: { marginRight: "8px" },
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  linksOpen: {},
  link: {
    color: "#a0a0b0",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginLeft: "10px",
  },
  userName: {
    color: "#6c63ff",
    fontWeight: "500",
  },
};

export default Navbar;
