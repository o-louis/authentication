const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// GET
router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


// POST
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;