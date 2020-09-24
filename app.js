//throw new Error("wax on, wax off");

require("dotenv").config();
require("./config/mongodb"); // database initial setup
require("./helpers/hbs"); // utils for hbs templates

// base dependencies
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dev_mode = false;
const logger = require("morgan");

// config logger (pour debug)
app.use(logger("dev"));

// initial config
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection, // you can store session infos in mongodb :)
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);

// below, site_url is used in partials/shop_head.hbs to perform ajax request (var instead of hardcoded)
app.locals.site_url = process.env.SITE_URL;

app.use(flash());

app.use(function (req, res, next) {
  res.locals.error_message = req.flash("error");
  res.locals.success_message = req.flash("success");
  next();
});

app.use(function (req, res, next) {
  if (req.session.currentUser) {
    res.locals.isLoggedIn = true;
    res.locals.isAdmin = req.session.currentUser.role === "admin";
    res.locals.username = req.session.currentUser.username;
  } else {
    res.locals.isLoggedIn = false;
    res.locals.username = null;
    res.locals.isAdmin = false;
  }
  next();
});



// CUSTOM MIDDLEWARES

if (dev_mode === true) {
  app.use(require("./middlewares/devMode")); // triggers dev mode during dev phase
  app.use(require("./middlewares/debugSessionInfos")); // displays session debug
}

app.use(require("./middlewares/exposeLoginStatus"));
app.use(require("./middlewares/exposeFlashMessage"));

// routers
app.use("/", require("./routes/index"));
app.use("/db", require("./routes/dashboard_sneaker"));
app.use("/auth", require("./routes/auth"));

module.exports = app;
