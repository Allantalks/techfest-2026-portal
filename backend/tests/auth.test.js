const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {
  // Test health endpoint
  describe("GET /api/health", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/api/health");
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("healthy");
      expect(res.body).toHaveProperty("timestamp");
    });
  });

  // Test registration validation
  describe("POST /api/auth/register", () => {
    it("should reject registration without required fields", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@example.com" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  // Test login validation
  describe("POST /api/auth/login", () => {
    it("should reject login without credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should reject login with invalid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "noone@test.com", password: "wrong" });
      expect(res.statusCode).toBe(401);
    });
  });

  // Test protected route without token
  describe("GET /api/auth/me", () => {
    it("should reject access without token", async () => {
      const res = await request(app).get("/api/auth/me");
      expect(res.statusCode).toBe(401);
    });
  });

  // Test 404
  describe("GET /api/nonexistent", () => {
    it("should return 404 for unknown routes", async () => {
      const res = await request(app).get("/api/nonexistent");
      expect(res.statusCode).toBe(404);
    });
  });

  // Test NoSQL injection prevention
  describe("NoSQL Injection Prevention", () => {
    it("should sanitize malicious query operators", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: { $gt: "" },
          password: { $gt: "" },
        });
      // Should not return 200 (login success) - injection blocked
      expect(res.statusCode).not.toBe(200);
    });
  });

  // Test XSS in feedback
  describe("XSS Prevention", () => {
    it("should reject feedback without authentication", async () => {
      const res = await request(app)
        .post("/api/feedback")
        .send({
          event: "507f1f77bcf86cd799439011",
          rating: 5,
          comment: '<script>alert("xss")</script>',
        });
      expect(res.statusCode).toBe(401);
    });
  });
});
