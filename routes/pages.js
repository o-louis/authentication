const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get("/", (req, res) => {
  if (req.session.passport) {
      res.locals.login = req.session.passport;
  }
  res.render("welcome");
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;