import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Welcome to <span style={{ color: "#6c63ff" }}>TechFest 2026</span>
        </h1>
        <p style={styles.heroSubtitle}>
          The ultimate college tech festival featuring workshops, hackathons,
          competitions, and more!
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/events" className="btn btn-primary">
            Explore Events
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>What Awaits You</h2>
        <div style={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className="card" style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={{ marginBottom: "8px" }}>{feature.title}</h3>
              <p style={{ color: "#a0a0b0" }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.stats}>
        <div style={styles.statItem}>
          <h2 style={{ color: "#6c63ff", fontSize: "2.5rem" }}>50+</h2>
          <p style={{ color: "#a0a0b0" }}>Events</p>
        </div>
        <div style={styles.statItem}>
          <h2 style={{ color: "#ff6584", fontSize: "2.5rem" }}>2000+</h2>
          <p style={{ color: "#a0a0b0" }}>Participants</p>
        </div>
        <div style={styles.statItem}>
          <h2 style={{ color: "#00c853", fontSize: "2.5rem" }}>Rs 5L+</h2>
          <p style={{ color: "#a0a0b0" }}>Prize Pool</p>
        </div>
        <div style={styles.statItem}>
          <h2 style={{ color: "#ffc107", fontSize: "2.5rem" }}>3</h2>
          <p style={{ color: "#a0a0b0" }}>Days</p>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: "💻",
    title: "Hackathons",
    description: "24-hour coding challenges with industry-level problem statements.",
  },
  {
    icon: "🎓",
    title: "Workshops",
    description: "Hands-on sessions on AI, Web3, Cloud Computing, and more.",
  },
  {
    icon: "🏆",
    title: "Competitions",
    description: "Coding contests, CTFs, robotics, and design challenges.",
  },
  {
    icon: "🎤",
    title: "Seminars",
    description: "Talks by industry leaders and tech innovators.",
  },
  {
    icon: "🎨",
    title: "Cultural Events",
    description: "Music, art, and creative showcases alongside tech.",
  },
  {
    icon: "🤝",
    title: "Networking",
    description: "Connect with peers, mentors, and recruiters.",
  },
];

const styles = {
  hero: {
    textAlign: "center",
    padding: "80px 20px",
    background: "linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0f3460 100%)",
    borderRadius: "16px",
    marginBottom: "40px",
  },
  heroTitle: { fontSize: "2.8rem", marginBottom: "16px" },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#a0a0b0",
    maxWidth: "600px",
    margin: "0 auto 30px",
  },
  features: { marginBottom: "40px" },
  sectionTitle: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "30px",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  featureCard: { textAlign: "center" },
  featureIcon: { fontSize: "2.5rem", marginBottom: "12px" },
  stats: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "40px 0",
    background: "#16213e",
    borderRadius: "16px",
  },
  statItem: { textAlign: "center", padding: "20px" },
};

export default Home;
