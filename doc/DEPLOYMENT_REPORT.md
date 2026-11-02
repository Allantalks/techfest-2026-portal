# TechFest 2026 Portal - Deployment Report

## 1. Project Overview

**Project:** TechFest 2026 Portal
**Description:** A full-stack web application for managing a college tech festival, featuring event management, user authentication, feedback system, and gallery.
**Tech Stack:** React 18 (Frontend), Express.js (Backend), MongoDB Atlas (Database)
**Date:** November 2026

---

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│   ┌──────────────┐     ┌──────────────┐    ┌──────────────┐ │
│   │   Frontend    │     │   Backend    │    │   Database   │ │
│   │   (Netlify)   │────▶│   (Render)   │───▶│ (MongoDB     │ │
│   │              │     │              │    │   Atlas)     │ │
│   │  React 18    │     │  Express.js  │    │  M0 Free     │ │
│   │  Port: 443   │     │  Port: 5000  │    │  Cluster     │ │
│   └──────────────┘     └──────────────┘    └──────────────┘ │
│         │                     │                    │         │
│         │              ┌──────────────┐            │         │
│         │              │   CI/CD      │            │         │
│         └─────────────▶│   GitHub     │◀───────────┘         │
│                        │   Actions    │                      │
│                        └──────────────┘                      │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                      SECURITY LAYERS                         │
├─────────────────────────────────────────────────────────────┤
│  • Helmet.js (HTTP Security Headers)                         │
│  • express-mongo-sanitize (NoSQL Injection Prevention)       │
│  • express-rate-limit (DDoS Protection)                      │
│  • bcryptjs (Password Hashing, 12 salt rounds)               │
│  • JWT with httpOnly/secure/sameSite cookies                 │
│  • CORS with whitelisted origins                             │
│  • Gzip Compression                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Deployment URLs

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend  | Netlify  | https://techfest2026.netlify.app |
| Backend   | Render   | https://techfest-2026-api.onrender.com |
| Database  | MongoDB Atlas | TodoCluster (M0 Free Tier) |
| Repository | GitHub  | https://github.com/USERNAME/techfest-2026-portal |

---

## 4. Security Analysis - Before vs After

### Vulnerabilities Identified and Fixed

| # | Vulnerability | Before (Vulnerable) | After (Secure) |
|---|--------------|---------------------|-----------------|
| 1 | No Security Headers | No Helmet.js | Helmet.js with all headers |
| 2 | Open CORS | `cors(*)` allows all origins | Whitelisted origins only |
| 3 | No Rate Limiting | Unlimited requests | 100 req/15min window |
| 4 | NoSQL Injection | Direct `req.body` in queries | express-mongo-sanitize |
| 5 | Stored XSS | Raw HTML rendering | HTML tag stripping + React escaping |
| 6 | Insecure Cookies | No flags set | httpOnly, secure, sameSite: strict |
| 7 | Password Storage | Plain text comparison | bcrypt with 12 salt rounds |
| 8 | Error Leaks | Full stack trace to client | Generic error messages |

### Security Headers (Helmet.js)
```
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
X-Ratelimit-Limit: 100
X-Ratelimit-Remaining: 96
```

### Secure Cookie Configuration
```javascript
res.cookie("token", token, {
  httpOnly: true,    // Prevents JavaScript access
  secure: true,      // HTTPS only
  sameSite: "strict", // CSRF protection
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});
```

---

## 5. Git Workflow

### Branching Strategy
- `master` — Main production branch
- `feature/performance-optimization` — Feature branch for performance work

### Workflow Demonstrated
1. Initial commit on `master`
2. Created `feature/performance-optimization` branch
3. Made changes on feature branch
4. Made conflicting changes on `master`
5. Merged feature branch → Conflict detected
6. Resolved conflict manually in VS Code
7. Committed resolved merge

### Git Log
```
* cb89087 (HEAD -> master) Resolve merge conflict: combine header comments
|\
| * bda1d78 (feature/performance-optimization) Add performance optimization comments
* | 1b6b785 Add main branch header comment
|/
* efa6cf9 Initial commit: TechFest 2026 Portal with security features
```

---

## 6. CI/CD Pipeline (GitHub Actions)

### Pipeline Configuration (`.github/workflows/ci.yml`)

**Triggers:** Push to `master`, Pull requests to `master`

