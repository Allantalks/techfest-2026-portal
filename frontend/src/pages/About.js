import React from "react";

const About = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "8px" }}>About TechFest 2026</h1>
      <p style={{ color: "#a0a0b0", marginBottom: "30px" }}>
        The biggest college tech festival of the year
      </p>

      <div className="card">
        <h2 style={{ color: "#6c63ff", marginBottom: "12px" }}>Our Mission</h2>
        <p style={{ color: "#a0a0b0", lineHeight: "1.8" }}>
          TechFest 2026 is a 3-day tech extravaganza bringing together students,
          innovators, and industry leaders. Our mission is to inspire the next
          generation of technologists through hands-on workshops, challenging
          competitions, and networking opportunities.
        </p>
      </div>

      <div className="card">
        <h2 style={{ color: "#ff6584", marginBottom: "12px" }}>Event Highlights</h2>
        <ul style={{ color: "#a0a0b0", paddingLeft: "20px", lineHeight: "2" }}>
          <li>50+ events across 5 categories</li>
          <li>24-hour hackathon with industry mentors</li>
          <li>Workshops on AI, Cloud, Web3, and more</li>
          <li>Prize pool of Rs 5,00,000+</li>
          <li>2000+ participants from across the country</li>
        </ul>
      </div>

      <div className="card">
        <h2 style={{ color: "#00c853", marginBottom: "12px" }}>Contact</h2>
        <p style={{ color: "#a0a0b0" }}>
          Email: techfest2026@college.edu<br />
          Phone: +91 98765 43210<br />
          Venue: College Campus, Main Auditorium
        </p>
      </div>
    </div>
  );
};

export default About;
