const express        = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose       = require("mongoose");
const dotenv         = require("dotenv");
const path           = require("path");
const flash          = require("connect-flash");
const session        = require("express-session");
const passport       = require("passport");

const app = express();

// Dev environement
if (process.env.NODE_ENV !== "production") require("dotenv").config();
dotenv.config({ path: "./.env"});

// Passport
const initializePassport = require("./config/passport");
initializePassport(passport);

// DB Config
const URI = process.env.MONGO_URI;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

// Public
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session
app.use(session( {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use("/",      require("./routes/pages"));
app.use("/users", require("./routes/users"));


// Server connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}...`));