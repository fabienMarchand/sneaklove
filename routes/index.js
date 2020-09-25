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


router.get("/", (req, res) => {
 // res.send("foo");
 res.render("index.hbs");
});


router.get("/sneakers/:cat", async (req, res) => {
  let sneakers;
  let tags;
  let sneakersMen;
  if(req.params.cat === "collection"){
    sneakers= await Sneaker.find({});
  } else {
    sneakers= await Sneaker.find({ "category": { "$eq": req.params.cat } });
  }
    tags = await Tag.find({});
  res.render("products.hbs", {sneakers, tags,
    scripts: ["client.js"],
  } );
});

router.get("/one-product/:id", async (req, res) => {
  const sneakerSolo = await Sneaker.findById(req.params.id);
  res.render("one_product.hbs", { sneaker : sneakerSolo});

});



module.exports = router;

