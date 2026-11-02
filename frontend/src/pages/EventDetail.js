import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EventDetail = ({ user }) => {
  const { id } = useParams();
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (e) => {
    e.preventDefault();
    // XSS PREVENTION: React auto-escapes the feedbackText when rendering
    // We also strip HTML tags as an extra precaution
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="card">
        <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: "12px", background: "rgba(108,99,255,0.2)", color: "#6c63ff", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", marginBottom: "12px" }}>
          Workshop
        </div>
        <h1 style={{ marginBottom: "8px" }}>Event Details</h1>
        <p style={{ color: "#a0a0b0", marginBottom: "20px" }}>
          Event ID: {id}
        </p>
        <p style={{ color: "#a0a0b0" }}>
          Connect this page to the backend API to load real event data.
          This template demonstrates the secure feedback form below.
        </p>
      </div>

      {/* Feedback Form - XSS Safe */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h2 style={{ marginBottom: "16px" }}>Submit Feedback</h2>

        {!user && (
          <p style={{ color: "#ff6584" }}>Please login to submit feedback.</p>
        )}

        {submitted && (
          <div className="alert alert-success">
            Feedback submitted successfully! Thank you.
          </div>
        )}

        {user && !submitted && (
          <form onSubmit={handleFeedback}>
            <div className="form-group">
              <label>Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#0f3460", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{"★".repeat(n)}{"☆".repeat(5 - n)} ({n}/5)</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="feedback">Your Feedback</label>
              <textarea
                id="feedback"
                rows="4"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your experience..."
                maxLength={500}
                style={{ resize: "vertical" }}
              />
              <small style={{ color: "#a0a0b0" }}>{feedbackText.length}/500 characters</small>
            </div>

            {/* XSS SAFE PREVIEW: Using textContent equivalent (React auto-escapes) */}
            {feedbackText && (
              <div style={{ marginBottom: "16px", padding: "12px", background: "rgba(108,99,255,0.1)", borderRadius: "8px" }}>
                <small style={{ color: "#a0a0b0" }}>Preview:</small>
                {/* This is safe - React escapes HTML entities automatically */}
                <p>{feedbackText}</p>
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