**Jobs:**
1. **Backend Tests** (Node.js 18 & 20)
   - Install dependencies
   - Run Jest test suite
   - Security audit (`npm audit`)

2. **Frontend Build**
   - Install dependencies
   - Build production bundle
   - Verify build output

### Test Coverage
- Health endpoint verification
- Authentication validation (empty fields)
- NoSQL injection prevention
- XSS prevention in feedback

---

## 7. Performance Optimization

### Techniques Implemented

#### a) Code Splitting (React.lazy)
```javascript
const Home = lazy(() => import("./pages/Home"));
const Events = lazy(() => import("./pages/Events"));
const Gallery = lazy(() => import("./pages/Gallery"));
// ... all pages lazy loaded
```

#### b) Lazy Loading Images (Intersection Observer)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      observer.unobserve(entry.target);
    }
  });
});
```

#### c) Gzip Compression
```javascript
const compression = require("compression");
app.use(compression());
```

#### d) Netlify Caching Headers
```toml
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Lighthouse Scores

| Metric | Before | After |
|--------|--------|-------|
| Performance | ~70 | ~90+ |
| Accessibility | ~85 | ~95+ |
| Best Practices | ~75 | ~90+ |
| SEO | ~80 | ~90+ |

---

## 8. Cross-Browser & Device Testing

| Browser/Device | Status | Notes |
|---------------|--------|-------|
| Chrome (Desktop) | ✅ Pass | Full functionality |
| Firefox (Desktop) | ✅ Pass | Full functionality |
| Mobile (iPhone 12 Pro) | ✅ Pass | Responsive design verified |
| Mobile (Galaxy S20) | ✅ Pass | Touch-friendly interface |

---

## 9. Project Structure

```
techfest-2026-portal/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD Pipeline
├── backend/
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   ├── models/
│   │   ├── User.js             # User schema (bcrypt hashing)
│   │   ├── Event.js            # Event schema
│   │   └── Feedback.js         # Feedback schema
│   ├── routes/
│   │   ├── auth.js             # Auth routes (secure cookies)
│   │   ├── events.js           # Event CRUD routes
│   │   └── feedback.js         # Feedback routes (XSS safe)
│   ├── security-demo/
│   │   └── vulnerable-server.js # Vulnerable code (for comparison)
│   ├── tests/
│   │   └── auth.test.js        # Jest test suite
│   ├── server.js               # Main server (secured)
│   ├── seed.js                 # Database seed script
│   ├── .env.example            # Environment template
│   └── render.yaml             # Render deployment config
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js       # Navigation component
│   │   ├── pages/
│   │   │   ├── Home.js         # Landing page
│   │   │   ├── Login.js        # Login page
│   │   │   ├── Register.js     # Registration page
│   │   │   ├── Events.js       # Events listing
│   │   │   ├── EventDetail.js  # Event detail + feedback
│   │   │   ├── Gallery.js      # Gallery (lazy loading)
│   │   │   └── About.js        # About page
│   │   ├── App.js              # Main app (code splitting)
│   │   └── index.css           # Global styles
│   ├── netlify.toml            # Netlify config
│   └── package.json
├── docs/
│   ├── DEPLOYMENT_REPORT.md    # This file
│   ├── SECURITY_REPORT.md      # Security analysis
│   └── GIT_WORKFLOW_GUIDE.md   # Git branching guide
├── screenshots/                 # All screenshots
└── .gitignore
```

---

## 10. Database Design

### Collections

**Users**
| Field | Type | Description |
|-------|------|-------------|
| name | String | User's display name |
| email | String | Unique email (indexed) |
| password | String | bcrypt hashed (12 rounds) |
| role | String | "user" or "admin" |

**Events**
| Field | Type | Description |
|-------|------|-------------|
| title | String | Event name |
| description | String | Event details |
| date | Date | Event date |
| venue | String | Location |
| category | String | seminar/workshop/hackathon/cultural |
| maxParticipants | Number | Capacity |
| registeredUsers | [ObjectId] | Registered user references |

**Feedbacks**
| Field | Type | Description |
|-------|------|-------------|
| event | ObjectId | Reference to Event |
| user | ObjectId | Reference to User |
| rating | Number | 1-5 rating |
| comment | String | Sanitized feedback text |

---

*Report prepared as part of Web Technology Laboratory (23CSB40B)*
