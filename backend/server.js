const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const morgan = require("morgan");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const feedbackRoutes = require("./routes/feedback");
const app = express();
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/", limiter);
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // only 20 auth attempts per 15 min
  message: { error: "Too many login attempts, please try again later." },
});
app.use("/api/auth/", authLimiter);
app.use(mongoSanitize());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// 6. Compression - Gzip responses for better performance
app.use(compression());

// 7. Logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// ======================== DATABASE CONNECTION ========================

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/techfest2026";

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

// ======================== ROUTES ========================

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/feedback", feedbackRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ======================== ERROR HANDLING ========================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler - does NOT leak stack traces in production
app.use((err, req, res, _next) => {
  console.error("Server Error:", err.message);
  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// ======================== START SERVER ========================

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

module.exports = app;
