import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Events = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      // Use sample data if API is unavailable
      setEvents(sampleEvents);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = filter === "all"
    ? events
    : events.filter((e) => e.category === filter);

  if (loading) return <div className="spinner"></div>;

  return (
    <div>
      <h1 style={{ marginBottom: "8px" }}>Events</h1>
      <p style={{ color: "#a0a0b0", marginBottom: "24px" }}>
        Browse and register for exciting tech events
      </p>

      {/* Category Filter */}
      <div style={styles.filterBar}>
        {["all", "workshop", "hackathon", "seminar", "competition", "cultural"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              ...styles.filterBtn,
              ...(filter === cat ? styles.filterBtnActive : {}),
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Event Grid */}
      <div style={styles.grid}>
        {filteredEvents.map((event) => (
          <div key={event._id || event.id} className="card">
            <div style={styles.badge}>{event.category}</div>
            <h3 style={{ marginBottom: "8px" }}>{event.title}</h3>
            {/* XSS SAFE: React auto-escapes text content */}
            <p style={{ color: "#a0a0b0", marginBottom: "12px" }}>
              {event.description}
            </p>
            <div style={styles.meta}>
              <span>📅 {new Date(event.date).toLocaleDateString()}</span>
              <span>📍 {event.venue}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
              <span style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>
                {event.registeredUsers?.length || 0}/{event.maxParticipants} registered
              </span>
              <Link to={`/events/${event._id || event.id}`} className="btn btn-primary" style={{ padding: "6px 16px", fontSize: "0.85rem" }}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <p style={{ textAlign: "center", color: "#a0a0b0", padding: "40px" }}>
          No events found in this category.
        </p>
      )}
    </div>
  );
};

// Sample events for demonstration
const sampleEvents = [
  { id: "1", title: "AI/ML Workshop", description: "Build a real-time image classifier using TensorFlow and Python.", date: "2026-03-15", venue: "Lab 301", category: "workshop", maxParticipants: 60, registeredUsers: [] },
  { id: "2", title: "24-Hour Hackathon", description: "Solve real-world problems in teams. Prizes worth Rs 1 Lakh!", date: "2026-03-16", venue: "Main Auditorium", category: "hackathon", maxParticipants: 200, registeredUsers: [] },
  { id: "3", title: "Cybersecurity CTF", description: "Capture The Flag challenge - test your security skills.", date: "2026-03-16", venue: "Cyber Lab", category: "competition", maxParticipants: 100, registeredUsers: [] },
  { id: "4", title: "Cloud Computing Seminar", description: "Learn about AWS, Azure, and GCP from industry experts.", date: "2026-03-15", venue: "Seminar Hall A", category: "seminar", maxParticipants: 150, registeredUsers: [] },
  { id: "5", title: "Web Dev Bootcamp", description: "Full-stack development crash course with React and Node.js.", date: "2026-03-17", venue: "Lab 201", category: "workshop", maxParticipants: 50, registeredUsers: [] },
  { id: "6", title: "Tech Cultural Night", description: "Music, art and performances celebrating technology and creativity.", date: "2026-03-17", venue: "Open Air Theatre", category: "cultural", maxParticipants: 500, registeredUsers: [] },
];

const styles = {
  filterBar: { display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" },
  filterBtn: {
    padding: "6px 16px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent", color: "#a0a0b0", cursor: "pointer", fontSize: "0.85rem",
  },
  filterBtnActive: { background: "#6c63ff", color: "white", borderColor: "#6c63ff" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" },
  badge: {
    display: "inline-block", padding: "4px 12px", borderRadius: "12px",
    background: "rgba(108,99,255,0.2)", color: "#6c63ff", fontSize: "0.75rem",
    fontWeight: "600", textTransform: "uppercase", marginBottom: "12px",
  },
  meta: { display: "flex", gap: "16px", color: "#a0a0b0", fontSize: "0.9rem" },
};

export default Events;
