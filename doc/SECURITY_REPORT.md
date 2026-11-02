# TechFest 2026 Portal - Security Analysis Report

## Overview
This report documents the security vulnerabilities identified in the initial implementation and the measures taken to fix them.

---

## Vulnerability 1: Missing Security Headers

**File:** `backend/security-demo/vulnerable-server.js`
**Severity:** HIGH

**Before (Vulnerable):**
```javascript
const app = express();
// No Helmet.js - no security headers set
```

**After (Fixed):**
```javascript
const helmet = require("helmet");
app.use(helmet());
```

**Impact:** Helmet.js sets 11+ HTTP security headers including X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, preventing clickjacking, MIME-type sniffing, and cross-site scripting attacks.

---

## Vulnerability 2: Open CORS Policy

**Severity:** HIGH

**Before (Vulnerable):**
```javascript
app.use(cors()); // Allows ALL origins - any website can make requests
```

**After (Fixed):**
```javascript
app.use(cors({
  origin: ["http://localhost:3000", "https://techfest2026.netlify.app"],
  credentials: true,
}));
```

**Impact:** Restricts API access to whitelisted origins only, preventing unauthorized cross-origin requests.

---

## Vulnerability 3: No Rate Limiting

**Severity:** MEDIUM

**Before (Vulnerable):**
```javascript
// No rate limiting - unlimited requests allowed
// Susceptible to brute force and DDoS attacks
```

**After (Fixed):**
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use("/api/", limiter);
```

**Impact:** Prevents brute force login attacks and DDoS by limiting request frequency per IP.

---

## Vulnerability 4: NoSQL Injection

**Severity:** CRITICAL

**Before (Vulnerable):**
```javascript
// BAD: directly using user input in query
const user = await mongoose.model("User").findOne({
  email: email,
  password: password, // If password = { "$gt": "" }, it matches ALL
});
```

**After (Fixed):**
```javascript
const mongoSanitize = require("express-mongo-sanitize");
app.use(mongoSanitize()); // Strips $ and . from req.body/query/params
```

**Impact:** Prevents attackers from injecting MongoDB operators ($gt, $ne, $regex) to bypass authentication.

---

## Vulnerability 5: Stored XSS (Cross-Site Scripting)

**Severity:** CRITICAL

**Before (Vulnerable):**
```javascript
app.post("/api/feedback-vulnerable", (req, res) => {
  const { comment } = req.body;
  // BAD: Storing raw HTML, will execute scripts when rendered
  res.json({
    renderedComment: `<div>${comment}</div>`, // XSS!
  });
});
```

**After (Fixed):**
```javascript
// Backend: Strip HTML tags
const sanitizedComment = comment.replace(/<[^>]*>/g, "");

// Frontend: React auto-escapes by default
<p>{feedback.comment}</p>  // Safe - React escapes HTML entities
```

**Impact:** Prevents attackers from injecting malicious scripts that execute in other users' browsers.

---

## Vulnerability 6: Insecure Cookie Configuration

**Severity:** HIGH

**Before (Vulnerable):**
```javascript
res.cookie("token", token); // No security options at all
// JavaScript can steal it: document.cookie
// Sent over HTTP (not just HTTPS)
// No CSRF protection
```

**After (Fixed):**
```javascript
res.cookie("token", token, {
  httpOnly: true,     // Cannot be accessed by JavaScript
  secure: true,       // Only sent over HTTPS
  sameSite: "strict", // Not sent with cross-site requests
  maxAge: 24 * 60 * 60 * 1000, // Expires in 24 hours
});
```

**Impact:** Prevents cookie theft via XSS (httpOnly), man-in-the-middle attacks (secure), and CSRF attacks (sameSite).

---

## Summary Table

| # | Vulnerability | Severity | Status |
|---|--------------|----------|--------|
| 1 | Missing Security Headers | HIGH | ✅ Fixed (Helmet.js) |
| 2 | Open CORS Policy | HIGH | ✅ Fixed (Whitelisted origins) |
| 3 | No Rate Limiting | MEDIUM | ✅ Fixed (express-rate-limit) |
| 4 | NoSQL Injection | CRITICAL | ✅ Fixed (mongo-sanitize) |
| 5 | Stored XSS | CRITICAL | ✅ Fixed (HTML stripping + React) |
| 6 | Insecure Cookies | HIGH | ✅ Fixed (httpOnly/secure/sameSite) |

---

*Report prepared as part of Web Technology Laboratory (23CSB40B)*
