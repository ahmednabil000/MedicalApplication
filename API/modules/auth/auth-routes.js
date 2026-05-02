const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../../config/passport-config'); // Initialize passport strategies

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET || 'your_jwt_secret_key',
    { expiresIn: '7d' }
  );
};

// --- Google Auth Routes ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user);
    // Usually redirect to front-end with token appended to URL
    // e.g. res.redirect(`http://localhost:3000/auth-success?token=${token}`);
    res.json({ message: "Google login successful", token, user: req.user });
  }
);

// --- Facebook Auth Routes ---
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user);
    // Usually redirect to front-end with token appended to URL
    res.json({ message: "Facebook login successful", token, user: req.user });
  }
);

module.exports = router;