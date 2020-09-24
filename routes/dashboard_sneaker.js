const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");
const User = require("../models/User");


router.get("/prod-add", async (req, res)=> {
    const tags = await Tag.find({});
    console.log(tags, "<<<<< prod-add >>>>>>>>>");
    res.render("products_add.hbs", {tags});
  });
  
  
  router.post("/prod-add", async(req, res) => {
    try {
      console.log("<<<<< post:prod-add >>>>>>>>>");
      const newSneaker = req.body;
      const createdSneaker = await Sneaker.create(newSneaker);
      res.redirect("/db/prod-manage");
    } catch (error) {
      next(error); 
    }
  });
  
  router.post("/prod-add-cat", async (req, res, next)=> {
    try {
      const newTag = req.body;
      console.log("<<<<< prod-add-cat >>>>>>>>>");
      const createdTag = await Tag.create(newTag);
       res.redirect("/db/prod-add");
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
      res.redirect("/db/prod-manage");
    } catch (error) {
      next(error);
    }
  });
  
  router.get("/", (req, res) => {
   // res.send("foo");
   res.render("index.hbs");
  });
  
  router.get("/prod-add", async (req, res)=> {
    console.log("<<<< prod-add- >>>>>>");
    const tags = await Tag.find({});
    console.log(tags);
    res.render("products_add.hbs", {tags});
  });
  
  router.post("/prod-add", async (req, res, next)=> {
    console.log("<<<< prod-add-POST >>>>>>");
    try {
      const newSneaker = req.body.console;
  
      console.log("<<<<<<<<<<<<<<<<<");
      console.log(newSneaker);
      console.log("<<<<<<<<<<<<<<<<< \r\n");
      const createdSneaker = await Sneaker.create(newSneaker);
       res.redirect("/db/prod-manage");
    } catch (error) {
      next(error);
    }  
  });
  
  
  router.post("/prod-add-cat", async (req, res, next)=> {
    console.log("<<<< prod-add-cat >>>>>>");
    try {
      const newTag = req.body;
  
      console.log("<<<<<<<<<<<<<<<<<");
      console.log(newTag);
      console.log("<<<<<<<<<<<<<<<<< \r\n");
      const createdTag = await Tag.create(newTag);
       res.redirect("/db/prod-add");
    } catch (error) {
      next(error);
    }  
  });
  
  router.get("/prod-manage", async (req, res)=> {
  console.log("<<<< prod-manage >>>>>>");
    const sneakers = await Sneaker.find({});
    console.log(sneakers);
    res.render("products_manage.hbs", {sneakers});
  });
  

module.exports = router;