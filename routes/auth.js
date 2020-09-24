const express = require("express");
const router = new express.Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");


const salt = 10;


router.get("/signin", (req, res) => {
    res.render("signin.hbs");
});
  
router.post("/signin", async (req, res, next) => {
    // DO something
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (!foundUser) {
      //   Display an error message telling the user that either the password
      // or the email is wrong
      //   res.redirect("/signup")
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
      // res.render("auth/signin.hbs", { error: "Invalid credentials" });
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        // Display an error message telling the user that either the password
        // or the email is wrong
        req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin");
        // res.render("auth/signin.hbs", { error: "Invalid credentials" });
      } else {
        //
        // Authenticate the user...
        const userDocument = { ...foundUser };
        console.log(userDocument);
        const userObject = foundUser.toObject();
        delete userObject.password; // remove password before saving user in session
        // console.log(req.session, "before defining current user");
        req.session.currentUser = userObject; // Stores the user in the session
        // console.log(req.session, "AFTER defining current user");
        req.flash("success", "Successfully logged in...");
        res.redirect("/");
      }
    }
  });

router.get("/signup", async (req, res, next) => {
  res.render("signup.hbs");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = req.body;
    const foundUser = await User.findOne({ email: newUser.email });
    if (foundUser) {
      res.render("signup.hbs", { error: "Email already taken" });
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hashedPassword;
      const user = await User.create(newUser);
      res.redirect("/auth/signin");
    }
  } catch (error) {
    next(error);
  }
});





router.get("/logout", async (req, res, next) => {
  console.log(req.session.currentUser);
  req.session.destroy(function (err) {
    // cannot access session here
    // console.log(req.session.currentUser);
    res.redirect("/auth/signin");
  });
});

module.exports = router;
