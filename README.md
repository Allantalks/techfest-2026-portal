# TechFest 2026 Portal

A full-stack web application for a college tech festival, built with React, Express.js, and MongoDB.

**Web Technology Laboratory (23CSB40B)**

## Features

- User authentication with JWT (secure httpOnly cookies)
- Event browsing, filtering, and registration
- Feedback system with XSS protection
- Lazy-loaded image gallery
- Responsive design for all devices

## Security Measures

- Helmet.js for HTTP security headers
- express-mongo-sanitize against NoSQL injection
- Rate limiting on API routes
- Secure cookie configuration (httpOnly, secure, sameSite)
- Input validation and HTML tag stripping
- CORS restrictions

## Tech Stack

- **Frontend:** React 18, React Router, Axios
- **Backend:** Express.js, Mongoose, JWT, Bcrypt
- **Database:** MongoDB Atlas
- **CI/CD:** GitHub Actions
- **Hosting:** Netlify (frontend) + Render (backend)

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env    # Fill in your MongoDB URI and JWT secret
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env    # Set API URL
npm install
npm start
```

## Deployment

See `docs/DEPLOYMENT_REPORT.md` for complete deployment instructions.

## Project Structure

```
techfest-2026-portal/
├── .github/workflows/ci.yml    # CI/CD pipeline
├── backend/                    # Express.js API server
├── frontend/                   # React application
├── docs/                       # Documentation & reports
├── .gitignore
└── README.md
```
