const express = require('express');
const passport = require('../config/auth');

const router = express.Router();

// Login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redirect to dashboard on successful login
  failureRedirect: '/login', // Redirect back to login page on failure
  failureFlash: true // Enable flash messages
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout(); // Provided by Passport.js to remove the req.user property and clear login session
  res.redirect('/login'); // Redirect to login page after logout
});

module.exports = router;
