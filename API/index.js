require("dotenv").config();
const { connectDB } = require("./config/database-config");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { apiReference } = require("@scalar/express-api-reference");
const openApiSpec = require("./config/openapi-config");

const app = express();

app.use(express.json());

// Set up express session (passport requires session for OAuth flow)
app.use(
  session({
    secret: process.env.JWT_SECRET || "your_jwt_secret_key",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// ── API Documentation (development / staging only) ────────────────────────────
if (process.env.NODE_ENV !== "production") {
  // Serve the raw OpenAPI JSON spec
  app.get("/openapi.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json(openApiSpec);
  });

  // Mount Scalar UI at /docs
  app.use(
    "/docs",
    apiReference({
      spec: { content: openApiSpec },
      theme: "default",
    }),
  );

  console.log(
    `API docs available at http://localhost:${process.env.PORT || 3000}/docs`,
  );
}
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @openapi
 * /:
 *   get:
 *     tags: [Health]
 *     summary: Health check
 *     description: Returns a plain-text confirmation that the server is running.
 *     responses:
 *       200:
 *         description: Server is up.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World!
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./modules/auth/auth-routes"));
app.use("/api/users", require("./modules/users/users-routes"));
app.use(
  "/api/reservations",
  require("./modules/reservations/reservations-routes"),
);

connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
