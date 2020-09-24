const express = require("express");
const router = express.Router();

const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");
const User = require("../models/User");


console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
);


router.get("/prod-add", async (req, res)=> {
  const tags = await Tag.find({});
  console.log(tags);
  res.render("products_add.hbs", {tags});
});


router.post("/prod-add", async(req, res) => {
  try {
    const newSneaker = req.body;
    const createdSneaker = await Sneaker.create(newSneaker);
    res.redirect("/prod-manage");
  } catch (error) {
    next(error); 
  }
});

router.post("/prod-add-cat", async (req, res, next)=> {
  try {
    const newTag = req.body;
    const createdTag = await Tag.create(newTag);
     res.redirect("/prod-add");
  } catch (error) {
    next(error);
  }
});

router.get("/prod-manage", async (req, res)=> {
  const sneakers = await Sneaker.find({});
  console.log(sneakers);
  res.render("products_manage.hbs", {sneakers});
});

router.get("/product-delete/:id", async (req, res, next) => {
  try {
    const sneakerId = req.params.id;
    await Sneaker.findByIdAndDelete(sneakerId);
    res.redirect("/prod_manage");
  } catch (error) {
    next(error);
  }
});

router.get("/", (req, res) => {
  res.render("index.hbs");
});

router.get("/sneakers/:cat", (req, res) => {
  res.render("products.hbs");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product.hbs");
});

router.get("/signup", (req, res) => {
  res.render("signup.hbs");
});

router.get("/signin", (req, res) => {
  res.render("signin.hbs");
});


module.exports = router;

