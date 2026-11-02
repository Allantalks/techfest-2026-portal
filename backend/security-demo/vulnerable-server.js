// ============================================================
// VULNERABLE VERSION (FOR DEMONSTRATION ONLY - DO NOT DEPLOY!)
// This file shows common security vulnerabilities.
// Compare with the secure version in ../server.js
// ============================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// VULNERABILITY 1: No Helmet - Missing security headers
// No helmet() means no CSP, X-XSS-Protection, X-Frame-Options, etc.

// VULNERABILITY 2: Open CORS - Any origin allowed
app.use(cors()); // allows ALL origins - dangerous!

// VULNERABILITY 3: No rate limiting
// An attacker can make unlimited requests (brute force, DDoS)

// VULNERABILITY 4: No input sanitization
// No express-mongo-sanitize means NoSQL injection is possible
app.use(express.json()); // no size limit either!

// VULNERABILITY 5: NoSQL Injection in Login
// An attacker can send { "email": {"$gt": ""}, "password": {"$gt": ""} }
// This matches ALL users and bypasses authentication!
app.post("/api/auth/login-vulnerable", async (req, res) => {
  const { email, password } = req.body;

  // BAD: directly using user input in query without sanitization
  // If password = { "$gt": "" }, it matches any non-empty password
  const user = await mongoose.model("User").findOne({
    email: email,
    password: password, // No hashing either!
  });

  if (user) {
    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// VULNERABILITY 6: XSS in Feedback
// Rendering user input as HTML allows script injection
app.post("/api/feedback-vulnerable", (req, res) => {
  const { comment } = req.body;

  // BAD: Storing raw HTML from user - will execute scripts when rendered
  // If comment = '<script>alert("hacked")</script>', it runs in browser
  res.json({
    message: "Feedback submitted",
    // This will be rendered as HTML on the frontend, executing any scripts
    renderedComment: `<div>${comment}</div>`,
  });
});

// VULNERABILITY 7: Insecure Cookie
app.post("/api/auth/login-insecure-cookie", (req, res) => {
  const token = "sample-jwt-token";

  // BAD: Cookie is NOT httpOnly, NOT secure, NOT sameSite
  // JavaScript can steal it: document.cookie
  // Sent over HTTP (not just HTTPS)
  // No CSRF protection
  res.cookie("token", token); // No options = all defaults (insecure)

  res.json({ message: "Login successful (insecure cookie)" });
});

// VULNERABILITY 8: Error leaks stack trace
app.use((err, req, res, _next) => {
  // BAD: Sending full error stack to client
  res.status(500).json({
    error: err.message,
    stack: err.stack, // Exposes internal code structure!
  });
});

console.log("WARNING: This is a VULNERABLE demo server. Do NOT deploy!");
module.exports = app;
