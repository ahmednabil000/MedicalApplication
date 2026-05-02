const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../../config/passport-config"); // Initialize passport strategies

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET || "your_jwt_secret_key",
    { expiresIn: "7d" },
  );
};

// --- Google Auth Routes ---

/**
 * @openapi
 * /api/auth/google:
 *   get:
 *     tags: [Auth]
 *     summary: Initiate Google OAuth login
 *     description: >
 *       Redirects the browser to the Google OAuth 2.0 consent screen.
 *       Requests `profile` and `email` scopes. This endpoint cannot be
 *       tested directly in Scalar — navigate to it in a browser to start
 *       the OAuth flow.
 *     responses:
 *       302:
 *         description: Redirect to Google consent screen.
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

/**
 * @openapi
 * /api/auth/google/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Google OAuth callback
 *     description: >
 *       Google redirects back to this URL after the user grants permission.
 *       On success, returns a JWT token (valid 7 days) and the authenticated
 *       user object. On failure, redirects to `/login`.
 *     responses:
 *       200:
 *         description: Authentication successful. Returns JWT and user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthSuccessResponse'
 *             example:
 *               message: "Google login successful"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *                 name: "Ahmed Ali"
 *                 email: "ahmed@gmail.com"
 *                 role: "CLIENT"
 *       302:
 *         description: Authentication failed — redirects to `/login`.
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user);
    // Usually redirect to front-end with token appended to URL
    // e.g. res.redirect(`http://localhost:3000/auth-success?token=${token}`);
    res.json({ message: "Google login successful", token, user: req.user });
  },
);

// --- Facebook Auth Routes ---

/**
 * @openapi
 * /api/auth/facebook:
 *   get:
 *     tags: [Auth]
 *     summary: Initiate Facebook OAuth login
 *     description: >
 *       Redirects the browser to the Facebook OAuth consent screen.
 *       Requests the `email` scope. Navigate to this URL in a browser
 *       to start the OAuth flow — it cannot be triggered directly from Scalar.
 *     responses:
 *       302:
 *         description: Redirect to Facebook login screen.
 */
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] }),
);

/**
 * @openapi
 * /api/auth/facebook/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Facebook OAuth callback
 *     description: >
 *       Facebook redirects back to this URL after the user grants permission.
 *       On success, returns a JWT token (valid 7 days) and the authenticated
 *       user object. On failure, redirects to `/login`.
 *     responses:
 *       200:
 *         description: Authentication successful. Returns JWT and user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthSuccessResponse'
 *             example:
 *               message: "Facebook login successful"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: "b2c3d4e5-f6a7-8901-bcde-f01234567891"
 *                 name: "Sara Khaled"
 *                 email: "sara@example.com"
 *                 role: "CLIENT"
 *       302:
 *         description: Authentication failed — redirects to `/login`.
 */
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user);
    // Usually redirect to front-end with token appended to URL
    res.json({ message: "Facebook login successful", token, user: req.user });
  },
);

module.exports = router;
